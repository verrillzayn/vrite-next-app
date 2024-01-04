import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { FileIcon } from "@radix-ui/react-icons";
import { cn } from "@lib/utils/ui";

import NavItem from "@/components/main-page/nav-item";

export default function DocumentList({ parentDocumentId, level = 0 }) {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState({});

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const onExpand = (docId) => {
    setExpanded((prev) => ({
      ...prev,
      [docId]: !prev[docId],
    }));
  };

  const onRedirect = (docId) => {
    router.push(`/documents/${docId}`);
  };

  if (documents === undefined) {
    // ini utk mengecek apakah ddocumentnya loading, karna dlm convex, undefined === loading
    return (
      <>
        <NavItem.Skeleton level={level} />

        {level === 0 && (
          <>
            <NavItem.Skeleton level={level} />
            <NavItem.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden",
        )}
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
      >
        No pages inside
      </p>
      {documents.map((doc) => (
        <div key={doc._id}>
          <NavItem
            id={doc._id}
            onClick={() => onRedirect(doc._id)}
            label={doc.title}
            icon={FileIcon}
            documentIcon={doc.icon}
            active={params.documentId === doc._id}
            level={level}
            onExpand={() => onExpand(doc._id)}
            expanded={expanded[doc._id]}
          />
          {expanded[doc._id] && (
            <DocumentList parentDocumentId={doc._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
}
