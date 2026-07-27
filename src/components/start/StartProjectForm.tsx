"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { track } from "@/lib/analytics";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { emailHref, hasEmail, social } from "@/lib/social";
import {
  CONTACT_PRIMARY_NOTE,
  WHATSAPP_DISPLAY,
  isValidPhone,
} from "@/lib/contact";
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
  { id: "presence", label: "A WEBSITE" },
  { id: "sell", label: "COMMERCE / BOOKING" },
  { id: "system", label: "PLATFORM / SOFTWARE" },
  { id: "automation", label: "AI / AUTOMATION" },
  { id: "unsure", label: "NOT SURE YET" },
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

const fieldClass =
  "mt-2 w-full border border-kasi-border bg-transparent px-4 py-3 text-sm focus-visible:border-kasi-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kasi-green/60";

function needFromParam(raw: string | null): Need | null {
  if (raw && needIds.includes(raw as Need)) return raw as Need;
  return null;
}

export function StartProjectForm() {
  const searchParams = useSearchParams();
  const paramNeed = needFromParam(searchParams.get("need"));
  const [step, setStep] = useState(1);
  const [need, setNeed] = useState<Need | null>(paramNeed);
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
  const [emailed, setEmailed] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState("");

  // Prefer URL need when user lands with ?need= and hasn't chosen yet
  const effectiveNeed = need ?? paramNeed;

  const goalOptions = useMemo(
    () => (effectiveNeed ? goalsByNeed[effectiveNeed] : []),
    [effectiveNeed],
  );

  function toggleGoal(g: string) {
    setGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g].slice(0, 3),
    );
  }

  function nextFrom1() {
    const selected = need ?? paramNeed;
    if (!selected) {
      setErrors({ need: "Choose what you need help with." });
      return;
    }
    setNeed(selected);
    setErrors({});
    track("form_start", { need: selected });
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
    if (!phone.trim() || !isValidPhone(phone))
      e.phone =
        "Enter a phone or WhatsApp number with country code (8–15 digits).";
    setErrors(e);
    if (Object.keys(e).length) return;

    setSending(true);
    const id = `KT-${Date.now().toString().slice(-6)}`;
    const payload: EnquiryPayload = {
      id,
      need: need ?? paramNeed,
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

    let formSubmitOk = false;
    try {
      const fs = await sendEnquiryViaFormSubmit(payload);
      formSubmitOk = fs.ok;
    } catch {
      formSubmitOk = false;
    }

    let apiEmailed = false;
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = (await res.json()) as { emailed?: boolean };
        apiEmailed = Boolean(data.emailed);
      }
    } catch {
      // ignore
    }

    const didEmail = formSubmitOk || apiEmailed;
    const message = buildEnquiryMessage(payload);
    const wa = hasWhatsApp() ? whatsappUrl(message) : "";
    const mail = hasEmail()
      ? `${emailHref()}?subject=${encodeURIComponent(
          `Project enquiry ${id}: ${company}`,
        )}&body=${encodeURIComponent(message)}`
      : "";

    track("form_complete", {
      need: need ?? paramNeed ?? "unknown",
      ref: id,
      emailed: didEmail,
    });
    if (!didEmail) {
      track("form_delivery_failed", { ref: id });
    }

    setRefId(id);
    setWaHref(wa);
    setMailHref(mail);
    setEmailed(didEmail);
    setDeliveryNote(
      didEmail
        ? "A copy was emailed to KasiTech."
        : "We could not confirm email delivery — please send via WhatsApp or email so nothing is lost.",
    );
    setDone(true);
    setSending(false);
    // No auto-redirect — user chooses WhatsApp or email
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-28 md:px-8">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
          {refId}
        </p>
        <h1 className="mt-6 font-display text-5xl tracking-[-0.04em] md:text-7xl">
          {emailed ? "BRIEF RECEIVED." : "BRIEF SAVED."}
        </h1>
        <p className="mt-6 max-w-lg text-lg text-kasi-grey">
          {deliveryNote} Expect a reply within 24 hours on business days.{" "}
          {CONTACT_PRIMARY_NOTE}
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
            Project WhatsApp{" "}
            <span className="text-kasi-ivory">{WHATSAPP_DISPLAY}</span>
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

      <div className="mt-6 flex gap-1.5" aria-hidden>
        {[1, 2, 3, 4].map((s) => (
          <span
            key={s}
            className={cn(
              "h-0.5 flex-1 transition",
              s <= step ? "bg-kasi-green" : "bg-kasi-border",
            )}
          />
        ))}
      </div>

      {step === 1 && (
        <>
          <h1 className="mt-8 font-display text-4xl tracking-[-0.04em] md:text-6xl">
            WHAT ARE WE
            <br />
            BUILDING?
          </h1>
          <p className="mt-4 text-sm text-kasi-grey">
            A short brief. Conversational, not paperwork. Limited new projects.
          </p>
          <div className="mt-10 space-y-3">
            {needs.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setNeed(n.id)}
                className={cn(
                  "block w-full border px-5 py-4 text-left text-sm tracking-wide transition",
                  effectiveNeed === n.id
                    ? "border-kasi-green bg-kasi-green/10"
                    : "border-kasi-border hover:border-kasi-grey",
                )}
              >
                {n.label}
              </button>
            ))}
          </div>
          {errors.need && (
            <p id="need-error" className="mt-4 text-sm text-red-400" role="alert">
              {errors.need}
            </p>
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
            <p id="goals-error" className="mt-4 text-sm text-red-400" role="alert">
              {errors.goals}
            </p>
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
          <p className="mt-4 text-sm text-kasi-grey">
            Budget can be “exploring” — we scope honestly after a short discovery.
          </p>
          <div className="mt-10 space-y-6">
            <label className="block">
              <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
                COMPANY
              </span>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={fieldClass}
                placeholder="e.g. Bahari Suites"
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? "company-error" : undefined}
              />
              {errors.company && (
                <p id="company-error" className="mt-2 text-sm text-red-400" role="alert">
                  {errors.company}
                </p>
              )}
            </label>
            <label className="block">
              <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
                WEBSITE (OPTIONAL)
              </span>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className={fieldClass}
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
                className={fieldClass}
                placeholder="What do you run, who is it for, and what should digital help you do?"
                aria-invalid={Boolean(errors.brief)}
                aria-describedby={errors.brief ? "brief-error" : undefined}
              />
              {errors.brief && (
                <p id="brief-error" className="mt-2 text-sm text-red-400" role="alert">
                  {errors.brief}
                </p>
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
                <p id="budget-error" className="mt-2 text-sm text-red-400" role="alert">
                  {errors.budget}
                </p>
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
                <p id="timeline-error" className="mt-2 text-sm text-red-400" role="alert">
                  {errors.timeline}
                </p>
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
            We reply within 24 hours on business days. After you submit, you can
            send the brief on WhatsApp or email — your choice.
          </p>
          <div className="mt-10 space-y-6">
            <label className="block">
              <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
                NAME
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClass}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm text-red-400" role="alert">
                  {errors.name}
                </p>
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
                className={fieldClass}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-400" role="alert">
                  {errors.email}
                </p>
              )}
            </label>
            <label className="block">
              <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-grey">
                PHONE / WHATSAPP
              </span>
              <input
                value={phone}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/[^\d+\s()-]/g, "").slice(0, 22);
                  setPhone(cleaned);
                }}
                inputMode="tel"
                autoComplete="tel"
                className={fieldClass}
                placeholder="+255 … or +1 …"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
              />
              <p id="phone-hint" className="mt-2 text-xs text-kasi-grey">
                Include country code. Example: +255 626 000 000
              </p>
              {errors.phone && (
                <p id="phone-error" className="mt-2 text-sm text-red-400" role="alert">
                  {errors.phone}
                </p>
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
              {sending ? "SENDING…" : "SUBMIT BRIEF →"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
