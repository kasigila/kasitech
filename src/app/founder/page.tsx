import { FounderHero } from "@/components/founder/FounderHero";
import { FounderJourney } from "@/components/founder/FounderJourney";
import { FounderThinking } from "@/components/founder/FounderThinking";
import { FounderBuilding } from "@/components/founder/FounderBuilding";
import { FounderConnect } from "@/components/founder/FounderConnect";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Founder - Karen Marie Kasigila",
  description:
    "Karen Marie Kasigila - Founder of KasiTech. Data Science × Technology × Entrepreneurship.",
  path: "/founder",
  openGraphTitle: "Karen Marie Kasigila · Founder, KasiTech",
});

export default function FounderPage() {
  return (
    <>
      <FounderHero />
      <FounderJourney />
      <FounderThinking />
      <FounderBuilding />
      <FounderConnect />
    </>
  );
}
