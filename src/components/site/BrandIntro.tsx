"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BrandIntro() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"kasi" | "tech">("kasi");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // Brief presence only for reduced-motion users
      const start = window.setTimeout(() => setShow(true), 40);
      const end = window.setTimeout(() => setShow(false), 600);
      return () => {
        window.clearTimeout(start);
        window.clearTimeout(end);
      };
    }

    // Every refresh / visit:
    // 1) "Kasi" + meaning (~2s so it's readable)
    // 2) "KasiTech" hold (~1.2s)
    // 3) fade out
    const start = window.setTimeout(() => setShow(true), 40);
    const toTech = window.setTimeout(() => setPhase("tech"), 2000);
    const hide = window.setTimeout(() => setShow(false), 3400);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(toTech);
      window.clearTimeout(hide);
    };
  }, []);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-kasi-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          aria-hidden
        >
          <motion.p
            className="font-display text-5xl tracking-[-0.04em] text-kasi-ivory md:text-7xl"
            key={phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {phase === "kasi" ? "Kasi" : "KasiTech"}
          </motion.p>
          {phase === "kasi" && (
            <motion.p
              className="mt-4 font-mono text-[10px] tracking-[0.22em] text-kasi-grey md:text-[11px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              /ˈkɑːsi/ n. speed, pace, momentum
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
