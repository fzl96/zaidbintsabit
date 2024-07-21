import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { SearchFilter } from "@/components/search-filter";
import { TablePagination } from "@/components/pagination";
import {
  getAnggotaTahsin,
  getAnggotaTahsinTotalPages,
} from "@/server/api/tahsin/anggota/queries";

export async function AnggotaTahsinTable({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const data = await getAnggotaTahsin({ page, query });
  const totalPages = await getAnggotaTahsinTotalPages({ query });

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <SearchFilter placeholder="Cari Kategori Inventaris" />
      </div>

      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-[#f6f8fa] p-2 md:pt-0 shadow-sm">
          <div className="md:hidden">
            {data.map((anggota) => (
              <div
                key={anggota.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                {anggota.nama && (
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="text-sm text-gray-500">{anggota.nama}</div>
                  </div>
                )}
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex flex-col">
                    <span className="text-base">
                      {/* {formatDate(kategori.createdAt)} */}
                      {anggota.alamat}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <UpdateKategoriInventaris kategoriInventaris={kategori} />
                    <DeleteKategoriInventaris
                      kategoriInventarisId={kategori.id}
                    /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <DataTable data={data} columns={columns} />
          </div>
        </div>
        <TablePagination totalPages={totalPages} page={page} />
      </div>
    </div>
  );
}
