import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { TableLoader } from "@/components/table-loader";
import { CreateJadwalTahsin } from "./_components/actions";
import { JadwalTahsinTable } from "./_components/table";
import { unstable_noStore as noStore } from "next/cache";

export const metadata: Metadata = {
  title: "Jadwal Tahsin",
};

export default function JadwalTahsinPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  noStore();
  const currentPage = Number(searchParams?.page ?? 1);

  return (
    <Wrapper>
      <BreadcrumbComponent
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Jadwal Tahsin", href: "/dashboard/jadwal-tahsin" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Jadwal Tahsin">
          <CreateJadwalTahsin />
        </PageTitle>

        <Suspense fallback={<TableLoader />}>
          <JadwalTahsinTable page={currentPage} />
        </Suspense>
      </div>
    </Wrapper>
  );
}
