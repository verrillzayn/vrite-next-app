"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { DoubleArrowLeftIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useRef } from "react";
// import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import UserItem from "@/components/main-page/user-item";

export default function Navigation({ children }) {
  // const pathname = usePathname();
  const navRef = useRef();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleclick = () => {
    if (isMobile) {
      navRef.current.collapse();
    } else {
      navRef.current.resize(19);
    }
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
          </div>
          <div className="mt-4">
            <p>Documents</p>
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
