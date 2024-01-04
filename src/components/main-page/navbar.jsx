import { useParams } from "next/navigation";
import { useQuery } from "convex/react";

import { api } from "@convex/_generated/api";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Title } from "@/components/main-page/title";

export default function Navbar({ onMobile, isCollapsed }) {
  const params = useParams();

  const document = useQuery(api.documents.getDocById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return (
      <nav className=" flex w-full items-center bg-background px-3 py-2 dark:bg-[#1F1F1F]">
        <Title.Skeleton />
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <nav className="flex w-full items-center gap-x-4 bg-background px-3 py-2 dark:bg-[#1F1F1F]">
      {isCollapsed && (
        <Button variant="ghost" size="icon" onClick={onMobile}>
          <HamburgerMenuIcon className="h-6 w-6 text-muted-foreground" />
        </Button>
      )}
      <div className="flex w-full items-center justify-between">
        <Title initialData={document} />
      </div>
    </nav>
  );
}
