import { getJadwalSholat } from "@/server/api/jadwal-sholat/queries";
import { formatDate } from "@/lib/utils";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";

export async function SholatWajibTable() {
  const data = await getJadwalSholat({ jenis: "wajib" });

  return (
    <div className="space-y-2">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-[#f6f8fa] p-2 md:pt-0 shadow-sm">
          <div className="md:hidden">
            {data.map((jadwal) => (
              <div
                key={jadwal.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                {jadwal.nama && (
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="text-sm text-gray-500">{jadwal.nama}</div>
                  </div>
                )}
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex flex-col">
                    <span className="text-base">
                      {formatDate(jadwal.tanggal)}
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
      </div>
    </div>
  );
}
