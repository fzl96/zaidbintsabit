"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { UpdateFinance, DeleteFinance } from "./actions";
import type { Keuangan } from "@/server/db/schema/keuangan";

export const columns: ColumnDef<Keuangan>[] = [
  {
    accessorKey: "createdAt",
    minSize: 200,
    header: "Tanggal",
    cell: ({ row }) => {
      const value = row.original;
      return <div>{formatDate(new Date(value.createdAt))}</div>;
    },
  },
  {
    accessorKey: "jumlah",
    header: "Jumlah",
    cell: ({ row }) => {
      const value = row.original;
      return <div>{formatCurrency(value.jumlah)}</div>;
    },
  },
  {
    accessorKey: "keterangan",
    maxSize: 300,
    size: 300,
    header: "Keterangan",
  },
  {
    accessorKey: "tipe",
    maxSize: 300,
    size: 300,
    header: "Tipe",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.tipe}</span>;
    },
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Aksi</span>,
    cell: ({ row }) => {
      return (
        <div className="space-x-2 text-right">
          <UpdateFinance finance={row.original} />
          <DeleteFinance keuanganId={row.original.id} />
        </div>
      );
    },
  },
];
