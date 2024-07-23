"use client";

import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";
import { FinanceForm } from "../../_components/form";
import { useState } from "react";
import { KeuanganId, type Keuangan } from "@/server/db/schema/keuangan";

export function CreateInfaqJumat() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title="Tambah Infaq Jum'at"
      description="Isi form untuk menambah data infaq jum'at baru"
      trigger="add"
      open={open}
      setOpen={setOpen}
    >
      <FinanceForm
        action="create"
        close={() => setOpen(false)}
        kategori="jumat"
      />
    </DrawerDialog>
  );
}

export function UpdateFinance({ finance }: { finance: Keuangan }) {
  const [open, setOpen] = useState(false);
  return (
    <DrawerDialog
      title={`Edit Data Infaq Jum'at`}
      description={`Isi form untuk mengubah data infaq jum'at ini`}
      trigger="edit"
      open={open}
      setOpen={setOpen}
    >
      <FinanceForm
        keuanganId={finance.id}
        kategori="jumat"
        keuangan={finance}
        action="update"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}

export function DeleteFinance({ keuanganId }: { keuanganId: KeuanganId }) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title={`Hapus Data Infaq Jum'at`}
      description={`Apakah anda yakin ingin menghapus data data infaq jum'at ini?`}
      trigger="delete"
      open={open}
      setOpen={setOpen}
    >
      <FinanceForm
        kategori="jumat"
        keuanganId={keuanganId}
        action="delete"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}
