import { Metadata } from "next";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { Suspense } from "react";
import { TableLoader } from "@/components/table-loader";
import { SholatWajibTable } from "./_components/table";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Jadwal Sholat Wakib",
};

export default function JadwalSholatWajibPage() {
  return (
    <Wrapper>
      <BreadcrumbComponent
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Jadwal Sholat Wajib", href: "/dashboard/sholat-wajib" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Jadwal Sholat Wajib" />
      </div>

      <Suspense fallback={<TableLoader />}>
        <SholatWajibTable />
      </Suspense>
    </Wrapper>
  );
}
