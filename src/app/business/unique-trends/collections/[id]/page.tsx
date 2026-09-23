import { CollectionEditor } from "@/components/business/collection-editor";
import { Notice, PageTitle } from "@/components/business/ui";
import { portalData, shopOrigin } from "@/lib/business-portal/client";
import type { DeskCollection, DeskOption, DeskProduct } from "@/lib/business-portal/types";
import { notFound } from "next/navigation";

export default async function EditCollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const data = await portalData<{ collections: DeskCollection[]; brands: DeskOption[]; products: DeskProduct[] }>("collections");
  const collection = data.collections.find((item) => item.id === id);
  if (!collection) notFound();
  return (
    <div>
      <PageTitle title={collection.name} text="Change what you need, then press Save." />
      <Notice saved={query.saved} error={query.error} savedText="Saved. Customers can see this on the shop now." />
      <CollectionEditor collection={collection} brands={data.brands} products={data.products} origin={shopOrigin()} />
    </div>
  );
}
