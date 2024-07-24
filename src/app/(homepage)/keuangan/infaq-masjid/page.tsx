import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { TableLoader } from "@/components/table-loader";
import { Suspense } from "react";
import { KeuanganTable } from "../_components/keuangan-table";
import { unstable_noStore as noStore } from "next/cache";

export default function InfaqMasjidPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    tipe?: string;
  };
}) {
  noStore();
  const currentPage = Number(searchParams?.page ?? 1);
  const tipe = searchParams.tipe ?? "semua";

  return (
    <MaxWidthWrapper className="md:mt-20 mt-10">
      <h1 className="text-3xl text-center tracking-tight font-semibold">
        Infaq Masjid
      </h1>
      <div>
        <Suspense fallback={<TableLoader />}>
          <KeuanganTable
            page={currentPage}
            tipe={tipe as "semua" | "pengeluaran" | "pemasukan"}
            kategori="infaq"
          />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
