import {
  getAllKategoriInventaris,
  getInventaris,
  getInventarisPages,
} from "@/server/api/inventaris/queries";
import { formatDate } from "@/lib/utils";
import { TablePagination } from "@/components/pagination";
import { SearchFilter } from "@/components/search-filter";
import { UpdateInventaris, DeleteInventaris } from "./actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export async function InventarisTable({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const data = await getInventaris({ page, query });
  const kategori = await getAllKategoriInventaris();
  const totalPages = await getInventarisPages({ query });

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <SearchFilter placeholder="Cari Inventaris" />
      </div>

      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-[#f6f8fa] p-2 md:pt-0 shadow-sm">
          <div className="md:hidden">
            {data.map((inventaris) => (
              <div
                key={inventaris.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                {inventaris.nama && (
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="text-sm text-gray-500">
                      {inventaris.nama}
                    </div>
                  </div>
                )}
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex flex-col">
                    <span className="text-base">
                      {formatDate(inventaris.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInventaris
                      inventaris={inventaris}
                      kategori={kategori}
                    />
                    <DeleteInventaris inventarisId={inventaris.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <Table className="space-y-5">
              <TableHeader className="rounded-lg text-left text-sm font-normal">
                <TableRow className="border-none mb-4">
                  <TableHead className="text-gray-900">Nama</TableHead>
                  <TableHead className="text-gray-900">Jumlah</TableHead>
                  <TableHead className="text-gray-900">Baik</TableHead>
                  <TableHead className="text-gray-900">Rusak</TableHead>
                  <TableHead className="text-gray-900">Kategori</TableHead>
                  <TableHead className="text-gray-900">Keterangan</TableHead>
                  <TableHead className="text-right sr-only">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white rounded-lg">
                {data.map((inventaris) => (
                  <TableRow key={inventaris.id} className="py-4">
                    <TableCell className="">{inventaris.nama}</TableCell>
                    <TableCell className="">{inventaris.jumlah}</TableCell>
                    <TableCell className="">{inventaris.kondisiBaik}</TableCell>
                    <TableCell className="">
                      {inventaris.kondisiRusak}
                    </TableCell>
                    <TableCell className="">
                      {inventaris.kategori.nama}
                    </TableCell>
                    <TableCell className="">{inventaris.keterangan}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <UpdateInventaris
                        inventaris={inventaris}
                        kategori={kategori}
                      />
                      <DeleteInventaris inventarisId={inventaris.id} />
                    </TableCell>
                  </TableRow>
                ))}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="text-center">
                        <p className="text-sm text-gray-500"> Tidak ada data</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <TablePagination totalPages={totalPages} page={page} />
      </div>
    </div>
  );
}
