"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function YearSelect({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const yearOptions = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  const currentYear = Number(
    searchParams.get("year") || new Date().getFullYear()
  );

  return (
    <Select
      onValueChange={(year) => {
        const params = new URLSearchParams(searchParams);
        params.set("year", String(year));
        replace(`${pathname}?${params.toString()}`);
      }}
      defaultValue={currentYear.toString()}
    >
      <SelectTrigger className={className} type="button">
        <SelectValue>{currentYear}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {yearOptions.map((year) => (
            <SelectItem value={year.toString()} key={year}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
