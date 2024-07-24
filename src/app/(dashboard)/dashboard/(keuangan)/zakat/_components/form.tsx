"use client";

import { useTransition } from "react";
import {
  type Zakat,
  type ZakatParams,
  type ZakatId,
  mutateSchema,
} from "@/server/db/schema/zakat";
import {
  createZakatAction,
  deleteZakatAction,
  updateZakatAction,
} from "@/server/actions/zakat";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ZakatFormProps {
  zakat?: Zakat;
  zakatId?: ZakatId;
  action: "create" | "update" | "delete";
  close?: () => void;
}

export function ZakatForm({ zakat, zakatId, action, close }: ZakatFormProps) {
  const [isPending, startTransition] = useTransition();
  const editing = action === "update";

  const router = useRouter();

  const form = useForm<ZakatParams>({
    resolver: zodResolver(mutateSchema),
    defaultValues: zakat ?? {},
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
    router.push("/dashboard/zakat");
    router.refresh();
    toast.success(
      `Data berhasil di${
        action === "delete" ? "hapus" : action === "create" ? "tambah" : "ubah"
      }`
    );
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    if (editing && zakat) {
      const res = await updateZakatAction({ id: zakat.id, ...data });
      if (res?.error) return after("update", { error: res.error });

      return after("update");
    }
    const res = await createZakatAction(data);
    if (res?.error) return after("create", { error: res.error });
    return after("create");
  });

  if (action === "delete" && zakatId) {
    return (
      <form
        className="space-y-2 px-4"
        action={async () => await deleteZakatAction(zakatId)}
      >
        <Button
          type="submit"
          variant={"destructive"}
          className="w-full"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              const res = await deleteZakatAction(zakatId);
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
      </form>
    );
  }

  return (
    <Form {...form}>
      <form className="p-5 border rounded-lg" onSubmit={handleSubmit}>
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="namaKK"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required-field">Nama</FormLabel>
                <FormControl>
                  <Input
                    id="nama"
                    placeholder="Masukkan nama"
                    {...field}
                    autoFocus
                  />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jumlahKeluarga"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required-field">
                  Jumlah Keluarga
                </FormLabel>
                <FormControl>
                  <Input
                    id="jumlahKeluarga"
                    placeholder="Masukkan Jumlah Keluarga"
                    {...field}
                    autoFocus
                    required
                  />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hargaBeras"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required-field">Harga Beras</FormLabel>
                <FormControl>
                  <Input
                    id="hargaBeras"
                    placeholder="Masukkan Harga Beras"
                    {...field}
                    autoFocus
                    required
                    type="number"
                  />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <div>
            <h2 className="text-lg">Zakat Beras</h2>
          </div>
          <FormField
            control={form.control}
            name="orangB"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required-field">Orang</FormLabel>
                <FormControl>
                  <Input
                    id="orangB"
                    placeholder="Orang"
                    {...field}
                    autoFocus
                    required
                    type="number"
                  />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="liter"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required-field">Liter</FormLabel>
                <FormControl>
                  <Input
                    id="liter"
                    placeholder="Liter"
                    {...field}
                    autoFocus
                    required
                    type="number"
                  />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />

          <div>
            <h2 className="text-lg">Zakat Uang</h2>
          </div>

          <FormField
            control={form.control}
            name="orangU"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required-field">Orang</FormLabel>
                <FormControl>
                  <Input
                    id="orangU"
                    placeholder="Orang"
                    {...field}
                    autoFocus
                    required
                    type="number"
                  />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rupiah"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required-field">Rupiah</FormLabel>
                <FormControl>
                  <Input
                    id="rupiah"
                    placeholder="Rupiah"
                    {...field}
                    autoFocus
                    required
                    type="number"
                  />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 mt-5">
          <Link
            href="/dashboard/zakat"
            className={cn(
              buttonVariants({
                variant: "outline",
              })
            )}
          >
            Batal
          </Link>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Icons.spinner className="animate-spin h-4 w-4 mr-2" />
            )}
            Simpan
          </Button>
        </div>
      </form>
    </Form>
  );
}
