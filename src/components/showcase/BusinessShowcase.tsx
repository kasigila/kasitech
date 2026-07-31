"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { projects, type Project } from "@/data/projects";
import { projectCovers } from "@/data/images";
import {
  businessIndustries,
  type BusinessIndustryId,
} from "@/data/business-industries";
import { SafeImage } from "@/components/ui/SafeImage";
import { BuyCtas } from "@/components/site/BuyCtas";
import { IndustryIcon } from "@/components/home/IndustryIcons";
import { cn } from "@/lib/cn";

const industryToProjectSlug: Partial<Record<BusinessIndustryId, string>> = {
  restaurant: "moto",
  hotel: "zuri",
  clinic: "afya",
  retail: "soko",
  construction: "kasi-flow",
  "real-estate": "nest",
  education: "nuru",
  professional: "amani",
};

function ExperienceCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col border border-kasi-border">
      <Link
        href={project.demoPath}
        aria-label={`Explore ${project.name} for ${project.industry}`}
        className="relative block aspect-[16/10] overflow-hidden bg-kasi-border"
      >
        <SafeImage
          src={projectCovers[project.slug] ?? projectCovers.zuri}
          alt=""
          fill
          className="object-cover object-top"
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
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href={project.demoPath}
            className="border border-kasi-green bg-kasi-green px-4 py-2 text-kasi-black"
          >
            Explore →
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

export function BusinessShowcase() {
  const searchParams = useSearchParams();
  const industryParam = searchParams.get("industry") as BusinessIndustryId | null;

  const highlighted = useMemo(() => {
    if (!industryParam) return null;
    return businessIndustries.find((i) => i.id === industryParam) ?? null;
  }, [industryParam]);

  const orderedProjects = useMemo(() => {
    if (!highlighted) return projects;
    const slug = industryToProjectSlug[highlighted.id];
    if (!slug) return projects;
    const match = projects.find((p) => p.slug === slug);
    if (!match) return projects;
    return [match, ...projects.filter((p) => p.slug !== slug)];
  }, [highlighted]);

  return (
    <div className="px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          BUSINESS SHOWCASE
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
          BUILT FOR
          <br />
          YOUR KIND OF BUSINESS.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-kasi-grey md:text-lg">
          Explore examples of websites, commerce, and systems designed around
          how different industries actually work.
        </p>

        {highlighted ? (
          <div className="mt-10 border border-kasi-border px-5 py-5 md:px-6">
            <div className="flex flex-wrap items-start gap-4">
              <span className="flex h-11 w-11 items-center justify-center border border-kasi-green text-kasi-green">
                <IndustryIcon id={highlighted.id} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
                  DESIGNED FOR
                </p>
                <h2 className="mt-2 font-display text-2xl tracking-[-0.03em]">
                  {highlighted.name}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-kasi-grey">
                  {highlighted.description}{" "}
                  {highlighted.projectSlug
                    ? "Explore the experience below, or start a project shaped around your operations."
                    : "We do not have a public example for this industry yet — tell us what you run and we will shape the right system."}
                </p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  {highlighted.projectSlug ? (
                    <Link
                      href={highlighted.href}
                      className="border border-kasi-green bg-kasi-green px-4 py-2 text-kasi-black"
                    >
                      Explore this industry →
                    </Link>
                  ) : null}
                  <Link
                    href={`/start?need=sell&industry=${highlighted.id}`}
                    className="border border-kasi-border px-4 py-2 hover:border-kasi-green"
                  >
                    Start a project →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-8">
          <BuyCtas source="showcase" compact />
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          <Link
            href="/showcase"
            className={cn(
              "min-h-11 border px-4 py-2 font-mono text-[11px] tracking-[0.12em] transition",
              !highlighted
                ? "border-kasi-green bg-kasi-green text-kasi-black"
                : "border-kasi-border text-kasi-grey hover:border-kasi-grey hover:text-kasi-ivory",
            )}
          >
            ALL
          </Link>
          {businessIndustries.map((industry) => (
            <Link
              key={industry.id}
              href={`/showcase?industry=${industry.id}`}
              className={cn(
                "min-h-11 border px-4 py-2 font-mono text-[11px] tracking-[0.12em] transition",
                highlighted?.id === industry.id
                  ? "border-kasi-green bg-kasi-green text-kasi-black"
                  : "border-kasi-border text-kasi-grey hover:border-kasi-grey hover:text-kasi-ivory",
              )}
            >
              {industry.name.toUpperCase()}
            </Link>
          ))}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orderedProjects.map((project) => (
            <ExperienceCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-20 border-t border-kasi-border pt-12">
          <h2 className="font-display text-3xl tracking-[-0.03em] md:text-4xl">
            Don&apos;t see your industry?
          </h2>
          <p className="mt-4 max-w-lg text-kasi-grey">
            Every business is different. Tell us what you run and we&apos;ll
            shape the right system for it.
          </p>
          <Link
            href="/start"
            className="mt-8 inline-flex min-h-12 items-center border border-kasi-green bg-kasi-green px-6 py-3 text-sm tracking-wide text-kasi-black transition hover:bg-transparent hover:text-kasi-green"
          >
            START A PROJECT →
          </Link>
        </div>
      </div>
    </div>
  );
}
