"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { journeyStages, type JourneyStage } from "@/data/founder";

function JourneyVisual({ stage }: { stage: JourneyStage }) {
  if (stage.visual === "data") {
    return (
      <svg viewBox="0 0 360 180" className="h-full w-full" aria-hidden>
        {[28, 56, 84, 112, 140, 168, 196, 224, 252, 280, 308, 336].map((x, i) => {
          const h = [18, 34, 22, 48, 30, 62, 40, 72, 54, 80, 66, 88][i];
          return (
            <rect
              key={x}
              x={x}
              y={150 - h}
              width="10"
              height={h}
              fill={i > 7 ? "#C7FF00" : "#242424"}
              opacity={i > 7 ? 0.85 : 0.9}
            />
          );
        })}
        <path
          d="M28 132 C 90 120, 140 90, 200 70 S 300 40, 346 28"
          stroke="#C7FF00"
          strokeWidth="1.5"
          fill="none"
        />
        <text x="28" y="172" fill="#929292" style={{ fontSize: 9, letterSpacing: "0.12em" }}>
          RAW SIGNAL → PATTERN → UNDERSTANDING
        </text>
      </svg>
    );
  }

  if (stage.visual === "technology") {
    return (
      <svg viewBox="0 0 360 180" className="h-full w-full" aria-hidden>
        {[
          [60, 50, "INPUT"],
          [160, 50, "LOGIC"],
          [260, 50, "INTERFACE"],
          [160, 130, "ACTION"],
        ].map(([x, y, label], i) => (
          <g key={String(label)}>
            <rect
              x={Number(x) - 42}
              y={Number(y) - 18}
              width="84"
              height="36"
              stroke="#C7FF00"
              strokeWidth="1"
              fill="#111"
            />
            <text
              x={Number(x)}
              y={Number(y) + 4}
              textAnchor="middle"
              fill="#F4F2EA"
              style={{ fontSize: 10, letterSpacing: "0.14em" }}
            >
              {label}
            </text>
            {i < 3 && (
              <path
                d={
                  i === 2
                    ? "M260 68 L160 112"
                    : `M${Number(x) + 42} ${y} L${Number(x) + 58} ${y}`
                }
                stroke="#242424"
                strokeWidth="1"
              />
            )}
          </g>
        ))}
      </svg>
    );
  }

  if (stage.visual === "entrepreneurship") {
    const flow = ["CUSTOMER", "EXPERIENCE", "ACTION", "BUSINESS"];
    return (
      <svg viewBox="0 0 360 180" className="h-full w-full" aria-hidden>
        {flow.map((label, i) => {
          const x = 40 + i * 85;
          return (
            <g key={label}>
              <circle cx={x} cy="90" r="6" fill="#C7FF00" />
              <text
                x={x}
                y="120"
                textAnchor="middle"
                fill="#F4F2EA"
                style={{ fontSize: 9, letterSpacing: "0.12em" }}
              >
                {label}
              </text>
              {i < flow.length - 1 && (
                <path
                  d={`M${x + 10} 90 H${x + 75}`}
                  stroke="#242424"
                  strokeWidth="1"
                  markerEnd="url(#arrow)"
                />
              )}
            </g>
          );
        })}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 360 180" className="h-full w-full" aria-hidden>
      <circle cx="80" cy="55" r="4" fill="#C7FF00" />
      <circle cx="280" cy="55" r="4" fill="#C7FF00" />
      <circle cx="180" cy="145" r="4" fill="#C7FF00" />
      <path d="M80 55 L180 95 L280 55" stroke="#242424" strokeWidth="1" />
      <path d="M80 55 L180 145 L280 55" stroke="#242424" strokeWidth="1" />
      <path d="M180 95 L180 145" stroke="#C7FF00" strokeWidth="1.2" />
      <text x="80" y="40" textAnchor="middle" fill="#929292" style={{ fontSize: 9, letterSpacing: "0.14em" }}>
        DATA
      </text>
      <text x="280" y="40" textAnchor="middle" fill="#929292" style={{ fontSize: 9, letterSpacing: "0.14em" }}>
        SYSTEMS
      </text>
      <text x="180" y="168" textAnchor="middle" fill="#929292" style={{ fontSize: 9, letterSpacing: "0.14em" }}>
        BUSINESS
      </text>
      <text x="180" y="100" textAnchor="middle" fill="#C7FF00" style={{ fontSize: 12, letterSpacing: "0.18em" }}>
        KASITECH
      </text>
    </svg>
  );
}

export function FounderJourney() {
  const [active, setActive] = useState(journeyStages[0].id);
  const stage = journeyStages.find((s) => s.id === active) ?? journeyStages[0];

  return (
    <section className="relative border-t border-kasi-border bg-kasi-black px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-14">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
              THE PATH
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.75rem)] leading-[0.98] tracking-[-0.04em]">
              DIFFERENT DISCIPLINES.
              <br />
              ONE DIRECTION.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-kasi-grey md:text-base">
            Data science taught Karen to look for patterns. Technology made those
            patterns buildable. Entrepreneurship added the question that matters
            most: does this solve something worth solving?
          </p>
        </div>

        {/* Desktop rail */}
        <div className="mt-12 hidden lg:block">
          <div
            className="grid grid-cols-4 gap-2"
            role="tablist"
            aria-label="Founder path"
          >
            {journeyStages.map((s, i) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onMouseEnter={() => setActive(s.id)}
                  onFocus={() => setActive(s.id)}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "min-h-14 border px-4 py-4 text-left transition",
                    isActive
                      ? "border-kasi-green bg-kasi-green/5 text-kasi-ivory"
                      : "border-kasi-border text-kasi-grey hover:border-kasi-grey hover:text-kasi-ivory",
                  )}
                >
                  <span className="font-mono text-[10px] tracking-[0.16em]">
                    {s.num}
                    {i < journeyStages.length - 1 ? " →" : ""}
                  </span>
                  <span className="mt-1 block font-display text-xl tracking-[-0.03em]">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative mt-4 min-h-[280px] border border-kasi-border bg-[#0f0f0f] p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
                    {stage.num} · {stage.label}
                  </p>
                  <h3 className="mt-3 font-display text-2xl tracking-[-0.03em] md:text-3xl">
                    {stage.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-kasi-grey md:text-base">
                    {stage.description}
                  </p>
                  <ul className="mt-5 space-y-1.5 font-mono text-[11px] tracking-[0.12em] text-kasi-ivory/70">
                    {stage.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="h-44 border border-kasi-border/80 bg-kasi-black/60 p-4">
                  <JourneyVisual stage={stage} />
                </div>
              </motion.div>
            </AnimatePresence>
            <p className="mt-4 font-mono text-[9px] tracking-[0.14em] text-kasi-grey/70">
              CONCEPTUAL VISUALIZATION
            </p>
          </div>
        </div>

        {/* Mobile snap */}
        <div className="-mx-5 mt-10 lg:hidden">
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3">
            {journeyStages.map((s) => (
              <article
                key={s.id}
                className="w-[88%] shrink-0 snap-start border border-kasi-border bg-[#0f0f0f] p-5"
              >
                <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
                  {s.num} · {s.label}
                </p>
                <h3 className="mt-3 font-display text-2xl tracking-[-0.03em]">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-kasi-grey">
                  {s.description}
                </p>
                <div className="mt-5 h-36 border border-kasi-border/80 bg-kasi-black/60 p-3">
                  <JourneyVisual stage={s} />
                </div>
              </article>
            ))}
          </div>
          <p className="mt-3 text-center font-mono text-[10px] tracking-[0.14em] text-kasi-grey">
            SWIPE TO MOVE THROUGH THE PATH
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-kasi-border pt-6">
          <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-grey">
            BACKGROUND
          </p>
          <p className="font-mono text-[11px] tracking-[0.12em] text-kasi-ivory/80">
            Data Science × Technology × Entrepreneurship
          </p>
        </div>
      </div>
    </section>
  );
}
