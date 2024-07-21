import { Metadata } from "next";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { Suspense } from "react";
import { TableLoader } from "@/components/table-loader";
import { SholatTarawihTable } from "./_components/table";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Jadwal Sholat Tarawih",
};

export default function JadwalSholaTarawihPage() {
  return (
    <Wrapper>
      <BreadcrumbComponent
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Jadwal Sholat Tarawih", href: "/dashboard/sholat-tarawih" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Jadwal Sholat Tarawih" />
      </div>

      <Suspense fallback={<TableLoader />}>
        <SholatTarawihTable />
      </Suspense>
    </Wrapper>
  );
}
