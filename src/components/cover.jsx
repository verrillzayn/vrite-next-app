"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Cross2Icon, ImageIcon } from "@radix-ui/react-icons";

import { cn } from "@lib/utils/ui";
import { useCoverImage } from "@lib/hooks/use-image-cover";

import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

import { removeImage } from "@/app/actions";

export default function Cover({ imageUrl, imageKey, preview }) {
  const coverImage = useCoverImage();
  const params = useParams();

  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    try {
      await removeCoverImage({
        id: params.documentId,
      });
      await removeImage(imageKey);
      // await utapi.deleteFiles(ImageKey);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cn(
        "group relative h-[33vh] w-full",
        !imageUrl && "h-[10vh]",
        // imageUrl && "bg-muted",
      )}
    >
      {!!imageUrl && (
        <>
          <div className="z-10 h-full animate-pulse bg-primary/20" />
          <Image
            priority
            src={imageUrl}
            fill
            alt="Image Cover"
            className="object-cover"
          />
        </>
      )}
      {imageUrl && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <Button
            onClick={() => coverImage.onReplace(imageKey)}
            variant="outline"
            size="sm"
            className="text-xs text-muted-foreground"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Change Cover
          </Button>
          <Button
            onClick={onRemove}
            variant="outline"
            size="sm"
            className="text-xs text-muted-foreground"
          >
            <Cross2Icon className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="h-[12vh] w-full" />;
};
