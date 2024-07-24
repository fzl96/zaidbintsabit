// import { MainNavItem, SidebarNavItem } from "@/lib/definitions";

import { SidebarNavItem } from "@/lib/definitions";

export const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Beranda",
    items: [{ title: "Dashboard", href: "/dashboard", icon: "dashboard" }],
  },
  {
    title: "Keuangan Masjid",
    items: [
      {
        title: "Infaq Masjid",
        href: "/dashboard/infaq-masjid",
      },
      {
        title: "Infaq Anak Yatim",
        href: "/dashboard/infaq-anak-yatim",
      },
      {
        title: "Infaq Ramadhan",
        href: "/dashboard/infaq-ramadhan",
      },
      {
        title: "Infaq Jum'at",
        href: "/dashboard/infaq-jumat",
      },
    ],
  },
  {
    title: "Zakat Masjid",
    items: [
      {
        title: "Zakat",
        href: "/dashboard/zakat",
      },
    ],
  },
  {
    title: "Data Inventaris",
    items: [
      {
        title: "Kategori Inventaris",
        href: "/dashboard/kategori-inventaris",
        icon: "folders",
      },
      {
        title: "Inventaris",
        href: "/dashboard/inventaris",
        icon: "folder",
      },
    ],
  },
  {
    title: "Jadwal Sholat",
    items: [
      {
        title: "Sholat Wajib",
        href: "/dashboard/sholat-wajib",
      },
      {
        title: "Sholat Jum'at",
        href: "/dashboard/sholat-jumat",
      },
      {
        title: "Sholat Tarawih",
        href: "/dashboard/sholat-tarawih",
      },
      {
        title: "Sholat Ied",
        href: "/dashboard/sholat-ied",
      },
    ],
  },
  {
    title: "Info Tahsin",
    items: [
      {
        title: "Jadwal Tahsin",
        href: "/dashboard/jadwal-tahsin",
        icon: "calendar",
      },
      {
        title: "Anggota Tahsin",
        href: "/dashboard/anggota-tahsin",
        icon: "users",
      },
    ],
  },
  {
    title: "Data Masjid",
    items: [
      {
        title: "Pengurus Masjid",
        href: "/dashboard/pengurus",
        icon: "userCheck",
      },
      {
        title: "Post",
        href: "/dashboard/post",
        icon: "newspaper",
      },
    ],
  },
  {
    title: "Pengaturan",
    items: [
      {
        title: "Akun Pengurus",
        href: "/dashboard/akun-pengurus",
        icon: "user",
      },
      {
        title: "Pengaturan",
        href: "/dashboard/pengaturan",
        icon: "settings",
      },
    ],
  },
];

export const months: { value: number; label: string; short: string }[] = [
  { value: 1, label: "Januari", short: "Jan" },
  { value: 2, label: "Februari", short: "Feb" },
  { value: 3, label: "Maret", short: "Mar" },
  { value: 4, label: "April", short: "Apr" },
  { value: 5, label: "Mei", short: "Mei" },
  { value: 6, label: "Juni", short: "Jun" },
  { value: 7, label: "Juli", short: "Jul" },
  { value: 8, label: "Agustus", short: "Agu" },
  { value: 9, label: "September", short: "Sep" },
  { value: 10, label: "Oktober", short: "Okt" },
  { value: 11, label: "November", short: "Nov" },
  { value: 12, label: "Desember", short: "Des" },
];
