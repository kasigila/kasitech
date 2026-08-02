"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const STORAGE_KEY = "kasi-brand-intro-seen";

export function BrandIntro() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"kasi" | "tech">("kasi");
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        return;
      }
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Private mode / blocked storage: still show once this mount.
    }

    const reduced =
      prefersReducedMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const hide = window.setTimeout(() => setShow(false), 0);
      return () => window.clearTimeout(hide);
    }

    // First visit in this browser tab only:
    // 1) "Kasi" + meaning (~2.4s so the phonetic is readable)
    // 2) "KasiTech" hold (~1.6s)
    // 3) fade out
    const start = window.setTimeout(() => setShow(true), 40);
    const toTech = window.setTimeout(() => setPhase("tech"), 2400);
    const hide = window.setTimeout(() => setShow(false), 4200);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(toTech);
      window.clearTimeout(hide);
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-kasi-black"
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
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              /ˈkɑːsi/ n. speed, pace, momentum
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
