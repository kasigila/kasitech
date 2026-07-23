import Link from "next/link";
import { HeroProductWindow } from "@/components/home/HeroProductWindow";
import { IntentChips } from "@/components/home/IntentChips";
import { BuildPathways } from "@/components/home/BuildPathways";
import { ShippedCaseStudy } from "@/components/home/ShippedCaseStudy";
import { CapabilitySystem } from "@/components/home/CapabilitySystem";
import { FounderTeaser } from "@/components/home/FounderTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pt-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92] tracking-[-0.045em]">
              WE BUILD
              <br />
              DIGITAL PRODUCTS
              <br />
              THAT WORK.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-kasi-grey md:text-lg">
              Websites, booking systems, ecommerce, software and AI - designed
              so customers can act and businesses can operate.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/start"
                className="border border-kasi-green bg-kasi-green px-6 py-3.5 text-sm tracking-wide text-kasi-black transition hover:bg-transparent hover:text-kasi-green"
              >
                START A PROJECT →
              </Link>
              <a
                href="#build"
                className="text-sm tracking-wide text-kasi-grey transition hover:text-kasi-ivory"
              >
                WHAT DO YOU WANT TO BUILD? ↓
              </a>
            </div>
            <IntentChips />
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-kasi-border pt-6 text-[12px] text-kasi-grey">
              <p>Dar es Salaam, Tanzania · Working worldwide</p>
              <p className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-kasi-green" />
                Available for select projects
              </p>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroProductWindow />
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-[1400px] lg:hidden">
          <HeroProductWindow />
        </div>
      </section>

      <div id="build">
        <BuildPathways />
      </div>

      <ShippedCaseStudy />

      <CapabilitySystem />

      <FounderTeaser />

      <FinalCTA />
    </>
  );
}
