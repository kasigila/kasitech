"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { DemoChrome } from "@/components/site/DemoChrome";
import {
  formatTsh,
  getService,
  getStylist,
  glowColors as c,
  heroImage,
  portalAppointments,
  portalNotes,
  portalPackages,
  salonAnalytics,
  salonBookings,
  serviceCategories,
  services,
  stylists,
  timeSlots,
  type Service,
  type ServiceCategory,
  type Stylist,
} from "./data";

type Mode = "customer" | "business";
type View =
  | "home"
  | "services"
  | "stylists"
  | "book"
  | "confirmed"
  | "portal"
  | "business";

type PortalTab = "appointments" | "packages" | "notes";
type BizTab = "calendar" | "stylists" | "services" | "analytics";

function ExampleBadge() {
  return (
    <p className="font-mono text-[10px] tracking-[0.16em]" style={{ color: c.rose }}>
      KASI EXAMPLE · ILLUSTRATIVE DATA
    </p>
  );
}

function uid() {
  return `GLW-${80 + Math.floor(Math.random() * 19)}`;
}

export function GlowDemo() {
  const [mode, setMode] = useState<Mode>("customer");
  const [view, setView] = useState<View>("home");
  const [category, setCategory] = useState<ServiceCategory | "All">("All");
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [stylistId, setStylistId] = useState<string | null>(null);
  const [bookDate, setBookDate] = useState("2026-08-02");
  const [bookTime, setBookTime] = useState("10:30");
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [portalTab, setPortalTab] = useState<PortalTab>("appointments");
  const [bizTab, setBizTab] = useState<BizTab>("calendar");

  const filteredServices = useMemo(() => {
    if (category === "All") return services;
    return services.filter((s) => s.category === category);
  }, [category]);

  const service = serviceId ? getService(serviceId) : null;
  const stylist = stylistId ? getStylist(stylistId) : null;

  const matchingStylists = useMemo(() => {
    if (!service) return stylists;
    return stylists.filter((s) => s.specialties.includes(service.category));
  }, [service]);

  function go(next: View) {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function switchMode(next: Mode) {
    setMode(next);
    go(next === "business" ? "business" : "home");
  }

  function startBook(selected?: Service, preferredStylist?: Stylist) {
    if (selected) setServiceId(selected.id);
    if (preferredStylist) setStylistId(preferredStylist.id);
    else if (selected) {
      const first = stylists.find((s) =>
        s.specialties.includes(selected.category),
      );
      setStylistId(first?.id ?? null);
    }
    setMode("customer");
    go("book");
  }

  function submitBook() {
    if (!bookName.trim() || !bookPhone.trim() || !serviceId || !stylistId)
      return;
    setConfirmId(uid());
    go("confirmed");
  }

  const field =
    "w-full rounded-xl border border-[#E8D7DD] bg-white px-3 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-[#C45C7A] focus-visible:ring-offset-2";
  const labelCls = "mb-1.5 block text-sm font-medium";
  const btnPrimary =
    "inline-flex min-h-12 items-center justify-center rounded-xl px-6 text-sm font-medium tracking-wide text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C45C7A] focus-visible:ring-offset-2";
  const btnSecondary =
    "inline-flex min-h-12 items-center justify-center rounded-xl border border-[#2A1A1F] bg-transparent px-6 text-sm font-medium tracking-wide transition hover:bg-[#F7E6EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C45C7A] focus-visible:ring-offset-2";

  return (
    <div className="min-h-screen pt-12" style={{ background: c.cream, color: c.plum }}>
      <DemoChrome slug="glow" />

      <header className="sticky top-12 z-40 border-b border-[#E8D7DD] bg-[#FFF8F6]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => switchMode("customer")}
            className="rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C45C7A] focus-visible:ring-offset-2"
            aria-label="GLOW home"
          >
            <p className="text-xl font-semibold tracking-tight">GLOW</p>
            <p className="font-mono text-[10px] tracking-[0.16em]" style={{ color: c.rose }}>
              KASI EXAMPLE / 13
            </p>
          </button>

          <nav className="flex flex-wrap items-center gap-1" aria-label="Primary">
            {(
              [
                ["home", "Home"],
                ["services", "Services"],
                ["stylists", "Stylists"],
                ["portal", "My visits"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setMode("customer");
                  go(id);
                }}
                className={`min-h-11 rounded-xl px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C45C7A] focus-visible:ring-offset-2 ${
                  mode === "customer" && view === id
                    ? "bg-[#F7E6EB]"
                    : "hover:bg-[#F7E6EB]/70"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                switchMode(mode === "business" ? "customer" : "business")
              }
              className={`ml-1 min-h-11 rounded-xl border px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C45C7A] focus-visible:ring-offset-2 ${
                mode === "business"
                  ? "border-[#C45C7A] bg-[#C45C7A] text-white"
                  : "border-[#E8D7DD] hover:border-[#C45C7A]"
              }`}
              aria-pressed={mode === "business"}
            >
              {mode === "business" ? "Client view" : "Salon view"}
            </button>
          </nav>
        </div>
      </header>

      {mode === "customer" && view === "home" && (
        <>
          <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden">
            <Image
              src={heroImage}
              alt="Bright salon interior with styling chairs"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2A1A1F]/85 via-[#2A1A1F]/50 to-transparent" />
            <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col justify-center px-4 py-16">
              <ExampleBadge />
              <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                Book beauty without the WhatsApp chase.
              </h1>
              <p className="mt-4 max-w-md text-lg text-white/85">
                See services, pick your stylist, and confirm a time — built for
                salons that want calm calendars and loyal clients.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className={btnPrimary}
                  style={{ background: c.rose }}
                  onClick={() => go("services")}
                >
                  Browse services
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/70 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
                  onClick={() => startBook(getService("glow-facial"))}
                >
                  Book a visit
                </button>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-16">
            <ExampleBadge />
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              What GLOW makes easier
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                {
                  t: "Clear service menu",
                  d: "Prices, duration, and categories clients can understand in seconds.",
                },
                {
                  t: "Stylist-aware booking",
                  d: "Match the visit to the right specialist — not whoever answers first.",
                },
                {
                  t: "Client history that sticks",
                  d: "Packages, notes, and upcoming visits in one place for returning guests.",
                },
              ].map((x) => (
                <div key={x.t}>
                  <p className="text-lg font-medium">{x.t}</p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: c.muted }}>
                    {x.d}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-20">
            <div className="flex items-end justify-between gap-4">
              <div>
                <ExampleBadge />
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Popular this week
                </h2>
              </div>
              <button type="button" className={btnSecondary} onClick={() => go("services")}>
                All services
              </button>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {services
                .filter((s) => s.popular)
                .concat(services.filter((s) => !s.popular).slice(0, 1))
                .slice(0, 3)
                .map((s) => (
                  <article
                    key={s.id}
                    className="overflow-hidden rounded-2xl border border-[#E8D7DD] bg-white"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={s.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <p className="font-mono text-[10px] tracking-[0.14em]" style={{ color: c.rose }}>
                        {s.category.toUpperCase()}
                      </p>
                      <h3 className="mt-2 text-lg font-medium">{s.name}</h3>
                      <p className="mt-2 text-sm" style={{ color: c.muted }}>
                        {s.durationMin} min · {formatTsh(s.price)}
                      </p>
                      <button
                        type="button"
                        className={`${btnPrimary} mt-4 w-full`}
                        style={{ background: c.plum }}
                        onClick={() => startBook(s)}
                      >
                        Book
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        </>
      )}

      {mode === "customer" && view === "services" && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <ExampleBadge />
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Services</h1>
          <p className="mt-2" style={{ color: c.muted }}>
            Pick what you need. Booking keeps duration and price honest.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(["All", ...serviceCategories] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`min-h-11 rounded-full border px-4 text-sm transition ${
                  category === cat
                    ? "border-[#C45C7A] bg-[#C45C7A] text-white"
                    : "border-[#E8D7DD] bg-white hover:border-[#C45C7A]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((s) => (
              <article
                key={s.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#E8D7DD] bg-white"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[10px] tracking-[0.14em]" style={{ color: c.rose }}>
                    {s.category.toUpperCase()}
                    {s.popular ? " · POPULAR" : ""}
                  </p>
                  <h2 className="mt-2 text-xl font-medium">{s.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: c.muted }}>
                    {s.description}
                  </p>
                  <p className="mt-4 text-sm font-medium">
                    {s.durationMin} min · {formatTsh(s.price)}
                  </p>
                  <button
                    type="button"
                    className={`${btnPrimary} mt-4`}
                    style={{ background: c.plum }}
                    onClick={() => startBook(s)}
                  >
                    Book this service
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {mode === "customer" && view === "stylists" && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <ExampleBadge />
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Stylists</h1>
          <p className="mt-2" style={{ color: c.muted }}>
            Choose who you trust — then book around their next open slot.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {stylists.map((s) => (
              <article
                key={s.id}
                className="overflow-hidden rounded-2xl border border-[#E8D7DD] bg-white"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={s.photo}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-medium">{s.name}</h2>
                  <p className="mt-1 text-sm" style={{ color: c.rose }}>
                    {s.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: c.muted }}>
                    {s.bio}
                  </p>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.12em]" style={{ color: c.muted }}>
                    {s.specialties.join(" · ")} · ★ {s.rating}
                  </p>
                  <p className="mt-2 text-sm">Next: {s.nextAvailable}</p>
                  <button
                    type="button"
                    className={`${btnPrimary} mt-4 w-full`}
                    style={{ background: c.plum }}
                    onClick={() => {
                      setStylistId(s.id);
                      const match = services.find((svc) =>
                        s.specialties.includes(svc.category),
                      );
                      startBook(match, s);
                    }}
                  >
                    Book with {s.name.split(" ")[0]}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {mode === "customer" && view === "book" && (
        <section className="mx-auto max-w-2xl px-4 py-10">
          <ExampleBadge />
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Book your visit
          </h1>
          <p className="mt-2" style={{ color: c.muted }}>
            Four clear steps. Deposit note shown before you confirm.
          </p>

          <div className="mt-8 space-y-6 rounded-2xl border border-[#E8D7DD] bg-white p-5 md:p-8">
            <div>
              <label htmlFor="glow-service" className={labelCls}>
                Service
              </label>
              <select
                id="glow-service"
                className={field}
                value={serviceId ?? ""}
                onChange={(e) => {
                  setServiceId(e.target.value || null);
                  const next = getService(e.target.value);
                  if (next) {
                    const match = stylists.find((s) =>
                      s.specialties.includes(next.category),
                    );
                    setStylistId(match?.id ?? null);
                  }
                }}
              >
                <option value="">Choose a service</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} · {formatTsh(s.price)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="glow-stylist" className={labelCls}>
                Stylist
              </label>
              <select
                id="glow-stylist"
                className={field}
                value={stylistId ?? ""}
                onChange={(e) => setStylistId(e.target.value || null)}
              >
                <option value="">Any available</option>
                {matchingStylists.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} · {s.nextAvailable}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="glow-date" className={labelCls}>
                  Date
                </label>
                <input
                  id="glow-date"
                  type="date"
                  className={field}
                  value={bookDate}
                  onChange={(e) => setBookDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="glow-time" className={labelCls}>
                  Time
                </label>
                <select
                  id="glow-time"
                  className={field}
                  value={bookTime}
                  onChange={(e) => setBookTime(e.target.value)}
                >
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="glow-name" className={labelCls}>
                  Your name
                </label>
                <input
                  id="glow-name"
                  className={field}
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  placeholder="e.g. Asha Mwanga"
                />
              </div>
              <div>
                <label htmlFor="glow-phone" className={labelCls}>
                  WhatsApp / phone
                </label>
                <input
                  id="glow-phone"
                  className={field}
                  value={bookPhone}
                  onChange={(e) => setBookPhone(e.target.value)}
                  placeholder="e.g. 0712 000 000"
                />
              </div>
            </div>

            {service ? (
              <div className="rounded-xl bg-[#F7E6EB] p-4 text-sm">
                <p className="font-medium">
                  {service.name} · {service.durationMin} min ·{" "}
                  {formatTsh(service.price)}
                </p>
                <p className="mt-1" style={{ color: c.plumMuted }}>
                  A 30% deposit secures the slot. Balance due at the salon. M-Pesa
                  and cards accepted.
                </p>
              </div>
            ) : null}

            <button
              type="button"
              className={`${btnPrimary} w-full disabled:cursor-not-allowed disabled:opacity-40`}
              style={{ background: c.rose }}
              onClick={submitBook}
              disabled={
                !serviceId ||
                !stylistId ||
                !bookName.trim() ||
                !bookPhone.trim()
              }
            >
              Confirm booking
            </button>
          </div>
        </section>
      )}

      {mode === "customer" && view === "confirmed" && (
        <section className="mx-auto max-w-xl px-4 py-16 text-center">
          <ExampleBadge />
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            You&apos;re booked.
          </h1>
          <p className="mt-3" style={{ color: c.muted }}>
            Confirmation {confirmId}. A reminder would go to WhatsApp before your
            visit.
          </p>
          <div className="mt-8 rounded-2xl border border-[#E8D7DD] bg-white p-6 text-left">
            <p className="text-sm" style={{ color: c.muted }}>
              Visit details
            </p>
            <p className="mt-2 text-lg font-medium">{service?.name}</p>
            <p className="mt-1 text-sm">
              {stylist?.name} · {bookDate} · {bookTime}
            </p>
            <p className="mt-1 text-sm">{bookName}</p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              className={btnPrimary}
              style={{ background: c.plum }}
              onClick={() => go("portal")}
            >
              Open my visits
            </button>
            <button type="button" className={btnSecondary} onClick={() => go("home")}>
              Back home
            </button>
          </div>
        </section>
      )}

      {mode === "customer" && view === "portal" && (
        <section className="mx-auto max-w-4xl px-4 py-10">
          <ExampleBadge />
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">My visits</h1>
          <p className="mt-2" style={{ color: c.muted }}>
            Appointments, packages, and the notes your stylist actually uses.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(
              [
                ["appointments", "Appointments"],
                ["packages", "Packages"],
                ["notes", "Care notes"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setPortalTab(id)}
                className={`min-h-11 rounded-full border px-4 text-sm ${
                  portalTab === id
                    ? "border-[#C45C7A] bg-[#C45C7A] text-white"
                    : "border-[#E8D7DD] bg-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {portalTab === "appointments" &&
              portalAppointments.map((a) => (
                <div
                  key={a.id}
                  className="rounded-2xl border border-[#E8D7DD] bg-white p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-medium">{a.service}</p>
                      <p className="mt-1 text-sm" style={{ color: c.muted }}>
                        {a.stylist} · {a.when}
                      </p>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.12em]"
                      style={{
                        background: a.status === "Upcoming" ? c.roseSoft : "#F0EDEA",
                        color: c.plum,
                      }}
                    >
                      {a.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}

            {portalTab === "packages" &&
              portalPackages.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-[#E8D7DD] bg-white p-5"
                >
                  <p className="text-lg font-medium">{p.name}</p>
                  <p className="mt-1 text-sm" style={{ color: c.muted }}>
                    {p.remaining} remaining · expires {p.expires}
                  </p>
                </div>
              ))}

            {portalTab === "notes" &&
              portalNotes.map((n) => (
                <div
                  key={n.id}
                  className="rounded-2xl border border-[#E8D7DD] bg-white p-5"
                >
                  <p className="text-lg font-medium">{n.title}</p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: c.muted }}>
                    {n.body}
                  </p>
                  <p className="mt-3 font-mono text-[10px] tracking-[0.12em]" style={{ color: c.muted }}>
                    {n.date}
                  </p>
                </div>
              ))}
          </div>
        </section>
      )}

      {mode === "business" && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <ExampleBadge />
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Salon operations
          </h1>
          <p className="mt-2" style={{ color: c.muted }}>
            Today&apos;s floor: bookings, people, and what is selling.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(
              [
                ["calendar", "Calendar"],
                ["stylists", "Team"],
                ["services", "Services"],
                ["analytics", "Analytics"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setBizTab(id)}
                className={`min-h-11 rounded-full border px-4 text-sm ${
                  bizTab === id
                    ? "border-[#C45C7A] bg-[#C45C7A] text-white"
                    : "border-[#E8D7DD] bg-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {bizTab === "calendar" && (
            <div className="mt-6 space-y-3">
              {salonBookings.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E8D7DD] bg-white p-5"
                >
                  <div>
                    <p className="font-medium">
                      {b.when} · {b.client}
                    </p>
                    <p className="mt-1 text-sm" style={{ color: c.muted }}>
                      {b.service} · {b.stylist}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#F7E6EB] px-3 py-1 font-mono text-[10px] tracking-[0.12em]">
                    {b.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}

          {bizTab === "stylists" && (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {stylists.map((s) => (
                <div
                  key={s.id}
                  className="rounded-2xl border border-[#E8D7DD] bg-white p-5"
                >
                  <p className="text-lg font-medium">{s.name}</p>
                  <p className="mt-1 text-sm" style={{ color: c.rose }}>
                    {s.role}
                  </p>
                  <p className="mt-3 text-sm" style={{ color: c.muted }}>
                    Next open: {s.nextAvailable}
                  </p>
                  <p className="mt-1 text-sm" style={{ color: c.muted }}>
                    {s.specialties.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          )}

          {bizTab === "services" && (
            <div className="mt-6 space-y-3">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E8D7DD] bg-white p-5"
                >
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="mt-1 text-sm" style={{ color: c.muted }}>
                      {s.category} · {s.durationMin} min
                    </p>
                  </div>
                  <p className="font-medium">{formatTsh(s.price)}</p>
                </div>
              ))}
            </div>
          )}

          {bizTab === "analytics" && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {salonAnalytics.map((a) => (
                <div
                  key={a.label}
                  className="rounded-2xl border border-[#E8D7DD] bg-white p-5"
                >
                  <p className="font-mono text-[10px] tracking-[0.14em]" style={{ color: c.muted }}>
                    {a.label.toUpperCase()}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight">
                    {a.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <footer className="border-t border-[#E8D7DD] px-4 py-8 text-center">
        <p className="font-mono text-[10px] tracking-[0.16em]" style={{ color: c.muted }}>
          GLOW · EXAMPLE DATA · ILLUSTRATIVE SALON
        </p>
      </footer>
    </div>
  );
}
