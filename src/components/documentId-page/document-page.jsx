"use client";

import { Toolbar } from "@/components/toolbar";
import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";

export default function DocumentPage({ params }) {
  const document = useQuery(api.documents.getDocById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <p>loading...</p>;
  }

  if (document === null) {
    return <p>Not found.</p>;
  }

  return (
    <div className="pb-40">
      <div className="h-[30vh]" />
      <div className="mx-auto  md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
}
