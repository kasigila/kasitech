"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import {
  emailHref,
  hasEmail,
  hasInstagram,
  hasLinkedIn,
  social,
} from "@/lib/social";
import {
  IconInstagram,
  IconLinkedIn,
  IconWhatsApp,
} from "@/components/site/SocialIcons";

export function Footer() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Dar_es_Salaam",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTime(formatter.format(new Date()));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-kasi-border bg-kasi-black px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl tracking-[-0.03em]">KasiTech</p>
          <p className="mt-3 max-w-xs text-sm text-kasi-grey">
            Digital technology studio.
          </p>
          <p className="mt-6 text-sm text-kasi-ivory/80">Dar es Salaam, Tanzania.</p>
          <p className="text-sm text-kasi-grey">Working worldwide.</p>
          <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
            DAR · {time} EAT
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            ["/work", "Work"],
            ["/capabilities", "Capabilities"],
            ["/about", "About"],
            ["/company", "Company"],
            ["/card", "Digital Card"],
            ["/faq", "FAQ"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="text-kasi-ivory/80 hover:text-kasi-green">
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            {hasLinkedIn() && (
              <a
                href={social.linkedin}
                className="text-kasi-ivory/80 hover:text-kasi-green"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <IconLinkedIn />
              </a>
            )}
            {hasInstagram() && (
              <a
                href={social.instagram}
                className="text-kasi-ivory/80 hover:text-kasi-green"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <IconInstagram />
              </a>
            )}
            {hasWhatsApp() && (
              <a
                href={whatsappUrl()}
                onClick={() => track("whatsapp_click", { source: "footer" })}
                className="text-kasi-ivory/80 hover:text-kasi-green"
                aria-label="WhatsApp"
              >
                <IconWhatsApp />
              </a>
            )}
          </div>
          {hasEmail() ? (
            <a href={emailHref()} className="text-sm hover:text-kasi-green">
              {social.email}
            </a>
          ) : (
            <Link href="/start" className="text-sm text-kasi-grey hover:text-kasi-green">
              Start a Project →
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col gap-4 border-t border-kasi-border pt-8 text-[12px] text-kasi-grey md:flex-row md:items-center md:justify-between">
        <p>© 2026 KasiTech</p>
        <div className="flex gap-6">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/work/000" className="hover:text-kasi-green">
            Built by KasiTech.
          </Link>
        </div>
      </div>
    </footer>
  );
}
