import type { Metadata } from "next";
import { KasiIntelligenceDemo } from "@/demos/kasi-intelligence/KasiIntelligenceDemo";

export const metadata: Metadata = {
  title: "KASI INTELLIGENCE Demo",
  description:
    "AI infrastructure demo: Ask Your Business, evidence panels, automation with approval.",
};

export default function KasiIntelligenceDemoPage() {
  return <KasiIntelligenceDemo />;
}
