import { ProductEditor } from "@/components/business/product-editor";
import { Notice, PageTitle } from "@/components/business/ui";
import { portalData, shopOrigin } from "@/lib/business-portal/client";
import type { DeskCollection, DeskOption } from "@/lib/business-portal/types";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const data = await portalData<{ categories: DeskOption[]; brands: DeskOption[]; collections: DeskCollection[] }>("catalog");
  return (
    <div>
      <PageTitle title="Add product" />
      <Notice error={params.error} />
      <ProductEditor brands={data.brands} categories={data.categories} collections={data.collections} origin={shopOrigin()} />
    </div>
  );
}
