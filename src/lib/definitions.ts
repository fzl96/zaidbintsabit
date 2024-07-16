import { Icons } from "@/components/icons";

export type SidebarNavItem = {
  title: string;
  items: SideNavItem[];
};

export type SideNavItem = {
  title: string;
  href: string;
  icon?: keyof typeof Icons;
};
