"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const lines = [
  "FASTER TO FIND.",
  "FASTER TO BUY.",
  "FASTER TO BOOK.",
  "FASTER TO OPERATE.",
  "FASTER TO DECIDE.",
];

export function KasiMeansSpeed() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = lines.map((_, i) =>
      setTimeout(() => setCount(i + 1), 350 + i * 380),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section ref={ref} className="bg-kasi-black px-5 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="font-display text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
          KASI MEANS
          <br />
          SPEED.
        </h2>
        <p className="mt-8 text-lg text-kasi-grey">Not rushed work.</p>
        <p className="text-lg text-kasi-grey">Less friction.</p>

        <div className="mt-16 space-y-3">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              className="font-display text-2xl tracking-[-0.03em] md:text-4xl"
              initial={{ opacity: 0.15 }}
              animate={{ opacity: count > i ? 1 : 0.15 }}
              transition={{ duration: 0.35 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <p className="mt-20 max-w-xl font-display text-3xl leading-[1.05] tracking-[-0.03em] md:text-5xl">
          DIGITAL SHOULD
          <br />
          MOVE BUSINESS FORWARD.
        </p>
      </div>
    </section>
  );
}
