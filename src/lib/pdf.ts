import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { formatCurrency, capitalize } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { type Keuangan } from "@/server/db/schema/keuangan";
import { type Zakat } from "@/server/db/schema/zakat";
import {
  type Inventaris,
  type InventarisWithKategori,
} from "@/server/db/schema/inventaris";

export function createFinancePdf(
  data: Keuangan[],
  fileName: string,
  kategori: string
) {
  const doc = new jsPDF();
  const saldo = data.reduce((acc, curr) => {
    if (curr.tipe === "pemasukan") {
      return acc + curr.jumlah;
    } else if (curr.tipe === "pengeluaran") {
      return acc - curr.jumlah;
    }
    return acc;
  }, 0);
  const pengeluaran = data.reduce((acc, curr) => {
    if (curr.tipe === "pengeluaran") {
      return acc + curr.jumlah;
    }
    return acc;
  }, 0);
  const pemasukan = data.reduce((acc, curr) => {
    if (curr.tipe === "pemasukan") {
      return acc + curr.jumlah;
    }
    return acc;
  }, 0);

  doc.addImage("/masjid/kop.png", "PNG", 0, 5, 210, 30);
  doc.text(`INFAQ ${kategori}`, 83, 50);
  autoTable(doc, {
    startY: 60,
    head: [["No", "Tanggal", "Jumlah", "Jenis", "Keterangan"]],
    body: data.map((item, index) => {
      return [
        index + 1,
        format(new Date(item.createdAt), "cccc, dd MMMM yyyy", { locale: id }),
        formatCurrency(item.jumlah),
        capitalize(item.tipe),
        item.keterangan || "-",
      ];
    }),
  });
  let finalY = (doc as any).lastAutoTable.finalY;
  const hasSpace = 297 - finalY > 60;
  if (!hasSpace) doc.addPage();
  const startY = hasSpace ? finalY + 20 : 20;
  doc.setFontSize(11);
  doc.text(`Pengeluaran: ${formatCurrency(pengeluaran)}`, 13, startY);
  doc.text(`Pemasukan: ${formatCurrency(pemasukan)}`, 13, startY + 5);
  doc.setFontSize(14);
  doc.text(`Saldo: ${formatCurrency(saldo)}`, 13, startY + 13);

  doc.setFontSize(10);
  doc.text("PENGURUS MASJID ZAID BIN TSABIT", 130, startY);
  doc.text("KETUA", 130, startY + 5);
  doc.setFontSize(11);
  doc.text("Yana Patriana", 130, startY + 30);
  doc.save(`${fileName}.pdf`);
}

export function createPdf(data: Keuangan[], fileName: string) {
  const doc = new jsPDF();
  doc.addImage("/masjid/kop.png", "PNG", 0, 5, 210, 30);
  autoTable(doc, {
    startY: 40,
    head: [["No", "Tanggal", "Jumlah", "Keterangan"]],
    body: data.map((item, index) => {
      return [
        index + 1,
        format(new Date(item.createdAt), "cccc, dd MMMM yyyy", { locale: id }),
        formatCurrency(item.jumlah),
        item.keterangan || "-",
      ];
    }),
  });
  let finalY = (doc as any).lastAutoTable.finalY;
  const hasSpace = 297 - finalY > 60;
  if (!hasSpace) doc.addPage();
  const startY = hasSpace ? finalY + 20 : 20;

  doc.setFontSize(10);
  doc.text("PENGURUS MASJID ZAID BIN TSABIT", 130, startY);
  doc.text("KETUA", 130, startY + 5);
  doc.setFontSize(11);
  doc.text("Yana Patriana", 130, startY + 30);
  doc.save(`${fileName}.pdf`);
}

export function createZakatPdf(data: Zakat[], fileName: string) {
  const doc = new jsPDF();
  doc.addImage("/masjid/kop.png", "PNG", 0, 5, 210, 30);
  doc.text(`ZAKAT`, 93, 50);
  autoTable(doc, {
    startY: 60,
    head: [
      [
        "No",
        "Tanggal",
        "Nama KK",
        "Jumlah Keluarga",
        "Harga Beras",
        "Orang",
        "Liter",
        "Orang",
        "Rupiah",
      ],
    ],
    body: data.map((item, index) => {
      return [
        index + 1,
        format(new Date(item.createdAt), "cccc, dd MMMM yyyy", { locale: id }),
        item.namaKK,
        item.jumlahKeluarga,
        formatCurrency(item.hargaBeras),
        item.orangB,
        item.liter,
        item.orangU,
        formatCurrency(item.rupiah),
      ];
    }),
  });
  let finalY = (doc as any).lastAutoTable.finalY;
  const hasSpace = 297 - finalY > 60;
  if (!hasSpace) doc.addPage();
  const startY = hasSpace ? finalY + 20 : 20;

  doc.setFontSize(10);
  doc.text("PENGURUS MASJID ZAID BIN TSABIT", 130, startY);
  doc.text("KETUA", 130, startY + 5);
  doc.setFontSize(11);
  doc.text("Yana Patriana", 130, startY + 30);
  doc.save(`${fileName}.pdf`);
}

export async function createInventarisPdf(
  data: InventarisWithKategori[],
  fileName: string
) {
  const doc = new jsPDF();
  doc.text(`INVENTARIS MAJID`, 78, 50);
  doc.addImage("/masjid/kop.png", "PNG", 0, 5, 210, 30);
  autoTable(doc, {
    startY: 60,
    head: [
      ["No", "Barang", "Jumlah", "Baik", "Rusak", "Kategori", "Keterangan"],
    ],
    body: data.map((item, index) => {
      return [
        index + 1,
        item.nama,
        item.jumlah,
        item.kondisiBaik,
        item.kondisiRusak,
        item.kategori,
        item.keterangan || "-",
      ];
    }),
  });

  let finalY = (doc as any).lastAutoTable.finalY;
  const hasSpace = 297 - finalY > 60;
  if (!hasSpace) doc.addPage();
  const startY = hasSpace ? finalY + 20 : 20;

  doc.setFontSize(10);
  doc.text("PENGURUS MASJID ZAID BIN TSABIT", 130, startY);
  doc.text("KETUA", 130, startY + 5);
  doc.setFontSize(11);
  doc.text("Yana Patriana", 130, startY + 30);
  doc.save(`${fileName}.pdf`);
}
