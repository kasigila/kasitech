import Link from "next/link";
import { ConfirmButton } from "@/components/business/confirm-button";
import { Notice, PageTitle } from "@/components/business/ui";
import { deleteDeskProduct, duplicateDeskProduct, setDeskAvailability } from "@/lib/business-portal/actions";
import { portalData } from "@/lib/business-portal/client";
import type { DeskProduct } from "@/lib/business-portal/types";

const labels: Record<string, string> = {
  AVAILABLE: "In stock",
  LOW_STOCK: "Only a few left",
  OUT_OF_STOCK: "Finished",
  HIDDEN: "Hidden",
  NEEDS_CONFIRMATION: "Confirm on WhatsApp",
};

const savedText = "Saved. Customers can see this on the shop now.";

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
        <PageTitle title="Products" text="Change a price or whether something can be ordered. Press the button, then refresh the shop." />
        <Link href="/business/unique-trends/products/new" className="inline-flex h-12 items-center bg-kasi-ivory px-5 text-sm text-kasi-black">
          Add a product
        </Link>
      </div>
      <Notice saved={params.saved} error={params.error} savedText={savedText} />
      <div className="space-y-3">
        {data.products.map((product) => (
          <article key={product.id} className="border border-kasi-border p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl">{product.name}</h2>
                <p className="mt-1 text-sm text-kasi-grey">
                  {product.brandName} · TSh {product.price.toLocaleString("en-US")} · {labels[product.availability] || product.availability}
                  {product.publishStatus === "DRAFT" || product.availability === "HIDDEN" ? " · Not on the shop" : ""}
                </p>
              </div>
              <Link href={`/business/unique-trends/products/${product.id}`} className="inline-flex h-10 items-center bg-kasi-ivory px-4 text-sm text-kasi-black">
                Edit
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <form action={setDeskAvailability}>
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="availability" value={product.availability === "OUT_OF_STOCK" ? "AVAILABLE" : "OUT_OF_STOCK"} />
                <button className="h-10 border border-kasi-ivory px-3 text-sm">
                  {product.availability === "OUT_OF_STOCK" ? "Back in stock" : "Mark as finished"}
                </button>
              </form>
              <form action={setDeskAvailability}>
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="availability" value="NEEDS_CONFIRMATION" />
                <button className="h-10 border border-kasi-border px-3 text-sm">Confirm on WhatsApp</button>
              </form>
              <form action={duplicateDeskProduct}>
                <input type="hidden" name="id" value={product.id} />
                <button className="h-10 border border-kasi-border px-3 text-sm">Make a copy</button>
              </form>
              <form action={deleteDeskProduct}>
                <input type="hidden" name="id" value={product.id} />
                <ConfirmButton message={`Remove ${product.name} from the shop?`} className="h-10 border border-kasi-border px-3 text-sm">
                  Remove
                </ConfirmButton>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
