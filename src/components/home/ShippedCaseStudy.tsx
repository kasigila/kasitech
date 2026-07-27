"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { shippedWork, shippedWorkDisplayHost, shippedWorkExternalLabel } from "@/data/shipped-work";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const ROTATE_MS = 6000;

export function ShippedCaseStudy() {
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isPaused = userPaused || hoverPaused || prefersReducedMotion;
  const work = shippedWork[active];

  useEffect(() => {
    if (isPaused || shippedWork.length < 2) return;

    const id = setInterval(() => {
      setActive((i) => (i + 1) % shippedWork.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <section
      id="shipped"
      className="bg-kasi-black px-5 py-24 md:px-8 md:py-32"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              SHIPPED / CLIENT WORK
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
              LIVE ON THE
              <br />
              INTERNET.
            </h2>
            <p className="mt-6 max-w-lg text-base text-kasi-grey">
              Real organisations. Real launches. Concepts demonstrate range -
              this is work that shipped.
            </p>
          </div>
          {shippedWork.length > 1 && (
            <button
              type="button"
              onClick={() => setUserPaused((value) => !value)}
              className="min-h-11 border border-kasi-border px-4 font-mono text-[10px] tracking-[0.14em] text-kasi-grey transition hover:border-kasi-green hover:text-kasi-green"
              aria-pressed={userPaused}
            >
              {prefersReducedMotion
                ? "MOTION OFF"
                : userPaused
                  ? "PLAY ROTATION"
                  : "PAUSE ROTATION"}
            </button>
          )}
        </div>

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
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
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
                <Link
                  href={work.caseStudyPath}
                  className="border border-kasi-green bg-kasi-green px-5 py-3 text-sm text-kasi-black transition hover:bg-transparent hover:text-kasi-green"
                >
                  Read case study →
                </Link>
                <a
                  href={work.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-kasi-border px-5 py-3 text-sm text-kasi-ivory transition hover:border-kasi-green hover:text-kasi-green"
                >
                  {shippedWorkExternalLabel(work)}
                </a>
                <Link
                  href="/start"
                  className="border border-kasi-border px-5 py-3 text-sm text-kasi-grey transition hover:border-kasi-green hover:text-kasi-green"
                >
                  Start a similar project →
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={work.id + "-frame"}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
            >
              <BrowserFrame url={shippedWorkDisplayHost(work)}>
                <Link
                  href={work.caseStudyPath}
                  className="group relative block aspect-[16/10] overflow-hidden bg-[#0d0d0d]"
                >
                  {work.cover ? (
                    <SafeImage
                      src={work.cover}
                      alt={`${work.name} live website`}
                      fill
                      className={
                        prefersReducedMotion
                          ? "object-cover object-top"
                          : "object-cover object-top transition duration-700 group-hover:scale-[1.01]"
                      }
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
                </Link>
              </BrowserFrame>

              {shippedWork.length > 1 && (
                <div className="mt-4 flex justify-center gap-1.5">
                  {shippedWork.map((w, i) => (
                    <button
                      key={w.id}
                      type="button"
                      aria-label={`Show ${w.name}`}
                      onClick={() => setActive(i)}
                      className="group flex h-11 w-11 items-center justify-center"
                    >
                      <span
                        className={cn(
                          "h-1.5 rounded-full transition-all",
                          i === active
                            ? "w-8 bg-kasi-green"
                            : "w-1.5 bg-kasi-border group-hover:bg-kasi-grey",
                        )}
                      />
                    </button>
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
