"use client";

import { ColumnDef } from "@tanstack/react-table";
import { type Zakat } from "@/server/db/schema/zakat";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DeleteZakat } from "./actions";

export const columns: ColumnDef<Zakat>[] = [
  {
    accessorKey: "createdAt",
    header: "Tanggal",
    cell: ({ getValue }) => {
      const value = getValue() as Date;
      return format(value, "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "namaKK",
    header: "Nama KK",
  },
  {
    accessorKey: "jumlahKeluarga",
    header: () => (
      <div className="flex flex-col">
        Jumlah <span>Keluarga</span>
      </div>
    ),
  },
  {
    accessorKey: "hargaBeras",
    header: "Harga Beras",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return formatCurrency(value);
    },
  },
  {
    header: "Beras",
    columns: [
      {
        accessorKey: "orangB",
        header: "Orang",
      },
      {
        accessorKey: "liter",
        header: "liter",
      },
    ],
  },
  {
    header: "Uang",
    columns: [
      {
        accessorKey: "orangU",
        header: "Orang",
      },
      {
        accessorKey: "rupiah",
        header: "Rupiah",
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return formatCurrency(value);
        },
      },
    ],
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Aksi</span>,
    cell: ({ row }) => {
      return (
        <div className="space-x-2 text-right">
          <Link
            href={`/dashboard/zakat/${row.original.id}/edit`}
            className={cn(buttonVariants({ variant: "outline" }), "px-2")}
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <DeleteZakat zakatId={row.original.id} />
        </div>
      );
    },
  },
];
