import { useUser } from "@clerk/clerk-react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  PlusCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { cn } from "@lib/utils/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavItem({
  onClick,
  label,
  icon: Icon,
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
}) {
  const { user } = useUser();

  const router = useRouter();

  const createDoc = useMutation(api.documents.createDocuments);
  const archiveDoc = useMutation(api.documents.archiveDoc);

  const ChevronIcon = expanded ? ChevronDownIcon : ChevronRightIcon;

  const handleExpand = (e) => {
    e.stopPropagation();
    onExpand?.();
  };

  const onCreate = (e) => {
    e.stopPropagation();

    if (!id) return;
    const promise = createDoc({ title: "Untitled", parentDocument: id }).then(
      (docId) => {
        if (!expanded) {
          onExpand?.();
        }
        // router.push(`/documents/${docId}`)
      },
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New Note created!",
      error: "Failed to created new note.",
    });
  };

  const onArchive = (e) => {
    e.stopPropagation();

    if (!id) return;
    const promise = archiveDoc({ id });

    toast.promise(promise, {
      loading: "Moving note to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5",
        active && "bg-primary/5 text-primary",
      )}
    >
      {!!id && (
        <div
          role="button"
          className="mr-1 h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50 " />
        </div>
      )}
      {documentIcon ? (
        <div className="mr-2 shrink-0 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="mr-2 h-[18px] shrink-0 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-sm">⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <div
            role="button"
            onClick={onCreate}
            className="ml-auto h-full rounded-sm p-0.5 opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600"
          >
            <PlusCircledIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                className="ml-auto h-full rounded-sm p-0.5 opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600 "
              >
                <DotsHorizontalIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              onClick={(e) => e.stopPropagation()}
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem className="cursor-pointer" onClick={onArchive}>
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="p-2 text-xs text-muted-foreground">
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}

NavItem.Skeleton = function NavItemSkeleton({ level }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px ` : "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4 " />
      <Skeleton className="h-4 w-[30%] " />
    </div>
  );
};
