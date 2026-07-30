import type { CatalogItem } from "@/commercial/types";
import { displayItemPrice } from "@/commercial/catalog/presentation";
import { cn } from "@/lib/cn";

type Props = {
  plans: CatalogItem[];
};

function payLabel(item: CatalogItem): string {
  if (item.billing === "MONTHLY") return "Paid monthly";
  if (item.billing === "ANNUAL") return "Paid yearly";
  if (item.billing === "CUSTOM_QUOTE") return "Ask us";
  return "One-time";
}

/** Care plans as readable cards — no wide spreadsheet. */
export function CareComparison({ plans }: Props) {
  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <li className="border border-kasi-border p-5 md:p-6">
          <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-grey">
            OPTIONAL
          </p>
          <h3 className="mt-3 font-display text-xl tracking-[-0.02em]">
            No Care Plan
          </h3>
          <p className="mt-3 font-mono text-sm text-kasi-grey">—</p>
          <p className="mt-4 text-sm leading-relaxed text-kasi-grey">
            Your site can stay live if hosting stays active. Updates and fixes
            are quoted separately when you need them.
          </p>
        </li>
        {plans.map((plan) => (
          <li key={plan.code} className="border border-kasi-border p-5 md:p-6">
            <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
              {payLabel(plan).toUpperCase()}
            </p>
            <h3 className="mt-3 font-display text-xl tracking-[-0.02em]">
              {plan.name}
            </h3>
            <p
              className={cn(
                "mt-3 font-mono text-sm",
                plan.billing === "CUSTOM_QUOTE"
                  ? "text-kasi-green"
                  : "text-kasi-ivory",
              )}
            >
              {displayItemPrice(plan)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-kasi-ivory/85">
              {plan.clientDescription}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-kasi-grey">
        Exact support hours and response times are confirmed on your quotation —
        not guessed from this page.
      </p>
    </div>
  );
}
