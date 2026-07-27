"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { founderPhoto } from "@/data/images";
import { useIsClient } from "@/lib/useIsClient";

export function FounderHero() {
  const isClient = useIsClient();
  const panelRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isClient) return;
    const el = panelRef.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setOffset({
        x: Math.max(-6, Math.min(6, nx * 10)),
        y: Math.max(-6, Math.min(6, ny * 10)),
      });
    }

    function onLeave() {
      setOffset({ x: 0, y: 0 });
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [isClient]);

  return (
    <section className="relative overflow-hidden px-5 pb-10 pt-28 md:px-8 md:pb-14 md:pt-32">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-14">
        <div className="order-1 flex flex-col justify-end">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            FOUNDER / KASITECH
          </p>
          <h1 className="mt-5 font-display text-[clamp(3rem,10vw,6.5rem)] leading-[0.88] tracking-[-0.05em]">
            KAREN
            <br />
            MARIE
            <br />
            KASIGILA
          </h1>
          <p className="mt-6 text-base text-kasi-ivory/85 md:text-lg">
            Founder, KasiTech
          </p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-kasi-green">
            Data Science × Technology × Entrepreneurship
          </p>
          <p className="mt-7 max-w-md text-base leading-relaxed text-kasi-grey md:text-lg">
            Building at the intersection of data, technology and business.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-kasi-grey md:text-base">
            KasiTech grew from a simple idea: technology should not just look
            better - it should make something work better.
          </p>
        </div>

        <div
          ref={panelRef}
          className="relative order-2 aspect-square overflow-hidden border border-kasi-border bg-[#0d0d0d] md:aspect-auto md:min-h-[480px]"
        >
          <motion.div
            className="absolute inset-[-4%]"
            animate={{ x: offset.x, y: offset.y }}
            transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.4 }}
          >
            <Image
              src={founderPhoto.src}
              alt={founderPhoto.alt}
              width={founderPhoto.width}
              height={founderPhoto.height}
              priority
              className="h-full w-full object-cover object-[center_18%]"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(9,9,9,0.72)_0%,rgba(9,9,9,0.18)_35%,transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(199,255,0,0.08),transparent_45%)]" />

          <div className="absolute left-5 top-5 space-y-2 font-mono text-[10px] tracking-[0.16em] text-kasi-ivory/70 md:left-6 md:top-6">
            <p>DAR ES SALAAM, TZ</p>
            <p>EST. 2026</p>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
            <p className="max-w-[12ch] font-display text-3xl leading-[1.05] tracking-[-0.03em] text-kasi-ivory md:text-4xl">
              Founder,
              <br />
              KasiTech
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
