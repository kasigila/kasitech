"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  filterProjects,
  workFilters,
  type WorkFilterId,
  type Project,
} from "@/data/projects";
import { shippedWork } from "@/data/shipped-work";
import { projectCovers } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { cn } from "@/lib/cn";

function ConceptCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col border border-kasi-border">
      <Link
        href={project.demoPath}
        className="relative block aspect-[16/10] overflow-hidden bg-kasi-border"
      >
        <SafeImage
          src={projectCovers[project.slug] ?? projectCovers.zuri}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 50vw, 33vw"
          fallbackLabel={project.name}
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-green">
          {project.number} · {project.industry.toUpperCase()}
        </p>
        <h2 className="mt-3 font-display text-3xl tracking-[-0.03em]">
          {project.name}
        </h2>
        <p className="mt-2 text-sm text-kasi-grey">
          {project.tags.join(" · ")}
        </p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-kasi-ivory/80">
          {project.description}
        </p>
        <p className="mt-3 text-sm text-kasi-green/90">{project.hook}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href={project.demoPath}
            className="border border-kasi-green bg-kasi-green px-4 py-2 text-kasi-black"
          >
            Try demo ↗
          </Link>
          <Link
            href={project.caseStudyPath}
            className="border border-kasi-border px-4 py-2 hover:border-kasi-green"
          >
            How it works →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function WorkPage() {
  const [filter, setFilter] = useState<WorkFilterId>("all");
  const concepts = useMemo(() => filterProjects(filter), [filter]);

  // Land on #concepts when linked from homepage / hero
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#concepts") {
      document.getElementById("concepts")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="pt-28">
      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
            WORK
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl lg:text-7xl">
            DIFFERENT BUSINESSES.
            <br />
            DIFFERENT PROBLEMS.
            <br />
            DIFFERENT SOLUTIONS.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-kasi-grey">
            Interactive concept examples you can try, plus real client work that
            shipped.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            <a href="#concepts" className="text-kasi-green hover:underline">
              Browse concepts ↓
            </a>
            <a href="#client-work" className="text-kasi-grey hover:text-kasi-ivory">
              Client work ↓
            </a>
          </div>
        </div>
      </section>

      {/* CONCEPTS first - matches homepage interest */}
      <section
        id="concepts"
        className="scroll-mt-28 px-5 py-20 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
              KASITECH CONCEPTS
            </p>
            <p className="mt-4 max-w-lg text-sm text-kasi-grey">
              Interactive product concepts of what KasiTech can build.
            </p>
          </div>

          <div
            className="mt-10 flex gap-2 overflow-x-auto pb-2"
            role="tablist"
            aria-label="Filter concepts"
          >
            {workFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "shrink-0 border px-4 py-2 font-mono text-[11px] tracking-[0.12em] transition",
                  filter === f.id
                    ? "border-kasi-green bg-kasi-green text-kasi-black"
                    : "border-kasi-border text-kasi-grey hover:border-kasi-grey hover:text-kasi-ivory",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {concepts.map((p) => (
              <ConceptCard key={p.id} project={p} />
            ))}
          </div>

          {concepts.length === 0 && (
            <p className="mt-12 text-kasi-grey">No concepts in this filter.</p>
          )}
        </div>
      </section>

      {/* CLIENT WORK - clearly separate */}
      <section
        id="client-work"
        className="scroll-mt-28 border-y border-kasi-border bg-kasi-ivory px-5 py-20 text-kasi-black md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-black/45">
            CLIENT WORK
          </p>
          <p className="mt-3 max-w-lg text-sm text-kasi-black/55">
            Paid engagements for real organisations. Separate from the concepts
            above.
          </p>

          <div className="mt-12 space-y-16">
            {shippedWork.map((w) => (
              <article
                key={w.id}
                className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center"
              >
                <div>
                  <p className="font-mono text-[11px] tracking-[0.14em] text-kasi-black/45">
                    {w.role.toUpperCase()} · {w.location.toUpperCase()} ·{" "}
                    {w.year}
                  </p>
                  <h2 className="mt-4 font-display text-4xl tracking-[-0.04em] md:text-5xl">
                    {w.name}
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-kasi-black/70">
                    {w.outcome}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href={w.url}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-kasi-black bg-kasi-black px-5 py-3 text-sm text-kasi-ivory"
                    >
                      Visit live site ↗
                    </a>
                  </div>
                </div>
                <BrowserFrame url={w.url.replace(/^https?:\/\//, "").replace(/\/index\.html$/, "")}>
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noreferrer"
                    className="relative block aspect-[16/10] overflow-hidden"
                  >
                    {w.cover && (
                      <SafeImage
                        src={w.cover}
                        alt={w.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        fallbackLabel={w.name}
                      />
                    )}
                  </a>
                </BrowserFrame>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-kasi-border px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-display text-4xl tracking-[-0.04em] md:text-6xl">
            DON&apos;T SEE YOUR INDUSTRY?
          </h2>
          <p className="mt-6 max-w-xl text-kasi-grey">
            Every business is different. Tell us what you run and we&apos;ll
            shape the right system for it.
          </p>
          <Link
            href="/start"
            className="mt-8 inline-block border border-kasi-green bg-kasi-green px-6 py-3 text-sm text-kasi-black"
          >
            START A PROJECT →
          </Link>
        </div>
      </section>
    </div>
  );
}
