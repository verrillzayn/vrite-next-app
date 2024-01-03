import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@lib/utils/ui";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Logo() {
  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <Image
        src="/logo-light.png"
        height="40"
        width="40"
        alt="App Logo"
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.png"
        height="40"
        width="40"
        alt="App Logo"
        className="hidden dark:block"
      />
      <p className={cn("font-semibold", poppins.className)}>Vrite</p>
    </div>
  );
}
