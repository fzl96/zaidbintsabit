"use server";

import {
  createUser,
  updateUser,
  deleteUser,
} from "@/server/api/users/mutations";
import { akunSchema, AkunParams } from "@/server/db/schema/users";

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

export const createUserAction = async (input: AkunParams) => {
  try {
    const payload = akunSchema.parse(input);
    const res = await createUser(payload);
    if (res.error) throw new Error(res.error);
    return;
  } catch (err) {
    return handleErrors(err);
  }
};

export const updateUserAction = async (input: AkunParams) => {
  try {
    const payload = akunSchema.parse(input);

    if (!payload.id) {
      return { error: "ID tidak valid" };
    }

    const res = await updateUser(payload.id, payload);
    if (res.error) throw new Error(res.error);
    return;
  } catch (err) {
    return handleErrors(err);
  }
};

export const deleteUserAction = async (input: string) => {
  try {
    const res = await deleteUser(input);
    if (res.error) throw new Error(res.error);
  } catch (err) {
    return handleErrors(err);
  }
};
