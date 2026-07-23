"use client";

import Link from "next/link";
import { useState } from "react";
import { caseStudies, type CaseStudyContent } from "@/data/case-studies";
import { getProject } from "@/data/projects";
import { projectCovers } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/cn";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { BuyCtas } from "@/components/site/BuyCtas";

export function CaseStudyView({ slug }: { slug: string }) {
  const content: CaseStudyContent | undefined = caseStudies[slug];
  const project = getProject(slug);
  const [openThinking, setOpenThinking] = useState(false);

  if (!content) {
    return (
      <div className="px-5 py-32 text-center">
        <p>Project not found.</p>
        <Link href="/work" className="mt-4 inline-block text-kasi-green">
          Back to Work
        </Link>
      </div>
    );
  }

  const demoPath =
    slug === "000" ? "/" : (project?.demoPath ?? `/demo/${slug}`);
  const cover = projectCovers[slug] ?? projectCovers.zuri;

  const digest = [
    {
      label: "The problem",
      body: content.challenge,
    },
    {
      label: "Who it's for",
      body: content.user,
    },
    {
      label: "What success looks like",
      body: content.businessGoal,
    },
  ];

  return (
    <article className="bg-kasi-black text-kasi-ivory">
      <div className="mx-auto max-w-[1100px] px-5 pb-24 pt-32 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
          KASI CONCEPT / {content.conceptCode}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.14em] text-kasi-grey">
          {project && (
            <>
              <span>{project.industry.toUpperCase()}</span>
              <span aria-hidden>·</span>
            </>
          )}
          <span>KASITECH CONCEPT</span>
          <span aria-hidden>·</span>
          <span>CAPABILITY DEMO</span>
        </div>
        <h1 className="mt-6 font-display text-5xl tracking-[-0.04em] md:text-7xl">
          {content.name}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-kasi-ivory/90">
          {content.strategic}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={demoPath}
            className="border border-kasi-green bg-kasi-green px-6 py-3 text-sm text-kasi-black"
          >
            Open live demo ↗
          </Link>
          <Link
            href="/start"
            className="border border-kasi-border px-6 py-3 text-sm text-kasi-ivory"
          >
            Start a similar project →
          </Link>
          {hasWhatsApp() && (
            <a
              href={whatsappUrl(
                `Hi KasiTech: I'm interested in something like ${content.name}.`,
              )}
              className="px-2 py-3 text-sm text-kasi-grey hover:text-kasi-green"
            >
              WhatsApp →
            </a>
          )}
        </div>

        <div className="mt-14">
          <div className="overflow-hidden border border-kasi-border bg-[#0d0d0d]">
            <div className="flex items-center gap-2 border-b border-kasi-border px-3 py-2.5">
              <span className="h-2 w-2 rounded-full bg-kasi-border" />
              <span className="h-2 w-2 rounded-full bg-kasi-border" />
              <span className="h-2 w-2 rounded-full bg-kasi-border" />
              <span className="ml-2 truncate font-mono text-[10px] tracking-[0.08em] text-kasi-grey">
                kasitech · {slug}
              </span>
            </div>
            <div className="relative aspect-[21/9] w-full overflow-hidden">
              <SafeImage
                src={cover}
                alt={`${content.name} interface`}
                fill
                className="object-cover"
                sizes="100vw"
                priority
                fallbackLabel={content.name}
              />
            </div>
          </div>
        </div>

        {/* 60-second digest */}
        <section className="mt-16">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            IN 60 SECONDS
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {digest.map((card) => (
              <div
                key={card.label}
                className="border border-kasi-border bg-[#0d0d0d] p-6"
              >
                <h2 className="font-display text-xl tracking-[-0.02em]">
                  {card.label}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-kasi-grey">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Try these */}
        <section className="mt-16 border border-kasi-border p-6 md:p-8">
          <h2 className="font-display text-2xl tracking-[-0.03em] md:text-3xl">
            Try these in the demo
          </h2>
          <p className="mt-3 max-w-xl text-sm text-kasi-grey">
            Skip the essay: open the product and click through these moments.
          </p>
          <ul className="mt-8 space-y-4">
            {content.interactions.map((item, i) => (
              <li
                key={item}
                className="flex gap-4 border-b border-kasi-border pb-4 text-base text-kasi-ivory/90 last:border-0"
              >
                <span className="font-mono text-[11px] text-kasi-green">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href={demoPath}
            className="mt-8 inline-block text-sm text-kasi-green hover:underline"
          >
            Launch demo and try them ↗
          </Link>
        </section>

        {/* What ships */}
        <section className="mt-16">
          <h2 className="font-display text-2xl tracking-[-0.03em]">
            What this includes
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {content.built.map((b) => (
              <span
                key={b}
                className="border border-kasi-border px-4 py-2 text-sm text-kasi-ivory/90"
              >
                {b}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-kasi-grey">
            {content.experience} On mobile: {content.mobile}
          </p>
        </section>

        {/* Optional depth */}
        <section className="mt-16 border-t border-kasi-border pt-8">
          <button
            type="button"
            onClick={() => setOpenThinking((v) => !v)}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="font-display text-xl tracking-[-0.02em]">
              How we thought about it
            </span>
            <span className="font-mono text-kasi-green">
              {openThinking ? "−" : "+"}
            </span>
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all",
              openThinking ? "mt-6 max-h-[800px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <p className="max-w-2xl text-base leading-relaxed text-kasi-grey">
              {content.thinking}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-kasi-grey">
              Behind the scenes: {content.system}
            </p>
          </div>
        </section>

        <section className="mt-24 border-t border-kasi-border pt-16">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            WANT THIS FOR YOUR BUSINESS?
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-[-0.04em] md:text-5xl">
            Let&apos;s build yours.
          </h2>
          <div className="mt-8">
            <BuyCtas source={`case_${slug}`} />
          </div>
          <Link
            href={demoPath}
            className="mt-4 inline-block text-sm text-kasi-grey hover:text-kasi-ivory"
          >
            Keep exploring the demo →
          </Link>
        </section>

        {project && (
          <section className="mt-20 border-t border-kasi-border pt-12">
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
              KEEP EXPLORING
            </p>
            <Link
              href="/work"
              className="mt-4 inline-block font-display text-2xl tracking-[-0.03em] hover:text-kasi-green"
            >
              View all work →
            </Link>
          </section>
        )}
      </div>
    </article>
  );
}
