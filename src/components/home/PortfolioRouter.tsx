"use client";

import Link from "next/link";
import { useState } from "react";
import { portfolioRoutes, getProject } from "@/data/projects";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function PortfolioRouter({ id = "router" }: { id?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id={id} className="bg-kasi-black px-5 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          THAT&apos;S NOT ALL.
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
          WHAT ARE YOU
          <br />
          TRYING TO BUILD?
        </h2>

        <div className="mt-16 divide-y divide-kasi-border border-y border-kasi-border">
          {portfolioRoutes.map((route) => {
            const open = active === route.id;
            return (
              <div key={route.id}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 py-8 text-left"
                  onMouseEnter={() => setActive(route.id)}
                  onFocus={() => setActive(route.id)}
                  onClick={() => {
                    setActive(open ? null : route.id);
                    track("portfolio_route", { id: route.id });
                  }}
                >
                  <div>
                    <h3 className="font-display text-2xl tracking-[-0.03em] md:text-4xl">
                      {route.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm text-kasi-grey">
                      {route.description}
                    </p>
                  </div>
                  <span className="font-mono text-kasi-green">{open ? "−" : "+"}</span>
                </button>
                <div
                  className={cn(
                    "grid gap-3 overflow-hidden pb-0 transition-all md:grid-cols-3",
                    open ? "max-h-96 pb-8 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  {route.projectSlugs.map((slug) => {
                    const p = getProject(slug)!;
                    return (
                      <div
                        key={slug}
                        className="border border-kasi-border px-4 py-4 hover:border-kasi-green"
                      >
                        <p className="font-display text-xl">{p.name}</p>
                        <p className="mt-1 text-xs text-kasi-grey">
                          {p.industry} · {p.tags.join(" · ")}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-3 text-[12px]">
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
                    );
                  })}
                </div>
                {open && (
                  <div className="pb-8">
                    <Link
                      href={`/start?need=${needForRoute(route.id)}`}
                      className="text-sm text-kasi-green hover:underline"
                      onClick={() =>
                        track("start_project_click", {
                          source: `router_${route.id}`,
                        })
                      }
                    >
                      Start my project like this →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function needForRoute(id: string) {
  if (id === "sell") return "sell";
  if (id === "platform") return "system";
  if (id === "automation") return "automation";
  return "presence";
}
