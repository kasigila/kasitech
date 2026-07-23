"use client";

import Image from "next/image";
import { useState } from "react";
import { DemoChrome } from "@/components/site/DemoChrome";
import { MpesaOverlay } from "@/components/demo/MpesaOverlay";
import { cn } from "@/lib/cn";
import {
  adminDonations as seedAdminDonations,
  buildFollowPath,
  donationPresets,
  formatTzs,
  getProgram,
  getStory,
  impactStats,
  neemaStory,
  partners,
  programs,
  projects,
  reports,
  stories,
  type DonationRow,
  type Project,
} from "./data";

type View =
  | "home"
  | "stories"
  | "story"
  | "programs"
  | "impact"
  | "locations"
  | "reports"
  | "partners"
  | "donate"
  | "confirm"
  | "follow"
  | "admin";

function DemoBadge({ onDark }: { onDark?: boolean }) {
  return (
    <p
      className={cn(
        "font-mono text-[10px] tracking-[0.16em]",
        onDark ? "text-white/60" : "text-[#8B7355]",
      )}
    >
      KASI CONCEPT · DEMO DATA
    </p>
  );
}

export function ImpactDemo() {
  const [view, setView] = useState<View>("home");
  const [storyId, setStoryId] = useState("neema");
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    projects[0],
  );
  const [amount, setAmount] = useState(100000);
  const [customAmount, setCustomAmount] = useState("");
  const [freq, setFreq] = useState<"one-time" | "monthly">("one-time");
  const [method, setMethod] = useState<"mpesa" | "card">("mpesa");
  const [mpesaOpen, setMpesaOpen] = useState(false);
  const [donateProgram, setDonateProgram] = useState(programs[0].id);
  const [donorName, setDonorName] = useState("");
  const [donationId, setDonationId] = useState<string | null>(null);
  const [followStep, setFollowStep] = useState(0);
  const [reportOpen, setReportOpen] = useState<string | null>(null);
  const [adminList, setAdminList] = useState<DonationRow[]>(() => [
    ...seedAdminDonations,
  ]);
  const [lastDonation, setLastDonation] = useState<{
    id: string;
    amount: number;
    programId: string;
    donor: string;
  } | null>(null);

  const story = getStory(storyId) ?? neemaStory;
  const resolvedAmount = customAmount
    ? Number(customAmount) || amount
    : amount;

  const activeFollowPath = buildFollowPath(
    donateProgram,
    resolvedAmount,
    freq,
    method,
  );

  function go(next: View) {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openStory(id: string) {
    setStoryId(id);
    go("story");
  }

  function submitDonate() {
    const id = `DN-${8800 + Math.floor(Math.random() * 90)}`;
    setDonationId(id);
    const donorLabel = donorName.trim() || "Guest donor";
    setLastDonation({
      id,
      amount: resolvedAmount,
      programId: donateProgram,
      donor: donorLabel,
    });
    setAdminList((prev) => [
      {
        id,
        donor: donorLabel,
        amount: resolvedAmount,
        type: freq === "monthly" ? "Monthly" : "One-time",
        method: method === "mpesa" ? "M-Pesa" : "Card",
        date: "Just now",
        program: getProgram(donateProgram)?.name ?? "Program",
      },
      ...prev,
    ]);
    setFollowStep(0);
    setMpesaOpen(false);
    go("confirm");
  }

  function requestDonate() {
    if (method === "mpesa") {
      setMpesaOpen(true);
      return;
    }
    submitDonate();
  }

  const nav: { id: View; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "stories", label: "Stories" },
    { id: "programs", label: "Programs" },
    { id: "impact", label: "Impact" },
    { id: "locations", label: "Locations" },
    { id: "reports", label: "Reports" },
    { id: "partners", label: "Partners" },
    { id: "donate", label: "Donate" },
    { id: "follow", label: "Follow" },
  ];

  return (
    <div
      className="min-h-screen bg-[#FAFAF8] pt-12 text-[#2C2416]"
      style={{
        fontFamily: 'Georgia, "Times New Roman", "Palatino Linotype", serif',
      }}
    >
      <DemoChrome slug="impact" />

      <header className="sticky top-12 z-40 border-b border-[#8B7355]/25 bg-[#FAFAF8]/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4">
          <button
            type="button"
            className="text-lg tracking-[0.08em]"
            onClick={() => go("home")}
          >
            IMPACT
          </button>
          <nav className="hidden items-center gap-4 lg:flex">
            {nav.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => go(n.id)}
                className={cn(
                  "text-[11px] tracking-[0.12em] uppercase",
                  view === n.id ? "text-[#8B7355]" : "text-[#2C2416]/55",
                )}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go("donate")}
              className="bg-[#8B7355] px-3 py-1.5 text-[11px] tracking-[0.12em] uppercase text-white"
            >
              Donate
            </button>
            <button
              type="button"
              onClick={() => go("admin")}
              className="hidden text-[10px] tracking-wider uppercase text-[#8B7355]/80 sm:inline"
            >
              Admin
            </button>
          </div>
        </div>
      </header>

      {view === "home" && (
        <>
          <section className="relative min-h-[78vh]">
            <Image
              src={neemaStory.image}
              alt="Neema"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
            <div className="relative mx-auto flex min-h-[78vh] max-w-5xl flex-col justify-end px-4 pb-16 pt-24 text-white">
              <DemoBadge onDark />
              <p className="mt-4 text-sm tracking-[0.2em] uppercase text-white/70">
                Mwanza · Age {neemaStory.age}
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl leading-[1.05] tracking-[-0.02em] md:text-6xl lg:text-7xl">
                {neemaStory.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
                {neemaStory.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openStory("neema")}
                  className="border border-white/70 px-5 py-3 text-sm tracking-wide"
                >
                  Read her story
                </button>
                <button
                  type="button"
                  onClick={() => go("donate")}
                  className="bg-[#8B7355] px-5 py-3 text-sm tracking-wide text-white"
                >
                  Donate to Clean Water
                </button>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 py-16">
            <p className="text-sm tracking-[0.18em] uppercase text-[#8B7355]">
              After the story: the numbers
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {impactStats.map((s) => (
                <div key={s.label} className="border-t border-[#8B7355]/35 pt-4">
                  <p className="text-3xl tracking-tight">{s.value}</p>
                  <p className="mt-1 text-sm text-[#2C2416]/60">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => go("follow")}
                className="border border-[#8B7355] px-5 py-3 text-sm tracking-wide text-[#8B7355]"
              >
                Follow Your Donation →
              </button>
              <button
                type="button"
                onClick={() => go("locations")}
                className="text-sm tracking-wide text-[#2C2416]/70 underline-offset-4 hover:underline"
              >
                Explore the impact map
              </button>
            </div>
          </section>
        </>
      )}

      {view === "stories" && (
        <main className="mx-auto max-w-5xl px-4 py-12">
          <DemoBadge />
          <h1 className="mt-3 text-4xl tracking-tight md:text-5xl">Stories</h1>
          <p className="mt-3 max-w-xl text-[#2C2416]/70">
            People first. Metrics live one scroll later.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {stories.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => openStory(s.id)}
                className="group text-left"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width:768px) 100vw, 40vw"
                  />
                </div>
                <p className="mt-4 text-xs tracking-[0.16em] uppercase text-[#8B7355]">
                  {s.region}
                </p>
                <h2 className="mt-1 text-2xl">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#2C2416]/70">
                  {s.excerpt}
                </p>
              </button>
            ))}
          </div>
        </main>
      )}

      {view === "story" && (
        <main className="mx-auto max-w-3xl px-4 py-12">
          <button
            type="button"
            onClick={() => go("stories")}
            className="text-sm text-[#8B7355]"
          >
            ← All stories
          </button>
          <div className="relative mt-6 aspect-[16/10] overflow-hidden">
            <Image
              src={story.image}
              alt={story.name}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 700px"
            />
          </div>
          <DemoBadge />
          <p className="mt-4 text-xs tracking-[0.16em] uppercase text-[#8B7355]">
            {story.region} · Age {story.age}
          </p>
          <h1 className="mt-3 text-4xl tracking-tight md:text-5xl">
            {story.title}
          </h1>
          <p className="mt-6 text-lg leading-[1.7] text-[#2C2416]/85">
            {story.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setDonateProgram(story.programId);
                go("donate");
              }}
              className="bg-[#8B7355] px-5 py-3 text-sm text-white"
            >
              Support this program
            </button>
            <button
              type="button"
              onClick={() => go("follow")}
              className="border border-[#8B7355]/40 px-5 py-3 text-sm"
            >
              Follow a donation path
            </button>
          </div>
        </main>
      )}

      {view === "programs" && (
        <main className="mx-auto max-w-5xl px-4 py-12">
          <DemoBadge />
          <h1 className="mt-3 text-4xl tracking-tight">Programs</h1>
          <div className="mt-10 space-y-10">
            {programs.map((p) => (
              <article
                key={p.id}
                className="grid gap-6 border-t border-[#8B7355]/25 pt-8 md:grid-cols-[1fr_1.2fr]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 40vw"
                  />
                </div>
                <div>
                  <h2 className="text-3xl">{p.name}</h2>
                  <p className="mt-2 text-sm text-[#8B7355]">{p.focus}</p>
                  <p className="mt-4 leading-relaxed text-[#2C2416]/75">
                    {p.description}
                  </p>
                  <p className="mt-4 text-sm">
                    {p.peopleServed.toLocaleString()} people ·{" "}
                    {p.regions.join(", ")}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setDonateProgram(p.id);
                      go("donate");
                    }}
                    className="mt-6 border border-[#8B7355] px-4 py-2 text-sm text-[#8B7355]"
                  >
                    Donate to {p.name}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </main>
      )}

      {view === "impact" && (
        <main className="mx-auto max-w-5xl px-4 py-12">
          <DemoBadge />
          <h1 className="mt-3 text-4xl tracking-tight">Impact</h1>
          <p className="mt-3 max-w-xl text-[#2C2416]/70">
            Aggregates we publish. Every figure links to a program and a
            reporting trail.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((s) => (
              <div
                key={s.label}
                className="border border-[#8B7355]/25 bg-white p-6"
              >
                <p className="text-3xl">{s.value}</p>
                <p className="mt-2 text-sm text-[#2C2416]/60">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {programs.map((p) => (
              <div
                key={p.id}
                className="border-l-2 border-[#8B7355] bg-white/80 py-4 pl-5"
              >
                <p className="text-xl">{p.name}</p>
                <p className="mt-1 text-sm text-[#2C2416]/65">
                  {p.peopleServed.toLocaleString()} reached · {p.focus}
                </p>
              </div>
            ))}
          </div>
        </main>
      )}

      {view === "locations" && (
        <main className="mx-auto max-w-5xl px-4 py-12">
          <DemoBadge />
          <h1 className="mt-3 text-4xl tracking-tight">Locations</h1>
          <p className="mt-3 text-[#2C2416]/70">
            Tanzania regions with active IMPACT projects: tap a pin.
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#8B7355]/30 bg-[#EDE6DC]">
              <svg
                viewBox="0 0 100 120"
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                <path
                  d="M48 8 L62 12 L78 28 L88 42 L82 58 L74 78 L58 95 L42 102 L28 92 L18 70 L14 48 L22 28 L36 14 Z"
                  fill="#D9CFC0"
                  stroke="#8B7355"
                  strokeWidth="0.6"
                />
                <text
                  x="50"
                  y="14"
                  textAnchor="middle"
                  fontSize="3.2"
                  fill="#8B7355"
                  fontFamily="Georgia, serif"
                >
                  TANZANIA
                </text>
              </svg>
              {projects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  title={p.name}
                  onClick={() => setSelectedProject(p)}
                  className={cn(
                    "absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow",
                    selectedProject?.id === p.id
                      ? "bg-[#2C2416] scale-125"
                      : "bg-[#8B7355]",
                  )}
                  style={{ left: `${p.mapX}%`, top: `${p.mapY}%` }}
                />
              ))}
            </div>
            <div>
              {selectedProject ? (
                <div className="border border-[#8B7355]/25 bg-white p-6">
                  <p className="text-xs tracking-[0.16em] uppercase text-[#8B7355]">
                    {selectedProject.region} · {selectedProject.status}
                  </p>
                  <h2 className="mt-2 text-2xl">{selectedProject.name}</h2>
                  <p className="mt-2 text-sm text-[#2C2416]/65">
                    {getProgram(selectedProject.programId)?.name}
                  </p>
                  <p className="mt-4 leading-relaxed">
                    {selectedProject.outcome}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setDonateProgram(selectedProject.programId);
                      go("donate");
                    }}
                    className="mt-6 bg-[#8B7355] px-4 py-2 text-sm text-white"
                  >
                    Fund this work
                  </button>
                </div>
              ) : (
                <p className="text-sm text-[#2C2416]/55">Select a project pin.</p>
              )}
              <ul className="mt-6 space-y-2 text-sm">
                {projects.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(p)}
                      className={cn(
                        "w-full border-b border-[#8B7355]/15 py-2 text-left",
                        selectedProject?.id === p.id && "text-[#8B7355]",
                      )}
                    >
                      {p.region}: {p.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      )}

      {view === "reports" && (
        <main className="mx-auto max-w-5xl px-4 py-12">
          <DemoBadge />
          <h1 className="mt-3 text-4xl tracking-tight">Reports</h1>
          <p className="mt-3 max-w-xl text-[#2C2416]/70">
            Transparency hub: annual, financial, and methodology documents.
          </p>
          <div className="mt-10 space-y-3">
            {reports.map((r) => (
              <div key={r.id} className="border border-[#8B7355]/25 bg-white">
                <button
                  type="button"
                  onClick={() =>
                    setReportOpen(reportOpen === r.id ? null : r.id)
                  }
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <div>
                    <p className="text-xs tracking-[0.14em] uppercase text-[#8B7355]">
                      {r.type} · {r.year}
                    </p>
                    <p className="mt-1 text-lg">{r.title}</p>
                  </div>
                  <span className="text-[#8B7355]">
                    {reportOpen === r.id ? "−" : "+"}
                  </span>
                </button>
                {reportOpen === r.id && (
                  <div className="border-t border-[#8B7355]/15 px-5 py-4 text-sm leading-relaxed text-[#2C2416]/75">
                    <p>{r.summary}</p>
                    <p className="mt-3 font-mono text-[10px] tracking-wider text-[#8B7355]">
                      DEMO PDF · NOT A REAL FILING
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      )}

      {view === "partners" && (
        <main className="mx-auto max-w-5xl px-4 py-12">
          <DemoBadge />
          <h1 className="mt-3 text-4xl tracking-tight">Partners</h1>
          <p className="mt-3 text-[#2C2416]/70">
            Local institutions we work beside: not logos without context.
          </p>
          <ul className="mt-10 divide-y divide-[#8B7355]/20 border-y border-[#8B7355]/20">
            {partners.map((p) => (
              <li
                key={p.name}
                className="flex flex-wrap items-baseline justify-between gap-2 py-5"
              >
                <div>
                  <p className="text-xl">{p.name}</p>
                  <p className="mt-1 text-sm text-[#2C2416]/60">{p.role}</p>
                </div>
                <p className="text-sm text-[#8B7355]">Since {p.since}</p>
              </li>
            ))}
          </ul>
        </main>
      )}

      {view === "donate" && (
        <main className="mx-auto max-w-xl px-4 py-12">
          <DemoBadge />
          <h1 className="mt-3 text-4xl tracking-tight">Donate</h1>
          <p className="mt-2 text-[#2C2416]/70">
            Choose amount, frequency, and payment: demo confirmation only.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <p className="text-xs tracking-[0.14em] uppercase text-[#8B7355]">
                Program
              </p>
              <select
                className="mt-2 w-full border border-[#8B7355]/30 bg-white px-3 py-2.5 text-sm"
                value={donateProgram}
                onChange={(e) => setDonateProgram(e.target.value)}
              >
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-xs tracking-[0.14em] uppercase text-[#8B7355]">
                Amount
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {donationPresets.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      setAmount(a);
                      setCustomAmount("");
                    }}
                    className={cn(
                      "border py-3 text-sm",
                      !customAmount && amount === a
                        ? "border-[#8B7355] bg-[#8B7355]/10"
                        : "border-[#8B7355]/25",
                    )}
                  >
                    {formatTzs(a)}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Custom amount (TZS)"
                className="mt-3 w-full border border-[#8B7355]/30 bg-white px-3 py-2.5 text-sm"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              {(
                [
                  ["one-time", "One-time"],
                  ["monthly", "Monthly"],
                ] as const
              ).map(([k, l]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setFreq(k)}
                  className={cn(
                    "flex-1 border py-3 text-sm",
                    freq === k
                      ? "border-[#8B7355] bg-[#8B7355]/10"
                      : "border-[#8B7355]/25",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              {(
                [
                  ["mpesa", "M-Pesa"],
                  ["card", "Card"],
                ] as const
              ).map(([k, l]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setMethod(k)}
                  className={cn(
                    "flex-1 border py-3 text-sm",
                    method === k
                      ? "border-[#8B7355] bg-[#8B7355]/10"
                      : "border-[#8B7355]/25",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>

            <label className="block text-sm">
              <span className="text-[#2C2416]/60">Name (optional)</span>
              <input
                className="mt-1 w-full border border-[#8B7355]/30 bg-white px-3 py-2.5"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Anonymous if blank"
              />
            </label>

            <button
              type="button"
              onClick={requestDonate}
              className="w-full bg-[#8B7355] py-3.5 text-sm tracking-wide text-white"
            >
              Give {formatTzs(resolvedAmount)}{" "}
              {freq === "monthly" ? "monthly" : "once"}
            </button>
          </div>
        </main>
      )}

      <MpesaOverlay
        open={mpesaOpen}
        amountLabel={formatTzs(resolvedAmount)}
        phoneHint="07XX XXX XXX"
        onSuccess={submitDonate}
        onCancel={() => setMpesaOpen(false)}
      />

      {view === "confirm" && (
        <main className="mx-auto max-w-xl px-4 py-16 text-center">
          <DemoBadge />
          <h1 className="mt-6 text-4xl tracking-tight">Thank you</h1>
          {lastDonation && (
            <div className="mx-auto mt-8 max-w-sm border border-[#8B7355]/35 bg-white p-6 text-left shadow-sm">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8B7355]">
                Share your impact
              </p>
              <p className="mt-4 text-2xl leading-snug">
                What your money did:{" "}
                {getProgram(lastDonation.programId)?.name ?? "our work"} ·{" "}
                {formatTzs(lastDonation.amount)}.
              </p>
              <p className="mt-3 text-sm text-[#2C2416]/65">
                {getProgram(lastDonation.programId)?.focus}
              </p>
              <p className="mt-4 font-mono text-[10px] tracking-wider text-[#8B7355]">
                {lastDonation.id} · IMPACT DEMO
              </p>
              <button
                type="button"
                className="mt-4 w-full border border-[#8B7355]/40 py-2 text-xs tracking-wide"
                onClick={() => {
                  void navigator.clipboard?.writeText(
                    `I funded ${getProgram(lastDonation.programId)?.name} with ${formatTzs(lastDonation.amount)} via IMPACT.`,
                  );
                }}
              >
                Copy share line
              </button>
            </div>
          )}
          <p className="mt-8 leading-relaxed text-[#2C2416]/75">
            Donation <strong>{donationId}</strong> for{" "}
            {formatTzs(resolvedAmount)} ({freq}) via{" "}
            {method === "mpesa" ? "M-Pesa" : "card"} toward{" "}
            {getProgram(donateProgram)?.name}.{" "}
            {donorName ? `Recorded for ${donorName}.` : "Recorded as anonymous."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setFollowStep(0);
                go("follow");
              }}
              className="bg-[#8B7355] px-5 py-3 text-sm text-white"
            >
              Follow Your Donation
            </button>
            <button
              type="button"
              onClick={() => go("home")}
              className="border border-[#8B7355]/40 px-5 py-3 text-sm"
            >
              Back home
            </button>
          </div>
        </main>
      )}

      {view === "follow" && (
        <main className="mx-auto max-w-3xl px-4 py-12">
          <DemoBadge />
          <h1 className="mt-3 text-4xl tracking-tight md:text-5xl">
            Follow Your Donation
          </h1>
          <p className="mt-3 text-[#2C2416]/70">
            Donation → Program → Region → Activity → Outcome → Reporting
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {activeFollowPath.map((step, i) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setFollowStep(i)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs tracking-wide",
                  i === followStep
                    ? "bg-[#8B7355] text-white"
                    : i < followStep
                      ? "bg-[#8B7355]/20 text-[#2C2416]"
                      : "bg-[#EDE6DC] text-[#2C2416]/50",
                )}
              >
                {i + 1}. {step.label}
              </button>
            ))}
          </div>
          <div className="relative mt-8 border border-[#8B7355]/25 bg-white p-8">
            <div className="absolute left-0 top-0 h-1 bg-[#8B7355] transition-all"
              style={{
                width: `${((followStep + 1) / activeFollowPath.length) * 100}%`,
              }}
            />
            <p className="text-xs tracking-[0.18em] uppercase text-[#8B7355]">
              Step {followStep + 1} of {activeFollowPath.length}
            </p>
            <h2 className="mt-3 text-3xl">{activeFollowPath[followStep].label}</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#2C2416]/80">
              {activeFollowPath[followStep].detail}
            </p>
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                disabled={followStep === 0}
                onClick={() => setFollowStep((s) => Math.max(0, s - 1))}
                className="border border-[#8B7355]/30 px-4 py-2 text-sm disabled:opacity-40"
              >
                Back
              </button>
              {followStep < activeFollowPath.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setFollowStep((s) => s + 1)}
                  className="bg-[#8B7355] px-4 py-2 text-sm text-white"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => go("reports")}
                  className="bg-[#8B7355] px-4 py-2 text-sm text-white"
                >
                  Open reports
                </button>
              )}
            </div>
          </div>
        </main>
      )}

      {view === "admin" && (
        <main className="mx-auto max-w-5xl px-4 py-12">
          <DemoBadge />
          <h1 className="mt-3 text-3xl tracking-tight">Donations desk</h1>
          <p className="mt-1 text-sm text-[#2C2416]/60">
            Simple admin list · demo data
          </p>
          <div className="mt-6 overflow-x-auto border border-[#8B7355]/25 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-[#8B7355]/20 text-[#2C2416]/50">
                <tr>
                  <th className="px-4 py-3 font-normal">ID</th>
                  <th className="px-4 py-3 font-normal">Donor</th>
                  <th className="px-4 py-3 font-normal">Amount</th>
                  <th className="px-4 py-3 font-normal">Type</th>
                  <th className="px-4 py-3 font-normal">Method</th>
                  <th className="px-4 py-3 font-normal">Program</th>
                </tr>
              </thead>
              <tbody>
                {adminList.map((d, i) => (
                  <tr
                    key={d.id}
                    className={cn(
                      "border-t border-[#8B7355]/10",
                      i === 0 && d.date === "Just now" && "bg-[#EDE6DC]/60",
                    )}
                  >
                    <td className="px-4 py-3 font-mono text-xs">{d.id}</td>
                    <td className="px-4 py-3">{d.donor}</td>
                    <td className="px-4 py-3">{formatTzs(d.amount)}</td>
                    <td className="px-4 py-3">{d.type}</td>
                    <td className="px-4 py-3">{d.method}</td>
                    <td className="px-4 py-3">{d.program}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-30 flex overflow-x-auto border-t border-[#8B7355]/20 bg-[#FAFAF8]/95 px-1 py-2 backdrop-blur lg:hidden">
        {(
          [
            ["home", "Home"],
            ["stories", "Stories"],
            ["locations", "Map"],
            ["donate", "Donate"],
            ["follow", "Follow"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => go(id)}
            className={cn(
              "min-w-[4.5rem] flex-1 py-2 text-[10px] tracking-wide uppercase",
              view === id ? "text-[#8B7355]" : "text-[#2C2416]/45",
            )}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="h-14 lg:hidden" />
    </div>
  );
}
