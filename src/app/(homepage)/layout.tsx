import { Metadata } from "next";
import { Navbar } from "./_components/nav-bar";
import { SiteFooter } from "./_components/footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Masjid Zaid bin Tsabit",
    default: "Masjid Zaid bin Tsabit",
  },
  description:
    "Masjid Zaid bin Tsabit merupakan sebuah masjid yang ada di Kota Pekanbaru yang berlokasi di Jalan Delima",
};

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen">{children}</main>
      <SiteFooter className="border-t bg-white mt-10" />
    </div>
  );
}
