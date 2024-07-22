import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { CreateInfaqAnakYatim } from "./_components/actions";
import { TableLoader } from "@/components/table-loader";
import { AnakYatimTable } from "./_components/table-anak-yatim";
import { ExportFinance } from "../_components/export";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Infaq Anak Yatim",
};

export default function InfaqAnakYatimPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    month?: string;
    year?: string;
    tipe?: string;
  };
}) {
  const currentPage = Number(searchParams?.page ?? 1);
  const date = new Date();
  const tipe = searchParams.tipe ?? "semua";
  const month = Number(searchParams?.month ?? date.getMonth() + 1);
  const year = Number(searchParams?.year ?? date.getFullYear());

  return (
    <Wrapper>
      <BreadcrumbComponent
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Infaq Anak Yatim", href: "/dashboard/infaq-anak-yatim" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Infaq Anak Yatim">
          <div className="flex items-center gap-2 md:flex-row flex-col">
            <Suspense fallback={<Skeleton className="h-10 w-20" />}>
              <ExportFinance month={month} year={year} kategori="yatim" />
            </Suspense>
            <CreateInfaqAnakYatim />
          </div>
        </PageTitle>

        <Suspense fallback={<TableLoader />}>
          <AnakYatimTable
            page={currentPage}
            tipe={tipe as "semua" | "pengeluaran" | "pemasukan"}
          />
        </Suspense>
      </div>
    </Wrapper>
  );
}
