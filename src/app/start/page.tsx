import type { Metadata } from "next";
import { StartProjectForm } from "@/components/start/StartProjectForm";

export const metadata: Metadata = { title: "Start a Project" };

export default function StartPage() {
  return (
    <div className="min-h-[100svh]">
      <StartProjectForm />
    </div>
  );
}
