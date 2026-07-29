"use client";

import { KB_MODULES, kbModuleState, planLabel } from "@/demo-studio";

type Props = {
  kbPlan: string | null;
  businessName: string;
};

export function KbPreview({ kbPlan, businessName }: Props) {
  if (!kbPlan) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#0c0c0c] px-6 text-center text-kasi-grey">
        <p className="font-display text-xl text-kasi-ivory">KasiTech Business</p>
        <p className="mt-3 max-w-sm text-sm">
          Select a KasiTech Business plan in the Build panel to preview the owner
          dashboard. Only approved modules are shown — nothing invented for
          Pro / Scale / Enterprise beyond Growth capabilities.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-[#0e0e0e] text-kasi-ivory">
      <aside className="w-44 shrink-0 border-r border-kasi-border/80 p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-kasi-green">
          {planLabel(kbPlan)}
        </p>
        <p className="mt-1 truncate text-xs text-kasi-grey">{businessName}</p>
        <nav className="mt-4 space-y-1">
          {KB_MODULES.map((m) => {
            const state = kbModuleState(kbPlan, m);
            if (state === "hidden") return null;
            return (
              <div
                key={m.id}
                className={`rounded px-2 py-1.5 text-[11px] ${
                  state === "locked"
                    ? "text-kasi-grey/40"
                    : "text-kasi-ivory/90 hover:bg-white/5"
                }`}
              >
                {m.label}
                {state === "locked" && (
                  <span className="mt-0.5 block text-[9px] text-kasi-grey/50">
                    Available with Growth
                  </span>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
      <div className="flex-1 overflow-y-auto p-5">
        <h2 className="font-display text-2xl tracking-tight">Overview</h2>
        <p className="mt-1 text-sm text-kasi-grey">
          Demo dashboard for {businessName}. Interactions are simulated.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {["Visitors", "Enquiries", "Bookings"].map((k) => (
            <div key={k} className="border border-kasi-border p-4">
              <div className="font-mono text-[10px] uppercase tracking-wider text-kasi-grey">
                {k}
              </div>
              <div className="mt-2 font-display text-2xl">—</div>
              <div className="text-[11px] text-kasi-grey">Sample metric</div>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3">
          {KB_MODULES.filter((m) => kbModuleState(kbPlan, m) === "open").map(
            (m) => (
              <div key={m.id} className="border border-kasi-border/70 p-4">
                <div className="text-sm font-medium">{m.label}</div>
                <p className="mt-1 text-[12px] text-kasi-grey">{m.blurb}</p>
              </div>
            ),
          )}
        </div>
        {(kbPlan === "KB-PRO" ||
          kbPlan === "KB-SCALE" ||
          kbPlan === "KB-ENT") && (
          <p className="mt-6 text-[11px] text-kasi-grey">
            Higher plans are priced in the catalog. Additional modules beyond
            Growth are scoped with KasiTech — not invented in this preview.
          </p>
        )}
      </div>
    </div>
  );
}
