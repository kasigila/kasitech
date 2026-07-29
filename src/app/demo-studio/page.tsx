import type { Metadata } from "next";
import { DemoStudioApp } from "@/components/demo-studio/DemoStudioApp";
import type { DemoIndustryId } from "@/demo-studio/types";

export const metadata: Metadata = {
  title: "Demo Studio",
  description:
    "Configure a KasiTech project on a live fictional website — see features, packages, and pricing update in real time.",
};

type Props = {
  searchParams: Promise<{ industry?: string }>;
};

export default async function DemoStudioPage({ searchParams }: Props) {
  const sp = await searchParams;
  const industry = sp.industry as DemoIndustryId | undefined;
  return <DemoStudioApp initialIndustry={industry} />;
}
