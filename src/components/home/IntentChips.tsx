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
      <div className="mt-3 flex flex-wrap gap-2">
        {intents.map((i) => (
          <Link
            key={i.label}
            href={i.href}
            className="inline-flex min-h-11 items-center border border-kasi-border px-4 py-2 text-[13px] tracking-wide text-kasi-ivory transition hover:border-kasi-green hover:bg-kasi-green hover:text-kasi-black"
          >
            {i.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
