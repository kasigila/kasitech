import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Founder" };

export default function FounderPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden bg-kasi-border">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80"
            alt="Editorial portrait for Karen Marie Kasigila"
            fill
            className="object-cover grayscale"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
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
              KasiTech was founded around a simple belief: digital products
              should do more than look impressive—they should make businesses
              work better.
            </p>
            <p>
              With roots in data science and a builder’s instinct for systems,
              Karen leads KasiTech to reduce friction across the journeys that
              matter: find, understand, book, buy, operate, analyze, decide,
              grow.
            </p>
            <p className="text-kasi-grey">
              This page is about the company&apos;s founding perspective—not a
              personal portfolio.
            </p>
          </div>
          <Link
            href="/start"
            className="mt-10 inline-block border border-kasi-green bg-kasi-green px-6 py-3 text-sm text-kasi-black"
          >
            START A PROJECT ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
