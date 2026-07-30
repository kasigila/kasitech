import type { Metadata } from "next";
import Link from "next/link";
import { BuyCtas } from "@/components/site/BuyCtas";
import { PackageComparison } from "@/components/pricing/PackageComparison";
import { ServiceBrowser } from "@/components/pricing/ServiceBrowser";
import { BundlesSection } from "@/components/pricing/BundlesSection";
import { CareComparison } from "@/components/pricing/CareComparison";
import { PricingStickyNav } from "@/components/pricing/PricingStickyNav";
import { PricingPathways } from "@/components/pricing/PricingPathways";
import { loadPriceBook } from "@/commercial/price-book/load";
import {
  INDUSTRIES,
  PACKAGE_POSITIONING,
  catalogMeta,
  displayItemPrice,
  getBrowsableItems,
  getBundleViews,
  getPackageInclusionCodes,
  getWebsitePackages,
} from "@/commercial/catalog/presentation";
import { PRICE_BOOK_VERSION } from "@/commercial/types";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Simple KasiTech pricing in Tanzanian Shillings — website packages, bundles, care, and add-ons. Clear scope before you buy.",
  openGraph: {
    title: "KasiTech Services & Pricing",
    description: "Clear scope. Clear pricing. Built around your business.",
  },
};

export default function PricingPage() {
  const book = loadPriceBook();
  const meta = catalogMeta();
  const packages = getWebsitePackages(book);
  const browsable = getBrowsableItems(book);
  const bundles = getBundleViews(book);
  const carePlans = book.items.filter(
    (i) => i.kind === "SUBSCRIPTION_TIER" && i.category.includes("Care"),
  );
  const kbPlans = book.items.filter(
    (i) =>
      (i.kind === "SUBSCRIPTION_TIER" || i.kind === "CUSTOM_QUOTE_ITEM") &&
      i.category.includes("KasiTech Business"),
  );
  const custom = book.items.filter(
    (i) =>
      i.kind === "CUSTOM_QUOTE_ITEM" &&
      (i.category.includes("Custom") ||
        i.code === "WEB-CUS" ||
        i.category.includes("Discovery")),
  );
  const delivery = book.items.filter((i) => i.kind === "DELIVERY_OPTION");
  const thirdParty = book.items.filter((i) => i.kind === "THIRD_PARTY_COST");

  const inclusions: Record<string, string[]> = {};
  for (const p of packages) {
    const codes = getPackageInclusionCodes(p.code, book);
    inclusions[p.code] = codes.map((code) => {
      const item = book.itemByCode.get(code);
      if (item) return item.name;
      const ent = book.entitlements.find((e) => e.code === code);
      return ent?.name ?? code;
    });
    if (!inclusions[p.code].length && PACKAGE_POSITIONING[p.code]) {
      inclusions[p.code] = ["Website basics included with every package"];
    }
  }

  return (
    <div className="pt-28">
      <section className="relative overflow-hidden px-5 pb-14 md:px-8 md:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 0% 0%, rgba(199,255,0,0.1), transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            SERVICES &amp; PRICING
          </p>
          <h1 className="mt-6 max-w-[14ch] font-display text-5xl leading-[0.92] tracking-[-0.045em] md:text-7xl">
            What do you need?
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-kasi-grey">
            Pick the path that matches your situation. Prices are in Tanzanian
            Shillings. Nothing starts until you approve a written quotation.
          </p>

          <PricingPathways />

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <BuyCtas source="pricing" />
            <a
              href="/api/catalog/pdf"
              className="text-sm text-kasi-grey transition hover:text-kasi-green"
            >
              Download PDF guide →
            </a>
          </div>
        </div>
      </section>

      <div className="px-5 md:px-8">
        <PricingStickyNav />
      </div>

      {/* 01 Websites */}
      <section
        id="websites"
        className="scroll-mt-36 border-t border-kasi-border px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            01 · WEBSITES
          </p>
          <h2 className="mt-4 max-w-[16ch] font-display text-3xl tracking-[-0.03em] md:text-5xl">
            Start with the right website size.
          </h2>
          <p className="mt-5 max-w-xl text-base text-kasi-grey">
            Tap a package to see what it includes and how long it usually takes.
            Features already in your package are not charged again.
          </p>
          <div className="mt-12">
            <PackageComparison packages={packages} inclusions={inclusions} />
          </div>
        </div>
      </section>

      {/* 02 Bundles — natural next step for owners */}
      <section
        id="bundles"
        className="scroll-mt-36 border-t border-kasi-border bg-[#0c0c0c] px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            02 · READY-MADE BUNDLES
          </p>
          <h2 className="mt-4 max-w-[18ch] font-display text-3xl tracking-[-0.03em] md:text-5xl">
            Common setups, priced together.
          </h2>
          <p className="mt-5 max-w-xl text-base text-kasi-grey">
            For salons, restaurants, shops, tours, and more — website plus the
            tools people usually need, in one clear price.
          </p>
          <div className="mt-12">
            <BundlesSection bundles={bundles} />
          </div>
        </div>
      </section>

      {/* 03 Care */}
      <section
        id="care"
        className="scroll-mt-36 border-t border-kasi-border px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            03 · AFTER LAUNCH
          </p>
          <h2 className="mt-4 max-w-[16ch] font-display text-3xl tracking-[-0.03em] md:text-5xl">
            Keep the site cared for.
          </h2>
          <p className="mt-5 max-w-xl text-base text-kasi-grey">
            Optional. Care is for updates and ongoing attention after your site
            goes live. You can launch without it.
          </p>
          <div className="mt-12">
            <CareComparison plans={carePlans} />
          </div>
        </div>
      </section>

      {/* 04 KB */}
      <section
        id="kasitech-business"
        className="scroll-mt-36 border-t border-kasi-border bg-[#0c0c0c] px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            04 · RUN THE BUSINESS
          </p>
          <h2 className="mt-4 max-w-[18ch] font-display text-3xl tracking-[-0.03em] md:text-5xl">
            Tools after you launch.
          </h2>
          <p className="mt-5 max-w-xl text-base text-kasi-grey">
            Optional monthly plans for managing content, bookings, customers,
            and day-to-day operations from one place.{" "}
            <a href="/demo-studio" className="text-kasi-green hover:underline">
              See a live preview →
            </a>
          </p>
          <ul className="mt-12 divide-y divide-kasi-border border-y border-kasi-border">
            {kbPlans.map((p) => (
              <li
                key={p.code}
                className="grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline"
              >
                <div>
                  <p className="font-display text-xl tracking-[-0.02em]">{p.name}</p>
                  <p className="mt-2 max-w-xl text-sm text-kasi-grey">
                    {p.clientDescription}
                  </p>
                </div>
                <p
                  className={cn(
                    "font-mono text-sm sm:text-right",
                    p.billing === "CUSTOM_QUOTE"
                      ? "text-kasi-green"
                      : "text-kasi-ivory",
                  )}
                >
                  {displayItemPrice(p)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 Industries — now filters browse */}
      <section
        id="industries"
        className="scroll-mt-36 border-t border-kasi-border px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            05 · YOUR KIND OF BUSINESS
          </p>
          <h2 className="mt-4 max-w-[16ch] font-display text-3xl tracking-[-0.03em] md:text-5xl">
            Start from what you do.
          </h2>
          <p className="mt-5 max-w-xl text-base text-kasi-grey">
            Choose your sector and we jump to matching services below. Same
            prices — just easier to find.
          </p>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <li key={ind.id}>
                <Link
                  href={`/pricing?industry=${ind.id}&q=${encodeURIComponent(ind.tags[0] ?? ind.label)}#browse`}
                  className="block border border-kasi-border px-4 py-4 transition hover:border-kasi-green/50"
                >
                  <p className="font-display text-lg tracking-[-0.02em]">
                    {ind.label}
                  </p>
                  <p className="mt-1 text-sm text-kasi-grey">
                    See matching services →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 Browse — full catalog later in the journey */}
      <section
        id="browse"
        className="scroll-mt-36 border-t border-kasi-border bg-[#0c0c0c] px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            06 · ALL SERVICES
          </p>
          <h2 className="mt-4 max-w-[18ch] font-display text-3xl tracking-[-0.03em] md:text-5xl">
            Search anything we sell.
          </h2>
          <p className="mt-5 max-w-xl text-base text-kasi-grey">
            Type everyday words. Tap a service for a plain explanation and
            price. You do not need to know product codes.
          </p>
          <div className="mt-12">
            <ServiceBrowser items={browsable} />
          </div>
        </div>
      </section>

      {/* 07 Custom */}
      <section
        id="custom"
        className="scroll-mt-36 border-t border-kasi-border px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            07 · CUSTOM WORK
          </p>
          <h2 className="mt-4 max-w-[16ch] font-display text-3xl tracking-[-0.03em] md:text-5xl">
            When a standard package is not enough.
          </h2>
          <p className="mt-5 max-w-xl text-base text-kasi-grey">
            Portals, dashboards, and complex systems are scoped with you first —
            then priced in a written quotation.
          </p>
          <ul className="mt-10 divide-y divide-kasi-border border-t border-kasi-border">
            {custom.map((p) => (
              <li
                key={p.code}
                className="flex flex-wrap items-baseline justify-between gap-3 py-5"
              >
                <div>
                  <p className="text-[15px] text-kasi-ivory">{p.name}</p>
                  <p className="mt-1 text-sm text-kasi-grey">{p.clientDescription}</p>
                </div>
                <p className="font-mono text-sm text-kasi-green">Ask us</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <BuyCtas source="pricing-custom" />
          </div>

          <div id="delivery" className="mt-20 scroll-mt-36">
            <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-green">
              FASTER DELIVERY
            </p>
            <p className="mt-3 max-w-xl text-sm text-kasi-grey">
              Optional speed-ups when you need the project sooner. Final dates
              depend on capacity and are confirmed before work starts.
            </p>
            <ul className="mt-6 divide-y divide-kasi-border border-t border-kasi-border">
              {delivery.map((d) => (
                <li
                  key={d.code}
                  className="flex flex-wrap justify-between gap-3 py-4 text-sm"
                >
                  <span className="text-kasi-ivory">{d.name}</span>
                  <span className="font-mono text-kasi-green">
                    {displayItemPrice(d)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 border border-kasi-border p-6 md:p-8">
            <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-grey">
              COSTS PAID TO OTHERS
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-kasi-grey">
              Domain names, hosting, ads, and some payment fees are paid to other
              companies. We list them before you approve — they are not hidden in
              our build price.
            </p>
            <ul className="mt-6 space-y-2">
              {thirdParty.map((t) => (
                <li key={t.code} className="text-sm text-kasi-ivory/85">
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-kasi-border px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            NEXT STEP
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-[-0.04em] md:text-5xl">
            Tell us what you need to achieve.
          </h2>
          <p className="mt-6 max-w-lg text-base text-kasi-grey">
            {meta.tagline} We recommend a fit and confirm a complete price before
            work begins.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <BuyCtas source="pricing-footer" />
            <a
              href="/api/catalog/pdf"
              className="text-sm text-kasi-grey hover:text-kasi-green"
            >
              Download PDF →
            </a>
          </div>
          <p className="mt-14 font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
            {PRICE_BOOK_VERSION} · KASITECH · DAR ES SALAAM
          </p>
        </div>
      </section>
    </div>
  );
}
