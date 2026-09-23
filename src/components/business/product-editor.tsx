import { PhotoField } from "@/components/business/photo-field";
import { fieldClass } from "@/components/business/ui";
import { saveDeskProduct } from "@/lib/business-portal/actions";
import type { DeskCollection, DeskOption, DeskProduct } from "@/lib/business-portal/types";

export function ProductEditor({
  product,
  brands,
  categories,
  collections,
  origin,
}: {
  product?: DeskProduct;
  brands: DeskOption[];
  categories: DeskOption[];
  collections: DeskCollection[];
  origin: string;
}) {
  const catalog = categories.filter((item) => !item.kind || item.kind === "catalog");
  const showing = product ? product.publishStatus !== "DRAFT" && product.availability !== "HIDDEN" : true;
  const availability = !product || product.availability === "HIDDEN" ? "NEEDS_CONFIRMATION" : product.availability;
  return (
    <form action={saveDeskProduct} className="grid max-w-5xl gap-8 lg:grid-cols-[1fr_16rem]">
      <div className="space-y-4">
        <input type="hidden" name="id" value={product?.id || ""} />
        <input type="hidden" name="stockQuantity" value={product?.stockQuantity ?? 0} />
        <input type="hidden" name="lowStockThreshold" value={product?.lowStockThreshold ?? 3} />
        {product?.trackStock ? <input type="hidden" name="trackStock" value="on" /> : null}
        <label className="block text-sm">
          Product name
          <input name="name" required defaultValue={product?.name || ""} className={fieldClass} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <Select name="brandId" label="Brand" value={product?.brandId || ""} empty="Choose a brand" options={brands.map((item) => [item.id, item.name])} />
          <Select name="categoryId" label="Section" value={product?.categoryId || ""} empty="Choose a section" options={catalog.map((item) => [item.id, item.name])} />
        </div>
        <Select name="collectionId" label="Scent, if it belongs to one" value={product?.collectionId || ""} empty="No scent" options={collections.map((item) => [item.id, item.name])} />
        <label className="block text-sm">
          Price in shillings
          <input name="price" required inputMode="numeric" defaultValue={product?.price ?? ""} placeholder="45000" className={fieldClass} />
        </label>
        <label className="block text-sm">
          Short line on the product
          <input name="shortDescription" defaultValue={product?.shortDescription || ""} className={fieldClass} />
        </label>
        <label className="block text-sm">
          More detail, if you want it
          <textarea name="description" rows={5} defaultValue={product?.description || ""} className="mt-1 w-full border border-kasi-border bg-black px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          Can a customer order this?
          <select name="availability" defaultValue={availability} className={fieldClass}>
            <option value="AVAILABLE">Yes, it is in stock</option>
            <option value="LOW_STOCK">Yes, but only a few are left</option>
            <option value="OUT_OF_STOCK">No, it is finished</option>
            <option value="NEEDS_CONFIRMATION">I will confirm on WhatsApp</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="showInShop" defaultChecked={showing} />
          Show this product in the shop
        </label>
        <fieldset className="space-y-2">
          <legend className="text-sm">Where to highlight it</legend>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isFeatured" defaultChecked={product?.isFeatured || false} /> On the front page</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isNewArrival" defaultChecked={product?.isNewArrival || false} /> Under New arrivals</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isBestSeller" defaultChecked={product?.isBestSeller || false} /> Under Best sellers</label>
        </fieldset>
        <button className="h-12 bg-kasi-ivory px-5 text-sm text-kasi-black">Save</button>
        <p className="text-sm text-kasi-grey">Save puts this on the shop. Refresh the shop page to see it.</p>
      </div>
      <PhotoField folder="products" origin={origin} initial={product?.images || []} />
    </form>
  );
}

function Select({ name, label, value, empty, options }: { name: string; label: string; value: string; empty: string; options: string[][] }) {
  return (
    <label className="block text-sm">
      {label}
      <select name={name} defaultValue={value} className={fieldClass}>
        <option value="">{empty}</option>
        {options.map(([id, optionLabel]) => (
          <option key={id} value={id}>{optionLabel}</option>
        ))}
      </select>
    </label>
  );
}
