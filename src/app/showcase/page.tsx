import { Suspense } from "react";
import { BusinessShowcase } from "@/components/showcase/BusinessShowcase";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Business Showcase",
  description:
    "Explore KasiTech business examples across restaurants, hotels, clinics, retail, education, and more — designed around how your industry works.",
  path: "/showcase",
});

export default function ShowcasePage() {
  return (
    <Suspense
      fallback={
        <div className="px-5 pb-24 pt-32 md:px-8">
          <div className="mx-auto max-w-[1400px]">
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
              BUSINESS SHOWCASE
            </p>
            <p className="mt-8 text-kasi-grey">Loading showcase…</p>
          </div>
        </div>
      }
    >
      <BusinessShowcase />
    </Suspense>
  );
}
