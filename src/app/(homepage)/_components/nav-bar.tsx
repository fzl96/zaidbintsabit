import Image from "next/image";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { NavMenu } from "./nav-menu";
import { MobileNavToggle } from "./mobile-nav-toggle";
import { currentUser } from "@/lib/auth";

export async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold items-center gap-1">
            <Image
              src="/logo.png"
              alt="logo"
              width={35}
              height={35}
              className="rounded-md"
            />
          </Link>
          <div className="md:hidden block">
            <MobileNavToggle loggedIn={!!user} />
          </div>
          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <NavMenu />
              {!user ? (
                <Link
                  href="/login"
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Login
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>
              )}
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
