import { Metadata } from "next";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { Suspense } from "react";
import { TableLoader } from "@/components/table-loader";
import { SholatIedTable } from "./_components/table";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Jadwal Sholat Jum'at",
};

export default function JadwalSholatWajibPage() {
  return (
    <Wrapper>
      <BreadcrumbComponent
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Jadwal Sholat Jum'at", href: "/dashboard/sholat-jumat" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Jadwal Sholat Jum'at" />
      </div>

      <Suspense fallback={<TableLoader />}>
        <SholatIedTable />
      </Suspense>
    </Wrapper>
  );
}
