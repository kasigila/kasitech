"use client";

import { CREDO_ENERGY_PROPOSAL } from "@/proposals/registry/credo-energy";
import { resolvePreviewCapabilities } from "@/demo-studio/configuration/capabilities";
import { FlagshipCredo } from "./previews/FlagshipCredo";

/**
 * Full-viewport Credo website mockup for the website proposal QR.
 * Intentionally outside Demo Studio so Credo sees their branded site,
 * not the old combined-proposal companion with catalog sidebars.
 */
export function CredoWebsitePreview() {
  const brand = CREDO_ENERGY_PROPOSAL.brand;
  const caps = resolvePreviewCapabilities(CREDO_ENERGY_PROPOSAL.commercial);

  return (
    <div className="flex h-[100dvh] flex-col bg-[#0c1612]">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5 text-[11px] text-white/70">
        <div className="min-w-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8fd4b5]">
            Conceptual website preview
          </span>
          <span className="mx-2 text-white/25">·</span>
          <span>KT-CEG-WEB-2026-001 · Credo Energy Group</span>
        </div>
        <div className="font-mono text-[10px] text-white/45">
          Not the final build · Prepared by KasiTech
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden bg-white">
        <FlagshipCredo
          business={brand}
          caps={caps}
          language="en"
          initialPath="home"
        />
      </div>
    </div>
  );
}
