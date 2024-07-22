"use client";

import { useState } from "react";
import { PostForm } from "./form";
import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";
import { type PostId } from "@/server/db/schema/post";

export function DeletePost({ postId }: { postId: PostId }) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title="Hapus Post"
      description="Apakah anda yakin ingin menghapus data postingan ini?"
      trigger="delete"
      open={open}
      setOpen={setOpen}
    >
      <PostForm postId={postId} action="delete" close={() => setOpen(false)} />
    </DrawerDialog>
  );
}
