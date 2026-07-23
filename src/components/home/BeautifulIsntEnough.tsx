"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const words = ["ATTRACT.", "CONVERT.", "OPERATE."];

export function BeautifulIsntEnough() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = words.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 400 + i * 500),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section ref={ref} className="bg-kasi-black px-5 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          EVERY SCREEN SHOULD EARN ITS PLACE.
        </p>
        <h2 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl lg:text-8xl">
          LOOKING GOOD
          <br />
          ISN&apos;T THE JOB.
        </h2>
        <p className="mt-8 max-w-md text-lg text-kasi-grey">
          Every experience we build has work to do.
        </p>
        <div className="mt-16 space-y-4">
          {words.map((w, i) => (
            <motion.p
              key={w}
              className="font-display text-3xl tracking-[-0.03em] md:text-5xl"
              initial={{ opacity: 0, x: -12 }}
              animate={visible > i ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45 }}
            >
              {w}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
