import type { Metadata } from "next";
import { MotoDemo } from "@/demos/moto/MotoDemo";

export const metadata: Metadata = {
  title: "MOTO Demo",
  description:
    "Interactive open-fire restaurant demo — menu, ordering, reservations and ops.",
};

export default function MotoDemoPage() {
  return <MotoDemo />;
}
