import { Metadata } from "next";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { EditZakatForm } from "./_components/edit-form";

export const metadata: Metadata = {
  title: "Edit Zakat Masjid",
};

export default function EditZakatPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <Wrapper>
      <BreadcrumbComponent
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Zakat", href: "/dashboard/zakat" },
          { title: "Edit", href: `/dashboard/zakat/${id}/edit` },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Tambah Zakat Masjid" />

        <div>
          <EditZakatForm id={Number(id)} />
        </div>
      </div>
    </Wrapper>
  );
}
