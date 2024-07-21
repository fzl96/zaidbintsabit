// import { MainNavItem, SidebarNavItem } from "@/lib/definitions";

import { SidebarNavItem } from "@/lib/definitions";

// export const mainNavItems: MainNavItem[] = [
//   {
//     title: "Visi dan Misi",
//     href: "/profil/visi-misi",
//   },
//   {
//     title: "Sejarah",
//     href: "/profil/sejarah",
//   },
//   {
//     title: "Pimpinan",
//     href: "/profil/pimpinan",
//   },
//   {
//     title: "Imam dan Muadzin",
//     href: "/profil/imam-muadzin",
//   },
//   {
//     title: "aktivitas",
//     href: "/post/kegiatan",
//   },
//   {
//     title: "Pengumuman",
//     href: "/post/pengumuman",
//   },
//   {
//     title: "Artikel",
//     href: "/post/artikel",
//   },
// ];

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
    title: "Data Masjid",
    items: [
      {
        title: "Jamaah",
        href: "/dashboard/jamaah",
        icon: "users",
      },
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
        href: "/dashboard/akun",
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
