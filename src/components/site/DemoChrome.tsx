"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { getProject } from "@/data/projects";

type Props = {
  slug: string;
  className?: string;
};

export function DemoChrome({ slug, className }: Props) {
  const [open, setOpen] = useState(false);
  const project = getProject(slug);

  if (!project) return null;

  return (
    <>
      <div
        className={cn(
          "fixed left-0 right-0 top-0 z-[60] flex h-12 items-center justify-between border-b border-black/10 bg-black/80 px-4 text-white backdrop-blur-md",
          className,
        )}
      >
        <Link href="/" className="text-[13px] tracking-wide hover:opacity-80">
          ← KasiTech
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="font-mono text-[11px] tracking-[0.14em] uppercase hover:opacity-80"
        >
          About This Demo +
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] flex justify-end bg-black/50">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close panel"
            onClick={() => setOpen(false)}
          />
          <aside className="relative h-full w-full max-w-md overflow-y-auto bg-[#0d0d0d] p-8 text-kasi-ivory shadow-2xl">
            <button
              type="button"
              className="absolute right-5 top-5 text-kasi-grey"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              KASI CONCEPT / {project.number}
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-[-0.03em]">
              {project.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-kasi-grey">
              {project.description}
            </p>
            <p className="mt-2 text-sm text-kasi-grey">
              What it demonstrates: {project.tags.join(" · ")}
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <p className="text-kasi-ivory/90">Customer View: browse as an end user.</p>
              <p className="text-kasi-ivory/90">
                Business View: look for the ops / admin toggle inside the demo.
              </p>
              <Link
                href={project.caseStudyPath}
                className="block text-kasi-green hover:underline"
                onClick={() => track("case_study_view", { slug })}
              >
                Case Study →
              </Link>
            </div>
            <div className="mt-10 border-t border-kasi-border pt-6">
              <p className="text-sm text-kasi-grey">Need something similar?</p>
              <Link
                href="/start"
                className="mt-3 inline-block text-sm tracking-wide text-kasi-ivory hover:text-kasi-green"
                onClick={() =>
                  track("start_project_click", { source: `demo_${slug}` })
                }
              >
                Start a Project →
              </Link>
            </div>
            <p className="mt-10 font-mono text-[10px] tracking-[0.16em] text-kasi-grey">
              DEMO DATA · FICTIONAL CONCEPT
            </p>
          </aside>
        </div>
      )}
    </>
  );
}
