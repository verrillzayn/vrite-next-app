import CreateDocBtn from "@/components/main-page/create-doc-btn";
import Username from "@/components/main-page/user";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function DocumentsPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height={300}
        width={300}
        alt="empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height={300}
        width={300}
        alt="empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to <Username />
        &apos;s Vrite
      </h2>
      <CreateDocBtn />
    </div>
  );
}
