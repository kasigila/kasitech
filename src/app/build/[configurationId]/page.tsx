import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoStudioApp } from "@/components/demo-studio/DemoStudioApp";
import { getConfigStore } from "@/demo-studio/persistence/store";
import type { DemoIndustryId } from "@/demo-studio/types";

type Props = {
  params: Promise<{ configurationId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { configurationId } = await params;
  return {
    title: `Build ${configurationId}`,
    description: "Shared KasiTech project configuration from Demo Studio.",
  };
}

export default async function BuildPage({ params }: Props) {
  const { configurationId } = await params;
  const store = await getConfigStore();
  const record = await store.getById(configurationId);
  if (!record) notFound();

  return (
    <DemoStudioApp
      initialConfig={{
        configurationId: record.configurationId,
        industry: record.industry as DemoIndustryId,
        packageCode: record.packageCode,
        bundleCode: record.bundleCode,
        featureCodes: record.selectedFeatures,
        carePlan: record.carePlan,
        kbPlan: record.kbPlan,
        seoSetup: record.seoSetup,
        seoRecurring: record.seoRecurring,
        socialPlan: record.socialPlan,
        delivery: record.deliveryOption,
        priceBookVersion: record.priceBookVersion,
        frozenSnapshot: record.commercialSnapshot,
        readOnly: true,
        startMode: "scratch",
      }}
    />
  );
}
