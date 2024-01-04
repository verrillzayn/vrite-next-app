"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
  DoubleArrowLeftIcon,
  GearIcon,
  HamburgerMenuIcon,
  MagnifyingGlassIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useRef } from "react";
// import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import UserItem from "@/components/main-page/user-item";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import NavItem from "@/components/main-page/nav-item";
import { toast } from "sonner";
import DocumentList from "@/components/main-page/documents-list";

export default function Navigation({ children }) {
  // const pathname = usePathname();
  const createDoc = useMutation(api.documents.createDocuments);
  const navRef = useRef();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleclick = () => {
    if (isMobile) {
      navRef.current.collapse();
    } else {
      navRef.current.resize(19);
    }
  };

  const handleCreate = () => {
    const promise = createDoc({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New Note created!",
      error: "Failed to created new note.",
    });
  };

  return (
    <>
      <ResizablePanelGroup
        className="group/panelgroup h-full"
        direction="horizontal"
      >
        <ResizablePanel
          collapsedSize={0}
          collapsible={isMobile ? true : false}
          ref={navRef}
          order={1}
          tagName="aside"
          className="group/sidebar peer/sidebar relative z-[99999] flex h-full flex-col overflow-y-auto bg-secondary"
          minSize={isMobile ? 0 : 10}
          defaultSize={isMobile ? 0 : 19}
        >
          <div
            onClick={handleclick}
            role="button"
            className="absolute right-2 top-3 h-6 w-6 rounded-md text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600"
          >
            <DoubleArrowLeftIcon className="h-6 w-6" />
          </div>
          <div>
            <UserItem />
            <NavItem
              isSearch
              label="Search"
              icon={MagnifyingGlassIcon}
              onClick={() => {}}
            />
            <NavItem label="Settings" icon={GearIcon} onClick={() => {}} />
            <NavItem
              onClick={handleCreate}
              label="New Page"
              icon={PlusCircledIcon}
            />
          </div>
          <div className="mt-4">
            <DocumentList />
          </div>
        </ResizablePanel>
        {!isMobile && (
          <ResizableHandle className="h-full w-1 bg-secondary transition hover:bg-primary/15 peer-hover/sidebar:bg-primary/15" />
        )}

        <ResizablePanel order={2} defaultSize={81} minSize={isMobile ? 0 : 55}>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                navRef.current.resize(100);
              }}
            >
              <HamburgerMenuIcon className="h-4 w-4" />
            </Button>
          )}
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
