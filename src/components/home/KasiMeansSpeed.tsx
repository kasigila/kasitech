"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const verbs = ["FIND", "BUY", "BOOK", "OPERATE", "DECIDE"];

export function KasiMeansSpeed() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="bg-kasi-black px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-display text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
              KASI MEANS
              <br />
              SPEED.
            </h2>
            <p className="mt-6 max-w-sm text-base text-kasi-grey">
              Not rushed work. Less friction, so business moves.
            </p>
          </div>

          <motion.div
            className="flex flex-wrap gap-x-4 gap-y-3 md:gap-x-6"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {verbs.map((v, i) => (
              <motion.span
                key={v}
                className="font-display text-2xl tracking-[-0.03em] text-kasi-ivory md:text-4xl"
                initial={{ opacity: 0.2 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.15 + i * 0.08 }}
              >
                {v}
                {i < verbs.length - 1 ? (
                  <span className="ml-4 text-kasi-green md:ml-6">·</span>
                ) : null}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
