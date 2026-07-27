"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { capabilityVisuals } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

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
    items: [
      "Custom software",
      "Internal tools",
      "Dashboards",
      "Business systems",
    ],
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

type PillarId = (typeof pillars)[number]["id"];

export function CapabilitySystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<PillarId>("attract");
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const pillar = pillars.find((p) => p.id === active)!;

  useEffect(() => {
    if (paused || prefersReducedMotion) return;

    const id = setInterval(() => {
      setActive((current) => {
        const i = pillars.findIndex((p) => p.id === current);
        return pillars[(i + 1) % pillars.length].id;
      });
    }, 2400);
    return () => clearInterval(id);
  }, [paused, prefersReducedMotion]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Scrolled past / away from the section: resume auto rotation
        if (!entry.isIntersecting) {
          setPaused(false);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function preview(id: PillarId) {
    setActive(id);
  }

  function tap(id: PillarId) {
    setActive(id);
    setPaused(true);
  }

  return (
    <section
      ref={sectionRef}
      className="bg-kasi-ivory px-5 py-24 text-kasi-black md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-black/70">
              CAPABILITY SYSTEM
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
              WE BUILD ACROSS
              <br />
              THE DIGITAL BUSINESS.
            </h2>
            <p className="mt-6 font-mono text-[12px] tracking-[0.14em] text-kasi-black/70">
              FIND · BUY · BOOK · OPERATE · DECIDE
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="min-h-11 border border-kasi-black/15 px-4 font-mono text-[10px] tracking-[0.14em] text-kasi-black/70 transition hover:border-kasi-black hover:text-kasi-black"
            aria-pressed={paused}
          >
            {prefersReducedMotion
              ? "MOTION OFF"
              : paused
                ? "PLAY ROTATION"
                : "PAUSE ROTATION"}
          </button>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
          <div className="relative">
            <div
              className="absolute bottom-[9.25rem] left-[11px] top-0 w-px bg-kasi-black/15 md:bottom-40"
              aria-hidden
            />
            <div className="space-y-0">
              {pillars.map((p) => {
                const isActive = active === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onMouseEnter={() => preview(p.id)}
                    onFocus={() => preview(p.id)}
                    onClick={() => tap(p.id)}
                    className={cn(
                      "relative flex min-h-[3.75rem] w-full items-baseline gap-5 py-4 text-left transition md:min-h-16 md:py-5",
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
                    <span className="flex min-w-0 flex-1 items-baseline gap-3">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-black/70">
                        {p.num}
                      </span>
                      <span className="font-display text-2xl tracking-[-0.03em] md:text-3xl">
                        {p.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Fixed-height detail box — rotation never changes page height */}
            <div className="relative mt-5 h-36 overflow-hidden border border-kasi-black/10 bg-kasi-black/[0.03] md:h-40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pillar.id}
                  className="absolute inset-0 flex flex-col justify-center px-5 py-4 md:px-6 md:py-5"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                >
                  <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-black/70">
                    {pillar.num} · {pillar.title}
                  </p>
                  <ul className="mt-2 space-y-0.5 text-sm leading-snug text-kasi-black/70">
                    {pillar.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden border border-kasi-black/10 bg-kasi-black lg:min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={pillar.id}
                className="absolute inset-0"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
              >
                <SafeImage
                  src={pillar.image}
                  alt={`${pillar.title} capability preview`}
                  fill
                  className="object-cover object-top opacity-90"
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

        <p className="mt-14 max-w-xl text-sm text-kasi-black/70">
          KasiTech can grow with a business beyond its first website - from
          presence to transactions, operations, and decisions.
        </p>
      </div>
    </section>
  );
}
