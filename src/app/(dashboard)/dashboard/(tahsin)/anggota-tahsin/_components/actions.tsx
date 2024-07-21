"use client";

import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";
import { AnggotaTahsinForm } from "./form";
import { useState } from "react";
import { AnggotaTahsinId, type AnggotaTahsin } from "@/server/db/schema/tahsin";

export function CreateAnggotaTahsin() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title="Tambah Anggota Tahsin"
      description="Isi form untuk menambah data anggota tahsin baru"
      trigger="add"
      open={open}
      setOpen={setOpen}
    >
      <AnggotaTahsinForm action="create" close={() => setOpen(false)} />
    </DrawerDialog>
  );
}

export function UpdateAnggotaTahsin({
  anggotaTahsin,
}: {
  anggotaTahsin: AnggotaTahsin;
}) {
  const [open, setOpen] = useState(false);
  return (
    <DrawerDialog
      title={`Edit Data Anggota Tahsin`}
      description={`Isi form untuk mengubah data anggota tahsin ini`}
      trigger="edit"
      open={open}
      setOpen={setOpen}
    >
      <AnggotaTahsinForm
        anggotaTahsinId={anggotaTahsin.id}
        anggotaTahsin={anggotaTahsin}
        action="update"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}

export function DeleteAnggotaTahsin({
  anggotaTahsinId,
}: {
  anggotaTahsinId: AnggotaTahsinId;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title={`Hapus Data Anggota Tahsin`}
      description={`Apakah anda yakin ingin menghapus data anggota tahsin ini?`}
      trigger="delete"
      open={open}
      setOpen={setOpen}
    >
      <AnggotaTahsinForm
        anggotaTahsinId={anggotaTahsinId}
        action="delete"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}
