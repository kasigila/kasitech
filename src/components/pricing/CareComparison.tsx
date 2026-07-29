import type { CatalogItem } from "@/commercial/types";
import { displayItemPrice, billingLabel } from "@/commercial/catalog/presentation";
import { cn } from "@/lib/cn";

type Props = {
  plans: CatalogItem[];
};

/** Care comparison — catalog text only; no invented SLAs/hours. */
export function CareComparison({ plans }: Props) {
  const columns = [
    { code: "NONE", name: "No Care Plan", item: null as CatalogItem | null },
    ...plans.map((p) => ({ code: p.code, name: p.name, item: p })),
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-kasi-border">
            <th className="py-3 pr-4 font-mono text-[10px] font-normal tracking-[0.14em] text-kasi-grey">
              PLAN
            </th>
            {columns.map((c) => (
              <th
                key={c.code}
                className="px-2 py-3 font-mono text-[10px] font-normal tracking-[0.1em] text-kasi-grey"
              >
                {c.name.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-kasi-border/70">
            <td className="py-3.5 pr-4 text-kasi-grey">Price</td>
            {columns.map((c) => (
              <td
                key={c.code}
                className={cn(
                  "px-2 py-3.5 font-mono text-xs",
                  c.item ? "text-kasi-ivory" : "text-kasi-grey",
                )}
              >
                {c.item ? displayItemPrice(c.item) : "—"}
              </td>
            ))}
          </tr>
          <tr className="border-b border-kasi-border/70">
            <td className="py-3.5 pr-4 text-kasi-grey">Billing</td>
            {columns.map((c) => (
              <td key={c.code} className="px-2 py-3.5 text-xs text-kasi-grey">
                {c.item ? billingLabel(c.item.billing) : "—"}
              </td>
            ))}
          </tr>
          <tr className="border-b border-kasi-border/70">
            <td className="py-3.5 pr-4 align-top text-kasi-grey">Scope</td>
            {columns.map((c) => (
              <td key={c.code} className="px-2 py-3.5 text-xs leading-relaxed text-kasi-ivory/80">
                {c.item
                  ? c.item.clientDescription
                  : "Site can remain live if hosting and required third-party services stay active. No KasiTech care entitlement."}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className="mt-4 max-w-2xl text-xs leading-relaxed text-kasi-grey">
        Support hours, response times, backup frequency, and hosting inclusion
        are not listed here unless approved in the Price Book. Ask for a formal
        quotation for operational detail.
      </p>
    </div>
  );
}
