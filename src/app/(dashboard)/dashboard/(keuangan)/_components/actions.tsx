"use client";

import { DrawerDialog } from "@/app/(dashboard)/_components/drawer-dialog";
import { FinanceForm } from "../_components/form";
import { useState } from "react";
import { KeuanganId, type Keuangan } from "@/server/db/schema/keuangan";

export function UpdateFinance({
  finance,
  kategori,
}: {
  finance: Keuangan;
  kategori: "infaq" | "yatim" | "ramadhan" | "jumat";
}) {
  const [open, setOpen] = useState(false);
  return (
    <DrawerDialog
      title={`Edit Data Infaq`}
      description={`Isi form untuk mengubah data infaq ini?`}
      trigger="edit"
      open={open}
      setOpen={setOpen}
    >
      <FinanceForm
        keuanganId={finance.id}
        kategori={kategori}
        keuangan={finance}
        action="update"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}

export function DeleteFinance({
  keuanganId,
  kategori,
}: {
  keuanganId: KeuanganId;
  kategori: "infaq" | "yatim" | "ramadhan" | "jumat";
}) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerDialog
      title={`Hapus Data Infaq `}
      description={`Apakah anda yakin ingin menghapus data infaq ini?`}
      trigger="delete"
      open={open}
      setOpen={setOpen}
    >
      <FinanceForm
        kategori={kategori}
        keuanganId={keuanganId}
        action="delete"
        close={() => setOpen(false)}
      />
    </DrawerDialog>
  );
}
