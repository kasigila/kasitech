import type { Metadata } from "next";
import { GlowDemo } from "@/demos/glow/GlowDemo";

export const metadata: Metadata = {
  title: "GLOW · Beauty & Salon",
  description:
    "Beauty and salon experience: services, stylist booking, client visits, and salon operations.",
};

export default function GlowDemoPage() {
  return <GlowDemo />;
}
