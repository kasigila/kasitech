import type { Metadata } from "next";
import { AtlasDemo } from "@/demos/atlas/AtlasDemo";

export const metadata: Metadata = {
  title: "ATLAS Demo",
  description:
    "Logistics demo — track ATL-48291, quote and book, customer portal, fleet board.",
};

export default function AtlasDemoPage() {
  return <AtlasDemo />;
}
