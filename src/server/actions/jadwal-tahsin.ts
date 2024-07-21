"use server";

import {
  createJadwalTahsin,
  updateJadwalTahsin,
  deleteJadwalTahsin,
} from "@/server/api/tahsin/jadwal/mutations";
import {
  insertJadwalTahsinSchema,
  type NewJadwalTahsinParams,
  type UpdateJadwalTahsinParams,
  type JadwalTahsinId,
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

export const createJadwalTahsinAction = async (
  input: NewJadwalTahsinParams
) => {
  try {
    const payload = insertJadwalTahsinSchema.parse(input);
    const res = await createJadwalTahsin(payload);
    if (res.error) throw new Error(res.error);
    return;
  } catch (err) {
    return handleErrors(err);
  }
};

export const updateJadwalTahsinAction = async (
  input: UpdateJadwalTahsinParams
) => {
  try {
    const payload = insertJadwalTahsinSchema.parse(input);
    const res = await updateJadwalTahsin(Number(payload.id), payload);
    if (res?.error) throw new Error(res.error);
    return;
  } catch (err) {
    handleErrors(err);
  }
};

export const deleteJadwalTahsinAction = async (input: JadwalTahsinId) => {
  try {
    const res = await deleteJadwalTahsin(input);
    if (res?.error) throw new Error(res.error);
  } catch (err) {
    handleErrors(err);
  }
};
