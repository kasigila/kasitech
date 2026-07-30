import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoStudioApp } from "@/components/demo-studio/DemoStudioApp";
import {
  getProposalPreset,
  resolveCompanionSection,
} from "@/proposals/registry";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proposal = getProposalPreset(slug);
  if (!proposal) {
    return { title: "Proposal Companion" };
  }
  return {
    title: `${proposal.clientName} · Proposal Companion`,
    description: proposal.disclaimer,
  };
}

export default async function ProposalDemoStudioPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const proposal = getProposalPreset(slug);
  if (!proposal) notFound();

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
