import Logo from "@/components/marketing-page/logo";
import Navbar from "@/components/marketing-page/navbar";

export default function MarketingLayout({ children }) {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <Navbar>
        <Logo />
      </Navbar>
      <main className="h-full pt-40">{children}</main>
    </div>
  );
}
