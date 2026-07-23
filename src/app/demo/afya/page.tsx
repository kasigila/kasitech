import type { Metadata } from "next";
import { AfyaDemo } from "@/demos/afya/AfyaDemo";

export const metadata: Metadata = {
  title: "AFYA Demo",
  description:
    "Healthcare demo: find a doctor, book in-person, or telehealth, patient portal.",
};

export default function AfyaDemoPage() {
  return <AfyaDemo />;
}
