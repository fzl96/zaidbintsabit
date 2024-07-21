import { DataTable } from "@/components/data-table";
import { TablePagination } from "@/components/pagination";
import { Pagination } from "@/components/ui/pagination";
import { formatCurrency, formatDate } from "@/lib/utils";
// import { DeleteFinance, UpdateFinance } from "./actions";
import { type Keuangan } from "@/server/db/schema/keuangan";
import { ColumnDef } from "@tanstack/react-table";
import { TypeFilter } from "./type-filter";

export async function FinanceTable({
  data,
  columns,
  page,
  totalPages,
  tipe,
  saldo,
}: {
  page: number;
  totalPages: number;
  tipe: "semua" | "pengeluaran" | "pemasukan";
  data: Keuangan[];
  columns: ColumnDef<Keuangan>[];
  saldo: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          Saldo:{" "}
          <span className="text-lg font-medium">{formatCurrency(saldo)}</span>
        </div>
        <TypeFilter currentFilter={tipe} />
      </div>

      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-[#f6f8fa] p-2 md:pt-0 shadow-sm">
          <div className="md:hidden">
            {data.map((finance) => (
              <div
                key={finance.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                {finance.keterangan && (
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="text-sm text-gray-500">
                      {finance.keterangan}
                    </div>
                  </div>
                )}
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex flex-col">
                    <span className="text-lg font-medium">
                      {formatCurrency(finance.jumlah)}
                    </span>
                    <span className="text-base">
                      {formatDate(finance.createdAt)}
                    </span>
                    <span className="capitalize text-gray-500 text-sm">
                      {finance.tipe}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <UpdateFinance finance={finance} type="INCOME" />
                    <DeleteFinance financeId={finance.id} type="EXPENSE" /> */}
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
