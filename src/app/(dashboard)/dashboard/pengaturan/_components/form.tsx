"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  type AkunParams,
  type User,
  akunSchema,
} from "@/server/db/schema/users";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
// import { logout, updateUser } from "@/lib/actions/user-setting-actions";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { updateUserAction } from "@/server/actions/user";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AkunFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: User;
}

export function AkunForm({ user }: AkunFormProps) {
  const router = useRouter();
  const form = useForm<AkunParams>({
    defaultValues: user ?? {},
    resolver: zodResolver(akunSchema),
  });

  async function onSubmit(data: AkunParams) {
    const res = await updateUserAction({ id: user.id, ...data });
    if (res?.error) return toast.error(res.error);
    toast.success("Pengaturan berhasil diperbarui");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Update Pengguna</CardTitle>
            <CardDescription>Update informasi akun pengguna</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                signOut();
              }}
            >
              Keluar
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
            >
              {form.formState.isSubmitting && (
                <span>
                  <Icons.spinner className="animate-spin h-4 w-4 mr-2" />
                </span>
              )}
              Simpan
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
