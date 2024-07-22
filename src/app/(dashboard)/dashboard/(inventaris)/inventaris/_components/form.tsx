"use client";

import { useTransition } from "react";
import {
  type Inventaris,
  type NewInventarisParams,
  insertInventarisParams,
  InventarisId,
  KategoriInventaris,
} from "@/server/db/schema/inventaris";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  createInventarisAction,
  deleteInventarisAction,
  updateInventarisAction,
} from "@/server/actions/inventaris";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Icons } from "@/components/icons";

interface FinanceFormProps {
  inventaris?: Inventaris;
  inventarisId?: InventarisId;
  kategori?: KategoriInventaris[];
  action: "create" | "update" | "delete";
  close?: () => void;
}

export function InventarisForm({
  inventaris,
  inventarisId,
  action,
  kategori,
  close,
}: FinanceFormProps) {
  const [isPending, startTransition] = useTransition();
  const editing = action === "update";

  const router = useRouter();

  const form = useForm<NewInventarisParams>({
    resolver: zodResolver(insertInventarisParams),
    defaultValues: inventaris ?? {
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

  const handleSubmit = async (values: NewInventarisParams) => {
    if (editing && inventaris) {
      const res = await updateInventarisAction({
        id: inventarisId,
        kategoriId: Number(values.kategoriId),
        nama: values.nama,
        jumlah: Number(values.jumlah),
        satuan: values.satuan,
        kondisi: values.kondisi,
        keterangan: values.keterangan,
      });
      // @ts-ignore
      if (res?.error) after("update", res.error);
      after("update");
    } else {
      const res = await createInventarisAction(values);
      if (res?.error) after("create", res.error);
      after("create");
    }
  };

  if (action === "delete" && inventarisId) {
    return (
      <form
        className="space-y-2"
        action={async () => await deleteInventarisAction(inventarisId)}
      >
        <Button
          type="submit"
          variant={"destructive"}
          className="w-full"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              const res = await deleteInventarisAction(inventarisId);
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
            name="kategoriId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ? field.value.toString() : ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {kategori?.map((kategori) => (
                      <SelectItem
                        key={kategori.id}
                        value={kategori.id.toString()}
                      >
                        {kategori.nama}
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
            name="satuan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Satuan</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input {...field} type="text" placeholder="Masukkan satuan" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kondisi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kondisi</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kondisi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="baik">Baik</SelectItem>
                    <SelectItem value="rusak">Rusak</SelectItem>
                  </SelectContent>
                </Select>
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
