"use client";

import { sidebarNavItems } from "@/config/dashboard";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export function NavItems({
  role,
}: {
  role: "ADMIN" | "PENGURUS" | "USER" | undefined;
}) {
  const pathname = usePathname();

  return (
    <>
      {sidebarNavItems.map((item) => {
        return (
          <div className="flex flex-col mb-5 gap-2" key={item.title}>
            <div className="px-3 font-medium text-sm md:text-base">
              {item.title}
            </div>
            <div className="space-y-2">
              {item.items.map((subItem) => {
                const Icon = Icons[subItem.icon || "arrowRight"];
                const active = useMemo(() => {
                  return (
                    (pathname.startsWith(subItem.href) &&
                      subItem.href !== "/dashboard") ||
                    (pathname === subItem.href && subItem.href === "/dashboard")
                  );
                }, [pathname]);

                return (
                  <Link
                    key={subItem.title}
                    href={subItem.href}
                    className={cn(
                      "flex text-sm items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      {
                        "hover:bg-accent": !active,
                        "bg-primary text-primary-foreground": active,
                      }
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {subItem.title}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
