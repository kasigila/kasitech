import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CardMotion, CardMotionLate } from "@/components/card/CardMotion";
import { CardQr } from "@/components/card/CardQr";
import { SaveContactButton } from "@/components/card/SaveContactButton";
import {
  IconInstagram,
  IconLinkedIn,
  IconWhatsApp,
} from "@/components/site/SocialIcons";
import { founderPhoto } from "@/data/images";
import { businessCard as c, cardWhatsAppUrl } from "@/lib/card";
import { hasInstagram, hasLinkedIn } from "@/lib/social";

const contactPrimaryNote =
  "Project chat: WhatsApp. Tanzania mobile is for calls/SMS.";

export const metadata: Metadata = {
  title: "Digital Business Card",
  description:
    "Save KasiTech founder Karen Marie Kasigila to your contacts. Mobile, WhatsApp, email, and website.",
  openGraph: {
    title: "KasiTech · Digital Business Card",
    description: "Save Karen Marie Kasigila, Founder of KasiTech, to your phone.",
    url: "/card",
  },
};

function ContactRow({
  label,
  href,
  value,
}: {
  label: string;
  href: string;
  value: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-baseline justify-between gap-4 border-b border-kasi-border py-4 transition"
    >
      <span className="font-mono text-[10px] tracking-[0.18em] text-kasi-grey">
        {label}
      </span>
      <span className="text-right text-sm text-kasi-ivory group-hover:text-kasi-green md:text-base">
        {value}
      </span>
    </a>
  );
}

export default function CardPage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-kasi-black px-5 py-10 md:px-8 md:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(199,255,0,0.12),transparent_45%),radial-gradient(ellipse_at_90%_80%,rgba(244,242,234,0.06),transparent_40%)]"
      />

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-[15px] tracking-[-0.02em] text-kasi-ivory"
          >
            KasiTech
          </Link>
          <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-grey">
            DIGITAL CARD
          </p>
        </div>

        <CardMotion>
          <div className="mt-12">
            <div className="relative mb-8 h-28 w-28 overflow-hidden border border-kasi-border">
              <Image
                src={founderPhoto.src}
                alt={founderPhoto.alt}
                width={224}
                height={224}
                className="h-full w-full object-cover object-[center_18%]"
                sizes="112px"
                priority
              />
            </div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-kasi-green">
              {c.org.toUpperCase()}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.04em] text-kasi-ivory md:text-5xl">
              {c.fullName}
            </h1>
            <p className="mt-3 text-sm text-kasi-grey">
              {c.title} · {c.tagline}
            </p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-kasi-grey">
              {c.location}
            </p>
          </div>
        </CardMotion>

        <CardMotionLate delay={0.12}>
          <div className="mt-10">
            <ContactRow
              label="MOBILE (CALL/SMS)"
              href={`tel:${c.mobileE164}`}
              value={c.mobile}
            />
            <ContactRow
              label="WHATSAPP (PROJECT CHAT)"
              href={cardWhatsAppUrl()}
              value={c.whatsapp}
            />
            <ContactRow
              label="EMAIL"
              href={`mailto:${c.email}`}
              value={c.email}
            />
            <ContactRow
              label="WEB"
              href="https://www.kasitechinnovations.com"
              value="www.kasitechinnovations.com"
            />
            <p className="mt-4 text-[12px] leading-relaxed text-kasi-grey">
              {contactPrimaryNote}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-5">
            {hasLinkedIn() && (
              <a
                href={c.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex min-h-11 min-w-11 items-center justify-center text-kasi-grey transition hover:text-kasi-green"
              >
                <IconLinkedIn />
              </a>
            )}
            {hasInstagram() && (
              <a
                href={c.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex min-h-11 min-w-11 items-center justify-center text-kasi-grey transition hover:text-kasi-green"
              >
                <IconInstagram />
              </a>
            )}
            <a
              href={cardWhatsAppUrl()}
              aria-label="WhatsApp project chat"
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-kasi-grey transition hover:text-kasi-green"
            >
              <IconWhatsApp />
            </a>
          </div>
        </CardMotionLate>

        <CardMotionLate delay={0.22}>
          <div className="mt-10">
            <SaveContactButton />
          </div>

          <div className="mt-10 flex items-end justify-between gap-6 border-t border-kasi-border pt-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] text-kasi-grey">
                SCAN TO OPEN
              </p>
              <p className="mt-2 max-w-[16ch] text-sm text-kasi-ivory/80">
                Share this card. Scan to save KasiTech on any phone.
              </p>
            </div>
            <CardQr className="h-[112px] w-[112px] shrink-0 overflow-hidden [&_svg]:h-full [&_svg]:w-full" />
          </div>
        </CardMotionLate>

        <div className="relative mt-12 space-y-3 text-center">
          <p className="font-mono text-[10px] tracking-[0.14em] text-kasi-grey">
            EST. 2026 · DAR ES SALAAM
          </p>
          <div className="flex justify-center gap-5 text-[12px] text-kasi-grey">
            <Link href="/privacy" className="hover:text-kasi-green">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-kasi-green">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
