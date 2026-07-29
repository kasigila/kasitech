"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CATALOG_NAV, type CatalogNavId } from "@/commercial/catalog/presentation";
import { cn } from "@/lib/cn";

const IDS: CatalogNavId[] = [
  "websites",
  "features",
  "bundles",
  "industries",
  "care",
  "kasitech-business",
  "custom",
];

export function PricingStickyNav() {
  const [active, setActive] = useState<string>("websites");

  useEffect(() => {
    const els = IDS.map((id) => document.getElementById(id)).filter(
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

  const links = CATALOG_NAV.filter((n) =>
    [
      "websites",
      "features",
      "booking",
      "bundles",
      "industries",
      "seo",
      "care",
      "kasitech-business",
      "custom",
    ].includes(n.id),
  );

  return (
    <nav
      aria-label="Catalog sections"
      className="sticky top-[4.5rem] z-30 -mx-5 border-y border-kasi-border/80 bg-kasi-black/90 backdrop-blur-md md:-mx-8 print:hidden"
    >
      <div className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-5 py-3 md:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {links.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id === "features" ? "browse" : item.id}`}
            className={cn(
              "shrink-0 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase transition",
              active === item.id ||
                (item.id === "features" && active === "browse")
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
