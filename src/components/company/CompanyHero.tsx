"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projectCovers } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";
import { track } from "@/lib/analytics";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";

const scenes = [
  { slug: "amani", label: "Brand experiences" },
  { slug: "soko", label: "Commerce systems" },
  { slug: "kasi-flow", label: "Operations software" },
  { slug: "kasi-intelligence", label: "Decision intelligence" },
] as const;

export function CompanyHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % scenes.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  const scene = scenes[index];

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Full-bleed product plane */}
      <div className="absolute inset-0" aria-hidden>
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.slug}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <SafeImage
              src={projectCovers[scene.slug] ?? projectCovers.amani}
              alt=""
              fill
              className="object-cover object-top brightness-[0.85] contrast-[1.05]"
              sizes="100vw"
              priority
              fallbackLabel={scene.label}
            />
          </motion.div>
        </AnimatePresence>
        {/* Readability veil: product stays visible, especially on desktop right */}
        <div className="absolute inset-0 bg-kasi-black/55 md:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-kasi-black via-kasi-black/75 to-kasi-black/35 md:from-kasi-black md:via-kasi-black/65 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-kasi-black via-transparent to-kasi-black/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_18%,rgba(199,255,0,0.16),transparent_40%)]" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-36">
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.p
            className="font-display text-[clamp(3.75rem,15vw,9.5rem)] leading-[0.82] tracking-[-0.055em] text-kasi-ivory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            KASITECH
          </motion.p>

          <motion.div
            className="mt-8 max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
          >
            <h1 className="font-display text-3xl leading-[1.05] tracking-[-0.035em] text-kasi-ivory md:text-5xl">
              A TECHNOLOGY COMPANY IN MOTION.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-kasi-grey md:text-lg">
              Digital technology studio in Dar es Salaam. We design and build
              products that reduce friction - from first click to daily
              operations.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/start"
                onClick={() =>
                  track("start_project_click", { source: "company_hero" })
                }
                className="border border-kasi-green bg-kasi-green px-6 py-3.5 text-sm tracking-wide text-kasi-black transition hover:bg-transparent hover:text-kasi-green"
              >
                START A PROJECT →
              </Link>
              {hasWhatsApp() ? (
                <a
                  href={whatsappUrl()}
                  onClick={() =>
                    track("whatsapp_click", { source: "company_hero" })
                  }
                  className="text-sm tracking-wide text-kasi-grey transition hover:text-kasi-ivory"
                >
                  WHATSAPP →
                </a>
              ) : (
                <a
                  href="#who"
                  className="text-sm tracking-wide text-kasi-grey transition hover:text-kasi-ivory"
                >
                  OUR STORY ↓
                </a>
              )}
            </div>
          </motion.div>

          <motion.p
            className="mt-14 border-t border-kasi-border/80 pt-5 font-mono text-[11px] tracking-[0.16em] text-kasi-grey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            DAR ES SALAAM · WORKING WORLDWIDE
          </motion.p>
        </div>
      </div>
    </section>
  );
}
