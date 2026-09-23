import { clearPortalSession, getPortalSession, UNIQUE_TRENDS_ID } from "@/lib/business-portal/session";
import { redirect } from "next/navigation";

export function shopOrigin() {
  return (process.env.UNIQUE_TRENDS_ORIGIN || "").replace(/\/$/, "");
}

export function assetUrl(url: string | null | undefined) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const origin = shopOrigin();
  return origin ? `${origin}${url.startsWith("/") ? url : `/${url}`}` : url;
}

export async function portalFetch(op: string, payload?: unknown) {
  const session = await getPortalSession();
  if (!session || session.businessId !== UNIQUE_TRENDS_ID) {
    return { status: 401, data: { error: "Please sign in again." } as { error?: string; [key: string]: unknown } };
  }
  const origin = shopOrigin();
  if (!origin) return { status: 503, data: { error: "The shop desk is not connected yet." } };
  let response: Response;
  try {
    response = await fetch(`${origin}/api/portal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ op, payload }),
      cache: "no-store",
    });
  } catch {
    return { status: 503, data: { error: "The shop desk could not be reached." } };
  }
  const data = (await response.json().catch(() => ({ error: "The shop desk could not be reached." }))) as {
    error?: string;
    [key: string]: unknown;
  };
  if (response.status === 401) await clearPortalSession();
  return { status: response.status, data };
}

export async function portalData<T>(op: string, payload?: unknown): Promise<T> {
  const result = await portalFetch(op, payload);
  if (result.status === 401) redirect("/business");
  if (result.data.error) throw new Error(result.data.error);
  return result.data as T;
}
