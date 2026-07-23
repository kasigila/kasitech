"use client";

import Link from "next/link";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { BuyCtas } from "@/components/site/BuyCtas";

const tiers = [
  {
    name: "PRESENCE",
    need: "presence",
    forWhom:
      "Brand and company websites that explain what you do and win trust.",
    includes: [
      "Clear story and structure",
      "Mobile-first design",
      "Contact / enquiry paths",
      "Launch-ready build",
    ],
    time: "Typically 2-4 weeks",
  },
  {
    name: "COMMERCE",
    need: "sell",
    forWhom:
      "Booking, ecommerce, or payments when Instagram DMs aren't enough.",
    includes: [
      "Catalogue or booking flows",
      "M-Pesa / card where needed",
      "Order or reservation handling",
      "Admin basics you can run",
    ],
    time: "Typically 4-8 weeks",
  },
  {
    name: "CUSTOM",
    need: "system",
    forWhom: "Portals, ops tools, and systems shaped around how you work.",
    includes: [
      "Scoped after discovery",
      "Workflows, not templates",
      "Integrations as needed",
      "Phased delivery",
    ],
    time: "Scoped after a short call",
  },
];

const steps = [
  {
    n: "01",
    t: "ENQUIRE",
    d: "Send a brief via Start my project, or message us on WhatsApp directly.",
  },
  {
    n: "02",
    t: "REPLY IN 24H",
    d: "We respond on business days with next steps or clarifying questions.",
  },
  {
    n: "03",
    t: "DISCOVERY",
    d: "A short call to align on goals, scope, and timeline.",
  },
  {
    n: "04",
    t: "PROPOSAL → BUILD",
    d: "Clear scope and quote, then design and build through to launch.",
  },
];

export function HowWeEngage() {
  return (
    <section
      id="engage"
      className="border-t border-kasi-border bg-kasi-black px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          HOW ENGAGEMENTS WORK
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-4xl tracking-[-0.04em] md:text-6xl">
          CLEAR PATH.
          <br />
          NO GUESSWORK.
        </h2>
        <p className="mt-6 max-w-xl text-lg text-kasi-grey">
          Taking a limited number of new projects. After a short discovery, we
          send a clear scope and price breakdown for your project.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <Link
              key={tier.name}
              href={`/start?need=${tier.need}`}
              className="group border border-kasi-border p-6 transition hover:border-kasi-green md:p-8"
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-green">
                {tier.name}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-kasi-ivory/90">
                {tier.forWhom}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-kasi-grey">
                {tier.includes.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
              <p className="mt-8 font-mono text-[11px] tracking-[0.12em] text-kasi-ivory">
                {tier.time}
              </p>
              <p className="mt-2 text-sm text-kasi-green group-hover:underline">
                Start →
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-20 grid gap-8 border-t border-kasi-border pt-16 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-green">
                {s.n}
              </p>
              <p className="mt-3 font-display text-xl tracking-[-0.02em]">
                {s.t}
              </p>
              <p className="mt-2 text-sm text-kasi-grey">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-6">
          <BuyCtas source="how_we_engage" />
          <Link
            href="/faq"
            className="text-sm text-kasi-grey hover:text-kasi-ivory"
          >
            Website FAQ →
          </Link>
        </div>
        {hasWhatsApp() && (
          <p className="mt-6 text-[12px] text-kasi-grey">
            Prefer to skip the form?{" "}
            <a href={whatsappUrl()} className="text-kasi-green hover:underline">
              Message WhatsApp directly
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
