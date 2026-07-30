"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

type PackageRow = {
  name: string;
  priceLabel: string;
};

export function CardCatalog({
  version,
  packages,
}: {
  version: string;
  packages: PackageRow[];
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-[10px] tracking-[0.18em] text-kasi-grey">
          SERVICES &amp; PRICING
        </p>
        <p className="font-mono text-[10px] tracking-[0.12em] text-kasi-grey">
          {version}
        </p>
      </div>
      <p className="mt-3 text-sm text-kasi-ivory/80">
        Clear scope. Clear pricing. Built around your business.
      </p>
      <p className="mt-1 text-[12px] text-kasi-grey">
        All prices in Tanzanian Shillings (TSh).
      </p>

      <div className="mt-6">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="flex items-baseline justify-between gap-4 border-b border-kasi-border py-3"
          >
            <span className="text-sm text-kasi-ivory">{pkg.name}</span>
            <span className="shrink-0 text-right font-mono text-[11px] tracking-[0.04em] text-kasi-green">
              {pkg.priceLabel}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <Link
          href="/pricing"
          onClick={() => track("card_view_catalog")}
          className="flex w-full items-center justify-center border border-kasi-green px-6 py-4 text-sm font-medium tracking-[0.06em] text-kasi-green transition hover:bg-kasi-green hover:text-kasi-black"
        >
          VIEW FULL CATALOG
        </Link>
        <a
          href="/api/catalog/pdf"
          onClick={() => track("card_download_catalog")}
          className="flex w-full items-center justify-center border border-kasi-border px-6 py-4 text-sm font-medium tracking-[0.06em] text-kasi-ivory transition hover:border-kasi-green hover:text-kasi-green"
        >
          DOWNLOAD PDF
        </a>
      </div>
    </div>
  );
}
