import { useRouter } from "next/navigation";

import { useUser } from "@clerk/clerk-react";
import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";

import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export function NavbarMenu({ documentId }) {
  const router = useRouter();

  const { user } = useUser();

  const archiveDoc = useMutation(api.documents.archiveDoc);

  const onArchive = () => {
    const promise = archiveDoc({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });

    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <TrashIcon className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-2 text-xs text-muted-foreground">
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

NavbarMenu.Skeleton = function NavbarMenuSkeleton() {
  return <Skeleton className="mt-1 h-7 w-8" />;
};
