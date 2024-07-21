import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { CreateInfaqAnakYatim } from "./_components/actions";
import { TableLoader } from "@/components/table-loader";
import { InfaqMasjidTable } from "./_components/infaq-masjid-table";
import { TypeFilter } from "../_components/type-filter";

export const dynamic = "force";
export const metadata: Metadata = {
  title: "Infaq Masjid",
};

export default function InfaqMasjidPage({
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
          { title: "Infaq Masjid", href: "/dashboard/infaq-masjid" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Infaq Masjid">
          <CreateInfaqAnakYatim />
        </PageTitle>

        <Suspense fallback={<TableLoader />}>
          <InfaqMasjidTable
            page={currentPage}
            tipe={tipe as "semua" | "pengeluaran" | "pemasukan"}
          />
        </Suspense>
      </div>
    </Wrapper>
  );
}
