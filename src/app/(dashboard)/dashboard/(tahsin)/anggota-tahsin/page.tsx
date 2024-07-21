import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { TableLoader } from "@/components/table-loader";
import { CreateAnggotaTahsin } from "./_components/actions";
import { AnggotaTahsinTable } from "./_components/table";
// import { CreateJadwalTahsin } from "./_components/actions";
// import { JadwalTahsinTable } from "./_components/table";

export const metadata: Metadata = {
  title: "Anggota Tahsin",
};

export default function JadwalTahsinPage({
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
          { title: "Anggota Tahsin", href: "/dashboard/anggota-tahsin" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Anggota Tahsin">
          <CreateAnggotaTahsin />
        </PageTitle>

        <Suspense fallback={<TableLoader />}>
          <AnggotaTahsinTable page={currentPage} query={query} />
        </Suspense>
      </div>
    </Wrapper>
  );
}
