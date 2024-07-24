"use client";

import { useTransition } from "react";
import {
  type AnggotaTahsin,
  type NewAnggotaTahsinParams,
  insertAnggotaTahsinParams,
} from "@/server/db/schema/tahsin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  createAnggotaTahsinAction,
  deleteAnggotaTahsinAction,
  updateAnggotaTahsinAction,
} from "@/server/actions/anggota-tahsin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AnggotaTahsinFormProps {
  anggotaTahsin?: AnggotaTahsin;
  anggotaTahsinId?: number;
  action: "create" | "update" | "delete";
  close?: () => void;
}

export function AnggotaTahsinForm({
  anggotaTahsin,
  anggotaTahsinId,
  action,
  close,
}: AnggotaTahsinFormProps) {
  const [isPending, startTransition] = useTransition();
  const editing = action === "update";

  const router = useRouter();

  const form = useForm<NewAnggotaTahsinParams>({
    resolver: zodResolver(insertAnggotaTahsinParams),
    defaultValues: anggotaTahsin ?? {
      nama: "",
      alamat: "",
      noHp: "",
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

  const handleSubmit = async (values: NewAnggotaTahsinParams) => {
    if (editing && anggotaTahsin) {
      const res = await updateAnggotaTahsinAction({
        id: anggotaTahsinId,
        ...values,
      });
      // @ts-ignore
      if (res?.error) after("update", res.error);
      after("update");
    } else {
      const res = await createAnggotaTahsinAction(values);
      if (res?.error) after("create", res.error);
      after("create");
    }
  };

  if (action === "delete" && anggotaTahsinId) {
    return (
      <form
        className="space-y-2 px-4"
        action={async () => await deleteAnggotaTahsinAction(anggotaTahsinId)}
      >
        <Button
          type="submit"
          variant={"destructive"}
          className="w-full"
          onClick={() => {
            startTransition(async () => {
              const res = await deleteAnggotaTahsinAction(anggotaTahsinId);
              // @ts-ignore
              if (res?.error) {
                // @ts-ignore
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
            name="alamat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input {...field} type="text" placeholder="Masukkan alamat" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noHp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No HP</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input {...field} type="text" placeholder="Masukkan no hp" />
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
