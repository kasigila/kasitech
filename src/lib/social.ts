/** Social profile URLs. Leave empty to hide until live. */
export const social = {
  linkedin: "https://www.linkedin.com/in/karen-marie-kasigila-443b73242",
  instagram: "https://www.instagram.com/kasitechinnovations",
  /** Business contact, e.g. hello@kasitechinnovations.com when ready */
  email: "karen_marie1@icloud.com",
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
  return social.email.startsWith("mailto:")
    ? social.email
    : `mailto:${social.email}`;
}
