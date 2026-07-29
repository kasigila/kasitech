import { pgTable, text, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";

/**
 * Phase 3 — Demo Studio configurations & submission intents.
 * Anonymous save with edit-token hash; public read by configurationId.
 */

export const projectConfigurations = pgTable("project_configurations", {
  id: uuid("id").defaultRandom().primaryKey(),
  configurationId: text("configuration_id").notNull().unique(),
  priceBookVersion: text("price_book_version").notNull(),
  industry: text("industry").notNull(),
  fictionalBusinessKey: text("fictional_business_key").notNull(),
  packageCode: text("package_code"),
  bundleCode: text("bundle_code"),
  selectedFeatures: jsonb("selected_features").notNull().$type<string[]>(),
  carePlan: text("care_plan"),
  kbPlan: text("kb_plan"),
  seoSetup: text("seo_setup"),
  seoRecurring: text("seo_recurring"),
  socialPlan: text("social_plan"),
  deliveryOption: text("delivery_option").notNull(),
  commercialSnapshot: jsonb("commercial_snapshot").notNull(),
  editTokenHash: text("edit_token_hash").notNull(),
  status: text("status").notNull().default("saved"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const configurationSubmissions = pgTable("configuration_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  configurationId: text("configuration_id").notNull(),
  name: text("name").notNull(),
  businessName: text("business_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message"),
  /** Phase 4 promotes to CRM Lead */
  leadStatus: text("lead_status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
