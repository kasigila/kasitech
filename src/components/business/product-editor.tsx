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
  return (
    <form action={saveDeskProduct} className="grid max-w-5xl gap-8 lg:grid-cols-[1fr_16rem]">
      <div className="space-y-4">
        <input type="hidden" name="id" value={product?.id || ""} />
        <label className="block text-sm">
          Product name
          <input name="name" required defaultValue={product?.name || ""} className={fieldClass} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <Select name="brandId" label="Brand" value={product?.brandId || ""} options={brands.map((item) => [item.id, item.name])} />
          <Select name="categoryId" label="Category" value={product?.categoryId || ""} options={catalog.map((item) => [item.id, item.name])} />
        </div>
        <Select name="collectionId" label="Scent collection" value={product?.collectionId || ""} options={collections.map((item) => [item.id, item.name])} />
        <label className="block text-sm">
          Price (TSh)
          <input name="price" required inputMode="numeric" defaultValue={product?.price ?? ""} className={fieldClass} />
        </label>
        <label className="block text-sm">
          Short description
          <input name="shortDescription" defaultValue={product?.shortDescription || ""} className={fieldClass} />
        </label>
        <label className="block text-sm">
          Description
          <textarea name="description" rows={5} defaultValue={product?.description || ""} className="mt-1 w-full border border-kasi-border bg-black px-3 py-2 text-sm" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Stock quantity
            <input name="stockQuantity" inputMode="numeric" defaultValue={product?.stockQuantity ?? 0} className={fieldClass} />
          </label>
          <label className="block text-sm">
            Low stock threshold
            <input name="lowStockThreshold" inputMode="numeric" defaultValue={product?.lowStockThreshold ?? 3} className={fieldClass} />
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="trackStock" defaultChecked={product?.trackStock || false} />
          Update availability automatically from the quantity
        </label>
        <label className="block text-sm">
          Availability
          <select name="availability" defaultValue={product?.availability || "NEEDS_CONFIRMATION"} className={fieldClass}>
            <option value="AVAILABLE">In stock</option>
            <option value="LOW_STOCK">Low stock</option>
            <option value="OUT_OF_STOCK">Out of stock</option>
            <option value="NEEDS_CONFIRMATION">Check availability</option>
            <option value="HIDDEN">Hidden</option>
          </select>
        </label>
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" name="isFeatured" defaultChecked={product?.isFeatured || false} /> Featured</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="isNewArrival" defaultChecked={product?.isNewArrival || false} /> New arrival</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="isBestSeller" defaultChecked={product?.isBestSeller || false} /> Best seller</label>
        </div>
        <div className="flex flex-wrap gap-3">
          <button name="intent" value="draft" className="h-12 border border-kasi-ivory px-5 text-sm">Save draft</button>
          <button name="intent" value="publish" className="h-12 bg-kasi-ivory px-5 text-sm text-kasi-black">Publish</button>
        </div>
      </div>
      <PhotoField folder="products" origin={origin} initial={product?.images || []} />
    </form>
  );
}

function Select({ name, label, value, options }: { name: string; label: string; value: string; options: string[][] }) {
  return (
    <label className="block text-sm">
      {label}
      <select name={name} defaultValue={value} className={fieldClass}>
        <option value="">None</option>
        {options.map(([id, optionLabel]) => (
          <option key={id} value={id}>{optionLabel}</option>
        ))}
      </select>
    </label>
  );
}
