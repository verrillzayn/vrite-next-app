"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  DoubleArrowLeftIcon,
  GearIcon,
  HamburgerMenuIcon,
  MagnifyingGlassIcon,
  PlusCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
// import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import UserItem from "@/components/main-page/user-item";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import NavItem from "@/components/main-page/nav-item";
import { toast } from "sonner";
import DocumentList from "@/components/main-page/documents-list";
import TrashBox from "@/components/main-page/trash-box";
import { useSearch } from "@lib/hooks/use-search";
import { useSettings } from "@lib/hooks/use-settings";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/main-page/navbar";
import { cn } from "@lib/utils/ui";

export default function Navigation({ children }) {
  const params = useParams();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  // const pathname = usePathname();
  const createDoc = useMutation(api.documents.createDocuments);
  const navRef = useRef();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const search = useSearch();
  const settings = useSettings();

  const handleReset = () => {
    if (isMobile) {
      navRef.current.collapse();
    } else {
      navRef.current.resize(19);
    }
  };

  const handleCreate = () => {
    const promise = createDoc({ title: "Untitled" }).then((docId) =>
      router.push(`/documents/${docId}`),
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New Note created!",
      error: "Failed to created new note.",
    });
  };

  const handleclick = () => {
    navRef.current.collapse();
  };

  useEffect(() => {
    if (isMobile) {
      navRef.current.collapse();
      setIsCollapsed(true);
    } else {
      navRef.current.resize(19);
      setIsCollapsed(false);
    }
  }, [isMobile]);

  return (
    <>
      <ResizablePanelGroup
        className="group/panelgroup h-full"
        direction="horizontal"
      >
        <ResizablePanel
          onCollapse={() => setIsCollapsed(true)}
          collapsedSize={0}
          collapsible={true}
          ref={navRef}
          order={1}
          tagName="aside"
          className="group/sidebar peer/sidebar relative z-[99999] flex h-full flex-col overflow-y-auto bg-secondary transition-all duration-50 ease-linear"
          minSize={isMobile ? 0 : 10}
          defaultSize={isMobile ? 0 : 19}
        >
          <div
            onClick={handleclick}
            role="button"
            className={cn(
              "absolute right-2 top-3 h-6 w-6 rounded-md text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600",
              isMobile ? "opacity-100" : "opacity-0",
            )}
          >
            <DoubleArrowLeftIcon className="h-6 w-6" />
          </div>
          <div>
            <UserItem />
            <NavItem
              isSearch
              label="Search"
              icon={MagnifyingGlassIcon}
              onClick={search.onOpen}
            />
            <NavItem
              label="Settings"
              icon={GearIcon}
              onClick={settings.onOpen}
            />
            <NavItem
              onClick={handleCreate}
              label="New Page"
              icon={PlusCircledIcon}
            />
          </div>
          <div className="mt-4">
            <DocumentList />
            <Popover>
              <PopoverTrigger className="mt-4 h-full w-full">
                <NavItem label="Trash" icon={TrashIcon} />
              </PopoverTrigger>
              <PopoverContent
                side={isMobile ? "bottom" : "right"}
                className="w-72  p-0"
              >
                <TrashBox />
              </PopoverContent>
            </Popover>
          </div>
        </ResizablePanel>
        {!isMobile && (
          <ResizableHandle
            onDoubleClick={handleReset}
            className={cn(
              "hidden h-full w-1 bg-secondary transition hover:bg-primary/15 peer-hover/sidebar:bg-primary/15",
              !isCollapsed && "block",
            )}
          />
        )}

        <ResizablePanel order={2} defaultSize={81} minSize={isMobile ? 0 : 55}>
          {!!params.documentId ? (
            <Navbar
              isCollapsed={isCollapsed}
              onMobile={() => {
                navRef.current.resize(isMobile ? 100 : 19);
                setIsCollapsed(false);
              }}
            />
          ) : isCollapsed ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                navRef.current.resize(isMobile ? 100 : 19);
                setIsCollapsed(false);
              }}
            >
              <HamburgerMenuIcon className="h-6 w-6 text-muted-foreground" />
            </Button>
          ) : null}
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
