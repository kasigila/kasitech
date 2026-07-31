"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  businessIndustries,
  getHomepagePreviews,
  SHOWCASE_HREF,
  type BusinessIndustry,
  type BusinessIndustryId,
} from "@/data/business-industries";
import { IndustryIcon } from "@/components/home/IndustryIcons";
import { SafeImage } from "@/components/ui/SafeImage";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const ease = [0.22, 1, 0.36, 1] as const;

export function FindYourBusiness() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previews = getHomepagePreviews();

  function openModal() {
    track("portfolio_route", { id: "find_your_business", source: "home" });
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    queueMicrotask(() => triggerRef.current?.focus());
  }

  return (
    <div id="explore" className="mt-20 md:mt-24">
      <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
        BUSINESS EXAMPLES
      </p>
      <h2 className="mt-4 max-w-3xl font-display text-3xl leading-[1.05] tracking-[-0.04em] md:text-5xl">
        Explore businesses we&apos;ve built.
      </h2>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-kasi-grey md:text-lg">
        Explore interactive examples of websites, business systems and digital
        experiences built for different industries.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
        {previews.map((industry) => (
          <PreviewCard key={industry.id} industry={industry} />
        ))}
      </div>

      <div className="mt-12 md:mt-14">
        <button
          ref={triggerRef}
          type="button"
          onClick={openModal}
          className="min-h-14 border border-kasi-green bg-kasi-green px-8 py-4 text-base tracking-wide text-kasi-black transition hover:bg-transparent hover:text-kasi-green md:min-h-16 md:px-10 md:text-lg"
        >
          Find Your Business →
        </button>
      </div>

      <IndustryModal open={open} onClose={closeModal} />
    </div>
  );
}

function PreviewCard({ industry }: { industry: BusinessIndustry }) {
  return (
    <article className="border border-kasi-border bg-kasi-black">
      <div className="relative aspect-[16/10] overflow-hidden bg-kasi-border">
        {industry.cover ? (
          <SafeImage
            src={industry.cover}
            alt=""
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, 33vw"
            fallbackLabel={industry.name}
          />
        ) : null}
      </div>
      <div className="p-5">
        <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
          {industry.name.toUpperCase()}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-kasi-grey">
          {industry.description}
        </p>
      </div>
    </article>
  );
}

function IndustryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? <IndustryModalPanel key="industry-modal" onClose={onClose} /> : null}
    </AnimatePresence>
  );
}

function IndustryModalPanel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const titleId = useId();
  const subtitleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selected, setSelected] = useState<BusinessIndustryId | "all" | null>(
    null,
  );
  const navigatingRef = useRef(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const root = dialogRef.current;
    const getFocusable = () =>
      Array.from(
        root?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.getAttribute("aria-hidden") !== "true");

    const focusTimer = window.setTimeout(() => {
      getFocusable()[0]?.focus();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !root) return;
      const list = getFocusable();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  function goTo(href: string, industryId: string) {
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    track("demo_launch", {
      slug: industryId,
      source: "find_your_business_modal",
    });
    const delay = prefersReducedMotion ? 0 : 320;
    window.setTimeout(() => {
      onClose();
      router.push(href);
    }, delay);
  }

  function selectIndustry(industry: BusinessIndustry) {
    setSelected(industry.id);
    goTo(industry.href, industry.id);
  }

  function selectAll() {
    setSelected("all");
    goTo(SHOWCASE_HREF, "all");
  }

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
    >
      <button
        type="button"
        aria-label="Close industry selector"
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={subtitleId}
        tabIndex={-1}
        className="relative z-10 flex max-h-[92svh] w-full max-w-3xl flex-col border border-kasi-border bg-kasi-black shadow-2xl sm:max-h-[85vh]"
        initial={
          prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
        }
        animate={{ opacity: 1, y: 0 }}
        exit={
          prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
        }
        transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-kasi-border px-5 py-5 md:px-8 md:py-6">
          <div>
            <h2
              id={titleId}
              className="font-display text-2xl tracking-[-0.03em] md:text-3xl"
            >
              Find your business
            </h2>
            <p
              id={subtitleId}
              className="mt-2 max-w-lg text-sm leading-relaxed text-kasi-grey"
            >
              Choose an industry to explore examples of how KasiTech can design
              technology around your business.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="min-h-11 min-w-11 shrink-0 border border-kasi-border px-3 font-mono text-[11px] tracking-[0.14em] text-kasi-grey transition hover:border-kasi-green hover:text-kasi-green"
          >
            ESC
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 md:px-8 md:py-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {businessIndustries.map((industry) => {
              const isSelected = selected === industry.id;
              return (
                <button
                  key={industry.id}
                  type="button"
                  onClick={() => selectIndustry(industry)}
                  className={cn(
                    "group flex min-h-[4.5rem] items-start gap-4 border px-4 py-4 text-left transition",
                    isSelected
                      ? "border-kasi-green bg-kasi-green/10"
                      : "border-kasi-border hover:border-kasi-green hover:bg-kasi-green/[0.04]",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border transition",
                      isSelected
                        ? "border-kasi-green text-kasi-green"
                        : "border-kasi-border text-kasi-ivory group-hover:border-kasi-green group-hover:text-kasi-green",
                    )}
                  >
                    <IndustryIcon id={industry.id} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg tracking-[-0.02em]">
                      {industry.name}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] tracking-[0.12em] text-kasi-grey">
                      {industry.capabilities}
                    </span>
                  </span>
                  <motion.span
                    aria-hidden
                    className="ml-auto mt-1 font-mono text-[10px] tracking-[0.14em] text-kasi-green"
                    initial={false}
                    animate={
                      isSelected
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -4 }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={selectAll}
            className={cn(
              "mt-5 flex min-h-14 w-full items-center justify-between border px-5 py-4 text-left transition",
              selected === "all"
                ? "border-kasi-green bg-kasi-green text-kasi-black"
                : "border-kasi-border text-kasi-ivory hover:border-kasi-green",
            )}
          >
            <span>
              <span className="block font-display text-lg tracking-[-0.02em]">
                View All Industries
              </span>
              <span className="mt-1 block text-sm text-current/70">
                Browse the complete Business Showcase
              </span>
            </span>
            <span className="font-mono text-[11px] tracking-[0.14em]">→</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
