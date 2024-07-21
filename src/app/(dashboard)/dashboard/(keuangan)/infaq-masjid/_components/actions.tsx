"use client";

import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";
import { FinanceForm } from "../../_components/form";
import { useState } from "react";
import { KeuanganId, type Keuangan } from "@/server/db/schema/keuangan";

export function CreateInfaqAnakYatim() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title="Tambah Infaq Masjid"
      description="Isi form untuk menambah data infaq masjid baru"
      trigger="add"
      open={open}
      setOpen={setOpen}
    >
      <FinanceForm
        action="create"
        close={() => setOpen(false)}
        kategori="infaq"
      />
    </DrawerDialog>
  );
}

export function UpdateFinance({ finance }: { finance: Keuangan }) {
  const [open, setOpen] = useState(false);
  return (
    <DrawerDialog
      title={`Edit Data Infaq Masjid`}
      description={`Isi form untuk mengubah data infaq masjid ini ini`}
      trigger="edit"
      open={open}
      setOpen={setOpen}
    >
      <FinanceForm
        keuanganId={finance.id}
        kategori="infaq"
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
      title={`Hapus Data Infaq Masjid`}
      description={`Apakah anda yakin ingin menghapus data data infaq masjid ini?`}
      trigger="delete"
      open={open}
      setOpen={setOpen}
    >
      <FinanceForm
        kategori="infaq"
        keuanganId={keuanganId}
        action="delete"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}
