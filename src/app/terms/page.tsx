import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-32 md:px-8">
      <h1 className="font-display text-4xl tracking-[-0.03em]">Terms</h1>
      <p className="mt-6 text-kasi-grey leading-relaxed">
        Portfolio demonstrations are fictional Kasi Concepts created to show
        capability. They are not real client relationships unless explicitly
        stated. Project engagements are governed by a separate agreement.
      </p>
    </div>
  );
}
