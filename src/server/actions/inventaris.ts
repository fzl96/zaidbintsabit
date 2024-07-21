"use server";

import {
  createInventaris,
  updateInventaris,
  deleteInventaris,
  createKategoriInventaris,
  updateKategoriInventaris,
  deleteKategoriInvnetaris,
} from "@/server/api/inventaris/mutations";
import {
  insertInventarisSchema,
  type NewInventarisParams,
  type UpdateInventarisParams,
  type InventarisId,
  type NewKategoriInventarisParams,
  type UpdateKategoriInventarisParams,
  type KategoriInventarisId,
  insertKategoriInventarisSchema,
} from "@/server/db/schema/inventaris";

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

export const createInventarisAction = async (input: NewInventarisParams) => {
  try {
    const payload = insertInventarisSchema.parse(input);
    const res = await createInventaris(payload);
    if (res.error) throw new Error(res.error);
    return;
  } catch (err) {
    return handleErrors(err);
  }
};

export const updateInventarisAction = async (input: UpdateInventarisParams) => {
  try {
    const payload = insertInventarisSchema.parse(input);
    const res = await updateInventaris(Number(payload.id), payload);
    if (res?.error) throw new Error(res.error);
    return;
  } catch (err) {
    handleErrors(err);
  }
};

export const deleteInventarisAction = async (input: InventarisId) => {
  try {
    const res = await deleteInventaris(input);
    if (res?.error) throw new Error(res.error);
  } catch (err) {
    handleErrors(err);
  }
};

export const createKategoriInventarisAction = async (
  input: NewKategoriInventarisParams
) => {
  try {
    const payload = insertKategoriInventarisSchema.parse(input);
    const res = await createKategoriInventaris(payload);
    if (res.error) throw new Error(res.error);
    return;
  } catch (err) {
    return handleErrors(err);
  }
};

export const updateKategoriInventarisAction = async (
  input: UpdateKategoriInventarisParams
) => {
  try {
    const payload = insertKategoriInventarisSchema.parse(input);
    const res = await updateKategoriInventaris(Number(payload.id), payload);
    if (res?.error) throw new Error(res.error);
    return;
  } catch (err) {
    handleErrors(err);
  }
};

export const deleteKategoriInventarisAction = async (
  input: KategoriInventarisId
) => {
  try {
    const res = await deleteKategoriInvnetaris(input);
    if (res?.error) throw new Error(res.error);
  } catch (err) {
    handleErrors(err);
  }
};
