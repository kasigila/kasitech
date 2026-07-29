CREATE TYPE "public"."billing_type" AS ENUM('ONE_TIME', 'MONTHLY', 'ANNUAL', 'CUSTOM_QUOTE', 'THIRD_PARTY', 'INCLUDED', 'SURCHARGE');--> statement-breakpoint
CREATE TYPE "public"."catalog_kind" AS ENUM('SERVICE', 'SERVICE_ALIAS', 'ENTITLEMENT', 'PACKAGE', 'BUNDLE', 'SUBSCRIPTION_TIER', 'THIRD_PARTY_COST', 'CUSTOM_QUOTE_ITEM', 'DELIVERY_OPTION');--> statement-breakpoint
CREATE TYPE "public"."app_role" AS ENUM('PUBLIC', 'CLIENT', 'STAFF', 'ADMIN');--> statement-breakpoint
CREATE TABLE "bundle_components" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"price_book_id" uuid NOT NULL,
	"bundle_code" text NOT NULL,
	"component_code" text NOT NULL,
	"role" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "catalog_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"price_book_id" uuid NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"kind" "catalog_kind" NOT NULL,
	"category" text NOT NULL,
	"price_tsh" integer,
	"billing" "billing_type" NOT NULL,
	"timeline_min_days" integer,
	"timeline_max_days" integer,
	"timeline_impact_days" integer,
	"client_description" text DEFAULT '' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "commercial_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"price_book_version" text NOT NULL,
	"frozen_at" timestamp with time zone NOT NULL,
	"payload" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "entitlements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"price_book_id" uuid NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"sellable" boolean DEFAULT false NOT NULL,
	"comparable_standalone_code" text
);
--> statement-breakpoint
CREATE TABLE "package_inclusions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"price_book_id" uuid NOT NULL,
	"package_code" text NOT NULL,
	"included_code" text NOT NULL,
	"inclusion_type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "price_books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" text NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"effective_from" timestamp with time zone,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "price_books_version_unique" UNIQUE("version")
);
--> statement-breakpoint
CREATE TABLE "service_aliases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"price_book_id" uuid NOT NULL,
	"alias_code" text NOT NULL,
	"label" text NOT NULL,
	"canonical_code" text NOT NULL,
	"industry_tag" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "technical_dependencies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"price_book_id" uuid NOT NULL,
	"from_code" text NOT NULL,
	"to_code" text NOT NULL,
	"note" text NOT NULL,
	"creates_charge" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tier_families" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"price_book_id" uuid NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tier_memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"family_id" uuid NOT NULL,
	"item_code" text NOT NULL,
	"rank" integer NOT NULL,
	"includes_lower" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bundle_components" ADD CONSTRAINT "bundle_components_price_book_id_price_books_id_fk" FOREIGN KEY ("price_book_id") REFERENCES "public"."price_books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalog_items" ADD CONSTRAINT "catalog_items_price_book_id_price_books_id_fk" FOREIGN KEY ("price_book_id") REFERENCES "public"."price_books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entitlements" ADD CONSTRAINT "entitlements_price_book_id_price_books_id_fk" FOREIGN KEY ("price_book_id") REFERENCES "public"."price_books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "package_inclusions" ADD CONSTRAINT "package_inclusions_price_book_id_price_books_id_fk" FOREIGN KEY ("price_book_id") REFERENCES "public"."price_books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_aliases" ADD CONSTRAINT "service_aliases_price_book_id_price_books_id_fk" FOREIGN KEY ("price_book_id") REFERENCES "public"."price_books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "technical_dependencies" ADD CONSTRAINT "technical_dependencies_price_book_id_price_books_id_fk" FOREIGN KEY ("price_book_id") REFERENCES "public"."price_books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tier_families" ADD CONSTRAINT "tier_families_price_book_id_price_books_id_fk" FOREIGN KEY ("price_book_id") REFERENCES "public"."price_books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tier_memberships" ADD CONSTRAINT "tier_memberships_family_id_tier_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."tier_families"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "catalog_items_book_code" ON "catalog_items" USING btree ("price_book_id","code");--> statement-breakpoint
CREATE UNIQUE INDEX "entitlements_book_code" ON "entitlements" USING btree ("price_book_id","code");--> statement-breakpoint
CREATE UNIQUE INDEX "service_aliases_book_alias" ON "service_aliases" USING btree ("price_book_id","alias_code");--> statement-breakpoint
CREATE UNIQUE INDEX "tier_families_book_code" ON "tier_families" USING btree ("price_book_id","code");