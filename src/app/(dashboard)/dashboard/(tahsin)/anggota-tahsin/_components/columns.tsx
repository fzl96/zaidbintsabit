"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { UpdateAnggotaTahsin, DeleteAnggotaTahsin } from "./actions";
import { type AnggotaTahsin } from "@/server/db/schema/tahsin";

export const columns: ColumnDef<AnggotaTahsin>[] = [
  {
    accessorKey: "nama",
    header: "Nama Anggota",
  },
  {
    accessorKey: "alamat",
    header: "Alamat",
  },
  {
    accessorKey: "noHp",
    header: "No Whatsapp",
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Aksi</span>,
    cell: ({ row }) => {
      return (
        <div className="space-x-2 text-right">
          <UpdateAnggotaTahsin anggotaTahsin={row.original} />
          <DeleteAnggotaTahsin anggotaTahsinId={row.original.id} />
        </div>
      );
    },
  },
];
