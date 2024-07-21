import { Metadata } from "next";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { PengurusForm } from "../_components/form";

export const metadata: Metadata = {
  title: "Tambah Pengurus Masjid",
};

export default function TambahJadwalTahsinPage() {
  return (
    <Wrapper>
      <BreadcrumbComponent
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Pengurus Masjid", href: "/dashboard/pengurus" },
          { title: "Tambah", href: "/dashboard/pengurus/tambah" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Tambah Pengurus Masjid" />

        <div>
          <PengurusForm action="create" />
        </div>
      </div>
    </Wrapper>
  );
}
