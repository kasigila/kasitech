"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type {
  CatalogNavId,
  CatalogServiceView,
} from "@/commercial/catalog/presentation";
import {
  CATALOG_NAV,
  INDUSTRIES,
  searchCatalog,
} from "@/commercial/catalog/presentation";
import { cn } from "@/lib/cn";

type Props = {
  items: CatalogServiceView[];
  initialCategory?: CatalogNavId | "all";
};

const PRIMARY_CATEGORIES: (CatalogNavId | "all")[] = [
  "all",
  "websites",
  "features",
  "booking",
  "payments",
  "ecommerce",
  "seo",
  "care",
  "bundles",
];

const BILLING_OPTIONS = [
  { id: "all", label: "Any price type" },
  { id: "ONE-TIME", label: "Pay once" },
  { id: "PER MONTH", label: "Monthly" },
  { id: "PER YEAR", label: "Yearly" },
  { id: "CUSTOM QUOTE", label: "Ask us" },
] as const;

const PAGE_SIZE = 12;

function friendlyBilling(label: string): string {
  switch (label) {
    case "ONE-TIME":
      return "Pay once";
    case "PER MONTH":
      return "Monthly";
    case "PER YEAR":
      return "Yearly";
    case "CUSTOM QUOTE":
      return "Ask us";
    case "THIRD-PARTY":
      return "Paid to others";
    default:
      return label;
  }
}

function categoryLabel(id: CatalogNavId | "all"): string {
  if (id === "all") return "All";
  return CATALOG_NAV.find((n) => n.id === id)?.label ?? id;
}

function ServiceBrowserInner({
  items,
  initialCategory = "all",
  seededQuery,
  industryId,
}: Props & { seededQuery: string; industryId: string | null }) {
  const industry = INDUSTRIES.find((i) => i.id === industryId);

  const [q, setQ] = useState(seededQuery);
  const [category, setCategory] = useState<CatalogNavId | "all">(initialCategory);
  const [billing, setBilling] =
    useState<(typeof BILLING_OPTIONS)[number]["id"]>("all");
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [pages, setPages] = useState(1);
  const [active, setActive] = useState<CatalogServiceView | null>(null);

  const filtered = useMemo(() => {
    let list = searchCatalog(q, items);
    if (category !== "all") list = list.filter((i) => i.navId === category);
    if (billing !== "all") list = list.filter((i) => i.billingLabel === billing);
    if (industry && !q) {
      const needle = industry.label.toLowerCase();
      list = list.filter((i) =>
        i.industries.some((name) => name.toLowerCase() === needle),
      );
    }
    return list;
  }, [q, category, billing, items, industry]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const categories = showMoreCategories
    ? (["all", ...CATALOG_NAV.map((n) => n.id)] as (CatalogNavId | "all")[])
    : PRIMARY_CATEGORIES;

  const visibleCount = pages * PAGE_SIZE;
  const visible = filtered.slice(0, visibleCount);

  function updateQuery(next: string) {
    setQ(next);
    setPages(1);
  }

  function updateCategory(next: CatalogNavId | "all") {
    setCategory(next);
    setPages(1);
  }

  function updateBilling(next: (typeof BILLING_OPTIONS)[number]["id"]) {
    setBilling(next);
    setPages(1);
  }

  return (
    <div>
      <div className="border border-kasi-border bg-[#0c0c0c] p-4 md:p-5">
        <label className="block">
          <span className="font-mono text-[10px] tracking-[0.16em] text-kasi-grey">
            SEARCH IN PLAIN WORDS
          </span>
          <input
            type="search"
            value={q}
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Try salon, booking, restaurant, school…"
            className="mt-2 w-full border border-kasi-border bg-kasi-black px-3 py-2.5 text-sm text-kasi-ivory placeholder:text-kasi-grey/60 focus:border-kasi-green focus:outline-none"
          />
        </label>

        {industry && (
          <p className="mt-3 text-sm text-kasi-grey">
            Showing results for{" "}
            <span className="text-kasi-ivory">{industry.label}</span>
            .{" "}
            <Link href="/pricing#browse" className="text-kasi-green hover:underline">
              Clear
            </Link>
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((id) => (
            <FilterChip
              key={id}
              active={category === id}
              onClick={() => updateCategory(id)}
              label={categoryLabel(id)}
            />
          ))}
          {!showMoreCategories && (
            <FilterChip
              active={false}
              onClick={() => setShowMoreCategories(true)}
              label="More"
            />
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {BILLING_OPTIONS.map((b) => (
            <FilterChip
              key={b.id}
              active={billing === b.id}
              onClick={() => updateBilling(b.id)}
              label={b.label}
            />
          ))}
        </div>

        <p className="mt-4 font-mono text-[11px] text-kasi-grey">
          {filtered.length} service{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <ul className="mt-6 divide-y divide-kasi-border border-t border-kasi-border">
        {visible.map((v) => (
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
                  {friendlyBilling(v.billingLabel)}
                  {v.industries[0] ? ` · ${v.industries[0].toUpperCase()}` : ""}
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
          Nothing matched. Try a simpler word — like booking, shop, or salon —
          or clear the search.
        </p>
      )}

      {visibleCount < filtered.length && (
        <button
          type="button"
          onClick={() => setPages((n) => n + 1)}
          className="mt-8 border border-kasi-border px-5 py-3 text-sm text-kasi-ivory transition hover:border-kasi-green hover:text-kasi-green"
        >
          Show more ({filtered.length - visibleCount} left)
        </button>
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
              {friendlyBilling(active.billingLabel)}
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
                IN SIMPLE TERMS
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
                Already included in: {active.includedInPackages.join(", ")}
              </p>
            )}
            {active.includedInBundles.length > 0 && (
              <p className="mt-2 text-sm text-kasi-grey">
                Also in bundle(s): {active.includedInBundles.join(", ")}
              </p>
            )}
            {active.billingLabel === "THIRD-PARTY" && (
              <p className="mt-4 text-sm text-kasi-grey">
                Paid to another company (for example domain or hosting). We tell
                you before you approve.
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/start"
                className="border border-kasi-green bg-kasi-green px-4 py-2.5 text-sm text-kasi-black"
              >
                Ask about this →
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

function ServiceBrowserFromUrl(props: Props) {
  const searchParams = useSearchParams();
  const urlQ = searchParams.get("q") ?? "";
  const industryId = searchParams.get("industry");
  const industry = INDUSTRIES.find((i) => i.id === industryId);
  const seededQuery =
    urlQ ||
    (industry ? industry.tags[0] ?? industry.label.split(" / ")[0] : "");
  const remountKey = `${industryId ?? ""}::${seededQuery}`;

  return (
    <ServiceBrowserInner
      key={remountKey}
      {...props}
      seededQuery={seededQuery}
      industryId={industryId}
    />
  );
}

export function ServiceBrowser(props: Props) {
  return (
    <Suspense
      fallback={
        <p className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
          Loading services…
        </p>
      }
    >
      <ServiceBrowserFromUrl {...props} />
    </Suspense>
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
