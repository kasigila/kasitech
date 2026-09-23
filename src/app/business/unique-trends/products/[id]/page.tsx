import { ProductEditor } from "@/components/business/product-editor";
import { Notice, PageTitle } from "@/components/business/ui";
import { portalData, shopOrigin } from "@/lib/business-portal/client";
import type { DeskCollection, DeskOption, DeskProduct } from "@/lib/business-portal/types";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const data = await portalData<{ product: DeskProduct; categories: DeskOption[]; brands: DeskOption[]; collections: DeskCollection[] }>("product", { id });
  return (
    <div>
      <PageTitle title={data.product.name} text="Change what you need, then press Save." />
      <Notice saved={query.saved} error={query.error} savedText="Saved. Customers can see this on the shop now." />
      <ProductEditor product={data.product} brands={data.brands} categories={data.categories} collections={data.collections} origin={shopOrigin()} />
    </div>
  );
}
