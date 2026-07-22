"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    n: "01",
    t: "UNDERSTAND",
    d: "Understand business, customer and problem.",
  },
  {
    n: "02",
    t: "DESIGN",
    d: "Make the path to action intuitive.",
  },
  {
    n: "03",
    t: "BUILD",
    d: "Create fast, responsive technology around actual use.",
  },
  {
    n: "04",
    t: "IMPROVE",
    d: "Use performance, analytics and feedback.",
  },
];

export function HowWeThink() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="how-we-work"
      ref={ref}
      className="bg-kasi-ivory px-5 py-28 text-kasi-black md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          HOW WE THINK
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
          YOUR BUSINESS DOESN&apos;T
          <br />
          NEED MORE TECHNOLOGY.
        </h2>
        <p className="mt-8 max-w-xl font-display text-2xl tracking-[-0.03em] md:text-4xl">
          IT NEEDS THE
          <br />
          RIGHT TECHNOLOGY.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.45 }}
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-grey">
                {s.n}
              </p>
              <h3 className="mt-3 font-display text-2xl tracking-[-0.03em]">
                {s.t}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-kasi-black/70">
                {s.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
