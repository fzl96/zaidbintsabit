import { Metadata } from "next";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Suspense } from "react";
import { PengurusCards } from "./_components/pengurus-cards";

export const metadata: Metadata = {
  title: "Imam dan Muadzin",
  description: "Imam dan Muadzin",
};

export default async function Page() {
  return (
    <MaxWidthWrapper className="mb-12 md:mt-20 mt-10 flex flex-col w-full items-center min-h-screen">
      <div className="flex flex-col gap-5">
        <div className="">
          <h1 className="mb-0 text-center text-4xl md:text-5xl font-bold tracking-tight">
            Imam dan Muadzin
          </h1>
          <h1 className="mt-0 text-center text-4xl md:text-5xl font-bold tracking-tight">
            Masjid Zaid bin Tsabit
          </h1>
        </div>
        <hr />
        <Suspense fallback={<>Loading...</>}>
          <PengurusCards />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
