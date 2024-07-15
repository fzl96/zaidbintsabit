"use client";

import Link from "next/link";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTransition } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema } from "@/lib/schema/auth";
import { signIn } from "@/server/actions/sign-in";
import { siteConfig } from "@/config/site";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
  });

  const onSubmit = async (values: z.infer<typeof SigninSchema>) => {
    setError("");

    startTransition(async () => {
      const result = await signIn(values);

      setError(result?.error ?? "");
    });
  };

  return (
    <Card className="md:max-w-md max-w-sm border-none shadow-none">
      <CardHeader className="text-center">
        <div className="h-40 overflow-hidden">
          <img
            src="/logo.png"
            alt="Logo masjid zaid bin tsabit"
            className="object-cover h-40 mx-auto"
          />
        </div>
        <CardTitle className="text-2xl">{siteConfig.name}</CardTitle>
        <CardDescription>
          Masukkan username untuk masuk ke dalam aplikasi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Username"
                      autoComplete="email"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="password"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending || form.formState.isSubmitting}
              type="submit"
              className="w-full"
            >
              {(isPending || form.formState.isSubmitting) && (
                <LoaderCircle className="animate-spin w-4 h-4 mr-2" />
              )}
              <span>Masuk</span>
            </Button>
            <FormError error={error} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function FormError({ error }: { error: string }) {
  if (!error) return null;

  return (
    <div className="text-center gap-x-2 rounded-md bg-destructive/25 py-2 text-sm text-destructive">
      {error}
    </div>
  );
}
