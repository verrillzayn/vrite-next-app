import Footer from "@/components/marketing-page/footer";
import Heading from "@/components/marketing-page/heading";
import Heroes from "@/components/marketing-page/heroes";

export default function MarketingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 pb-10 text-center md:justify-start ">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
}
