import { LoginForm } from "./_components/login-form";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="relative h-screen flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 md:m-10 m-5">
        <Link href="/" className="flex items-center hover:underline">
          <ChevronLeft className="h-5 w-5" />
          <span>Kembali</span>
        </Link>
      </div>
      <div className="absolute inset">
        <div></div>
        <LoginForm />
      </div>
    </main>
  );
}
