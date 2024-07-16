import { currentRole } from "@/lib/auth";
import { NavItems } from "./nav-items";
import { cn } from "@/lib/utils";

export async function Nav({ className }: { className?: string }) {
  const role = await currentRole();

  return (
    <nav className={cn(className)}>
      <NavItems role={role} />
    </nav>
  );
}
