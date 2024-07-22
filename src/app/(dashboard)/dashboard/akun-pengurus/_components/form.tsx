"use client";

import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  akunSchema,
  type AkunParams,
  type User,
} from "@/server/db/schema/users";
import {
  createUserAction,
  deleteUserAction,
  updateUserAction,
} from "@/server/actions/user";

const options: { value: string; label: string }[] = [
  { value: "ADMIN", label: "Admin" },
  { value: "PENGURUS", label: "Pengurus" },
];

export function AkunForm({
  akun,
  akunId,
  action,
  close,
}: {
  akun?: User;
  akunId?: string;
  action: "create" | "update" | "delete";
  close?: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<AkunParams>({
    resolver: zodResolver(akunSchema),
    defaultValues: akun ?? {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "PENGURUS",
    },
  });

  const after = async (
    action: "create" | "update" | "delete",
    data?: { error?: string }
  ) => {
    if (data?.error) {
      toast.error(data.error);
      return;
    }

    if (close) close();
    router.push("/dashboard/akun-pengurus");
    router.refresh();
    toast.success(
      `Data berhasil di${
        action === "delete" ? "hapus" : action === "create" ? "tambah" : "ubah"
      }`
    );
  };

  async function onSubmit(data: AkunParams) {
    if (action === "update" && akun) {
      const res = await updateUserAction({ id: akun.id, ...data });
      if (res?.error) return after("update", { error: res.error });
      return after("update");
    }

    const res = await createUserAction(data);
    if (res?.error) return after("create", { error: res.error });
    return after("create");
  }

  if (action === "delete" && akunId) {
    return (
      <form
        className="space-y-2"
        action={async () => await deleteUserAction(akunId)}
      >
        <Button
          type="submit"
          variant={"destructive"}
          className="w-full"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              const res = await deleteUserAction(akunId);
              // @ts-ignore
              if (res?.error) after("delete", res.error);
              else after("delete");
              if (close) close();
              return;
            });
          }}
        >
          {isPending && <Icons.spinner className="animate-spin h-4 w-4 mr-2" />}
          Hapus
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={close}
        >
          Batal
        </Button>
      </form>
    );
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          className="p-5 border rounded-lg"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  {/* @ts-ignore */}
                  <Input
                    id="nama"
                    placeholder="Masukkan nama"
                    {...field}
                    autoFocus
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input
                    id="username"
                    placeholder="Masukkan username"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input
                    id="password"
                    placeholder="Masukkan password"
                    type="password"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <Input
                    id="confirmPassword"
                    placeholder="Masukkan password"
                    type="password"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2 mt-5">
            <Link
              href="/dashboard/akun-pengurus"
              className={cn(
                buttonVariants({
                  variant: "outline",
                })
              )}
            >
              Batal
            </Link>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
              className={cn({
                "cursor-not-allowed opacity-60":
                  form.formState.isSubmitting || !form.formState.isDirty,
              })}
            >
              {form.formState.isSubmitting && (
                <span>
                  <Icons.spinner className="animate-spin h-4 w-4 mr-2" />
                </span>
              )}
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
