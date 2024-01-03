import HeadingButton from "@/components/marketing-page/heading-button";

export default function Heading() {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Your Ideas, Document, & Plans. Unified. Welcome To{" "}
        <span className="underline">Vrite</span>
      </h1>
      <h3 className="text-base font-medium sm:text-xl md:text-2xl">
        Vrite is the connected workspace where <br />
        Better, Faster work happens.
      </h3>
      <HeadingButton />
    </div>
  );
}
