"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const states = [
  {
    id: "hospitality",
    label: "BOOK A STAY",
    title: "Ocean Villa",
    meta: "12–16 Jul · 2 guests",
    cta: "BOOK",
    demo: "/demo/zuri",
    rows: [
      ["Check-in", "Sat 12 Jul"],
      ["Room", "Ocean Villa"],
      ["Status", "Available"],
    ],
  },
  {
    id: "commerce",
    label: "SELL A PRODUCT",
    title: "Linen Overshirt",
    meta: "Size M · Bone",
    cta: "ADD TO BAG",
    demo: "/demo/soko",
    rows: [
      ["Product", "Overshirt 02"],
      ["Size", "M"],
      ["Stock", "In stock"],
    ],
  },
  {
    id: "events",
    label: "RESERVE A TABLE",
    title: "NOIR / 025",
    meta: "VIP Table · A07",
    cta: "RESERVE",
    demo: "/demo/noir",
    rows: [
      ["Event", "Sat 25 Jul"],
      ["Table", "A07 · 6 pax"],
      ["Min", "TZS 750,000"],
    ],
  },
  {
    id: "operations",
    label: "RUN THE BUSINESS",
    title: "Today's overview",
    meta: "Revenue · Orders",
    cta: "MANAGE",
    demo: "/demo/kasi-flow",
    rows: [
      ["Revenue", "TZS 4.2M"],
      ["Orders", "128"],
      ["Tasks", "7 open"],
    ],
  },
  {
    id: "intelligence",
    label: "ASK WHY",
    title: "Why did sales change?",
    meta: "June vs May",
    cta: "ANALYZE",
    demo: "/demo/kasi-intelligence",
    rows: [
      ["Signal", "Returns ↑ 18%"],
      ["Channel", "Instagram soft"],
      ["Action", "Automate follow-up"],
    ],
  },
] as const;

export function HeroProductWindow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % states.length);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  const state = states[index];

  return (
    <div className="relative mx-auto w-full max-w-md md:mx-0">
      <p className="mb-3 max-w-sm text-sm leading-relaxed text-kasi-grey">
        A preview of the products we build: booking, selling, reserving,
        operating, analysing. Tap through, then open a live demo.
      </p>
      <div className="overflow-hidden border border-kasi-border bg-[#0f0f0f] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-kasi-grey">
              PRODUCT PREVIEW
            </p>
            <p className="mt-1 text-[11px] text-kasi-grey/80">
              Examples of what customers actually use
            </p>
          </div>
          <div className="flex gap-1.5">
            {states.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={s.label}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-1.5 rounded-full ${
                  i === index ? "bg-kasi-green" : "bg-kasi-border"
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={state.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-mono text-[10px] tracking-[0.2em] text-kasi-green">
              {state.label}
            </p>
            <h3 className="mt-3 font-display text-2xl tracking-[-0.03em]">
              {state.title}
            </h3>
            <p className="mt-1 text-sm text-kasi-grey">{state.meta}</p>
            <div className="mt-6 space-y-3 border-t border-kasi-border pt-4">
              {state.rows.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-kasi-grey">{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-2">
              <button
                type="button"
                className="w-full border border-kasi-green bg-kasi-green py-3 text-sm tracking-[0.08em] text-kasi-black"
              >
                {state.cta}
              </button>
              <Link
                href={state.demo}
                className="block w-full border border-kasi-border py-3 text-center text-sm text-kasi-ivory hover:border-kasi-green"
              >
                Open full demo ↗
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
