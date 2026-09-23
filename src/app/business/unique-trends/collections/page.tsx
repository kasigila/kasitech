import Link from "next/link";
import { Notice, PageTitle } from "@/components/business/ui";
import { portalData } from "@/lib/business-portal/client";
import type { DeskCollection } from "@/lib/business-portal/types";

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const data = await portalData<{ collections: DeskCollection[] }>("collections");
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <PageTitle title="Scents" text="Group the mist, wash, and cream from the same scent. They stay separate products." />
        <Link href="/business/unique-trends/collections/new" className="inline-flex h-12 items-center bg-kasi-ivory px-5 text-sm text-kasi-black">
          Add a scent
        </Link>
      </div>
      <Notice saved={params.saved} error={params.error} savedText="Saved. Customers can see this on the shop now." />
      <div className="space-y-3">
        {data.collections.map((collection) => (
          <Link key={collection.id} href={`/business/unique-trends/collections/${collection.id}`} className="block border border-kasi-border p-4">
            <h2 className="font-display text-2xl">{collection.name}</h2>
            <p className="mt-1 text-sm text-kasi-grey">{collection.isVisible && collection.publishStatus !== "DRAFT" ? "On the shop" : "Not on the shop"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
