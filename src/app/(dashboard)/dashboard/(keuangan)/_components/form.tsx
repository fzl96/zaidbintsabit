"use client";

import { useTransition } from "react";
import {
  type Keuangan,
  type NewKeuanganParams,
  insertFinanceParams,
} from "@/server/db/schema/keuangan";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  createKeuanganAction,
  deleteKeuanganAction,
  updateKeuanganAction,
} from "@/server/actions/keuangan";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FinanceFormProps {
  keuangan?: Keuangan;
  keuanganId?: number;
  kategori: "infaq" | "yatim" | "ramadhan" | "jumat";
  action: "create" | "update" | "delete";
  close?: () => void;
}

export function FinanceForm({
  keuangan,
  keuanganId,
  kategori,
  action,
  close,
}: FinanceFormProps) {
  const [isPending, startTransition] = useTransition();
  const editing = action === "update";

  const router = useRouter();

  const form = useForm<NewKeuanganParams>({
    resolver: zodResolver(insertFinanceParams),
    defaultValues: keuangan ?? {
      kategori,
      tipe: "pemasukan",
      keterangan: "",
    },
  });

  const after = async (
    action: "create" | "update" | "delete",
    data?: string
  ) => {
    if (data) {
      toast.error(data);
      return;
    }

    router.refresh();
    if (close) close();
    toast.success(
      `Data berhasil di${
        action === "delete" ? "hapus" : action === "create" ? "tambah" : "ubah"
      }`
    );
  };

  const handleSubmit = async (values: NewKeuanganParams) => {
    if (editing && keuangan) {
      const res = await updateKeuanganAction({
        id: keuanganId,
        ...values,
      });
      if (res?.error) after("update", res.error);
      after("update");
    } else {
      const res = await createKeuanganAction(values);
      if (res?.error) after("create", res.error);
      after("create");
    }
  };

  if (action === "delete" && keuanganId) {
    return (
      <form
        className="space-y-2 px-4"
        action={async () => await deleteKeuanganAction(keuanganId)}
      >
        <Button
          type="submit"
          variant={"destructive"}
          className="w-full"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              const res = await deleteKeuanganAction(keuanganId);
              if (res?.error) {
                after("delete", res.error);
              } else {
                after("delete");
              }
              if (close) close();
              return;
            });
          }}
        >
          {isPending && <Icons.spinner className="animate-spin h-4 w-4 mr-2" />}
          Hapus
        </Button>
      </form>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3 md:mx-0 mx-3"
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="tipe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipe</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe keuangan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pemasukan">Pemasukan</SelectItem>
                    <SelectItem value="pengeluaran">Pengeluaran</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jumlah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Masukkan jumlah"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keterangan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keterangan</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input
                    {...field}
                    type="text"
                    placeholder="Masukkan keterangan"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Icons.spinner className="animate-spin h-4 w-4 mr-2" />
          )}
          Simpan
        </Button>
      </form>
    </Form>
  );
}
