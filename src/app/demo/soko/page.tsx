import type { Metadata } from "next";
import { SokoDemo } from "@/demos/soko/SokoDemo";

export const metadata: Metadata = {
  title: "SOKO Demo",
  description:
    "Premium fashion ecommerce demo: Find My Size, Complete the Look, M-Pesa checkout.",
};

export default function SokoDemoPage() {
  return <SokoDemo />;
}
