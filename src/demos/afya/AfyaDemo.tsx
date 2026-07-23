"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { DemoChrome } from "@/components/site/DemoChrome";
import {
  afyaColors as c,
  bizAnalytics,
  bizAppointments,
  bizInquiries,
  bizProviders,
  doctors,
  getDoctor,
  insuranceOptions,
  languages,
  locations,
  portalAppointments,
  portalDocuments,
  portalInvoices,
  portalMessages,
  portalResults,
  specialties,
  timeSlots,
  heroImage,
  type Doctor,
  type Insurance,
  type Language,
  type LocationId,
  type Specialty,
} from "./data";

type Mode = "customer" | "business";
type View =
  | "home"
  | "search"
  | "profile"
  | "book"
  | "confirmed"
  | "portal"
  | "business";

type PortalTab =
  | "appointments"
  | "documents"
  | "invoices"
  | "messages"
  | "results";

type BizTab =
  | "providers"
  | "appointments"
  | "schedules"
  | "inquiries"
  | "analytics";

type Filters = {
  specialty: Specialty | "All";
  location: LocationId | "All";
  language: Language | "All";
  availability: "Any" | "Today" | "This week";
  insurance: Insurance | "All";
  telehealthOnly: boolean;
};

function DemoBadge() {
  return (
    <p className="font-mono text-[10px] tracking-[0.16em] text-[#7A8F7A]">
      KASI CONCEPT · DEMO DATA
    </p>
  );
}

function uid() {
  return `AFY-${80 + Math.floor(Math.random() * 19)}`;
}

export function AfyaDemo() {
  const [mode, setMode] = useState<Mode>("customer");
  const [view, setView] = useState<View>("home");
  const [filters, setFilters] = useState<Filters>({
    specialty: "All",
    location: "All",
    language: "All",
    availability: "Any",
    insurance: "All",
    telehealthOnly: false,
  });
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [bookType, setBookType] = useState<"In-person" | "Telehealth">(
    "In-person",
  );
  const [bookDate, setBookDate] = useState("2026-07-25");
  const [bookTime, setBookTime] = useState("09:00");
  const [bookReason, setBookReason] = useState("");
  const [bookName, setBookName] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [portalTab, setPortalTab] = useState<PortalTab>("appointments");
  const [bizTab, setBizTab] = useState<BizTab>("providers");
  const [openMsg, setOpenMsg] = useState<string | null>(null);
  const [openResult, setOpenResult] = useState<string | null>(null);

  const results = useMemo(() => {
    return doctors.filter((d) => {
      if (filters.specialty !== "All" && d.specialty !== filters.specialty)
        return false;
      if (filters.location !== "All" && d.location !== filters.location)
        return false;
      if (
        filters.language !== "All" &&
        !d.languages.includes(filters.language)
      )
        return false;
      if (
        filters.insurance !== "All" &&
        !d.insurance.includes(filters.insurance)
      )
        return false;
      if (filters.telehealthOnly && !d.telehealth) return false;
      if (
        filters.availability === "Today" &&
        !d.nextAvailable.toLowerCase().includes("today")
      )
        return false;
      if (filters.availability === "This week") {
        const n = d.nextAvailable.toLowerCase();
        const thisWeek =
          n.includes("today") ||
          n.includes("tomorrow") ||
          /\b(mon|tue|wed|thu|fri|sat|sun)\b/.test(n);
        if (!thisWeek) return false;
      }
      return true;
    });
  }, [filters]);

  const doctor = doctorId ? getDoctor(doctorId) : null;

  function go(next: View) {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function switchMode(next: Mode) {
    setMode(next);
    go(next === "business" ? "business" : "home");
  }

  function openProfile(id: string) {
    setDoctorId(id);
    setMode("customer");
    go("profile");
  }

  function startBook(d: Doctor, preferred?: "In-person" | "Telehealth") {
    setDoctorId(d.id);
    if (preferred === "Telehealth" && d.telehealth) {
      setBookType("Telehealth");
    } else {
      setBookType("In-person");
    }
    go("book");
  }

  function submitBook() {
    if (!bookName.trim() || !bookReason.trim()) return;
    setConfirmId(uid());
    go("confirmed");
  }

  const field =
    "w-full rounded-lg border border-[#D8DED8] bg-white px-3 py-3 text-base text-[#1B2A4A] outline-none focus-visible:ring-2 focus-visible:ring-[#7A8F7A] focus-visible:ring-offset-2";
  const labelCls =
    "mb-1.5 block text-sm font-medium text-[#1B2A4A]";
  const btnPrimary =
    "inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1B2A4A] px-6 text-sm font-medium tracking-wide text-white transition hover:bg-[#3A4A66] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A8F7A] focus-visible:ring-offset-2";
  const btnSecondary =
    "inline-flex min-h-12 items-center justify-center rounded-lg border border-[#1B2A4A] bg-transparent px-6 text-sm font-medium tracking-wide text-[#1B2A4A] transition hover:bg-[#E8EEE8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A8F7A] focus-visible:ring-offset-2";

  return (
    <div
      className="min-h-screen pt-12"
      style={{ background: c.cream, color: c.navy }}
    >
      <DemoChrome slug="afya" />

      <header className="sticky top-12 z-40 border-b border-[#D8DED8] bg-[#FAF9F6]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => switchMode("customer")}
            className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A8F7A] focus-visible:ring-offset-2 rounded"
            aria-label="AFYA home"
          >
            <p className="text-xl font-semibold tracking-tight text-[#1B2A4A]">
              AFYA
            </p>
            <p className="font-mono text-[10px] tracking-[0.16em] text-[#7A8F7A]">
              KASI CONCEPT / 06
            </p>
          </button>

          <nav
            className="flex flex-wrap items-center gap-1"
            aria-label="Primary"
          >
            {(
              [
                ["home", "Home"],
                ["search", "Find a doctor"],
                ["portal", "Patient portal"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setMode("customer");
                  go(id);
                }}
                className={`min-h-11 rounded-lg px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A8F7A] focus-visible:ring-offset-2 ${
                  mode === "customer" && view === id
                    ? "bg-[#E8EEE8] text-[#1B2A4A]"
                    : "text-[#3A4A66] hover:bg-[#E8EEE8]/70"
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
              className={`ml-1 min-h-11 rounded-lg border px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A8F7A] focus-visible:ring-offset-2 ${
                mode === "business"
                  ? "border-[#7A8F7A] bg-[#7A8F7A] text-white"
                  : "border-[#D8DED8] text-[#1B2A4A] hover:border-[#7A8F7A]"
              }`}
              aria-pressed={mode === "business"}
            >
              {mode === "business" ? "Customer view" : "Business view"}
            </button>
          </nav>
        </div>
      </header>

      {mode === "customer" && view === "home" && (
        <>
          <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden">
            <Image
              src={heroImage}
              alt="Calm clinic corridor with soft natural light"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A4A]/85 via-[#1B2A4A]/55 to-transparent" />
            <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col justify-center px-4 py-16">
              <DemoBadge />
              <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                Care without the confusion.
              </h1>
              <p className="mt-4 max-w-md text-lg text-white/85">
                Find the right doctor, book in minutes, and keep your records in
                one calm place.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className={btnPrimary + " bg-[#7A8F7A] hover:bg-[#6a7f6a]"}
                  onClick={() => go("search")}
                >
                  Find a doctor
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/70 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2A4A]"
                  onClick={() => {
                    setDoctorId("dr-juma");
                    go("book");
                  }}
                >
                  Book appointment
                </button>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-16">
            <DemoBadge />
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              How AFYA feels different
            </h2>
            <p className="mt-2 max-w-2xl text-[#6B756B]">
              Large targets, plain language, and a booking path you can finish
              without calling anyone.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                {
                  t: "Search with clarity",
                  d: "Specialty, language, insurance, and telehealth, filters that matter.",
                },
                {
                  t: "Book with confidence",
                  d: "Pick in-person or video, choose a time, get a confirmation ID.",
                },
                {
                  t: "Portal that stays quiet",
                  d: "Appointments, results, invoices, and messages, no noise.",
                },
              ].map((x) => (
                <div key={x.t}>
                  <p className="text-lg font-medium text-[#1B2A4A]">{x.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B756B]">
                    {x.d}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {mode === "customer" && view === "search" && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <DemoBadge />
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Find a doctor
          </h1>
          <p className="mt-2 text-[#6B756B]">
            Filter once. See who can see you next.
          </p>

          <form
            className="mt-8 grid gap-4 rounded-2xl border border-[#D8DED8] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            aria-label="Doctor search filters"
          >
            <div>
              <label htmlFor="afya-specialty" className={labelCls}>
                Specialty
              </label>
              <select
                id="afya-specialty"
                className={field}
                value={filters.specialty}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    specialty: e.target.value as Specialty | "All",
                  }))
                }
              >
                <option value="All">All specialties</option>
                {specialties.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="afya-location" className={labelCls}>
                Location
              </label>
              <select
                id="afya-location"
                className={field}
                value={filters.location}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    location: e.target.value as LocationId | "All",
                  }))
                }
              >
                <option value="All">All locations</option>
                {locations.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="afya-language" className={labelCls}>
                Language
              </label>
              <select
                id="afya-language"
                className={field}
                value={filters.language}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    language: e.target.value as Language | "All",
                  }))
                }
              >
                <option value="All">Any language</option>
                {languages.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="afya-availability" className={labelCls}>
                Availability
              </label>
              <select
                id="afya-availability"
                className={field}
                value={filters.availability}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    availability: e.target.value as Filters["availability"],
                  }))
                }
              >
                <option value="Any">Any time</option>
                <option value="Today">Available today</option>
                <option value="This week">This week</option>
              </select>
            </div>
            <div>
              <label htmlFor="afya-insurance" className={labelCls}>
                Insurance
              </label>
              <select
                id="afya-insurance"
                className={field}
                value={filters.insurance}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    insurance: e.target.value as Insurance | "All",
                  }))
                }
              >
                <option value="All">All plans</option>
                {insuranceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-lg border border-[#D8DED8] px-3 py-3 text-sm text-[#1B2A4A] focus-within:ring-2 focus-within:ring-[#7A8F7A]">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-[#7A8F7A]"
                  checked={filters.telehealthOnly}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      telehealthOnly: e.target.checked,
                    }))
                  }
                />
                Telehealth only
              </label>
            </div>
          </form>

          <p className="mt-6 text-sm text-[#6B756B]" aria-live="polite">
            {results.length} doctor{results.length === 1 ? "" : "s"} match
          </p>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {results.map((d) => (
              <li
                key={d.id}
                className="rounded-2xl border border-[#D8DED8] bg-white p-4"
              >
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={d.photo}
                      alt={`Portrait of ${d.name}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[#1B2A4A]">{d.name}</p>
                    <p className="text-sm text-[#7A8F7A]">
                      {d.specialty} · {d.title}
                    </p>
                    <p className="mt-1 text-sm text-[#6B756B]">
                      {d.location} · {d.languages.join(", ")}
                    </p>
                    <p className="mt-1 text-sm text-[#1B2A4A]">
                      Next: {d.nextAvailable}
                      {d.telehealth ? " · Telehealth" : ""}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={btnSecondary + " min-h-11 px-4 text-sm"}
                    onClick={() => openProfile(d.id)}
                  >
                    View profile
                  </button>
                  <button
                    type="button"
                    className={btnPrimary + " min-h-11 px-4 text-sm"}
                    onClick={() => startBook(d)}
                  >
                    Book
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {results.length === 0 && (
            <p className="mt-8 rounded-xl border border-[#D8DED8] bg-white p-6 text-[#6B756B]">
              No doctors match these filters. Try widening location or
              insurance.
            </p>
          )}
        </section>
      )}

      {mode === "customer" && view === "profile" && doctor && (
        <section className="mx-auto max-w-4xl px-4 py-10">
          <button
            type="button"
            className="min-h-11 text-sm text-[#7A8F7A] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A8F7A] focus-visible:ring-offset-2 rounded"
            onClick={() => go("search")}
          >
            ← Back to search
          </button>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#D8DED8] bg-white">
            <div className="grid gap-0 sm:grid-cols-[240px_1fr]">
              <div className="relative min-h-[280px]">
                <Image
                  src={doctor.photo}
                  alt={`Portrait of ${doctor.name}`}
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>
              <div className="p-6 sm:p-8">
                <DemoBadge />
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                  {doctor.name}
                </h1>
                <p className="mt-1 text-[#7A8F7A]">
                  {doctor.specialty} · {doctor.title}
                </p>
                <p className="mt-4 leading-relaxed text-[#3A4A66]">
                  {doctor.bio}
                </p>
                <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-[#6B756B]">Qualifications</dt>
                    <dd className="mt-1 text-[#1B2A4A]">
                      {doctor.qualifications.join(" · ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#6B756B]">Languages</dt>
                    <dd className="mt-1 text-[#1B2A4A]">
                      {doctor.languages.join(", ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#6B756B]">Location</dt>
                    <dd className="mt-1 text-[#1B2A4A]">
                      {doctor.clinic}, {doctor.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#6B756B]">Availability</dt>
                    <dd className="mt-1 text-[#1B2A4A]">
                      {doctor.availability.join(", ")} · Next{" "}
                      {doctor.nextAvailable}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#6B756B]">Insurance accepted</dt>
                    <dd className="mt-1 text-[#1B2A4A]">
                      {doctor.insurance.join(", ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#6B756B]">Experience</dt>
                    <dd className="mt-1 text-[#1B2A4A]">
                      {doctor.years} years · Rating {doctor.rating}
                    </dd>
                  </div>
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className={btnPrimary}
                    onClick={() => startBook(doctor, "In-person")}
                  >
                    Book in-person
                  </button>
                  {doctor.telehealth && (
                    <button
                      type="button"
                      className={btnSecondary}
                      onClick={() => startBook(doctor, "Telehealth")}
                    >
                      Book telehealth
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {mode === "customer" && view === "book" && (
        <section className="mx-auto max-w-xl px-4 py-10">
          <DemoBadge />
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Book appointment
          </h1>
          <p className="mt-2 text-[#6B756B]">
            {doctor
              ? `With ${doctor.name} · ${doctor.specialty}`
              : "Choose a doctor from search if you prefer a specific clinician."}
          </p>

          <form
            className="mt-8 space-y-5 rounded-2xl border border-[#D8DED8] bg-white p-6"
            onSubmit={(e) => {
              e.preventDefault();
              submitBook();
            }}
          >
            {!doctor && (
              <div>
                <label htmlFor="afya-book-doctor" className={labelCls}>
                  Doctor
                </label>
                <select
                  id="afya-book-doctor"
                  className={field}
                  value={doctorId ?? ""}
                  onChange={(e) => setDoctorId(e.target.value || null)}
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}: {d.specialty}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <fieldset>
              <legend className={labelCls}>Visit type</legend>
              <div className="flex flex-wrap gap-3">
                {(["In-person", "Telehealth"] as const).map((t) => {
                  const disabled = t === "Telehealth" && doctor && !doctor.telehealth;
                  return (
                    <label
                      key={t}
                      className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
                        bookType === t
                          ? "border-[#7A8F7A] bg-[#E8EEE8]"
                          : "border-[#D8DED8]"
                      } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
                    >
                      <input
                        type="radio"
                        name="visit-type"
                        className="h-4 w-4 accent-[#7A8F7A]"
                        checked={bookType === t}
                        disabled={!!disabled}
                        onChange={() => setBookType(t)}
                      />
                      {t}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="afya-book-date" className={labelCls}>
                Date
              </label>
              <input
                id="afya-book-date"
                type="date"
                className={field}
                value={bookDate}
                min="2026-07-23"
                onChange={(e) => setBookDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="afya-book-time" className={labelCls}>
                Time
              </label>
              <select
                id="afya-book-time"
                className={field}
                value={bookTime}
                onChange={(e) => setBookTime(e.target.value)}
                required
              >
                {timeSlots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="afya-book-name" className={labelCls}>
                Your full name
              </label>
              <input
                id="afya-book-name"
                type="text"
                className={field}
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label htmlFor="afya-book-reason" className={labelCls}>
                Reason for visit
              </label>
              <textarea
                id="afya-book-reason"
                className={field + " min-h-[100px] resize-y"}
                value={bookReason}
                onChange={(e) => setBookReason(e.target.value)}
                required
              />
            </div>

            <button type="submit" className={btnPrimary + " w-full"}>
              Confirm booking
            </button>
          </form>
        </section>
      )}

      {mode === "customer" && view === "confirmed" && confirmId && (
        <section className="mx-auto max-w-lg px-4 py-16 text-center">
          <DemoBadge />
          <div
            className="mt-6 rounded-2xl border border-[#7A8F7A]/40 bg-white p-8"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm uppercase tracking-[0.14em] text-[#7A8F7A]">
              Confirmed
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              You&apos;re booked
            </h1>
            <p className="mt-4 text-[#6B756B]">
              {doctor?.name ?? "Your clinician"} · {bookType} · {bookDate} at{" "}
              {bookTime}
            </p>
            <p className="mt-6 font-mono text-2xl tracking-wide text-[#1B2A4A]">
              {confirmId}
            </p>
            <p className="mt-2 text-sm text-[#6B756B]">
              Confirmation ID: keep this for check-in
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                className={btnPrimary}
                onClick={() => go("portal")}
              >
                Open patient portal
              </button>
              <button
                type="button"
                className={btnSecondary}
                onClick={() => go("home")}
              >
                Back home
              </button>
            </div>
          </div>
        </section>
      )}

      {mode === "customer" && view === "portal" && (
        <section className="mx-auto max-w-5xl px-4 py-10">
          <DemoBadge />
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Patient portal
          </h1>
          <p className="mt-2 text-[#6B756B]">
            Signed in as <span className="text-[#1B2A4A]">Maria Kasigila</span>{" "}
            - fictional demo account
          </p>

          <div
            className="mt-6 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Portal sections"
          >
            {(
              [
                ["appointments", "Appointments"],
                ["documents", "Documents"],
                ["invoices", "Invoices"],
                ["messages", "Messages"],
                ["results", "Results"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={portalTab === id}
                className={`min-h-11 rounded-lg px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A8F7A] focus-visible:ring-offset-2 ${
                  portalTab === id
                    ? "bg-[#1B2A4A] text-white"
                    : "bg-white border border-[#D8DED8] text-[#1B2A4A]"
                }`}
                onClick={() => setPortalTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[#D8DED8] bg-white p-5">
            {portalTab === "appointments" && (
              <ul className="divide-y divide-[#E8EEE8]">
                {portalAppointments.map((a) => (
                  <li
                    key={a.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-4"
                  >
                    <div>
                      <p className="font-medium">{a.doctor}</p>
                      <p className="text-sm text-[#6B756B]">
                        {a.specialty} · {a.when} · {a.type}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        a.status === "Upcoming"
                          ? "bg-[#E8EEE8] text-[#7A8F7A]"
                          : "bg-[#F0F0EE] text-[#6B756B]"
                      }`}
                    >
                      {a.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {portalTab === "documents" && (
              <ul className="divide-y divide-[#E8EEE8]">
                {portalDocuments.map((d) => (
                  <li
                    key={d.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-4"
                  >
                    <div>
                      <p className="font-medium">{d.name}</p>
                      <p className="text-sm text-[#6B756B]">
                        {d.type} · {d.date}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="min-h-11 text-sm text-[#7A8F7A] underline-offset-2 hover:underline"
                    >
                      View (demo)
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {portalTab === "invoices" && (
              <ul className="divide-y divide-[#E8EEE8]">
                {portalInvoices.map((inv) => (
                  <li
                    key={inv.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-4"
                  >
                    <div>
                      <p className="font-medium">{inv.description}</p>
                      <p className="text-sm text-[#6B756B]">
                        {inv.id} · {inv.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{inv.amount}</p>
                      <p className="text-sm text-[#7A8F7A]">{inv.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {portalTab === "messages" && (
              <ul className="divide-y divide-[#E8EEE8]">
                {portalMessages.map((m) => (
                  <li key={m.id} className="py-4">
                    <button
                      type="button"
                      className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A8F7A] focus-visible:ring-offset-2 rounded"
                      onClick={() =>
                        setOpenMsg(openMsg === m.id ? null : m.id)
                      }
                      aria-expanded={openMsg === m.id}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium">
                            {m.unread && (
                              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#7A8F7A]" />
                            )}
                            {m.subject}
                          </p>
                          <p className="text-sm text-[#6B756B]">
                            {m.from} · {m.date}
                          </p>
                        </div>
                      </div>
                      {openMsg === m.id && (
                        <p className="mt-3 text-sm leading-relaxed text-[#3A4A66]">
                          {m.preview} This is fictional demo correspondence for
                          the AFYA concept.
                        </p>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {portalTab === "results" && (
              <ul className="divide-y divide-[#E8EEE8]">
                {portalResults.map((r) => (
                  <li key={r.id} className="py-4">
                    <button
                      type="button"
                      className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A8F7A] focus-visible:ring-offset-2 rounded"
                      onClick={() =>
                        setOpenResult(openResult === r.id ? null : r.id)
                      }
                      aria-expanded={openResult === r.id}
                      disabled={r.status === "Pending"}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-medium">{r.name}</p>
                          <p className="text-sm text-[#6B756B]">
                            Ordered by {r.orderedBy} · {r.date}
                          </p>
                        </div>
                        <span className="text-sm text-[#7A8F7A]">
                          {r.status}
                        </span>
                      </div>
                      {openResult === r.id && r.status === "Ready" && (
                        <p className="mt-3 rounded-lg bg-[#E8EEE8] p-3 text-sm text-[#1B2A4A]">
                          Demo result: within expected range. Discuss with your
                          clinician at your next visit.
                        </p>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {mode === "business" && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <DemoBadge />
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Clinic operations
          </h1>
          <p className="mt-2 text-[#6B756B]">
            Providers, schedules, inquiries, and light analytics: demo data.
          </p>

          <div className="mt-6 flex flex-wrap gap-2" role="tablist">
            {(
              [
                ["providers", "Providers"],
                ["appointments", "Appointments"],
                ["schedules", "Schedules"],
                ["inquiries", "Inquiries"],
                ["analytics", "Analytics"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={bizTab === id}
                className={`min-h-11 rounded-lg px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A8F7A] focus-visible:ring-offset-2 ${
                  bizTab === id
                    ? "bg-[#1B2A4A] text-white"
                    : "border border-[#D8DED8] bg-white text-[#1B2A4A]"
                }`}
                onClick={() => setBizTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-[#D8DED8] bg-white">
            {bizTab === "providers" && (
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="border-b border-[#E8EEE8] text-[#6B756B]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Provider</th>
                    <th className="px-4 py-3 font-medium">Specialty</th>
                    <th className="px-4 py-3 font-medium">Today</th>
                    <th className="px-4 py-3 font-medium">Utilization</th>
                  </tr>
                </thead>
                <tbody>
                  {bizProviders.map((p) => (
                    <tr key={p.id} className="border-b border-[#F0F0EE]">
                      <td className="px-4 py-3 font-medium">{p.name}</td>
                      <td className="px-4 py-3">{p.specialty}</td>
                      <td className="px-4 py-3">{p.patientsToday}</td>
                      <td className="px-4 py-3">{p.utilization}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {bizTab === "appointments" && (
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-[#E8EEE8] text-[#6B756B]">
                  <tr>
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Patient</th>
                    <th className="px-4 py-3 font-medium">Doctor</th>
                    <th className="px-4 py-3 font-medium">When</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bizAppointments.map((a) => (
                    <tr key={a.id} className="border-b border-[#F0F0EE]">
                      <td className="px-4 py-3 font-mono text-xs">{a.id}</td>
                      <td className="px-4 py-3">{a.patient}</td>
                      <td className="px-4 py-3">{a.doctor}</td>
                      <td className="px-4 py-3">{a.when}</td>
                      <td className="px-4 py-3">{a.type}</td>
                      <td className="px-4 py-3">{a.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {bizTab === "schedules" && (
              <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {doctors.slice(0, 6).map((d) => (
                  <div
                    key={d.id}
                    className="rounded-xl border border-[#E8EEE8] p-4"
                  >
                    <p className="font-medium">{d.name}</p>
                    <p className="text-sm text-[#6B756B]">{d.specialty}</p>
                    <p className="mt-3 text-sm text-[#1B2A4A]">
                      Days: {d.availability.join(", ")}
                    </p>
                    <p className="text-sm text-[#7A8F7A]">
                      Next open: {d.nextAvailable}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {bizTab === "inquiries" && (
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="border-b border-[#E8EEE8] text-[#6B756B]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Topic</th>
                    <th className="px-4 py-3 font-medium">Channel</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bizInquiries.map((i) => (
                    <tr key={i.id} className="border-b border-[#F0F0EE]">
                      <td className="px-4 py-3 font-medium">{i.name}</td>
                      <td className="px-4 py-3">{i.topic}</td>
                      <td className="px-4 py-3">{i.channel}</td>
                      <td className="px-4 py-3">{i.status}</td>
                      <td className="px-4 py-3">{i.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {bizTab === "analytics" && (
              <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
                {(
                  [
                    ["Bookings this week", bizAnalytics.bookingsThisWeek],
                    ["Telehealth share", `${bizAnalytics.telehealthShare}%`],
                    ["No-show rate", `${bizAnalytics.noShowRate}%`],
                    ["Avg wait", `${bizAnalytics.avgWaitMin} min`],
                    [
                      "Inquiry response",
                      `${bizAnalytics.inquiryResponseHrs} hrs`,
                    ],
                    ["Patient NPS", bizAnalytics.patientNps],
                  ] as const
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[#E8EEE8] p-4"
                  >
                    <p className="text-sm text-[#6B756B]">{label}</p>
                    <p className="mt-2 text-2xl font-semibold text-[#1B2A4A]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <footer className="border-t border-[#D8DED8] py-8 text-center">
        <p className="font-mono text-[10px] tracking-[0.16em] text-[#7A8F7A]">
          KASI CONCEPT / DEMO DATA · FICTIONAL
        </p>
      </footer>
    </div>
  );
}
