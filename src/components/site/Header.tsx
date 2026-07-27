"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { hasInstagram, hasLinkedIn, social } from "@/lib/social";
import { featuredProjects } from "@/data/projects";
import { shippedWork } from "@/data/shipped-work";
import {
  IconInstagram,
  IconLinkedIn,
  IconWhatsApp,
} from "@/components/site/SocialIcons";

const nav = [
  { href: "/work", label: "Work", panel: "work" as const },
  { href: "/capabilities", label: "Capabilities", panel: "capabilities" as const },
  { href: "/company", label: "Company", panel: "company" as const },
];

type Panel = "work" | "capabilities" | "company";

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const menuTitleId = useId();

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openPanel(next: Panel) {
    clearCloseTimer();
    setPanel(next);
  }

  function scheduleClosePanel() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setPanel(null), 180);
  }

  function closeMobileMenu() {
    setOpen(false);
    queueMicrotask(() => menuButtonRef.current?.focus());
  }

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = mobileMenuRef.current;
    const focusables = () =>
      root?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');

    const first = focusables()?.[0];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobileMenu();
        return;
      }
      const list = Array.from(focusables() ?? []);
      if (e.key !== "Tab" || !list.length) return;
      const start = list[0];
      const end = list[list.length - 1];
      if (e.shiftKey && document.activeElement === start) {
        e.preventDefault();
        end.focus();
      } else if (!e.shiftKey && document.activeElement === end) {
        e.preventDefault();
        start.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!panel) return;
    const onPointerDown = (e: PointerEvent) => {
      const root = headerRef.current;
      if (root && !root.contains(e.target as Node)) setPanel(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanel(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [panel]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50"
        onMouseLeave={scheduleClosePanel}
        onMouseEnter={clearCloseTimer}
      >
        <div
          className={cn(
            "mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 transition-colors md:px-8",
            scrolled || open || panel
              ? "border-b border-kasi-border bg-kasi-black/85 backdrop-blur-md"
              : "bg-transparent",
          )}
        >
          <Link
            href="/"
            className="font-display text-[17px] font-medium tracking-[-0.02em] text-kasi-ivory"
            onClick={() => {
              setOpen(false);
              setPanel(null);
            }}
          >
            KasiTech
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => openPanel(item.panel)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "text-[13px] tracking-[0.04em] transition",
                    isActive(item.href)
                      ? "text-kasi-ivory"
                      : "text-kasi-ivory/75 hover:text-kasi-ivory",
                  )}
                  onClick={() => setPanel(null)}
                  onFocus={() => openPanel(item.panel)}
                  aria-expanded={panel === item.panel}
                  aria-haspopup="true"
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="ml-1.5 inline-block h-1 w-1 rounded-full bg-kasi-green align-middle" />
                  )}
                </Link>
              </div>
            ))}
            <Link
              href="/start"
              onClick={() => {
                setPanel(null);
                track("start_project_click", { source: "header" });
              }}
              className="border border-kasi-green bg-kasi-green px-4 py-2 text-[13px] tracking-[0.04em] text-kasi-black transition hover:bg-transparent hover:text-kasi-green"
            >
              Start a Project →
            </Link>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-[13px] tracking-[0.06em] text-kasi-ivory lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        <div
          className={cn(
            "absolute inset-x-0 top-[76px] hidden justify-center lg:flex",
            panel ? "pointer-events-auto" : "pointer-events-none",
          )}
          onMouseEnter={clearCloseTimer}
        >
          {panel && (
            <div
              className="w-full max-w-[1400px] border-b border-kasi-border bg-kasi-black/95 px-8 py-8 backdrop-blur-md"
              role="region"
              aria-label={`${panel} menu`}
            >
              {panel === "work" && (
                <div className="grid gap-10 md:grid-cols-[160px_1fr_1fr]">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
                    WORK
                  </p>
                  <div>
                    <p className="mb-3 font-mono text-[10px] tracking-[0.14em] text-kasi-green">
                      CLIENT WORK
                    </p>
                    {shippedWork.map((w) => (
                      <Link
                        key={w.id}
                        href={w.caseStudyPath}
                        className="block font-display text-2xl tracking-[-0.03em] text-kasi-ivory hover:text-kasi-green"
                        onClick={() => setPanel(null)}
                      >
                        {w.name}
                      </Link>
                    ))}
                    <Link
                      href="/work#client-work"
                      className="mt-4 inline-block text-[13px] text-kasi-grey hover:text-kasi-ivory"
                      onClick={() => setPanel(null)}
                    >
                      All client work →
                    </Link>
                  </div>
                  <div>
                    <p className="mb-3 font-mono text-[10px] tracking-[0.14em] text-kasi-grey">
                      CONCEPTS
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {featuredProjects.map((p) => (
                        <Link
                          key={p.id}
                          href={p.caseStudyPath}
                          className="font-display text-2xl tracking-[-0.03em] text-kasi-ivory hover:text-kasi-green"
                          onClick={() => setPanel(null)}
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/work#concepts"
                      className="mt-6 inline-block text-[13px] text-kasi-grey hover:text-kasi-ivory"
                      onClick={() => setPanel(null)}
                    >
                      View all concepts →
                    </Link>
                  </div>
                </div>
              )}
              {panel === "capabilities" && (
                <div className="grid gap-6 md:grid-cols-4">
                  {[
                    {
                      t: "WEBSITES & EXPERIENCES",
                      d: "Brand-facing digital products.",
                      href: "/capabilities#experiences",
                    },
                    {
                      t: "COMMERCE & BOOKINGS",
                      d: "Selling, booking & payments.",
                      href: "/capabilities#commerce",
                    },
                    {
                      t: "SOFTWARE & SYSTEMS",
                      d: "Platforms & custom software.",
                      href: "/capabilities#systems",
                    },
                    {
                      t: "DATA, AI & AUTOMATION",
                      d: "Intelligence that reduces friction.",
                      href: "/capabilities#intelligence",
                    },
                  ].map((c) => (
                    <Link
                      key={c.t}
                      href={c.href}
                      className="group block"
                      onClick={() => {
                        setPanel(null);
                        track("capability_view", { id: c.t });
                      }}
                    >
                      <p className="font-mono text-[11px] tracking-[0.14em] text-kasi-green">
                        {c.t}
                      </p>
                      <p className="mt-2 text-sm text-kasi-grey group-hover:text-kasi-ivory">
                        {c.d}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
              {panel === "company" && (
                <div className="flex flex-wrap gap-8">
                  {[
                    { href: "/company", label: "About KasiTech" },
                    { href: "/company#why", label: "Why we exist" },
                    { href: "/company#work", label: "How we work" },
                    { href: "/founder", label: "Founder" },
                    { href: "/faq", label: "FAQ" },
                    { href: "/lab", label: "Kasi Lab" },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="text-sm text-kasi-ivory/80 hover:text-kasi-green"
                      onClick={() => setPanel(null)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-kasi-black px-5 pb-10 pt-28 transition lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none",
        )}
        role="dialog"
        aria-modal={open}
        aria-labelledby={menuTitleId}
        aria-hidden={!open}
      >
        <p id={menuTitleId} className="sr-only">
          Site menu
        </p>
        <nav className="flex flex-1 flex-col justify-center gap-2" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-[clamp(2.5rem,12vw,4rem)] leading-[1.05] tracking-[-0.03em]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/founder"
            className="font-display text-[clamp(2.5rem,12vw,4rem)] leading-[1.05] tracking-[-0.03em]"
            onClick={() => setOpen(false)}
          >
            Founder
          </Link>
          <Link
            href="/start"
            className="mt-6 font-display text-[clamp(2.5rem,12vw,4rem)] leading-[1.05] tracking-[-0.03em] text-kasi-green"
            onClick={() => {
              setOpen(false);
              track("start_project_click", { source: "mobile_menu" });
            }}
          >
            Start a Project →
          </Link>
        </nav>
        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-kasi-border pt-8">
          {hasLinkedIn() && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-kasi-grey hover:text-kasi-green"
            >
              <IconLinkedIn />
            </a>
          )}
          {hasInstagram() && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-kasi-grey hover:text-kasi-green"
            >
              <IconInstagram />
            </a>
          )}
          {hasWhatsApp() && (
            <a
              href={whatsappUrl()}
              onClick={() => track("whatsapp_click", { source: "mobile_menu" })}
              aria-label="WhatsApp"
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-kasi-grey hover:text-kasi-green"
            >
              <IconWhatsApp />
            </a>
          )}
          <p className="w-full pt-2 font-mono text-[11px] tracking-[0.12em] text-kasi-grey">
            Dar es Salaam, Tanzania · Project chat on WhatsApp
          </p>
        </div>
      </div>
    </>
  );
}
