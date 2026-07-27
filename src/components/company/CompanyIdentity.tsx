"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

const outcomes = [
  {
    id: "attract",
    num: "01",
    title: "ATTRACT",
    copy: "Help the right people discover and understand the business.",
  },
  {
    id: "convert",
    num: "02",
    title: "CONVERT",
    copy: "Turn attention into enquiries, bookings, purchases and customers.",
  },
  {
    id: "operate",
    num: "03",
    title: "OPERATE",
    copy: "Build systems that make the business easier to run.",
  },
] as const;

const strip = [
  { label: "BASED IN", value: "Dar es Salaam, Tanzania" },
  {
    label: "WE BUILD",
    value: "Digital experiences · Commerce · Systems · Intelligence",
  },
  { label: "WE WORK WITH", value: "Businesses · Organizations · Founders" },
  { label: "MODEL", value: "Client technology and KasiTech products" },
] as const;

type OutcomeId = (typeof outcomes)[number]["id"];

export function CompanyIdentity() {
  const [active, setActive] = useState<OutcomeId>("attract");
  const current = outcomes.find((o) => o.id === active)!;

  return (
    <section
      id="why"
      className="border-t border-kasi-border bg-kasi-ivory px-5 py-20 text-kasi-black md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] tracking-[-0.045em]">
              EVERY SCREEN
              <br />
              SHOULD EARN
              <br />
              ITS PLACE.
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-kasi-black/65">
              We build around outcomes - helping businesses attract customers,
              convert attention and operate more effectively.
            </p>
          </div>

          {/* Desktop: one physical panel, three states */}
          <div className="hidden lg:block">
            <div className="flex gap-3">
              {outcomes.map((o) => {
                const isActive = active === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onMouseEnter={() => setActive(o.id)}
                    onFocus={() => setActive(o.id)}
                    onClick={() => setActive(o.id)}
                    className={cn(
                      "min-h-11 flex-1 border px-4 py-4 text-left transition",
                      isActive
                        ? "border-kasi-black bg-kasi-black text-kasi-ivory"
                        : "border-kasi-black/15 bg-transparent text-kasi-black/70 hover:border-kasi-black/40 hover:text-kasi-black",
                    )}
                  >
                    <span className="font-mono text-[10px] tracking-[0.16em] opacity-70">
                      {o.num}
                    </span>
                    <span className="mt-2 block font-display text-xl tracking-[-0.03em]">
                      {o.title}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="relative mt-4 min-h-[9.5rem] border border-kasi-black/10 bg-kasi-black p-6 text-kasi-ivory md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
                    {current.num} · {current.title}
                  </p>
                  <p className="mt-4 max-w-md text-lg leading-snug tracking-[-0.02em]">
                    {current.copy}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile: horizontal snap cards, next one peeking */}
          <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 lg:hidden">
            {outcomes.map((o) => (
              <article
                key={o.id}
                className="w-[78%] shrink-0 snap-start border border-kasi-black/15 bg-kasi-black p-5 text-kasi-ivory"
              >
                <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
                  {o.num}
                </p>
                <h3 className="mt-3 font-display text-2xl tracking-[-0.03em]">
                  {o.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-kasi-ivory/75">
                  {o.copy}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px border border-kasi-black/10 bg-kasi-black/10 md:grid-cols-4">
          {strip.map((item) => (
            <div key={item.label} className="bg-kasi-ivory px-4 py-5 md:px-5">
              <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-black/70">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-snug text-kasi-black/80">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
