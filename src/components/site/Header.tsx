"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { hasInstagram, hasLinkedIn, social } from "@/lib/social";
import { featuredProjects } from "@/data/projects";
import {
  IconInstagram,
  IconLinkedIn,
  IconWhatsApp,
} from "@/components/site/SocialIcons";

const nav = [
  { href: "/work", label: "Work", panel: "work" as const },
  { href: "/capabilities", label: "Capabilities", panel: "capabilities" as const },
  { href: "/about", label: "About", panel: "about" as const },
];

type Panel = "work" | "capabilities" | "about";

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY && y > 120);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close mega-menu on route change, outside click, and Escape
  useEffect(() => {
    setPanel(null);
  }, [pathname]);

  useEffect(() => {
    if (!panel) return;

    const onPointerDown = (e: PointerEvent) => {
      const root = headerRef.current;
      if (root && !root.contains(e.target as Node)) {
        setPanel(null);
      }
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

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-300",
          hidden && !open && !panel ? "-translate-y-full" : "translate-y-0",
        )}
        onMouseLeave={() => setPanel(null)}
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

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setPanel(item.panel)}
              >
                <Link
                  href={item.href}
                  className="text-[13px] tracking-[0.04em] text-kasi-ivory/85 transition hover:text-kasi-ivory"
                  onClick={() => setPanel(null)}
                  onFocus={() => setPanel(item.panel)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            <Link
              href="/faq"
              className="text-[13px] tracking-[0.04em] text-kasi-ivory/85 transition hover:text-kasi-ivory"
              onClick={() => setPanel(null)}
            >
              FAQ
            </Link>
            {hasWhatsApp() && (
              <a
                href={whatsappUrl()}
                onClick={() => {
                  setPanel(null);
                  track("whatsapp_click", { source: "header" });
                }}
                className="text-[13px] tracking-[0.04em] text-kasi-ivory/85 transition hover:text-kasi-green"
              >
                WhatsApp
              </a>
            )}
            <Link
              href="/start"
              onClick={() => {
                setPanel(null);
                track("start_project_click", { source: "header" });
              }}
              className="text-[13px] tracking-[0.04em] text-kasi-ivory transition hover:text-kasi-green"
            >
              Start my project ↗
            </Link>
          </nav>

          <button
            type="button"
            className="text-[13px] tracking-[0.06em] text-kasi-ivory lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* Desktop preview panels */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-[76px] hidden justify-center lg:flex",
            panel ? "pointer-events-auto" : "",
          )}
        >
          {panel && (
            <div className="w-full max-w-[1400px] border-b border-kasi-border bg-kasi-black/95 px-8 py-8 backdrop-blur-md">
              {panel === "work" && (
                <div className="grid gap-8 md:grid-cols-[160px_1fr]">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
                    WORK
                  </p>
                  <div>
                    <p className="mb-4 text-[12px] tracking-[0.14em] text-kasi-grey">
                      Featured
                    </p>
                    <div className="flex flex-wrap gap-6">
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
                    <div className="mt-8 flex flex-wrap gap-6 text-[13px] text-kasi-grey">
                      <Link
                        href="/work/all"
                        className="hover:text-kasi-ivory"
                        onClick={() => setPanel(null)}
                      >
                        Explore all 12 demos →
                      </Link>
                      <Link
                        href="/work#router"
                        className="hover:text-kasi-ivory"
                        onClick={() => setPanel(null)}
                      >
                        Find something for your business →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {panel === "capabilities" && (
                <div className="grid gap-6 md:grid-cols-4">
                  {[
                    {
                      t: "EXPERIENCES",
                      d: "Websites & digital experiences.",
                      href: "/capabilities#experiences",
                    },
                    {
                      t: "COMMERCE",
                      d: "Selling, booking & payments.",
                      href: "/capabilities#commerce",
                    },
                    {
                      t: "SYSTEMS",
                      d: "Platforms & custom software.",
                      href: "/capabilities#systems",
                    },
                    {
                      t: "INTELLIGENCE",
                      d: "Data, AI & automation.",
                      href: "/capabilities#intelligence",
                    },
                  ].map((c) => (
                    <Link
                      key={c.t}
                      href={c.href}
                      className="group"
                      onClick={() => {
                        setPanel(null);
                        track("capability_view", { id: c.t });
                      }}
                    >
                      <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-green">
                        {c.t}
                      </p>
                      <p className="mt-2 text-sm text-kasi-grey group-hover:text-kasi-ivory">
                        {c.d}
                      </p>
                    </Link>
                  ))}
                  <div className="md:col-span-4">
                    <Link
                      href="/capabilities"
                      className="text-[13px] text-kasi-grey hover:text-kasi-ivory"
                      onClick={() => setPanel(null)}
                    >
                      Explore capabilities →
                    </Link>
                  </div>
                </div>
              )}
              {panel === "about" && (
                <div className="flex flex-wrap gap-8">
                  {[
                    { href: "/company", label: "Company" },
                    { href: "/founder", label: "Founder" },
                    { href: "/about#how-we-work", label: "How We Work" },
                    { href: "/faq", label: "FAQ" },
                    { href: "/about", label: "About KasiTech →" },
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

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 bg-kasi-black px-5 pt-28 transition lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav className="flex flex-col gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-4xl tracking-[-0.03em]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/faq"
            className="font-display text-4xl tracking-[-0.03em]"
            onClick={() => setOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/start"
            className="font-display text-4xl tracking-[-0.03em] text-kasi-green"
            onClick={() => {
              setOpen(false);
              track("start_project_click", { source: "mobile_menu" });
            }}
          >
            Start my project ↗
          </Link>
        </nav>
        <div className="mt-16 flex flex-wrap items-center gap-5">
          {hasLinkedIn() && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-kasi-grey hover:text-kasi-green"
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
              className="text-kasi-grey hover:text-kasi-green"
            >
              <IconInstagram />
            </a>
          )}
          {hasWhatsApp() && (
            <a
              href={whatsappUrl()}
              onClick={() => track("whatsapp_click", { source: "mobile_menu" })}
              aria-label="WhatsApp"
              className="text-kasi-grey hover:text-kasi-green"
            >
              <IconWhatsApp />
            </a>
          )}
          <p className="w-full pt-2 font-mono text-[11px] tracking-[0.12em] text-kasi-grey">
            Dar es Salaam, Tanzania
          </p>
        </div>
      </div>
    </>
  );
}
