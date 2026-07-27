import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms",
  description:
    "Terms for KasiTech demos, shipped work references, and project engagement boundaries.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-32 md:px-8">
      <h1 className="font-display text-4xl tracking-[-0.03em]">Terms</h1>
      <div className="mt-6 space-y-5 text-kasi-grey leading-relaxed">
        <p>
          Interactive demos labeled as concepts or examples are fictional Kasi
          Concepts created to show capability. They are not real client
          relationships.
        </p>
        <p>
          Work listed under Shipped Work (including linked live sites) reflects
          real projects. Project engagements are governed by a separate
          agreement.
        </p>
      </div>
    </div>
  );
}
