import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PRICING_PDF_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "KasiTech services and pricing in Tanzanian Shillings — download the clear PDF catalog.",
};

/**
 * Interactive pricing page is paused for now — the catalog PDF is clearer
 * for clients. Keep /pricing as a stable URL that opens the guide.
 */
export default function PricingPage() {
  redirect(PRICING_PDF_HREF);
}
