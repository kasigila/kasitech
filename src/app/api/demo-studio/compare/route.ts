import { NextResponse } from "next/server";
import { getConfigStore } from "@/demo-studio/persistence/store";
import type { CommercialSnapshot } from "@/commercial";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ids = (body.ids as string[] | undefined)?.filter(Boolean) ?? [];
    if (!ids.length || ids.length > 3) {
      return NextResponse.json(
        { error: "Provide 1–3 configuration IDs." },
        { status: 400 },
      );
    }
    const store = await getConfigStore();
    const records = await store.listByIds(ids);
    const rows = records.map((r) => {
      const snap = r.commercialSnapshot as CommercialSnapshot;
      return {
        configurationId: r.configurationId,
        packageCode: r.packageCode,
        bundleCode: r.bundleCode,
        kbPlan: r.kbPlan,
        carePlan: r.carePlan,
        features: r.selectedFeatures,
        oneTime: snap.totals.oneTimeTsh,
        monthly: snap.totals.monthlyTsh,
        annual: snap.totals.annualTsh,
        firstYear: snap.totals.estimatedFirst12MonthsTsh,
        priceBookVersion: r.priceBookVersion,
      };
    });
    return NextResponse.json({ rows });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Compare failed" },
      { status: 500 },
    );
  }
}
