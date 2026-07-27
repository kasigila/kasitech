import { isValidPhone } from "@/lib/contact";

/** Shared enquiry payload + outbound message builders. */

export type EnquiryPayload = {
  id: string;
  need: string | null;
  goals: string[];
  company: string;
  website: string;
  brief: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  timeline: string;
  createdAt: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEnquiryPayload(value: unknown): value is EnquiryPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (typeof v.id !== "string" || v.id.length < 3 || v.id.length > 40)
    return false;
  if (typeof v.name !== "string" || v.name.trim().length < 1 || v.name.length > 120)
    return false;
  if (typeof v.email !== "string" || !EMAIL_RE.test(v.email) || v.email.length > 200)
    return false;
  if (typeof v.phone !== "string" || !isValidPhone(v.phone)) return false;
  if (typeof v.company !== "string" || v.company.trim().length < 1 || v.company.length > 200)
    return false;
  if (typeof v.brief !== "string" || v.brief.length > 5000) return false;
  if (!Array.isArray(v.goals)) return false;
  return true;
}

export function buildEnquiryMessage(p: EnquiryPayload) {
  return [
    `Hi KasiTech: new project enquiry ${p.id}`,
    ``,
    `Company: ${p.company}`,
    `Need: ${p.need ?? "-"}`,
    `Goals: ${p.goals.join(", ") || "-"}`,
    `Budget: ${p.budget || "-"}`,
    `Timeline: ${p.timeline || "-"}`,
    p.website ? `Website: ${p.website}` : null,
    ``,
    p.brief,
    ``,
    `Contact: ${p.name}`,
    `Email: ${p.email}`,
    `Phone/WhatsApp: ${p.phone}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
