import Navigation from "@/components/main-page/navigation";
import AuthLayout from "@/components/providers/auth-layout-providers";
import { SearchCommand } from "@/components/search-command";

export default function MainLayout({ children }) {
  return (
    <AuthLayout>
      <div className="flex h-screen min-h-[100vh] dark:bg-[#1F1F1F]">
        <Navigation>
          <main className="h-full flex-1 overflow-y-auto">
            <SearchCommand />
            {children}
          </main>
        </Navigation>
      </div>
    </AuthLayout>
  );
}
