import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Phase 1 Price Book schema — Supabase Postgres via Drizzle.
 * Auth roles reserved for later; no Clerk/Auth.js in Phase 1.
 */

export const catalogKindEnum = pgEnum("catalog_kind", [
  "SERVICE",
  "SERVICE_ALIAS",
  "ENTITLEMENT",
  "PACKAGE",
  "BUNDLE",
  "SUBSCRIPTION_TIER",
  "THIRD_PARTY_COST",
  "CUSTOM_QUOTE_ITEM",
  "DELIVERY_OPTION",
]);

export const billingTypeEnum = pgEnum("billing_type", [
  "ONE_TIME",
  "MONTHLY",
  "ANNUAL",
  "CUSTOM_QUOTE",
  "THIRD_PARTY",
  "INCLUDED",
  "SURCHARGE",
]);

export const priceBooks = pgTable("price_books", {
  id: uuid("id").defaultRandom().primaryKey(),
  version: text("version").notNull().unique(),
  active: boolean("active").notNull().default(false),
  effectiveFrom: timestamp("effective_from", { withTimezone: true }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const catalogItems = pgTable(
  "catalog_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    priceBookId: uuid("price_book_id")
      .notNull()
      .references(() => priceBooks.id),
    code: text("code").notNull(),
    name: text("name").notNull(),
    kind: catalogKindEnum("kind").notNull(),
    category: text("category").notNull(),
    /** Integer TSh; null = custom / third-party / included / non-priced entitlement */
    priceTsh: integer("price_tsh"),
    billing: billingTypeEnum("billing").notNull(),
    timelineMinDays: integer("timeline_min_days"),
    timelineMaxDays: integer("timeline_max_days"),
    timelineImpactDays: integer("timeline_impact_days"),
    clientDescription: text("client_description").notNull().default(""),
    active: boolean("active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("catalog_items_book_code").on(t.priceBookId, t.code)],
);

export const serviceAliases = pgTable(
  "service_aliases",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    priceBookId: uuid("price_book_id")
      .notNull()
      .references(() => priceBooks.id),
    aliasCode: text("alias_code").notNull(),
    label: text("label").notNull(),
    canonicalCode: text("canonical_code").notNull(),
    industryTag: text("industry_tag").notNull(),
  },
  (t) => [uniqueIndex("service_aliases_book_alias").on(t.priceBookId, t.aliasCode)],
);

export const entitlements = pgTable(
  "entitlements",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    priceBookId: uuid("price_book_id")
      .notNull()
      .references(() => priceBooks.id),
    code: text("code").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    sellable: boolean("sellable").notNull().default(false),
    comparableStandaloneCode: text("comparable_standalone_code"),
  },
  (t) => [uniqueIndex("entitlements_book_code").on(t.priceBookId, t.code)],
);

export const tierFamilies = pgTable(
  "tier_families",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    priceBookId: uuid("price_book_id")
      .notNull()
      .references(() => priceBooks.id),
    code: text("code").notNull(),
    name: text("name").notNull(),
  },
  (t) => [uniqueIndex("tier_families_book_code").on(t.priceBookId, t.code)],
);

export const tierMemberships = pgTable("tier_memberships", {
  id: uuid("id").defaultRandom().primaryKey(),
  familyId: uuid("family_id")
    .notNull()
    .references(() => tierFamilies.id),
  itemCode: text("item_code").notNull(),
  rank: integer("rank").notNull(),
  includesLower: boolean("includes_lower").notNull().default(false),
});

export const packageInclusions = pgTable("package_inclusions", {
  id: uuid("id").defaultRandom().primaryKey(),
  priceBookId: uuid("price_book_id")
    .notNull()
    .references(() => priceBooks.id),
  packageCode: text("package_code").notNull(),
  includedCode: text("included_code").notNull(),
  inclusionType: text("inclusion_type").notNull(),
});

export const bundleComponents = pgTable("bundle_components", {
  id: uuid("id").defaultRandom().primaryKey(),
  priceBookId: uuid("price_book_id")
    .notNull()
    .references(() => priceBooks.id),
  bundleCode: text("bundle_code").notNull(),
  componentCode: text("component_code").notNull(),
  role: text("role").notNull(), // CHARGE | ENTITLEMENT
});

export const technicalDependencies = pgTable("technical_dependencies", {
  id: uuid("id").defaultRandom().primaryKey(),
  priceBookId: uuid("price_book_id")
    .notNull()
    .references(() => priceBooks.id),
  fromCode: text("from_code").notNull(),
  toCode: text("to_code").notNull(),
  note: text("note").notNull(),
  createsCharge: boolean("creates_charge").notNull().default(false),
});

/**
 * Immutable commercial snapshots for issued documents (foundation).
 * Never regenerate historical docs from the live Price Book.
 */
export const commercialSnapshots = pgTable("commercial_snapshots", {
  id: uuid("id").defaultRandom().primaryKey(),
  priceBookVersion: text("price_book_version").notNull(),
  frozenAt: timestamp("frozen_at", { withTimezone: true }).notNull(),
  payload: jsonb("payload").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/** Reserved for future PUBLIC / CLIENT / STAFF / ADMIN — unused in Phase 1. */
export const roleEnum = pgEnum("app_role", ["PUBLIC", "CLIENT", "STAFF", "ADMIN"]);
