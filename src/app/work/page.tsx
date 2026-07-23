"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PortfolioRouter } from "@/components/home/PortfolioRouter";
import { ShippedWork } from "@/components/home/ShippedWork";
import { projects, searchProjects } from "@/data/projects";
import { projectCovers } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";
import { track } from "@/lib/analytics";
import { BuyCtas } from "@/components/site/BuyCtas";

export default function WorkPage() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const result = submitted ? searchProjects(query || industry) : null;
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted && result) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [submitted, result]);

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
            Shipped sites for real organisations, plus interactive examples of
            what yours could feel like.
          </p>
          <div className="mt-8">
            <BuyCtas source="work_hero" />
          </div>
          <p className="mt-6 text-[12px] text-kasi-grey">
            Reply within 24 hours
          </p>
        </div>
      </section>

      <div id="shipped">
        <ShippedWork />
      </div>

      <section className="border-y border-kasi-border px-5 py-12 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
                EXAMPLE PRODUCTS
              </p>
              <p className="mt-2 max-w-xl text-sm text-kasi-grey">
                Twelve interactive concepts. Click any to try.
              </p>
            </div>
            <Link
              href="/work/all"
              className="text-sm text-kasi-green hover:underline"
            >
              See all 12 examples →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={p.demoPath}
                className="group flex items-center gap-3 border border-kasi-border p-3 hover:border-kasi-green"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-kasi-border">
                  <SafeImage
                    src={projectCovers[p.slug] ?? projectCovers.zuri}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                    fallbackLabel={p.number}
                  />
                </div>
                <div>
                  <p className="font-display text-lg leading-none">{p.name}</p>
                  <p className="mt-1 text-[11px] text-kasi-grey">
                    {p.industry} · Try demo ↗
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PortfolioRouter id="router" />

      <section className="border-t border-kasi-border px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-display text-3xl tracking-[-0.03em] md:text-5xl">
            Search examples
          </h2>
          <p className="mt-4 text-sm text-kasi-grey">
            Plain language works. Try &quot;I own a safari company&quot; or
            &quot;I need customers to book appointments.&quot;
          </p>
          <form
            className="mt-8 flex flex-col gap-3 md:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              setIndustry("");
              setSubmitted(true);
              track("portfolio_search", { query });
            }}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="I run a…"
              className="flex-1 border border-kasi-border bg-transparent px-4 py-3 text-sm outline-none focus:border-kasi-green"
            />
            <button
              type="submit"
              className="border border-kasi-green bg-kasi-green px-6 py-3 text-sm text-kasi-black"
            >
              Search
            </button>
          </form>

          <div ref={resultsRef}>
            {result && (
              <div className="mt-12">
                <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
                  {result.headline}
                </p>
                <p className="mt-3 max-w-xl text-kasi-grey">
                  {result.explanation}
                </p>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {result.projects.map((p) => (
                    <div
                      key={p.id}
                      className="border border-kasi-border p-5 hover:border-kasi-green"
                    >
                      <p className="font-display text-2xl">{p.name}</p>
                      <p className="mt-2 text-sm text-kasi-grey">{p.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        <Link
                          href={p.demoPath}
                          className="text-kasi-green hover:underline"
                        >
                          Try demo ↗
                        </Link>
                        <Link
                          href={p.caseStudyPath}
                          className="text-kasi-grey hover:text-kasi-ivory"
                        >
                          How it works →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/start"
                  className="mt-8 inline-block text-sm text-kasi-green hover:underline"
                >
                  Start a project like this →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-kasi-border px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-display text-4xl tracking-[-0.04em] md:text-6xl">
            DON&apos;T SEE
            <br />
            YOUR INDUSTRY?
          </h2>
          <p className="mt-6 max-w-xl text-kasi-grey">
            Tell us what your business does and we&apos;ll show you the closest
            examples. KasiTech does not sell templates.
          </p>
          <form
            className="mt-8 flex flex-col gap-3 md:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(industry);
              setSubmitted(true);
              track("portfolio_search", { query: industry, source: "industry" });
            }}
          >
            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="I run a…"
              className="flex-1 border border-kasi-border bg-transparent px-4 py-3 text-sm outline-none focus:border-kasi-green"
            />
            <button
              type="submit"
              className="border border-kasi-border px-6 py-3 text-sm"
            >
              Show examples
            </button>
          </form>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <BuyCtas source="work_footer" />
        </div>
      </section>
    </div>
  );
}
