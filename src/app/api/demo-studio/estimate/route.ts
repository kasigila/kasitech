import { NextResponse } from "next/server";
import { buildProjectEstimatePdf } from "@/demo-studio/estimate/pdf";
import type { CommercialSnapshot, DeliveryLevel } from "@/commercial";
import type { DemoIndustryId } from "@/demo-studio/types";
import { clientValidationMessages, priceStudioConfiguration } from "@/demo-studio/commercial/bridge";
import type { CommercialConfigState } from "@/demo-studio/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const snapshot = body.snapshot as CommercialSnapshot;
    if (!snapshot?.charges || !snapshot?.totals) {
      return NextResponse.json({ error: "Snapshot required" }, { status: 400 });
    }

    // Validate live config if provided; estimates must use immutable snapshot for amounts
    if (body.validateLive) {
      const state: CommercialConfigState = {
        industry: body.industry,
        startMode: "scratch",
        packageCode: body.packageCode ?? null,
        bundleCode: body.bundleCode ?? null,
        featureCodes: body.selectedFeatures ?? [],
        carePlan: body.carePlan ?? null,
        kbPlan: body.kbPlan ?? null,
        seoSetup: body.seoSetup ?? null,
        seoRecurring: body.seoRecurring ?? null,
        socialPlan: body.socialPlan ?? null,
        delivery: (body.delivery as DeliveryLevel) ?? "STANDARD",
      };
      const pricing = priceStudioConfiguration(state);
      const msgs = clientValidationMessages(pricing);
      if (msgs.length) {
        return NextResponse.json({ error: msgs[0] }, { status: 400 });
      }
    }

    const pdf = await buildProjectEstimatePdf({
      configurationId: body.configurationId ?? "KT-CONFIG-DRAFT",
      industry: body.industry as DemoIndustryId,
      packageCode: body.packageCode ?? null,
      bundleCode: body.bundleCode ?? null,
      delivery: (body.delivery as DeliveryLevel) ?? "STANDARD",
      snapshot,
    });

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="KasiTech_Project_Estimate_${body.configurationId ?? "draft"}.pdf"`,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Estimate failed" },
      { status: 500 },
    );
  }
}
