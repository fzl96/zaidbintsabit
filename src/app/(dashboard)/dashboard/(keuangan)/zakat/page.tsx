import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { TableLoader } from "@/components/table-loader";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ZakatTable } from "./_components/table";

export const metadata: Metadata = {
  title: "Zakat",
};

export default function ZakatPage({
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
          { title: "Zakat", href: "/dashboard/zakat" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Zakat">
          <Link href="/dashboard/zakat/tambah" className={buttonVariants()}>
            Tambah
          </Link>
        </PageTitle>

        <Suspense fallback={<TableLoader />}>
          <ZakatTable page={currentPage} query={query} />
        </Suspense>
      </div>
    </Wrapper>
  );
}
