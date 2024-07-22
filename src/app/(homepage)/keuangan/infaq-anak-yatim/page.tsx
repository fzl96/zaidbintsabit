import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { TableLoader } from "@/components/table-loader";
import { Suspense } from "react";
import { KeuanganTable } from "../_components/keuangan-table";

export default function InfaqaAnakYatimPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    tipe?: string;
  };
}) {
  const currentPage = Number(searchParams?.page ?? 1);
  const tipe = searchParams.tipe ?? "semua";

  return (
    <MaxWidthWrapper className="md:mt-20 mt-10">
      <h1 className="text-3xl text-center tracking-tight font-semibold">
        Infaq Anak Yatim
      </h1>
      <div>
        <Suspense fallback={<TableLoader />}>
          <KeuanganTable
            page={currentPage}
            tipe={tipe as "semua" | "pengeluaran" | "pemasukan"}
            kategori="yatim"
          />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
