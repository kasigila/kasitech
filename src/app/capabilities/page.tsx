import type { Metadata } from "next";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { BuyCtas } from "@/components/site/BuyCtas";
import { capabilityVisuals } from "@/data/images";
import { getProject } from "@/data/projects";

export const metadata: Metadata = { title: "Capabilities" };

const caps = [
  {
    id: "experiences",
    title: "EXPERIENCES",
    intro: "Websites people remember and understand.",
    visual: capabilityVisuals.experiences,
    exampleSlug: "amani",
    previewLabel: "Brand site",
    items: [
      { name: "Websites", note: "Clear story, fast load, mobile-first" },
      { name: "UX", note: "Paths that lead to action" },
      { name: "Development", note: "Production-ready frontends" },
      { name: "CMS", note: "Teams can update without us" },
      { name: "Responsive design", note: "Designed for thumbs, not just desktops" },
      { name: "Performance", note: "Speed is part of the brand" },
      { name: "SEO", note: "Structured for search without clutter" },
    ],
  },
  {
    id: "commerce",
    title: "COMMERCE",
    intro: "Selling, booking, and payments without unnecessary friction.",
    visual: capabilityVisuals.commerce,
    exampleSlug: "soko",
    previewLabel: "Checkout + booking",
    items: [
      { name: "Ecommerce", note: "Catalogues that convert" },
      { name: "Reservations", note: "Tables, rooms, appointments" },
      { name: "Booking", note: "Dates, availability, confirmation" },
      { name: "Ticketing", note: "Events with proof of entry" },
      { name: "Payments", note: "M-Pesa, cards, local reality" },
      { name: "Orders", note: "From cart to fulfilment" },
    ],
  },
  {
    id: "systems",
    title: "SYSTEMS",
    intro: "Software built around how your business actually operates.",
    visual: capabilityVisuals.systems,
    exampleSlug: "kasi-flow",
    previewLabel: "Ops dashboard",
    items: [
      { name: "Custom applications", note: "Not templates: your workflows" },
      { name: "Dashboards", note: "See the business at a glance" },
      { name: "Portals", note: "Customers, and staff, separate views" },
      { name: "CRM", note: "People, history, next actions" },
      { name: "Inventory", note: "Stock that stays honest" },
      { name: "Internal systems", note: "Replace the spreadsheet maze" },
    ],
  },
  {
    id: "intelligence",
    title: "INTELLIGENCE",
    intro: "Data, AI, and automation that reduce manual work.",
    visual: capabilityVisuals.intelligence,
    exampleSlug: "kasi-intelligence",
    previewLabel: "Ask + automate",
    items: [
      { name: "Analytics", note: "What moved, and why" },
      { name: "Data", note: "Clean signals, not vanity charts" },
      { name: "AI", note: "Answers with evidence" },
      { name: "Automation", note: "Human approval before action" },
      { name: "Integrations", note: "Connect the tools you already use" },
      { name: "Workflows", note: "Repeatable processes that stick" },
    ],
  },
];

export default function CapabilitiesPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="font-display text-5xl tracking-[-0.04em] md:text-7xl">
          WHAT WE DO.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-kasi-grey">
          Four categories. Each one pairs the craft with an interactive concept
          demo.
        </p>

        <div className="mt-20 space-y-28">
          {caps.map((c) => {
            const example = getProject(c.exampleSlug);
            return (
              <section key={c.id} id={c.id} className="scroll-mt-28">
                <div className="grid items-start gap-10 lg:grid-cols-2">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
                      {c.title}
                    </p>
                    <h2 className="mt-4 max-w-xl font-display text-3xl tracking-[-0.03em] md:text-5xl">
                      {c.intro}
                    </h2>
                    <ul className="mt-10 space-y-4">
                      {c.items.map((item) => (
                        <li
                          key={item.name}
                          className="border-b border-kasi-border pb-4"
                        >
                          <p className="text-lg text-kasi-ivory">{item.name}</p>
                          <p className="mt-1 text-sm text-kasi-grey">
                            {item.note}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:sticky lg:top-28">
                    <div className="overflow-hidden border border-kasi-border">
                      <div className="relative aspect-[4/3]">
                        <SafeImage
                          src={c.visual}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          fallbackLabel={c.previewLabel}
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                          <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
                            CONCEPT DEMO
                          </p>
                          <p className="mt-2 font-display text-2xl">
                            {example?.name}
                          </p>
                          <p className="mt-1 text-sm text-kasi-grey">
                            {c.previewLabel}
                          </p>
                        </div>
                      </div>
                      {example && (
                        <div className="flex gap-4 border-t border-kasi-border bg-[#0d0d0d] p-4 text-sm">
                          <Link
                            href={example.demoPath}
                            className="text-kasi-green hover:underline"
                          >
                            Try demo ↗
                          </Link>
                          <Link
                            href={example.caseStudyPath}
                            className="text-kasi-grey hover:text-kasi-ivory"
                          >
                            How it works →
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-20">
          <BuyCtas source="capabilities" />
        </div>
      </div>
    </div>
  );
}
