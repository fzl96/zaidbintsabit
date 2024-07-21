"use server";

import {
  type UpdateJadwalSholatParams,
  updateJadwalSholatSchema,
} from "@/server/db/schema/jadwal-sholat";
import { updateJadwalSholat } from "@/server/api/jadwal-sholat/mutations";

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

export const updateJadwalSholatAction = async (
  input: UpdateJadwalSholatParams
) => {
  try {
    const payload = updateJadwalSholatSchema.parse(input);
    const res = await updateJadwalSholat(Number(payload.id), payload);
    if (res?.error) throw new Error(res.error);
    return;
  } catch (err) {
    handleErrors(err);
  }
};
