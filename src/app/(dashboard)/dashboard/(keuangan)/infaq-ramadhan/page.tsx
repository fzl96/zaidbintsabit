import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { CreateInfaqRamadhan } from "./_components/actions";
import { TableLoader } from "@/components/table-loader";
import { InfaqMasjidTable } from "./_components/infaq-masjid-table";

export const dynamic = "force";
export const metadata: Metadata = {
  title: "Infaq Ramdhan",
};

export default function InfaqRamadhanPage({
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
          { title: "Infaq Ramadhan", href: "/dashboard/infaq-ramadhan" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Infaq Masjid">
          <CreateInfaqRamadhan />
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
