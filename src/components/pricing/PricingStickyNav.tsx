"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const LINKS = [
  { id: "websites", label: "Websites" },
  { id: "bundles", label: "Bundles" },
  { id: "care", label: "Care" },
  { id: "browse", label: "All services" },
  { id: "custom", label: "Custom" },
] as const;

export function PricingStickyNav() {
  const [active, setActive] = useState<string>("websites");

  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]?.target.id) setActive(vis[0].target.id);
      },
      { rootMargin: "-18% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Pricing sections"
      className="sticky top-[4.5rem] z-30 -mx-5 border-y border-kasi-border/80 bg-kasi-black/90 backdrop-blur-md md:-mx-8 print:hidden"
    >
      <div className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-5 py-3 md:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {LINKS.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "shrink-0 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase transition",
              active === item.id
                ? "bg-kasi-green text-kasi-black"
                : "text-kasi-grey hover:text-kasi-ivory",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
