import { describe, expect, it } from "vitest";
import {
  CREDO_ENERGY_PROPOSAL,
  getProposalPreset,
  listProposalPresets,
  resolveCompanionSection,
  credoDemoUrl,
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
    expect(p.investment.websiteOneTimeTsh).toBe(4_800_000);
    expect(p.investment.careMonthlyTsh).toBe(150_000);
    expect(p.investment.socialMonthlyTsh).toBe(1_000_000);
    expect(p.investment.totalMonthlyTsh).toBe(150_000);
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
    expect(c.bundleCode).toBe("BND-PRES");
    expect(c.carePlan).toBe("CARE-PRO");
    expect(c.featureCodes).toContain("ADD-QUOTE");
    expect(CREDO_ENERGY_PROPOSAL.brand.name).toBe("Credo Energy Group");
  });
});

describe("Proposal Companion sections", () => {
  it("includes recommended website and major interactive views", () => {
    const ids = CREDO_ENERGY_PROPOSAL.companionSections.map((s) => s.id);
    expect(ids).toContain("recommended-website");
    expect(ids).toContain("products");
    expect(ids).toContain("analytics");
    expect(ids).toContain("cms");
    expect(ids).toContain("enquiry");
    expect(ids).toContain("care");
    expect(ids).toContain("kasitech-business");
  });

  it("resolves section by id, page number, and legacy aliases", () => {
    const rw = resolveCompanionSection("recommended-website");
    expect(rw?.sectionLabel).toBe("Section 12 – Recommended Website");
    expect(rw?.websitePath).toBe("home");

    expect(resolveCompanionSection("12")?.id).toBe("recommended-website");
    expect(resolveCompanionSection("home")?.id).toBe("homepage");
    expect(resolveCompanionSection("inquiry")?.id).toBe("enquiry");
    expect(resolveCompanionSection("nav")?.id).toBe("navigation");
  });

  it("builds companion URLs with section query", () => {
    expect(credoDemoUrl("recommended-website")).toContain(
      "section=recommended-website",
    );
    expect(credoDemoUrl("analytics")).toContain("section=analytics");
    expect(proposalDemoStudioUrl(CREDO_ENERGY_PROPOSAL, "products")).toContain(
      "view=products",
    );
  });
});

describe("Proposal Mode deep-links", () => {
  it("parses ?proposal=KT-CEG-2026-001", () => {
    const preset = parseProposalSearchParams({
      proposal: "KT-CEG-2026-001",
    });
    expect(preset?.slug).toBe("credo-energy-group");
    expect(preset?.disclaimer).toContain("KT-CEG-2026-001");
    expect(preset?.companionSections.length).toBeGreaterThan(5);
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
