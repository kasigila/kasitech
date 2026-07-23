"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { getProject } from "@/data/projects";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";

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
          "fixed left-0 right-0 top-0 z-[60] flex h-12 items-center justify-between gap-3 border-b border-black/10 bg-black/80 px-4 text-white backdrop-blur-md",
          className,
        )}
      >
        <Link href="/" className="shrink-0 text-[13px] tracking-wide hover:opacity-80">
          ← KasiTech
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          {hasWhatsApp() && (
            <a
              href={whatsappUrl(
                `Hi KasiTech: I tried the ${project.name} demo and want something similar.`,
              )}
              onClick={() =>
                track("whatsapp_click", { source: `demo_bar_${slug}` })
              }
              className="hidden text-[12px] tracking-wide text-white/85 hover:text-white sm:inline"
            >
              WhatsApp
            </a>
          )}
          <Link
            href={`/start?need=${needForSlug(slug)}`}
            onClick={() =>
              track("start_project_click", { source: `demo_bar_${slug}` })
            }
            className="hidden text-[12px] tracking-wide text-[#C7FF00] hover:opacity-90 sm:inline"
          >
            Start my project
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="font-mono text-[11px] tracking-[0.14em] uppercase hover:opacity-80"
          >
            About +
          </button>
        </div>
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
              <p className="text-kasi-ivory/90">
                Customer View: browse as an end user.
              </p>
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
            <div className="mt-10 space-y-4 border-t border-kasi-border pt-6">
              <p className="text-sm text-kasi-grey">Need something similar?</p>
              <Link
                href={`/start?need=${needForSlug(slug)}`}
                className="inline-block border border-kasi-green bg-kasi-green px-5 py-3 text-sm text-kasi-black"
                onClick={() =>
                  track("start_project_click", { source: `demo_${slug}` })
                }
              >
                START MY PROJECT ↗
              </Link>
              {hasWhatsApp() && (
                <div>
                  <a
                    href={whatsappUrl(
                      `Hi KasiTech: I tried the ${project.name} demo and want something similar.`,
                    )}
                    className="text-sm text-kasi-green hover:underline"
                    onClick={() =>
                      track("whatsapp_click", { source: `demo_panel_${slug}` })
                    }
                  >
                    Or WhatsApp us →
                  </a>
                </div>
              )}
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

function needForSlug(slug: string) {
  if (
    ["zuri", "moto", "noir", "soko", "nest"].includes(slug)
  ) {
    return "sell";
  }
  if (["kasi-flow", "atlas"].includes(slug)) return "system";
  if (slug === "kasi-intelligence") return "automation";
  return "presence";
}
