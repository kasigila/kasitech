import { social } from "@/lib/social";
import { buildEnquiryMessage, type EnquiryPayload } from "@/lib/enquiry";

export async function POST(request: Request) {
  let body: EnquiryPayload;
  try {
    body = (await request.json()) as EnquiryPayload;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body?.id || !body?.email || !body?.name || !body?.phone) {
    return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const message = buildEnquiryMessage(body);
  const delivered: string[] = [];
  const enquiryTo =
    process.env.ENQUIRY_TO_EMAIL?.trim() || social.email;

  // Always email Karen (FormSubmit → iCloud until business inbox exists).
  // First-ever submit sends an activation link to this inbox — confirm once.
  if (enquiryTo) {
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(enquiryTo)}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: body.name,
            email: body.email,
            phone: body.phone,
            company: body.company,
            need: body.need ?? "",
            goals: body.goals.join(", "),
            budget: body.budget,
            timeline: body.timeline,
            website: body.website || "—",
            brief: body.brief,
            reference: body.id,
            message,
            _subject: `KasiTech enquiry ${body.id}: ${body.company}`,
            _template: "table",
            _captcha: "false",
            _replyto: body.email,
          }),
        },
      );
      if (res.ok) delivered.push("email");
    } catch {
      // WhatsApp redirect still proceeds on the client
    }
  }

  const formspreeId = process.env.FORMSPREE_FORM_ID;
  if (formspreeId) {
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...body,
          _subject: `KasiTech enquiry ${body.id}: ${body.company}`,
          message,
        }),
      });
      if (res.ok) delivered.push("formspree");
    } catch {
      // continue
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.ENQUIRY_FROM_EMAIL ||
            "KasiTech Enquiries <onboarding@resend.dev>",
          to: [enquiryTo],
          reply_to: body.email,
          subject: `KasiTech enquiry ${body.id}: ${body.company}`,
          text: message,
        }),
      });
      if (res.ok) delivered.push("resend");
    } catch {
      // continue
    }
  }

  return Response.json({
    ok: true,
    emailed: delivered.includes("email") || delivered.includes("resend") || delivered.includes("formspree"),
    delivered,
  });
}
