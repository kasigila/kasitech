import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const PORTAL_COOKIE = "kt_business";
export const UNIQUE_TRENDS_ID = "unique-trends";

export type PortalSession = {
  email: string;
  name: string;
  businessId: string;
  token: string;
  exp: number;
};

function secret() {
  const value = process.env.BUSINESS_SESSION_SECRET || "";
  if (value.length < 32) return "";
  return value;
}

export function sealPortalSession(session: PortalSession) {
  const key = secret();
  if (!key) throw new Error("Business sign-in is not configured.");
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = createHmac("sha256", key).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function readPortalToken(value: string | undefined | null): PortalSession | null {
  const key = secret();
  if (!key || !value) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;
  const expected = createHmac("sha256", key).update(payload).digest("base64url");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as PortalSession;
    if (session.exp < Date.now()) return null;
    if (session.businessId !== UNIQUE_TRENDS_ID) return null;
    if (!session.token || !session.email) return null;
    return session;
  } catch {
    return null;
  }
}

export async function getPortalSession() {
  const jar = await cookies();
  return readPortalToken(jar.get(PORTAL_COOKIE)?.value);
}

export async function setPortalSession(session: PortalSession) {
  const jar = await cookies();
  jar.set(PORTAL_COOKIE, sealPortalSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/business",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearPortalSession() {
  const jar = await cookies();
  jar.set(PORTAL_COOKIE, "", { httpOnly: true, path: "/business", maxAge: 0 });
}

export function uniqueTrendsUsernames() {
  return (process.env.UNIQUE_TRENDS_USERNAMES || "shop@uniquetrendstz.com")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}
