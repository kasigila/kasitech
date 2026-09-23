import Link from "next/link";
import { Notice, PageTitle } from "@/components/business/ui";
import { deleteDeskProduct, duplicateDeskProduct, setDeskAvailability } from "@/lib/business-portal/actions";
import { portalData } from "@/lib/business-portal/client";
import type { DeskProduct } from "@/lib/business-portal/types";

const labels: Record<string, string> = {
  AVAILABLE: "In stock",
  LOW_STOCK: "Low stock",
  OUT_OF_STOCK: "Out of stock",
  HIDDEN: "Hidden",
  NEEDS_CONFIRMATION: "Check availability",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const data = await portalData<{ products: DeskProduct[] }>("catalog");
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <PageTitle title="Products" text="Prices, photos, and availability update the shop immediately." />
        <Link href="/business/unique-trends/products/new" className="inline-flex h-12 items-center bg-kasi-ivory px-5 text-sm text-kasi-black">
          Add product
        </Link>
      </div>
      <Notice saved={params.saved} error={params.error} />
      <div className="space-y-3">
        {data.products.map((product) => (
          <article key={product.id} className="border border-kasi-border p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl">{product.name}</h2>
                <p className="mt-1 text-sm text-kasi-grey">
                  {product.brandName} · TSh {product.price.toLocaleString("en-US")} · {labels[product.availability] || product.availability}
                  {product.publishStatus === "DRAFT" ? " · Draft" : ""}
                </p>
              </div>
              <Link href={`/business/unique-trends/products/${product.id}`} className="text-sm underline">
                Edit
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <form action={setDeskAvailability}>
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="availability" value={product.availability === "OUT_OF_STOCK" ? "AVAILABLE" : "OUT_OF_STOCK"} />
                <button className="h-10 border border-kasi-ivory px-3 text-sm">
                  {product.availability === "OUT_OF_STOCK" ? "Mark in stock" : "Mark out of stock"}
                </button>
              </form>
              <form action={setDeskAvailability}>
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="availability" value="NEEDS_CONFIRMATION" />
                <button className="h-10 border border-kasi-border px-3 text-sm">Needs confirmation</button>
              </form>
              <form action={duplicateDeskProduct}>
                <input type="hidden" name="id" value={product.id} />
                <button className="h-10 border border-kasi-border px-3 text-sm">Duplicate</button>
              </form>
              <form action={deleteDeskProduct}>
                <input type="hidden" name="id" value={product.id} />
                <button className="h-10 border border-kasi-border px-3 text-sm">Delete</button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
