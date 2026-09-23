import { PhotoField } from "@/components/business/photo-field";
import { fieldClass, Notice, PageTitle } from "@/components/business/ui";
import { saveDeskHomepage } from "@/lib/business-portal/actions";
import { portalData, shopOrigin } from "@/lib/business-portal/client";
import type { DeskCollection, DeskOption } from "@/lib/business-portal/types";

type Homepage = {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string | null;
  heroCtaLabel: string;
  heroCtaHref: string;
  heroSecondaryLabel: string;
  heroSecondaryHref: string;
  promoEnabled: boolean;
  promoText: string;
  promoHref: string;
  featuredBrandIds: string[];
  featuredCollectionIds: string[];
};

export default async function HomepageDesk({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const data = await portalData<{ homepage: { published: Homepage; draft: Homepage | null }; brands: DeskOption[]; collections: DeskCollection[] }>("homepage");
  const content = data.homepage.draft || data.homepage.published;
  return (
    <div>
      <PageTitle title="Homepage" text="Save a draft to preview later from the shop, or publish it for customers." />
      <Notice saved={params.saved} error={params.error} />
      <form action={saveDeskHomepage} className="max-w-3xl space-y-4">
        <label className="block text-sm">Headline<input name="heroTitle" defaultValue={content.heroTitle} className={fieldClass} /></label>
        <label className="block text-sm">Short description<textarea name="heroSubtitle" rows={3} defaultValue={content.heroSubtitle} className="mt-1 w-full border border-kasi-border bg-black px-3 py-2 text-sm" /></label>
        <PhotoField name="heroImageUrl" folder="homepage" single origin={shopOrigin()} initial={content.heroImageUrl ? [{ url: content.heroImageUrl }] : []} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">Button label<input name="heroCtaLabel" defaultValue={content.heroCtaLabel} className={fieldClass} /></label>
          <label className="block text-sm">Button link<input name="heroCtaHref" defaultValue={content.heroCtaHref} className={fieldClass} /></label>
          <label className="block text-sm">Second button<input name="heroSecondaryLabel" defaultValue={content.heroSecondaryLabel} className={fieldClass} /></label>
          <label className="block text-sm">Second link<input name="heroSecondaryHref" defaultValue={content.heroSecondaryHref} className={fieldClass} /></label>
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="promoEnabled" defaultChecked={content.promoEnabled} /> Show a banner</label>
        <label className="block text-sm">Banner text<input name="promoText" defaultValue={content.promoText} className={fieldClass} /></label>
        <label className="block text-sm">Banner link<input name="promoHref" defaultValue={content.promoHref} className={fieldClass} /></label>
        <fieldset>
          <legend className="text-sm">Featured brands</legend>
          <div className="mt-2 space-y-2">
            {data.brands.map((brand) => (
              <label key={brand.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="featuredBrandIds" value={brand.id} defaultChecked={content.featuredBrandIds.includes(brand.id)} />
                {brand.name}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm">Featured collections</legend>
          <div className="mt-2 space-y-2">
            {data.collections.map((collection) => (
              <label key={collection.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="featuredCollectionIds" value={collection.id} defaultChecked={content.featuredCollectionIds.includes(collection.id)} />
                {collection.name}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex gap-3">
          <button name="intent" value="draft" className="h-12 border border-kasi-ivory px-5 text-sm">Save draft</button>
          <button name="intent" value="publish" className="h-12 bg-kasi-ivory px-5 text-sm text-kasi-black">Publish</button>
        </div>
      </form>
    </div>
  );
}
