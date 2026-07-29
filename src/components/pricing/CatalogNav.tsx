"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { catalogNav } from "@/data/catalog";
import { cn } from "@/lib/cn";

export function CatalogNav() {
  const [active, setActive] = useState<string>(catalogNav[0].id);

  useEffect(() => {
    const ids = catalogNav.map((n) => n.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Catalog sections"
      className="sticky top-[4.5rem] z-30 -mx-5 border-y border-kasi-border/80 bg-kasi-black/90 backdrop-blur-md md:-mx-8 print:hidden"
    >
      <div className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-5 py-3 md:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {catalogNav.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "shrink-0 px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase transition",
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
