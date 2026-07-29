import { randomBytes } from "node:crypto";
import type {
  CommercialSnapshot,
  DeliveryLevel,
} from "@/commercial";
import type { DemoIndustryId, PersistedConfiguration } from "../types";

export type SaveConfigurationInput = {
  industry: DemoIndustryId;
  fictionalBusinessKey: string;
  packageCode: string | null;
  bundleCode: string | null;
  selectedFeatures: string[];
  carePlan: string | null;
  kbPlan: string | null;
  seoSetup: string | null;
  seoRecurring: string | null;
  socialPlan: string | null;
  deliveryOption: DeliveryLevel;
  commercialSnapshot: CommercialSnapshot;
  /** Present when updating an existing editable configuration */
  configurationId?: string;
  editToken?: string;
};

export type SavedConfigurationRecord = PersistedConfiguration & {
  editTokenHash: string;
};

export type ConfigStore = {
  save(
    input: SaveConfigurationInput,
    editTokenPlain: string,
  ): Promise<SavedConfigurationRecord>;
  getById(id: string): Promise<SavedConfigurationRecord | null>;
  update(
    id: string,
    editTokenPlain: string,
    input: Omit<SaveConfigurationInput, "configurationId" | "editToken">,
  ): Promise<SavedConfigurationRecord | null>;
  listByIds(ids: string[]): Promise<SavedConfigurationRecord[]>;
};

/** Collision-resistant KT-CONFIG-XXXXXX (12 hex chars ≈ 48 bits). */
export function generateConfigurationId(): string {
  return `KT-CONFIG-${randomBytes(6).toString("hex").toUpperCase()}`;
}

export function generateEditToken(): string {
  return randomBytes(24).toString("base64url");
}

export async function hashToken(token: string): Promise<string> {
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(token).digest("hex");
}

export async function verifyToken(
  plain: string,
  hash: string,
): Promise<boolean> {
  const h = await hashToken(plain);
  return h === hash;
}
