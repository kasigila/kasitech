import { BusinessShowcase } from "@/components/showcase/BusinessShowcase";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Business Showcase",
  description:
    "Explore KasiTech business examples across restaurants, shops, salons, hotels, clinics, and more — designed around how your industry works.",
  path: "/showcase",
});

export default function ShowcasePage() {
  return <BusinessShowcase />;
}
