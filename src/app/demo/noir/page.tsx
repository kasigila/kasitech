import type { Metadata } from "next";
import { NoirDemo } from "@/demos/noir/NoirDemo";

export const metadata: Metadata = {
  title: "NOIR Demo",
  description:
    "Interactive nightlife demo — events, ticketing, VIP floor plan and ops.",
};

export default function NoirDemoPage() {
  return <NoirDemo />;
}
