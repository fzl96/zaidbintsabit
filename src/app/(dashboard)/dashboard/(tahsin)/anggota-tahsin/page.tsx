import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { TableLoader } from "@/components/table-loader";
import { CreateAnggotaTahsin } from "./_components/actions";
import { AnggotaTahsinTable } from "./_components/table";
import { ExportAnggotaTahsin } from "./_components/export";
import { Skeleton } from "@/components/ui/skeleton";
import { unstable_noStore as noStore } from "next/cache";

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
  noStore();
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
          <div className="flex items-center gap-2 md:flex-row flex-col">
            <Suspense fallback={<Skeleton className="h-10 w-20" />}>
              <ExportAnggotaTahsin />
            </Suspense>
            <CreateAnggotaTahsin />
          </div>
        </PageTitle>

        <Suspense fallback={<TableLoader />}>
          <AnggotaTahsinTable page={currentPage} query={query} />
        </Suspense>
      </div>
    </Wrapper>
  );
}
