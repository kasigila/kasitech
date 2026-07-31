"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const project = getProject(slug);

  const closePanel = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const returnFocusTo = triggerRef.current ?? previouslyFocused;
    const panel = panelRef.current;

    const getFocusable = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          [
            "a[href]",
            "button:not([disabled])",
            "textarea:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            "[tabindex]:not([tabindex='-1'])",
          ].join(","),
        ) ?? [],
      ).filter(
        (el) =>
          !el.hasAttribute("disabled") &&
          el.getAttribute("aria-hidden") !== "true",
      );

    const focusTimer = window.setTimeout(() => {
      const [first] = getFocusable();
      (first ?? panel)?.focus();
    }, 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (!panel.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      returnFocusTo?.focus();
    };
  }, [closePanel, open]);

  if (!project) return null;

  return (
    <>
      <div
        className={cn(
          "fixed left-0 right-0 top-0 z-[60] flex min-h-14 items-center justify-between gap-2 border-b border-black/10 bg-black/90 px-3 text-white shadow-lg shadow-black/20 backdrop-blur-md sm:h-12 sm:min-h-12 sm:gap-3 sm:px-4",
          className,
        )}
      >
        <Link
          href="/"
          className="flex min-h-11 min-w-0 shrink items-center text-[13px] tracking-wide hover:opacity-80"
        >
          <span className="truncate sm:hidden">← KasiTech</span>
          <span className="hidden sm:inline">← KasiTech</span>
        </Link>
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          {hasWhatsApp() && (
            <a
              href={whatsappUrl(
                `Hi KasiTech: I explored the ${project.name} experience and want something similar.`,
              )}
              onClick={() =>
                track("whatsapp_click", { source: `experience_bar_${slug}` })
              }
              className="hidden min-h-11 items-center text-[12px] tracking-wide text-white/85 hover:text-white sm:inline-flex"
            >
              WhatsApp
            </a>
          )}
          <Link
            href={`/start?need=${needForSlug(slug)}`}
            onClick={() =>
              track("start_project_click", { source: `experience_bar_${slug}` })
            }
            className="inline-flex min-h-11 shrink-0 items-center border border-kasi-green bg-kasi-green px-3 text-[11px] font-medium tracking-[0.08em] text-kasi-black hover:brightness-95 sm:border-0 sm:bg-transparent sm:px-0 sm:text-[12px] sm:font-normal sm:tracking-wide sm:text-[#C7FF00] sm:hover:opacity-90"
          >
            <span className="sm:hidden">Start a project</span>
            <span className="hidden sm:inline">Start my project</span>
          </Link>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex min-h-11 shrink-0 items-center px-1 font-mono text-[11px] tracking-[0.14em] uppercase hover:opacity-80 sm:px-0"
            aria-haspopup="dialog"
            aria-expanded={open}
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
            onClick={closePanel}
          />
          <aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-about-title"
            tabIndex={-1}
            className="relative h-full w-full max-w-md overflow-y-auto bg-[#0d0d0d] p-8 text-kasi-ivory shadow-2xl"
          >
            <button
              type="button"
              className="absolute right-5 top-5 inline-flex min-h-11 items-center px-1 text-kasi-grey hover:text-kasi-ivory"
              onClick={closePanel}
            >
              Close
            </button>
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
              BUSINESS EXAMPLE / {project.number}
            </p>
            <h2
              id="demo-about-title"
              className="mt-4 font-display text-3xl tracking-[-0.03em]"
            >
              {project.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-kasi-grey">
              {project.description}
            </p>
            <p className="mt-2 text-sm text-kasi-grey">
              Built around: {project.tags.join(" · ")}
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <p className="text-kasi-ivory/90">
                Customer View: browse as an end user.
              </p>
              <p className="text-kasi-ivory/90">
                Business View: look for the ops / admin toggle inside the
                experience.
              </p>
              <Link
                href={project.caseStudyPath}
                className="flex min-h-11 items-center text-kasi-green hover:underline"
                onClick={() => track("case_study_view", { slug })}
              >
                Case Study →
              </Link>
            </div>
            <div className="mt-10 space-y-4 border-t border-kasi-border pt-6">
              <p className="text-sm text-kasi-grey">Need something similar?</p>
              <Link
                href={`/start?need=${needForSlug(slug)}`}
                className="inline-flex min-h-11 items-center border border-kasi-green bg-kasi-green px-5 text-sm text-kasi-black"
                onClick={() =>
                  track("start_project_click", {
                    source: `experience_${slug}`,
                  })
                }
              >
                START MY PROJECT ↗
              </Link>
              {hasWhatsApp() && (
                <div>
                  <a
                    href={whatsappUrl(
                      `Hi KasiTech: I explored the ${project.name} experience and want something similar.`,
                    )}
                    className="inline-flex min-h-11 items-center text-sm text-kasi-green hover:underline"
                    onClick={() =>
                      track("whatsapp_click", {
                        source: `experience_panel_${slug}`,
                      })
                    }
                  >
                    Or WhatsApp us →
                  </a>
                </div>
              )}
            </div>
            <p className="mt-10 font-mono text-[10px] tracking-[0.16em] text-kasi-grey">
              EXAMPLE DATA · ILLUSTRATIVE EXPERIENCE
            </p>
          </aside>
        </div>
      )}
    </>
  );
}

function needForSlug(slug: string) {
  if (
    ["zuri", "moto", "noir", "soko", "nest", "glow"].includes(slug)
  ) {
    return "sell";
  }
  if (["kasi-flow", "atlas"].includes(slug)) return "system";
  if (slug === "kasi-intelligence") return "automation";
  return "presence";
}
