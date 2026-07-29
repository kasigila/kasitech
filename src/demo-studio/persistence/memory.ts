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

const g = globalThis as unknown as {
  __kasiDemoConfigStore?: Map<string, SavedConfigurationRecord>;
};

function mem(): Map<string, SavedConfigurationRecord> {
  if (!g.__kasiDemoConfigStore) g.__kasiDemoConfigStore = new Map();
  return g.__kasiDemoConfigStore;
}

/** In-memory store — used for tests and when DATABASE_URL is unset. */
export function createMemoryConfigStore(): ConfigStore {
  return {
    async save(input, editTokenPlain) {
      const now = new Date().toISOString();
      const id = input.configurationId ?? generateConfigurationId();
      const existing = mem().get(id);
      if (existing && input.editToken) {
        const ok = await verifyToken(input.editToken, existing.editTokenHash);
        if (!ok) throw new Error("EDIT_FORBIDDEN");
      } else if (existing && !input.editToken) {
        throw new Error("EDIT_FORBIDDEN");
      }
      const record: SavedConfigurationRecord = {
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
        status: "saved",
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
        editTokenHash: existing?.editTokenHash ?? (await hashToken(editTokenPlain)),
      };
      mem().set(id, record);
      return record;
    },
    async getById(id) {
      return mem().get(id) ?? null;
    },
    async update(id, editTokenPlain, input) {
      const existing = mem().get(id);
      if (!existing) return null;
      const ok = await verifyToken(editTokenPlain, existing.editTokenHash);
      if (!ok) throw new Error("EDIT_FORBIDDEN");
      const record: SavedConfigurationRecord = {
        ...existing,
        ...input,
        configurationId: id,
        priceBookVersion: input.commercialSnapshot.priceBookVersion,
        updatedAt: new Date().toISOString(),
        status: "saved",
      };
      mem().set(id, record);
      return record;
    },
    async listByIds(ids) {
      return ids
        .map((id) => mem().get(id))
        .filter((r): r is SavedConfigurationRecord => Boolean(r));
    },
  };
}

export function clearMemoryConfigStore(): void {
  mem().clear();
}
