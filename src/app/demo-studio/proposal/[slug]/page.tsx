import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoStudioApp } from "@/components/demo-studio/DemoStudioApp";
import { getProposalPreset } from "@/proposals/registry";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proposal = getProposalPreset(slug);
  if (!proposal) {
    return { title: "Proposal Demo" };
  }
  return {
    title: `${proposal.clientName} · Proposal Mode`,
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

  const viewRaw = sp.view;
  const view = Array.isArray(viewRaw) ? viewRaw[0] : viewRaw;

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
        proposalView: view,
        catalogViewingLabel: `${proposal.clientName} · ${proposal.id}`,
      }}
    />
  );
}
