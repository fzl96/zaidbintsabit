"use client";

import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";
import { FinanceForm } from "../../_components/form";
import { useState } from "react";
import { KeuanganId, type Keuangan } from "@/server/db/schema/keuangan";

export function CreateInfaqRamadhan() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title="Tambah Infaq Ramadhan"
      description="Isi form untuk menambah data infaq ramadhan baru"
      trigger="add"
      open={open}
      setOpen={setOpen}
    >
      <FinanceForm
        action="create"
        close={() => setOpen(false)}
        kategori="ramadhan"
      />
    </DrawerDialog>
  );
}

export function UpdateFinance({ finance }: { finance: Keuangan }) {
  const [open, setOpen] = useState(false);
  return (
    <DrawerDialog
      title={`Edit Data Infaq Ramadhan`}
      description={`Isi form untuk mengubah data infaq ramadhan ini`}
      trigger="edit"
      open={open}
      setOpen={setOpen}
    >
      <FinanceForm
        keuanganId={finance.id}
        kategori="ramadhan"
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
      title={`Hapus Data Infaq Ramadhan`}
      description={`Apakah anda yakin ingin menghapus data data infaq ramadhan ini?`}
      trigger="delete"
      open={open}
      setOpen={setOpen}
    >
      <FinanceForm
        kategori="ramadhan"
        keuanganId={keuanganId}
        action="delete"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}
