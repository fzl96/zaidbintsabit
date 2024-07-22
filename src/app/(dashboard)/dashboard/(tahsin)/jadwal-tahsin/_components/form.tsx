"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { TimePickerDemo } from "@/components/time-picker-demo";
import { id } from "date-fns/locale";
import { useTransition } from "react";
import {
  type JadwalTahsin,
  type NewJadwalTahsinParams,
  insertJadwalTahsinParams,
} from "@/server/db/schema/tahsin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  createJadwalTahsinAction,
  deleteJadwalTahsinAction,
  updateJadwalTahsinAction,
} from "@/server/actions/jadwal-tahsin";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { cn } from "@/lib/utils";

interface JadwalTahsinFormProps {
  jadwalTahsin?: JadwalTahsin;
  jadwalTahsinId?: number;
  action: "create" | "update" | "delete";
  close?: () => void;
}

export function JadwalTahsinForm({
  jadwalTahsin,
  jadwalTahsinId,
  action,
  close,
}: JadwalTahsinFormProps) {
  const [isPending, startTransition] = useTransition();
  const editing = action === "update";

  const router = useRouter();

  const form = useForm<NewJadwalTahsinParams>({
    resolver: zodResolver(insertJadwalTahsinParams),
    defaultValues: jadwalTahsin ?? {
      namaUstadz: "",
      catatan: "",
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

  const handleSubmit = async (values: NewJadwalTahsinParams) => {
    if (editing && jadwalTahsin) {
      const res = await updateJadwalTahsinAction({
        id: jadwalTahsinId,
        ...values,
      });
      // @ts-ignore
      if (res?.error) after("update", res.error);
      after("update");
    } else {
      const res = await createJadwalTahsinAction(values);
      if (res?.error) after("create", res.error);
      after("create");
    }
  };

  if (action === "delete" && jadwalTahsinId) {
    return (
      <form
        className="space-y-2"
        action={async () => await deleteJadwalTahsinAction(jadwalTahsinId)}
      >
        <Button
          type="submit"
          variant={"destructive"}
          className="w-full"
          onClick={() => {
            startTransition(async () => {
              const res = await deleteJadwalTahsinAction(jadwalTahsinId);
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
            name="namaUstadz"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Ustadz</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Masukkan nama ustadz"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tanggal"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-left">Tanggal dan waktu</FormLabel>
                <Popover>
                  <FormControl>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP HH:mm:ss", { locale: id })
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                  </FormControl>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                    <div className="p-3 border-t border-border">
                      <TimePickerDemo
                        setDate={field.onChange}
                        date={field.value}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="catatan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input
                    {...field}
                    type="text"
                    placeholder="Masukkan catatan"
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
