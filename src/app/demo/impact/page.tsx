import type { Metadata } from "next";
import { ImpactDemo } from "@/demos/impact/ImpactDemo";

export const metadata: Metadata = {
  title: "IMPACT Demo",
  description:
    "Nonprofit demo: stories, impact map, donate, Follow Your Donation.",
};

export default function ImpactDemoPage() {
  return <ImpactDemo />;
}
