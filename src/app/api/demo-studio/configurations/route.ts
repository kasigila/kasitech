import { NextResponse } from "next/server";
import { PRICE_BOOK_VERSION } from "@/commercial";
import { clientValidationMessages } from "@/demo-studio/commercial/bridge";
import { priceStudioConfiguration } from "@/demo-studio/commercial/bridge";
import type { CommercialConfigState, DemoIndustryId } from "@/demo-studio/types";
import {
  generateEditToken,
} from "@/demo-studio/persistence/types";
import {
  getConfigStore,
  PersistenceMisconfiguredError,
} from "@/demo-studio/persistence/store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const industry = body.industry as DemoIndustryId;
    if (!industry) {
      return NextResponse.json({ error: "Industry required" }, { status: 400 });
    }

    const state: CommercialConfigState = {
      industry,
      startMode: "scratch",
      packageCode: body.packageCode ?? null,
      bundleCode: body.bundleCode ?? null,
      featureCodes: body.selectedFeatures ?? [],
      carePlan: body.carePlan ?? null,
      kbPlan: body.kbPlan ?? null,
      seoSetup: body.seoSetup ?? null,
      seoRecurring: body.seoRecurring ?? null,
      socialPlan: body.socialPlan ?? null,
      delivery: body.deliveryOption ?? "STANDARD",
    };

    const pricing = priceStudioConfiguration(state);
    const msgs = clientValidationMessages(pricing);
    if (msgs.length) {
      return NextResponse.json({ error: msgs[0] }, { status: 400 });
    }

    const snapshot = body.commercialSnapshot ?? pricing.snapshot;
    if (snapshot.priceBookVersion !== PRICE_BOOK_VERSION) {
      // Allow saving old snapshots only when updating existing with same version
      if (!body.configurationId) {
        return NextResponse.json(
          { error: "New configurations must use current Price Book." },
          { status: 400 },
        );
      }
    }

    const store = await getConfigStore();
    const editToken =
      body.editToken && body.configurationId
        ? (body.editToken as string)
        : generateEditToken();

    const record = await store.save(
      {
        industry,
        fictionalBusinessKey: body.fictionalBusinessKey,
        packageCode: state.packageCode,
        bundleCode: state.bundleCode,
        selectedFeatures: state.featureCodes,
        carePlan: state.carePlan,
        kbPlan: state.kbPlan,
        seoSetup: state.seoSetup,
        seoRecurring: state.seoRecurring,
        socialPlan: state.socialPlan,
        deliveryOption: state.delivery,
        commercialSnapshot: snapshot,
        configurationId: body.configurationId,
        editToken: body.editToken,
      },
      editToken,
    );

    return NextResponse.json({
      configurationId: record.configurationId,
      editToken: body.configurationId && body.editToken ? body.editToken : editToken,
      priceBookVersion: record.priceBookVersion,
      sharePath: `/build/${record.configurationId}`,
    });
  } catch (e) {
    if (e instanceof PersistenceMisconfiguredError) {
      return NextResponse.json({ error: e.message }, { status: 503 });
    }
    const msg = e instanceof Error ? e.message : "Save failed";
    const status = msg === "EDIT_FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }
    const store = await getConfigStore();
    const record = await store.getById(id);
    if (!record) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    // Public read — never return editTokenHash
    const { editTokenHash: _, ...publicRecord } = record;
    return NextResponse.json(publicRecord);
  } catch (e) {
    if (e instanceof PersistenceMisconfiguredError) {
      return NextResponse.json({ error: e.message }, { status: 503 });
    }
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Load failed" },
      { status: 500 },
    );
  }
}
