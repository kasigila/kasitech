import Link from "next/link";
import { Notice, PageTitle } from "@/components/business/ui";
import { portalData } from "@/lib/business-portal/client";

type OrderRow = { id: string; reference: string; subtotal: number; status: string; createdAt: string; itemCount: number };

const statusLabels: Record<string, string> = {
  WHATSAPP_OPENED: "Sent on WhatsApp",
  CONFIRMED: "Confirmed",
  COMPLETED: "Done",
  CANCELLED: "Cancelled",
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const data = await portalData<{ orders: OrderRow[] }>("orders");
  return (
    <div>
      <PageTitle title="Orders" text="These are the orders customers started from the shop. You still agree payment and delivery on WhatsApp." />
      <Notice saved={params.saved} error={params.error} />
      {data.orders.length === 0 ? <p className="text-sm text-kasi-grey">No orders yet.</p> : null}
      <div className="space-y-3">
        {data.orders.map((order) => (
          <Link key={order.id} href={`/business/unique-trends/orders/${order.id}`} className="block border border-kasi-border p-4">
            <p className="font-display text-2xl">{order.reference}</p>
            <p className="mt-1 text-sm text-kasi-grey">
              {order.itemCount} items · TSh {order.subtotal.toLocaleString("en-US")} · {statusLabels[order.status] || order.status}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
