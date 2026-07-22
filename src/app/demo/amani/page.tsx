import type { Metadata } from "next";
import { AmaniDemo } from "@/demos/amani/AmaniDemo";

export const metadata: Metadata = {
  title: "AMANI Demo",
  description:
    "Corporate strategy firm demo — expertise, people, insights, East African expansion case.",
};

export default function AmaniDemoPage() {
  return <AmaniDemo />;
}
