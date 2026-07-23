"use client";

import Link from "next/link";

const intents = [
  { label: "Website", href: "/start?need=presence" },
  { label: "Booking", href: "/start?need=sell" },
  { label: "Shop", href: "/start?need=sell" },
  { label: "Custom System", href: "/start?need=system" },
  { label: "AI / Automation", href: "/start?need=automation" },
];

export function IntentChips() {
  return (
    <div className="mt-10">
      <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-grey">
        WHAT DO YOU NEED?
      </p>
      <div className="mt-3 flex flex-wrap gap-x-1 gap-y-2">
        {intents.map((i, idx) => (
          <span key={i.label} className="inline-flex items-center">
            <Link
              href={i.href}
              className="px-1 py-1 text-[13px] tracking-wide text-kasi-ivory/75 underline decoration-kasi-border underline-offset-4 transition hover:text-kasi-green hover:decoration-kasi-green"
            >
              {i.label}
            </Link>
            {idx < intents.length - 1 && (
              <span className="px-1 text-kasi-border" aria-hidden>
                /
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
