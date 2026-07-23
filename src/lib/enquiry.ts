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
