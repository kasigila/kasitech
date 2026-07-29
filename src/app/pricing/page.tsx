import type { Metadata } from "next";
import Link from "next/link";
import { BuyCtas } from "@/components/site/BuyCtas";
import { PackageComparison } from "@/components/pricing/PackageComparison";
import { ServiceBrowser } from "@/components/pricing/ServiceBrowser";
import { BundlesSection } from "@/components/pricing/BundlesSection";
import { CareComparison } from "@/components/pricing/CareComparison";
import { PricingStickyNav } from "@/components/pricing/PricingStickyNav";
import { loadPriceBook } from "@/commercial/price-book/load";
import {
  INDUSTRIES,
  PACKAGE_POSITIONING,
  catalogMeta,
  displayItemPrice,
  billingLabel,
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
    "KasiTech services and pricing catalog powered by KT-PB-2026.1 — websites, features, bundles, care, and custom solutions in Tanzanian Shillings.",
  openGraph: {
    title: "KasiTech Services & Pricing · KT-PB-2026.1",
    description:
      "Clear scope. Clear pricing. Built around your business.",
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
    // Always surface baseline entitlement names for packages that have them
    if (!inclusions[p.code].length && PACKAGE_POSITIONING[p.code]) {
      inclusions[p.code] = ["Website baseline inclusions (see package scope)"];
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
            SERVICES &amp; PRICING · {PRICE_BOOK_VERSION}
          </p>
          <h1 className="mt-6 max-w-[11ch] font-display text-5xl leading-[0.92] tracking-[-0.045em] md:text-7xl">
            KASITECH
          </h1>
          <p className="mt-4 max-w-[20ch] font-display text-2xl tracking-[-0.03em] text-kasi-ivory/90 md:text-3xl">
            From a focused site to a full digital platform.
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-kasi-grey">
            {meta.tagline} {meta.currencyNote}
          </p>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href="#websites" className="text-kasi-green hover:underline">
              Explore website packages →
            </a>
            <a href="#browse" className="text-kasi-grey hover:text-kasi-ivory">
              Browse all services →
            </a>
            <a href="#bundles" className="text-kasi-grey hover:text-kasi-ivory">
              View bundles →
            </a>
            <a href="#industries" className="text-kasi-grey hover:text-kasi-ivory">
              Find by industry →
            </a>
            <a href="/demo-studio" className="text-kasi-green hover:underline">
              Build my project →
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <BuyCtas source="pricing" />
            <a
              href="/api/catalog/pdf"
              className="text-sm text-kasi-grey transition hover:text-kasi-green"
            >
              Download catalog PDF →
            </a>
          </div>
        </div>
      </section>

      <div className="px-5 md:px-8">
        <PricingStickyNav />
      </div>

      {/* Packages */}
      <section
        id="websites"
        className="scroll-mt-36 border-t border-kasi-border px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            01 · WEBSITE PACKAGES
          </p>
          <h2 className="mt-4 max-w-[16ch] font-display text-3xl tracking-[-0.03em] md:text-5xl">
            Choose the foundation that fits.
          </h2>
          <p className="mt-5 max-w-xl text-base text-kasi-grey">
            Exact prices and inclusions from {PRICE_BOOK_VERSION}. Features
            already in your package are not charged again.
          </p>
          <div className="mt-12">
            <PackageComparison packages={packages} inclusions={inclusions} />
          </div>
        </div>
      </section>

      {/* Browse */}
      <section
        id="browse"
        className="scroll-mt-36 border-t border-kasi-border bg-[#0c0c0c] px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            02 · ALL SERVICES
          </p>
          <h2 className="mt-4 max-w-[18ch] font-display text-3xl tracking-[-0.03em] md:text-5xl">
            Every approved service. Searchable.
          </h2>
          <p className="mt-5 max-w-xl text-base text-kasi-grey">
            Filter by category and billing. Open any row for plain-language
            detail. Billing labels are intentional — monthly is never shown as
            one-time.
          </p>
          <div className="mt-12">
            <ServiceBrowser items={browsable} />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section
        id="industries"
        className="scroll-mt-36 border-t border-kasi-border px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            03 · INDUSTRY SOLUTIONS
          </p>
          <h2 className="mt-4 max-w-[16ch] font-display text-3xl tracking-[-0.03em] md:text-5xl">
            Start from your sector.
          </h2>
          <p className="mt-5 max-w-xl text-base text-kasi-grey">
            Industry labels surface the same canonical services — never a second
            price for the same capability.
          </p>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <li key={ind.id}>
                <a
                  href={`#browse`}
                  className="block border border-kasi-border px-4 py-4 transition hover:border-kasi-green/50"
                >
                  <p className="font-display text-lg tracking-[-0.02em]">
                    {ind.label}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-kasi-grey">
                    SEARCH ABOVE · {ind.tags[0]?.toUpperCase()}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bundles */}
      <section
        id="bundles"
        className="scroll-mt-36 border-t border-kasi-border bg-[#0c0c0c] px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            04 · BUNDLES
          </p>
          <h2 className="mt-4 max-w-[16ch] font-display text-3xl tracking-[-0.03em] md:text-5xl">
            Fixed scope. Honest savings.
          </h2>
          <p className="mt-5 max-w-xl text-base text-kasi-grey">
            Savings appear only when the commercial engine can calculate them
            from approved standalone prices.
          </p>
          <div className="mt-12">
            <BundlesSection bundles={bundles} />
          </div>
        </div>
      </section>

      {/* Care */}
      <section
        id="care"
        className="scroll-mt-36 border-t border-kasi-border px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            05 · CARE &amp; MAINTENANCE
          </p>
          <h2 className="mt-4 max-w-[16ch] font-display text-3xl tracking-[-0.03em] md:text-5xl">
            Keep it cared for — or not.
          </h2>
          <p className="mt-5 max-w-xl text-base text-kasi-grey">
            Compare approved care plans. We do not invent hours or SLAs that are
            not in the Price Book.
          </p>
          <div className="mt-12">
            <CareComparison plans={carePlans} />
          </div>
        </div>
      </section>

      {/* KB */}
      <section
        id="kasitech-business"
        className="scroll-mt-36 border-t border-kasi-border bg-[#0c0c0c] px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            06 · KASITECH BUSINESS
          </p>
          <h2 className="mt-4 max-w-[18ch] font-display text-3xl tracking-[-0.03em] md:text-5xl">
            Operate after you launch.
          </h2>
          <p className="mt-5 max-w-xl text-base text-kasi-grey">
            Optional plans that extend a website into tools for running the
            business. Only explicitly defined modules are listed.{" "}
            <a href="/demo-studio" className="text-kasi-green hover:underline">
              Preview in Demo Studio →
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
                  <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-kasi-grey">
                    {billingLabel(p.billing)}
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

      {/* Custom + delivery + third party */}
      <section
        id="custom"
        className="scroll-mt-36 border-t border-kasi-border px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            07 · CUSTOM SOLUTIONS
          </p>
          <h2 className="mt-4 max-w-[16ch] font-display text-3xl tracking-[-0.03em] md:text-5xl">
            When the catalog ends, scoping begins.
          </h2>
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
                <p className="font-mono text-sm text-kasi-green">Custom Quote</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <BuyCtas source="pricing-custom" />
          </div>

          <div id="delivery" className="mt-20 scroll-mt-36">
            <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-green">
              EXPEDITED DELIVERY
            </p>
            <p className="mt-3 max-w-xl text-sm text-kasi-grey">
              Relative acceleration from the approved catalog. Precise completion
              dates require timeline rules in a later phase — subject to capacity
              confirmation.
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
              THIRD-PARTY COSTS
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-kasi-grey">
              Domains, hosting, ad spend, and provider fees are not hidden
              KasiTech margins. Applicable charges are disclosed before approval.
            </p>
            <ul className="mt-6 space-y-2">
              {thirdParty.map((t) => (
                <li key={t.code} className="text-sm text-kasi-ivory/85">
                  {t.name}{" "}
                  <span className="font-mono text-[10px] text-kasi-grey">
                    · THIRD-PARTY
                  </span>
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
            We recommend the right package and confirm a complete price before
            work begins. The formal quotation — not this catalog — is the
            approved scope.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <BuyCtas source="pricing-footer" />
            <a
              href="/api/catalog/pdf"
              className="text-sm text-kasi-grey hover:text-kasi-green"
            >
              Download PDF →
            </a>
            <Link
              href="/capabilities"
              className="text-sm text-kasi-grey hover:text-kasi-ivory"
            >
              Capabilities →
            </Link>
          </div>
          <p className="mt-14 font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
            PRICING {PRICE_BOOK_VERSION} · KASITECH · DAR ES SALAAM
          </p>
        </div>
      </section>
    </div>
  );
}
