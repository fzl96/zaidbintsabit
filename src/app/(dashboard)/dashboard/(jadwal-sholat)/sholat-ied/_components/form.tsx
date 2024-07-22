"use client";

import { type JadwalSholat } from "@/server/db/schema/jadwal-sholat";
import {
  type UpdateJadwalSholatParams,
  updateJadwalSholatParams,
} from "@/server/db/schema/jadwal-sholat";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { updateJadwalSholatAction } from "@/server/actions/jadwal-sholat";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { TimePickerDemo } from "@/components/time-picker-demo";
import { id } from "date-fns/locale";

interface JadwalSholatFormProps {
  jadwalSholat: JadwalSholat;
  jadwalSholatId: number;
  close?: () => void;
}

export function JadwalSholatForm({
  jadwalSholat,
  jadwalSholatId,
  close,
}: JadwalSholatFormProps) {
  const router = useRouter();

  const form = useForm<JadwalSholat>({
    resolver: zodResolver(updateJadwalSholatParams),
    defaultValues: jadwalSholat,
  });

  const handleSubmit = async (values: UpdateJadwalSholatParams) => {
    console.log(values);
    const res = await updateJadwalSholatAction({
      id: jadwalSholatId,
      ...values,
    });
    // @ts-ignore
    if (res?.error) {
      // @ts-ignore
      toast.error(res.error);
      return;
    }

    router.refresh();
    if (close) close();
    toast.success("Jadwal Sholat berhasil diupdate");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3 md:mx-0 mx-3"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="imam"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-left">Imam</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input {...field} placeholder="Masukkan nama imam" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="khatib"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-left">Khatib</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input {...field} placeholder="Masukkan nama khatib" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="judul"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-left">Judul Khutbah</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input {...field} placeholder="Masukkan judul khutbah" />
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
            name="display"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex items-center gap-2 my-4">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="">Tampilkan di halaman utama</FormLabel>
                </div>
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
