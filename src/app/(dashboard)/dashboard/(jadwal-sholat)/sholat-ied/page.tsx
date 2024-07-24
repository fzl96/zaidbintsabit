import { Metadata } from "next";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { Suspense } from "react";
import { TableLoader } from "@/components/table-loader";
import { SholatIedTable } from "./_components/table";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Jadwal Ied",
};

export default function JadwalSholatWajibPage() {
  noStore();
  return (
    <Wrapper>
      <BreadcrumbComponent
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Jadwal Sholat Ied", href: "/dashboard/sholat-ied" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Jadwal Sholat Ied" />
      </div>

      <Suspense fallback={<TableLoader />}>
        <SholatIedTable />
      </Suspense>
    </Wrapper>
  );
}
