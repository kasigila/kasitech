import type { Metadata } from "next";
import Link from "next/link";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { social } from "@/lib/social";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  {
    q: "Do you build simple company websites?",
    a: "Yes. Presence sites — clear story, mobile-first, enquiry paths — are a core offering. Start there if you need credibility online first.",
  },
  {
    q: "Are the demos on the homepage real client projects?",
    a: "No. Those are interactive examples that show what we can build across industries. Shipped client work is listed separately (including Africa Climate Finance).",
  },
  {
    q: "How long does a website take?",
    a: "A focused presence site is typically 2–4 weeks. Booking or ecommerce is usually 4–8 weeks. Custom systems are scoped after discovery.",
  },
  {
    q: "How do pricing and quotes work?",
    a: "We quote after a short discovery so scope stays honest. Use Start a Project to share budget range and goals — we reply within 24 hours on business days.",
  },
  {
    q: "What do you need from me?",
    a: "Your story, offers, logos/photos if you have them, and decisions on content. We can help structure content if you don't have a writer.",
  },
  {
    q: "Do you support M-Pesa and local payments?",
    a: "Yes where the project needs it — especially commerce and booking work for East Africa.",
  },
  {
    q: "Who hosts the site?",
    a: "Most sites ship on modern hosting (often Vercel) with a domain you own. We help you connect the domain and go live.",
  },
  {
    q: "How do I reach a human quickly?",
    a: `WhatsApp +1 269 861 3487 (primary for projects), email ${social.email}, or save the digital card at /card. Mobile in Tanzania: +255 626 000 005.`,
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-32 md:px-8">
      <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
        FAQ
      </p>
      <h1 className="mt-6 font-display text-5xl tracking-[-0.04em] md:text-6xl">
        BEFORE YOU
        <br />
        ENQUIRE.
      </h1>
      <p className="mt-6 text-lg text-kasi-grey">
        Straight answers for website and product buyers.
      </p>

      <div className="mt-16 space-y-10">
        {faqs.map((f) => (
          <div key={f.q} className="border-t border-kasi-border pt-8">
            <h2 className="font-display text-xl tracking-[-0.02em] md:text-2xl">
              {f.q}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-kasi-grey">
              {f.a}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap gap-6">
        <Link
          href="/start"
          className="border border-kasi-green bg-kasi-green px-6 py-3 text-sm text-kasi-black"
        >
          START A PROJECT ↗
        </Link>
        {hasWhatsApp() && (
          <a
            href={whatsappUrl()}
            className="text-sm text-kasi-grey hover:text-kasi-ivory"
          >
            WhatsApp →
          </a>
        )}
      </div>
    </div>
  );
}
