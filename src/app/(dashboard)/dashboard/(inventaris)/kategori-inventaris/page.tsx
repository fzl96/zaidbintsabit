import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
// import { CreateInfaqMasjid } from "./_components/actions";
import { TableLoader } from "@/components/table-loader";
import { KategoriInventarisTable } from "./_components/table";
import { CreateKategoriInventaris } from "./_components/actions";
// import { InfaqMasjidTable } from "./_components/infaq-masjid-table";

export const dynamic = "force";
export const metadata: Metadata = {
  title: "Kategori Inventaris",
};

export default function InfaqMasjidPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    query?: string;
  };
}) {
  const currentPage = Number(searchParams?.page ?? 1);
  const query = searchParams.query ?? "";

  return (
    <Wrapper>
      <BreadcrumbComponent
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Infaq Masjid", href: "/dashboard/infaq-masjid" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Kategori Inventaris">
          <CreateKategoriInventaris />
        </PageTitle>

        <Suspense fallback={<TableLoader />}>
          <KategoriInventarisTable page={currentPage} query={query} />
        </Suspense>
      </div>
    </Wrapper>
  );
}
