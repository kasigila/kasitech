import { Suspense } from "react";
import { StartProjectForm } from "@/components/start/StartProjectForm";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Start a Project",
  description:
    "Tell KasiTech what you want to build - website, commerce, platform, or AI. Conversational project intake.",
  path: "/start",
});

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
