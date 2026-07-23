import type { Metadata } from "next";
import WorkIndex from "@/components/work/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Client work and KasiTech concept products - websites, commerce, systems, and AI demonstrations.",
};

export default function WorkPage() {
  return <WorkIndex />;
}
