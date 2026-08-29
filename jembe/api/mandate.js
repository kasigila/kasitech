/**
 * Same-origin mandate desk. Runs on the independent Jembe Vercel project.
 * Client submissions stay on this origin; they are not forwarded to a third-party studio site.
 *
 * Delivery order:
 * 1. JEMBE_FORM_ENDPOINT (+ optional JEMBE_FORM_ACCESS_KEY) — Formspree, Web3Forms, or your API
 * 2. Formsubmit.co to JEMBE_MANDATE_EMAIL (default info@jembegroup.com)
 *
 * Put provider keys in Vercel project env vars — never in frontend git.
 */
export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  if (payload.company_website) {
    res.status(200).json({ ok: true });
    return;
  }

  const counterpart = String(payload.counterpart || "").trim();
  const sector = String(payload.sector || "").trim();
  const name = String(payload.name || "").trim();
  const organisation = String(payload.organisation || "").trim();
  const contact = String(payload.contact || "").trim();
  const notes = String(payload.notes || "").trim();

  if (!name || !organisation || !contact) {
    res.status(400).json({ ok: false, error: "Name, organisation, and contact are required." });
    return;
  }

  const endpoint = (process.env.JEMBE_FORM_ENDPOINT || "").trim();
  const accessKey = (process.env.JEMBE_FORM_ACCESS_KEY || "").trim();
  const email = (process.env.JEMBE_MANDATE_EMAIL || "info@jembegroup.com").trim();
  const origin = (process.env.JEMBE_SITE_ORIGIN || "https://jembegroupllc.com").replace(/\/$/, "");

  const fields = {
    counterpart,
    sector,
    name,
    organisation,
    contact,
    notes,
    _subject: `Jembe Group mandate: ${sector} — ${organisation}`,
  };

  let url = endpoint;
  const body = { ...fields };
  if (accessKey) body.access_key = accessKey;

  if (!url) {
    url = `https://formsubmit.co/ajax/${encodeURIComponent(email)}`;
    body._template = "table";
    body._captcha = "false";
    body._url = origin;
    if (contact.includes("@")) body._replyto = contact;
  }

  try {
    const upstream = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await upstream.json().catch(() => null);
    if (!upstream.ok) {
      res.status(502).json({
        ok: false,
        error: "Form service rejected the submission.",
        detail: data,
      });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(502).json({
      ok: false,
      error: err instanceof Error ? err.message : "Network error",
    });
  }
}
