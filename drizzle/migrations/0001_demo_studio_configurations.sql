-- Phase 3 Demo Studio persistence
CREATE TABLE IF NOT EXISTS "project_configurations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "configuration_id" text NOT NULL UNIQUE,
  "price_book_version" text NOT NULL,
  "industry" text NOT NULL,
  "fictional_business_key" text NOT NULL,
  "package_code" text,
  "bundle_code" text,
  "selected_features" jsonb NOT NULL,
  "care_plan" text,
  "kb_plan" text,
  "seo_setup" text,
  "seo_recurring" text,
  "social_plan" text,
  "delivery_option" text NOT NULL,
  "commercial_snapshot" jsonb NOT NULL,
  "edit_token_hash" text NOT NULL,
  "status" text DEFAULT 'saved' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "configuration_submissions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "configuration_id" text NOT NULL,
  "name" text NOT NULL,
  "business_name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text NOT NULL,
  "message" text,
  "lead_status" text DEFAULT 'pending' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
