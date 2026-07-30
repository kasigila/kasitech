import { CREDO_ENERGY_PROPOSAL } from "./credo-energy";
import type { ProposalPreset } from "./types";

const BY_ID = new Map<string, ProposalPreset>([
  [CREDO_ENERGY_PROPOSAL.id.toLowerCase(), CREDO_ENERGY_PROPOSAL],
  [CREDO_ENERGY_PROPOSAL.slug.toLowerCase(), CREDO_ENERGY_PROPOSAL],
]);

export function getProposalPreset(
  key: string | null | undefined,
): ProposalPreset | null {
  if (!key) return null;
  return BY_ID.get(key.trim().toLowerCase()) ?? null;
}

export function listProposalPresets(): ProposalPreset[] {
  return [CREDO_ENERGY_PROPOSAL];
}

export { CREDO_ENERGY_PROPOSAL, credoDemoUrl, CREDO_QR_TARGETS } from "./credo-energy";
export type {
  ProposalPreset,
  ProposalInvestment,
  ProposalContact,
} from "./types";
