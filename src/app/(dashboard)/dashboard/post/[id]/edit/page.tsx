import { Metadata } from "next";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { EditPostForm } from "./_components/edit-form";
import { unstable_noStore as noStore } from "next/cache";

export const metadata: Metadata = {
  title: "Edit Post",
};

export default function EditPostPage({ params }: { params: { id: string } }) {
  noStore();
  const id = params.id;
  return (
    <Wrapper>
      <EditPostForm id={id} />
    </Wrapper>
  );
}
