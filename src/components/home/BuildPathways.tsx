"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolioRoutes, getProject } from "@/data/projects";
import { getProjectBlurb } from "@/data/project-blurbs";
import { projectCovers } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const capabilityHints: Record<
  (typeof portfolioRoutes)[number]["id"],
  { caps: string[]; cta: string; href: string }
> = {
  website: {
    caps: ["Brand sites", "UX", "CMS", "Performance", "SEO"],
    cta: "EXPLORE WEBSITE SOLUTIONS →",
    href: "/capabilities#experiences",
  },
  sell: {
    caps: [
      "Bookings",
      "Payments",
      "E-commerce",
      "Reservations",
      "Ordering",
      "Customer journeys",
    ],
    cta: "EXPLORE COMMERCE SOLUTIONS →",
    href: "/capabilities#commerce",
  },
  platform: {
    caps: ["Portals", "Dashboards", "CRM", "Inventory", "Custom software"],
    cta: "EXPLORE SYSTEMS →",
    href: "/capabilities#systems",
  },
  automation: {
    caps: ["Analytics", "AI", "Workflows", "Integrations", "Automation"],
    cta: "EXPLORE INTELLIGENCE →",
    href: "/capabilities#intelligence",
  },
};

const startNeed: Record<(typeof portfolioRoutes)[number]["id"], string> = {
  website: "presence",
  sell: "sell",
  platform: "system",
  automation: "automation",
};

export function BuildPathways() {
  const [active, setActive] = useState<(typeof portfolioRoutes)[number]["id"]>(
    "sell",
  );
  const hint = capabilityHints[active];
  const route = portfolioRoutes.find((r) => r.id === active)!;

  return (
    <section className="bg-kasi-black px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          DISCOVER
        </p>
        <h2 className="mt-4 max-w-4xl font-display text-4xl leading-[1.02] tracking-[-0.04em] md:text-6xl lg:text-7xl">
          WHAT DO YOU
          <br />
          WANT TO BUILD?
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="divide-y divide-kasi-border border-y border-kasi-border">
            {portfolioRoutes.map((r) => {
              const isActive = active === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setActive(r.id);
                    track("portfolio_route", { id: r.id });
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 py-6 text-left transition",
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-70",
                  )}
                  aria-pressed={isActive}
                >
                  <span className="font-display text-xl tracking-[-0.03em] md:text-3xl">
                    {r.title}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[11px] tracking-[0.12em]",
                      isActive ? "text-kasi-green" : "text-kasi-grey",
                    )}
                  >
                    {isActive ? "●" : "○"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="min-h-[280px] border border-kasi-border bg-[#0d0d0d] p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-wrap gap-2">
                  {hint.caps.map((c) => (
                    <span
                      key={c}
                      className="border border-kasi-border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-kasi-ivory/80"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <p className="mt-8 font-mono text-[10px] tracking-[0.16em] text-kasi-grey">
                  EXAMPLE DEMOS YOU CAN TRY
                </p>
                <ul className="mt-4 space-y-3">
                  {route.projectSlugs.slice(0, 4).map((slug) => {
                    const p = getProject(slug)!;
                    return (
                      <li key={slug}>
                        <Link
                          href={p.demoPath}
                          className="group flex gap-3 border border-kasi-border p-3 transition hover:border-kasi-green"
                        >
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-kasi-border">
                            <SafeImage
                              src={projectCovers[slug] ?? projectCovers.zuri}
                              alt=""
                              fill
                              className="object-cover object-top"
                              sizes="56px"
                              fallbackLabel={p.number}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                              <span className="font-display text-lg tracking-[-0.02em]">
                                {p.name}
                              </span>
                              <span className="font-mono text-[10px] tracking-[0.12em] text-kasi-grey">
                                {p.industry}
                              </span>
                            </div>
                            <p className="mt-1 text-sm leading-snug text-kasi-grey">
                              {getProjectBlurb(slug, p.description)}
                            </p>
                            <p className="mt-2 text-[12px] text-kasi-ivory/55 transition group-hover:text-kasi-green">
                              Try this demo ↗
                            </p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Link
                    href={hint.href}
                    className="text-sm tracking-wide text-kasi-green hover:underline"
                  >
                    {hint.cta}
                  </Link>
                  <Link
                    href={`/start?need=${startNeed[active]}`}
                    className="text-sm text-kasi-grey transition hover:text-kasi-ivory"
                  >
                    Start a project →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
