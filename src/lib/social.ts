import {
  CONTACT_EMAIL,
  CONTACT_INSTAGRAM,
  CONTACT_LINKEDIN,
  emailHref as toMailto,
} from "@/lib/contact";

/** Social profile URLs. Leave empty to hide until live. */
export const social = {
  linkedin: CONTACT_LINKEDIN,
  instagram: CONTACT_INSTAGRAM,
  /** Override with NEXT_PUBLIC_CONTACT_EMAIL for a domain mailbox. */
  email: CONTACT_EMAIL,
} as const;

export function hasLinkedIn() {
  return social.linkedin.length > 0;
}

export function hasInstagram() {
  return social.instagram.length > 0;
}

export function hasEmail() {
  return social.email.length > 0;
}

export function emailHref() {
  return toMailto(social.email);
}
