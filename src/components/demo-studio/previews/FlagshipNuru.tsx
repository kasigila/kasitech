"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { FictionalBusiness } from "@/demo-studio/industries/businesses";
import type { PreviewCapabilities } from "@/demo-studio/configuration/capabilities";

type Props = {
  business: FictionalBusiness;
  caps: PreviewCapabilities;
  language: "en" | "sw";
  onLanguage?: (l: "en" | "sw") => void;
};

const PROPS = [
  {
    id: "p1",
    title: "Light-filled apartment · Masaki",
    price: "TSh 450,000,000",
    area: "Masaki",
    beds: 3,
    baths: 2,
    sqm: 168,
    img: "/demo/nuru/prop-1.jpg",
  },
  {
    id: "p2",
    title: "Garden villa · Mikocheni",
    price: "TSh 780,000,000",
    area: "Mikocheni",
    beds: 4,
    baths: 3,
    sqm: 240,
    img: "/demo/nuru/prop-2.jpg",
  },
  {
    id: "p3",
    title: "Sea-view flat · Oyster Bay",
    price: "TSh 620,000,000",
    area: "Oyster Bay",
    beds: 3,
    baths: 2,
    sqm: 190,
    img: "/demo/nuru/prop-3.jpg",
  },
  {
    id: "p4",
    title: "Family compound · Mbezi Beach",
    price: "TSh 920,000,000",
    area: "Mbezi Beach",
    beds: 5,
    baths: 4,
    sqm: 320,
    img: "/demo/nuru/prop-4.jpg",
  },
];

export function FlagshipNuru({ business: b, caps, language, onLanguage }: Props) {
  const [path, setPath] = useState("home");
  const [area, setArea] = useState("all");
  const [selected, setSelected] = useState<(typeof PROPS)[0] | null>(null);

  const listings = useMemo(() => {
    if (!caps.listingFilters || area === "all") return PROPS;
    return PROPS.filter((p) => p.area === area);
  }, [area, caps.listingFilters]);

  return (
    <div className="h-full overflow-y-auto bg-[#fafafa] text-[#111] [font-family:ui-sans-serif,system-ui,sans-serif]">
      <header className="sticky top-0 z-10 border-b border-black/8 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <button type="button" onClick={() => { setPath("home"); setSelected(null); }}>
            <div className="text-lg font-semibold tracking-tight">{b.name}</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#5b6b7a]">
              Dar es Salaam property advisory
            </div>
          </button>
          <nav className="hidden gap-5 text-[11px] uppercase tracking-[0.12em] md:flex">
            <button type="button" onClick={() => setPath("listings")}>Listings</button>
            {caps.agents && <button type="button" onClick={() => setPath("agents")}>Agents</button>}
            <button type="button" onClick={() => setPath("enquire")}>Enquire</button>
          </nav>
          <div className="flex items-center gap-2">
            {caps.multilingual && (
              <button
                type="button"
                className="border border-black/15 px-2 py-1 text-[10px]"
                onClick={() => onLanguage?.(language === "en" ? "sw" : "en")}
              >
                {language === "en" ? "SW" : "EN"}
              </button>
            )}
            {caps.propertyInquiry && (
              <button
                type="button"
                className="bg-[#111] px-3 py-2 text-[11px] uppercase tracking-wider text-white"
                onClick={() => setPath("enquire")}
              >
                Talk to an advisor
              </button>
            )}
          </div>
        </div>
      </header>

      {path === "home" && !selected && (
        <>
          <section className="relative h-[58vh] min-h-[340px]">
            <Image src="/demo/nuru/hero.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-[#111]/40" />
            <div className="absolute inset-0 flex items-end px-6 pb-12 md:px-12">
              <div className="max-w-xl text-white">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">
                  Homes with clear facts
                </p>
                <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">
                  Find the right address in Dar — priced, measured, mapped
                </h1>
                {caps.listings && (
                  <button
                    type="button"
                    className="mt-6 bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#111]"
                    onClick={() => setPath("listings")}
                  >
                    Browse listings
                  </button>
                )}
              </div>
            </div>
          </section>

          {caps.listings && (
            <section className="mx-auto max-w-6xl px-5 py-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Featured properties</h2>
                  <p className="mt-1 text-sm text-black/55">Realistic demo inventory for client walkthroughs</p>
                </div>
                {caps.listingFilters && (
                  <select
                    className="border border-black/15 bg-white px-3 py-2 text-sm"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  >
                    <option value="all">All areas</option>
                    {[...new Set(PROPS.map((p) => p.area))].map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {listings.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="overflow-hidden border border-black/8 bg-white text-left"
                    onClick={() => setSelected(p)}
                  >
                    <div className="relative aspect-[16/10]">
                      <Image src={p.img} alt="" fill className="object-cover" sizes="50vw" />
                    </div>
                    <div className="p-4">
                      <div className="text-lg font-semibold text-[#1a4d8c]">{p.price}</div>
                      <h3 className="mt-1 font-medium">{p.title}</h3>
                      <p className="mt-2 text-[12px] text-black/55">
                        {p.beds} beds · {p.baths} baths · {p.sqm} m² · {p.area}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              {caps.propertyMap && (
                <div className="mt-10 border border-black/10 bg-[#e8eef4] p-6">
                  <h3 className="font-medium">Map view</h3>
                  <p className="mt-1 text-sm text-black/55">
                    Demo map of Dar listings — pin clusters by neighbourhood.
                  </p>
                  <div className="mt-4 grid h-40 place-items-center text-sm text-black/40">
                    Map treatment · {listings.length} properties in view
                  </div>
                </div>
              )}
            </section>
          )}

          {caps.agents && (
            <section className="border-t border-black/8 bg-white px-5 py-12">
              <div className="mx-auto max-w-6xl">
                <h2 className="text-2xl font-semibold">Your advisors</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {b.team.map((m) => (
                    <div key={m.name} className="border border-black/8 p-4">
                      <div className="h-12 w-12 bg-[#dbe4ee]" />
                      <div className="mt-3 font-medium">{m.name}</div>
                      <div className="text-sm text-black/55">{m.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <footer className="border-t border-black/8 px-5 py-6 text-center text-[10px] text-black/40">
            {b.name} · Demo Mode — fictional agency for KasiTech Demo Studio
          </footer>
        </>
      )}

      {selected && (
        <div className="mx-auto max-w-3xl px-5 py-10">
          <button type="button" className="text-sm text-black/55" onClick={() => setSelected(null)}>
            ← All listings
          </button>
          <div className="relative mt-4 aspect-[16/9] overflow-hidden">
            <Image src={selected.img} alt="" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="mt-5 text-2xl font-semibold text-[#1a4d8c]">{selected.price}</div>
          <h1 className="mt-1 text-3xl font-semibold">{selected.title}</h1>
          <p className="mt-3 text-sm text-black/60">
            {selected.beds} bedrooms · {selected.baths} bathrooms · {selected.sqm} m² ·{" "}
            {selected.area}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-black/70">
            Bright living spaces with practical outdoor room — prepared as a
            realistic listing detail for client demos. Specs are fictional.
          </p>
          {caps.propertyInquiry && (
            <button
              type="button"
              className="mt-6 bg-[#111] px-5 py-3 text-[11px] uppercase tracking-wider text-white"
              onClick={() => setPath("enquire")}
            >
              Enquire about this property
            </button>
          )}
        </div>
      )}

      {path === "listings" && !selected && (
        <div className="mx-auto max-w-6xl px-5 py-10">
          <button type="button" className="text-sm text-black/55" onClick={() => setPath("home")}>
            ← Home
          </button>
          <h2 className="mt-4 text-3xl font-semibold">All listings</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {PROPS.map((p) => (
              <button
                key={p.id}
                type="button"
                className="flex gap-3 border border-black/8 bg-white p-2 text-left"
                onClick={() => setSelected(p)}
              >
                <div className="relative h-24 w-32 shrink-0 overflow-hidden">
                  <Image src={p.img} alt="" fill className="object-cover" sizes="128px" />
                </div>
                <div>
                  <div className="font-medium text-[#1a4d8c]">{p.price}</div>
                  <div className="text-sm">{p.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {path === "enquire" && (
        <div className="mx-auto max-w-md px-5 py-12">
          <button type="button" className="text-sm text-black/55" onClick={() => setPath("home")}>
            ← Back
          </button>
          <h2 className="mt-4 text-3xl font-semibold">Property enquiry</h2>
          <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input className="w-full border border-black/15 px-3 py-2 text-sm" placeholder="Name" />
            <input className="w-full border border-black/15 px-3 py-2 text-sm" placeholder="Phone / email" />
            <textarea className="w-full border border-black/15 px-3 py-2 text-sm" rows={3} placeholder="What are you looking for?" />
            <button type="submit" className="w-full bg-[#111] py-3 text-[11px] uppercase tracking-wider text-white">
              Send (demo)
            </button>
          </form>
        </div>
      )}

      {path === "agents" && caps.agents && (
        <div className="mx-auto max-w-3xl px-5 py-12">
          <button type="button" className="text-sm text-black/55" onClick={() => setPath("home")}>
            ← Back
          </button>
          <h2 className="mt-4 text-3xl font-semibold">Agents</h2>
          <ul className="mt-6 space-y-3">
            {b.team.map((m) => (
              <li key={m.name} className="border border-black/8 p-4">
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-black/55">{m.role}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
