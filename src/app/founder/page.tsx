import type { Metadata } from "next";
import { FounderHero } from "@/components/founder/FounderHero";
import { FounderJourney } from "@/components/founder/FounderJourney";
import { FounderThinking } from "@/components/founder/FounderThinking";
import { FounderBuilding } from "@/components/founder/FounderBuilding";
import { FounderConnect } from "@/components/founder/FounderConnect";

export const metadata: Metadata = {
  title: "Founder - Karen Marie Kasigila",
  description:
    "Karen Marie Kasigila - Founder of KasiTech. Data Science × Technology × Entrepreneurship.",
  openGraph: {
    title: "Karen Marie Kasigila · Founder, KasiTech",
    description:
      "Data Science × Technology × Entrepreneurship. Building digital products that work from Dar es Salaam.",
  },
};

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
