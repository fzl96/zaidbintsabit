"use server";

import {
  createPost,
  updatePost,
  deletePost,
} from "@/server/api/post/mutations";
import {
  insertPostSchema,
  type NewPostParams,
  type UpdatePostParams,
  type PostId,
} from "@/server/db/schema/post";

const handleErrors = (e: unknown) => {
  const errMsg = { error: "Terjadi Kesalahan" };

  if (e instanceof Error) {
    const err = { error: e.message };
    return e.message.length > 0 ? err : errMsg;
  }
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? { error: errAsStr } : errMsg;
  }

  return errMsg;
};

export const createPostAction = async (input: NewPostParams) => {
  try {
    const payload = insertPostSchema.parse(input);
    const res = await createPost(payload);
    if (res.error) throw new Error(res.error);
    return;
  } catch (err) {
    return handleErrors(err);
  }
};

export const updatePostAction = async (input: UpdatePostParams) => {
  try {
    const payload = insertPostSchema.parse(input);
    const res = await updatePost(payload.id!, payload);
    if (res?.error) throw new Error(res.error);
    return;
  } catch (err) {
    handleErrors(err);
  }
};

export const deletePostAction = async (input: PostId) => {
  try {
    const res = await deletePost(input);
    if (res?.error) throw new Error(res.error);
  } catch (err) {
    handleErrors(err);
  }
};
