import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { TableLoader } from "@/components/table-loader";
import { InventarisTable } from "./_components/table";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateInventarisButton } from "./_components/create-button";
import { ExportInventaris } from "./_components/export";
import { unstable_noStore as noStore } from "next/cache";

export const metadata: Metadata = {
  title: "Inventaris",
};

export default function InventarisPage({
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
          { title: "Inventaris", href: "/dashboard/inventaris" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Inventaris">
          <div className="flex items-center gap-2 md:flex-row flex-col">
            <Suspense fallback={<Skeleton className="h-10 w-20" />}>
              <ExportInventaris />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-10 w-20" />}>
              <CreateInventarisButton />
            </Suspense>
          </div>
        </PageTitle>

        <Suspense fallback={<TableLoader />}>
          <InventarisTable page={currentPage} query={query} />
        </Suspense>
      </div>
    </Wrapper>
  );
}
