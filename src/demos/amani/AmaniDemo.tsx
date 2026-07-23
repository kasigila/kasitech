"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { DemoChrome } from "@/components/site/DemoChrome";
import {
  amaniColors as c,
  bizAnalytics,
  bizDownloads,
  bizLeads,
  careers,
  caseMetrics,
  caseMilestones,
  cmsPages,
  defaultExpansionSequence,
  expertiseAreas,
  getPerson,
  heroImage,
  industries,
  insightTopics,
  insights,
  mapCountries,
  people,
  serif,
  type MapCountryId,
  type Person,
} from "./data";

type Mode = "customer" | "business";
type Section =
  | "home"
  | "expertise"
  | "industries"
  | "people"
  | "person"
  | "insights"
  | "case"
  | "about"
  | "careers"
  | "contact"
  | "business";

type BizTab =
  | "cms"
  | "people"
  | "insights"
  | "leads"
  | "downloads"
  | "analytics";

function DemoBadge() {
  return (
    <p className="font-mono text-[10px] tracking-[0.18em] text-[#C4A574]">
      KASI CONCEPT · DEMO DATA
    </p>
  );
}

export function AmaniDemo() {
  const [mode, setMode] = useState<Mode>("customer");
  const [section, setSection] = useState<Section>("home");
  const [personId, setPersonId] = useState<string | null>(null);
  const [topic, setTopic] = useState<(typeof insightTopics)[number]>("All");
  const [query, setQuery] = useState("");
  const [openInsight, setOpenInsight] = useState<string | null>(null);
  const [caseStep, setCaseStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<MapCountryId>("ke");
  const [expansionSequence, setExpansionSequence] = useState<MapCountryId[]>(
    () => [...defaultExpansionSequence],
  );
  const [enquiryBrief, setEnquiryBrief] = useState<string | null>(null);
  const [bizTab, setBizTab] = useState<BizTab>("cms");

  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadMsg, setLeadMsg] = useState("");
  const [leadSent, setLeadSent] = useState(false);
  const [leadRef, setLeadRef] = useState<string | null>(null);

  const filteredInsights = useMemo(() => {
    const q = query.trim().toLowerCase();
    return insights.filter((i) => {
      if (topic !== "All" && i.topic !== topic) return false;
      if (!q) return true;
      return (
        i.title.toLowerCase().includes(q) ||
        i.excerpt.toLowerCase().includes(q) ||
        i.topic.toLowerCase().includes(q)
      );
    });
  }, [topic, query]);

  const person: Person | undefined = personId
    ? getPerson(personId)
    : undefined;

  function go(next: Section) {
    setSection(next);
    setMode(next === "business" ? "business" : "customer");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openPerson(id: string) {
    setPersonId(id);
    go("person");
  }

  function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (!leadName.trim() || !leadEmail.trim() || !leadMsg.trim()) return;
    setLeadRef(`AMN-${200 + Math.floor(Math.random() * 90)}`);
    setLeadSent(true);
  }

  const navItems: { id: Section; label: string }[] = [
    { id: "expertise", label: "Expertise" },
    { id: "industries", label: "Industries" },
    { id: "people", label: "People" },
    { id: "insights", label: "Insights" },
    { id: "case", label: "Case" },
    { id: "about", label: "About" },
    { id: "careers", label: "Careers" },
    { id: "contact", label: "Contact" },
  ];

  const field =
    "w-full border border-[#1F3347] bg-[#0B1C2C] px-3 py-3 text-[#F7F4EF] outline-none focus-visible:ring-2 focus-visible:ring-[#C4A574]";
  const btnBrass =
    "inline-flex min-h-11 items-center justify-center bg-[#C4A574] px-5 text-sm tracking-wide text-[#0B1C2C] transition hover:bg-[#E8D9C4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A574] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1C2C]";
  const btnGhost =
    "inline-flex min-h-11 items-center justify-center border border-[#C4A574]/50 px-5 text-sm tracking-wide text-[#C4A574] transition hover:border-[#C4A574] hover:text-[#F7F4EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A574]";

  return (
    <div
      className="min-h-screen pt-12"
      style={{ background: c.navy, color: c.warmWhite }}
    >
      <DemoChrome slug="amani" />

      <header className="sticky top-12 z-40 border-b border-[#1F3347] bg-[#0B1C2C]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => go("home")}
            className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A574]"
            aria-label="AMANI home"
          >
            <p className="text-xl tracking-tight" style={serif}>
              AMANI
            </p>
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#C4A574]">
              KASI CONCEPT / 07
            </p>
          </button>
          <nav
            className="flex flex-wrap items-center gap-0.5 text-[11px] uppercase tracking-[0.12em]"
            aria-label="Primary"
          >
            {navItems.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => go(n.id)}
                className={`px-2.5 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A574] ${
                  mode === "customer" &&
                  (section === n.id ||
                    (n.id === "people" && section === "person"))
                    ? "text-[#C4A574]"
                    : "text-[#8A939C] hover:text-[#F7F4EF]"
                }`}
              >
                {n.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                go(mode === "business" ? "home" : "business")
              }
              className={`ml-2 border px-3 py-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A574] ${
                mode === "business"
                  ? "border-[#C4A574] bg-[#C4A574] text-[#0B1C2C]"
                  : "border-[#C4A574]/40 text-[#C4A574]"
              }`}
              aria-pressed={mode === "business"}
            >
              {mode === "business" ? "Customer" : "Business"}
            </button>
          </nav>
        </div>
      </header>

      {mode === "customer" && section === "home" && (
        <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden">
          <Image
            src={heroImage}
            alt="Modern glass architecture against evening sky"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0B1C2C]/75" />
          <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col justify-end px-4 pb-16 pt-24">
            <DemoBadge />
            <h1
              className="mt-4 max-w-3xl text-4xl uppercase leading-[1.1] tracking-[0.02em] text-[#F7F4EF] sm:text-5xl lg:text-6xl"
              style={serif}
            >
              Decisions that shape tomorrow.
            </h1>
            <p className="mt-5 max-w-xl text-lg tracking-wide text-[#C4A574]">
              Strategy / Capital / Transformation
            </p>
            <p className="mt-4 max-w-lg text-[#8A939C]">
              Institutional counsel for leaders building across East Africa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" className={btnBrass} onClick={() => go("case")}>
                East Africa case
              </button>
              <button type="button" className={btnGhost} onClick={() => go("contact")}>
                Start a conversation
              </button>
            </div>
          </div>
        </section>
      )}

      {mode === "customer" && section === "expertise" && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <DemoBadge />
          <h1 className="mt-3 text-4xl" style={serif}>
            Expertise
          </h1>
          <p className="mt-3 max-w-2xl text-[#8A939C]">
            Three practices. One standard: clarity before ambition.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {expertiseAreas.map((e) => (
              <article
                key={e.id}
                className="border-t border-[#C4A574]/40 pt-6"
              >
                <h2 className="text-2xl text-[#C4A574]" style={serif}>
                  {e.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#F7F4EF]/80">
                  {e.summary}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {mode === "customer" && section === "industries" && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <DemoBadge />
          <h1 className="mt-3 text-4xl" style={serif}>
            Industries
          </h1>
          <p className="mt-3 max-w-2xl text-[#8A939C]">
            Sector fluency without the brochure tone.
          </p>
          <ul className="mt-12 divide-y divide-[#1F3347] border-y border-[#1F3347]">
            {industries.map((i) => (
              <li
                key={i.id}
                className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <h2 className="text-xl text-[#F7F4EF]" style={serif}>
                  {i.name}
                </h2>
                <p className="max-w-md text-sm text-[#8A939C]">{i.note}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {mode === "customer" && section === "people" && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <DemoBadge />
          <h1 className="mt-3 text-4xl" style={serif}>
            People
          </h1>
          <p className="mt-3 max-w-2xl text-[#8A939C]">
            Operators and advisors who have sat on both sides of the table.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {people.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => openPerson(p.id)}
                  className="group flex w-full gap-4 border border-[#1F3347] p-4 text-left transition hover:border-[#C4A574]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A574]"
                >
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden">
                    <Image
                      src={p.photo}
                      alt={`Portrait of ${p.name}`}
                      fill
                      className="object-cover grayscale transition group-hover:grayscale-0"
                      sizes="96px"
                    />
                  </div>
                  <div>
                    <p className="text-xl" style={serif}>
                      {p.name}
                    </p>
                    <p className="mt-1 text-sm text-[#C4A574]">{p.role}</p>
                    <p className="mt-3 text-sm text-[#8A939C] line-clamp-2">
                      {p.bio}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {mode === "customer" && section === "person" && person && (
        <section className="mx-auto max-w-4xl px-4 py-14">
          <button
            type="button"
            className="text-sm text-[#C4A574] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A574]"
            onClick={() => go("people")}
          >
            ← All people
          </button>
          <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={person.photo}
                alt={`Portrait of ${person.name}`}
                fill
                className="object-cover"
                sizes="220px"
              />
            </div>
            <div>
              <DemoBadge />
              <h1 className="mt-3 text-4xl" style={serif}>
                {person.name}
              </h1>
              <p className="mt-2 text-[#C4A574]">{person.role}</p>
              <p className="mt-6 leading-relaxed text-[#F7F4EF]/85">
                {person.bio}
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                <div>
                  <h2 className="text-xs uppercase tracking-[0.16em] text-[#8A939C]">
                    Experience
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm text-[#F7F4EF]/80">
                    {person.experience.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xs uppercase tracking-[0.16em] text-[#8A939C]">
                    Education
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm text-[#F7F4EF]/80">
                    {person.education.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xs uppercase tracking-[0.16em] text-[#8A939C]">
                    Expertise
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm text-[#C4A574]">
                    {person.expertise.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {mode === "customer" && section === "insights" && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <DemoBadge />
          <h1 className="mt-3 text-4xl" style={serif}>
            Insights
          </h1>
          <p className="mt-3 max-w-2xl text-[#8A939C]">
            Articles, reports, and briefs: searchable by topic.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label
                htmlFor="amani-search"
                className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-[#8A939C]"
              >
                Search
              </label>
              <input
                id="amani-search"
                type="search"
                className={field}
                placeholder="Search titles and topics"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="amani-topic"
                className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-[#8A939C]"
              >
                Topic
              </label>
              <select
                id="amani-topic"
                className={field}
                value={topic}
                onChange={(e) =>
                  setTopic(e.target.value as (typeof insightTopics)[number])
                }
              >
                {insightTopics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="mt-4 text-sm text-[#8A939C]" aria-live="polite">
            {filteredInsights.length} result
            {filteredInsights.length === 1 ? "" : "s"}
          </p>

          <ul className="mt-6 divide-y divide-[#1F3347] border-y border-[#1F3347]">
            {filteredInsights.map((i) => (
              <li key={i.id} className="py-6">
                <button
                  type="button"
                  className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A574]"
                  onClick={() =>
                    setOpenInsight(openInsight === i.id ? null : i.id)
                  }
                  aria-expanded={openInsight === i.id}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#C4A574]">
                      {i.type} · {i.topic} · {i.date}
                    </p>
                    <p className="text-xs text-[#8A939C]">{i.readMin} min</p>
                  </div>
                  <h2 className="mt-2 text-2xl" style={serif}>
                    {i.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-[#8A939C]">
                    {i.excerpt}
                  </p>
                  {openInsight === i.id && (
                    <p className="mt-4 border-l border-[#C4A574] pl-4 text-sm leading-relaxed text-[#F7F4EF]/85">
                      Full demo abstract: {i.excerpt} AMANI publishes for
                      executives evaluating regional moves, this piece is
                      fictional concept content for the KasiTech demo.
                    </p>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {mode === "customer" && section === "case" && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <DemoBadge />
          <h1 className="mt-3 text-4xl sm:text-5xl" style={serif}>
            East African Market Expansion
          </h1>
          <p className="mt-4 max-w-2xl text-[#8A939C]">
            Interactive case: map, timeline, challenge, strategy, and outcome.
            Signature of the AMANI demo.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="border border-[#1F3347] bg-[#132536] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#C4A574]">
                Regional map
              </p>
              <svg
                viewBox="0 0 100 100"
                className="mt-4 h-auto w-full"
                role="img"
                aria-label="East Africa expansion map with market status markers"
              >
                <rect width="100" height="100" fill="#0B1C2C" />
                <path
                  d="M35 18 L70 15 L78 35 L72 55 L65 78 L48 85 L32 70 L28 45 Z"
                  fill="#132536"
                  stroke="#1F3347"
                  strokeWidth="0.5"
                />
                <path
                  d="M40 45 Q50 50 58 42 Q62 55 52 65 Q42 60 40 45"
                  fill="none"
                  stroke="#C4A574"
                  strokeWidth="0.6"
                  strokeDasharray="1.5 1"
                  opacity="0.7"
                />
                {mapCountries.map((co) => (
                  <g key={co.id}>
                    <circle
                      cx={co.x}
                      cy={co.y}
                      r={selectedCountry === co.id ? 3.2 : 2.4}
                      fill={
                        co.status === "Live"
                          ? "#C4A574"
                          : co.status === "Build"
                            ? "#E8D9C4"
                            : co.status === "HQ"
                              ? "#F7F4EF"
                              : "#8A939C"
                      }
                      className="cursor-pointer"
                      onClick={() => setSelectedCountry(co.id)}
                    />
                    <text
                      x={co.x + 4}
                      y={co.y + 1}
                      fill="#F7F4EF"
                      fontSize="3.2"
                      className="cursor-pointer"
                      onClick={() => setSelectedCountry(co.id)}
                    >
                      {co.name}
                    </text>
                  </g>
                ))}
              </svg>
              {selectedCountry && (
                <p className="mt-3 text-sm text-[#8A939C]" aria-live="polite">
                  {
                    mapCountries.find((m) => m.id === selectedCountry)?.name
                  }
                  :{" "}
                  <span className="text-[#C4A574]">
                    {
                      mapCountries.find((m) => m.id === selectedCountry)
                        ?.status
                    }
                  </span>
                </p>
              )}
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#C4A574]">
                Narrative
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Challenge", "Strategy", "Outcome", "Timeline"].map(
                  (label, idx) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setCaseStep(idx)}
                      className={`min-h-10 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A574] ${
                        caseStep === idx
                          ? "bg-[#C4A574] text-[#0B1C2C]"
                          : "border border-[#1F3347] text-[#8A939C]"
                      }`}
                    >
                      {label}
                    </button>
                  ),
                )}
              </div>

              <div className="mt-6 min-h-[160px] border-l border-[#C4A574] pl-4">
                {caseStep === 0 && (
                  <>
                    <h2 className="text-2xl" style={serif}>
                      Challenge
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#F7F4EF]/85">
                      Expand across five East African markets without
                      fracturing capital discipline or drowning HQ in country
                      exceptions. Prior growth attempts stalled on FX, talent,
                      and unclear kill criteria.
                    </p>
                  </>
                )}
                {caseStep === 1 && (
                  <>
                    <h2 className="text-2xl" style={serif}>
                      Strategy
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#F7F4EF]/85">
                      Sequence markets by regulatory clarity and corridor
                      access. Ring-fence SPVs, share services centrally and
                      install a capital committee that can stop funding when
                      milestones miss. Kenya and Rwanda first; Ethiopia deferred.
                    </p>
                  </>
                )}
                {caseStep === 2 && (
                  <>
                    <h2 className="text-2xl" style={serif}>
                      Outcome
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#F7F4EF]/85">
                      Two markets live, one in build. Revenue ahead of plan,
                      working capital days down and a decision cycle boards can
                      trust. Demo metrics below.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {caseMetrics.map((m) => (
                        <div
                          key={m.label}
                          className="border border-[#1F3347] p-3"
                        >
                          <p className="text-xs text-[#8A939C]">{m.label}</p>
                          <p className="mt-1 text-xl text-[#C4A574]">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {caseStep === 3 && (
                  <>
                    <h2 className="text-2xl" style={serif}>
                      Timeline
                    </h2>
                    <ol className="mt-4 space-y-4">
                      {caseMilestones.map((m) => (
                        <li key={m.year} className="text-sm">
                          <p className="font-mono text-xs text-[#C4A574]">
                            {m.year}
                          </p>
                          <p className="mt-1 text-[#F7F4EF]" style={serif}>
                            {m.title}
                          </p>
                          <p className="mt-1 text-[#8A939C]">{m.detail}</p>
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {mode === "customer" && section === "about" && (
        <section className="mx-auto max-w-3xl px-4 py-14">
          <DemoBadge />
          <h1 className="mt-3 text-4xl" style={serif}>
            About AMANI
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#F7F4EF]/85">
            AMANI is a fictional strategy firm crafted for KasiTech, built to
            show how institutional brands earn trust through editorial clarity,
            people depth and evidence of thinking.
          </p>
          <p className="mt-4 leading-relaxed text-[#8A939C]">
            We advise boards and executive teams on strategy, capital and
            transformation across East Africa. Our work is measured in decisions
            made cleanly, not decks delivered loudly.
          </p>
          <button
            type="button"
            className={btnBrass + " mt-8"}
            onClick={() => go("contact")}
          >
            Contact the firm
          </button>
        </section>
      )}

      {mode === "customer" && section === "careers" && (
        <section className="mx-auto max-w-4xl px-4 py-14">
          <DemoBadge />
          <h1 className="mt-3 text-4xl" style={serif}>
            Careers
          </h1>
          <p className="mt-3 text-[#8A939C]">
            Open roles: demo listings only.
          </p>
          <ul className="mt-10 divide-y divide-[#1F3347] border-y border-[#1F3347]">
            {careers.map((job) => (
              <li
                key={job.id}
                className="flex flex-wrap items-center justify-between gap-3 py-5"
              >
                <div>
                  <p className="text-xl" style={serif}>
                    {job.title}
                  </p>
                  <p className="mt-1 text-sm text-[#8A939C]">
                    {job.location} · {job.type}
                  </p>
                </div>
                <button
                  type="button"
                  className={btnGhost}
                  onClick={() => go("contact")}
                >
                  Apply via contact
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {mode === "customer" && section === "contact" && (
        <section className="mx-auto max-w-xl px-4 py-14">
          <DemoBadge />
          <h1 className="mt-3 text-4xl" style={serif}>
            Contact
          </h1>
          <p className="mt-3 text-[#8A939C]">
            Tell us about the decision ahead. Demo form: no data leaves this
            browser.
          </p>

          {leadSent ? (
            <div
              className="mt-10 border border-[#C4A574]/50 bg-[#132536] p-8"
              role="status"
              aria-live="polite"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#C4A574]">
                Received
              </p>
              <h2 className="mt-3 text-3xl" style={serif}>
                Thank you, {leadName.split(" ")[0] || "there"}.
              </h2>
              <p className="mt-4 text-sm text-[#8A939C]">
                We&apos;ll respond within two business days. Reference{" "}
                <span className="font-mono text-[#C4A574]">{leadRef}</span>.
              </p>
              <button
                type="button"
                className={btnGhost + " mt-6"}
                onClick={() => {
                  setLeadSent(false);
                  setLeadRef(null);
                  setLeadName("");
                  setLeadEmail("");
                  setLeadCompany("");
                  setLeadMsg("");
                }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form className="mt-10 space-y-4" onSubmit={submitLead}>
              <div>
                <label
                  htmlFor="amani-name"
                  className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-[#8A939C]"
                >
                  Full name
                </label>
                <input
                  id="amani-name"
                  className={field}
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
              <div>
                <label
                  htmlFor="amani-email"
                  className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-[#8A939C]"
                >
                  Work email
                </label>
                <input
                  id="amani-email"
                  type="email"
                  className={field}
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label
                  htmlFor="amani-company"
                  className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-[#8A939C]"
                >
                  Organisation
                </label>
                <input
                  id="amani-company"
                  className={field}
                  value={leadCompany}
                  onChange={(e) => setLeadCompany(e.target.value)}
                  autoComplete="organization"
                />
              </div>
              <div>
                <label
                  htmlFor="amani-msg"
                  className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-[#8A939C]"
                >
                  How can we help?
                </label>
                <textarea
                  id="amani-msg"
                  className={field + " min-h-[120px]"}
                  value={leadMsg}
                  onChange={(e) => setLeadMsg(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={btnBrass + " w-full"}>
                Submit inquiry
              </button>
            </form>
          )}
        </section>
      )}

      {mode === "business" && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <DemoBadge />
          <h1 className="mt-3 text-4xl" style={serif}>
            Firm CMS
          </h1>
          <p className="mt-2 text-[#8A939C]">
            Content, people, insights, leads, downloads, analytics.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(
              [
                ["cms", "CMS"],
                ["people", "People"],
                ["insights", "Insights"],
                ["leads", "Leads"],
                ["downloads", "Downloads"],
                ["analytics", "Analytics"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setBizTab(id)}
                className={`min-h-10 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A574] ${
                  bizTab === id
                    ? "bg-[#C4A574] text-[#0B1C2C]"
                    : "border border-[#1F3347] text-[#8A939C]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-x-auto border border-[#1F3347] bg-[#132536]">
            {bizTab === "cms" && (
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b border-[#1F3347] text-[#8A939C]">
                  <tr>
                    <th className="px-4 py-3 font-normal">Page</th>
                    <th className="px-4 py-3 font-normal">Status</th>
                    <th className="px-4 py-3 font-normal">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {cmsPages.map((p) => (
                    <tr key={p.id} className="border-b border-[#1F3347]/60">
                      <td className="px-4 py-3">{p.title}</td>
                      <td className="px-4 py-3 text-[#C4A574]">{p.status}</td>
                      <td className="px-4 py-3 text-[#8A939C]">{p.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {bizTab === "people" && (
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b border-[#1F3347] text-[#8A939C]">
                  <tr>
                    <th className="px-4 py-3 font-normal">Name</th>
                    <th className="px-4 py-3 font-normal">Role</th>
                    <th className="px-4 py-3 font-normal">Expertise</th>
                  </tr>
                </thead>
                <tbody>
                  {people.map((p) => (
                    <tr key={p.id} className="border-b border-[#1F3347]/60">
                      <td className="px-4 py-3">{p.name}</td>
                      <td className="px-4 py-3">{p.role}</td>
                      <td className="px-4 py-3 text-[#8A939C]">
                        {p.expertise.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {bizTab === "insights" && (
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="border-b border-[#1F3347] text-[#8A939C]">
                  <tr>
                    <th className="px-4 py-3 font-normal">Title</th>
                    <th className="px-4 py-3 font-normal">Type</th>
                    <th className="px-4 py-3 font-normal">Topic</th>
                    <th className="px-4 py-3 font-normal">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {insights.map((i) => (
                    <tr key={i.id} className="border-b border-[#1F3347]/60">
                      <td className="px-4 py-3">{i.title}</td>
                      <td className="px-4 py-3">{i.type}</td>
                      <td className="px-4 py-3 text-[#C4A574]">{i.topic}</td>
                      <td className="px-4 py-3 text-[#8A939C]">{i.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {bizTab === "leads" && (
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="border-b border-[#1F3347] text-[#8A939C]">
                  <tr>
                    <th className="px-4 py-3 font-normal">Name</th>
                    <th className="px-4 py-3 font-normal">Company</th>
                    <th className="px-4 py-3 font-normal">Interest</th>
                    <th className="px-4 py-3 font-normal">Status</th>
                    <th className="px-4 py-3 font-normal">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bizLeads.map((l) => (
                    <tr key={l.id} className="border-b border-[#1F3347]/60">
                      <td className="px-4 py-3">{l.name}</td>
                      <td className="px-4 py-3">{l.company}</td>
                      <td className="px-4 py-3">{l.interest}</td>
                      <td className="px-4 py-3 text-[#C4A574]">{l.status}</td>
                      <td className="px-4 py-3 text-[#8A939C]">{l.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {bizTab === "downloads" && (
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b border-[#1F3347] text-[#8A939C]">
                  <tr>
                    <th className="px-4 py-3 font-normal">Asset</th>
                    <th className="px-4 py-3 font-normal">Downloads</th>
                    <th className="px-4 py-3 font-normal">Last</th>
                  </tr>
                </thead>
                <tbody>
                  {bizDownloads.map((d) => (
                    <tr key={d.id} className="border-b border-[#1F3347]/60">
                      <td className="px-4 py-3">{d.title}</td>
                      <td className="px-4 py-3 text-[#C4A574]">
                        {d.downloads}
                      </td>
                      <td className="px-4 py-3 text-[#8A939C]">{d.last}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {bizTab === "analytics" && (
              <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
                {(
                  [
                    ["Visitors (30d)", bizAnalytics.visitors],
                    ["Insight reads", bizAnalytics.insightReads],
                    ["Lead conversion", bizAnalytics.leadConversion],
                    ["Case completions", bizAnalytics.caseCompletions],
                    ["Avg session", bizAnalytics.avgSession],
                    ["Download rate", bizAnalytics.downloadRate],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="border border-[#1F3347] p-4">
                    <p className="text-xs text-[#8A939C]">{label}</p>
                    <p className="mt-2 text-2xl text-[#C4A574]">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <footer className="border-t border-[#1F3347] py-8 text-center">
        <p className="font-mono text-[10px] tracking-[0.16em] text-[#C4A574]">
          KASI CONCEPT / DEMO DATA · FICTIONAL
        </p>
      </footer>
    </div>
  );
}
