import { CONTACT_EMAIL } from "@/lib/contact";
import {
  buildEnquiryMessage,
  isEnquiryPayload,
  type EnquiryPayload,
} from "@/lib/enquiry";

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!isEnquiryPayload(raw)) {
    return Response.json(
      { ok: false, error: "Invalid or missing fields" },
      { status: 400 },
    );
  }

  const body: EnquiryPayload = raw;
  const message = buildEnquiryMessage(body);
  const delivered: string[] = [];
  const errors: string[] = [];
  const enquiryTo = process.env.ENQUIRY_TO_EMAIL?.trim() || CONTACT_EMAIL;

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
      else errors.push(`formspree:${res.status}`);
    } catch {
      errors.push("formspree:network");
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
      else errors.push(`resend:${res.status}`);
    } catch {
      errors.push("resend:network");
    }
  }

  const emailed = delivered.length > 0;

  return Response.json({
    // ok means the request was accepted and processed — not that email sent
    ok: true,
    emailed,
    delivered,
    errors,
  });
}
