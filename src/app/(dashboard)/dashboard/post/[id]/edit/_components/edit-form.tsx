import { getPostById } from "@/server/api/post/queries";
import { PostForm } from "@/app/(dashboard)/dashboard/post/_components/form";

export async function EditPostForm({ id }: { id: string }) {
  const post = await getPostById({ id });

  return (
    <PostForm
      post={post}
      action="update"
      breadCrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Post", href: "/dashboard/post" },
        { label: "Edit", href: `/dashboard/post/${id}/edit` },
      ]}
    />
  );
}
