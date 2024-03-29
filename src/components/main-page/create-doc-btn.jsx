"use client";

import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateDocBtn() {
  const createDoc = useMutation(api.documents.createDocuments);
  const router = useRouter();

  const onCreate = () => {
    const promise = createDoc({ title: "Untitled" }).then((docId) =>
      router.push(`/documents/${docId}`),
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New Note created!",
      error: "Failed to created new note.",
    });
  };

  return (
    <Button onClick={onCreate}>
      <PlusCircledIcon className="mr-2 h-4 w-4" />
      Create a note
    </Button>
  );
}
