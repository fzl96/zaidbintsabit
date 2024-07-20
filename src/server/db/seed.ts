// import { db } from "@/server/db";
// import data from "./data/data.json";
// import { keuangan } from "./schema";

// const main = async () => {
//   const dataMapped = data.map((item) => {
//     return {
//       id: item.id,
//       jumlah: item.amount,
//       keterangan: item.note,
//       tipe: item.type === "INCOME" ? "pemasukan" : "pengeluaran",
//       kategori: "infaq",
//       createdAt: new Date(item.createdAt),
//       updatedAt: new Date(item.updatedAt),
//     };
//   });

//   await db.insert(keuangan).values(dataMapped);
// };
// main();
