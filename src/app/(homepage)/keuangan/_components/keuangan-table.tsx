import {
  getKeuangan,
  getKeuanganTotalPages,
  getKeuanganSaldo,
} from "@/server/api/keuangan/queries";
import { FinanceTable } from "./table";
import { columns } from "./columns";

export async function KeuanganTable({
  page,
  tipe,
  kategori,
}: {
  page: number;
  tipe: "semua" | "pemasukan" | "pengeluaran";
  kategori: "infaq" | "yatim" | "ramadhan";
}) {
  const data = await getKeuangan({ page, kategori, tipe });
  const totalPages = await getKeuanganTotalPages({ kategori, tipe });
  const saldo = await getKeuanganSaldo({ kategori });

  return (
    <FinanceTable
      data={data}
      columns={columns}
      totalPages={totalPages}
      page={page}
      tipe={tipe}
      saldo={saldo}
    />
  );
}
