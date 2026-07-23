"use client";

import Link from "next/link";

const intents = [
  { label: "Website", href: "/start?need=presence" },
  { label: "Booking", href: "/start?need=sell" },
  { label: "Shop", href: "/start?need=sell" },
  { label: "Custom system", href: "/start?need=system" },
  { label: "AI / automation", href: "/start?need=automation" },
];

export function IntentChips() {
  return (
    <div className="mt-8">
      <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-grey">
        WHAT DO YOU NEED?
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {intents.map((i) => (
          <Link
            key={i.label}
            href={i.href}
            className="border border-kasi-border px-3 py-2 text-[12px] tracking-wide text-kasi-ivory/85 transition hover:border-kasi-green hover:text-kasi-green"
          >
            {i.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
