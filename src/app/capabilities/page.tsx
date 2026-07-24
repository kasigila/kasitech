import type { Metadata } from "next";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { BuyCtas } from "@/components/site/BuyCtas";
import { capabilityDemoScreens } from "@/data/images";
import { getProject } from "@/data/projects";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "What KasiTech builds across the digital business: attract, transact, operate, decide. Each paired with a concept you can try.",
};

const caps = [
  {
    id: "experiences",
    num: "01",
    pillar: "ATTRACT",
    group: "Websites & digital experiences",
    intro: "Websites people remember and understand.",
    support:
      "For brands and institutions that need credibility online: clear story, strong mobile, a real path to enquiry.",
    screenshot: capabilityDemoScreens.amani,
    exampleSlug: "amani",
    previewLabel: "Brand site",
    outcomes: [
      "Story that earns trust and enquiry",
      "Mobile-first, fast enough to feel premium",
      "CMS your team can update without us",
      "Structured for search without clutter",
    ],
  },
  {
    id: "commerce",
    num: "02",
    pillar: "TRANSACT",
    group: "Commerce & bookings",
    intro: "Sell, book, and get paid without extra friction.",
    support:
      "For hotels, restaurants, shops, events, and services stuck in DMs: missed bookings and weak conversion.",
    screenshot: capabilityDemoScreens.soko,
    exampleSlug: "soko",
    previewLabel: "Checkout and booking",
    outcomes: [
      "Catalogues and bookings that convert",
      "M-Pesa, cards, and local payment reality",
      "Ticketing with proof of entry",
      "Cart to fulfilment in one flow",
    ],
  },
  {
    id: "systems",
    num: "03",
    pillar: "OPERATE",
    group: "Software & business systems",
    intro: "Software built around how you actually operate.",
    support:
      "For operators drowning in spreadsheets, WhatsApp threads, and disconnected tools.",
    screenshot: capabilityDemoScreens["kasi-flow"],
    exampleSlug: "kasi-flow",
    previewLabel: "Ops dashboard",
    outcomes: [
      "Custom apps for your workflows, not templates",
      "Dashboards that show the business at a glance",
      "CRM, inventory, and staff portals",
      "One source of truth instead of a maze",
    ],
  },
  {
    id: "intelligence",
    num: "04",
    pillar: "DECIDE",
    group: "Data, AI & automation",
    intro: "Signal and automation that cut manual work.",
    support:
      "For teams ready to decide faster, without vanity metrics or unapproved AI actions.",
    screenshot: capabilityDemoScreens["kasi-intelligence"],
    exampleSlug: "kasi-intelligence",
    previewLabel: "Ask and automate",
    outcomes: [
      "Answers with evidence, not guesswork",
      "Automation with human approval first",
      "Clean signals instead of vanity charts",
      "Integrations with tools you already use",
    ],
  },
] as const;

export default function CapabilitiesPage() {
  return (
    <div className="pt-28">
      <section className="px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            CAPABILITIES
          </p>
          <h1 className="mt-6 max-w-[14ch] font-display text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
            WHAT WE BUILD.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-kasi-grey">
            Four compositions across the digital business, each paired with a
            concept you can try.
          </p>
          <nav
            aria-label="Capability pillars"
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.16em] text-kasi-grey"
          >
            {caps.map((c, i) => (
              <span key={c.id} className="inline-flex items-center gap-6">
                <Link
                  href={`#${c.id}`}
                  className="transition hover:text-kasi-green"
                >
                  {c.pillar}
                </Link>
                {i < caps.length - 1 && (
                  <span className="hidden text-kasi-border sm:inline" aria-hidden>
                    ·
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </section>

      <div>
        {caps.map((c, i) => {
          const example = getProject(c.exampleSlug);
          const flip = i % 2 === 1;

          return (
            <section
              key={c.id}
              id={c.id}
              className={cn(
                "scroll-mt-28 border-t border-kasi-border px-5 py-20 md:px-8 md:py-28",
                i % 2 === 1 && "bg-[#0c0c0c]",
              )}
            >
              <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div className={cn(flip && "lg:order-2")}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-green">
                      {c.num}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
                      {c.pillar}
                    </span>
                  </div>
                  <p className="mt-5 font-mono text-[11px] tracking-[0.14em] text-kasi-ivory/45">
                    {c.group.toUpperCase()}
                  </p>
                  <h2 className="mt-4 max-w-xl font-display text-3xl leading-[1.05] tracking-[-0.03em] md:text-5xl">
                    {c.intro}
                  </h2>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-kasi-grey">
                    {c.support}
                  </p>
                  <ul className="mt-10 space-y-3">
                    {c.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex gap-3 text-[15px] leading-snug text-kasi-ivory/90"
                      >
                        <span
                          className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-kasi-green"
                          aria-hidden
                        />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                  {example && (
                    <Link
                      href={example.demoPath}
                      className="mt-10 inline-block text-sm text-kasi-green transition hover:underline"
                    >
                      Try {example.name} →
                    </Link>
                  )}
                </div>

                <div className={cn(flip && "lg:order-1")}>
                  <div className="overflow-hidden border border-kasi-border bg-kasi-black">
                    <div className="flex items-center gap-2 border-b border-kasi-border px-4 py-3">
                      <span className="h-2 w-2 bg-kasi-border" aria-hidden />
                      <span className="h-2 w-2 bg-kasi-border" aria-hidden />
                      <span className="h-2 w-2 bg-kasi-border" aria-hidden />
                      <span className="ml-3 font-mono text-[10px] tracking-[0.14em] text-kasi-grey">
                        LIVE DEMO · {example?.name ?? c.previewLabel}
                      </span>
                    </div>
                    <div className="relative aspect-[16/10] bg-[#111]">
                      <SafeImage
                        src={c.screenshot}
                        alt={`${example?.name ?? c.previewLabel} demo screenshot`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        fallbackLabel={c.previewLabel}
                        priority={i === 0}
                      />
                    </div>
                    {example && (
                      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-kasi-border bg-[#0d0d0d] px-4 py-3 text-sm">
                        <div>
                          <p className="font-display text-lg tracking-[-0.02em]">
                            {example.name}
                          </p>
                          <p className="text-xs text-kasi-grey">{c.previewLabel}</p>
                        </div>
                        <div className="flex flex-wrap gap-5">
                          <Link
                            href={example.demoPath}
                            className="text-kasi-green hover:underline"
                          >
                            Try demo ↗
                          </Link>
                          <Link
                            href={example.caseStudyPath}
                            className="text-kasi-grey transition hover:text-kasi-ivory"
                          >
                            How it works →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="border-t border-kasi-border px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            NEXT STEP
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-5xl">
            CLEAR PATH.
            <br />
            NO GUESSWORK.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-kasi-grey">
            Tell us what you need to attract, transact, operate, or decide. We
            reply within 24 hours on business days.
          </p>
          <div className="mt-10">
            <BuyCtas source="capabilities" />
          </div>
        </div>
      </section>
    </div>
  );
}
