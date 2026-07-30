import { describe, expect, it } from "vitest";
import {
  CREDO_ENERGY_PROPOSAL,
  getProposalPreset,
  listProposalPresets,
} from "@/proposals/registry";
import {
  parseProposalSearchParams,
  parseDemoStudioSearchParams,
  proposalDemoStudioUrl,
  commercialStateFromDeepLink,
} from "@/demo-studio/configuration/deep-link";

describe("Credo proposal registry KT-CEG-2026-001", () => {
  it("exposes approved investment figures unchanged", () => {
    const p = CREDO_ENERGY_PROPOSAL;
    expect(p.id).toBe("KT-CEG-2026-001");
    expect(p.slug).toBe("credo-energy-group");
    expect(p.investment.websiteOneTimeTsh).toBe(7_500_000);
    expect(p.investment.careMonthlyTsh).toBe(800_000);
    expect(p.investment.socialMonthlyTsh).toBe(1_200_000);
    expect(p.investment.totalMonthlyTsh).toBe(2_000_000);
    expect(p.investment.paymentSchedule).toEqual({
      acceptancePct: 40,
      designApprovalPct: 40,
      launchPct: 20,
    });
  });

  it("resolves by id and slug", () => {
    expect(getProposalPreset("KT-CEG-2026-001")?.slug).toBe(
      "credo-energy-group",
    );
    expect(getProposalPreset("credo-energy-group")?.id).toBe("KT-CEG-2026-001");
    expect(getProposalPreset("missing")).toBeNull();
    expect(listProposalPresets()).toHaveLength(1);
  });

  it("maps commercial selections for Demo Studio preview", () => {
    const c = CREDO_ENERGY_PROPOSAL.commercial;
    expect(c.industry).toBe("professional");
    expect(c.packageCode).toBe("WEB-SIG");
    expect(c.carePlan).toBe("CARE-PRI");
    expect(c.socialPlan).toBe("SOC-PRO");
    expect(CREDO_ENERGY_PROPOSAL.brand.name).toBe("Credo Energy Group");
  });
});

describe("Proposal Mode deep-links", () => {
  it("parses ?proposal=KT-CEG-2026-001", () => {
    const preset = parseProposalSearchParams({
      proposal: "KT-CEG-2026-001",
    });
    expect(preset?.slug).toBe("credo-energy-group");
    expect(preset?.disclaimer).toContain("KT-CEG-2026-001");
  });

  it("parses ?client=credo-energy-group", () => {
    const preset = parseProposalSearchParams({
      client: "credo-energy-group",
    });
    expect(preset?.id).toBe("KT-CEG-2026-001");
  });

  it("does not treat proposal params as catalog deep-links", () => {
    expect(
      parseDemoStudioSearchParams({ proposal: "KT-CEG-2026-001" }),
    ).toBeNull();
  });

  it("builds dedicated proposal Demo Studio URLs", () => {
    expect(proposalDemoStudioUrl(CREDO_ENERGY_PROPOSAL)).toContain(
      "/demo-studio/proposal/credo-energy-group",
    );
    expect(proposalDemoStudioUrl("KT-CEG-2026-001", "products")).toContain(
      "view=products",
    );
  });

  it("hydrates commercial state from catalog links still works", () => {
    const link = parseDemoStudioSearchParams({
      industry: "professional",
      package: "signature",
      care: "priority",
    });
    expect(link).not.toBeNull();
    const state = commercialStateFromDeepLink(link!);
    expect(state.packageCode).toBe("WEB-SIG");
    expect(state.carePlan).toBe("CARE-PRI");
  });
});
