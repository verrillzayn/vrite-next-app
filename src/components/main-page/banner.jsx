import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";

import { api } from "@convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { toast } from "sonner";

export function Banner({ documentId }) {
  const router = useRouter();

  const deleteDoc = useMutation(api.documents.deleteDoc);
  const restoreDoc = useMutation(api.documents.restoreDoc);

  const onDelete = () => {
    const promise = deleteDoc({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });
    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restoreDoc({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
    router.push("/documents");
  };

  return (
    <div className="flex w-full items-center justify-center gap-x-2 bg-rose-500 p-2 text-center text-sm text-white">
      <p>This page is in Trash.</p>
      <Button
        onClick={onRestore}
        size="sm"
        variant="outline"
        className="border-white bg-transparent p-1 px-2 font-normal hover:bg-primary/10 hover:text-white"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm">Delete forever</Button>
      </ConfirmModal>
    </div>
  );
}
