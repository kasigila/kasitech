import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-32 md:px-8">
      <h1 className="font-display text-4xl tracking-[-0.03em]">Privacy</h1>
      <p className="mt-6 text-kasi-grey leading-relaxed">
        KasiTech collects only what is needed to respond to project enquiries.
        Demo interactions use fictional data and local browser storage where
        noted. We do not sell personal information.
      </p>
    </div>
  );
}
