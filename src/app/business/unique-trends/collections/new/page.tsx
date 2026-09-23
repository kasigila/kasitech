import { CollectionEditor } from "@/components/business/collection-editor";
import { Notice, PageTitle } from "@/components/business/ui";
import { portalData, shopOrigin } from "@/lib/business-portal/client";
import type { DeskCollection, DeskOption, DeskProduct } from "@/lib/business-portal/types";

export default async function NewCollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const data = await portalData<{ collections: DeskCollection[]; brands: DeskOption[]; products: DeskProduct[] }>("collections");
  return (
    <div>
      <PageTitle title="Add collection" />
      <Notice error={params.error} />
      <CollectionEditor brands={data.brands} products={data.products} origin={shopOrigin()} />
    </div>
  );
}
