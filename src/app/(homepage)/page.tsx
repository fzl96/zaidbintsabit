import { Suspense } from "react";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CarouselSlide } from "./_components/carousel-slide";
import { Skeleton } from "@/components/ui/skeleton";
import { JadwalSholatSection } from "./_components/jadwal-sholat-section";
import { AktivitasSection } from "./_components/aktivitas-section";
import { PengumumanSection } from "./_components/pengumuman-section";
import { ArtikelSection } from "./_components/artikel-section";
import { SaldoSection } from "./_components/saldo-section";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">Zaid Bin Tsabit</p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl text-center">
          Selamat Datang di <br />
          <span>Masjid</span>
          <br />
          <span className="text-blue-500">Zaid bin Tsabit</span>
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg text-center">
          Tempat di mana kedamaian, dan kesatuan tumbuh bersama. Kami menyambut
          Anda untuk berbagi dalam pengalaman rohani dan pembelajaran yang
          mendalam di komunitas kami.
        </p>
        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          href="#kegiatan-masjid"
        >
          Lihat Kegiatan
        </Link>
      </MaxWidthWrapper>
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80a4ff] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Suspense fallback={<Skeleton className="h-96" />}>
                    <CarouselSlide />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80a4ff] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>

        <div className="mx-auto mb-32 mt-20 max-w-6xl sm:mt-56 relative">
          <Suspense fallback={<Skeleton className="h-96" />}>
            <JadwalSholatSection />
          </Suspense>
        </div>

        <div
          id="keuangan-masjid"
          className="mx-auto mb-32 mt-20 max-w-6xl sm:mt-56 relative"
        >
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl text-center">
                Keuangan Masjid
              </h2>
              <p className="mt-4 text-lg text-gray-600 text-center">
                Status keuangan di Masjid Zaid bin Tsabit{" "}
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-5rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-[0.15] sm:left-[calc(50%-25rem)] sm:w-[72.1875rem]"
            />
          </div>

          <Suspense fallback={<Skeleton className="h-96" />}>
            <SaldoSection />
          </Suspense>
        </div>

        <div
          id="kegiatan-masjid"
          className="mx-auto mb-32 mt-20 max-w-5xl sm:mt-56 relative"
        >
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl text-center">
                Aktivitas Masjid
              </h2>
              <p className="mt-4 text-lg text-gray-600 text-center">
                Aktivitas terbaru di Masjid Zaid bin Tsabit{" "}
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-5rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-[0.15] sm:left-[calc(50%-25rem)] sm:w-[72.1875rem]"
            />
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <AktivitasSection />
          </Suspense>
        </div>

        <div
          id="pengumuman-masjid"
          className="mx-auto mb-32 mt-20 max-w-5xl sm:mt-56 relative"
        >
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl text-center">
                Pengumuman Masjid
              </h2>
              <p className="mt-4 text-lg text-gray-600 text-center">
                Pengumuman Terbaru dari Masjid Zaid bin Tsabit{" "}
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-5rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-[0.15] sm:left-[calc(50%-25rem)] sm:w-[72.1875rem]"
            />
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <PengumumanSection />
          </Suspense>
        </div>
        <div
          id="artikel-masjid"
          className="mx-auto mb-32 mt-20 max-w-5xl sm:mt-56 relative"
        >
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl text-center">
                Artikel{" "}
              </h2>
              <p className="mt-4 text-lg text-gray-600 text-center">
                Artikel Terbaru dari Masjid Zaid bin Tsabit{" "}
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-5rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-[0.15] sm:left-[calc(50%-25rem)] sm:w-[72.1875rem]"
            />
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            {/* <Artikel /> */}
            <ArtikelSection />
          </Suspense>
        </div>

        <div
          id="kajian-masjid"
          className="mx-auto mb-32 mt-20 max-w-5xl sm:mt-56 relative"
        >
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl text-center">
                Kajian
              </h2>
              <p className="mt-4 text-lg text-gray-600 text-center">
                Kajian terbaru di Masjid Zaid bin Tsabit{" "}
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-5rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-[0.15] sm:left-[calc(50%-25rem)] sm:w-[72.1875rem]"
            />
          </div>

          <Suspense fallback={<div>Loading...</div>}></Suspense>
        </div>
      </div>
    </>
  );
}
