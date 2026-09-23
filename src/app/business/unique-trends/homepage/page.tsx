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

const pages = [
  ["/shop", "The shop"],
  ["/new-arrivals", "New arrivals"],
  ["/best-sellers", "Best sellers"],
  ["/collections", "Scents"],
  ["/brands", "Brands"],
  ["/contact", "Contact"],
  ["/about", "About"],
];

function PageChoice({ name, label, value }: { name: string; label: string; value: string }) {
  const known = pages.some(([href]) => href === value);
  return (
    <label className="block text-sm">
      {label}
      <select name={name} defaultValue={known ? value : value || "/shop"} className={fieldClass}>
        {!known && value ? <option value={value}>Keep the current page</option> : null}
        {pages.map(([href, pageLabel]) => (
          <option key={href} value={href}>{pageLabel}</option>
        ))}
      </select>
    </label>
  );
}

export default async function HomepageDesk({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const data = await portalData<{ homepage: { published: Homepage; draft: Homepage | null }; brands: DeskOption[]; collections: DeskCollection[] }>("homepage");
  const content = data.homepage.published;
  return (
    <div>
      <PageTitle title="Front page" text="This is the first page customers see. Press Save, then refresh the shop." />
      <Notice saved={params.saved} error={params.error} savedText="Saved. Customers can see this on the shop now." />
      <form action={saveDeskHomepage} className="max-w-3xl space-y-4">
        <label className="block text-sm">Big heading<input name="heroTitle" defaultValue={content.heroTitle} className={fieldClass} /></label>
        <label className="block text-sm">Short description<textarea name="heroSubtitle" rows={3} defaultValue={content.heroSubtitle} className="mt-1 w-full border border-kasi-border bg-black px-3 py-2 text-sm" /></label>
        <PhotoField name="heroImageUrl" folder="homepage" single origin={shopOrigin()} initial={content.heroImageUrl ? [{ url: content.heroImageUrl }] : []} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">First button words<input name="heroCtaLabel" defaultValue={content.heroCtaLabel} className={fieldClass} /></label>
          <PageChoice name="heroCtaHref" label="First button opens" value={content.heroCtaHref} />
          <label className="block text-sm">Second button words<input name="heroSecondaryLabel" defaultValue={content.heroSecondaryLabel} className={fieldClass} /></label>
          <PageChoice name="heroSecondaryHref" label="Second button opens" value={content.heroSecondaryHref} />
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="promoEnabled" defaultChecked={content.promoEnabled} /> Show a message across the top</label>
        <label className="block text-sm">Top message<input name="promoText" defaultValue={content.promoText} className={fieldClass} /></label>
        <PageChoice name="promoHref" label="Top message opens" value={content.promoHref} />
        <fieldset>
          <legend className="text-sm">Brands on the front page</legend>
          <p className="mt-1 text-sm text-kasi-grey">Tick the ones you want. If you tick none, the shop shows every brand.</p>
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
          <legend className="text-sm">Scents on the front page</legend>
          <p className="mt-1 text-sm text-kasi-grey">Tick the ones you want. If you tick none, the shop shows every scent.</p>
          <div className="mt-2 space-y-2">
            {data.collections.map((collection) => (
              <label key={collection.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="featuredCollectionIds" value={collection.id} defaultChecked={content.featuredCollectionIds.includes(collection.id)} />
                {collection.name}
              </label>
            ))}
          </div>
        </fieldset>
        <button className="h-12 bg-kasi-ivory px-5 text-sm text-kasi-black">Save</button>
      </form>
    </div>
  );
}
