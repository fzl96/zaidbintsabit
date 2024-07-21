import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { TableLoader } from "@/components/table-loader";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PenguruTable } from "./_components/table";

export const metadata: Metadata = {
  title: "Pengurus Masjid",
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
          { title: "Pengurus Masjid", href: "/dashboard/pengurus" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Pengurus Masjid">
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
