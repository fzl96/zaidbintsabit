import { Metadata } from "next";
import { Header } from "./_components/header";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Nav } from "./_components/nav";

export const metadata: Metadata = {
  title: {
    default: "Dashboard - Masjid Zaid bin Tsabit",
    template: "%s | Masjid Zaid bin Tsabit",
  },
  description: "Dashboard Masjid Zaid bin Tsabit",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] md:px-10">
      <div className="hidden border-r md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src="/logo.png"
                alt="Logo"
                width={20}
                height={20}
                className="w-8 h-8"
              />
              <span className="">Masjid {siteConfig.name}</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Nav className="grid items-start px-2 text-sm font-medium lg:px-4" />
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:py-6 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
