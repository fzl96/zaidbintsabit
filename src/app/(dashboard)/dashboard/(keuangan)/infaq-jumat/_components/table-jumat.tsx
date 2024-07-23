import {
  getKeuangan,
  getKeuanganTotalPages,
  getKeuanganSaldo,
} from "@/server/api/keuangan/queries";
import { FinanceTable } from "../../_components/table";
import { columns } from "./columns";

export async function JumatTable({
  page,
  tipe,
}: {
  page: number;
  tipe: "semua" | "pemasukan" | "pengeluaran";
}) {
  const data = await getKeuangan({ page, kategori: "jumat", tipe });
  const totalPages = await getKeuanganTotalPages({ kategori: "jumat", tipe });
  const saldo = await getKeuanganSaldo({ kategori: "jumat" });

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
