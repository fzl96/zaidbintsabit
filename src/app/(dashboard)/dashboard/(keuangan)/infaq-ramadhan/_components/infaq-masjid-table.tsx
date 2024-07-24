import {
  getKeuangan,
  getKeuanganTotalPages,
  getKeuanganSaldo,
} from "@/server/api/keuangan/queries";
import { FinanceTable } from "../../_components/table";
import { columns } from "./columns";

export async function InfaqMasjidTable({
  page,
  tipe,
}: {
  page: number;
  tipe: "semua" | "pemasukan" | "pengeluaran";
}) {
  const data = await getKeuangan({ page, kategori: "ramadhan", tipe });
  const totalPages = await getKeuanganTotalPages({
    kategori: "ramadhan",
    tipe,
  });
  const saldo = await getKeuanganSaldo({ kategori: "ramadhan" });

  return (
    <FinanceTable
      data={data}
      columns={columns}
      totalPages={totalPages}
      page={page}
      tipe={tipe}
      saldo={saldo}
      kategori="ramadhan"
    />
  );
}
