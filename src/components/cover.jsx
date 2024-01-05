"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Cross2Icon, ImageIcon } from "@radix-ui/react-icons";

import { cn } from "@lib/utils/ui";
import { useCoverImage } from "@lib/hooks/use-image-cover";

export default function Cover({ imageUrl, ImageKey, preview }) {
  const coverImage = useCoverImage();

  return (
    <div
      className={cn(
        "group relative h-[33vh] w-full",
        !imageUrl && "h-[10vh]",
        imageUrl && "bg-muted",
      )}
    >
      {!!imageUrl && (
        <Image src={imageUrl} fill alt="Image Cover" className="object-cover" />
      )}
      {imageUrl && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <Button
            onClick={coverImage.onOpen}
            variant="outline"
            size="sm"
            className="text-xs text-muted-foreground"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Change Cover
          </Button>
          <Button
            onClick={() => {}}
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
