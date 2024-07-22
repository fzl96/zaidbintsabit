import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { TableLoader } from "@/components/table-loader";
import { Suspense } from "react";
import { JadwalTahsinTable } from "./_components/table";

export default function TahsinPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page ?? 1);

  return (
    <MaxWidthWrapper className="md:mt-20 mt-10">
      <h1 className="text-3xl text-center tracking-tight font-semibold">
        Jadwal Tahsin
      </h1>
      <div className="mt-10">
        <Suspense fallback={<TableLoader />}>
          <JadwalTahsinTable page={currentPage} />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
