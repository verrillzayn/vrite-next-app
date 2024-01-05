"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import Cover from "@/components/cover";
import { Toolbar } from "@/components/toolbar";

import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export default function DocumentPage({ params }) {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    [],
  );

  const document = useQuery(api.documents.getDocById, {
    documentId: params.documentId,
  });

  const updateDoc = useMutation(api.documents.updateDoc);

  const onChange = (content) => {
    updateDoc({
      id: params.documentId,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="mx-auto mt-8 md:max-w-3xl lg:max-w-4xl">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <p>Not found.</p>;
  }

  return (
    <div className="pb-40">
      <Cover
        imageUrl={document?.coverImage?.imageUrl}
        imageKey={document?.coverImage?.imageKey}
      />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document?.content} />
      </div>
    </div>
  );
}
