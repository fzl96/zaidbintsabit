"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { KategoriInventaris } from "@/server/db/schema/inventaris";
import { DeleteKategoriInventaris, UpdateKategoriInventaris } from "./actions";

export const columns: ColumnDef<KategoriInventaris>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nama",
    maxSize: 300,
    size: 300,
    header: "Nama",
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Aksi</span>,
    cell: ({ row }) => {
      return (
        <div className="space-x-2 text-right">
          <UpdateKategoriInventaris kategoriInventaris={row.original} />
          <DeleteKategoriInventaris kategoriInventarisId={row.original.id} />
        </div>
      );
    },
  },
];
