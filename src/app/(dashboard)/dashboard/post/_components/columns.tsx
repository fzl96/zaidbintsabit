"use client";

import { ColumnDef } from "@tanstack/react-table";
import { type Post } from "@/server/db/schema/post";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DeletePost } from "./actions";

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "judul",
    header: "Judul",
  },
  {
    accessorKey: "kategori",
    header: "Kategori",
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal",
    cell: ({ row }) => {
      return formatDate(row.original.tanggal);
    },
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Aksi</span>,
    cell: ({ row }) => {
      return (
        <div className="space-x-2 text-right">
          <Link
            href={`/dashboard/post/${row.original.id}/edit`}
            className={cn(buttonVariants({ variant: "outline" }), "px-2")}
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <DeletePost postId={row.original.id} />
        </div>
      );
    },
  },
];
