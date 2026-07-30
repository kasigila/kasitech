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

const TOURS = [
  {
    id: "serengeti",
    name: "Serengeti Dawn Safari",
    duration: "3 days",
    location: "Northern Circuit",
    price: "From USD 890",
    img: "/demo/tembea/tour-1.jpg",
    highlights: ["Sunrise game drive", "Mobile camp nights", "Guide-led tracking"],
    itinerary: [
      "Day 1 — Arrive Arusha · transfer to Serengeti gate",
      "Day 2 — Full-day game drive · sundowner",
      "Day 3 — Dawn drive · return",
    ],
    includes: ["Park fees", "Meals on safari", "Private guide"],
  },
  {
    id: "zanzibar",
    name: "Zanzibar Spice & Shore",
    duration: "4 days",
    location: "Unguja",
    price: "From USD 620",
    img: "/demo/tembea/tour-2.jpg",
    highlights: ["Stone Town walk", "Spice farm lunch", "Nungwi coast"],
    itinerary: [
      "Day 1 — Stone Town heritage",
      "Day 2 — Spice farm · cooking",
      "Day 3–4 — Beach lodge · optional dhow",
    ],
    includes: ["Transfers", "Selected meals", "Local hosts"],
  },
  {
    id: "kilimanjaro",
    name: "Kilimanjaro Footpath",
    duration: "2 days",
    location: "Marangu approaches",
    price: "From USD 410",
    img: "/demo/tembea/tour-3.jpg",
    highlights: ["Village trails", "Waterfall picnic", "Mountain views"],
    itinerary: [
      "Day 1 — Trail briefing · forest walk",
      "Day 2 — Viewpoint hike · return Moshi",
    ],
    includes: ["Guide", "Picnic lunch", "Park access"],
  },
];

export function FlagshipTembea({ business: b, caps, language, onLanguage }: Props) {
  const [path, setPath] = useState("home");
  const [tourId, setTourId] = useState<string | null>(null);
  const tour = TOURS.find((t) => t.id === tourId);

  return (
    <div className="h-full overflow-y-auto bg-[#f4f1ea] text-[#14201a] [font-family:ui-sans-serif,system-ui,sans-serif]">
      <header className="sticky top-0 z-10 border-b border-[#14201a]/10 bg-[#f4f1ea]/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <button type="button" onClick={() => { setPath("home"); setTourId(null); }} className="text-left">
            <div className="text-lg font-bold tracking-tight">{b.name}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#2f6b4f]">
              Discover Tanzania
            </div>
          </button>
          <nav className="hidden gap-5 text-[11px] uppercase tracking-[0.14em] md:flex">
            {["Experiences", ...(caps.tours ? ["Tours"] : []), "Destinations", "Plan"].map((n) => (
              <button
                key={n}
                type="button"
                className="opacity-70 hover:opacity-100"
                onClick={() => {
                  setTourId(null);
                  setPath(n.toLowerCase());
                }}
              >
                {n}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {caps.multilingual && (
              <button
                type="button"
                className="border border-[#14201a]/20 px-2 py-1 text-[10px] uppercase"
                onClick={() => onLanguage?.(language === "en" ? "sw" : "en")}
              >
                {language === "en" ? "Kiswahili" : "English"}
              </button>
            )}
            {(caps.tourInquiry || caps.tourBooking) && (
              <button
                type="button"
                className="bg-[#2f6b4f] px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-white"
                onClick={() => setPath("enquire")}
              >
                Enquire
              </button>
            )}
          </div>
        </div>
      </header>

      {path === "home" && !tour && (
        <>
          <section className="relative h-[72vh] min-h-[400px]">
            <Image src="/demo/tembea/hero.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#14201a]/75 via-[#14201a]/35 to-transparent" />
            <div className="absolute inset-0 flex items-end px-6 pb-14 md:px-12">
              <div className="max-w-xl text-white">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#9fd4b5]">
                  {language === "sw" ? "Safari za kweli" : "Real journeys · Local hosts"}
                </p>
                <h1 className="mt-3 text-4xl font-bold leading-[1.05] md:text-6xl">
                  {language === "sw"
                    ? "Gundua Tanzania kwa kasi yako"
                    : "Travel Tanzania with people who know the land"}
                </h1>
                <p className="mt-4 text-sm text-white/80">{b.hero.subtitle}</p>
                {caps.tours && (
                  <button
                    type="button"
                    className="mt-6 bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#14201a]"
                    onClick={() => setPath("tours")}
                  >
                    Browse experiences
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-5 py-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#2f6b4f]">Featured experiences</p>
            <h2 className="mt-2 text-3xl font-bold">Journeys guests actually take</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {TOURS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className="group text-left"
                  onClick={() => {
                    if (caps.tours) {
                      setTourId(t.id);
                      setPath("tour");
                    }
                  }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#dfe8e1]">
                    <Image
                      src={t.img}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="33vw"
                    />
                  </div>
                  <div className="mt-3 text-[11px] uppercase tracking-wider text-[#2f6b4f]">
                    {t.duration} · {t.location}
                  </div>
                  <h3 className="mt-1 text-xl font-semibold">{t.name}</h3>
                  <p className="mt-1 text-sm opacity-70">{t.price}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-[#14201a] px-5 py-14 text-white">
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
              <div className="relative min-h-[260px] overflow-hidden">
                <Image src="/demo/tembea/dest-1.jpg" alt="" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#9fd4b5]">Destinations</p>
                <h2 className="mt-2 text-3xl font-bold">North, coast, and mountain air</h2>
                <p className="mt-4 text-sm text-white/70">
                  From Serengeti plains to Unguja shores — curated routes with
                  transparent pacing and trusted partners.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-white/80">
                  <li>Northern Circuit safaris</li>
                  <li>Zanzibar culture & coast</li>
                  <li>Kilimanjaro approaches</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-3xl px-5 py-14 text-center">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#2f6b4f]">Trust</p>
            <blockquote className="mt-4 text-2xl font-medium leading-snug">
              “Clear itineraries, honest pacing, and guides who answered every
              question before we left Dar.”
            </blockquote>
            <p className="mt-3 text-sm opacity-60">Lena & Tomas · Berlin</p>
          </section>

          {(caps.tourInquiry || caps.tourBooking) && (
            <section className="border-t border-black/10 px-5 py-12 text-center">
              <h2 className="text-2xl font-bold">Plan with us</h2>
              <p className="mx-auto mt-2 max-w-md text-sm opacity-70">
                Tell us your dates and pace — we shape a route that fits.
              </p>
              <button
                type="button"
                className="mt-5 bg-[#2f6b4f] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-white"
                onClick={() => setPath("enquire")}
              >
                {caps.tourBooking ? "Request booking" : "Send enquiry"}
              </button>
            </section>
          )}

          <footer className="border-t border-black/10 px-5 py-6 text-center text-[10px] opacity-50">
            {b.name} · Demo Mode — fictional operator for KasiTech Demo Studio
          </footer>
        </>
      )}

      {(path === "tours" || path === "experiences") && caps.tours && !tour && (
        <div className="mx-auto max-w-6xl px-5 py-10">
          <h2 className="text-3xl font-bold">Tour catalog</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TOURS.map((t) => (
              <button
                key={t.id}
                type="button"
                className="border border-black/10 bg-white p-3 text-left"
                onClick={() => {
                  setTourId(t.id);
                  setPath("tour");
                }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={t.img} alt="" fill className="object-cover" sizes="33vw" />
                </div>
                <h3 className="mt-3 font-semibold">{t.name}</h3>
                <p className="text-sm opacity-65">
                  {t.duration} · {t.location}
                </p>
                <p className="mt-1 text-sm text-[#2f6b4f]">{t.price}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {path === "tour" && tour && (
        <div className="mx-auto max-w-3xl px-5 py-10">
          <button
            type="button"
            className="text-sm opacity-60"
            onClick={() => {
              setTourId(null);
              setPath("tours");
            }}
          >
            ← All tours
          </button>
          <div className="relative mt-4 aspect-[21/9] overflow-hidden">
            <Image src={tour.img} alt="" fill className="object-cover" sizes="100vw" />
          </div>
          <p className="mt-5 text-[11px] uppercase tracking-wider text-[#2f6b4f]">
            {tour.duration} · {tour.location}
          </p>
          <h1 className="mt-2 text-4xl font-bold">{tour.name}</h1>
          <p className="mt-2 text-lg text-[#2f6b4f]">{tour.price}</p>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider">Highlights</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm opacity-80">
            {tour.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          {caps.itinerary && (
            <>
              <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider">
                Sample itinerary
              </h3>
              <ol className="mt-2 space-y-2 text-sm opacity-80">
                {tour.itinerary.map((d) => (
                  <li key={d} className="border-l-2 border-[#2f6b4f] pl-3">
                    {d}
                  </li>
                ))}
              </ol>
            </>
          )}
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider">Includes</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm opacity-80">
            {tour.includes.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          {(caps.tourInquiry || caps.tourBooking) && (
            <button
              type="button"
              className="mt-8 bg-[#2f6b4f] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-white"
              onClick={() => setPath("enquire")}
            >
              {caps.tourBooking ? "Book this tour" : "Enquire about this tour"}
            </button>
          )}
        </div>
      )}

      {path === "enquire" && (
        <div className="mx-auto max-w-md px-5 py-12">
          <button type="button" className="text-sm opacity-60" onClick={() => setPath("home")}>
            ← Back
          </button>
          <h2 className="mt-4 text-3xl font-bold">
            {caps.tourBooking ? "Booking request" : "Tour enquiry"}
          </h2>
          <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input className="w-full border border-black/15 bg-white px-3 py-2 text-sm" placeholder="Name" />
            <input className="w-full border border-black/15 bg-white px-3 py-2 text-sm" placeholder="Email" />
            <input className="w-full border border-black/15 bg-white px-3 py-2 text-sm" placeholder="Preferred dates" />
            <textarea className="w-full border border-black/15 bg-white px-3 py-2 text-sm" rows={3} placeholder="Tell us what you want to see" />
            <button type="submit" className="w-full bg-[#2f6b4f] py-3 text-[11px] font-semibold uppercase tracking-wider text-white">
              Send (demo)
            </button>
          </form>
        </div>
      )}

      {(path === "destinations" || path === "plan") && (
        <div className="mx-auto max-w-3xl px-5 py-12">
          <button type="button" className="text-sm opacity-60" onClick={() => setPath("home")}>
            ← Back
          </button>
          <h2 className="mt-4 text-3xl font-bold capitalize">{path}</h2>
          <p className="mt-3 text-sm opacity-70">
            Destination storytelling and planning CTAs live on the home experience for client meetings.
          </p>
        </div>
      )}
    </div>
  );
}
