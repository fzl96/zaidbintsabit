"use server";

import {
  createKeuangan,
  deleteKeuangan,
  updateKeuangan,
} from "@/server/api/keuangan/mutations";
import {
  insertFinanceSchema,
  UpdateKeuanganParams,
  type NewKeuanganParams,
  KeuanganId,
} from "@/server/db/schema/keuangan";
import { revalidatePath } from "next/cache";

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

export const createKeuanganAction = async (input: NewKeuanganParams) => {
  try {
    const payload = insertFinanceSchema.parse(input);
    const res = await createKeuangan(payload);
    if (res.error) throw new Error(res.error);
    revalidatePath("/dashboard");
    return;
  } catch (error) {
    return handleErrors(error);
  }
};

export const updateKeuanganAction = async (input: UpdateKeuanganParams) => {
  try {
    const payload = insertFinanceSchema.parse(input);
    const res = await updateKeuangan(Number(payload.id), payload);
    if (res?.error) throw new Error(res.error);
    revalidatePath("/dashboard");
    return;
  } catch (err) {
    return handleErrors(err);
  }
};

export const deleteKeuanganAction = async (input: KeuanganId) => {
  try {
    // const payload = keuanganIdScehma.parse(input);
    const res = await deleteKeuangan(input);
    if (res?.error) throw new Error(res.error);
    revalidatePath("/dashboard");
  } catch (err) {
    return handleErrors(err);
  }
};
