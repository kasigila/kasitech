"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const beats = [
  {
    id: "who",
    label: "WHO WE ARE",
    body: "A studio that builds websites, commerce, software, and intelligent systems - with the ambition to grow into reusable products.",
    emphasis: true,
  },
  {
    id: "why",
    label: "WHY KASITECH EXISTS",
    body: "Because beautiful isn't enough. Digital should help businesses find, buy, book, operate, and decide faster - without rushing the craft.",
  },
  {
    id: "kasi",
    label: 'WHAT "KASI" MEANS',
    title: "SPEED.",
    body: "Not rushed work. Less friction, so business moves. The name is a commitment: every product should earn its place by making something faster, clearer, or more operable.",
  },
  {
    id: "build",
    label: "WHAT WE BUILD",
    body: "Experiences, commerce, systems, and intelligence. Client work and proprietary products grow side by side.",
    links: [
      { href: "/capabilities", label: "Capabilities →", primary: true },
      { href: "/work", label: "Work →", primary: false },
    ],
  },
  {
    id: "going",
    label: "WHERE WE'RE GOING",
    body: "From trusted digital technology services toward reusable systems and proprietary products - ambition without fake scale claims.",
  },
] as const;

function StoryBeat({
  beat,
  index,
}: {
  beat: (typeof beats)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-18%" });

  return (
    <motion.section
      id={beat.id}
      ref={ref}
      className="border-t border-kasi-border py-16 md:py-20"
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.16) }}
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,12rem)_1fr] md:gap-12 lg:grid-cols-[minmax(0,16rem)_1fr]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
          {beat.label}
        </p>
        <div>
          {"title" in beat && beat.title ? (
            <p className="max-w-[12ch] font-display text-5xl tracking-[-0.04em] md:text-6xl">
              {beat.title}
            </p>
          ) : null}
          <p
            className={
              ("emphasis" in beat && beat.emphasis
                ? "max-w-2xl text-2xl leading-snug tracking-[-0.02em] text-kasi-ivory md:text-3xl"
                : "max-w-2xl text-lg leading-relaxed text-kasi-ivory/85") +
              ("title" in beat && beat.title ? " mt-6" : "")
            }
          >
            {beat.body}
          </p>
          {"links" in beat && beat.links ? (
            <div className="mt-8 flex flex-wrap gap-6 text-sm">
              {beat.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    link.primary
                      ? "text-kasi-green hover:underline"
                      : "text-kasi-grey hover:text-kasi-ivory"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </motion.section>
  );
}

export function CompanyStory() {
  return (
    <section className="bg-kasi-black px-5 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-[1400px]">
        {beats.map((beat, index) => (
          <StoryBeat key={beat.id} beat={beat} index={index} />
        ))}
      </div>
    </section>
  );
}
