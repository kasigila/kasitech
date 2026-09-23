import { fieldClass, Notice, PageTitle } from "@/components/business/ui";
import { saveDeskOrderStatus } from "@/lib/business-portal/actions";
import { portalData } from "@/lib/business-portal/client";

type Order = {
  id: string;
  reference: string;
  subtotal: number;
  status: string;
  message: string;
  items: { id: string; productName: string; quantity: number; unitPrice: number }[];
};

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const data = await portalData<{ order: Order }>("order", { id });
  const order = data.order;
  return (
    <div className="max-w-3xl">
      <PageTitle title={order.reference} text={`Subtotal TSh ${order.subtotal.toLocaleString("en-US")}`} />
      <Notice saved={query.saved} error={query.error} />
      <ul className="space-y-2 text-sm">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between gap-4 border-b border-kasi-border py-2">
            <span>{item.productName} × {item.quantity}</span>
            <span>TSh {(item.unitPrice * item.quantity).toLocaleString("en-US")}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-kasi-grey">These prices are the ones saved for the order. The WhatsApp text can be edited by the customer, so use this receipt.</p>
      <pre className="mt-3 whitespace-pre-wrap border border-kasi-border p-4 text-sm">{order.message}</pre>
      <form action={saveDeskOrderStatus} className="mt-6 flex flex-wrap items-end gap-3">
        <input type="hidden" name="id" value={order.id} />
        <label className="text-sm">
          Status
          <select name="status" defaultValue={order.status} className={fieldClass}>
            <option value="WHATSAPP_OPENED">Opened on WhatsApp</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </label>
        <button className="h-11 bg-kasi-ivory px-4 text-sm text-kasi-black">Save status</button>
      </form>
    </div>
  );
}
