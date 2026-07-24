"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { capabilityVisuals } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

const categories = [
  {
    id: "experiences",
    title: "EXPERIENCES",
    body: "Websites people remember and understand.",
    href: "/capabilities#experiences",
    preview: "Brand sites · UX · CMS · Performance",
    image: capabilityVisuals.experiences,
  },
  {
    id: "commerce",
    title: "COMMERCE",
    body: "Selling, booking, and payments without unnecessary friction.",
    href: "/capabilities#commerce",
    preview: "Ecommerce · Booking · Ticketing · M-Pesa",
    image: capabilityVisuals.commerce,
  },
  {
    id: "systems",
    title: "SYSTEMS",
    body: "Software built around how your business actually operates.",
    href: "/capabilities#systems",
    preview: "Portals · Dashboards · CRM · Inventory",
    image: capabilityVisuals.systems,
  },
  {
    id: "intelligence",
    title: "INTELLIGENCE",
    body: "Data, AI, and automation that reduce manual work and improve decisions.",
    href: "/capabilities#intelligence",
    preview: "Analytics · AI · Workflows · Integrations",
    image: capabilityVisuals.intelligence,
  },
] as const;

export function WhatWeBuild() {
  const [active, setActive] = useState<(typeof categories)[number]["id"]>(
    "experiences",
  );
  const activeCat = categories.find((c) => c.id === active)!;

  return (
    <section className="bg-kasi-ivory px-5 py-28 text-kasi-black md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          WHAT KASITECH BUILDS
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
          FROM FIRST CLICK
          <br />
          TO DAILY OPERATIONS.
        </h2>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="divide-y divide-kasi-black/15 border-y border-kasi-black/15">
            {categories.map((c) => {
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onMouseEnter={() => setActive(c.id)}
                  onFocus={() => setActive(c.id)}
                  onClick={() => setActive(c.id)}
                  className={cn(
                    "w-full py-6 text-left transition",
                    isActive ? "opacity-100" : "opacity-55 hover:opacity-80",
                  )}
                >
                  <p className="font-mono text-[11px] tracking-[0.16em]">
                    {c.title}
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-kasi-black/70">
                    {c.body}
                  </p>
                  {isActive && (
                    <Link
                      href={c.href}
                      className="mt-4 inline-block text-sm hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Explore →
                    </Link>
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative aspect-[4/3] overflow-hidden border border-kasi-black/10 bg-kasi-black/5">
            <SafeImage
              key={activeCat.id}
              src={activeCat.image}
              alt=""
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              fallbackLabel={activeCat.title}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-kasi-ivory">
              <p className="font-mono text-[10px] tracking-[0.16em] text-kasi-green">
                {activeCat.title}
              </p>
              <p className="mt-2 text-sm">{activeCat.preview}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
