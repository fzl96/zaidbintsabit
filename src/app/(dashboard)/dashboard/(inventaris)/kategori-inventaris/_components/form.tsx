"use client";

import { useTransition } from "react";
import {
  type KategoriInventaris,
  type NewKategoriInventarisParams,
  insertKategoriInventarisParams,
  KategoriInventarisId,
} from "@/server/db/schema/inventaris";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  createKategoriInventarisAction,
  deleteKategoriInventarisAction,
  updateKategoriInventarisAction,
} from "@/server/actions/inventaris";

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

interface FinanceFormProps {
  kategoriInventaris?: KategoriInventaris;
  kategoriInventarisId?: KategoriInventarisId;
  action: "create" | "update" | "delete";
  close?: () => void;
}

export function KategoriInventarisForm({
  kategoriInventaris,
  kategoriInventarisId,
  action,
  close,
}: FinanceFormProps) {
  const [isPending, startTransition] = useTransition();
  const editing = action === "update";

  const router = useRouter();

  const form = useForm<NewKategoriInventarisParams>({
    resolver: zodResolver(insertKategoriInventarisParams),
    defaultValues: kategoriInventaris ?? {
      nama: "",
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

  const handleSubmit = async (values: NewKategoriInventarisParams) => {
    if (editing && kategoriInventaris) {
      const res = await updateKategoriInventarisAction({
        id: kategoriInventarisId,
        ...values,
      });
      // @ts-ignore
      if (res?.error) after("update", res.error);
      after("update");
    } else {
      const res = await createKategoriInventarisAction(values);
      if (res?.error) after("create", res.error);
      after("create");
    }
  };

  if (action === "delete" && kategoriInventarisId) {
    return (
      <form
        className="space-y-2"
        action={async () =>
          await deleteKategoriInventarisAction(kategoriInventarisId)
        }
      >
        <Button
          type="submit"
          variant={"destructive"}
          className="w-full"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              const res = await deleteKategoriInventarisAction(
                kategoriInventarisId
              );
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3 md:mx-0 mx-3"
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Masukkan nama" />
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
