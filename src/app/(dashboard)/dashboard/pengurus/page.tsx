import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { TableLoader } from "@/components/table-loader";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PenguruTable } from "./_components/table";
import { unstable_noStore as noStore } from "next/cache";

export const metadata: Metadata = {
  title: "Imam dan Muadzin Masjid",
};

export default function PengurusPage({
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
          { title: "Imam dan Muadzin", href: "/dashboard/pengurus" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Imam dan Muadzin Masjid">
          <Link href="/dashboard/pengurus/tambah" className={buttonVariants()}>
            Tambah
          </Link>
        </PageTitle>

        <Suspense fallback={<TableLoader />}>
          <PenguruTable page={currentPage} query={query} />
        </Suspense>
      </div>
    </Wrapper>
  );
}
