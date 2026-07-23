import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-32 md:px-8">
      <h1 className="font-display text-4xl tracking-[-0.03em]">Privacy</h1>
      <div className="mt-8 space-y-5 text-kasi-grey leading-relaxed">
        <p>
          KasiTech collects only what is needed to respond to project enquiries:
          name, email, phone/WhatsApp, company details, and the brief you
          submit.
        </p>
        <p>
          Enquiry data may be stored briefly in your browser, sent to us via
          WhatsApp or email, and — when configured — processed by our form
          delivery providers solely to deliver your message.
        </p>
        <p>
          Demo interactions use fictional data and local browser storage where
          noted. We do not sell personal information. To ask about data we hold
          from an enquiry, contact us on WhatsApp or email.
        </p>
      </div>
    </div>
  );
}
