import type { Metadata } from "next";
import { KasiFlowDemo } from "@/demos/kasi-flow/KasiFlowDemo";

export const metadata: Metadata = {
  title: "KASI FLOW Demo",
  description:
    "Operations software demo — CRM, finance, inventory, team, ⌘K command palette.",
};

export default function KasiFlowDemoPage() {
  return <KasiFlowDemo />;
}
