"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { UploadDropzone } from "@lib/utils/uploadthing";
import { useCoverImage } from "@lib/hooks/use-image-cover";

import { api } from "@convex/_generated/api";

import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

export const CoverImageModal = () => {
  const coverImage = useCoverImage();
  const params = useParams();

  const updateDoc = useMutation(api.documents.updateDoc);

  const onUploadComplete = async (res) => {
    const file = res[0];
    await updateDoc({
      id: params.documentId,
      coverImage: { imageUrl: file.url, imageKey: file.key },
    });
    coverImage.onClose();
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image </h2>
        </DialogHeader>

        <UploadDropzone
          endpoint="coverImage"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            onUploadComplete(res);
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
          onUploadBegin={(name) => {
            // Do something once upload begins
            console.log("Uploading: ", name);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
