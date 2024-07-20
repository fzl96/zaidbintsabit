"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TypeFilter({ currentFilter }: { currentFilter: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createUrl = (f: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tipe", f);
    return `${pathname}?${params.toString()}`;
  };

  const onChange = (value: string) => {
    const url = createUrl(value);

    router.push(url);
  };

  return (
    <Select defaultValue={currentFilter} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Pilih tipe" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="semua">Semua</SelectItem>
          <SelectItem value="pemasukan">Pemasukan</SelectItem>
          <SelectItem value="pengeluaran">Pengeluaran</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
