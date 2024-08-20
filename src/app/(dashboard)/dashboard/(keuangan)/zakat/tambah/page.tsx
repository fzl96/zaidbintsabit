import { Metadata } from "next";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { ZakatForm } from "../_components/form";

export const metadata: Metadata = {
  title: "Tambah Zakat",
};

export default function TambahZakatPage() {
  return (
    <Wrapper>
      <BreadcrumbComponent
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Zakat", href: "/dashboard/zakat" },
          { title: "Tambah", href: "/dashboard/zakat/tambah" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Tambah Zakat" />

        <div>
          <ZakatForm action="create" />
        </div>
      </div>
    </Wrapper>
  );
}
