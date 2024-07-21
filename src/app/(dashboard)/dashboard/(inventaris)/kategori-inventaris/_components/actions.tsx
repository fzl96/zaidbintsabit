"use client";

import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";
import { KategoriInventarisForm } from "./form";
import { useState } from "react";
import {
  KategoriInventarisId,
  type KategoriInventaris,
} from "@/server/db/schema/inventaris";

export function CreateKategoriInventaris() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title="Tambah Kategori Inventaris"
      description="Isi form untuk menambah data kategori inventaris baru"
      trigger="add"
      open={open}
      setOpen={setOpen}
    >
      <KategoriInventarisForm action="create" close={() => setOpen(false)} />
    </DrawerDialog>
  );
}

export function UpdateKategoriInventaris({
  kategoriInventaris,
}: {
  kategoriInventaris: KategoriInventaris;
}) {
  const [open, setOpen] = useState(false);
  return (
    <DrawerDialog
      title={`Edit Data Kategori Inventaris`}
      description={`Isi form untuk mengubah data kategori inventaris ini`}
      trigger="edit"
      open={open}
      setOpen={setOpen}
    >
      <KategoriInventarisForm
        kategoriInventarisId={kategoriInventaris.id}
        kategoriInventaris={kategoriInventaris}
        action="update"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}

export function DeleteKategoriInventaris({
  kategoriInventarisId,
}: {
  kategoriInventarisId: KategoriInventarisId;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title={`Hapus Data Kategori Inventaris`}
      description={`Apakah anda yakin ingin menghapus data kategori inventaris ini?`}
      trigger="delete"
      open={open}
      setOpen={setOpen}
    >
      <KategoriInventarisForm
        kategoriInventarisId={kategoriInventarisId}
        action="delete"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}
