"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CatalogNavId, CatalogServiceView } from "@/commercial/catalog/presentation";
import { CATALOG_NAV, searchCatalog } from "@/commercial/catalog/presentation";
import { cn } from "@/lib/cn";

type Props = {
  items: CatalogServiceView[];
  initialCategory?: CatalogNavId | "all";
};

export function ServiceBrowser({ items, initialCategory = "all" }: Props) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<CatalogNavId | "all">(initialCategory);
  const [billing, setBilling] = useState<"all" | "ONE-TIME" | "PER MONTH" | "PER YEAR" | "CUSTOM QUOTE" | "THIRD-PARTY">("all");
  const [active, setActive] = useState<CatalogServiceView | null>(null);

  const filtered = useMemo(() => {
    let list = searchCatalog(q, items);
    if (category !== "all") list = list.filter((i) => i.navId === category);
    if (billing !== "all") list = list.filter((i) => i.billingLabel === billing);
    return list;
  }, [q, category, billing, items]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 border border-kasi-border bg-[#0c0c0c] p-4 md:p-5">
        <label className="block">
          <span className="font-mono text-[10px] tracking-[0.16em] text-kasi-grey">
            SEARCH
          </span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Try appointments, restaurant, school, Instagram…"
            className="mt-2 w-full border border-kasi-border bg-kasi-black px-3 py-2.5 text-sm text-kasi-ivory placeholder:text-kasi-grey/60 focus:border-kasi-green focus:outline-none"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={category === "all"}
            onClick={() => setCategory("all")}
            label="All"
          />
          {CATALOG_NAV.map((n) => (
            <FilterChip
              key={n.id}
              active={category === n.id}
              onClick={() => setCategory(n.id)}
              label={n.label}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              "all",
              "ONE-TIME",
              "PER MONTH",
              "PER YEAR",
              "CUSTOM QUOTE",
              "THIRD-PARTY",
            ] as const
          ).map((b) => (
            <FilterChip
              key={b}
              active={billing === b}
              onClick={() => setBilling(b)}
              label={b === "all" ? "Any billing" : b}
            />
          ))}
        </div>
        <p className="font-mono text-[11px] text-kasi-grey">
          {filtered.length} services · prices from KT-PB-2026.1
        </p>
      </div>

      <ul className="mt-6 divide-y divide-kasi-border border-t border-kasi-border">
        {filtered.map((v) => (
          <li key={v.item.code}>
            <button
              type="button"
              onClick={() => setActive(v)}
              className="grid w-full gap-2 py-5 text-left transition hover:bg-white/[0.02] sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
            >
              <div>
                <p className="text-[15px] text-kasi-ivory">{v.item.name}</p>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-kasi-grey">
                  {v.item.clientDescription}
                </p>
                <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-kasi-grey/80">
                  {v.billingLabel}
                  {v.industries[0] ? ` · ${v.industries[0].toUpperCase()}` : ""}
                  {v.upgradeIncludes ? ` · ${v.upgradeIncludes.toUpperCase()}` : ""}
                </p>
              </div>
              <p
                className={cn(
                  "font-mono text-sm sm:text-right",
                  v.billingLabel === "CUSTOM QUOTE"
                    ? "text-kasi-green"
                    : "text-kasi-ivory",
                )}
              >
                {v.priceLabel}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-8 text-sm text-kasi-grey">
          No services match. Try another word or clear filters.
        </p>
      )}

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 md:items-center md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-detail-title"
          onClick={() => setActive(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-kasi-border bg-kasi-black p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-grey">
              {active.billingLabel} · {active.item.category.toUpperCase()}
            </p>
            <h3
              id="service-detail-title"
              className="mt-3 font-display text-2xl tracking-[-0.03em]"
            >
              {active.item.name}
            </h3>
            <p
              className={cn(
                "mt-4 font-mono text-lg",
                active.billingLabel === "CUSTOM QUOTE"
                  ? "text-kasi-green"
                  : "text-kasi-ivory",
              )}
            >
              {active.priceLabel}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-kasi-ivory/85">
              {active.item.clientDescription}
            </p>
            <div className="mt-6 border-t border-kasi-border pt-5">
              <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
                WHAT THIS MEANS
              </p>
              <p className="mt-2 text-sm leading-relaxed text-kasi-grey">
                {active.whatThisMeans}
              </p>
            </div>
            {active.upgradeIncludes && (
              <p className="mt-4 text-sm text-kasi-green">{active.upgradeIncludes}</p>
            )}
            {active.includedInPackages.length > 0 && (
              <p className="mt-4 text-sm text-kasi-grey">
                Included in package(s): {active.includedInPackages.join(", ")}
              </p>
            )}
            {active.includedInBundles.length > 0 && (
              <p className="mt-2 text-sm text-kasi-grey">
                Included in bundle(s): {active.includedInBundles.join(", ")}
              </p>
            )}
            {active.billingLabel === "THIRD-PARTY" && (
              <p className="mt-4 text-sm text-kasi-grey">
                Third-party cost — disclosed and approved before purchase. Not
                KasiTech service revenue.
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/start"
                className="border border-kasi-green bg-kasi-green px-4 py-2.5 text-sm text-kasi-black"
              >
                Ask about this →
              </Link>
              <Link
                href="/demo-studio"
                className="border border-kasi-border px-4 py-2.5 text-sm text-kasi-ivory hover:border-kasi-green/50"
              >
                See in Demo Studio →
              </Link>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="text-sm text-kasi-grey hover:text-kasi-ivory"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase transition",
        active
          ? "bg-kasi-green text-kasi-black"
          : "border border-kasi-border text-kasi-grey hover:text-kasi-ivory",
      )}
    >
      {label}
    </button>
  );
}
