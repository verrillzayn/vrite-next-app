import { Inter } from "next/font/google";
import { cn } from "@lib/utils/ui";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-providers";

import "@/style/globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Vrite",
  description: "The connected workspace, now get Better and Faster.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo-light.png",
        href: "/logo-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.png",
        href: "/logo-dark.png",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="vrite-theme"
          >
            {children}
            <Toaster position="bottom-center" />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
