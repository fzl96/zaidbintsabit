"use server";

import {
  createAnggotaTahsin,
  updateAnggotaTahsin,
  deleteAnggotaTahsin,
} from "@/server/api/tahsin/anggota/mutations";
import {
  insertAnggotaTahsinSchema,
  type NewAnggotaTahsinParams,
  type UpdateAnggotaTahsinParams,
  type AnggotaTahsinId,
} from "@/server/db/schema/tahsin";

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

export const createAnggotaTahsinAction = async (
  input: NewAnggotaTahsinParams
) => {
  try {
    const payload = insertAnggotaTahsinSchema.parse(input);
    const res = await createAnggotaTahsin(payload);
    if (res.error) throw new Error(res.error);
    return;
  } catch (err) {
    return handleErrors(err);
  }
};

export const updateAnggotaTahsinAction = async (
  input: UpdateAnggotaTahsinParams
) => {
  try {
    const payload = insertAnggotaTahsinSchema.parse(input);
    const res = await updateAnggotaTahsin(Number(payload.id), payload);
    if (res?.error) throw new Error(res.error);
    return;
  } catch (err) {
    handleErrors(err);
  }
};

export const deleteAnggotaTahsinAction = async (input: AnggotaTahsinId) => {
  try {
    const res = await deleteAnggotaTahsin(input);
    if (res?.error) throw new Error(res.error);
  } catch (err) {
    handleErrors(err);
  }
};
