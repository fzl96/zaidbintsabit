import { Metadata } from "next";
import { Suspense } from "react";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { TableLoader } from "@/components/table-loader";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PostTable } from "./_components/table";
import { unstable_noStore as noStore } from "next/cache";

export const metadata: Metadata = {
  title: "Post",
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
          { title: "Post", href: "/dashboard/post" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Post">
          <Link href="/dashboard/post/tambah" className={buttonVariants()}>
            Tambah
          </Link>
        </PageTitle>

        <Suspense fallback={<TableLoader />}>
          <PostTable page={currentPage} query={query} />
        </Suspense>
      </div>
    </Wrapper>
  );
}
