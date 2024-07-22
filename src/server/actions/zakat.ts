"use server";

import {
  createZakat,
  updateZakat,
  deleteZakat,
} from "@/server/api/zakat/mutations";
import { mutateSchema, ZakatId, ZakatParams } from "@/server/db/schema/zakat";

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

export const createZakatAction = async (input: ZakatParams) => {
  try {
    const payload = mutateSchema.parse(input);
    const res = await createZakat({ data: payload });
    if (res.error) throw new Error(res.error);
    return;
  } catch (err) {
    return handleErrors(err);
  }
};

export const updateZakatAction = async (input: ZakatParams) => {
  try {
    const payload = mutateSchema.parse(input);

    if (!payload.id) {
      return { error: "ID tidak valid" };
    }

    const res = await updateZakat({ id: payload.id, data: payload });
    if (res.error) throw new Error(res.error);
    return;
  } catch (err) {
    return handleErrors(err);
  }
};

export const deleteZakatAction = async (input: ZakatId) => {
  try {
    const res = await deleteZakat({ id: input });
    if (res.error) throw new Error(res.error);
  } catch (err) {
    return handleErrors(err);
  }
};
