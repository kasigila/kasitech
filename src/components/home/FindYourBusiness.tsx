"use client";

import Link from "next/link";
import {
  getHomepagePreviews,
  SHOWCASE_HREF,
  type BusinessIndustry,
} from "@/data/business-industries";
import { SafeImage } from "@/components/ui/SafeImage";
import { track } from "@/lib/analytics";

export function FindYourBusiness() {
  const previews = getHomepagePreviews();

  return (
    <div id="explore" className="mt-20 md:mt-24">
      <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
        BUSINESS EXAMPLES
      </p>
      <h2 className="mt-4 max-w-3xl font-display text-3xl leading-[1.05] tracking-[-0.04em] md:text-5xl">
        Explore businesses we&apos;ve built.
      </h2>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-kasi-grey md:text-lg">
        Explore interactive examples of websites, business systems and digital
        experiences built for different industries.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
        {previews.map((industry) => (
          <PreviewCard key={industry.id} industry={industry} />
        ))}
      </div>

      <div className="mt-12 md:mt-14">
        <Link
          href={SHOWCASE_HREF}
          onClick={() =>
            track("portfolio_route", {
              id: "explore_all_businesses",
              source: "home",
            })
          }
          className="inline-flex min-h-14 items-center border border-kasi-green bg-kasi-green px-8 py-4 text-base tracking-wide text-kasi-black transition hover:bg-transparent hover:text-kasi-green md:min-h-16 md:px-10 md:text-lg"
        >
          Explore all businesses →
        </Link>
      </div>
    </div>
  );
}

function PreviewCard({ industry }: { industry: BusinessIndustry }) {
  return (
    <Link
      href={industry.href}
      onClick={() =>
        track("demo_launch", {
          slug: industry.projectSlug ?? industry.id,
          source: "home_preview_card",
        })
      }
      className="group block border border-kasi-border bg-kasi-black transition hover:border-kasi-green"
      aria-label={`Explore ${industry.name}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-kasi-border">
        {industry.cover ? (
          <SafeImage
            src={industry.cover}
            alt=""
            fill
            className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, 33vw"
            fallbackLabel={industry.name}
          />
        ) : null}
      </div>
      <div className="p-5">
        <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
          {industry.name.toUpperCase()}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-kasi-grey">
          {industry.description}
        </p>
        <p className="mt-4 text-xs text-kasi-ivory/70 transition group-hover:text-kasi-green">
          Explore →
        </p>
      </div>
    </Link>
  );
}
