"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { DemoChrome } from "@/components/site/DemoChrome";
import { cn } from "@/lib/cn";
import {
  announcements,
  applicationsAdmin,
  applySteps,
  campuses,
  careerGoalOptions,
  degreeLevels,
  durations,
  feeBalance,
  fields,
  formatTzs,
  futureInterestOptions,
  getProgram,
  heroImage,
  interestOptions,
  portalDocuments,
  programs,
  schedule,
  strengthOptions,
  studentCourses,
  suggestFromFuture,
  type Campus,
  type DegreeLevel,
  type Duration,
  type Field,
  type Program,
} from "./data";

type Mode = "prospect" | "student" | "admin";
type View =
  | "home"
  | "finder"
  | "program"
  | "apply"
  | "confirm"
  | "portal"
  | "future"
  | "admin";

type Finder = {
  level: DegreeLevel | "Any";
  field: Field | "Any";
  interest: string;
  duration: Duration | "Any";
  campus: Campus | "Any";
};

function DemoBadge({ light }: { light?: boolean }) {
  return (
    <p
      className={cn(
        "font-mono text-[10px] tracking-[0.16em]",
        light ? "text-white/70" : "text-[#1E4FD6]/70",
      )}
    >
      KASI CONCEPT · DEMO DATA
    </p>
  );
}

function NavBtn({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-[11px] tracking-[0.12em] uppercase transition-colors",
        active ? "text-[#1E4FD6]" : "text-[#1a1a1a]/65 hover:text-[#1E4FD6]",
      )}
    >
      {children}
    </button>
  );
}

export function NuruDemo() {
  const [mode, setMode] = useState<Mode>("prospect");
  const [view, setView] = useState<View>("home");
  const [programId, setProgramId] = useState<string | null>(null);
  const [programTab, setProgramTab] = useState<
    | "overview"
    | "curriculum"
    | "fees"
    | "requirements"
    | "faculty"
    | "careers"
  >("overview");
  const [finder, setFinder] = useState<Finder>({
    level: "Any",
    field: "Any",
    interest: "Any",
    duration: "Any",
    campus: "Any",
  });
  const [portalTab, setPortalTab] = useState<
    "courses" | "schedule" | "grades" | "fees" | "announcements" | "documents"
  >("courses");

  // Application
  const [applyStep, setApplyStep] = useState(0);
  const [appId, setAppId] = useState<string | null>(null);
  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Dar es Salaam",
  });
  const [education, setEducation] = useState({
    school: "",
    year: "2025",
    qualification: "Form VI",
  });
  const [docs, setDocs] = useState({
    transcript: false,
    id: false,
    photo: false,
  });
  const [essay, setEssay] = useState("");
  const [payMethod, setPayMethod] = useState<"mpesa" | "card">("mpesa");
  const [payDone, setPayDone] = useState(false);

  // Future builder
  const [fi, setFi] = useState<string[]>([]);
  const [fs, setFs] = useState<string[]>([]);
  const [fg, setFg] = useState<string[]>([]);
  const [futureResult, setFutureResult] = useState<ReturnType<
    typeof suggestFromFuture
  > | null>(null);
  const [futureStep, setFutureStep] = useState(0);

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      if (finder.level !== "Any" && p.level !== finder.level) return false;
      if (finder.field !== "Any" && p.field !== finder.field) return false;
      if (finder.duration !== "Any" && p.duration !== finder.duration)
        return false;
      if (finder.campus !== "Any" && p.campus !== finder.campus) return false;
      if (
        finder.interest !== "Any" &&
        !p.interestTags.includes(finder.interest)
      )
        return false;
      return true;
    });
  }, [finder]);

  const program = programId ? getProgram(programId) : null;

  function go(next: View) {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openProgram(id: string) {
    setProgramId(id);
    setProgramTab("overview");
    go("program");
  }

  function startApply(id?: string) {
    if (id) setProgramId(id);
    setApplyStep(0);
    setPayDone(false);
    setMode("prospect");
    go("apply");
  }

  function submitApplication() {
    const id = `NU-${2400 + Math.floor(Math.random() * 80)}`;
    setAppId(id);
    go("confirm");
  }

  function toggleChip(
    list: string[],
    set: (v: string[]) => void,
    item: string,
  ) {
    set(
      list.includes(item) ? list.filter((x) => x !== item) : [...list, item],
    );
  }

  function runFuture() {
    setFutureResult(
      suggestFromFuture({ interests: fi, strengths: fs, goals: fg }),
    );
    setFutureStep(3);
  }

  function switchMode(next: Mode) {
    setMode(next);
    if (next === "student") go("portal");
    else if (next === "admin") go("admin");
    else go("home");
  }

  return (
    <div className="min-h-screen bg-[#F5F0E6] pt-12 text-[#1a1a1a]">
      <DemoChrome slug="nuru" />

      <header className="sticky top-12 z-40 border-b border-[#1E4FD6]/15 bg-[#F5F0E6]/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <button
            type="button"
            className="text-lg font-bold tracking-[0.18em] text-[#1E4FD6]"
            onClick={() => {
              setMode("prospect");
              go("home");
            }}
          >
            NURU
          </button>
          <nav className="hidden items-center gap-5 md:flex">
            <NavBtn
              active={view === "finder" || view === "program"}
              onClick={() => go("finder")}
            >
              Programs
            </NavBtn>
            <NavBtn active={view === "future"} onClick={() => go("future")}>
              Build Your Future
            </NavBtn>
            <NavBtn
              active={view === "apply" || view === "confirm"}
              onClick={() => startApply(programId ?? programs[0].id)}
            >
              Apply
            </NavBtn>
            <NavBtn
              active={view === "portal"}
              onClick={() => switchMode("student")}
            >
              Portal
            </NavBtn>
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-[#1E4FD6]/25 p-0.5 text-[10px] tracking-wider uppercase">
              {(
                [
                  ["prospect", "Prospect"],
                  ["student", "Student"],
                  ["admin", "Admin"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => switchMode(key)}
                  className={cn(
                    "rounded-full px-2.5 py-1",
                    mode === key
                      ? "bg-[#1E4FD6] text-white"
                      : "text-[#1a1a1a]/60",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {view === "home" && (
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="Students on campus"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#1E4FD6]/75" />
          </div>
          <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 text-white">
            <DemoBadge light />
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              WHAT COULD YOU BECOME?
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/90 md:text-xl">
              FIND YOUR PROGRAM
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => go("finder")}
                className="bg-[#F5C518] px-6 py-3 text-sm font-semibold tracking-wide text-[#1a1a1a]"
              >
                Find programs →
              </button>
              <button
                type="button"
                onClick={() => {
                  setFutureStep(0);
                  setFutureResult(null);
                  go("future");
                }}
                className="border border-white/70 px-6 py-3 text-sm tracking-wide text-white hover:bg-white/10"
              >
                Build Your Future
              </button>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ["8", "Programs across 6 fields"],
                ["4", "Campuses + online"],
                ["92%", "Graduates employed in 6 months"],
              ].map(([n, t]) => (
                <div key={t} className="border-t border-white/30 pt-3">
                  <p className="text-2xl font-bold text-[#F5C518]">{n}</p>
                  <p className="mt-1 text-sm text-white/80">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {view === "finder" && (
        <main className="mx-auto max-w-6xl px-4 py-10">
          <DemoBadge />
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.03em] md:text-5xl">
            Program finder
          </h1>
          <p className="mt-2 max-w-xl text-[#1a1a1a]/70">
            Filter by degree level, field, interest, duration, and campus.
          </p>
          <div className="mt-8 grid gap-3 rounded-2xl border border-[#1E4FD6]/15 bg-white/60 p-4 sm:grid-cols-2 lg:grid-cols-5">
            <Select
              label="Degree level"
              value={finder.level}
              onChange={(v) =>
                setFinder((f) => ({ ...f, level: v as Finder["level"] }))
              }
              options={["Any", ...degreeLevels]}
            />
            <Select
              label="Field"
              value={finder.field}
              onChange={(v) =>
                setFinder((f) => ({ ...f, field: v as Finder["field"] }))
              }
              options={["Any", ...fields]}
            />
            <Select
              label="Interest"
              value={finder.interest}
              onChange={(v) => setFinder((f) => ({ ...f, interest: v }))}
              options={["Any", ...interestOptions]}
            />
            <Select
              label="Duration"
              value={finder.duration}
              onChange={(v) =>
                setFinder((f) => ({ ...f, duration: v as Finder["duration"] }))
              }
              options={["Any", ...durations]}
            />
            <Select
              label="Location"
              value={finder.campus}
              onChange={(v) =>
                setFinder((f) => ({ ...f, campus: v as Finder["campus"] }))
              }
              options={["Any", ...campuses]}
            />
          </div>
          <p className="mt-6 text-sm text-[#1a1a1a]/60">
            {filtered.length} program{filtered.length === 1 ? "" : "s"}
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {filtered.map((p) => (
              <ProgramCard
                key={p.id}
                program={p}
                onOpen={() => openProgram(p.id)}
                onApply={() => startApply(p.id)}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="mt-10 text-center text-[#1a1a1a]/55">
              No programs match — widen a filter and try again.
            </p>
          )}
        </main>
      )}

      {view === "program" && program && (
        <main className="mx-auto max-w-6xl px-4 py-10">
          <button
            type="button"
            className="text-sm text-[#1E4FD6]"
            onClick={() => go("finder")}
          >
            ← All programs
          </button>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <DemoBadge />
              <p className="mt-3 text-xs tracking-[0.14em] uppercase text-[#1E4FD6]">
                {program.level} · {program.field} · {program.campus}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] md:text-5xl">
                {program.name}
              </h1>
              <p className="mt-4 text-[#1a1a1a]/75">{program.overview}</p>
              <div className="mt-6 flex flex-wrap gap-2 border-b border-[#1E4FD6]/15 pb-2">
                {(
                  [
                    "overview",
                    "curriculum",
                    "fees",
                    "requirements",
                    "faculty",
                    "careers",
                  ] as const
                ).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setProgramTab(t)}
                    className={cn(
                      "px-3 py-1.5 text-xs capitalize tracking-wide",
                      programTab === t
                        ? "bg-[#1E4FD6] text-white"
                        : "text-[#1a1a1a]/65 hover:bg-[#1E4FD6]/10",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="mt-6 space-y-3 text-sm leading-relaxed">
                {programTab === "overview" && (
                  <>
                    <p>{program.overview}</p>
                    <p>
                      Duration <strong>{program.duration}</strong> ·{" "}
                      {program.seats} seats this intake · Deadline{" "}
                      <strong>{program.deadline}</strong>
                    </p>
                  </>
                )}
                {programTab === "curriculum" && (
                  <ol className="list-decimal space-y-2 pl-5">
                    {program.curriculum.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ol>
                )}
                {programTab === "fees" && (
                  <>
                    <p className="text-2xl font-bold text-[#1E4FD6]">
                      {formatTzs(program.feePerTerm)}
                      <span className="text-sm font-normal text-[#1a1a1a]/60">
                        {" "}
                        / term
                      </span>
                    </p>
                    <p>
                      Application fee TZS 50,000 (non-refundable). Scholarships
                      available for Lake Zone and female STEM applicants.
                    </p>
                  </>
                )}
                {programTab === "requirements" && (
                  <ul className="list-disc space-y-2 pl-5">
                    {program.requirements.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                )}
                {programTab === "faculty" && (
                  <div className="space-y-4">
                    {program.faculty.map((f) => (
                      <div
                        key={f.name}
                        className="border-l-4 border-[#F5C518] pl-4"
                      >
                        <p className="font-semibold">{f.name}</p>
                        <p className="text-[#1a1a1a]/65">
                          {f.title} · {f.focus}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {programTab === "careers" && (
                  <ul className="list-disc space-y-2 pl-5">
                    {program.careers.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 40vw"
                />
              </div>
              <div className="mt-4 rounded-2xl border border-[#1E4FD6]/20 bg-white/70 p-5">
                <p className="text-xs tracking-[0.14em] uppercase text-[#1a1a1a]/50">
                  Application deadline
                </p>
                <p className="mt-1 text-xl font-bold">{program.deadline}</p>
                <button
                  type="button"
                  onClick={() => startApply(program.id)}
                  className="mt-5 w-full bg-[#1E4FD6] py-3 text-sm font-semibold tracking-wide text-white"
                >
                  Apply now
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {view === "apply" && (
        <main className="mx-auto max-w-2xl px-4 py-10">
          <DemoBadge />
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.03em]">
            Application
          </h1>
          <p className="mt-2 text-sm text-[#1a1a1a]/65">
            {program ? program.name : "Select a program"} · Step {applyStep + 1}{" "}
            of {applySteps.length}
          </p>
          <div className="mt-6 flex gap-1">
            {applySteps.map((s, i) => (
              <div key={s} className="flex-1">
                <div
                  className={cn(
                    "h-1.5 rounded-full",
                    i <= applyStep ? "bg-[#1E4FD6]" : "bg-[#1E4FD6]/15",
                  )}
                />
                <p
                  className={cn(
                    "mt-1 hidden text-[10px] tracking-wide sm:block",
                    i === applyStep ? "text-[#1E4FD6]" : "text-[#1a1a1a]/40",
                  )}
                >
                  {s}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4 rounded-2xl border border-[#1E4FD6]/15 bg-white/70 p-6">
            {applyStep === 0 && (
              <>
                <Field
                  label="Full name"
                  value={personal.name}
                  onChange={(v) => setPersonal({ ...personal, name: v })}
                />
                <Field
                  label="Email"
                  value={personal.email}
                  onChange={(v) => setPersonal({ ...personal, email: v })}
                />
                <Field
                  label="Phone"
                  value={personal.phone}
                  onChange={(v) => setPersonal({ ...personal, phone: v })}
                />
                <Field
                  label="City"
                  value={personal.city}
                  onChange={(v) => setPersonal({ ...personal, city: v })}
                />
              </>
            )}
            {applyStep === 1 && (
              <>
                <label className="block text-sm">
                  <span className="text-[#1a1a1a]/60">Program</span>
                  <select
                    className="mt-1 w-full border border-[#1E4FD6]/20 bg-white px-3 py-2"
                    value={programId ?? ""}
                    onChange={(e) => setProgramId(e.target.value)}
                  >
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
                <Field
                  label="Previous school"
                  value={education.school}
                  onChange={(v) => setEducation({ ...education, school: v })}
                />
                <Field
                  label="Year completed"
                  value={education.year}
                  onChange={(v) => setEducation({ ...education, year: v })}
                />
                <Field
                  label="Qualification"
                  value={education.qualification}
                  onChange={(v) =>
                    setEducation({ ...education, qualification: v })
                  }
                />
              </>
            )}
            {applyStep === 2 && (
              <div className="space-y-3">
                <p className="text-sm text-[#1a1a1a]/65">
                  Mark documents as uploaded (demo).
                </p>
                {(
                  [
                    ["transcript", "Academic transcript"],
                    ["id", "National ID / passport"],
                    ["photo", "Passport photo"],
                  ] as const
                ).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#1E4FD6]/15 px-4 py-3"
                  >
                    <input
                      type="checkbox"
                      checked={docs[key]}
                      onChange={(e) =>
                        setDocs({ ...docs, [key]: e.target.checked })
                      }
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            )}
            {applyStep === 3 && (
              <label className="block text-sm">
                <span className="text-[#1a1a1a]/60">
                  Why this program? (150–500 words)
                </span>
                <textarea
                  rows={6}
                  className="mt-1 w-full border border-[#1E4FD6]/20 bg-white px-3 py-2"
                  value={essay}
                  onChange={(e) => setEssay(e.target.value)}
                  placeholder="I want to build ventures that employ youth in my hometown…"
                />
                <span className="mt-1 block text-xs text-[#1a1a1a]/45">
                  {essay.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </label>
            )}
            {applyStep === 4 && (
              <div className="space-y-4">
                <p className="text-sm">
                  Application fee: <strong>TZS 50,000</strong>
                </p>
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
                      onClick={() => setPayMethod(k)}
                      className={cn(
                        "flex-1 border py-3 text-sm",
                        payMethod === k
                          ? "border-[#1E4FD6] bg-[#1E4FD6]/10"
                          : "border-[#1E4FD6]/20",
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                {!payDone ? (
                  <button
                    type="button"
                    onClick={() => setPayDone(true)}
                    className="w-full bg-[#F5C518] py-3 text-sm font-semibold"
                  >
                    Pay application fee (demo)
                  </button>
                ) : (
                  <p className="rounded-xl bg-[#1E4FD6]/10 px-4 py-3 text-sm text-[#1E4FD6]">
                    Payment received · receipt DEMO-{payMethod.toUpperCase()}
                    -88421
                  </p>
                )}
              </div>
            )}
            {applyStep === 5 && (
              <div className="space-y-3 text-sm">
                <p>
                  <strong>{personal.name || "Applicant"}</strong> ·{" "}
                  {personal.email || "email pending"}
                </p>
                <p>Program: {program?.name ?? "—"}</p>
                <p>
                  Documents:{" "}
                  {Object.values(docs).filter(Boolean).length}/3 uploaded
                </p>
                <p>Essay: {essay ? "Ready" : "Missing"}</p>
                <p>Fee: {payDone ? "Paid" : "Unpaid"}</p>
                <p className="text-[#1a1a1a]/55">
                  Submitting creates a demo application ID — no real data is
                  sent.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between gap-3">
            <button
              type="button"
              disabled={applyStep === 0}
              onClick={() => setApplyStep((s) => Math.max(0, s - 1))}
              className="border border-[#1E4FD6]/25 px-5 py-2.5 text-sm disabled:opacity-40"
            >
              Back
            </button>
            {applyStep < applySteps.length - 1 ? (
              <button
                type="button"
                onClick={() => setApplyStep((s) => s + 1)}
                className="bg-[#1E4FD6] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                disabled={!payDone}
                onClick={submitApplication}
                className="bg-[#1E4FD6] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
              >
                Submit application
              </button>
            )}
          </div>
        </main>
      )}

      {view === "confirm" && (
        <main className="mx-auto max-w-xl px-4 py-16 text-center">
          <DemoBadge />
          <div className="mt-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#F5C518] text-2xl font-bold">
            ✓
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-[-0.03em]">
            Application submitted
          </h1>
          <p className="mt-3 text-[#1a1a1a]/70">
            Reference <strong>{appId}</strong> for{" "}
            {program?.name ?? "your program"}. Admissions will reply within 5
            working days.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => go("home")}
              className="bg-[#1E4FD6] px-5 py-2.5 text-sm text-white"
            >
              Back home
            </button>
            <button
              type="button"
              onClick={() => switchMode("student")}
              className="border border-[#1E4FD6]/30 px-5 py-2.5 text-sm"
            >
              Open student portal
            </button>
          </div>
        </main>
      )}

      {view === "portal" && (
        <main className="mx-auto max-w-6xl px-4 py-10">
          <DemoBadge />
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-[-0.03em]">
                Student portal
              </h1>
              <p className="mt-1 text-sm text-[#1a1a1a]/65">
                Asha Mwanga · BBA Entrepreneurship · Year 2
              </p>
            </div>
            <p className="rounded-full bg-[#F5C518]/40 px-3 py-1 text-xs font-medium">
              Term 2 · 2026
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {(
              [
                "courses",
                "schedule",
                "grades",
                "fees",
                "announcements",
                "documents",
              ] as const
            ).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setPortalTab(t)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs capitalize tracking-wide",
                  portalTab === t
                    ? "bg-[#1E4FD6] text-white"
                    : "bg-white/70 text-[#1a1a1a]/65",
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[#1E4FD6]/15 bg-white/70 p-5">
            {portalTab === "courses" && (
              <ul className="divide-y divide-[#1E4FD6]/10">
                {studentCourses.map((c) => (
                  <li
                    key={c.code}
                    className="flex flex-wrap items-center justify-between gap-2 py-3"
                  >
                    <div>
                      <p className="font-medium">
                        {c.code} · {c.name}
                      </p>
                      <p className="text-xs text-[#1a1a1a]/50">
                        {c.credits} credits · {c.status}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {portalTab === "schedule" && (
              <ul className="divide-y divide-[#1E4FD6]/10">
                {schedule.map((s) => (
                  <li
                    key={`${s.day}-${s.time}`}
                    className="grid grid-cols-[3rem_1fr_auto] gap-3 py-3 text-sm"
                  >
                    <span className="font-semibold text-[#1E4FD6]">
                      {s.day}
                    </span>
                    <span>
                      {s.course}
                      <span className="block text-xs text-[#1a1a1a]/50">
                        {s.room}
                      </span>
                    </span>
                    <span className="text-[#1a1a1a]/60">{s.time}</span>
                  </li>
                ))}
              </ul>
            )}
            {portalTab === "grades" && (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[#1a1a1a]/50">
                    <th className="py-2 font-medium">Course</th>
                    <th className="py-2 font-medium">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {studentCourses.map((c) => (
                    <tr key={c.code} className="border-t border-[#1E4FD6]/10">
                      <td className="py-3">{c.name}</td>
                      <td className="py-3 font-semibold">{c.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {portalTab === "fees" && (
              <div className="space-y-4">
                <p className="text-sm text-[#1a1a1a]/60">{feeBalance.term}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Stat label="Paid" value={formatTzs(feeBalance.paid)} />
                  <Stat label="Balance due" value={formatTzs(feeBalance.due)} />
                  <Stat label="Next due" value={feeBalance.nextDue} />
                </div>
                <button
                  type="button"
                  className="bg-[#1E4FD6] px-5 py-2.5 text-sm text-white"
                >
                  Pay balance (demo)
                </button>
              </div>
            )}
            {portalTab === "announcements" && (
              <ul className="space-y-4">
                {announcements.map((a) => (
                  <li key={a.id} className="border-l-4 border-[#F5C518] pl-4">
                    <p className="text-xs text-[#1a1a1a]/45">{a.date}</p>
                    <p className="font-semibold">{a.title}</p>
                    <p className="mt-1 text-sm text-[#1a1a1a]/70">{a.body}</p>
                  </li>
                ))}
              </ul>
            )}
            {portalTab === "documents" && (
              <ul className="divide-y divide-[#1E4FD6]/10">
                {portalDocuments.map((d) => (
                  <li
                    key={d.name}
                    className="flex items-center justify-between py-3 text-sm"
                  >
                    <span>
                      {d.name}
                      <span className="ml-2 text-xs text-[#1a1a1a]/45">
                        {d.type} · {d.updated}
                      </span>
                    </span>
                    <button type="button" className="text-[#1E4FD6]">
                      Open
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      )}

      {view === "future" && (
        <main className="mx-auto max-w-3xl px-4 py-10">
          <DemoBadge />
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.03em] md:text-5xl">
            BUILD YOUR FUTURE
          </h1>
          <p className="mt-2 text-[#1a1a1a]/70">
            Answer three short questions — we suggest programs and careers that
            fit.
          </p>
          <div className="mt-6 flex gap-1">
            {["Interests", "Strengths", "Goals", "Results"].map((s, i) => (
              <div
                key={s}
                className={cn(
                  "flex-1 border-b-2 pb-2 text-center text-xs",
                  i === futureStep
                    ? "border-[#1E4FD6] text-[#1E4FD6]"
                    : "border-[#1E4FD6]/15 text-[#1a1a1a]/40",
                )}
              >
                {s}
              </div>
            ))}
          </div>

          {futureStep === 0 && (
            <ChipStep
              title="What energizes you?"
              options={futureInterestOptions}
              selected={fi}
              onToggle={(o) => toggleChip(fi, setFi, o)}
              onNext={() => setFutureStep(1)}
            />
          )}
          {futureStep === 1 && (
            <ChipStep
              title="Where are you strong?"
              options={strengthOptions}
              selected={fs}
              onToggle={(o) => toggleChip(fs, setFs, o)}
              onBack={() => setFutureStep(0)}
              onNext={() => setFutureStep(2)}
            />
          )}
          {futureStep === 2 && (
            <ChipStep
              title="Where do you want to go?"
              options={careerGoalOptions}
              selected={fg}
              onToggle={(o) => toggleChip(fg, setFg, o)}
              onBack={() => setFutureStep(1)}
              onNext={runFuture}
              nextLabel="See suggestions"
            />
          )}
          {futureStep === 3 && futureResult && (
            <div className="mt-8 space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-[#1E4FD6]">
                  Programs that fit
                </h2>
                <div className="mt-4 grid gap-4">
                  {futureResult.programs.map((p) => (
                    <ProgramCard
                      key={p.id}
                      program={p}
                      onOpen={() => openProgram(p.id)}
                      onApply={() => startApply(p.id)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#1E4FD6]">
                  Career directions
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {futureResult.careers.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-[#F5C518]/35 px-3 py-1.5 text-sm"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFutureStep(0);
                  setFutureResult(null);
                }}
                className="text-sm text-[#1E4FD6]"
              >
                Retake questionnaire
              </button>
            </div>
          )}
        </main>
      )}

      {view === "admin" && (
        <main className="mx-auto max-w-6xl px-4 py-10">
          <DemoBadge />
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.03em]">
            Admissions desk
          </h1>
          <p className="mt-1 text-sm text-[#1a1a1a]/60">
            Light admin view · demo applications
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-[#1E4FD6]/15 bg-white/70">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-[#1E4FD6]/10 text-[#1a1a1a]/50">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Applicant</th>
                  <th className="px-4 py-3 font-medium">Program</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {applicationsAdmin.map((a) => (
                  <tr key={a.id} className="border-t border-[#1E4FD6]/08">
                    <td className="px-4 py-3 font-mono text-xs">{a.id}</td>
                    <td className="px-4 py-3">{a.name}</td>
                    <td className="px-4 py-3">{a.program}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-[#1E4FD6]/10 px-2 py-0.5 text-xs text-[#1E4FD6]">
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#1a1a1a]/60">{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-[#1E4FD6]/15 bg-[#F5F0E6]/95 px-2 py-2 backdrop-blur md:hidden">
        {(
          [
            ["home", "Home", () => go("home")],
            ["finder", "Programs", () => go("finder")],
            ["future", "Future", () => go("future")],
            ["portal", "Portal", () => switchMode("student")],
          ] as const
        ).map(([key, label, fn]) => (
          <button
            key={key}
            type="button"
            onClick={fn}
            className={cn(
              "flex-1 py-2 text-[10px] tracking-wide uppercase",
              view === key ? "text-[#1E4FD6]" : "text-[#1a1a1a]/50",
            )}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="h-14 md:hidden" />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block text-xs">
      <span className="text-[#1a1a1a]/55">{label}</span>
      <select
        className="mt-1 w-full border border-[#1E4FD6]/20 bg-white px-2 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="text-[#1a1a1a]/60">{label}</span>
      <input
        className="mt-1 w-full border border-[#1E4FD6]/20 bg-white px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#F5F0E6] p-4">
      <p className="text-xs text-[#1a1a1a]/50">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function ProgramCard({
  program,
  onOpen,
  onApply,
}: {
  program: Program;
  onOpen: () => void;
  onApply: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#1E4FD6]/15 bg-white/70">
      <button type="button" className="relative block aspect-[16/9] w-full" onClick={onOpen}>
        <Image
          src={program.image}
          alt={program.name}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 40vw"
        />
      </button>
      <div className="p-4">
        <p className="text-[10px] tracking-[0.14em] uppercase text-[#1E4FD6]">
          {program.level} · {program.duration} · {program.campus}
        </p>
        <h3 className="mt-1 text-lg font-semibold">{program.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-[#1a1a1a]/65">
          {program.overview}
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onOpen}
            className="flex-1 border border-[#1E4FD6]/25 py-2 text-xs tracking-wide"
          >
            Overview
          </button>
          <button
            type="button"
            onClick={onApply}
            className="flex-1 bg-[#1E4FD6] py-2 text-xs tracking-wide text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </article>
  );
}

function ChipStep({
  title,
  options,
  selected,
  onToggle,
  onBack,
  onNext,
  nextLabel = "Continue",
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (o: string) => void;
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className={cn(
              "rounded-full px-4 py-2 text-sm",
              selected.includes(o)
                ? "bg-[#1E4FD6] text-white"
                : "bg-white/80 text-[#1a1a1a]/75",
            )}
          >
            {o}
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="border border-[#1E4FD6]/25 px-5 py-2.5 text-sm"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          disabled={selected.length === 0}
          onClick={onNext}
          className="bg-[#F5C518] px-5 py-2.5 text-sm font-semibold disabled:opacity-40"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
