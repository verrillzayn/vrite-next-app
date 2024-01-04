import { ReloadIcon } from "@radix-ui/react-icons";

import { cva } from "class-variance-authority";
import { cn } from "@lib/utils/ui";

const spinnerVariant = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-2 w-2",
      lg: "h-6 w-6",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const Spinner = ({ size }) => {
  // return <ReloadIcon className={cn(spinnerVariant({ size }))} />;
  return (
    <svg
      className={cn(spinnerVariant({ size }))}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
