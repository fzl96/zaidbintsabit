import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { TableLoader } from "@/components/table-loader";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ZakatTable } from "./_components/table";
import { ExportZakat } from "./_components/export";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Zakat",
};

export default function ZakatPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    query?: string;
    month?: string;
    year?: string;
  };
}) {
  const currentPage = Number(searchParams?.page ?? 1);
  const query = searchParams.query ?? "";
  const date = new Date();
  const month = Number(searchParams?.month ?? date.getMonth() + 1);
  const year = Number(searchParams?.year ?? date.getFullYear());

  return (
    <Wrapper>
      <BreadcrumbComponent
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Zakat", href: "/dashboard/zakat" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Zakat">
          <div className="flex items-center gap-2 md:flex-row flex-col">
            <Suspense fallback={<Skeleton className="h-10 w-20" />}>
              <ExportZakat month={month} year={year} />
            </Suspense>
            <Link href="/dashboard/zakat/tambah" className={buttonVariants()}>
              Tambah
            </Link>
          </div>
        </PageTitle>

        <Suspense fallback={<TableLoader />}>
          <ZakatTable page={currentPage} query={query} />
        </Suspense>
      </div>
    </Wrapper>
  );
}
