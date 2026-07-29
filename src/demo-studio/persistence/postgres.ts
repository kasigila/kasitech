import { drizzle } from "drizzle-orm/postgres-js";
import { eq, inArray } from "drizzle-orm";
import postgres from "postgres";
import {
  projectConfigurations,
} from "../../../drizzle/schema/demo-studio";
import type {
  ConfigStore,
  SaveConfigurationInput,
  SavedConfigurationRecord,
} from "./types";
import {
  generateConfigurationId,
  hashToken,
  verifyToken,
} from "./types";
import type { CommercialSnapshot, DeliveryLevel } from "@/commercial";
import type { DemoIndustryId } from "../types";

function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL required for postgres config store");
  const client = postgres(url, { prepare: false, max: 1 });
  return drizzle(client);
}

function rowToRecord(
  row: typeof projectConfigurations.$inferSelect,
): SavedConfigurationRecord {
  return {
    configurationId: row.configurationId,
    priceBookVersion: row.priceBookVersion,
    industry: row.industry as DemoIndustryId,
    fictionalBusinessKey: row.fictionalBusinessKey,
    packageCode: row.packageCode,
    bundleCode: row.bundleCode,
    selectedFeatures: row.selectedFeatures as string[],
    carePlan: row.carePlan,
    kbPlan: row.kbPlan,
    seoSetup: row.seoSetup,
    seoRecurring: row.seoRecurring,
    socialPlan: row.socialPlan,
    deliveryOption: row.deliveryOption as DeliveryLevel,
    commercialSnapshot: row.commercialSnapshot as CommercialSnapshot,
    status: row.status as "draft" | "saved" | "submitted",
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    editTokenHash: row.editTokenHash,
  };
}

export function createPostgresConfigStore(): ConfigStore {
  const database = db();
  return {
    async save(input: SaveConfigurationInput, editTokenPlain: string) {
      const now = new Date();
      if (input.configurationId && input.editToken) {
        const updated = await this.update(
          input.configurationId,
          input.editToken,
          input,
        );
        if (!updated) throw new Error("NOT_FOUND");
        return updated;
      }
      const id = generateConfigurationId();
      const tokenHash = await hashToken(editTokenPlain);
      const [row] = await database
        .insert(projectConfigurations)
        .values({
          configurationId: id,
          priceBookVersion: input.commercialSnapshot.priceBookVersion,
          industry: input.industry,
          fictionalBusinessKey: input.fictionalBusinessKey,
          packageCode: input.packageCode,
          bundleCode: input.bundleCode,
          selectedFeatures: input.selectedFeatures,
          carePlan: input.carePlan,
          kbPlan: input.kbPlan,
          seoSetup: input.seoSetup,
          seoRecurring: input.seoRecurring,
          socialPlan: input.socialPlan,
          deliveryOption: input.deliveryOption,
          commercialSnapshot: input.commercialSnapshot,
          editTokenHash: tokenHash,
          status: "saved",
          createdAt: now,
          updatedAt: now,
        })
        .returning();
      return rowToRecord(row);
    },
    async getById(id) {
      const rows = await database
        .select()
        .from(projectConfigurations)
        .where(eq(projectConfigurations.configurationId, id))
        .limit(1);
      return rows[0] ? rowToRecord(rows[0]) : null;
    },
    async update(id, editTokenPlain, input) {
      const existing = await this.getById(id);
      if (!existing) return null;
      const ok = await verifyToken(editTokenPlain, existing.editTokenHash);
      if (!ok) throw new Error("EDIT_FORBIDDEN");
      const [row] = await database
        .update(projectConfigurations)
        .set({
          priceBookVersion: input.commercialSnapshot.priceBookVersion,
          industry: input.industry,
          fictionalBusinessKey: input.fictionalBusinessKey,
          packageCode: input.packageCode,
          bundleCode: input.bundleCode,
          selectedFeatures: input.selectedFeatures,
          carePlan: input.carePlan,
          kbPlan: input.kbPlan,
          seoSetup: input.seoSetup,
          seoRecurring: input.seoRecurring,
          socialPlan: input.socialPlan,
          deliveryOption: input.deliveryOption,
          commercialSnapshot: input.commercialSnapshot,
          status: "saved",
          updatedAt: new Date(),
        })
        .where(eq(projectConfigurations.configurationId, id))
        .returning();
      return row ? rowToRecord(row) : null;
    },
    async listByIds(ids) {
      if (!ids.length) return [];
      const rows = await database
        .select()
        .from(projectConfigurations)
        .where(inArray(projectConfigurations.configurationId, ids));
      return rows.map(rowToRecord);
    },
  };
}
