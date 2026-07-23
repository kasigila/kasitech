import { social } from "@/lib/social";
import { buildEnquiryMessage, type EnquiryPayload } from "@/lib/enquiry";

/** FormSubmit must be called from the browser; server-side posts often never arrive. */
export async function sendEnquiryViaFormSubmit(
  body: EnquiryPayload,
): Promise<{ ok: boolean; detail?: string }> {
  const enquiryTo =
    process.env.NEXT_PUBLIC_ENQUIRY_TO_EMAIL?.trim() || social.email;

  if (!enquiryTo) {
    return { ok: false, detail: "No enquiry email configured" };
  }

  const message = buildEnquiryMessage(body);

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
          website: body.website || "-",
          brief: body.brief,
          reference: body.id,
          message,
          _subject: `KasiTech enquiry ${body.id}: ${body.company}`,
          _template: "table",
          _captcha: "false",
          _replyto: body.email,
          _url: "https://www.kasitechinnovations.com/start",
        }),
      },
    );

    const data = (await res.json().catch(() => null)) as {
      success?: string | boolean;
      message?: string;
    } | null;

    const success =
      res.ok &&
      (data?.success === true ||
        data?.success === "true" ||
        data?.success === undefined);

    return {
      ok: success,
      detail: data?.message,
    };
  } catch (err) {
    return {
      ok: false,
      detail: err instanceof Error ? err.message : "Network error",
    };
  }
}
