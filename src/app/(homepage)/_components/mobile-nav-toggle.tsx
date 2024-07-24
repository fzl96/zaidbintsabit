"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MobileNavToggle({ loggedIn }: { loggedIn?: boolean }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <Menu className="w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 w-[400px]">
        <Link href="/profil/sejarah">
          <DropdownMenuItem>Sejarah</DropdownMenuItem>
        </Link>
        <Link href="/profil/visi-misi">
          <DropdownMenuItem>Visi dan Misi</DropdownMenuItem>
        </Link>
        <Link href="/profil/pimpinan">
          <DropdownMenuItem>Pimpinan</DropdownMenuItem>
        </Link>
        <Link href="/profil/imam-muadzin">
          <DropdownMenuItem>Imam dan Muadzin</DropdownMenuItem>
        </Link>
        <Link href="/keuangan/infaq-masjid">
          <DropdownMenuItem>Infaq Masjid</DropdownMenuItem>
        </Link>
        <Link href="/keuangan/infaq-jumat">
          <DropdownMenuItem>Infaq Jum&apos;at</DropdownMenuItem>
        </Link>
        <Link href="/keuangan/infaq-ramadhan">
          <DropdownMenuItem>Infaq Ramadhan</DropdownMenuItem>
        </Link>
        <Link href="/keuangan/infaq-masjid">
          <DropdownMenuItem>Infaq Anak Yatim</DropdownMenuItem>
        </Link>
        <Link href="/jadwal-tahsin">
          <DropdownMenuItem>Jadwal Tahsin</DropdownMenuItem>
        </Link>
        <Link href="/post/aktivitas">
          <DropdownMenuItem>Aktivitas</DropdownMenuItem>
        </Link>
        <Link href="/post/pengumuman">
          <DropdownMenuItem>Pengumuman</DropdownMenuItem>
        </Link>
        <Link href="/post/artikel">
          <DropdownMenuItem>Artikel</DropdownMenuItem>
        </Link>
        <Link href="/post/kajian">
          <DropdownMenuItem>Kajian</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {!loggedIn ? (
          <Link href="/login">
            <DropdownMenuItem>Login</DropdownMenuItem>
          </Link>
        ) : (
          <DropdownMenuItem>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
