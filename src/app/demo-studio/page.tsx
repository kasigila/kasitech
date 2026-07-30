import type { Metadata } from "next";
import { DemoStudioApp } from "@/components/demo-studio/DemoStudioApp";
import {
  commercialStateFromDeepLink,
  parseDemoStudioSearchParams,
} from "@/demo-studio/configuration/deep-link";

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
