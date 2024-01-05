"use client";
import { useTheme } from "next-themes";

import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { uploadFiles } from "@lib/utils/uploadthing";
import "@blocknote/core/style.css";

export const Editor = ({ onChange, initialContent, editable }) => {
  const { resolvedTheme } = useTheme();

  const handleUploadImg = async (files) => {
    try {
      const res = await uploadFiles("editorUpload", {
        files: [files],
      });
      return res[0]?.url;
    } catch (error) {
      console.log(error);
    }
  };

  const editor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile: handleUploadImg,
    onEditorContentChange: (editor) =>
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2)),
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};
