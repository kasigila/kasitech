import type { BundleView } from "@/commercial/catalog/presentation";
import { cn } from "@/lib/cn";

export function BundlesSection({ bundles }: { bundles: BundleView[] }) {
  return (
    <div className="divide-y divide-kasi-border border-y border-kasi-border">
      {bundles.map((b) => (
        <article key={b.item.code} className="grid gap-6 py-10 md:grid-cols-[1fr_auto] md:gap-12">
          <div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="font-display text-2xl tracking-[-0.03em]">
                {b.item.name}
              </h3>
              <span className="font-mono text-[10px] tracking-[0.14em] text-kasi-grey">
                {b.billingLabel}
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-kasi-ivory/85">
              {b.item.clientDescription}
            </p>

            <p className="mt-6 font-mono text-[10px] tracking-[0.16em] text-kasi-green">
              WHAT&apos;S INCLUDED
            </p>
            <ul className="mt-3 space-y-2">
              {b.chargeComponents.map((c) => (
                <li key={c.code} className="flex flex-wrap justify-between gap-2 text-sm">
                  <span className="text-kasi-ivory/90">{c.name}</span>
                  <span className="font-mono text-xs text-kasi-grey">{c.priceLabel}</span>
                </li>
              ))}
              {b.entitlements.map((e) => (
                <li key={e.code} className="text-sm text-kasi-grey">
                  {e.name}{" "}
                  <span className="font-mono text-[10px] tracking-[0.1em]">
                    · INCLUDED
                  </span>
                </li>
              ))}
            </ul>

            {b.savings?.showSavings &&
              b.savings.individualValueTsh != null &&
              b.savings.savingsTsh != null && (
                <div className="mt-6 grid max-w-md grid-cols-3 gap-3 border border-kasi-border p-4 text-center">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.14em] text-kasi-grey">
                      INDIVIDUAL
                    </p>
                    <p className="mt-1 font-mono text-xs text-kasi-ivory">
                      {b.savings.individualValueTsh.toLocaleString("en-TZ")}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.14em] text-kasi-grey">
                      BUNDLE
                    </p>
                    <p className="mt-1 font-mono text-xs text-kasi-ivory">
                      {(b.item.priceTsh ?? 0).toLocaleString("en-TZ")}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.14em] text-kasi-green">
                      YOU SAVE
                    </p>
                    <p className="mt-1 font-mono text-xs text-kasi-green">
                      {b.savings.savingsTsh.toLocaleString("en-TZ")}
                    </p>
                  </div>
                </div>
              )}
            {b.savings && !b.savings.showSavings && (
              <p className="mt-4 text-xs text-kasi-grey">
                This bundle price covers the listed services. Savings vs buying
                items separately appear when each item has its own listed price.
              </p>
            )}
          </div>
          <p
            className={cn(
              "font-mono text-lg md:pt-1 md:text-right",
              b.billingLabel === "CUSTOM QUOTE"
                ? "text-kasi-green"
                : "text-kasi-ivory",
            )}
          >
            {b.priceLabel}
          </p>
        </article>
      ))}
    </div>
  );
}
