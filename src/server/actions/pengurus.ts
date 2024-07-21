"use server";

import {
  createPengurus,
  deletePengurus,
  updatePengurus,
} from "@/server/api/pengurus/mutations";
import {
  insertPengurusSchema,
  UpdatePengurusParams,
  type NewPengurusParams,
  PengurusId,
} from "@/server/db/schema/pengurus";

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

export const createPengurusAction = async (input: NewPengurusParams) => {
  try {
    const payload = insertPengurusSchema.parse(input);
    const res = await createPengurus(payload);
    if (res.error) throw new Error(res.error);
    return;
  } catch (error) {
    return handleErrors(error);
  }
};

export const updatePengurusAction = async (input: UpdatePengurusParams) => {
  try {
    const payload = insertPengurusSchema.parse(input);
    const res = await updatePengurus(Number(payload.id), payload);
    if (res?.error) throw new Error(res.error);
  } catch (err) {
    return handleErrors(err);
  }
};

export const deletePengurusAction = async (input: PengurusId) => {
  try {
    // const payload = keuanganIdScehma.parse(input);
    const res = await deletePengurus(input);
    if (res?.error) throw new Error(res.error);
  } catch (err) {
    return handleErrors(err);
  }
};
