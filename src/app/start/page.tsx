import type { Metadata } from "next";
import { Suspense } from "react";
import { StartProjectForm } from "@/components/start/StartProjectForm";

export const metadata: Metadata = { title: "Start a Project" };

export default function StartPage() {
  return (
    <div className="min-h-[100svh]">
      <Suspense
        fallback={
          <div className="px-5 pb-24 pt-32 text-sm text-kasi-grey md:px-8">
            Loading form…
          </div>
        }
      >
        <StartProjectForm />
      </Suspense>
    </div>
  );
}
