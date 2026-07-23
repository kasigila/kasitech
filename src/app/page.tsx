import Link from "next/link";
import { HeroProductWindow } from "@/components/home/HeroProductWindow";
import { BeautifulIsntEnough } from "@/components/home/BeautifulIsntEnough";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { ShippedWork } from "@/components/home/ShippedWork";
import { SelectedWork } from "@/components/home/SelectedWork";
import { PortfolioRouter } from "@/components/home/PortfolioRouter";
import { HowWeEngage } from "@/components/home/HowWeEngage";
import { HowWeThink } from "@/components/home/HowWeThink";
import { KasiMeansSpeed } from "@/components/home/KasiMeansSpeed";
import { WhyKasiTech } from "@/components/home/WhyKasiTech";
import { BeyondClientWork } from "@/components/home/BeyondClientWork";
import { FounderTeaser } from "@/components/home/FounderTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";
import { AllDemosStrip } from "@/components/home/AllDemosStrip";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";

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
              Websites, booking systems, ecommerce, software and AI, designed
              so customers can act and businesses can operate.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/start"
                className="border border-kasi-green bg-kasi-green px-6 py-3 text-sm tracking-wide text-kasi-black"
              >
                START A PROJECT ↗
              </Link>
              {hasWhatsApp() && (
                <a
                  href={whatsappUrl()}
                  className="text-sm text-kasi-grey hover:text-kasi-ivory"
                >
                  WhatsApp →
                </a>
              )}
              <a
                href="#shipped"
                className="text-sm text-kasi-grey hover:text-kasi-ivory"
              >
                See shipped work ↓
              </a>
            </div>
            <p className="mt-6 text-[12px] text-kasi-grey">
              Reply within 24 hours on business days · Limited new projects
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-kasi-border pt-6 text-[12px] text-kasi-grey">
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
        <div className="mx-auto mt-12 max-w-[1400px] lg:hidden">
          <HeroProductWindow />
        </div>
      </section>

      <BeautifulIsntEnough />
      <WhatWeBuild />
      <div id="shipped">
        <ShippedWork />
      </div>
      <HowWeEngage />
      <div id="work">
        <SelectedWork />
      </div>
      <AllDemosStrip />
      <PortfolioRouter />
      <HowWeThink />
      <KasiMeansSpeed />
      <WhyKasiTech />
      <BeyondClientWork />
      <FounderTeaser />
      <FinalCTA />
    </>
  );
}
