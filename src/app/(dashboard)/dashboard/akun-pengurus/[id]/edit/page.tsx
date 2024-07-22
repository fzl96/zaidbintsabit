import { Metadata } from "next";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { AkunForm } from "../../_components/form";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { EditForm } from "./_components/edit-form";

export const metadata: Metadata = {
  title: "Edit Akun Pengurus",
};

export default function EditUserPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <Wrapper>
      <BreadcrumbComponent
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Akun Pengurus", href: "/dashboard/akun-pengurus" },
          { title: "Edit", href: "/dashboard/akun-pengurus/edit" },
        ]}
      />
      <div className="space-y-8">
        <PageTitle title="Edit Akun Pengurus" />

        <EditForm id={id} />
      </div>
    </Wrapper>
  );
}
