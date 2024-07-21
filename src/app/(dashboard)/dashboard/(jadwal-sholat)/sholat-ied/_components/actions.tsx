"use client";

import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";
import { JadwalSholatForm } from "./form";
import { useState } from "react";
import { type JadwalSholat } from "@/server/db/schema/jadwal-sholat";

export function UpdateJadwalSholat({ jadwal }: { jadwal: JadwalSholat }) {
  const [open, setOpen] = useState(false);
  return (
    <DrawerDialog
      title={`Edit Data Jadwal Sholat`}
      description={`Isi form untuk mengubah data jadwal sholat ini`}
      trigger="edit"
      open={open}
      setOpen={setOpen}
    >
      <JadwalSholatForm
        jadwalSholat={jadwal}
        jadwalSholatId={jadwal.id}
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}
