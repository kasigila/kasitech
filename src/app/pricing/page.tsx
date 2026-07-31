import type { Metadata } from "next";
import { DigitalCatalog } from "@/components/pricing/DigitalCatalog";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Services & Pricing",
  description:
    "KasiTech commercial buying guide in Tanzanian Shillings — website packages, bundles, care, and capabilities. Clear scope before you buy.",
  path: "/pricing",
  openGraphTitle: "KasiTech Services & Pricing",
});

export default function PricingPage() {
  return <DigitalCatalog />;
}
