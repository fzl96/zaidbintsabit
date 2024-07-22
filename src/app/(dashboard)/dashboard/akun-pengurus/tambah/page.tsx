import { Metadata } from "next";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { AkunForm } from "../_components/form";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";

export const metadata: Metadata = {
  title: "Tambah Akun Pengurus",
};

export default function TambahUserPage() {
  return (
    <Wrapper>
      <BreadcrumbComponent
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Akun Pengurus", href: "/dashboard/akun-pengurus" },
          { title: "Tambah", href: "/dashboard/akun-pengurus/tambah" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Tambah Akun Pengurus" />

        <AkunForm action="create" />
      </div>
    </Wrapper>
  );
}
