import { ConfirmButton } from "@/components/business/confirm-button";
import { PhotoField } from "@/components/business/photo-field";
import { fieldClass, Notice, PageTitle } from "@/components/business/ui";
import { deleteDeskBrand, saveDeskBrand } from "@/lib/business-portal/actions";
import { portalData, shopOrigin } from "@/lib/business-portal/client";
import type { DeskOption } from "@/lib/business-portal/types";

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const data = await portalData<{ brands: DeskOption[] }>("brands");
  const origin = shopOrigin();
  return (
    <div>
      <PageTitle title="Brands" text="Bath & Body Works, Secret, and any other brand you sell." />
      <Notice saved={params.saved} error={params.error} savedText="Saved. Customers can see this on the shop now." />
      <form action={saveDeskBrand} className="mb-8 max-w-xl space-y-3 border border-kasi-border p-4">
        <h2 className="font-display text-2xl">Add a brand</h2>
        <input name="name" required placeholder="Brand name" className={fieldClass} />
        <textarea name="description" rows={3} placeholder="A short description, if you want one" className="w-full border border-kasi-border bg-black px-3 py-2 text-sm" />
        <PhotoField name="logoUrl" folder="brands" single origin={origin} initial={[]} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isVisible" defaultChecked /> Show this brand in the shop</label>
        <button className="h-11 bg-kasi-ivory px-4 text-sm text-kasi-black">Add brand</button>
      </form>
      <div className="space-y-3">
        {data.brands.map((brand) => (
          <form key={brand.id} action={saveDeskBrand} className="max-w-xl space-y-3 border border-kasi-border p-4">
            <input type="hidden" name="id" value={brand.id} />
            <input name="name" defaultValue={brand.name} className={fieldClass} />
            <textarea name="description" rows={3} defaultValue={brand.description || ""} className="w-full border border-kasi-border bg-black px-3 py-2 text-sm" />
            <PhotoField name="logoUrl" folder="brands" single origin={origin} initial={brand.logoUrl ? [{ url: brand.logoUrl }] : []} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isVisible" defaultChecked={brand.isVisible !== false} /> Show this brand in the shop
            </label>
            <div className="flex gap-2">
              <button className="h-10 bg-kasi-ivory px-4 text-sm text-kasi-black">Save</button>
              <ConfirmButton message={`Remove ${brand.name}? Move its products first if the shop will not let you.`} formAction={deleteDeskBrand} className="h-10 border border-kasi-border px-3 text-sm">
                Remove
              </ConfirmButton>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
