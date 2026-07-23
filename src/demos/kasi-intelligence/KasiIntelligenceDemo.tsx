"use client";

import { useEffect, useState } from "react";
import { DemoChrome } from "@/components/site/DemoChrome";
import { cn } from "@/lib/cn";
import {
  answers,
  ifOptions,
  initialHistory,
  inspectionOrder,
  opportunity,
  resolveQuery,
  suggestedAutomation,
  suggestedQueries,
  thenOptions,
  whenOptions,
  type AutomationAction,
  type EvidenceSource,
  type HistoryItem,
  type QueryAnswer,
} from "./data";

type View = "ask" | "answer" | "automation" | "opportunity" | "history";

function DemoBadge() {
  return (
    <p className="font-mono text-[10px] tracking-[0.16em] text-white/40">
      KASI CONCEPT · DEMO DATA
    </p>
  );
}

export function KasiIntelligenceDemo() {
  const [view, setView] = useState<View>("ask");
  const [query, setQuery] = useState("Why were sales down in June?");
  const [inspecting, setInspecting] = useState(false);
  const [inspected, setInspected] = useState<EvidenceSource[]>([]);
  const [answer, setAnswer] = useState<QueryAnswer | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);

  // Automation builder
  const [when, setWhen] = useState<(typeof whenOptions)[number]>("New inquiry");
  const [ifCond, setIfCond] =
    useState<(typeof ifOptions)[number]>("No reply in 30 minutes");
  const [thenActs, setThenActs] = useState<AutomationAction[]>([
    "Create CRM lead",
    "Send acknowledgement",
  ]);
  const [autoPreview, setAutoPreview] = useState(false);
  const [autoApproved, setAutoApproved] = useState(false);

  // Opportunity
  const [oppPhase, setOppPhase] = useState<
    "detect" | "suggest" | "preview" | "approved"
  >("detect");

  function go(next: View) {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function runAsk(raw?: string) {
    const q = (raw ?? query).trim();
    if (!q) return;
    setQuery(q);
    setAnswer(null);
    setInspected([]);
    setInspecting(true);
    go("answer");
  }

  useEffect(() => {
    if (!inspecting) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setInspected(inspectionOrder.slice(0, i));
      if (i >= inspectionOrder.length) {
        window.clearInterval(id);
        const resolved = resolveQuery(query);
        setAnswer(resolved);
        setInspecting(false);
        setHistory((h) => [
          {
            id: `h-${Date.now()}`,
            query,
            at: "Just now",
            answerId: resolved.id,
          },
          ...h,
        ]);
      }
    }, 380);
    return () => window.clearInterval(id);
  }, [inspecting, query]);

  function toggleThen(a: AutomationAction) {
    setThenActs((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );
  }

  function loadSuggestedAutomation() {
    setWhen(suggestedAutomation.when);
    setIfCond(suggestedAutomation.ifCondition);
    setThenActs([...suggestedAutomation.then]);
    setAutoPreview(false);
    setAutoApproved(false);
    go("automation");
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-12 text-white">
      <DemoChrome slug="kasi-intelligence" />

      <header className="sticky top-12 z-40 border-b border-white/10 bg-[#1A1A1A]/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4">
          <button
            type="button"
            onClick={() => go("ask")}
            className="text-left text-sm font-semibold tracking-[0.14em]"
          >
            KASI INTELLIGENCE
          </button>
          <nav className="hidden items-center gap-5 text-[11px] tracking-[0.12em] uppercase text-white/50 sm:flex">
            {(
              [
                ["ask", "Ask"],
                ["automation", "Automate"],
                ["opportunity", "Opportunity"],
                ["history", "History"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                className={cn(
                  view === id || (id === "ask" && view === "answer")
                    ? "text-[#C7FF00]"
                    : "hover:text-white",
                )}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {view === "ask" && (
        <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 py-16">
          <DemoBadge />
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            ASK YOUR BUSINESS.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/55">
            Plain-language questions against inhabited demo data. Evidence
            first, no theatre.
          </p>
          <div className="mt-10 flex gap-2">
            <input
              className="flex-1 border border-white/15 bg-[#222] px-4 py-3.5 text-sm outline-none focus:border-[#C7FF00]/50"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") runAsk();
              }}
              placeholder="Why were sales down in June?"
            />
            <button
              type="button"
              onClick={() => runAsk()}
              className="bg-[#C7FF00] px-5 py-3.5 text-sm font-semibold text-black"
            >
              Ask
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {suggestedQueries.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => runAsk(s)}
                className="border border-white/15 px-3 py-2 text-left text-xs text-white/70 hover:border-[#C7FF00]/40 hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setOppPhase("detect");
              go("opportunity");
            }}
            className="mt-12 border-l-2 border-[#C7FF00] pl-4 text-left text-sm text-white/70 hover:text-white"
          >
            <span className="font-mono text-[10px] tracking-wider text-[#C7FF00]">
              SYSTEM DETECTED
            </span>
            <span className="mt-1 block">{opportunity.headline}</span>
          </button>
        </main>
      )}

      {view === "answer" && (
        <main className="mx-auto max-w-4xl px-4 py-10">
          <button
            type="button"
            onClick={() => go("ask")}
            className="text-sm text-white/50 hover:text-[#C7FF00]"
          >
            ← Ask another
          </button>
          <DemoBadge />
          <h1 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            {query}
          </h1>

          <div className="mt-8 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {inspectionOrder.map((src) => {
              const done = inspected.includes(src);
              return (
                <div
                  key={src}
                  className={cn(
                    "border px-3 py-3 text-center text-xs tracking-wide",
                    done
                      ? "border-[#C7FF00]/50 bg-[#C7FF00]/10 text-[#C7FF00]"
                      : "border-white/10 text-white/30",
                  )}
                >
                  {done ? "✓ " : inspecting ? "… " : ""}
                  {src}
                </div>
              );
            })}
          </div>

          {inspecting && (
            <p className="mt-6 font-mono text-xs tracking-wider text-white/40">
              Inspecting systems…
            </p>
          )}

          {answer && !inspecting && (
            <div className="mt-10 space-y-10">
              <div className="border border-white/10 bg-[#222] p-6">
                <p className="font-mono text-[10px] tracking-wider text-[#C7FF00]">
                  EXPLANATION
                </p>
                <p className="mt-3 text-lg leading-relaxed">{answer.summary}</p>
                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  {answer.explanation.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-[#C7FF00]">·</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {answer.charts.map((chart) => {
                  const max = Math.max(
                    ...chart.points.map((p) => Math.abs(p.value)),
                    1,
                  );
                  return (
                    <div
                      key={chart.title}
                      className="border border-white/10 bg-[#222] p-5"
                    >
                      <p className="text-sm font-medium">{chart.title}</p>
                      <p className="text-xs text-white/40">{chart.unit}</p>
                      <div className="mt-6 flex h-40 items-end gap-2">
                        {chart.points.map((p) => {
                          const h = (Math.abs(p.value) / max) * 100;
                          const neg = p.value < 0;
                          return (
                            <div
                              key={p.label}
                              className="flex flex-1 flex-col items-center gap-2"
                            >
                              <span className="text-[10px] text-white/50">
                                {p.value}
                              </span>
                              <div
                                className={cn(
                                  "w-full rounded-t",
                                  neg ? "bg-white/30" : "bg-[#C7FF00]",
                                )}
                                style={{ height: `${h}%` }}
                              />
                              <span className="text-[10px] text-white/40">
                                {p.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <p className="font-mono text-[10px] tracking-wider text-white/40">
                  CITED DEMO DATA
                </p>
                <ul className="mt-3 space-y-1 text-sm text-white/55">
                  {answer.citations.map((c) => (
                    <li key={c}>· {c}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </main>
      )}

      {view === "automation" && (
        <main className="mx-auto max-w-3xl px-4 py-10">
          <DemoBadge />
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Automation builder
          </h1>
          <p className="mt-2 text-sm text-white/50">
            WHEN · IF · THEN: nothing runs without preview and approval.
          </p>

          <div className="mt-8 space-y-6">
            <Block label="WHEN">
              <div className="flex flex-wrap gap-2">
                {whenOptions.map((o) => (
                  <Chip
                    key={o}
                    active={when === o}
                    onClick={() => setWhen(o)}
                  >
                    {o}
                  </Chip>
                ))}
              </div>
            </Block>
            <Block label="IF">
              <div className="flex flex-wrap gap-2">
                {ifOptions.map((o) => (
                  <Chip
                    key={o}
                    active={ifCond === o}
                    onClick={() => setIfCond(o)}
                  >
                    {o}
                  </Chip>
                ))}
              </div>
            </Block>
            <Block label="THEN">
              <div className="flex flex-wrap gap-2">
                {thenOptions.map((o) => (
                  <Chip
                    key={o}
                    active={thenActs.includes(o)}
                    onClick={() => toggleThen(o)}
                  >
                    {o}
                  </Chip>
                ))}
              </div>
            </Block>
          </div>

          {!autoPreview ? (
            <button
              type="button"
              disabled={thenActs.length === 0}
              onClick={() => {
                setAutoPreview(true);
                setAutoApproved(false);
              }}
              className="mt-8 bg-[#C7FF00] px-5 py-3 text-sm font-semibold text-black disabled:opacity-40"
            >
              Preview automation
            </button>
          ) : (
            <div className="mt-8 border border-[#C7FF00]/40 bg-[#222] p-5">
              <p className="font-mono text-[10px] tracking-wider text-amber-400">
                PREVIEW · NOT ACTIVE
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                When <strong>{when}</strong> and <strong>{ifCond}</strong>,
                then: {thenActs.join(", ")}.
              </p>
              {!autoApproved ? (
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAutoPreview(false)}
                    className="border border-white/20 px-4 py-2 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setAutoApproved(true)}
                    className="bg-[#C7FF00] px-4 py-2 text-xs font-semibold text-black"
                  >
                    Approve (demo)
                  </button>
                </div>
              ) : (
                <p className="mt-5 text-sm text-[#C7FF00]">
                  Approved: automation armed in demo mode. No live actions
                  fired.
                </p>
              )}
            </div>
          )}
        </main>
      )}

      {view === "opportunity" && (
        <main className="mx-auto max-w-3xl px-4 py-10">
          <DemoBadge />
          <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-[#C7FF00]">
            OPPORTUNITY DETECTED
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {opportunity.headline}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            {opportunity.detail}
          </p>
          <ul className="mt-6 space-y-1 text-sm text-white/45">
            {opportunity.evidence.map((e) => (
              <li key={e}>· {e}</li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-2">
            {(
              [
                ["detect", "1 Detect"],
                ["suggest", "2 Suggest"],
                ["preview", "3 Preview"],
                ["approved", "4 Approve"],
              ] as const
            ).map(([phase, label]) => (
              <span
                key={phase}
                className={cn(
                  "rounded-full px-3 py-1 text-[10px] tracking-wide uppercase",
                  oppPhase === phase
                    ? "bg-[#C7FF00] text-black"
                    : "bg-white/10 text-white/40",
                )}
              >
                {label}
              </span>
            ))}
          </div>

          {oppPhase === "detect" && (
            <button
              type="button"
              onClick={() => setOppPhase("suggest")}
              className="mt-8 bg-[#C7FF00] px-5 py-3 text-sm font-semibold text-black"
            >
              Suggest automation
            </button>
          )}

          {oppPhase === "suggest" && (
            <div className="mt-8 border border-white/10 bg-[#222] p-5">
              <p className="text-sm font-medium">Suggested rule</p>
              <p className="mt-3 text-sm text-white/70">
                WHEN <strong>{suggestedAutomation.when}</strong>
                <br />
                IF <strong>{suggestedAutomation.ifCondition}</strong>
                <br />
                THEN{" "}
                <strong>{suggestedAutomation.then.join(", ")}</strong>
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={loadSuggestedAutomation}
                  className="border border-white/20 px-4 py-2 text-xs"
                >
                  Open in builder
                </button>
                <button
                  type="button"
                  onClick={() => setOppPhase("preview")}
                  className="bg-[#C7FF00] px-4 py-2 text-xs font-semibold text-black"
                >
                  Preview
                </button>
              </div>
            </div>
          )}

          {oppPhase === "preview" && (
            <div className="mt-8 border border-amber-400/40 bg-[#222] p-5">
              <p className="font-mono text-[10px] tracking-wider text-amber-400">
                PREVIEW · AWAITING HUMAN APPROVAL
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                {suggestedAutomation.preview}
              </p>
              <button
                type="button"
                onClick={() => setOppPhase("approved")}
                className="mt-5 bg-[#C7FF00] px-4 py-2 text-xs font-semibold text-black"
              >
                Approve automation
              </button>
            </div>
          )}

          {oppPhase === "approved" && (
            <div className="mt-8 border border-[#C7FF00]/40 p-5">
              <p className="text-sm text-[#C7FF00]">
                Approved. Lead-response automation is armed in this demo: no
                external messages were sent.
              </p>
              <button
                type="button"
                onClick={() => go("ask")}
                className="mt-4 text-sm text-white/60 hover:text-white"
              >
                Back to Ask →
              </button>
            </div>
          )}
        </main>
      )}

      {view === "history" && (
        <main className="mx-auto max-w-3xl px-4 py-10">
          <DemoBadge />
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Query history
          </h1>
          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {history.map((h) => (
              <li key={h.id}>
                <button
                  type="button"
                  onClick={() => {
                    setQuery(h.query);
                    setAnswer(answers[h.answerId] ?? resolveQuery(h.query));
                    setInspected([...inspectionOrder]);
                    setInspecting(false);
                    go("answer");
                  }}
                  className="flex w-full flex-col gap-1 py-4 text-left hover:bg-white/[0.03]"
                >
                  <span className="text-sm">{h.query}</span>
                  <span className="font-mono text-[10px] text-white/35">
                    {h.at}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </main>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-white/10 bg-[#1A1A1A]/95 sm:hidden">
        {(
          [
            ["ask", "Ask"],
            ["automation", "Automate"],
            ["opportunity", "Opp"],
            ["history", "History"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => go(id === "ask" ? "ask" : id)}
            className={cn(
              "flex-1 py-3 text-[10px] tracking-wide uppercase",
              view === id || (id === "ask" && view === "answer")
                ? "text-[#C7FF00]"
                : "text-white/40",
            )}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="h-14 sm:hidden" />
    </div>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-white/10 bg-[#222] p-5">
      <p className="font-mono text-[10px] tracking-[0.18em] text-[#C7FF00]">
        {label}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Chip({
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
        "border px-3 py-2 text-left text-xs",
        active
          ? "border-[#C7FF00] bg-[#C7FF00]/15 text-[#C7FF00]"
          : "border-white/15 text-white/65 hover:border-white/30",
      )}
    >
      {children}
    </button>
  );
}
