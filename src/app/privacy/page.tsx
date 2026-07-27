import { CONTACT_EMAIL, emailHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Privacy",
  description:
    "How KasiTech handles project enquiry details, demo interactions, and contact data.",
  path: "/privacy",
});

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
          {" "}
          <a
            href={whatsappUrl()}
            className="text-kasi-green hover:underline"
          >
            WhatsApp
          </a>{" "}
          or{" "}
          <a
            href={emailHref()}
            className="text-kasi-green hover:underline"
          >
            email
          </a>
          , and when configured, processed by our form delivery providers solely
          to deliver your message.
        </p>
        <p>
          Demo interactions use fictional data and local browser storage where
          noted. We do not sell personal information. To ask about data we hold
          from an enquiry, contact us on{" "}
          <a
            href={whatsappUrl()}
            className="text-kasi-green hover:underline"
          >
            WhatsApp
          </a>{" "}
          or{" "}
          <a
            href={emailHref()}
            className="text-kasi-green hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
