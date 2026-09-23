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
    ["Only a few left", stats.lowStock],
    ["Finished", stats.outOfStock],
    ["Confirm on WhatsApp", stats.needsConfirmation],
    ["Orders", stats.orders],
  ];
  return (
    <div>
      <PageTitle title="Unique Trends TZ" text="Change a price under Products. Change the phone number, Instagram, or about text under Shop details. Then refresh the shop to see it." />
      <Notice saved={params.saved} error={params.error} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={String(label)} className="border border-kasi-border p-5">
            <p className="text-sm text-kasi-grey">{label}</p>
            <p className="mt-2 font-display text-4xl">{value}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-kasi-grey">Someone opened WhatsApp from the shop {stats.whatsappClicks} times.</p>
    </div>
  );
}
