"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
// import local id from "date-fns/locale/id";
import { id } from "date-fns/locale";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "./breadcrumbs";
import {
  insertPostParams,
  type NewPostParams,
  type Post,
} from "@/server/db/schema/post";
import { Icons } from "@/components/icons";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { TipTap } from "@/components/tip-tap";
import { Button } from "@/components/ui/button";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { useEdgeStore } from "@/lib/edgestore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  createPostAction,
  deletePostAction,
  updatePostAction,
} from "@/server/actions/post";

interface PostFormProps {
  post?: Post;
  postId?: string;
  action: "create" | "update" | "delete";
  breadCrumbs?: { label: string; href: string }[];
  close?: () => void;
}

const options: { value: string; label: string }[] = [
  { value: "aktivitas", label: "Aktivitas" },
  { value: "pengumuman", label: "Pengumuman" },
  { value: "artikel", label: "Artikel" },
  { value: "kajian", label: "Kajian" },
];

export function PostForm({
  action,
  post,
  postId,
  breadCrumbs,
  close,
}: PostFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<NewPostParams>({
    resolver: zodResolver(insertPostParams),
    mode: "onChange",
    defaultValues: post || {
      judul: "",
      thumbnail: "",
    },
  });
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();

  const after = async (
    action: "create" | "update" | "delete",
    data?: { error?: string }
  ) => {
    if (data?.error) {
      toast.error(data.error);
      return;
    }

    if (close) close();
    router.push("/dashboard/post");
    router.refresh();
    toast.success(
      `Data berhasil di${
        action === "delete" ? "hapus" : action === "create" ? "tambah" : "ubah"
      }`
    );
  };

  async function onSubmit(data: NewPostParams) {
    if (file && progress < 100) {
      toast.error("Mohon tunggu Foto sedang diunggah");
      return;
    }
    let res;
    if (action === "update" && post) {
      res = await updatePostAction({ id: post.id, ...data });

      if (data.thumbnail !== post.thumbnail) {
        if (post.thumbnail) {
          await edgestore.publicFiles.delete({
            url: post.thumbnail,
          });
        }
      }

      // @ts-ignore
      if (res?.error) return after("update", { error: res.error });
      if (data.thumbnail) {
        await edgestore.publicFiles.confirmUpload({
          url: data.thumbnail || "",
        });
      }
      return after("update");
    } else if (action === "create") {
      const res = await createPostAction(data);
      // @ts-ignore
      if (res?.error) return after("create", { error: res.error });
      if (data.thumbnail) {
        await edgestore.publicFiles.confirmUpload({
          url: data.thumbnail || "",
        });
      }
      return after("create");
    } else return;
  }

  if (action === "delete" && postId) {
    return (
      <form
        className="space-y-2"
        action={async () => await deletePostAction(postId)}
      >
        <Button
          type="submit"
          variant={"destructive"}
          className="w-full"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              const res = await deletePostAction(postId);
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
    <div className="flex gap-2 flex-col">
      <h1 className="prose scroll-m-20 text-4xl md:px-10 px-5 py-5 font-bold tracking-tight lg:text-5xl">
        {form.watch("judul") || "[Judul]"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" sticky top-0 flex justify-between items-center md:px-10 px-5 py-5 border-t border-b bg-white/75 backdrop-blur-lg transition-all z-30">
            <Breadcrumbs breadcrumbs={breadCrumbs || []} className="mb-0" />
            <Button
              type="submit"
              disabled={
                form.formState.isSubmitting ||
                (!form.formState.isDirty &&
                  form.watch("thumbnail") === post?.thumbnail)
              }
              className={cn({
                "cursor-not-allowed opacity-60":
                  form.formState.isSubmitting ||
                  (!form.formState.isDirty &&
                    form.watch("thumbnail") === post?.thumbnail),
              })}
            >
              {form.formState.isSubmitting && (
                <span>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                </span>
              )}
              Simpan
            </Button>
          </div>
          <div className="flex flex-col md:flex-row-reverse md:justify-between md:items-start">
            <div className="flex-1 md:sticky md:top-[8.35rem] p-5">
              <div className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="kategori"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Postingan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilit Jenis" />
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
                  name="tanggal"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Tanggal{" "}
                        {
                          options.find(
                            (item) => item.value === form.getValues("kategori")
                          )?.label
                        }
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "cccc, d MMMM yyyy", {
                                  locale: id,
                                })
                              ) : (
                                <span>Pilih Tanggal</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage {...field} />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <Label className="">Thumbnail</Label>
                  <SingleImageDropzone
                    width={200}
                    // @ts-ignore
                    value={file || form.watch("thumbnail")}
                    dropzoneOptions={{
                      maxSize: 1024 * 1024 * 5,
                    }}
                    onChange={(file) => setFile(file)}
                    onFileRemoved={() => form.setValue("thumbnail", "")}
                    onFileAdded={async (file) => {
                      try {
                        const res = await edgestore.publicFiles.upload({
                          file,
                          options: {
                            temporary: true,
                          },
                          input: { type: "post" },
                          onProgressChange: (progress) => {
                            setProgress(progress);
                          },
                        });
                        form.setValue("thumbnail", res.url);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  />
                  <div
                    className={cn("flex items-center gap-2", !file && "hidden")}
                  >
                    <Progress value={progress} />
                    <p className="text-sm">{progress}%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-[2] md:border-r md:min-h-[100dvh] md:px-10 px-5 pt-3 space-y-2">
              <FormField
                control={form.control}
                name="judul"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title">Judul</FormLabel>
                    <FormControl>
                      <Input placeholder="Judul" {...field} />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="konten"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title">Konten</FormLabel>
                    <FormControl>
                      <TipTap
                        content={form.getValues("konten")}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
