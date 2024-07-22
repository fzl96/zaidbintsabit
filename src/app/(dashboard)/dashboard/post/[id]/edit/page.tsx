import { Metadata } from "next";
import { Wrapper } from "@/app/(dashboard)/_components/wrapper";
import { PostForm } from "../../_components/form";
import { EditPostForm } from "./_components/edit-form";

export const metadata: Metadata = {
  title: "Edit Post",
};

export default function EditPostPage({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <Wrapper>
      <EditPostForm id={id} />
    </Wrapper>
  );
}
