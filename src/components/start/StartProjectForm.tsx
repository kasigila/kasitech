"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { track } from "@/lib/analytics";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { emailHref, hasEmail, social } from "@/lib/social";
import { cn } from "@/lib/cn";
import {
  buildEnquiryMessage,
  type EnquiryPayload,
} from "@/lib/enquiry";
import { sendEnquiryViaFormSubmit } from "@/lib/formsubmit";

type Need =
  | "presence"
  | "sell"
  | "system"
  | "automation"
  | "unsure";

const needIds: Need[] = [
  "presence",
  "sell",
  "system",
  "automation",
  "unsure",
];

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

const budgets = [
  "Exploring / not sure yet",
  "Under $2,000",
  "$2,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
];

const timelines = [
  "As soon as possible",
  "Within 1 month",
  "1-3 months",
  "Flexible / planning ahead",
];

const STORAGE_KEY = "kasi-project-submissions";

export function StartProjectForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [need, setNeed] = useState<Need | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [brief, setBrief] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [refId, setRefId] = useState("");
  const [waHref, setWaHref] = useState("");
  const [mailHref, setMailHref] = useState("");

  useEffect(() => {
    const raw = searchParams.get("need");
    if (raw && needIds.includes(raw as Need)) {
      setNeed(raw as Need);
    }
  }, [searchParams]);

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
    if (!budget) e.budget = "Pick a budget range so we can scope honestly.";
    if (!timeline) e.timeline = "When do you want to move?";
    setErrors(e);
    if (Object.keys(e).length) return;
    setStep(4);
  }

  async function submit() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Enter your name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter an email we can reply to.";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 9)
      e.phone = "Enter a phone or WhatsApp number we can reach.";
    setErrors(e);
    if (Object.keys(e).length) return;

    setSending(true);
    const id = `KT-${Date.now().toString().slice(-6)}`;
    const payload: EnquiryPayload = {
      id,
      need,
      goals,
      company: company.trim(),
      website: website.trim(),
      brief: brief.trim(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      budget,
      timeline,
      createdAt: new Date().toISOString(),
    };

    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      localStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...prev]));
    } catch {
      // ignore
    }

    // Email Karen from the browser (FormSubmit). Server-side posts often fail.
    try {
      await sendEnquiryViaFormSubmit(payload);
    } catch {
      // WhatsApp is still the customer-facing next step
    }

    // Optional Formspree / Resend if env keys are set on the host
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // ignore
    }

    const message = buildEnquiryMessage(payload);
    const wa = hasWhatsApp()
      ? whatsappUrl(message)
      : "";
    const mail = hasEmail()
      ? `${emailHref()}?subject=${encodeURIComponent(
          `Project enquiry ${id}: ${company}`,
        )}&body=${encodeURIComponent(message)}`
      : "";

    track("form_complete", { need: need ?? "unknown", ref: id });
    setRefId(id);
    setWaHref(wa);
    setMailHref(mail);
    setDone(true);
    setSending(false);

    // Customer still lands in WhatsApp with the full brief
    if (wa) {
      window.location.href = wa;
    } else if (mail) {
      window.location.href = mail;
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-28 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
          {refId}
        </p>
        <h1 className="mt-6 font-display text-5xl tracking-[-0.04em] md:text-7xl">
          OPENING WHATSAPP…
        </h1>
        <p className="mt-6 max-w-lg text-lg text-kasi-grey">
          Your brief is ready to send on WhatsApp, and a copy was emailed to
          KasiTech. First time only: check iCloud (and Spam) for a FormSubmit
          activation link and tap Confirm, or later briefs won&apos;t arrive.
          If WhatsApp didn&apos;t open, tap below. We reply within 24 hours on
          business days.
        </p>
        <div className="mt-10 space-y-4 text-sm">
          {waHref && (
            <a
              href={waHref}
              className="inline-block border border-kasi-green bg-kasi-green px-5 py-3 text-kasi-black"
              onClick={() =>
                track("whatsapp_click", { source: "start_success" })
              }
            >
              Send on WhatsApp →
            </a>
          )}
          {mailHref && (
            <div>
              <a
                href={mailHref}
                className="inline-block text-kasi-green hover:underline"
              >
                Or send via email →
              </a>
            </div>
          )}
          <p className="pt-4 text-kasi-grey">
            Prefer to message first? WhatsApp{" "}
            <span className="text-kasi-ivory">+1 269 861 3487</span>
            {hasEmail() && (
              <>
                {" "}
                or email{" "}
                <a href={emailHref()} className="text-kasi-green hover:underline">
                  {social.email}
                </a>
              </>
            )}
            .
          </p>
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
        0{step} / 04 · REPLY WITHIN 24H
      </p>

      {step === 1 && (
        <>
          <h1 className="mt-6 font-display text-4xl tracking-[-0.04em] md:text-6xl">
            WHAT DO YOU
            <br />
            NEED HELP WITH?
          </h1>
          <p className="mt-4 text-sm text-kasi-grey">
            Taking a limited number of new projects. This brief goes straight to
            WhatsApp so nothing gets lost.
          </p>
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
            <fieldset>
              <legend className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
                BUDGET RANGE
              </legend>
              <div className="mt-3 space-y-2">
                {budgets.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={cn(
                      "block w-full border px-4 py-3 text-left text-sm transition",
                      budget === b
                        ? "border-kasi-green bg-kasi-green/10"
                        : "border-kasi-border hover:border-kasi-grey",
                    )}
                  >
                    {b}
                  </button>
                ))}
              </div>
              {errors.budget && (
                <p className="mt-2 text-sm text-red-400">{errors.budget}</p>
              )}
            </fieldset>
            <fieldset>
              <legend className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
                TIMELINE
              </legend>
              <div className="mt-3 space-y-2">
                {timelines.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeline(t)}
                    className={cn(
                      "block w-full border px-4 py-3 text-left text-sm transition",
                      timeline === t
                        ? "border-kasi-green bg-kasi-green/10"
                        : "border-kasi-border hover:border-kasi-grey",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {errors.timeline && (
                <p className="mt-2 text-sm text-red-400">{errors.timeline}</p>
              )}
            </fieldset>
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
          <p className="mt-4 text-sm text-kasi-grey">
            Next step opens WhatsApp with your brief so we can reply fast.
          </p>
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
                placeholder="+255… or your WhatsApp number"
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
              disabled={sending}
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={sending}
              className="border border-kasi-green bg-kasi-green px-6 py-3 text-sm text-kasi-black disabled:opacity-60"
            >
              {sending ? "PREPARING…" : "CONTINUE ON WHATSAPP →"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
