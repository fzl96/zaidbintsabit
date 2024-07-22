import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { TableLoader } from "@/components/table-loader";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { AkunPengurusTable } from "./_components/table";

export const metadata: Metadata = {
  title: "Akun Pengurus",
};

export default function AkunPengurusPage({
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
          { title: "Akun Pengurus", href: "/dashboard/akun-pengurus" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Akun Pengurus">
          <Link
            href="/dashboard/akun-pengurus/tambah"
            className={buttonVariants()}
          >
            Tambah
          </Link>
        </PageTitle>

        <Suspense fallback={<TableLoader />}>
          <AkunPengurusTable page={currentPage} query={query} />
          {/* <PenguruTable page={currentPage} query={query} /> */}
        </Suspense>
      </div>
    </Wrapper>
  );
}
