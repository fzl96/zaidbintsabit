import { Metadata } from "next";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { PostForm } from "../_components/form";

export const metadata: Metadata = {
  title: "Tambah Post",
};

export default function TambahPostPage() {
  return (
    <Wrapper>
      <PostForm
        action="create"
        breadCrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Post", href: "/dashboard/post" },
          { label: "Tambah", href: "/dashboard/post/tambah" },
        ]}
      />
    </Wrapper>
  );
}
