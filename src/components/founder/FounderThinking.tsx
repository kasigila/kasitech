"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { thinkingNodes, thinkingQuestions } from "@/data/founder";

export function FounderThinking() {
  const [qIndex, setQIndex] = useState(0);
  const [litCount, setLitCount] = useState(1);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<number | null>(null);

  const shown = thinkingQuestions[qIndex] ?? thinkingQuestions[0];

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setQIndex((i) => (i + 1) % thinkingQuestions.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLitCount((n) => (n >= thinkingNodes.length ? 1 : n + 1));
    }, 650);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  function select(index: number) {
    setQIndex(index);
    pausedRef.current = true;
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, 8000);
  }

  return (
    <section
      data-founder-thinking
      className="border-t border-kasi-border bg-kasi-ivory px-5 py-16 text-kasi-black md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-black/70">
              APPROACH
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.75rem)] leading-[0.98] tracking-[-0.04em]">
              START WITH THE PROBLEM.
              <br />
              THEN EARN THE TECHNOLOGY.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-kasi-black/65 md:text-base">
              Before choosing what to build, understand what needs to become
              easier.
            </p>
          </div>

          <blockquote className="self-end border-l border-kasi-black/20 pl-5">
            <p className="max-w-lg font-display text-xl leading-snug tracking-[-0.02em] md:text-2xl">
              &ldquo;The question isn&apos;t what technology can we add. It&apos;s
              what should become easier because the technology exists.&rdquo;
            </p>
          </blockquote>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div
            className="space-y-2"
            role="tablist"
            aria-label="Thinking questions"
          >
            {thinkingQuestions.map((q, index) => {
              const isActive = qIndex === index;
              return (
                <button
                  key={q.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-thinking-tab={q.id}
                  onClick={() => select(index)}
                  className={cn(
                    "flex min-h-12 w-full items-baseline gap-4 border px-4 py-4 text-left transition-colors duration-300",
                    isActive
                      ? "border-kasi-black bg-kasi-black text-kasi-ivory"
                      : "border-kasi-black/15 bg-transparent text-kasi-black/70 hover:border-kasi-black/40 hover:text-kasi-black",
                  )}
                >
                  <span className="font-mono text-[10px] tracking-[0.16em] opacity-70">
                    {q.num}
                  </span>
                  <span className="font-display text-lg tracking-[-0.02em] md:text-xl">
                    {q.question}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="border border-kasi-black/10 bg-kasi-black p-5 text-kasi-ivory md:p-7">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
                KASITECH THINKING SYSTEM
              </p>
              <p className="font-mono text-[10px] tracking-[0.14em] text-kasi-grey">
                {shown.num} {shown.principle}
              </p>
            </div>

            <div className="mt-6 overflow-x-auto">
              <svg
                viewBox="0 0 520 160"
                className="mx-auto h-auto w-full min-w-[320px] max-w-[520px]"
                role="img"
                aria-label="Thinking system diagram"
                data-thinking-lit={litCount}
              >
                {thinkingNodes.map((node, i) => {
                  const x = 36 + i * 72;
                  const y = i % 2 === 0 ? 58 : 100;
                  const lit = i < litCount;
                  const next = thinkingNodes[i + 1];
                  const nextX = 36 + (i + 1) * 72;
                  const nextY = (i + 1) % 2 === 0 ? 58 : 100;
                  const edgeLit = i + 1 < litCount;
                  return (
                    <g key={node}>
                      {next && (
                        <line
                          x1={x + 18}
                          y1={y}
                          x2={nextX - 18}
                          y2={nextY}
                          stroke={edgeLit ? "#C7FF00" : "#2a2a2a"}
                          strokeWidth={edgeLit ? 2 : 1}
                        />
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={lit ? 8 : 6}
                        fill={lit ? "#C7FF00" : "#111"}
                        stroke={lit ? "#C7FF00" : "#424242"}
                        strokeWidth="1.5"
                        data-node-lit={lit ? "1" : "0"}
                      />
                      <text
                        x={x}
                        y={y + (i % 2 === 0 ? -18 : 26)}
                        textAnchor="middle"
                        fill={lit ? "#F4F2EA" : "#6a6a6a"}
                        style={{ fontSize: 8, letterSpacing: "0.12em" }}
                      >
                        {node}
                      </text>
                    </g>
                  );
                })}
                <path
                  d="M468 100 C 500 100, 500 20, 36 20"
                  stroke={litCount >= thinkingNodes.length ? "#C7FF00" : "#2a2a2a"}
                  strokeWidth={litCount >= thinkingNodes.length ? 1.5 : 1}
                  strokeDasharray="3 4"
                  fill="none"
                />
                <text
                  x="260"
                  y="14"
                  textAnchor="middle"
                  fill="#929292"
                  style={{ fontSize: 8, letterSpacing: "0.14em" }}
                >
                  SIGNAL LOOPS BACK
                </text>
              </svg>
            </div>

            <div className="relative mt-6 min-h-[6.5rem] border-t border-kasi-border pt-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={shown.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="font-display text-xl tracking-[-0.02em]">
                    {shown.question}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-kasi-grey">
                    {shown.answer}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
