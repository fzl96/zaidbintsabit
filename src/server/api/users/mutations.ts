import { db } from "@/server/db";
import { currentUser } from "@/lib/auth";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { AkunParams, akunSchema } from "@/server/db/schema/users";
import bcrypt from "bcryptjs";

export async function createUser(data: AkunParams) {
  const user = await currentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const newUser = akunSchema.safeParse(data);
  if (!newUser.success) {
    return { error: "Data tidak valid" };
  }

  const { name, username, password, confirmPassword, role } = newUser.data;

  if (!password) {
    return { error: "Password harus diisi" };
  }

  if (password !== confirmPassword) {
    return { error: "Password tidak cocok" };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({
      name: name,
      username,
      password: hashedPassword,
      role,
    });

    return { success: "User berhasil ditambahkan" };
  } catch (error) {
    const message =
      (error as Error).message ?? "Gagal mengubah data anggota tahsin";

    return { error: message };
  }
}

export async function updateUser(id: string, data: AkunParams) {
  const user = await currentUser();
  if (!user || !["ADMIN", "PENGURUS"].includes(user.role)) {
    throw new Error("Unauthorized");
  }

  const updatedUser = akunSchema.safeParse(data);

  if (!updatedUser.success) {
    return { error: "Data tidak valid" };
  }

  const { name, username, password, confirmPassword, role } = updatedUser.data;

  if (password) {
    if (!confirmPassword) {
      return { error: "Password harus diisi" };
    }

    if (password !== confirmPassword) {
      return { error: "Password tidak cocok" };
    }
  }

  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db
        .update(users)
        .set({
          ...updatedUser.data,
          password: hashedPassword,
        })
        .where(eq(users.id, id));

      return { success: "User berhasil diupdate" };
    }

    console.log(updatedUser.data);

    await db
      .update(users)
      .set({
        name: name,
        username: username,
        role: role,
      })
      .where(eq(users.id, id));

    return { success: "User berhasil diupdate" };
  } catch (err) {
    const message =
      (err as Error).message ?? "Gagal mengubah data anggota tahsin";

    return { error: message };
  }
}

export async function deleteUser(id: string) {
  const user = await currentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    await db.delete(users).where(eq(users.id, id));

    return { success: "User berhasil dihapus" };
  } catch (err) {
    const message =
      (err as Error).message ?? "Gagal menghapus data anggota tahsin";

    return { error: message };
  }
}
