import type { Metadata } from "next";
import { BeautifulIsntEnough } from "@/components/home/BeautifulIsntEnough";
import { HowWeThink } from "@/components/home/HowWeThink";
import { KasiMeansSpeed } from "@/components/home/KasiMeansSpeed";
import { FounderTeaser } from "@/components/home/FounderTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";
import { CompanyHero } from "@/components/company/CompanyHero";
import { CompanyStory } from "@/components/company/CompanyStory";
import { CompanyBeyond } from "@/components/company/CompanyBeyond";

export const metadata: Metadata = {
  title: "Company",
  description:
    "KasiTech is a digital technology studio in Dar es Salaam - why we exist, how we think, and where we're going.",
};

export default function CompanyPage() {
  return (
    <>
      <CompanyHero />

      <BeautifulIsntEnough />

      <CompanyStory />

      <div id="work">
        <HowWeThink />
      </div>

      <KasiMeansSpeed />

      <div id="founder">
        <FounderTeaser />
      </div>

      <CompanyBeyond />

      <div id="contact">
        <FinalCTA />
      </div>
    </>
  );
}
