import { db } from "@/server/db";
import { currentUser } from "@/lib/auth";
import { sql, and, eq, gte, lte } from "drizzle-orm";
import { keuangan } from "@/server/db/schema";
import { months } from "@/config/dashboard";

const LIMIT = 6;

export async function getKeuangan({
  kategori,
  page,
  tipe,
}: // date,
{
  kategori: "infaq" | "yatim" | "ramadhan" | "jumat";
  page: number;
  tipe: "semua" | "pengeluaran" | "pemasukan";
  // date: string;
}) {
  if (tipe === "semua")
    return await db.query.keuangan.findMany({
      where: (keuangan, { and, eq }) => and(eq(keuangan.kategori, kategori)),
      orderBy: (keuangan, { desc }) => desc(keuangan.createdAt),
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
    });

  return await db.query.keuangan.findMany({
    where: (keuangan, { and, eq }) =>
      and(eq(keuangan.kategori, kategori), eq(keuangan.tipe, tipe)),
    orderBy: (keuangan, { desc }) => desc(keuangan.createdAt),
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  });
}

export async function getKeuanganSaldo({
  kategori,
}: {
  kategori: "infaq" | "yatim" | "ramadhan" | "jumat";
}) {
  const data = await db.query.keuangan.findMany({
    where: (keuangan, { eq }) => eq(keuangan.kategori, kategori),
  });

  const saldo = data.reduce((acc, curr) => {
    if (curr.tipe === "pemasukan") {
      return acc + curr.jumlah;
    } else if (curr.tipe === "pengeluaran") {
      return acc - curr.jumlah;
    }
    return acc;
  }, 0);

  return saldo;
}

export async function getKeuanganTotalPages({
  kategori,
  tipe,
}: {
  kategori: "infaq" | "yatim" | "ramadhan" | "jumat";
  tipe: "semua" | "pengeluaran" | "pemasukan";
}) {
  if (tipe === "semua") {
    const [countRes] = await db
      .select({
        count: sql`count(*)`.mapWith(Number).as("count"),
      })
      .from(keuangan)
      .where(eq(keuangan.kategori, kategori));

    return countRes?.count ? Math.ceil(countRes.count / 6) : 1;
  }

  const [countRes] = await db
    .select({
      count: sql`count(*)`.mapWith(Number).as("count"),
    })
    .from(keuangan)
    .where(and(eq(keuangan.kategori, kategori), eq(keuangan.tipe, tipe)));

  return countRes?.count ? Math.ceil(countRes.count / LIMIT) : 1;
}

export async function getExportKeuanganData({
  month,
  year,
  kategori,
}: {
  month: number;
  year: number;
  kategori: "infaq" | "yatim" | "ramadhan" | "jumat";
}) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const data = await db.query.keuangan.findMany({
    where: (keuangan, { and, eq, gte, lte }) =>
      and(
        eq(keuangan.kategori, kategori),
        gte(keuangan.createdAt, new Date(year, month - 1, 1)),
        lte(keuangan.createdAt, new Date(year, month, 1)),
      ),
    orderBy: (keuangan, { desc }) => desc(keuangan.createdAt),
  });

  return data;
}

export async function getSaldos() {
  const data = await db.query.keuangan.findMany();

  const res = data.reduce(
    (acc, curr) => {
      if (curr.tipe === "pemasukan") {
        acc[curr.kategori] = acc[curr.kategori]
          ? acc[curr.kategori] + curr.jumlah
          : curr.jumlah;
      } else if (curr.tipe === "pengeluaran") {
        acc[curr.kategori] = acc[curr.kategori]
          ? acc[curr.kategori] - curr.jumlah
          : curr.jumlah;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const saldos = {
    masjid: res.infaq ?? 0,
    ramadhan: res.ramadhan ?? 0,
    yatim: res.yatim ?? 0,
    jumat: res.jumat ?? 0,
  };

  return saldos;
}

export async function getYearlyIncomeReport({ year }: { year: number }) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const data = await db
    .select({
      month: sql`extract(month from ${keuangan.createdAt})`
        .mapWith(Number)
        .as("month"),
      masjid:
        sql`sum(case when ${keuangan.kategori} = 'infaq' and ${keuangan.tipe} = 'pemasukan' then ${keuangan.jumlah} else 0 end)`.as(
          "masjid",
        ),
      ramadhan:
        sql`sum(case when ${keuangan.kategori} = 'ramadhan' and ${keuangan.tipe} = 'pemasukan' then ${keuangan.jumlah} else 0 end)`.as(
          "ramadhan",
        ),
      yatim:
        sql`sum(case when ${keuangan.kategori} = 'yatim' and ${keuangan.tipe} = 'pemasukan' then ${keuangan.jumlah} else 0 end)`.as(
          "yatim",
        ),
      jumat:
        sql`sum(case when ${keuangan.kategori} = 'jumat' and ${keuangan.tipe} = 'pemasukan' then ${keuangan.jumlah} else 0 end)`.as(
          "jumat",
        ),
    })
    .from(keuangan)
    .where(
      and(
        gte(keuangan.createdAt, new Date(year, 0, 1)),
        lte(keuangan.createdAt, new Date(year, 11, 31)),
      ),
    )
    .groupBy(sql`extract(month from ${keuangan.createdAt})`);

  const formattedData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const monthData = data.find((d) => d.month === month);
    return {
      month: months.find((m) => m.value === month)?.short ?? "",
      masjid: monthData?.masjid ? (monthData?.masjid as number) : 0,
      ramadhan: monthData?.ramadhan ? (monthData?.ramadhan as number) : 0,
      yatim: monthData?.yatim ? (monthData?.yatim as number) : 0,
      jumat: monthData?.jumat ? (monthData.jumat as number) : 0,
    };
  });

  return formattedData;
}

export async function getYearlyExpenseReport({ year }: { year: number }) {
  const user = await currentUser();

  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const data = await db
    .select({
      month: sql`extract(month from ${keuangan.createdAt})`
        .mapWith(Number)
        .as("month"),
      masjid:
        sql`sum(case when ${keuangan.kategori} = 'infaq' and ${keuangan.tipe} = 'pengeluaran' then ${keuangan.jumlah} else 0 end)`.as(
          "masjid",
        ),
      ramadhan:
        sql`sum(case when ${keuangan.kategori} = 'ramadhan' and ${keuangan.tipe} = 'pengeluaran' then ${keuangan.jumlah} else 0 end)`.as(
          "ramadhan",
        ),
      yatim:
        sql`sum(case when ${keuangan.kategori} = 'yatim' and ${keuangan.tipe} = 'pengeluaran' then ${keuangan.jumlah} else 0 end)`.as(
          "yatim",
        ),
      jumat:
        sql`sum(case when ${keuangan.kategori} = 'jumat' and ${keuangan.tipe} = 'pengeluaran' then ${keuangan.jumlah} else 0 end)`.as(
          "jumat",
        ),
    })
    .from(keuangan)
    .where(
      and(
        gte(keuangan.createdAt, new Date(year, 0, 1)),
        lte(keuangan.createdAt, new Date(year, 11, 31)),
      ),
    )
    .groupBy(sql`extract(month from ${keuangan.createdAt})`);

  const formattedData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const monthData = data.find((d) => d.month === month);
    return {
      month: months.find((m) => m.value === month)?.short ?? "",
      masjid: monthData?.masjid ? (monthData?.masjid as number) : 0,
      ramadhan: monthData?.ramadhan ? (monthData?.ramadhan as number) : 0,
      yatim: monthData?.yatim ? (monthData?.yatim as number) : 0,
      jumat: monthData?.jumat ? (monthData.jumat as number) : 0,
    };
  });

  return formattedData;
}
