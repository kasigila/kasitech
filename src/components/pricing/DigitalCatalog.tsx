import Link from "next/link";
import {
  FAQ_ENTRIES,
  WEB_BASELINE_INCLUDED,
  buildBundleGuides,
  buildCapabilityGuides,
  buildCareGuides,
  buildKbGuides,
  buildPackageGuides,
  formatMoney,
} from "@/commercial/catalog/buying-guide-content";
import { displayItemPrice } from "@/commercial/catalog/presentation";
import { PRICE_BOOK_VERSION } from "@/commercial/types";
import { PRICING_PDF_HREF } from "@/lib/site";
import { BuyCtas } from "@/components/site/BuyCtas";

const toc = [
  { id: "packages", label: "Website packages" },
  { id: "bundles", label: "Popular bundles" },
  { id: "capabilities", label: "Popular capabilities" },
  { id: "care", label: "Website Care" },
  { id: "business", label: "KasiTech Business" },
  { id: "faq", label: "FAQ" },
  { id: "journey", label: "Your journey" },
] as const;

export function DigitalCatalog() {
  const packages = buildPackageGuides();
  const bundles = buildBundleGuides();
  const capabilities = buildCapabilityGuides();
  const care = buildCareGuides();
  const kb = buildKbGuides();

  return (
    <div className="bg-[#F4F2EA] text-[#1A1A1A]">
      {/* Cover */}
      <section className="border-b border-[#E0DBD1] px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-[#5C5C57]">
            SERVICES &amp; PRICING
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
            Commercial buying guide
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#5C5C57] md:text-lg">
            Understand what we sell, what it costs in Tanzanian Shillings, and
            how packages, bundles, and ongoing plans fit together — before you
            approve anything.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.14em] text-[#5C5C57]">
            <span>{PRICE_BOOK_VERSION}</span>
            <span aria-hidden>·</span>
            <span>All prices in TSh</span>
            <span aria-hidden>·</span>
            <span>Dar es Salaam</span>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/start"
              className="inline-flex min-h-12 items-center border border-[#0A0A0A] bg-[#0A0A0A] px-6 py-3 text-sm tracking-wide text-[#F4F2EA] transition hover:bg-transparent hover:text-[#0A0A0A]"
            >
              Work with us →
            </Link>
            <a
              href={PRICING_PDF_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center border border-[#0A0A0A]/25 px-6 py-3 text-sm tracking-wide text-[#1A1A1A] transition hover:border-[#0A0A0A]"
            >
              Download PDF →
            </a>
          </div>
        </div>
      </section>

      {/* How to read + TOC */}
      <section className="border-b border-[#E0DBD1] px-5 py-14 md:px-8">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-display text-2xl tracking-[-0.03em] md:text-3xl">
              How to read this guide
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#5C5C57]">
              Each section starts with a quick overview, then more detail. This
              catalog is a commercial reference — not a quotation or invoice.
              Exact scope, timelines, and payment terms are confirmed in writing
              before work begins.
            </p>
          </div>
          <nav aria-label="Catalog sections">
            <p className="font-mono text-[10px] tracking-[0.16em] text-[#5C5C57]">
              SKIP TO A SECTION
            </p>
            <ul className="mt-4 space-y-2">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-[#1A1A1A] underline decoration-[#E0DBD1] underline-offset-4 transition hover:decoration-[#0A0A0A]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Website packages */}
      <section id="packages" className="scroll-mt-24 border-b border-[#E0DBD1] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-mono text-[11px] tracking-[0.16em] text-[#5C5C57]">
            01
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] md:text-4xl">
            Website packages
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5C5C57]">
            Start with the size that matches your content and ambition. Features
            already included in a package are not charged again.
          </p>

          <div className="mt-10 overflow-x-auto border border-[#E0DBD1] bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-[#E0DBD1] bg-[#F6F5F1] font-mono text-[10px] tracking-[0.14em] text-[#5C5C57]">
                <tr>
                  <th className="px-4 py-3 font-normal">PACKAGE</th>
                  <th className="px-4 py-3 font-normal">PRICE</th>
                  <th className="px-4 py-3 font-normal">TIMELINE</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((g) => (
                  <tr key={g.item.code} className="border-b border-[#E0DBD1] last:border-0">
                    <td className="px-4 py-3 font-medium">{g.item.name}</td>
                    <td className="px-4 py-3 font-mono text-[12px] text-[#6B8F00]">
                      {displayItemPrice(g.item)}
                    </td>
                    <td className="px-4 py-3 text-[#5C5C57]">
                      {g.timeline ?? "Scoped after discovery"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 border border-[#E0DBD1] bg-white p-6 md:p-8">
            <h3 className="font-display text-xl tracking-[-0.02em]">
              Website baseline
            </h3>
            <p className="mt-2 text-sm text-[#5C5C57]">
              Included in One Page through Signature.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {WEB_BASELINE_INCLUDED.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-[#1A1A1A]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#C7FF00]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-[#5C5C57]">
              Custom Platform is quoted separately. Domain registration and
              hosting are usually third-party costs.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {packages.map((g) => (
              <article
                key={g.item.code}
                className="border border-[#E0DBD1] bg-white p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl tracking-[-0.02em]">
                    {g.item.name}
                  </h3>
                  <p className="font-mono text-[12px] tracking-[0.04em] text-[#6B8F00]">
                    {displayItemPrice(g.item)}
                  </p>
                </div>
                {g.timeline ? (
                  <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-[#5C5C57]">
                    TYPICAL DELIVERY · {g.timeline.toUpperCase()}
                  </p>
                ) : null}
                <p className="mt-4 text-sm leading-relaxed text-[#5C5C57]">
                  {g.valueProp}
                </p>
                {g.included.length > 0 ? (
                  <ul className="mt-5 space-y-1.5">
                    {g.included.map((item) => (
                      <li key={item} className="flex gap-2 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#C7FF00]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-5 text-sm">
                  <span className="font-medium">Best for:</span>{" "}
                  <span className="text-[#5C5C57]">{g.idealFor}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bundles */}
      <section id="bundles" className="scroll-mt-24 border-b border-[#E0DBD1] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-mono text-[11px] tracking-[0.16em] text-[#5C5C57]">
            02
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] md:text-4xl">
            Popular bundles
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5C5C57]">
            Common setups priced together — website plus the tools people
            usually need for that kind of business.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {bundles.map((b) => (
              <article
                key={b.code}
                className="border border-[#E0DBD1] bg-white p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl tracking-[-0.02em]">
                    {b.name}
                  </h3>
                  <p className="font-mono text-[12px] tracking-[0.04em] text-[#6B8F00]">
                    {b.bundlePriceLabel}
                  </p>
                </div>
                {b.showSavings && b.savingsTsh ? (
                  <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-[#6B8F00]">
                    YOU SAVE {formatMoney(b.savingsTsh).toUpperCase()}
                  </p>
                ) : null}
                <p className="mt-4 text-sm leading-relaxed text-[#5C5C57]">
                  {b.valueProp}
                </p>
                <p className="mt-5 font-mono text-[10px] tracking-[0.14em] text-[#5C5C57]">
                  WHAT&apos;S INCLUDED
                </p>
                <ul className="mt-3 space-y-1.5">
                  {b.components.map((c) => (
                    <li
                      key={c.code}
                      className="flex flex-wrap items-baseline justify-between gap-2 text-sm"
                    >
                      <span>{c.name}</span>
                      <span className="font-mono text-[11px] text-[#5C5C57]">
                        {c.priceLabel}
                      </span>
                    </li>
                  ))}
                  {b.entitlements.map((e) => (
                    <li key={e} className="text-sm text-[#5C5C57]">
                      {e} · included
                    </li>
                  ))}
                </ul>
                {b.industryHint ? (
                  <p className="mt-5 text-sm text-[#5C5C57]">
                    <span className="font-medium text-[#1A1A1A]">Industry:</span>{" "}
                    {b.industryHint}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="scroll-mt-24 border-b border-[#E0DBD1] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-mono text-[11px] tracking-[0.16em] text-[#5C5C57]">
            03
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] md:text-4xl">
            Popular capabilities
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5C5C57]">
            Add-ons and features clients ask for most — booking, payments,
            commerce, local presence, SEO, and languages.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <article
                key={c.item.code}
                className="border border-[#E0DBD1] bg-white p-5"
              >
                <h3 className="font-display text-xl tracking-[-0.02em]">
                  {c.item.name}
                </h3>
                <p className="mt-2 font-mono text-[12px] text-[#6B8F00]">
                  {displayItemPrice(c.item)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#5C5C57]">
                  {c.valueProp}
                </p>
                <p className="mt-4 text-sm">
                  <span className="font-medium">Best for:</span>{" "}
                  <span className="text-[#5C5C57]">{c.idealFor}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Care */}
      <section id="care" className="scroll-mt-24 border-b border-[#E0DBD1] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-mono text-[11px] tracking-[0.16em] text-[#5C5C57]">
            04
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] md:text-4xl">
            Website Care
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5C5C57]">
            Optional ongoing attention after launch. You can launch without it —
            updates and fixes are then quoted when needed. Exact hours and
            response times are confirmed on your quotation.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {care.map((p) => (
              <article
                key={p.item.code}
                className="border border-[#E0DBD1] bg-white p-6"
              >
                <h3 className="font-display text-xl tracking-[-0.02em]">
                  {p.item.name}
                </h3>
                <p className="mt-2 font-mono text-[12px] text-[#6B8F00]">
                  {displayItemPrice(p.item)}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#5C5C57]">
                  {p.valueProp}
                </p>
                <p className="mt-4 text-sm">
                  <span className="font-medium">Best for:</span>{" "}
                  <span className="text-[#5C5C57]">{p.whoFor}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KasiTech Business */}
      <section id="business" className="scroll-mt-24 border-b border-[#E0DBD1] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-mono text-[11px] tracking-[0.16em] text-[#5C5C57]">
            05
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] md:text-4xl">
            KasiTech Business
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5C5C57]">
            Optional monthly plans for managing content, bookings, customers, and
            day-to-day operations from one place after you launch.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kb.map((p) => (
              <article
                key={p.item.code}
                className="border border-[#E0DBD1] bg-white p-6"
              >
                <h3 className="font-display text-xl tracking-[-0.02em]">
                  {p.item.name}
                </h3>
                <p className="mt-2 font-mono text-[12px] text-[#6B8F00]">
                  {displayItemPrice(p.item)}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#5C5C57]">
                  {p.valueProp}
                </p>
                <p className="mt-4 text-sm">
                  <span className="font-medium">Best for:</span>{" "}
                  <span className="text-[#5C5C57]">{p.whoFor}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-b border-[#E0DBD1] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-mono text-[11px] tracking-[0.16em] text-[#5C5C57]">
            06
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] md:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-10 divide-y divide-[#E0DBD1] border-y border-[#E0DBD1]">
            {FAQ_ENTRIES.map((entry) => (
              <div key={entry.q} className="py-6">
                <h3 className="text-base font-medium">{entry.q}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#5C5C57]">
                  {entry.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="scroll-mt-24 bg-[#0A0A0A] px-5 py-16 text-[#F4F2EA] md:px-8 md:py-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-mono text-[11px] tracking-[0.16em] text-[#858580]">
            07
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] md:text-4xl">
            Your journey with KasiTech
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["01", "Choose", "Pick a package, bundle, or tell us your goal."],
              ["02", "Configure", "We shape scope around how your business works."],
              ["03", "Approve", "Written quotation before anything starts."],
              ["04", "Build", "Design and engineering against the agreed scope."],
              ["05", "Launch", "Go live with QA, revisions, and handover."],
              ["06", "Grow", "Optional Care, KasiTech Business, and new features."],
            ].map(([num, title, body]) => (
              <li key={num}>
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#C7FF00]">
                  {num}
                </p>
                <p className="mt-2 font-display text-2xl tracking-[-0.02em]">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#858580]">
                  {body}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-12 max-w-xl text-sm text-[#858580]">
            This catalog is a commercial reference — not a quotation or invoice.
            Nothing starts until you approve a written quotation.
          </p>

          <div className="mt-10">
            <BuyCtas source="digital_catalog" />
          </div>

          <p className="mt-10 font-mono text-[10px] tracking-[0.16em] text-[#858580]">
            {PRICE_BOOK_VERSION} · KASITECH · DAR ES SALAAM
          </p>
        </div>
      </section>
    </div>
  );
}
