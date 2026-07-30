import type { Metadata } from "next";
import { DemoStudioApp } from "@/components/demo-studio/DemoStudioApp";
import {
  commercialStateFromDeepLink,
  parseDemoStudioSearchParams,
  parseProposalSearchParams,
} from "@/demo-studio/configuration/deep-link";
import { resolveCompanionSection } from "@/proposals/registry";

export const metadata: Metadata = {
  title: "Demo Studio",
  description:
    "Configure a KasiTech project on a live fictional website — see features, packages, and pricing update in real time.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DemoStudioPage({ searchParams }: Props) {
  const sp = await searchParams;
  const proposal = parseProposalSearchParams(sp);
  if (proposal) {
    const pick = (k: string) => {
      const v = sp[k];
      return Array.isArray(v) ? v[0] : v;
    };
    const sectionKey = pick("section") ?? pick("view") ?? pick("page");
    const companionSection =
      resolveCompanionSection(sectionKey) ??
      proposal.companionSections.find((s) => s.id === "recommended-website") ??
      proposal.companionSections[0] ??
      null;

    return (
      <DemoStudioApp
        initialIndustry={proposal.commercial.industry ?? undefined}
        initialConfig={{
          ...proposal.commercial,
          fromProposal: true,
          proposalId: proposal.id,
          proposalSlug: proposal.slug,
          proposalDisclaimer: proposal.disclaimer,
          proposalInvestment: proposal.investment,
          proposalRecommended: proposal.recommended,
          proposalClientName: proposal.clientName,
          proposalReturnPath: proposal.proposalReturnPath,
          proposalBrand: proposal.brand,
          proposalView: companionSection?.websitePath ?? pick("view"),
          companionSection: companionSection ?? undefined,
          companionSections: proposal.companionSections,
          catalogViewingLabel: `${proposal.clientName} · ${proposal.id}`,
        }}
      />
    );
  }

  const deepLink = parseDemoStudioSearchParams(sp);
  const initialConfig = deepLink
    ? {
        ...commercialStateFromDeepLink(deepLink),
        catalogViewingLabel: deepLink.viewingLabel,
        fromCatalog: true as const,
      }
    : undefined;

  return (
    <DemoStudioApp
      initialIndustry={deepLink?.industry ?? undefined}
      initialConfig={initialConfig}
    />
  );
}
