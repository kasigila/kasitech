"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const KEY = "kasi-intro-seen";

export function BrandIntro() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"kasi" | "tech">("kasi");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
      // Defer show to after hydration
      const start = window.setTimeout(() => setShow(true), 40);
      const t1 = window.setTimeout(() => setPhase("tech"), 740);
      const t2 = window.setTimeout(() => setShow(false), 1440);
      return () => {
        window.clearTimeout(start);
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    } catch {
      // ignore
    }
  }, []);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-kasi-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden
        >
          <motion.p
            className="font-display text-5xl tracking-[-0.04em] text-kasi-ivory md:text-7xl"
            key={phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {phase === "kasi" ? "Kasi" : "KasiTech"}
          </motion.p>
          {phase === "kasi" && (
            <p className="mt-4 font-mono text-[10px] tracking-[0.22em] text-kasi-grey md:text-[11px]">
              Swahili · speed · pace · momentum
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
