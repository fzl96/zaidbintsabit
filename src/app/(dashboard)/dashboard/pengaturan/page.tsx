import { Metadata } from "next";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { PageTitle } from "@/app/(dashboard)/_components/page-title";
import { AkunForm } from "./_components/form";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Pengaturan",
  description: "Pengaturan akun pengguna",
};

export default async function PengaturanPage() {
  const user = await currentUser();

  return (
    <Wrapper>
      <PageTitle title="Pengaturan" />
      {/* @ts-ignore */}
      {user && <AkunForm user={user} />}
    </Wrapper>
  );
}
