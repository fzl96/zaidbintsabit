import { currentUser } from "@/lib/auth";
import { db } from "@/server/db";
import {
  zakat,
  type ZakatId,
  type ZakatParams,
  mutateSchema,
} from "@/server/db/schema/zakat";
import { eq, sql, ilike, or } from "drizzle-orm";

export async function createZakat({ data }: { data: ZakatParams }) {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const newZakat = mutateSchema.safeParse(data);
  if (!newZakat.success) {
    return { error: "Data tidak valid" };
  }

  try {
    await db.insert(zakat).values(newZakat.data);

    return { success: "Data berhasil ditambahkan" };
  } catch (err) {
    const message = (err as Error).message ?? "Gagal mengambil data zakat";

    return { error: message };
  }
}

export async function updateZakat({
  id,
  data,
}: {
  id: ZakatId;
  data: ZakatParams;
}) {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const updatedZakat = mutateSchema.safeParse(data);

  if (!updatedZakat.success) {
    return { error: "Data tidak valid" };
  }

  try {
    await db.update(zakat).set(updatedZakat.data).where(eq(zakat.id, id));

    return { success: "Data berhasil diupdate" };
  } catch (err) {
    const message = (err as Error).message ?? "Gagal mengupdate data zakat";

    return { error: message };
  }
}

export async function deleteZakat({ id }: { id: ZakatId }) {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  try {
    await db.delete(zakat).where(eq(zakat.id, id));

    return { success: "Data berhasil dihapus" };
  } catch (err) {
    const message = (err as Error).message ?? "Gagal menghapus data zakat";

    return { error: message };
  }
}
