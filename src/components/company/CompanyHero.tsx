"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function CompanyHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[80svh] overflow-hidden px-5 pb-16 pt-28 md:min-h-[88svh] md:px-8 md:pb-20 md:pt-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(199,255,0,0.07),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_48%,rgba(36,36,36,0.55)_48%,transparent_49%),linear-gradient(to_bottom,transparent_0%,transparent_48%,rgba(36,36,36,0.55)_48%,transparent_49%)] bg-[size:72px_72px] opacity-40 md:bg-[size:96px_96px]" />
        <svg
          className="absolute right-[-8%] top-[18%] hidden h-[62%] w-[55%] text-kasi-border lg:block"
          viewBox="0 0 640 520"
          fill="none"
        >
          <path
            d="M40 80H220V200H400V120H600M40 320H180V420H360V300H520V440H600"
            stroke="currentColor"
            strokeWidth="1"
          />
          {[
            [40, 80],
            [220, 200],
            [400, 120],
            [180, 420],
            [360, 300],
            [520, 440],
          ].map(([x, y], i) => (
            <motion.circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="4"
              fill="#C7FF00"
              initial={{ opacity: 0.35 }}
              animate={
                reduced
                  ? { opacity: 0.55 }
                  : { opacity: [0.25, 0.9, 0.25], cy: [y - 3, y + 3, y - 3] }
              }
              transition={
                reduced
                  ? undefined
                  : {
                      duration: 5.5 + i * 0.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }
              }
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          COMPANY
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,8vw,5.75rem)] leading-[0.92] tracking-[-0.045em]">
          A TECHNOLOGY
          <br />
          COMPANY IN MOTION.
        </h1>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-kasi-grey md:text-lg">
          KasiTech designs and builds digital experiences, business systems and
          intelligent products - from the first customer interaction to the
          technology running behind the scenes.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Link
            href="/work"
            className="group border border-kasi-green bg-kasi-green px-6 py-3.5 text-sm tracking-wide text-kasi-black transition hover:bg-transparent hover:text-kasi-green"
          >
            Explore our work{" "}
            <span className="inline-block transition group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <Link
            href="/start"
            className="text-sm tracking-wide text-kasi-grey transition hover:text-kasi-ivory"
          >
            Start a project →
          </Link>
        </div>
        <p className="mt-10 border-t border-kasi-border pt-5 font-mono text-[11px] tracking-[0.16em] text-kasi-grey">
          Dar es Salaam, Tanzania · Working worldwide
        </p>
      </div>
    </section>
  );
}
