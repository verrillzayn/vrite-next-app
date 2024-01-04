import { useQuery, useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@convex/_generated/api";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import {
  MagnifyingGlassIcon,
  ResetIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";

export default function TrashBox() {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restoreDoc = useMutation(api.documents.restoreDoc);
  const deleteDoc = useMutation(api.documents.deleteDoc);

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((doc) => {
    return doc.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (docId) => {
    router.push(`/documents/${docId}`);
  };

  const onRestore = (event, docId) => {
    event.stopPropagation();
    const promise = restoreDoc({ id: docId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  const onDelete = (docId) => {
    const promise = deleteDoc({ id: docId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    if (params.documentId === docId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    // ini utk mengecek apakah ddocumentnya loading, karna dlm convex, undefined === loading
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm ">
      <div className="flex items-center gap-x-1 p-2">
        <MagnifyingGlassIcon className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 bg-secondary px-2 focus-visible:ring-transparent"
          placeholder="Filter by page title"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden pb-2 text-center text-xs text-muted-foreground last:block">
          No documents found.
        </p>
        {filteredDocuments?.map((doc) => (
          <div
            key={doc._id}
            role="button"
            onClick={() => onClick(doc._id)}
            className="flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5"
          >
            <span className="truncate pl-2">{doc.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, doc._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <ResetIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onDelete(doc._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <TrashIcon className="h-4 w-4 text-destructive/80" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
