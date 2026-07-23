import type { Metadata } from "next";
import { NestDemo } from "@/demos/nest/NestDemo";

export const metadata: Metadata = {
  title: "NEST Demo",
  description:
    "Dar real estate demo: search, map pins, compare, neighborhood explorer, book viewing.",
};

export default function NestDemoPage() {
  return <NestDemo />;
}
