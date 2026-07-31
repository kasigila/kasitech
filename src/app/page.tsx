import Link from "next/link";
import { FindYourBusiness } from "@/components/home/FindYourBusiness";
import { ShippedCaseStudy } from "@/components/home/ShippedCaseStudy";
import { FounderTeaser } from "@/components/home/FounderTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="max-w-5xl font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92] tracking-[-0.045em]">
            WE BUILD
            <br />
            DIGITAL PRODUCTS
            <br />
            THAT HELP BUSINESSES GROW.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-kasi-grey md:text-lg">
            From professional websites and online stores to booking systems,
            business software, automation and AI, we design technology around
            the way your business works.
          </p>
          <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
            <Link
              href="/work#client-work"
              className="text-kasi-green transition hover:text-kasi-ivory"
            >
              2 LIVE LAUNCHES
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/showcase"
              className="text-kasi-green transition hover:text-kasi-ivory"
            >
              13 BUSINESS EXAMPLES
            </Link>
          </p>
          <div className="mt-10">
            <Link
              href="/start"
              className="inline-flex min-h-12 items-center border border-kasi-green bg-kasi-green px-6 py-3.5 text-sm tracking-wide text-kasi-black transition hover:bg-transparent hover:text-kasi-green"
            >
              START A PROJECT →
            </Link>
          </div>

          <FindYourBusiness />
        </div>
      </section>

      <ShippedCaseStudy />

      <FounderTeaser />

      <FinalCTA />
    </>
  );
}
