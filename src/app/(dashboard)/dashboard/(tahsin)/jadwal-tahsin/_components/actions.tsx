"use client";

import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";
import { JadwalTahsinForm } from "./form";
import { useState } from "react";
import { JadwalTahsinId, type JadwalTahsin } from "@/server/db/schema/tahsin";

export function CreateJadwalTahsin() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title="Tambah Jadwal Tahsin"
      description="Isi form untuk menambah data jadwal tahsin baru"
      trigger="add"
      open={open}
      setOpen={setOpen}
    >
      <JadwalTahsinForm action="create" close={() => setOpen(false)} />
    </DrawerDialog>
  );
}

export function UpdateJadwalTahsin({
  jadwalTahsin,
}: {
  jadwalTahsin: JadwalTahsin;
}) {
  const [open, setOpen] = useState(false);
  return (
    <DrawerDialog
      title={`Edit Data Jadwal Tahsin`}
      description={`Isi form untuk mengubah data jadwal tahsin ini`}
      trigger="edit"
      open={open}
      setOpen={setOpen}
    >
      <JadwalTahsinForm
        jadwalTahsinId={jadwalTahsin.id}
        jadwalTahsin={jadwalTahsin}
        action="update"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}

export function DeleteJadwalTahsin({
  jadwalTahsinId,
}: {
  jadwalTahsinId: JadwalTahsinId;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title={`Hapus Data Jadwal Tahsin`}
      description={`Apakah anda yakin ingin menghapus data jadwal tahsin ini?`}
      trigger="delete"
      open={open}
      setOpen={setOpen}
    >
      <JadwalTahsinForm
        jadwalTahsinId={jadwalTahsinId}
        action="delete"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}
