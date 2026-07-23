"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { shippedWork } from "@/data/shipped-work";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/cn";

const ROTATE_MS = 3000;

export function ShippedCaseStudy() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const work = shippedWork[active];

  useEffect(() => {
    if (paused || shippedWork.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % shippedWork.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      id="shipped"
      className="bg-kasi-black px-5 py-24 md:px-8 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
          SHIPPED / CLIENT WORK
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
          LIVE ON THE
          <br />
          INTERNET.
        </h2>
        <p className="mt-6 max-w-lg text-base text-kasi-grey">
          Real organisations. Real launches. Concepts demonstrate range - this
          is work that shipped.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {shippedWork.map((w, i) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "border px-4 py-2 font-mono text-[11px] tracking-[0.12em] transition",
                i === active
                  ? "border-kasi-green bg-kasi-green text-kasi-black"
                  : "border-kasi-border text-kasi-grey hover:border-kasi-grey hover:text-kasi-ivory",
              )}
            >
              {w.name}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={work.id + "-copy"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-grey">
                {work.role.toUpperCase()} · {work.location.toUpperCase()} ·{" "}
                {work.year}
              </p>
              <h3 className="mt-4 font-display text-4xl tracking-[-0.04em] md:text-5xl">
                {work.name}
              </h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-kasi-ivory/80">
                {work.outcome}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={work.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-kasi-green bg-kasi-green px-5 py-3 text-sm text-kasi-black"
                >
                  Visit live site ↗
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={work.id + "-frame"}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <BrowserFrame
                url={work.url
                  .replace(/^https?:\/\//, "")
                  .replace(/\/index\.html$/, "")}
              >
                <a
                  href={work.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block aspect-[16/10] overflow-hidden bg-[#0d0d0d]"
                >
                  {work.cover ? (
                    <SafeImage
                      src={work.cover}
                      alt={`${work.name} live website`}
                      fill
                      className="object-cover object-top transition duration-700 group-hover:scale-[1.01]"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      fallbackLabel={work.name}
                      priority={active === 0}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#121212]">
                      <span className="font-display text-3xl tracking-[-0.03em] text-kasi-ivory/40">
                        {work.name}
                      </span>
                    </div>
                  )}
                </a>
              </BrowserFrame>

              {/* Progress dots for the 3s rotation */}
              {shippedWork.length > 1 && (
                <div className="mt-4 flex justify-center gap-1.5">
                  {shippedWork.map((w, i) => (
                    <button
                      key={w.id}
                      type="button"
                      aria-label={`Show ${w.name}`}
                      onClick={() => setActive(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        i === active
                          ? "w-8 bg-kasi-green"
                          : "w-1.5 bg-kasi-border hover:bg-kasi-grey",
                      )}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
