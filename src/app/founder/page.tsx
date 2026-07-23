import type { Metadata } from "next";
import Link from "next/link";
import { BuyCtas } from "@/components/site/BuyCtas";

export const metadata: Metadata = { title: "Founder" };

export default function FounderPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2">
        <div className="relative flex aspect-[4/5] items-end overflow-hidden bg-kasi-black p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#242424,transparent_55%)]" />
          <div className="relative">
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              EST. 2026 · DAR ES SALAAM
            </p>
            <p className="mt-6 max-w-[14ch] font-display text-3xl leading-[1.1] tracking-[-0.03em] text-kasi-ivory md:text-5xl">
              Founder,
              <br />
              KasiTech
            </p>
          </div>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            FOUNDER
          </p>
          <h1 className="mt-6 font-display text-5xl tracking-[-0.04em] md:text-6xl">
            KAREN MARIE
            <br />
            KASIGILA
          </h1>
          <p className="mt-4 text-kasi-grey">Founder, KasiTech</p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-kasi-green">
            Data Science × Technology × Entrepreneurship
          </p>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-kasi-ivory/85">
            <p>
              KasiTech started in Dar es Salaam around a practical idea: digital
              products should reduce friction, help people find, book, buy,
              operate and decide faster, without rushing the craft.
            </p>
            <p>
              With a background spanning data science and building systems,
              Karen leads KasiTech as a technology studio that can start with a
              website and grow into software, automation, and products.
            </p>
          </div>
          <div className="mt-10 space-y-4">
            <BuyCtas source="founder" />
            <Link
              href="/card"
              className="inline-block text-sm text-kasi-grey hover:text-kasi-green"
            >
              Digital business card →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
