import type { Metadata } from "next";
import { CompanyHero } from "@/components/company/CompanyHero";
import { CompanyIdentity } from "@/components/company/CompanyIdentity";
import { CompanyBuild } from "@/components/company/CompanyBuild";
import { CompanyProof } from "@/components/company/CompanyProof";
import { CompanyChapter } from "@/components/company/CompanyChapter";
import { CompanyClose } from "@/components/company/CompanyClose";

export const metadata: Metadata = {
  title: "Company",
  description:
    "KasiTech is a digital technology studio in Dar es Salaam - why we exist, how we think, and where we're going.",
};

export default function CompanyPage() {
  return (
    <>
      <CompanyHero />
      <CompanyIdentity />
      <CompanyBuild />
      <CompanyProof />
      <CompanyChapter />
      <CompanyClose />
    </>
  );
}
