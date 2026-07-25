"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { buildingStages } from "@/data/founder";

export function FounderBuilding() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % buildingStages.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      data-founder-building
      className="border-t border-kasi-border bg-kasi-black px-5 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
              BUILDING KASITECH
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[0.98] tracking-[-0.04em]">
              BUILD THE WORK.
              <br />
              LEARN THE PATTERN.
              <br />
              BUILD THE SYSTEM.
            </h2>
          </div>
          <p className="max-w-xl self-end text-sm leading-relaxed text-kasi-grey md:text-base">
            KasiTech begins by solving real problems for individual businesses.
            Repeated problems reveal patterns. Patterns can become reusable
            systems. Reusable systems can become products.
          </p>
        </div>

        <div className="relative mt-12 border border-kasi-border p-5 md:p-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {buildingStages.map((s, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "min-h-[9.5rem] border p-4 text-left transition-all duration-500",
                    isActive
                      ? "border-kasi-green bg-kasi-green/10 opacity-100"
                      : "border-kasi-border bg-[#0f0f0f] opacity-35 hover:opacity-60",
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  <p
                    className={cn(
                      "font-mono text-[10px] tracking-[0.16em]",
                      isActive ? "text-kasi-green" : "text-kasi-grey",
                    )}
                  >
                    {s.num}
                  </p>
                  <h3
                    className={cn(
                      "mt-2 font-display text-lg tracking-[-0.02em] md:text-xl",
                      isActive ? "text-kasi-ivory" : "text-kasi-ivory/70",
                    )}
                  >
                    {s.label}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed",
                      isActive ? "text-kasi-ivory/80" : "text-kasi-grey",
                    )}
                  >
                    {s.line}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-kasi-border pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              ORIGIN
            </p>
            <h3 className="mt-4 font-display text-[clamp(1.9rem,4vw,3.25rem)] leading-[1] tracking-[-0.04em]">
              BUILT IN DAR ES SALAAM.
              <br />
              DESIGNED TO COMPETE ANYWHERE.
            </h3>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-kasi-grey md:text-base">
              KasiTech is being built with direct exposure to businesses and
              customers in its home market, while applying standards of design,
              engineering and product thinking that are not limited by geography.
            </p>
          </div>

          <div className="border border-kasi-border bg-[#0f0f0f] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-grey">
                  COORDINATES
                </p>
                <p className="mt-3 font-display text-2xl tracking-[-0.03em]">
                  DAR ES SALAAM
                </p>
                <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-kasi-green">
                  06.7924° S · 39.2083° E
                </p>
              </div>
              <div
                className="relative h-14 w-14 border border-kasi-border"
                aria-hidden
              >
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-kasi-green/70" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-kasi-green/70" />
              </div>
            </div>
            <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-kasi-ivory/75">
              DAR ES SALAAM → TANZANIA → EAST AFRICA → BEYOND
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
