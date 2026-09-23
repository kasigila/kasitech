import { Notice, PageTitle } from "@/components/business/ui";
import { portalData } from "@/lib/business-portal/client";

export default async function UniqueTrendsHome({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const stats = await portalData<{
    total: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
    needsConfirmation: number;
    orders: number;
    whatsappClicks: number;
  }>("dashboard");
  const cards = [
    ["Products", stats.total],
    ["In stock", stats.inStock],
    ["Low stock", stats.lowStock],
    ["Out of stock", stats.outOfStock],
    ["Needs confirmation", stats.needsConfirmation],
    ["WhatsApp orders", stats.orders],
  ];
  return (
    <div>
      <PageTitle title="Overview" text="A simple view of Unique Trends TZ." />
      <Notice saved={params.saved} error={params.error} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={String(label)} className="border border-kasi-border p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-kasi-grey">{label}</p>
            <p className="mt-2 font-display text-4xl">{value}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-kasi-grey">WhatsApp checkout clicks: {stats.whatsappClicks}</p>
    </div>
  );
}
