"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIsClient } from "@/lib/useIsClient";

const nodes = [
  { id: "data", x: 70, y: 90, label: "DATA" },
  { id: "tech", x: 330, y: 90, label: "TECHNOLOGY" },
  { id: "biz", x: 200, y: 410, label: "BUSINESS" },
] as const;

const center = { x: 200, y: 250 };

function FlowDot({
  from,
  to,
  delay,
  duration,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay: number;
  duration: number;
}) {
  return (
    <motion.circle
      r="2.5"
      fill="#C7FF00"
      initial={false}
      animate={{
        cx: [from.x, to.x],
        cy: [from.y, to.y],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

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
          className="relative order-2 min-h-[340px] overflow-hidden border border-kasi-border bg-[#0d0d0d] md:min-h-[480px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_15%,rgba(199,255,0,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(36,36,36,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(36,36,36,0.45)_1px,transparent_1px)] bg-[size:48px_48px] opacity-50" />

          <div
            className="absolute inset-0"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px)`,
              transition: "transform 180ms ease-out",
            }}
          >
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 400 500"
              fill="none"
              aria-hidden
            >
              {nodes.map((n) => (
                <path
                  key={`line-${n.id}`}
                  d={`M${n.x} ${n.y} L${center.x} ${center.y}`}
                  stroke="#242424"
                  strokeWidth="1"
                />
              ))}

              {isClient &&
                nodes.map((n, i) => (
                  <motion.path
                    key={`glow-${n.id}`}
                    d={`M${n.x} ${n.y} L${center.x} ${center.y}`}
                    stroke="#C7FF00"
                    strokeWidth="1"
                    strokeLinecap="round"
                    initial={false}
                    animate={{ pathLength: [0, 1], opacity: [0.15, 0.55, 0.15] }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.45,
                    }}
                  />
                ))}

              {nodes.map((n, i) => (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r="4" fill="#C7FF00" />
                  <text
                    x={n.x}
                    y={n.y - 14}
                    textAnchor="middle"
                    fill="#929292"
                    style={{ fontSize: 9, letterSpacing: "0.16em" }}
                  >
                    {n.label}
                  </text>
                  {isClient && (
                    <>
                      <FlowDot
                        from={n}
                        to={center}
                        delay={i * 0.35}
                        duration={2.8}
                      />
                      <FlowDot
                        from={n}
                        to={center}
                        delay={i * 0.35 + 0.9}
                        duration={2.8}
                      />
                      <FlowDot
                        from={n}
                        to={center}
                        delay={i * 0.35 + 1.8}
                        duration={2.8}
                      />
                    </>
                  )}
                </g>
              ))}

              <circle
                cx={center.x}
                cy={center.y}
                r="7"
                fill="#090909"
                stroke="#C7FF00"
                strokeWidth="1.5"
              />
              <text
                x={center.x}
                y={center.y + 28}
                textAnchor="middle"
                fill="#C7FF00"
                style={{ fontSize: 11, letterSpacing: "0.18em" }}
              >
                KASITECH
              </text>
            </svg>
          </div>

          <div className="absolute left-5 top-5 space-y-2 font-mono text-[10px] tracking-[0.16em] text-kasi-grey md:left-6 md:top-6">
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
