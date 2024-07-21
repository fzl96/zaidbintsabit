"use client";

import {
  type Pengurus,
  type NewPengurusParams,
  type PengurusId,
  insertPengurusParams,
} from "@/server/db/schema/pengurus";
import {
  createPengurusAction,
  updatePengurusAction,
} from "@/server/actions/pengurus";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const options: { value: string; label: string }[] = [
  { value: "imam", label: "Imam" },
  { value: "muadzin", label: "Muadzin" },
];

interface PengurusFormProps {
  pengurus?: Pengurus;
  pengurusId?: PengurusId;
  action: "create" | "update" | "delete";
  close?: () => void;
}

export function PengurusForm({
  pengurus,
  pengurusId,
  action,
  close,
}: PengurusFormProps) {
  const editing = action === "update";

  const router = useRouter();

  const form = useForm<NewPengurusParams>({
    resolver: zodResolver(insertPengurusParams),
    defaultValues: pengurus ?? {
      foto: "",
      noHp: "",
    },
  });

  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const after = async (
    action: "create" | "update" | "delete",
    data?: { error?: string }
  ) => {
    if (data?.error) {
      toast.error(data.error);
      return;
    }

    if (close) close();
    router.push("/dashboard/pengurus");
    router.refresh();
    toast.success(
      `Data berhasil di${
        action === "delete" ? "hapus" : action === "create" ? "tambah" : "ubah"
      }`
    );
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    if (editing && pengurus) {
      const res = await updatePengurusAction({ id: pengurus.id, ...data });
      if (res?.error) return after("update", { error: res.error });

      return after("update");
    }
    const res = await createPengurusAction(data);
    if (res?.error) return after("create", { error: res.error });
    return after("create");
  });

  return (
    <Form {...form}>
      <form className="p-5 mx-5 border rounded-lg" onSubmit={handleSubmit}>
        <div className="grid gap-3">
          <Label htmlFor="foto">Foto</Label>
          <SingleImageDropzone
            width={200}
            // @ts-ignore
            value={file || form.watch("foto")}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 5,
            }}
            onChange={(file) => setFile(file)}
            onFileRemoved={() => form.setValue("foto", "")}
            onFileAdded={async (file) => {
              try {
                setUploading(true);
                const res = await edgestore.publicFiles.upload({
                  file,
                  options: {
                    temporary: true,
                  },
                  input: { type: "profile" },
                  onProgressChange: (progress) => {
                    setProgress(progress);
                  },
                });
                form.setValue("foto", res.url);
                setUploading(false);
              } catch (error) {
                console.log(error);
              }
            }}
          />
          <div className={cn("flex items-center gap-2", !file && "hidden")}>
            <Progress value={progress} className="w-[180px]" />
            {progress}%
          </div>
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required-field">Nama</FormLabel>
                <Input
                  id="nama"
                  placeholder="Masukkan nama"
                  {...field}
                  autoFocus
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required-field">Jabatan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Status" />
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
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="noHp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">No. HP</FormLabel>
                {/* @ts-ignore */}
                <Input id="noHp" placeholder="Masukkan No Hp" {...field} />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 mt-5">
          <Link
            href="/dashboard/pengurus"
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
            disabled={form.formState.isSubmitting || uploading}
          >
            {(form.formState.isSubmitting || uploading) && (
              <Icons.spinner className="animate-spin h-4 w-4 mr-2" />
            )}
            Simpan
          </Button>
        </div>
      </form>
    </Form>
  );
}
