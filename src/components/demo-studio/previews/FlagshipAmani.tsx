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
};

const SERVICES = [
  {
    name: "Signature Facial",
    blurb: "Custom skin ritual with botanical oils and deep hydration.",
    price: "From TSh 85,000",
    img: "/demo/amani/service-1.jpg",
  },
  {
    name: "Editorial Blowout",
    blurb: "Soft finish styling for events, shoots, and everyday polish.",
    price: "From TSh 45,000",
    img: "/demo/amani/service-2.jpg",
  },
  {
    name: "Nail Couture",
    blurb: "Clean manicure with long-wear colour and careful finishing.",
    price: "From TSh 35,000",
    img: "/demo/amani/service-3.jpg",
  },
];

const TREATMENTS = [
  "Amani Glow Facial · 75 min",
  "Scalp Ritual & Blowout · 60 min",
  "Bridal Prep Package · half day",
  "Express Brow & Lash · 40 min",
];

const HOURS = [
  ["Mon – Fri", "09:00 – 19:00"],
  ["Saturday", "09:00 – 17:00"],
  ["Sunday", "By appointment"],
];

export function FlagshipAmani({ business: b, caps, language, onLanguage }: Props) {
  const [path, setPath] = useState("home");
  const [staff, setStaff] = useState("Asha");
  const [booked, setBooked] = useState(false);

  const nav = [
    "Services",
    "Treatments",
    ...(caps.gallery ? ["Gallery"] : []),
    ...(caps.team || caps.bookingStaff ? ["Team"] : []),
    "Visit",
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#f7f3ee] text-[#1c1410] [font-family:Georgia,Times,serif]">
      <header className="sticky top-0 z-10 border-b border-[#1c1410]/10 bg-[#f7f3ee]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <button type="button" onClick={() => setPath("home")} className="text-left">
            <div className="text-[11px] tracking-[0.28em] uppercase text-[#8a6b4a]">
              Mikocheni · Dar es Salaam
            </div>
            <div className="mt-0.5 text-lg tracking-tight">{b.name}</div>
          </button>
          <nav className="hidden items-center gap-5 md:flex">
            {nav.map((n) => (
              <button
                key={n}
                type="button"
                className="text-[11px] tracking-[0.16em] uppercase opacity-70 hover:opacity-100"
                onClick={() => setPath(n.toLowerCase())}
              >
                {n}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {caps.multilingual && (
              <button
                type="button"
                className="border border-[#1c1410]/20 px-2 py-1 text-[10px] uppercase tracking-wider"
                onClick={() => onLanguage?.(language === "en" ? "sw" : "en")}
              >
                {language === "en" ? "SW" : "EN"}
              </button>
            )}
            {(caps.bookingApt || caps.bookingStaff) && (
              <button
                type="button"
                className="bg-[#1c1410] px-3 py-2 text-[11px] tracking-[0.12em] uppercase text-[#f7f3ee]"
                onClick={() => {
                  setBooked(false);
                  setPath("book");
                }}
              >
                {language === "sw" ? "Weka nafasi" : "Book"}
              </button>
            )}
          </div>
        </div>
      </header>

      {path === "home" && (
        <>
          <section className="relative min-h-[70vh]">
            <Image
              src="/demo/amani/hero.jpg"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1410]/75 via-[#1c1410]/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-6 pb-12 md:px-12">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#e8d7c0]">
                {language === "sw" ? "Uzuri wa kimya" : "Quiet luxury · Careful craft"}
              </p>
              <h1 className="mt-3 max-w-[14ch] text-4xl leading-[1.05] text-white md:text-6xl">
                {language === "sw"
                  ? "Nafasi ya kupumzika na kung'aa"
                  : "A calm studio for skin, hair, and presence"}
              </h1>
              <p className="mt-4 max-w-md text-sm text-white/80">
                {b.hero.subtitle}
              </p>
              {(caps.bookingApt || caps.bookingStaff) && (
                <button
                  type="button"
                  className="mt-6 bg-[#f7f3ee] px-5 py-3 text-[11px] tracking-[0.16em] uppercase text-[#1c1410]"
                  onClick={() => setPath("book")}
                >
                  Book appointment
                </button>
              )}
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-5 py-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] tracking-[0.22em] uppercase text-[#8a6b4a]">
                  Featured services
                </p>
                <h2 className="mt-2 text-3xl">What guests come for</h2>
              </div>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {SERVICES.map((s) => (
                <article key={s.name} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#e8ded3]">
                    <Image
                      src={s.img}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="mt-4 text-xl">{s.name}</h3>
                  <p className="mt-1 text-sm opacity-70">{s.blurb}</p>
                  <p className="mt-2 text-[12px] tracking-wide text-[#8a6b4a]">
                    {s.price}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="border-y border-[#1c1410]/10 bg-[#efe8df] px-5 py-14">
            <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
              <div>
                <p className="text-[11px] tracking-[0.22em] uppercase text-[#8a6b4a]">
                  Signature treatments
                </p>
                <h2 className="mt-2 text-3xl">Rituals, not rush</h2>
                <ul className="mt-6 space-y-3 text-sm">
                  {TREATMENTS.map((t) => (
                    <li key={t} className="border-b border-[#1c1410]/10 pb-3">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-[280px] overflow-hidden">
                <Image
                  src="/demo/amani/gallery-1.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>
          </section>

          {(caps.bookingApt || caps.bookingStaff) && (
            <section className="mx-auto max-w-5xl px-5 py-14 text-center">
              <h2 className="text-3xl">Ready when you are</h2>
              <p className="mx-auto mt-3 max-w-md text-sm opacity-70">
                Choose a service
                {caps.bookingStaff ? ", pick your stylist," : ","} and lock a time
                that fits your week.
                {caps.payments ? " A deposit secures your appointment." : ""}
              </p>
              <button
                type="button"
                className="mt-6 bg-[#1c1410] px-6 py-3 text-[11px] tracking-[0.16em] uppercase text-[#f7f3ee]"
                onClick={() => setPath("book")}
              >
                Book appointment
              </button>
            </section>
          )}

          {caps.gallery && (
            <section className="px-5 py-10">
              <div className="mx-auto max-w-5xl">
                <h2 className="text-2xl">Studio atmosphere</h2>
                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {[
                    "/demo/amani/gallery-1.jpg",
                    "/demo/amani/gallery-2.jpg",
                    "/demo/amani/gallery-3.jpg",
                    "/demo/amani/service-1.jpg",
                    "/demo/amani/service-2.jpg",
                    "/demo/amani/hero.jpg",
                  ].map((src) => (
                    <div key={src} className="relative aspect-[4/3] overflow-hidden">
                      <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {(caps.team || caps.bookingStaff) && (
            <section className="mx-auto max-w-5xl px-5 py-14">
              <h2 className="text-2xl">Meet the team</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {b.team.map((m, i) => (
                  <article key={m.name}>
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#e8ded3]">
                      <Image
                        src={`/demo/amani/team-${(i % 3) + 1}.jpg`}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="33vw"
                      />
                    </div>
                    <h3 className="mt-3 text-lg">{m.name}</h3>
                    <p className="text-sm opacity-65">{m.role}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="bg-[#1c1410] px-5 py-14 text-[#f7f3ee]">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[11px] tracking-[0.22em] uppercase text-[#c4a882]">
                  {caps.reviews ? "Guest reviews" : "Words from the chair"}
                </p>
                <blockquote className="mt-5 text-2xl leading-snug md:text-3xl">
                  “The pacing, the light, the care — Amani feels like a private
                  ritual, not a queue.”
                </blockquote>
                <p className="mt-4 text-sm opacity-60">Neema M. · Masaki</p>
              </div>
            </section>

          <section className="mx-auto grid max-w-5xl gap-8 px-5 py-14 md:grid-cols-2">
            <div>
              <h2 className="text-2xl">Visit the studio</h2>
              <p className="mt-2 text-sm opacity-70">{b.city}</p>
              <p className="mt-1 text-sm opacity-70">{b.phone}</p>
              <p className="text-sm opacity-70">{b.email}</p>
              {caps.googleBusiness && (
                <p className="mt-4 text-[12px] text-[#8a6b4a]">
                  Find us on Google Business Profile · maps & hours synced
                </p>
              )}
            </div>
            <div>
              <h3 className="text-sm tracking-[0.16em] uppercase opacity-60">
                Opening hours
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {HOURS.map(([d, h]) => (
                  <li key={d} className="flex justify-between border-b border-black/10 pb-2">
                    <span>{d}</span>
                    <span className="opacity-70">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {caps.socialLinks && (
            <section className="border-t border-black/10 px-5 py-10 text-center">
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#8a6b4a]">
                Instagram
              </p>
              <p className="mt-2 text-sm opacity-70">@amanibeautystudio · daily studio notes</p>
            </section>
          )}

          <footer className="border-t border-black/10 px-5 py-6 text-center text-[10px] opacity-50">
            {b.name} · Demo Mode — fictional business for KasiTech Demo Studio
          </footer>
        </>
      )}

      {path === "book" && (caps.bookingApt || caps.bookingStaff) && (
        <div className="mx-auto max-w-md px-5 py-12">
          <button type="button" className="text-sm opacity-60" onClick={() => setPath("home")}>
            ← Back
          </button>
          <h2 className="mt-4 text-3xl">Book appointment</h2>
          {!booked ? (
            <form
              className="mt-6 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setBooked(true);
              }}
            >
              <select className="w-full border border-black/15 bg-white px-3 py-2 text-sm">
                <option>Signature Facial</option>
                <option>Editorial Blowout</option>
                <option>Nail Couture</option>
              </select>
              {caps.bookingStaff && (
                <select
                  className="w-full border border-black/15 bg-white px-3 py-2 text-sm"
                  value={staff}
                  onChange={(e) => setStaff(e.target.value)}
                >
                  {b.team.map((m) => (
                    <option key={m.name}>{m.name}</option>
                  ))}
                </select>
              )}
              <input className="w-full border border-black/15 bg-white px-3 py-2 text-sm" placeholder="Preferred date" required />
              <input className="w-full border border-black/15 bg-white px-3 py-2 text-sm" placeholder="Your name" required />
              {caps.payments && (
                <p className="text-[12px] opacity-65">
                  A TSh 20,000 deposit holds your chair. Balance due in studio.
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-[#1c1410] py-3 text-[11px] tracking-[0.16em] uppercase text-[#f7f3ee]"
              >
                Confirm booking
              </button>
            </form>
          ) : (
            <p className="mt-6 text-sm">
              Appointment reserved with {caps.bookingStaff ? staff : "the studio"} (demo).
              No real booking was made.
            </p>
          )}
        </div>
      )}

      {path !== "home" && path !== "book" && (
        <div className="mx-auto max-w-3xl px-5 py-12">
          <button type="button" className="text-sm opacity-60" onClick={() => setPath("home")}>
            ← Back
          </button>
          <h2 className="mt-4 text-3xl capitalize">{path}</h2>
          <p className="mt-3 text-sm opacity-70">
            Explore this section from the home page layout — Demo Studio keeps the
            full experience on one continuous page for client meetings.
          </p>
        </div>
      )}
    </div>
  );
}
