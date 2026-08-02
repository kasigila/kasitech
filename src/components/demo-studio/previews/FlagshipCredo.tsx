"use client";

import Image from "next/image";
import { useState } from "react";
import type { FictionalBusiness } from "@/demo-studio/industries/businesses";
import type { PreviewCapabilities } from "@/demo-studio/configuration/capabilities";

type Props = {
  business: FictionalBusiness;
  caps: PreviewCapabilities;
  language: "en" | "sw";
  onLanguage?: (l: "en" | "sw") => void;
  initialPath?: string;
};

const VERTICALS = [
  {
    id: "solar-ac",
    name: "Smart Solar AC",
    blurb: "CREDO™ Solar Breeze, Tower, and Force for homes and commercial spaces.",
    icon: "/demo/credo/credo-icon-solar.png",
  },
  {
    id: "utilities",
    name: "Smart Utilities",
    blurb: "Prepaid water and electricity meters with software and analytics.",
    icon: "/demo/credo/credo-icon-utilities.png",
  },
  {
    id: "renewables",
    name: "Solar & Renewables",
    blurb: "Streetlights, benches, shelters, home kits, and solar infrastructure.",
    icon: "/demo/credo/credo-icon-solar.png",
  },
  {
    id: "ev",
    name: "EV Solutions",
    blurb: "Smart charging stations, portable chargers, and roadside power kits.",
    icon: "/demo/credo/credo-icon-ev.png",
  },
  {
    id: "drones",
    name: "Drone Technology",
    blurb: "Agricultural, surveillance, law enforcement, and civilian systems.",
    icon: "/demo/credo/credo-icon-drones.png",
  },
  {
    id: "telecom",
    name: "Digital & Telecom",
    blurb: "CREDO™ TELECOM (upcoming ISP), satellite, AI, and smart city.",
    icon: "/demo/credo/credo-icon-telecom.png",
  },
];

const SOLAR_AC = [
  {
    name: "CREDO™ Solar Breeze",
    blurb: "Compact solar cooling for homes, offices, and small spaces.",
    img: "/demo/credo/credo-ac-1.png",
  },
  {
    name: "CREDO™ Solar Tower",
    blurb: "Hybrid solar cooling for larger living rooms and open-plan spaces.",
    img: "/demo/credo/credo-ac-2.png",
  },
  {
    name: "CREDO™ Solar Force",
    blurb: "Industrial-grade solar cooling for halls and commercial rooms.",
    img: "/demo/credo/credo-ac-3.png",
  },
];

const PROJECTS = [
  {
    title: "Municipal metering rollout",
    sector: "Smart Utilities",
    note: "Template ready for Credo-supplied deployment details.",
  },
  {
    title: "Commercial solar cooling",
    sector: "Solar AC",
    note: "Structure prepared. Real case content added when Credo provides it.",
  },
  {
    title: "EV charging pilot",
    sector: "EV Solutions",
    note: "Proof library slot for institutional and roadside installs.",
  },
];

function normalizePath(raw?: string): string {
  if (!raw) return "home";
  const p = raw.trim().toLowerCase();
  if (p === "inquiry" || p === "quote" || p === "contact") return "enquiry";
  if (p === "home" || p === "homepage") return "home";
  if (p === "solutions") return "solutions";
  return p;
}

export function FlagshipCredo({
  business: b,
  caps,
  language,
  onLanguage,
  initialPath = "home",
}: Props) {
  const [path, setPath] = useState(() => normalizePath(initialPath));
  const [quoteDone, setQuoteDone] = useState(false);
  const [audience, setAudience] = useState("residential");
  const [vertical, setVertical] = useState("solar-ac");

  const nav = [
    { id: "products", label: "Products" },
    { id: "solutions", label: "Solutions" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "enquiry", label: language === "sw" ? "Ombi la bei" : "Request a quote" },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#f3f7f5] text-[#0c1612] [font-family:ui-sans-serif,system-ui,sans-serif]">
      <header className="sticky top-0 z-10 border-b border-[#0c1612]/10 bg-[#f3f7f5]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <button
            type="button"
            className="flex items-center gap-3"
            onClick={() => setPath("home")}
            aria-label="Credo Energy Group home"
          >
            <Image
              src="/demo/credo/credo-logo-dark.png"
              alt="Credo Energy Group"
              width={148}
              height={49}
              className="h-8 w-auto md:h-9"
              priority
            />
          </button>
          <nav className="hidden items-center gap-5 md:flex">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`text-[11px] uppercase tracking-[0.14em] ${
                  path === item.id ? "text-[#0b6e4f]" : "opacity-65 hover:opacity-100"
                }`}
                onClick={() => setPath(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {caps.multilingual && (
              <button
                type="button"
                className="border border-[#0c1612]/15 px-2 py-1 text-[10px] uppercase"
                onClick={() => onLanguage?.(language === "en" ? "sw" : "en")}
              >
                {language === "en" ? "SW" : "EN"}
              </button>
            )}
            <button
              type="button"
              className="bg-[#0b6e4f] px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-white"
              onClick={() => {
                setQuoteDone(false);
                setPath("enquiry");
              }}
            >
              {language === "sw" ? "Omba bei" : "Request a quote"}
            </button>
          </div>
        </div>
      </header>

      {path === "home" && (
        <>
          <section className="relative min-h-[52vh]">
            <Image
              src="/demo/credo/credo-hero-1.jpg"
              alt="Credo Energy Group"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c1612]/88 via-[#0c1612]/55 to-[#0c1612]/25" />
            <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-6xl flex-col justify-end px-5 pb-10 pt-20 md:px-8">
              <Image
                src="/demo/credo/credo-logo-footer.png"
                alt=""
                width={120}
                height={78}
                className="mb-4 h-12 w-auto opacity-95"
              />
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8fd4b5]">
                {b.hero.eyebrow}
              </p>
              <h1 className="mt-3 max-w-[18ch] text-3xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl">
                {language === "sw"
                  ? "Mifumo ya nishati kwa muongo ujao wa Afrika."
                  : b.hero.title}
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/75 md:text-base">
                {language === "sw"
                  ? "Baridi ya jua, huduma mahiri, nishati mbadala, EV, drones, na miundombinu ya kidijitali."
                  : b.hero.subtitle}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="bg-[#0b6e4f] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-white"
                  onClick={() => setPath("enquiry")}
                >
                  {b.hero.cta}
                </button>
                <button
                  type="button"
                  className="border border-white/40 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-white"
                  onClick={() => setPath("products")}
                >
                  Explore products
                </button>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#0b6e4f]">
                  Portfolio
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                  Six verticals. One group.
                </h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {VERTICALS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setPath("products")}
                  className="border border-[#0c1612]/10 bg-white p-4 text-left transition hover:border-[#0b6e4f]/40"
                >
                  <Image src={v.icon} alt="" width={36} height={36} className="h-8 w-auto" />
                  <div className="mt-3 text-sm font-semibold">{v.name}</div>
                  <p className="mt-1 text-xs leading-relaxed opacity-65">{v.blurb}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="border-y border-[#0c1612]/8 bg-white">
            <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#0b6e4f]">
                Flagship
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                CREDO™ Smart Solar AC
              </h2>
              <p className="mt-2 max-w-2xl text-sm opacity-70">
                Efficient. Elegant. Eco-powered. Three models staged clearly so buyers
                can choose without digging through a generic catalogue.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {SOLAR_AC.map((p) => (
                  <div key={p.name} className="border border-[#0c1612]/8 bg-[#f3f7f5] p-4">
                    <div className="flex h-40 items-center justify-center bg-white">
                      <Image
                        src={p.img}
                        alt={p.name}
                        width={160}
                        height={180}
                        className="h-36 w-auto object-contain"
                      />
                    </div>
                    <div className="mt-3 text-sm font-semibold">{p.name}</div>
                    <p className="mt-1 text-xs opacity-65">{p.blurb}</p>
                    <button
                      type="button"
                      className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-[#0b6e4f]"
                      onClick={() => setPath("enquiry")}
                    >
                      Request a quote →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
            <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#0b6e4f]">
                  Proof
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                  Projects that earn confidence
                </h2>
                <p className="mt-2 text-sm opacity-70">
                  A structured proof library. Real deployments appear when Credo supplies
                  them. We do not invent claims.
                </p>
                <button
                  type="button"
                  className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-[#0b6e4f]"
                  onClick={() => setPath("projects")}
                >
                  View projects →
                </button>
              </div>
              <div className="relative min-h-[180px] overflow-hidden">
                <Image
                  src="/demo/credo/credo-hero-2.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
            </div>
          </section>
        </>
      )}

      {path === "products" && (
        <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#0b6e4f]">Products</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Catalogue by vertical
          </h1>
          <p className="mt-2 max-w-2xl text-sm opacity-70">
            Buyers land in the right family first. Specs and quote paths sit next to each
            product, not behind a generic contact page.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {VERTICALS.map((v) => (
              <div key={v.id} className="border border-[#0c1612]/10 bg-white p-5">
                <Image src={v.icon} alt="" width={36} height={36} className="h-8 w-auto" />
                <div className="mt-3 text-base font-semibold">{v.name}</div>
                <p className="mt-1 text-xs opacity-65">{v.blurb}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-semibold">CREDO™ Smart Solar AC line</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {SOLAR_AC.map((p) => (
                <div key={p.name} className="border border-[#0c1612]/8 bg-white p-4">
                  <div className="flex h-36 items-center justify-center bg-[#f3f7f5]">
                    <Image
                      src={p.img}
                      alt={p.name}
                      width={140}
                      height={160}
                      className="h-32 w-auto object-contain"
                    />
                  </div>
                  <div className="mt-3 text-sm font-semibold">{p.name}</div>
                  <p className="mt-1 text-xs opacity-65">{p.blurb}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {path === "solutions" && (
        <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#0b6e4f]">Solutions</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Built for how Credo sells
          </h1>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "Residential & SME",
                d: "Solar AC, home kits, and clear quote paths for homeowners and small businesses.",
              },
              {
                t: "Municipal & utility",
                d: "Metering, street infrastructure, and institutional buying journeys.",
              },
              {
                t: "Partners & distributors",
                d: "Catalogue clarity, file-ready enquiries, and segmented intake for B2B.",
              },
            ].map((s) => (
              <div key={s.t} className="border border-[#0c1612]/10 bg-white p-5">
                <div className="text-base font-semibold">{s.t}</div>
                <p className="mt-2 text-sm opacity-70">{s.d}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {path === "projects" && (
        <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#0b6e4f]">Projects</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Proof library</h1>
          <p className="mt-2 max-w-2xl text-sm opacity-70">
            Structure is ready. Case content is added from Credo-supplied deployments only.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PROJECTS.map((p) => (
              <div key={p.title} className="border border-[#0c1612]/10 bg-white p-5">
                <div className="text-[10px] uppercase tracking-[0.14em] text-[#0b6e4f]">
                  {p.sector}
                </div>
                <div className="mt-2 text-base font-semibold">{p.title}</div>
                <p className="mt-2 text-xs opacity-65">{p.note}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {path === "about" && (
        <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
            <div>
              <Image
                src="/demo/credo/credo-logo-dark.png"
                alt="Credo Energy Group"
                width={180}
                height={60}
                className="h-10 w-auto"
              />
              <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-[#0b6e4f]">
                About
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                A Tanzanian group building Africa&apos;s energy future.
              </h1>
              <p className="mt-3 text-sm leading-relaxed opacity-75">
                Credo Energy Group works across sustainable development, innovation, and
                industrial projects: solar cooling, smart utilities, renewables, EV,
                drones, and an emerging digital and telecom agenda.
              </p>
              <p className="mt-3 text-sm leading-relaxed opacity-75">
                This About page replaces placeholder copy with a clear group narrative,
                verified contact facts, and room for leadership Credo chooses to publish.
              </p>
            </div>
            <div className="relative min-h-[260px] overflow-hidden bg-[#0c1612]">
              <Image
                src="/demo/credo/credo-hero-3.jpg"
                alt=""
                fill
                className="object-cover opacity-90"
                sizes="40vw"
              />
            </div>
          </div>
          {caps.team && (
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {b.team.map((member) => (
                <div key={member.name} className="border border-[#0c1612]/10 bg-white p-4">
                  <div className="text-sm font-semibold">{member.name}</div>
                  <div className="mt-1 text-xs opacity-60">{member.role}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {path === "enquiry" && (
        <section className="mx-auto max-w-3xl px-5 py-10 md:px-8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#0b6e4f]">
            Request a quote
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            The right enquiry path, first time.
          </h1>
          <p className="mt-2 text-sm opacity-70">
            Segmented intake for energy buyers. No web-design or branding form options.
          </p>

          {quoteDone ? (
            <div className="mt-8 border border-[#0b6e4f]/30 bg-white p-6">
              <div className="text-lg font-semibold text-[#0b6e4f]">Request received</div>
              <p className="mt-2 text-sm opacity-70">
                Demo confirmation only. In production, this routes to Credo&apos;s sales desk
                with audience and vertical attached.
              </p>
              <button
                type="button"
                className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-[#0b6e4f]"
                onClick={() => setQuoteDone(false)}
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              className="mt-8 space-y-4 border border-[#0c1612]/10 bg-white p-6"
              onSubmit={(e) => {
                e.preventDefault();
                setQuoteDone(true);
              }}
            >
              <label className="block text-xs">
                <span className="mb-1 block font-semibold uppercase tracking-wider opacity-60">
                  Buyer type
                </span>
                <select
                  className="w-full border border-[#0c1612]/15 bg-[#f3f7f5] px-3 py-2 text-sm"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                >
                  <option value="residential">Residential / homeowner</option>
                  <option value="commercial">Commercial / SME</option>
                  <option value="municipal">Municipal / utility</option>
                  <option value="distributor">Distributor / partner</option>
                </select>
              </label>
              <label className="block text-xs">
                <span className="mb-1 block font-semibold uppercase tracking-wider opacity-60">
                  Interest
                </span>
                <select
                  className="w-full border border-[#0c1612]/15 bg-[#f3f7f5] px-3 py-2 text-sm"
                  value={vertical}
                  onChange={(e) => setVertical(e.target.value)}
                >
                  {VERTICALS.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs">
                <span className="mb-1 block font-semibold uppercase tracking-wider opacity-60">
                  Name
                </span>
                <input
                  required
                  className="w-full border border-[#0c1612]/15 bg-[#f3f7f5] px-3 py-2 text-sm"
                  placeholder="Your name"
                />
              </label>
              <label className="block text-xs">
                <span className="mb-1 block font-semibold uppercase tracking-wider opacity-60">
                  Email or phone
                </span>
                <input
                  required
                  className="w-full border border-[#0c1612]/15 bg-[#f3f7f5] px-3 py-2 text-sm"
                  placeholder="How should Credo reach you?"
                />
              </label>
              <label className="block text-xs">
                <span className="mb-1 block font-semibold uppercase tracking-wider opacity-60">
                  Project notes
                </span>
                <textarea
                  className="min-h-[90px] w-full border border-[#0c1612]/15 bg-[#f3f7f5] px-3 py-2 text-sm"
                  placeholder="Site location, quantity, timeline…"
                />
              </label>
              {caps.fileUpload && (
                <div className="border border-dashed border-[#0c1612]/20 px-3 py-4 text-xs opacity-60">
                  File upload slot (optional add-on ADD-FILE)
                </div>
              )}
              <button
                type="submit"
                className="bg-[#0b6e4f] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-white"
              >
                Submit quote request
              </button>
            </form>
          )}
        </section>
      )}

      <footer className="mt-auto border-t border-[#0c1612]/10 bg-[#0c1612] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 md:px-8">
          <Image
            src="/demo/credo/credo-logo-footer.png"
            alt="Credo Energy Group"
            width={120}
            height={78}
            className="h-12 w-auto"
          />
          <div className="text-xs text-white/55">
            <div>{b.city}</div>
            <div>{b.email}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/35">
              Conceptual preview · Proposal Companion
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
