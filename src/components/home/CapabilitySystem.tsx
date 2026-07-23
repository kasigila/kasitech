"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { capabilityVisuals } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

const pillars = [
  {
    id: "attract",
    num: "01",
    title: "ATTRACT",
    items: ["Websites", "Digital experiences", "Brand-facing platforms"],
    examples: "AMANI · IMPACT · NURU",
    href: "/capabilities#experiences",
    image: capabilityVisuals.experiences,
  },
  {
    id: "transact",
    num: "02",
    title: "TRANSACT",
    items: ["Commerce", "Bookings", "Payments", "Ordering"],
    examples: "ZURI · SOKO · NOIR · MOTO",
    href: "/capabilities#commerce",
    image: capabilityVisuals.commerce,
  },
  {
    id: "operate",
    num: "03",
    title: "OPERATE",
    items: ["Custom software", "Internal tools", "Dashboards", "Business systems"],
    examples: "KASI FLOW · ATLAS · NEST",
    href: "/capabilities#systems",
    image: capabilityVisuals.systems,
  },
  {
    id: "decide",
    num: "04",
    title: "DECIDE",
    items: ["Data", "AI", "Analytics", "Automation"],
    examples: "KASI INTELLIGENCE",
    href: "/capabilities#intelligence",
    image: capabilityVisuals.intelligence,
  },
] as const;

export function CapabilitySystem() {
  const [active, setActive] = useState<(typeof pillars)[number]["id"]>("attract");
  const pillar = pillars.find((p) => p.id === active)!;

  return (
    <section className="bg-kasi-ivory px-5 py-24 text-kasi-black md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-black/45">
          CAPABILITY SYSTEM
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
          WE BUILD ACROSS
          <br />
          THE DIGITAL BUSINESS.
        </h2>
        <p className="mt-6 font-mono text-[12px] tracking-[0.14em] text-kasi-black/50">
          FIND · BUY · BOOK · OPERATE · DECIDE
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="relative">
            <div className="absolute bottom-0 left-[11px] top-0 w-px bg-kasi-black/15" aria-hidden />
            <div className="space-y-0">
              {pillars.map((p) => {
                const isActive = active === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onMouseEnter={() => setActive(p.id)}
                    onFocus={() => setActive(p.id)}
                    onClick={() => setActive(p.id)}
                    className={cn(
                      "relative flex w-full gap-5 py-5 text-left transition",
                      isActive ? "opacity-100" : "opacity-40 hover:opacity-70",
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border",
                        isActive
                          ? "border-kasi-black bg-kasi-black"
                          : "border-kasi-black/40 bg-kasi-ivory",
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-black/40">
                          {p.num}
                        </span>
                        <span className="font-display text-2xl tracking-[-0.03em] md:text-3xl">
                          {p.title}
                        </span>
                      </span>
                      {isActive && (
                        <span className="mt-3 block space-y-1 text-sm text-kasi-black/65">
                          {p.items.map((item) => (
                            <span key={item} className="block">
                              {item}
                            </span>
                          ))}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden border border-kasi-black/10 bg-kasi-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={pillar.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <SafeImage
                  src={pillar.image}
                  alt=""
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  fallbackLabel={pillar.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kasi-black via-kasi-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
                    {pillar.num} · {pillar.title}
                  </p>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-kasi-ivory/70">
                    {pillar.examples}
                  </p>
                  <Link
                    href={pillar.href}
                    className="mt-6 inline-block text-sm text-kasi-ivory transition hover:text-kasi-green"
                  >
                    Explore →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-14 max-w-xl text-sm text-kasi-black/55">
          KasiTech can grow with a business beyond its first website - from
          presence to transactions, operations, and decisions.
        </p>
      </div>
    </section>
  );
}
