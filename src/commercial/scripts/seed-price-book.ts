/**
 * Apply KT-PB-2026.1 seed to Supabase Postgres when DATABASE_URL is set.
 *
 * Usage: npx tsx src/commercial/scripts/seed-price-book.ts
 *
 * Does not run automatically — requires administrator-provided DATABASE_URL.
 */
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import * as schema from "../../../drizzle/schema";
import { buildSeedPayload } from "../price-book/seed/payload";
import { TECHNICAL_DEPENDENCIES } from "../price-book/seed/dependencies";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is required to seed Supabase Postgres.");
    console.error("Engines and golden tests work offline from the TypeScript seed.");
    process.exit(1);
  }

  const client = postgres(url, { max: 1 });
  const db = drizzle(client, { schema });
  const payload = buildSeedPayload();

  const existing = await db
    .select()
    .from(schema.priceBooks)
    .where(eq(schema.priceBooks.version, payload.priceBook.version));

  if (existing.length) {
    console.log(`Price Book ${payload.priceBook.version} already present — aborting (immutable).`);
    await client.end();
    process.exit(0);
  }

  const [book] = await db
    .insert(schema.priceBooks)
    .values({
      version: payload.priceBook.version,
      active: true,
      notes: payload.priceBook.notes,
    })
    .returning();

  await db.insert(schema.catalogItems).values(
    payload.items.map((i) => ({
      priceBookId: book.id,
      code: i.code,
      name: i.name,
      kind: i.kind,
      category: i.category,
      priceTsh: i.priceTsh,
      billing: i.billing,
      timelineMinDays: i.timelineMinDays,
      timelineMaxDays: i.timelineMaxDays,
      timelineImpactDays: i.timelineImpactDays,
      clientDescription: i.clientDescription,
      active: i.active,
      sortOrder: i.sortOrder,
    })),
  );

  await db.insert(schema.serviceAliases).values(
    payload.aliases.map((a) => ({
      priceBookId: book.id,
      aliasCode: a.aliasCode,
      label: a.label,
      canonicalCode: a.canonicalCode,
      industryTag: a.industryTag,
    })),
  );

  await db.insert(schema.entitlements).values(
    payload.entitlements.map((e) => ({
      priceBookId: book.id,
      code: e.code,
      name: e.name,
      description: e.description,
      sellable: e.sellable,
      comparableStandaloneCode: e.comparableStandaloneCode,
    })),
  );

  for (const f of payload.families) {
    const [fam] = await db
      .insert(schema.tierFamilies)
      .values({ priceBookId: book.id, code: f.code, name: f.name })
      .returning();
    await db.insert(schema.tierMemberships).values(
      f.members.map((m) => ({
        familyId: fam.id,
        itemCode: m.code,
        rank: m.rank,
        includesLower: Boolean(m.includesLower),
      })),
    );
  }

  await db.insert(schema.packageInclusions).values(
    payload.packageInclusions.map((p) => ({
      priceBookId: book.id,
      packageCode: p.packageCode,
      includedCode: p.includedCode,
      inclusionType: p.inclusionType,
    })),
  );

  await db.insert(schema.bundleComponents).values(
    payload.bundleComponents.map((b) => ({
      priceBookId: book.id,
      bundleCode: b.bundleCode,
      componentCode: b.componentCode,
      role: b.role,
    })),
  );

  await db.insert(schema.technicalDependencies).values(
    TECHNICAL_DEPENDENCIES.map((d) => ({
      priceBookId: book.id,
      fromCode: d.fromCode,
      toCode: d.toCode,
      note: d.note,
      createsCharge: d.createsCharge,
    })),
  );

  console.log(`Seeded ${payload.priceBook.version}: ${payload.meta.canonicalItemCount} items`);
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
