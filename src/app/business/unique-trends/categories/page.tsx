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
      <PageTitle title="Categories" text="These are the sections customers browse in the shop." />
      <Notice saved={params.saved} error={params.error} />
      <form action={saveDeskCategory} className="mb-8 grid max-w-xl gap-3 border border-kasi-border p-4">
        <h2 className="font-display text-2xl">Add category</h2>
        <input name="name" required placeholder="Category name" className={fieldClass} />
        <textarea name="description" rows={2} placeholder="Short description" className="mt-1 w-full border border-kasi-border bg-black px-3 py-2 text-sm" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isVisible" defaultChecked /> Show in the shop</label>
        <button className="h-11 bg-kasi-ivory px-4 text-sm text-kasi-black">Add category</button>
      </form>
      <div className="space-y-3">
        {data.categories.map((category) => (
          <form key={category.id} action={saveDeskCategory} className="grid gap-3 border border-kasi-border p-4">
            <input type="hidden" name="id" value={category.id} />
            <input name="name" defaultValue={category.name} className={fieldClass} />
            <textarea name="description" rows={2} defaultValue={category.description || ""} className="w-full border border-kasi-border bg-black px-3 py-2 text-sm" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isVisible" defaultChecked={category.isVisible !== false} /> Show in the shop
            </label>
            <div className="flex flex-wrap gap-2">
              <button className="h-10 bg-kasi-ivory px-4 text-sm text-kasi-black">Save</button>
              <button formAction={moveDeskCategory} name="direction" value="up" className="h-10 border border-kasi-border px-3 text-sm">Up</button>
              <button formAction={moveDeskCategory} name="direction" value="down" className="h-10 border border-kasi-border px-3 text-sm">Down</button>
              {category.kind === "catalog" ? (
                <button formAction={deleteDeskCategory} className="h-10 border border-kasi-border px-3 text-sm">Delete</button>
              ) : null}
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
