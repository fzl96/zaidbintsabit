"use client";

import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";
import { FinanceForm } from "./form";
import { useState } from "react";
import { KeuanganId, type Keuangan } from "@/server/db/schema/keuangan";

export function CreateInfaqAnakYatim() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title="Tambah Infaq Anak Yatim"
      description="Isi form untuk menambah data infaq anak yatim baru"
      trigger="add"
      open={open}
      setOpen={setOpen}
    >
      <FinanceForm
        action="create"
        close={() => setOpen(false)}
        kategori="yatim"
      />
    </DrawerDialog>
  );
}

export function UpdateFinance({ finance }: { finance: Keuangan }) {
  const [open, setOpen] = useState(false);
  return (
    <DrawerDialog
      title={`Edit Data Infaq Anak Yatim`}
      description={`Isi form untuk mengubah data infaq anak yatim ini ini`}
      trigger="edit"
      open={open}
      setOpen={setOpen}
    >
      <FinanceForm
        keuanganId={finance.id}
        kategori="yatim"
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
      title={`Hapus Data Infaq Anak Yatim`}
      description={`Apakah anda yakin ingin menghapus data data infaq anak yatim ini?`}
      trigger="delete"
      open={open}
      setOpen={setOpen}
    >
      <FinanceForm
        kategori="yatim"
        keuanganId={keuanganId}
        action="delete"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}
