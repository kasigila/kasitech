"use client";

import { useState } from "react";
import type { CatalogItem } from "@/commercial/types";
import {
  PACKAGE_POSITIONING,
  displayItemPrice,
  billingLabel,
} from "@/commercial/catalog/presentation";
import { cn } from "@/lib/cn";

type Props = {
  packages: CatalogItem[];
  /** packageCode → included feature/entitlement names */
  inclusions: Record<string, string[]>;
};

export function PackageComparison({ packages, inclusions }: Props) {
  const [selected, setSelected] = useState(packages[2]?.code ?? packages[0]?.code);

  const current = packages.find((p) => p.code === selected) ?? packages[0];
  const pos = PACKAGE_POSITIONING[current.code];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Website packages"
        className="flex gap-1 overflow-x-auto border-b border-kasi-border pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {packages.map((p) => (
          <button
            key={p.code}
            type="button"
            role="tab"
            aria-selected={selected === p.code}
            onClick={() => setSelected(p.code)}
            className={cn(
              "shrink-0 px-3 py-3 font-mono text-[10px] tracking-[0.14em] uppercase transition md:px-4",
              selected === p.code
                ? "border-b-2 border-kasi-green text-kasi-ivory"
                : "text-kasi-grey hover:text-kasi-ivory",
            )}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.14em] text-kasi-green">
            {billingLabel(current.billing)}
          </p>
          <h3 className="mt-3 font-display text-3xl tracking-[-0.03em] md:text-4xl">
            {current.name}
          </h3>
          <p
            className={cn(
              "mt-4 font-mono text-xl",
              current.billing === "CUSTOM_QUOTE"
                ? "text-kasi-green"
                : "text-kasi-ivory",
            )}
          >
            {displayItemPrice(current)}
          </p>
          {current.timelineMinDays != null && current.timelineMaxDays != null && (
            <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-kasi-grey">
              TYPICAL DELIVERY · {current.timelineMinDays}–{current.timelineMaxDays}{" "}
              BUSINESS DAYS
            </p>
          )}
          {pos && (
            <>
              <p className="mt-8 text-base leading-relaxed text-kasi-ivory/90">
                {pos.plain}
              </p>
              <p className="mt-4 text-sm text-kasi-grey">
                <span className="text-kasi-green">Best for:</span> {pos.bestFor}
              </p>
            </>
          )}
          <p className="mt-6 text-sm leading-relaxed text-kasi-grey">
            {current.clientDescription}
          </p>
        </div>

        <div className="border border-kasi-border p-5 md:p-6">
          <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-grey">
            INCLUDED WITH THIS PACKAGE
          </p>
          <ul className="mt-4 space-y-2.5">
            {(inclusions[current.code] ?? []).map((name) => (
              <li
                key={name}
                className="flex gap-2 text-sm text-kasi-ivory/85"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-kasi-green" aria-hidden />
                {name}
              </li>
            ))}
          </ul>
          {(inclusions[current.code] ?? []).length === 0 && (
            <p className="mt-4 text-sm text-kasi-grey">Scoped after consultation.</p>
          )}
        </div>
      </div>

      {/* Compact matrix — desktop; stacked on mobile via horizontal scroll */}
      <div className="mt-14 overflow-x-auto">
        <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-grey">
          COMPARE AT A GLANCE
        </p>
        <table className="mt-4 w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-kasi-border">
              <th className="py-3 pr-3 font-mono text-[10px] font-normal tracking-[0.12em] text-kasi-grey">
                PACKAGE
              </th>
              {packages.slice(0, 6).map((p) => (
                <th
                  key={p.code}
                  className={cn(
                    "px-2 py-3 font-mono text-[10px] font-normal tracking-[0.1em] text-kasi-grey",
                    selected === p.code && "text-kasi-green",
                  )}
                >
                  {p.name.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-kasi-border/70">
              <td className="py-3 pr-3 text-kasi-grey">Price</td>
              {packages.slice(0, 6).map((p) => (
                <td key={p.code} className="px-2 py-3 font-mono text-xs text-kasi-ivory">
                  {displayItemPrice(p).replace("TSh ", "")}
                </td>
              ))}
            </tr>
            <tr className="border-b border-kasi-border/70">
              <td className="py-3 pr-3 text-kasi-grey">Delivery</td>
              {packages.slice(0, 6).map((p) => (
                <td key={p.code} className="px-2 py-3 text-xs text-kasi-grey">
                  {p.timelineMinDays != null
                    ? `${p.timelineMinDays}–${p.timelineMaxDays}d`
                    : "—"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-xs text-kasi-grey">
          Custom Platform is quoted after scoping. Delivery windows begin after
          commencement payment and required materials.
        </p>
      </div>
    </div>
  );
}
