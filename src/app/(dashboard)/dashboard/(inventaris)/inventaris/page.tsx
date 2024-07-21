import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { TableLoader } from "@/components/table-loader";
import { CreateInventaris } from "./_components/actions";
import { InventarisTable } from "./_components/table";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateInventarisButton } from "./_components/create-button";

export const dynamic = "force";
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
          <Suspense fallback={<Skeleton className="h-4 w-10" />}>
            <CreateInventarisButton />
          </Suspense>
        </PageTitle>

        <Suspense fallback={<TableLoader />}>
          {/* <KategoriInventarisTable page={currentPage} query={query} /> */}
          <InventarisTable page={currentPage} query={query} />
        </Suspense>
      </div>
    </Wrapper>
  );
}
