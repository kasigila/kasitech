import type { Metadata } from "next";
import { NuruDemo } from "@/demos/nuru/NuruDemo";

export const metadata: Metadata = {
  title: "NURU Demo",
  description:
    "Education demo — program finder, applications, student portal, Build Your Future.",
};

export default function NuruDemoPage() {
  return <NuruDemo />;
}
