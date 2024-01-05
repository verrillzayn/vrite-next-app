import { IconPicker } from "@/components/icon-picker";
import { Button } from "@/components/ui/button";
import { api } from "@convex/_generated/api";
import { Cross2Icon, FaceIcon, ImageIcon } from "@radix-ui/react-icons";
import { useMutation } from "convex/react";
import { useCoverImage } from "@lib/hooks/use-image-cover";
import { useRef, useState } from "react";
import TextareaAutoSize from "react-textarea-autosize";

export function Toolbar({ initialData, preview }) {
  const updateDoc = useMutation(api.documents.updateDoc);
  const removeIcon = useMutation(api.documents.removeIcon);

  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (val) => {
    setValue(val);
    updateDoc({
      id: initialData._id,
      title: val || "Untitled",
    });
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon) => {
    console.log("asd");
    updateDoc({
      id: initialData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  return (
    <div className="group relative pl-[54px]">
      {!!initialData.icon && !preview && (
        <div className="group/icon flex items-center gap-x-2 pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl transition hover:opacity-75">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full text-xs text-muted-foreground opacity-0 transition group-hover/icon:opacity-100"
            variant="outline"
            size="icon"
          >
            <Cross2Icon className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="pt-6 text-6xl">{initialData.icon}</p>
      )}
      <div className="flex items-center gap-x-1 py-4 opacity-0 group-hover:opacity-100">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              size="sm"
              variant="outline"
              className="text-xs text-muted-foreground"
            >
              <FaceIcon className="mr-2 h-4 w-4" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutoSize
          ref={inputRef}
          onChange={(e) => onInput(e.target.value)}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          className="resize-none break-words bg-transparent text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
        />
      ) : (
        <div
          onClick={enableInput}
          className="break-words pb-[11.5px] text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
}
