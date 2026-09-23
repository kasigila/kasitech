import { ConfirmButton } from "@/components/business/confirm-button";
import { fieldClass, Notice, PageTitle } from "@/components/business/ui";
import { deleteDeskCategory, moveDeskCategory, saveDeskCategory } from "@/lib/business-portal/actions";
import { portalData } from "@/lib/business-portal/client";
import type { DeskOption } from "@/lib/business-portal/types";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const data = await portalData<{ categories: DeskOption[] }>("categories");
  return (
    <div>
      <PageTitle title="Sections" text="These are the groups in the shop menu, such as Body Mists or Deodorants." />
      <Notice saved={params.saved} error={params.error} savedText="Saved. Customers can see this on the shop now." />
      <form action={saveDeskCategory} className="mb-8 grid max-w-xl gap-3 border border-kasi-border p-4">
        <h2 className="font-display text-2xl">Add a section</h2>
        <input name="name" required placeholder="Section name" className={fieldClass} />
        <textarea name="description" rows={2} placeholder="A short line, if you want one" className="mt-1 w-full border border-kasi-border bg-black px-3 py-2 text-sm" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isVisible" defaultChecked /> Show this in the shop</label>
        <button className="h-11 bg-kasi-ivory px-4 text-sm text-kasi-black">Add section</button>
      </form>
      <div className="space-y-3">
        {data.categories.map((category) => (
          <form key={category.id} action={saveDeskCategory} className="grid gap-3 border border-kasi-border p-4">
            <input type="hidden" name="id" value={category.id} />
            <input name="name" defaultValue={category.name} className={fieldClass} />
            <textarea name="description" rows={2} defaultValue={category.description || ""} className="w-full border border-kasi-border bg-black px-3 py-2 text-sm" />
            {category.kind && category.kind !== "catalog" ? (
              <p className="text-sm text-kasi-grey">This is already in the menu. Untick it to hide it.</p>
            ) : null}
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isVisible" defaultChecked={category.isVisible !== false} /> Show this in the shop
            </label>
            <div className="flex flex-wrap gap-2">
              <button className="h-10 bg-kasi-ivory px-4 text-sm text-kasi-black">Save</button>
              <button formAction={moveDeskCategory} name="direction" value="up" className="h-10 border border-kasi-border px-3 text-sm">Move up</button>
              <button formAction={moveDeskCategory} name="direction" value="down" className="h-10 border border-kasi-border px-3 text-sm">Move down</button>
              {category.kind === "catalog" ? (
                <ConfirmButton message={`Remove ${category.name}? Products in it need another section first.`} formAction={deleteDeskCategory} className="h-10 border border-kasi-border px-3 text-sm">
                  Remove
                </ConfirmButton>
              ) : null}
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
