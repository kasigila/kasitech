"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { capabilityDemoScreens } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

const caps = [
  {
    id: "experiences",
    num: "01",
    title: "DIGITAL EXPERIENCES",
    short: "Digital Experiences",
    body: "Premium websites and digital experiences designed around discovery, trust and conversion.",
    keywords: "Websites / Platforms / Portals",
    image: capabilityDemoScreens.amani,
    href: "/capabilities#experiences",
  },
  {
    id: "commerce",
    num: "02",
    title: "COMMERCE",
    short: "Commerce",
    body: "Technology that helps businesses sell, book and transact.",
    keywords: "Commerce / Reservations / Payments",
    image: capabilityDemoScreens.soko,
    href: "/capabilities#commerce",
  },
  {
    id: "systems",
    num: "03",
    title: "BUSINESS SYSTEMS",
    short: "Business Systems",
    body: "Technology connecting customer experience with everyday operations.",
    keywords: "Dashboards / CRM / Automation / Internal tools",
    image: capabilityDemoScreens["kasi-flow"],
    href: "/capabilities#systems",
  },
  {
    id: "intelligence",
    num: "04",
    title: "INTELLIGENCE",
    short: "Intelligence",
    body: "Data and AI systems that turn information into useful decisions.",
    keywords: "Analytics / AI / Decision systems",
    image: capabilityDemoScreens["kasi-intelligence"],
    href: "/capabilities#intelligence",
  },
] as const;

type CapId = (typeof caps)[number]["id"];

export function CompanyBuild() {
  const [active, setActive] = useState<CapId>("experiences");
  const current = caps.find((c) => c.id === active)!;

  return (
    <section
      id="build"
      className="border-t border-kasi-border bg-kasi-black px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          WHAT WE BUILD
        </p>
        <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[0.98] tracking-[-0.04em]">
          FROM FIRST CLICK
          <br />
          TO DAILY OPERATIONS.
        </h2>

        {/* Desktop explorer */}
        <div className="mt-14 hidden gap-10 lg:grid lg:grid-cols-[0.35fr_0.65fr] lg:gap-14">
          <div className="space-y-1">
            {caps.map((c) => {
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onMouseEnter={() => setActive(c.id)}
                  onFocus={() => setActive(c.id)}
                  onClick={() => setActive(c.id)}
                  className={cn(
                    "flex min-h-12 w-full items-baseline gap-4 border-b border-kasi-border py-4 text-left transition",
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-75",
                  )}
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
                    {c.num}
                  </span>
                  <span
                    className={cn(
                      "font-display text-xl tracking-[-0.03em] md:text-2xl",
                      isActive && "text-kasi-green",
                    )}
                  >
                    {c.short}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[420px] overflow-hidden border border-kasi-border bg-[#111]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.35 }}
              >
                <SafeImage
                  src={current.image}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  fallbackLabel={current.short}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kasi-black via-kasi-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
                    {current.num} · {current.title}
                  </p>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-kasi-ivory/90">
                    {current.body}
                  </p>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-kasi-grey">
                    {current.keywords}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: horizontal snap cards (no accordion controls) */}
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 lg:hidden">
          {caps.map((c) => (
            <article
              key={c.id}
              className="w-[82%] shrink-0 snap-start overflow-hidden border border-kasi-border bg-[#111]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <SafeImage
                  src={c.image}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="82vw"
                  fallbackLabel={c.short}
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
                  {c.num} · {c.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-kasi-ivory/85">
                  {c.body}
                </p>
                <p className="mt-3 font-mono text-[10px] tracking-[0.12em] text-kasi-grey">
                  {c.keywords}
                </p>
              </div>
            </article>
          ))}
        </div>

        <Link
          href="/capabilities"
          className="mt-10 inline-block text-sm text-kasi-green transition hover:underline"
        >
          Explore all capabilities →
        </Link>
      </div>
    </section>
  );
}
