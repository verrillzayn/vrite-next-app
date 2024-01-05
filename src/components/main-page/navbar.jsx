import { useParams } from "next/navigation";
import { useQuery } from "convex/react";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Title } from "@/components/main-page/title";
import { Banner } from "@/components/main-page/banner";
import { NavbarMenu } from "@/components/main-page/navbar-menu";
import { Publish } from "@/components/main-page/publish";

import { Button } from "@/components/ui/button";

import { api } from "@convex/_generated/api";

export default function Navbar({ onMobile, isCollapsed }) {
  const params = useParams();

  const document = useQuery(api.documents.getDocById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return (
      <nav className="flex w-full items-center justify-between bg-background px-3 py-2 dark:bg-[#1F1F1F]">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <NavbarMenu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="flex w-full items-center gap-x-4 border-b bg-background px-3 py-2 shadow-sm dark:bg-[#1F1F1F]">
        {isCollapsed && (
          <Button variant="ghost" size="icon" onClick={onMobile}>
            <HamburgerMenuIcon className="h-6 w-6 text-muted-foreground" />
          </Button>
        )}
        <div className="flex w-full items-center justify-between">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            <NavbarMenu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
}
