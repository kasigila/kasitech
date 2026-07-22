import Link from "next/link";
import { HeroProductWindow } from "@/components/home/HeroProductWindow";
import { BeautifulIsntEnough } from "@/components/home/BeautifulIsntEnough";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { SelectedWork } from "@/components/home/SelectedWork";
import { PortfolioRouter } from "@/components/home/PortfolioRouter";
import { HowWeThink } from "@/components/home/HowWeThink";
import { KasiMeansSpeed } from "@/components/home/KasiMeansSpeed";
import { WhyKasiTech } from "@/components/home/WhyKasiTech";
import { BeyondClientWork } from "@/components/home/BeyondClientWork";
import { FounderTeaser } from "@/components/home/FounderTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";
import { AllDemosStrip } from "@/components/home/AllDemosStrip";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pt-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="font-display text-5xl leading-[0.92] tracking-[-0.045em] md:text-7xl lg:text-[5.5rem]">
              WE BUILD
              <br />
              DIGITAL PRODUCTS
              <br />
              THAT WORK.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-kasi-grey md:text-lg">
              Websites, booking systems, ecommerce, software and AI — designed
              so customers can act, and businesses can operate.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/start"
                className="border border-kasi-green bg-kasi-green px-6 py-3 text-sm tracking-wide text-kasi-black"
              >
                START A PROJECT ↗
              </Link>
              <a
                href="#work"
                className="text-sm text-kasi-grey hover:text-kasi-ivory"
              >
                See live demos ↓
              </a>
            </div>
            <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-kasi-border pt-6 text-[12px] text-kasi-grey">
              <p>Dar es Salaam, Tanzania — Working worldwide</p>
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
        <div className="mx-auto mt-12 max-w-[1400px] lg:hidden">
          <HeroProductWindow />
        </div>
      </section>

      <BeautifulIsntEnough />
      <WhatWeBuild />
      <div id="work">
        <SelectedWork />
      </div>
      <AllDemosStrip />
      <PortfolioRouter />
      <HowWeThink />
      <KasiMeansSpeed />
      <WhyKasiTech />
      <BeyondClientWork />
      <section className="bg-kasi-black px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            TRUSTED TO BUILD
          </p>
          <p className="mt-6 max-w-xl text-lg text-kasi-grey">
            Client logos and testimonials will appear here when genuine
            relationships exist. Until then, the live demos are the proof.
          </p>
        </div>
      </section>
      <FounderTeaser />
      <FinalCTA />
    </>
  );
}
