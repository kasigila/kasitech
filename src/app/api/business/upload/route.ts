import { NextResponse } from "next/server";
import { shopOrigin } from "@/lib/business-portal/client";
import { getPortalSession, UNIQUE_TRENDS_ID } from "@/lib/business-portal/session";

export async function POST(request: Request) {
  const session = await getPortalSession();
  if (!session || session.businessId !== UNIQUE_TRENDS_ID) {
    return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  }
  const origin = shopOrigin();
  if (!origin) return NextResponse.json({ error: "The shop desk is not connected yet." }, { status: 503 });
  const incoming = await request.formData();
  const file = incoming.get("file");
  const folder = String(incoming.get("folder") || "products");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose a photo to upload." }, { status: 400 });
  const body = new FormData();
  body.set("file", file);
  body.set("folder", folder);
  const response = await fetch(`${origin}/api/admin/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${session.token}` },
    body,
  });
  const data = (await response.json().catch(() => ({ error: "The photo could not be saved." }))) as { url?: string; error?: string };
  return NextResponse.json(data, { status: response.status });
}
