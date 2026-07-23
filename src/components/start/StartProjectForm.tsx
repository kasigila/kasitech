"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { track } from "@/lib/analytics";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { emailHref, hasEmail } from "@/lib/social";
import { cn } from "@/lib/cn";

type Need =
  | "presence"
  | "sell"
  | "system"
  | "automation"
  | "unsure";

const needs: { id: Need; label: string }[] = [
  { id: "presence", label: "A BETTER DIGITAL PRESENCE" },
  { id: "sell", label: "SELLING OR BOOKING ONLINE" },
  { id: "system", label: "A CUSTOM SYSTEM" },
  { id: "automation", label: "AUTOMATION / AI" },
  { id: "unsure", label: "I'M NOT SURE" },
];

const goalsByNeed: Record<Need, string[]> = {
  presence: [
    "Look more credible online",
    "Explain what we do clearly",
    "Generate qualified enquiries",
    "Refresh an outdated website",
  ],
  sell: [
    "Take bookings directly",
    "Sell products online",
    "Reduce reliance on Instagram DMs",
    "Accept M-Pesa / card payments",
  ],
  system: [
    "Replace spreadsheets",
    "Build a customer / staff portal",
    "Track operations in one place",
    "Connect existing tools",
  ],
  automation: [
    "Speed up lead response",
    "Automate reporting",
    "Reduce repetitive admin",
    "Use data to decide faster",
  ],
  unsure: [
    "I need help figuring out the right approach",
    "I have a rough idea but not the details",
    "I want to see what is possible",
    "I'm exploring for a future project",
  ],
};

const STORAGE_KEY = "kasi-project-submissions";

export function StartProjectForm() {
  const [step, setStep] = useState(1);
  const [need, setNeed] = useState<Need | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [brief, setBrief] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [refId, setRefId] = useState("");

  const goalOptions = useMemo(
    () => (need ? goalsByNeed[need] : []),
    [need],
  );

  function toggleGoal(g: string) {
    setGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g].slice(0, 3),
    );
  }

  function nextFrom1() {
    if (!need) {
      setErrors({ need: "Choose what you need help with." });
      return;
    }
    setErrors({});
    track("form_start", { need });
    setStep(2);
  }

  function nextFrom2() {
    if (goals.length === 0) {
      setErrors({ goals: "Pick at least one outcome." });
      return;
    }
    setErrors({});
    setStep(3);
  }

  function nextFrom3() {
    const e: Record<string, string> = {};
    if (!company.trim()) e.company = "Tell us the business name.";
    if (!brief.trim() || brief.trim().length < 20)
      e.brief = "Give us a short brief: at least a couple of sentences.";
    setErrors(e);
    if (Object.keys(e).length) return;
    setStep(4);
  }

  function submit() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Enter your name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter an email we can reply to.";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 9)
      e.phone = "Enter a phone or WhatsApp number we can reach.";
    setErrors(e);
    if (Object.keys(e).length) return;

    const id = `KT-${Date.now().toString().slice(-6)}`;
    const payload = {
      id,
      need,
      goals,
      company,
      website,
      brief,
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
    };

    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      localStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...prev]));
    } catch {
      // ignore
    }

    track("form_complete", { need: need ?? "unknown", ref: id });
    setRefId(id);
    setDone(true);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-28 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
          {refId}
        </p>
        <h1 className="mt-6 font-display text-5xl tracking-[-0.04em] md:text-7xl">
          GOT IT.
        </h1>
        <p className="mt-6 max-w-md text-lg text-kasi-grey">
          Your brief is ready. Send it to KasiTech via WhatsApp so we can review
          it and follow up.
        </p>
        <div className="mt-10 space-y-4 text-sm">
          {hasWhatsApp() && (
            <a
              href={whatsappUrl(
                `Hi KasiTech: project ${refId} for ${company}.\n\nNeed: ${need}\nGoals: ${goals.join(", ")}\n\n${brief}\n\n:  ${name}\n${email}\n${phone}`,
              )}
              className="inline-block border border-kasi-green bg-kasi-green px-5 py-3 text-kasi-black"
              onClick={() =>
                track("whatsapp_click", { source: "start_success" })
              }
            >
              Send via WhatsApp →
            </a>
          )}
          {hasEmail() && (
            <div>
              <a
                href={`${emailHref()}?subject=${encodeURIComponent(
                  `Project enquiry ${refId}: ${company}`,
                )}&body=${encodeURIComponent(
                  `Hi KasiTech,\n\nReference: ${refId}\nCompany: ${company}\nNeed: ${need}\nGoals: ${goals.join(", ")}\n\n${brief}\n\n:  ${name}\n${email}\n${phone}`,
                )}`}
                className="inline-block text-kasi-green hover:underline"
              >
                Or send via email →
              </a>
            </div>
          )}
          <div>
            <Link href="/" className="text-kasi-grey hover:text-kasi-ivory">
              Back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-28 md:px-8">
      <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
        0{step} / 04
      </p>

      {step === 1 && (
        <>
          <h1 className="mt-6 font-display text-4xl tracking-[-0.04em] md:text-6xl">
            WHAT DO YOU
            <br />
            NEED HELP WITH?
          </h1>
          <div className="mt-10 space-y-3">
            {needs.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setNeed(n.id)}
                className={cn(
                  "block w-full border px-5 py-4 text-left text-sm tracking-wide transition",
                  need === n.id
                    ? "border-kasi-green bg-kasi-green/10"
                    : "border-kasi-border hover:border-kasi-grey",
                )}
              >
                {n.label}
              </button>
            ))}
          </div>
          {errors.need && (
            <p className="mt-4 text-sm text-red-400">{errors.need}</p>
          )}
          <button
            type="button"
            onClick={nextFrom1}
            className="mt-10 border border-kasi-green bg-kasi-green px-6 py-3 text-sm text-kasi-black"
          >
            Continue →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="mt-6 font-display text-4xl tracking-[-0.04em] md:text-6xl">
            WHAT ARE YOU
            <br />
            TRYING TO ACHIEVE?
          </h1>
          <p className="mt-4 text-sm text-kasi-grey">Select up to three.</p>
          <div className="mt-10 space-y-3">
            {goalOptions.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => toggleGoal(g)}
                className={cn(
                  "block w-full border px-5 py-4 text-left text-sm transition",
                  goals.includes(g)
                    ? "border-kasi-green bg-kasi-green/10"
                    : "border-kasi-border hover:border-kasi-grey",
                )}
              >
                {g}
              </button>
            ))}
          </div>
          {errors.goals && (
            <p className="mt-4 text-sm text-red-400">{errors.goals}</p>
          )}
          <div className="mt-10 flex gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm text-kasi-grey"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={nextFrom2}
              className="border border-kasi-green bg-kasi-green px-6 py-3 text-sm text-kasi-black"
            >
              Continue →
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h1 className="mt-6 font-display text-4xl tracking-[-0.04em] md:text-6xl">
            TELL US ABOUT
            <br />
            YOUR BUSINESS.
          </h1>
          <div className="mt-10 space-y-6">
            <label className="block">
              <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
                COMPANY
              </span>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-2 w-full border border-kasi-border bg-transparent px-4 py-3 text-sm outline-none focus:border-kasi-green"
                placeholder="e.g. Bahari Suites"
              />
              {errors.company && (
                <p className="mt-2 text-sm text-red-400">{errors.company}</p>
              )}
            </label>
            <label className="block">
              <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
                WEBSITE (OPTIONAL)
              </span>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="mt-2 w-full border border-kasi-border bg-transparent px-4 py-3 text-sm outline-none focus:border-kasi-green"
                placeholder="https://"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
                BRIEF
              </span>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                rows={5}
                className="mt-2 w-full border border-kasi-border bg-transparent px-4 py-3 text-sm outline-none focus:border-kasi-green"
                placeholder="What do you run, who is it for, and what should digital help you do?"
              />
              {errors.brief && (
                <p className="mt-2 text-sm text-red-400">{errors.brief}</p>
              )}
            </label>
          </div>
          <div className="mt-10 flex gap-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-sm text-kasi-grey"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={nextFrom3}
              className="border border-kasi-green bg-kasi-green px-6 py-3 text-sm text-kasi-black"
            >
              Continue →
            </button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h1 className="mt-6 font-display text-4xl tracking-[-0.04em] md:text-6xl">
            WHERE SHOULD
            <br />
            WE REACH YOU?
          </h1>
          <div className="mt-10 space-y-6">
            <label className="block">
              <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
                NAME
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full border border-kasi-border bg-transparent px-4 py-3 text-sm outline-none focus:border-kasi-green"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-400">{errors.name}</p>
              )}
            </label>
            <label className="block">
              <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
                EMAIL
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border border-kasi-border bg-transparent px-4 py-3 text-sm outline-none focus:border-kasi-green"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email}</p>
              )}
            </label>
            <label className="block">
              <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
                PHONE / WHATSAPP
              </span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full border border-kasi-border bg-transparent px-4 py-3 text-sm outline-none focus:border-kasi-green"
                placeholder="+255…"
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-400">{errors.phone}</p>
              )}
            </label>
          </div>
          <div className="mt-10 flex gap-4">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="text-sm text-kasi-grey"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={submit}
              className="border border-kasi-green bg-kasi-green px-6 py-3 text-sm text-kasi-black"
            >
              SEND PROJECT →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
