"use client";

import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";
import { InventarisForm } from "./form";
import { useState } from "react";
import {
  InventarisId,
  type Inventaris,
  type KategoriInventaris,
} from "@/server/db/schema/inventaris";

export function CreateInventaris({
  kategori,
}: {
  kategori: KategoriInventaris[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title="Tambah Inventaris"
      description="Isi form untuk menambah data inventaris baru"
      trigger="add"
      open={open}
      setOpen={setOpen}
    >
      <InventarisForm
        action="create"
        close={() => setOpen(false)}
        kategori={kategori}
      />
    </DrawerDialog>
  );
}

export function UpdateInventaris({
  inventaris,
  kategori,
}: {
  inventaris: Inventaris;
  kategori: KategoriInventaris[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <DrawerDialog
      title={`Edit Data Inventaris`}
      description={`Isi form untuk mengubah data inventaris ini`}
      trigger="edit"
      open={open}
      setOpen={setOpen}
    >
      <InventarisForm
        inventarisId={inventaris.id}
        inventaris={inventaris}
        kategori={kategori}
        action="update"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}

export function DeleteInventaris({
  inventarisId,
}: {
  inventarisId: InventarisId;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title={`Hapus Data Inventaris`}
      description={`Apakah anda yakin ingin menghapus data inventaris ini?`}
      trigger="delete"
      open={open}
      setOpen={setOpen}
    >
      <InventarisForm
        inventarisId={inventarisId}
        action="delete"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}
