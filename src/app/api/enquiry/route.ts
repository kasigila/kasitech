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
      // continue — WhatsApp is the guaranteed path
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  const enquiryTo =
    process.env.ENQUIRY_TO_EMAIL || "karen_marie1@icloud.com";
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
    delivered,
    // Client always opens WhatsApp; server delivery is best-effort bonus
  });
}
