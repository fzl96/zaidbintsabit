"use client";

import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";
import { JadwalSholatForm } from "./form";
import { useState } from "react";
import { type JadwalSholat } from "@/server/db/schema/jadwal-sholat";

export function UpdateJadwalSholat({ jadwal }: { jadwal: JadwalSholat }) {
  const [open, setOpen] = useState(false);
  return (
    <DrawerDialog
      title={`Edit Data Infaq Ramadhan`}
      description={`Isi form untuk mengubah data infaq ramadhan ini`}
      trigger="edit"
      open={open}
      setOpen={setOpen}
    >
      <JadwalSholatForm
        jadwalSholat={jadwal}
        jadwalSholatId={jadwal.id}
        close={() => setOpen(false)}
      />
      {/* <FinanceForm
        keuanganId={finance.id}
        kategori="ramadhan"
        keuangan={finance}
        action="update"
        close={() => setOpen(false)}
      /> */}
    </DrawerDialog>
  );
}
