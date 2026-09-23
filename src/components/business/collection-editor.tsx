import { PhotoField } from "@/components/business/photo-field";
import { fieldClass } from "@/components/business/ui";
import { deleteDeskCollection, saveDeskCollection } from "@/lib/business-portal/actions";
import type { DeskCollection, DeskOption, DeskProduct } from "@/lib/business-portal/types";

export function CollectionEditor({
  collection,
  brands,
  products,
  origin,
}: {
  collection?: DeskCollection;
  brands: DeskOption[];
  products: DeskProduct[];
  origin: string;
}) {
  const selected = new Set(products.filter((item) => item.collectionId && item.collectionId === collection?.id).map((item) => item.id));
  return (
    <form action={saveDeskCollection} className="max-w-3xl space-y-4">
      <input type="hidden" name="id" value={collection?.id || ""} />
      <label className="block text-sm">
        Collection name
        <input name="name" required defaultValue={collection?.name || ""} className={fieldClass} />
      </label>
      <label className="block text-sm">
        Brand
        <select name="brandId" defaultValue={collection?.brandId || ""} className={fieldClass}>
          <option value="">None</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        Description
        <textarea name="description" rows={4} defaultValue={collection?.description || ""} className="mt-1 w-full border border-kasi-border bg-black px-3 py-2 text-sm" />
      </label>
      <PhotoField name="heroImageUrl" folder="collections" single origin={origin} initial={collection?.heroImageUrl ? [{ url: collection.heroImageUrl }] : []} />
      <fieldset>
        <legend className="text-sm">Products in this scent</legend>
        <div className="mt-2 space-y-2">
          {products.map((product) => (
            <label key={product.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="productIds" value={product.id} defaultChecked={selected.has(product.id)} />
              {product.name}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isVisible" defaultChecked={collection ? collection.isVisible : true} /> Show in the shop
      </label>
      <div className="flex flex-wrap gap-3">
        <button name="intent" value="draft" className="h-12 border border-kasi-ivory px-5 text-sm">Save draft</button>
        <button name="intent" value="publish" className="h-12 bg-kasi-ivory px-5 text-sm text-kasi-black">Publish</button>
        {collection ? (
          <button formAction={deleteDeskCollection} className="h-12 border border-kasi-border px-5 text-sm">Delete</button>
        ) : null}
      </div>
    </form>
  );
}
