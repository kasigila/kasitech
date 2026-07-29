import { NextResponse } from "next/server";
import { persistSubmissionIntent } from "@/demo-studio/persistence/submissions";
import { getConfigStore } from "@/demo-studio/persistence/store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { configurationId, name, businessName, email, phone, message } = body;
    if (!configurationId || !name || !businessName || !email || !phone) {
      return NextResponse.json(
        { error: "Name, business, email, phone, and configuration are required." },
        { status: 400 },
      );
    }

    const store = await getConfigStore();
    const config = await store.getById(configurationId);
    if (!config) {
      return NextResponse.json(
        { error: "Save your build before submitting." },
        { status: 400 },
      );
    }

    const row = await persistSubmissionIntent({
      configurationId,
      name,
      businessName,
      email,
      phone,
      message,
    });

    return NextResponse.json({
      ok: true,
      submissionId: row.id,
      leadStatus: row.leadStatus,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Submit failed" },
      { status: 500 },
    );
  }
}
