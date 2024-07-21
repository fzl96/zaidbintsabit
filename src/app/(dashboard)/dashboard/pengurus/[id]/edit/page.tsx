import { Metadata } from "next";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { EditForm } from "./_components/edif-form";
// import { PengurusForm } from "../_components/form";

export const metadata: Metadata = {
  title: "Edit Pengurus Masjid",
};

export default function JadwalTahsinPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params.id;

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
        <PageTitle title="Edit Pengurus Masjid" />

        <div>
          <EditForm id={Number(id)} />
        </div>
      </div>
    </Wrapper>
  );
}
