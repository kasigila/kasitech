"use client";

import { useMemo, useState } from "react";
import { DemoChrome } from "@/components/site/DemoChrome";
import {
  atlasColors as c,
  bizAnalytics,
  bizDocs,
  bizInvoices,
  bizPods,
  bizRoutes,
  bizShipments,
  cities,
  demoTrackId,
  drivers,
  estimateQuote,
  fleetAlerts,
  formatTzs,
  goodsTypes,
  mono,
  trackStops,
  vehicles,
} from "./data";

type Mode = "customer" | "business";
type View =
  | "home"
  | "track"
  | "quote"
  | "booked"
  | "portal"
  | "fleet"
  | "business";

type PortalTab =
  | "shipments"
  | "invoices"
  | "documents"
  | "analytics"
  | "routes"
  | "pod";

type FleetTab =
  | "vehicles"
  | "drivers"
  | "fuel"
  | "routes"
  | "status"
  | "alerts";

type BizTab = "overview" | "shipments" | "docs" | "analytics";

function DemoBadge() {
  return (
    <p
      className="text-[10px] uppercase tracking-[0.16em] text-[#1E4A7A]"
      style={mono}
    >
      KASI CONCEPT · DEMO DATA
    </p>
  );
}

function uid() {
  return `ATL-${48000 + Math.floor(Math.random() * 900)}`;
}

export function AtlasDemo() {
  const [mode, setMode] = useState<Mode>("customer");
  const [view, setView] = useState<View>("home");
  const [trackInput, setTrackInput] = useState(demoTrackId);
  const [trackError, setTrackError] = useState<string | null>(null);
  const [activeStop, setActiveStop] = useState(4);

  const [origin, setOrigin] = useState<(typeof cities)[number]>("Dar es Salaam");
  const [destination, setDestination] =
    useState<(typeof cities)[number]>("Arusha");
  const [weight, setWeight] = useState("48");
  const [length, setLength] = useState("60");
  const [width, setWidth] = useState("40");
  const [height, setHeight] = useState("35");
  const [goods, setGoods] =
    useState<(typeof goodsTypes)[number]>("General cargo");
  const [quote, setQuote] = useState<ReturnType<typeof estimateQuote> | null>(
    null,
  );
  const [bookId, setBookId] = useState<string | null>(null);

  const [portalTab, setPortalTab] = useState<PortalTab>("shipments");
  const [fleetTab, setFleetTab] = useState<FleetTab>("vehicles");
  const [bizTab, setBizTab] = useState<BizTab>("overview");

  const currentStop = trackStops[Math.min(activeStop, trackStops.length - 1)];

  const quotePreview = useMemo(() => {
    const w = Number(weight) || 0;
    const l = Number(length) || 0;
    const wi = Number(width) || 0;
    const h = Number(height) || 0;
    if (w <= 0 || l <= 0 || wi <= 0 || h <= 0) return null;
    return estimateQuote({
      origin,
      destination,
      weightKg: w,
      length: l,
      width: wi,
      height: h,
      goods,
    });
  }, [origin, destination, weight, length, width, height, goods]);

  function go(next: View) {
    setView(next);
    setMode(next === "business" || next === "fleet" ? "business" : "customer");
    if (next === "fleet") setMode("business");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function switchMode(next: Mode) {
    setMode(next);
    go(next === "business" ? "business" : "home");
  }

  function runTrack(e?: React.FormEvent) {
    e?.preventDefault();
    const id = trackInput.trim().toUpperCase();
    if (id !== demoTrackId) {
      setTrackError(
        `Demo tracks ${demoTrackId} only. Enter that ID to see the full journey.`,
      );
      return;
    }
    setTrackError(null);
    setActiveStop(4);
    setTrackInput(demoTrackId);
    go("track");
  }

  function runQuote(e: React.FormEvent) {
    e.preventDefault();
    if (!quotePreview) return;
    setQuote(quotePreview);
  }

  function bookShipment() {
    if (!quote) return;
    setBookId(uid());
    go("booked");
  }

  const field =
    "w-full border border-[#D0D7DE] bg-white px-3 py-2.5 text-sm text-[#0F1A24] outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]";
  const label =
    "mb-1 block text-[11px] uppercase tracking-[0.12em] text-[#5A6A7A]";
  const btnOrange =
    "inline-flex min-h-11 items-center justify-center bg-[#FF6A00] px-5 text-sm font-medium tracking-wide text-white transition hover:bg-[#e55f00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-2";
  const btnBlue =
    "inline-flex min-h-11 items-center justify-center bg-[#1E4A7A] px-5 text-sm font-medium tracking-wide text-white transition hover:bg-[#163a61] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4A7A] focus-visible:ring-offset-2";
  const btnGhost =
    "inline-flex min-h-11 items-center justify-center border border-[#1E4A7A] px-5 text-sm font-medium tracking-wide text-[#1E4A7A] transition hover:bg-[#E8EEF4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]";

  return (
    <div
      className="min-h-screen pt-12"
      style={{ background: c.fog, color: c.ink }}
    >
      <DemoChrome slug="atlas" />

      <header className="sticky top-12 z-40 border-b border-[#D0D7DE] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => switchMode("customer")}
            className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
            aria-label="ATLAS home"
          >
            <p
              className="text-xl font-bold tracking-[-0.04em] text-[#1E4A7A]"
              style={mono}
            >
              ATLAS
            </p>
            <p
              className="text-[10px] tracking-[0.16em] text-[#FF6A00]"
              style={mono}
            >
              KASI CONCEPT / 08
            </p>
          </button>
          <nav
            className="flex flex-wrap items-center gap-1 text-[11px] uppercase tracking-[0.12em]"
            aria-label="Primary"
            style={mono}
          >
            {(
              [
                ["home", "Home"],
                ["track", "Track"],
                ["quote", "Quote"],
                ["portal", "Portal"],
              ] as const
            ).map(([id, labelText]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setMode("customer");
                  if (id === "track" && view !== "track") {
                    setTrackInput(demoTrackId);
                    setTrackError(null);
                    setActiveStop(4);
                  }
                  go(id);
                }}
                className={`px-2.5 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] ${
                  mode === "customer" && view === id
                    ? "text-[#FF6A00]"
                    : "text-[#5A6A7A] hover:text-[#1E4A7A]"
                }`}
              >
                {labelText}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMode("business");
                go("fleet");
              }}
              className={`px-2.5 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] ${
                view === "fleet"
                  ? "text-[#FF6A00]"
                  : "text-[#5A6A7A] hover:text-[#1E4A7A]"
              }`}
            >
              Fleet
            </button>
            <button
              type="button"
              onClick={() =>
                switchMode(mode === "business" ? "customer" : "business")
              }
              className={`ml-1 border px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] ${
                mode === "business" && view === "business"
                  ? "border-[#FF6A00] bg-[#FF6A00] text-white"
                  : "border-[#D0D7DE] text-[#1E4A7A]"
              }`}
              aria-pressed={mode === "business"}
            >
              {mode === "business" ? "Customer" : "Business"}
            </button>
          </nav>
        </div>
      </header>

      {mode === "customer" && view === "home" && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative overflow-hidden border border-[#D0D7DE] bg-[#1E4A7A] p-8 text-white sm:p-12">
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative">
                <DemoBadge />
                <h1
                  className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl"
                  style={mono}
                >
                  TRACK A SHIPMENT
                </h1>
                <p className="mt-3 max-w-md text-[#E8EEF4]/85">
                  Dense ops clarity. Enter a tracking ID to follow cargo across
                  Tanzania.
                </p>
                <form
                  className="mt-8 flex flex-col gap-3 sm:flex-row"
                  onSubmit={runTrack}
                >
                  <label htmlFor="atlas-track-home" className="sr-only">
                    Tracking ID
                  </label>
                  <input
                    id="atlas-track-home"
                    className="min-h-12 flex-1 border-0 bg-white px-4 text-[#0F1A24] outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
                    style={mono}
                    value={trackInput}
                    onChange={(e) => setTrackInput(e.target.value)}
                    placeholder={demoTrackId}
                  />
                  <button type="submit" className={btnOrange + " min-h-12"}>
                    Track
                  </button>
                </form>
                {trackError && view === "home" && (
                  <p className="mt-3 text-sm text-[#FFB380]" role="alert">
                    {trackError}
                  </p>
                )}
                <p className="mt-3 text-xs text-white/60" style={mono}>
                  Try demo ID {demoTrackId}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between border border-[#D0D7DE] bg-white p-8">
              <div>
                <DemoBadge />
                <h2
                  className="mt-4 text-2xl font-bold tracking-[-0.03em] text-[#1E4A7A]"
                  style={mono}
                >
                  SHIP SOMETHING
                </h2>
                <p className="mt-3 text-sm text-[#5A6A7A]">
                  Origin, destination, weight, dimensions: get an estimate and
                  book in one flow.
                </p>
              </div>
              <button
                type="button"
                className={btnBlue + " mt-8 w-full"}
                onClick={() => go("quote")}
              >
                Get a quote
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Visibility", "Status truth from collection to POD."],
              ["Quoting", "Chargeable weight, and corridor logic."],
              ["Ops", "Fleet, fuel, alerts: business toggle."],
            ].map(([t, d]) => (
              <div key={t} className="border border-[#D0D7DE] bg-white p-5">
                <p
                  className="text-sm font-bold text-[#1E4A7A]"
                  style={mono}
                >
                  {t}
                </p>
                <p className="mt-2 text-sm text-[#5A6A7A]">{d}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {view === "track" && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <DemoBadge />
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1
                className="text-3xl font-bold tracking-[-0.03em] text-[#1E4A7A]"
                style={mono}
              >
                {demoTrackId}
              </h1>
              <p className="mt-1 text-sm text-[#5A6A7A]">
                Mwanza → Arusha · ETA today 11:00-13:00
              </p>
            </div>
            <form className="flex gap-2" onSubmit={runTrack}>
              <label htmlFor="atlas-track-page" className="sr-only">
                Tracking ID
              </label>
              <input
                id="atlas-track-page"
                className={field + " w-40"}
                style={mono}
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
              />
              <button type="submit" className={btnOrange}>
                Track
              </button>
            </form>
          </div>
          {trackError && (
            <p className="mt-3 text-sm text-[#FF6A00]" role="alert">
              {trackError}
            </p>
          )}

          {!trackError && (
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div className="border border-[#D0D7DE] bg-white p-4">
                <p
                  className="text-[11px] uppercase tracking-[0.14em] text-[#5A6A7A]"
                  style={mono}
                >
                  Tanzania route map
                </p>
                <svg
                  viewBox="0 0 100 80"
                  className="mt-3 h-auto w-full"
                  role="img"
                  aria-label="Shipment route map across Tanzania"
                >
                  <rect width="100" height="80" fill="#E8EEF4" />
                  <path
                    d="M18 20 L35 12 L55 10 L78 22 L85 40 L80 58 L62 70 L40 72 L22 58 L15 38 Z"
                    fill="#fff"
                    stroke="#1E4A7A"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M28 28 L48 35 L58 48 L72 58 L58 48 L48 22 L44 18"
                    fill="none"
                    stroke="#1E4A7A"
                    strokeWidth="1.2"
                    strokeDasharray="2 1.5"
                  />
                  {trackStops.map((s, i) => (
                    <g key={s.id}>
                      <circle
                        cx={s.mapX}
                        cy={s.mapY}
                        r={i === activeStop ? 2.8 : 2}
                        fill={i <= activeStop ? "#FF6A00" : "#D0D7DE"}
                        className="cursor-pointer"
                        onClick={() => setActiveStop(i)}
                      />
                      <text
                        x={s.mapX}
                        y={s.mapY - 3.5}
                        textAnchor="middle"
                        fill="#0F1A24"
                        fontSize="2.4"
                        style={{ fontFamily: "ui-monospace, monospace" }}
                      >
                        {s.label.split(" ")[0]}
                      </text>
                    </g>
                  ))}
                </svg>
                <p className="mt-3 text-sm" style={mono}>
                  Current:{" "}
                  <span className="text-[#FF6A00]">{currentStop.label}</span>
                  {" · "}
                  ETA window 11:00-13:00 EAT
                </p>
              </div>

              <div>
                <ol className="space-y-0 border border-[#D0D7DE] bg-white">
                  {trackStops.map((s, i) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => setActiveStop(i)}
                        className={`flex w-full gap-4 border-b border-[#D0D7DE] px-4 py-4 text-left last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF6A00] ${
                          i === activeStop ? "bg-[#E8EEF4]" : ""
                        }`}
                        aria-current={i === activeStop ? "step" : undefined}
                      >
                        <span
                          className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                            i <= activeStop ? "bg-[#FF6A00]" : "bg-[#D0D7DE]"
                          }`}
                        />
                        <span>
                          <span
                            className="block text-sm font-bold text-[#1E4A7A]"
                            style={mono}
                          >
                            {s.label}
                          </span>
                          <span className="mt-1 block text-sm text-[#5A6A7A]">
                            {s.detail}
                          </span>
                          <span
                            className="mt-1 block text-xs text-[#1E4A7A]"
                            style={mono}
                          >
                            {s.time}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </section>
      )}

      {mode === "customer" && view === "quote" && (
        <section className="mx-auto max-w-3xl px-4 py-10">
          <DemoBadge />
          <h1
            className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#1E4A7A]"
            style={mono}
          >
            GET A QUOTE
          </h1>
          <p className="mt-2 text-sm text-[#5A6A7A]">
            Estimate → book → confirmation. Demo pricing only.
          </p>

          <form
            className="mt-8 space-y-4 border border-[#D0D7DE] bg-white p-6"
            onSubmit={runQuote}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="atlas-origin" className={label}>
                  Origin
                </label>
                <select
                  id="atlas-origin"
                  className={field}
                  value={origin}
                  onChange={(e) =>
                    setOrigin(e.target.value as (typeof cities)[number])
                  }
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="atlas-dest" className={label}>
                  Destination
                </label>
                <select
                  id="atlas-dest"
                  className={field}
                  value={destination}
                  onChange={(e) =>
                    setDestination(e.target.value as (typeof cities)[number])
                  }
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="atlas-weight" className={label}>
                Weight (kg)
              </label>
              <input
                id="atlas-weight"
                type="number"
                min={0.1}
                step={0.1}
                className={field}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>

            <fieldset>
              <legend className={label}>Dimensions (cm)</legend>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="atlas-l" className="sr-only">
                    Length
                  </label>
                  <input
                    id="atlas-l"
                    type="number"
                    min={1}
                    className={field}
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="L"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="atlas-w" className="sr-only">
                    Width
                  </label>
                  <input
                    id="atlas-w"
                    type="number"
                    min={1}
                    className={field}
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="W"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="atlas-h" className="sr-only">
                    Height
                  </label>
                  <input
                    id="atlas-h"
                    type="number"
                    min={1}
                    className={field}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="H"
                    required
                  />
                </div>
              </div>
            </fieldset>

            <div>
              <label htmlFor="atlas-goods" className={label}>
                Goods type
              </label>
              <select
                id="atlas-goods"
                className={field}
                value={goods}
                onChange={(e) =>
                  setGoods(e.target.value as (typeof goodsTypes)[number])
                }
              >
                {goodsTypes.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className={btnBlue + " w-full"}>
              Calculate estimate
            </button>
          </form>

          {quote && (
            <div
              className="mt-6 border border-[#FF6A00]/40 bg-white p-6"
              role="status"
              aria-live="polite"
            >
              <p
                className="text-[11px] uppercase tracking-[0.14em] text-[#FF6A00]"
                style={mono}
              >
                Estimate
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[#5A6A7A]">Base freight</dt>
                  <dd style={mono}>{formatTzs(quote.base)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#5A6A7A]">Fuel surcharge</dt>
                  <dd style={mono}>{formatTzs(quote.fuel)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#5A6A7A]">Handling</dt>
                  <dd style={mono}>{formatTzs(quote.handling)}</dd>
                </div>
                <div className="flex justify-between border-t border-[#D0D7DE] pt-2 text-base font-bold text-[#1E4A7A]">
                  <dt>Total</dt>
                  <dd style={mono}>{formatTzs(quote.total)}</dd>
                </div>
              </dl>
              <p className="mt-3 text-sm text-[#5A6A7A]">
                Transit ~{quote.days} day{quote.days === 1 ? "" : "s"} ·{" "}
                {origin} → {destination}
              </p>
              <button
                type="button"
                className={btnOrange + " mt-6 w-full"}
                onClick={bookShipment}
              >
                Book shipment
              </button>
            </div>
          )}
        </section>
      )}

      {mode === "customer" && view === "booked" && bookId && quote && (
        <section className="mx-auto max-w-lg px-4 py-16 text-center">
          <DemoBadge />
          <div
            className="mt-6 border border-[#1E4A7A] bg-white p-8"
            role="status"
            aria-live="polite"
          >
            <p
              className="text-[11px] uppercase tracking-[0.14em] text-[#FF6A00]"
              style={mono}
            >
              Booked
            </p>
            <h1
              className="mt-3 text-3xl font-bold text-[#1E4A7A]"
              style={mono}
            >
              {bookId}
            </h1>
            <p className="mt-4 text-sm text-[#5A6A7A]">
              {origin} → {destination} · {formatTzs(quote.total)} · ~{quote.days}{" "}
              day transit
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                className={btnBlue}
                onClick={() => {
                  setTrackInput(demoTrackId);
                  go("track");
                }}
              >
                Track demo shipment
              </button>
              <button
                type="button"
                className={btnGhost}
                onClick={() => go("portal")}
              >
                Open portal
              </button>
            </div>
          </div>
        </section>
      )}

      {mode === "customer" && view === "portal" && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <DemoBadge />
          <h1
            className="mt-2 text-3xl font-bold text-[#1E4A7A]"
            style={mono}
          >
            CUSTOMER PORTAL
          </h1>
          <p className="mt-2 text-sm text-[#5A6A7A]">
            Account: Coastal Traders Ltd: fictional demo
          </p>

          <div className="mt-6 flex flex-wrap gap-2" style={mono}>
            {(
              [
                ["shipments", "Shipments"],
                ["invoices", "Invoices"],
                ["documents", "Documents"],
                ["analytics", "Analytics"],
                ["routes", "Routes"],
                ["pod", "POD"],
              ] as const
            ).map(([id, t]) => (
              <button
                key={id}
                type="button"
                onClick={() => setPortalTab(id)}
                className={`min-h-10 px-3 text-[11px] uppercase tracking-[0.1em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] ${
                  portalTab === id
                    ? "bg-[#1E4A7A] text-white"
                    : "border border-[#D0D7DE] bg-white text-[#1E4A7A]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-x-auto border border-[#D0D7DE] bg-white">
            {portalTab === "shipments" && (
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-[#D0D7DE] text-[#5A6A7A]">
                  <tr>
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Lane</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">ETA</th>
                    <th className="px-4 py-3 font-medium">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {bizShipments.map((s) => (
                    <tr key={s.id} className="border-b border-[#F4F6F8]">
                      <td className="px-4 py-3" style={mono}>
                        <button
                          type="button"
                          className="text-[#FF6A00] underline-offset-2 hover:underline"
                          onClick={() => {
                            if (s.id === demoTrackId) {
                              setTrackInput(demoTrackId);
                              setTrackError(null);
                              go("track");
                            }
                          }}
                        >
                          {s.id}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        {s.origin} → {s.destination}
                      </td>
                      <td className="px-4 py-3">{s.status}</td>
                      <td className="px-4 py-3">{s.eta}</td>
                      <td className="px-4 py-3">{s.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {portalTab === "invoices" && (
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b border-[#D0D7DE] text-[#5A6A7A]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Invoice</th>
                    <th className="px-4 py-3 font-medium">Shipment</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bizInvoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-[#F4F6F8]">
                      <td className="px-4 py-3" style={mono}>
                        {inv.id}
                      </td>
                      <td className="px-4 py-3">{inv.shipment}</td>
                      <td className="px-4 py-3">{inv.amount}</td>
                      <td className="px-4 py-3 text-[#FF6A00]">{inv.status}</td>
                      <td className="px-4 py-3">{inv.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {portalTab === "documents" && (
              <ul className="divide-y divide-[#F4F6F8]">
                {bizDocs.map((d) => (
                  <li
                    key={d.id}
                    className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 text-sm"
                  >
                    <div>
                      <p className="font-medium">{d.name}</p>
                      <p className="text-[#5A6A7A]">
                        {d.shipment} · {d.type}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-[#1E4A7A] underline-offset-2 hover:underline"
                    >
                      Open (demo)
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {portalTab === "analytics" && (
              <div className="grid gap-4 p-5 sm:grid-cols-3">
                {(
                  [
                    ["On-time", bizAnalytics.onTime],
                    ["Active", bizAnalytics.activeShipments],
                    ["Avg transit", `${bizAnalytics.avgTransitHrs} hrs`],
                    ["POD capture", bizAnalytics.podCapture],
                    ["Quote→book", bizAnalytics.quoteToBook],
                    ["Fuel (fleet)", bizAnalytics.fuelBurnL],
                  ] as const
                ).map(([t, v]) => (
                  <div key={t} className="border border-[#D0D7DE] p-4">
                    <p className="text-xs text-[#5A6A7A]">{t}</p>
                    <p
                      className="mt-2 text-2xl font-bold text-[#1E4A7A]"
                      style={mono}
                    >
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {portalTab === "routes" && (
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b border-[#D0D7DE] text-[#5A6A7A]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Route</th>
                    <th className="px-4 py-3 font-medium">Corridor</th>
                    <th className="px-4 py-3 font-medium">Transit</th>
                    <th className="px-4 py-3 font-medium">Active</th>
                  </tr>
                </thead>
                <tbody>
                  {bizRoutes.map((r) => (
                    <tr key={r.id} className="border-b border-[#F4F6F8]">
                      <td className="px-4 py-3 font-medium">{r.name}</td>
                      <td className="px-4 py-3">{r.corridor}</td>
                      <td className="px-4 py-3">{r.transitHrs} hrs</td>
                      <td className="px-4 py-3">{r.active}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {portalTab === "pod" && (
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b border-[#D0D7DE] text-[#5A6A7A]">
                  <tr>
                    <th className="px-4 py-3 font-medium">POD</th>
                    <th className="px-4 py-3 font-medium">Shipment</th>
                    <th className="px-4 py-3 font-medium">Signed by</th>
                    <th className="px-4 py-3 font-medium">When</th>
                    <th className="px-4 py-3 font-medium">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {bizPods.map((p) => (
                    <tr key={p.id} className="border-b border-[#F4F6F8]">
                      <td className="px-4 py-3" style={mono}>
                        {p.id}
                      </td>
                      <td className="px-4 py-3">{p.shipment}</td>
                      <td className="px-4 py-3">{p.signedBy}</td>
                      <td className="px-4 py-3">{p.when}</td>
                      <td className="px-4 py-3">{p.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}

      {view === "fleet" && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <DemoBadge />
          <h1
            className="mt-2 text-3xl font-bold text-[#1E4A7A]"
            style={mono}
          >
            FLEET BOARD
          </h1>
          <p className="mt-2 text-sm text-[#5A6A7A]">
            Vehicles, drivers, fuel, routes, status, alerts.
          </p>

          <div className="mt-6 flex flex-wrap gap-2" style={mono}>
            {(
              [
                ["vehicles", "Vehicles"],
                ["drivers", "Drivers"],
                ["fuel", "Fuel"],
                ["routes", "Routes"],
                ["status", "Status"],
                ["alerts", "Alerts"],
              ] as const
            ).map(([id, t]) => (
              <button
                key={id}
                type="button"
                onClick={() => setFleetTab(id)}
                className={`min-h-10 px-3 text-[11px] uppercase tracking-[0.1em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] ${
                  fleetTab === id
                    ? "bg-[#FF6A00] text-white"
                    : "border border-[#D0D7DE] bg-white text-[#1E4A7A]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-x-auto border border-[#D0D7DE] bg-white">
            {fleetTab === "vehicles" && (
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-[#D0D7DE] text-[#5A6A7A]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Plate</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Driver</th>
                    <th className="px-4 py-3 font-medium">Route</th>
                    <th className="px-4 py-3 font-medium">Fuel</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((v) => (
                    <tr key={v.id} className="border-b border-[#F4F6F8]">
                      <td className="px-4 py-3" style={mono}>
                        {v.plate}
                      </td>
                      <td className="px-4 py-3">{v.type}</td>
                      <td className="px-4 py-3">{v.driver}</td>
                      <td className="px-4 py-3">{v.route}</td>
                      <td className="px-4 py-3">{v.fuel}%</td>
                      <td className="px-4 py-3 text-[#FF6A00]">{v.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {fleetTab === "drivers" && (
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b border-[#D0D7DE] text-[#5A6A7A]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Driver</th>
                    <th className="px-4 py-3 font-medium">License</th>
                    <th className="px-4 py-3 font-medium">Vehicle</th>
                    <th className="px-4 py-3 font-medium">Hours</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((d) => (
                    <tr key={d.id} className="border-b border-[#F4F6F8]">
                      <td className="px-4 py-3 font-medium">{d.name}</td>
                      <td className="px-4 py-3">{d.license}</td>
                      <td className="px-4 py-3" style={mono}>
                        {d.vehicle}
                      </td>
                      <td className="px-4 py-3">{d.hours}h</td>
                      <td className="px-4 py-3">{d.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {fleetTab === "fuel" && (
              <div className="space-y-3 p-4">
                {vehicles.map((v) => (
                  <div key={v.id}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span style={mono}>{v.plate}</span>
                      <span>{v.fuel}%</span>
                    </div>
                    <div className="h-2 bg-[#E8EEF4]">
                      <div
                        className="h-2 bg-[#FF6A00]"
                        style={{ width: `${v.fuel}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {fleetTab === "routes" && (
              <ul className="divide-y divide-[#F4F6F8]">
                {bizRoutes.map((r) => (
                  <li key={r.id} className="px-4 py-4 text-sm">
                    <p className="font-medium text-[#1E4A7A]">{r.name}</p>
                    <p className="text-[#5A6A7A]">
                      {r.corridor} · {r.transitHrs} hrs · {r.active} active
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {fleetTab === "status" && (
              <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
                {(
                  ["En route", "Idle", "Maintenance", "Loading"] as const
                ).map((status) => {
                  const count = vehicles.filter(
                    (v) => v.status === status,
                  ).length;
                  return (
                    <div
                      key={status}
                      className="border border-[#D0D7DE] p-4 text-center"
                    >
                      <p
                        className="text-3xl font-bold text-[#1E4A7A]"
                        style={mono}
                      >
                        {count}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#5A6A7A]">
                        {status}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {fleetTab === "alerts" && (
              <ul className="divide-y divide-[#F4F6F8]">
                {fleetAlerts.map((a) => (
                  <li key={a.id} className="flex gap-4 px-4 py-4 text-sm">
                    <span
                      className={`shrink-0 text-[11px] uppercase tracking-[0.1em] ${
                        a.severity === "Critical"
                          ? "text-[#FF6A00]"
                          : a.severity === "Warn"
                            ? "text-[#1E4A7A]"
                            : "text-[#5A6A7A]"
                      }`}
                      style={mono}
                    >
                      {a.severity}
                    </span>
                    <div>
                      <p>{a.message}</p>
                      <p className="mt-1 text-xs text-[#5A6A7A]" style={mono}>
                        {a.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {mode === "business" && view === "business" && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <DemoBadge />
          <h1
            className="mt-2 text-3xl font-bold text-[#1E4A7A]"
            style={mono}
          >
            BUSINESS OPS
          </h1>
          <p className="mt-2 text-sm text-[#5A6A7A]">
            Shipments, invoices, documents, analytics: flip to Fleet for live
            board.
          </p>

          <div className="mt-6 flex flex-wrap gap-2" style={mono}>
            {(
              [
                ["overview", "Overview"],
                ["shipments", "Shipments"],
                ["docs", "Documents"],
                ["analytics", "Analytics"],
              ] as const
            ).map(([id, t]) => (
              <button
                key={id}
                type="button"
                onClick={() => setBizTab(id)}
                className={`min-h-10 px-3 text-[11px] uppercase tracking-[0.1em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] ${
                  bizTab === id
                    ? "bg-[#1E4A7A] text-white"
                    : "border border-[#D0D7DE] bg-white text-[#1E4A7A]"
                }`}
              >
                {t}
              </button>
            ))}
            <button
              type="button"
              className={btnOrange + " ml-auto text-[11px] uppercase"}
              onClick={() => go("fleet")}
            >
              Open fleet →
            </button>
          </div>

          <div className="mt-6 border border-[#D0D7DE] bg-white">
            {bizTab === "overview" && (
              <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
                {(
                  [
                    ["Active shipments", bizAnalytics.activeShipments],
                    ["On-time delivery", bizAnalytics.onTime],
                    ["Fuel burn (7d)", bizAnalytics.fuelBurnL],
                    ["Invoices due", bizInvoices.filter((i) => i.status !== "Paid").length],
                    ["Open alerts", fleetAlerts.length],
                    ["POD capture", bizAnalytics.podCapture],
                  ] as const
                ).map(([t, v]) => (
                  <div key={t} className="border border-[#D0D7DE] p-4">
                    <p className="text-xs text-[#5A6A7A]">{t}</p>
                    <p
                      className="mt-2 text-2xl font-bold text-[#1E4A7A]"
                      style={mono}
                    >
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {bizTab === "shipments" && (
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-[#D0D7DE] text-[#5A6A7A]">
                  <tr>
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Lane</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {bizShipments.map((s) => (
                    <tr key={s.id} className="border-b border-[#F4F6F8]">
                      <td className="px-4 py-3" style={mono}>
                        {s.id}
                      </td>
                      <td className="px-4 py-3">
                        {s.origin} → {s.destination}
                      </td>
                      <td className="px-4 py-3">{s.status}</td>
                      <td className="px-4 py-3">{s.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {bizTab === "docs" && (
              <ul className="divide-y divide-[#F4F6F8]">
                {[...bizDocs, ...bizPods.map((p) => ({
                  id: p.id,
                  name: `POD ${p.id}`,
                  shipment: p.shipment,
                  type: "POD",
                }))].map((d) => (
                  <li
                    key={d.id}
                    className="flex justify-between gap-3 px-4 py-3 text-sm"
                  >
                    <span>
                      {d.name} · {d.shipment}
                    </span>
                    <span className="text-[#5A6A7A]">{d.type}</span>
                  </li>
                ))}
              </ul>
            )}
            {bizTab === "analytics" && (
              <div className="grid gap-4 p-5 sm:grid-cols-3">
                {(
                  [
                    ["On-time", bizAnalytics.onTime],
                    ["Avg transit", `${bizAnalytics.avgTransitHrs}h`],
                    ["Quote→book", bizAnalytics.quoteToBook],
                  ] as const
                ).map(([t, v]) => (
                  <div key={t} className="border border-[#D0D7DE] p-4">
                    <p className="text-xs text-[#5A6A7A]">{t}</p>
                    <p
                      className="mt-2 text-2xl font-bold text-[#FF6A00]"
                      style={mono}
                    >
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <footer className="border-t border-[#D0D7DE] py-8 text-center">
        <p
          className="text-[10px] tracking-[0.16em] text-[#1E4A7A]"
          style={mono}
        >
          KASI CONCEPT / DEMO DATA · FICTIONAL
        </p>
      </footer>
    </div>
  );
}
