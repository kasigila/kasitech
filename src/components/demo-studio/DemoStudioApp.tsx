"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ALL_INDUSTRIES,
  businessForIndustry,
  chargeableRecommendations,
  clientValidationMessages,
  detectEligibleBundles,
  detectPackageBundleOverlap,
  emptyCommercialState,
  FEATURE_REGISTRY,
  formatDelta,
  formatTsh,
  getItem,
  INDUSTRY_BUNDLE_HINTS,
  INDUSTRY_PACKAGE_HINTS,
  isFeatureRelevant,
  loadPriceBook,
  makeChangeEntry,
  PRICE_BOOK_VERSION,
  priceStudioConfiguration,
  replaceExclusiveMember,
  clearExclusiveFamily,
  activeExclusiveCode,
  resolvePreviewCapabilities,
  trackDemo,
  estimateDelivery,
  type CommercialConfigState,
  type DemoIndustryId,
  type FeatureGroup,
  type PriceChangeEntry,
  type PreviewDevice,
  type StartMode,
  type StudioMode,
  type CompareMode,
} from "@/demo-studio";
import { normalizeExclusiveFeatureCodes } from "@/demo-studio/configuration/normalize";
import { outcomeForCode } from "@/demo-studio/configuration/outcomes";
import type { CommercialSnapshot } from "@/commercial";
import { billingLabel } from "@/commercial/catalog/presentation";
import { DemoWebsite } from "./DemoWebsite";
import { KbPreview } from "./KbPreview";

type Props = {
  initialIndustry?: DemoIndustryId;
  initialConfig?: Partial<CommercialConfigState> & {
    configurationId?: string;
    priceBookVersion?: string;
    readOnly?: boolean;
    frozenSnapshot?: CommercialSnapshot;
    fromCatalog?: boolean;
    catalogViewingLabel?: string;
  };
};

const GROUPS: { id: FeatureGroup; label: string }[] = [
  { id: "recommended", label: "Recommended" },
  { id: "website", label: "Website" },
  { id: "booking", label: "Booking" },
  { id: "payments", label: "Payments" },
  { id: "commerce", label: "Commerce" },
  { id: "content", label: "Content" },
  { id: "marketing", label: "Marketing" },
  { id: "local", label: "Local search" },
  { id: "advanced", label: "Advanced" },
  { id: "all", label: "All features" },
];

const EXCLUSIVE_FEATURE_FAMILIES = [
  "BOOKING_APPOINTMENT",
  "RESTAURANT_MENU",
  "LOGISTICS_TRACKING",
  "ECOM_STORE",
];

const PACKAGE_BLURBS: Record<string, { bestFor: string; value: string }> = {
  "WEB-ONE": {
    bestFor: "Solo offers & landing pages",
    value: "One clear page that explains what you do",
  },
  "WEB-ESS": {
    bestFor: "Small businesses getting online",
    value: "Multi-page site for services, about, and contact",
  },
  "WEB-BUS": {
    bestFor: "Growing local brands",
    value: "Richer structure for content and conversion",
  },
  "WEB-BUSP": {
    bestFor: "Established businesses",
    value: "Stronger information architecture",
  },
  "WEB-PRO": {
    bestFor: "Professional services",
    value: "Credibility, cases, and enquiry-led journeys",
  },
  "WEB-SIG": {
    bestFor: "Premium brands",
    value: "Signature presence for high-trust selling",
  },
  "WEB-CUS": {
    bestFor: "Unique requirements",
    value: "Scoped custom website — quote with KasiTech",
  },
};

const CARE = ["CARE-ESS", "CARE-STD", "CARE-BUS", "CARE-PRO", "CARE-PRI"];
const KB = ["KB-LAUNCH", "KB-GROW", "KB-PRO", "KB-SCALE", "KB-ENT"];
const SEO_SETUP = ["SEO-FND", "SEO-PRO", "SEO-ADV"];
const SEO_REC = ["SEO-CARE", "SEO-GROW", "SEO-AUTH"];
const SOCIAL = ["SOC-ESS", "SOC-GROW", "SOC-PRO", "SOC-CORP"];
const WEB_PKGS = [
  "WEB-ONE",
  "WEB-ESS",
  "WEB-BUS",
  "WEB-BUSP",
  "WEB-PRO",
  "WEB-SIG",
  "WEB-CUS",
];

export function DemoStudioApp({ initialIndustry, initialConfig }: Props) {
  const book = useMemo(() => loadPriceBook(), []);
  const [step, setStep] = useState<"industry" | "start" | "studio">(
    initialConfig?.industry || initialIndustry ? "studio" : "industry",
  );
  const [commercial, setCommercial] = useState<CommercialConfigState>(() => ({
    ...emptyCommercialState(),
    industry: initialConfig?.industry ?? initialIndustry ?? null,
    packageCode: initialConfig?.packageCode ?? null,
    bundleCode: initialConfig?.bundleCode ?? null,
    featureCodes: initialConfig?.featureCodes ?? [],
    carePlan: initialConfig?.carePlan ?? null,
    kbPlan: initialConfig?.kbPlan ?? null,
    seoSetup: initialConfig?.seoSetup ?? null,
    seoRecurring: initialConfig?.seoRecurring ?? null,
    socialPlan: initialConfig?.socialPlan ?? null,
    delivery: initialConfig?.delivery ?? "STANDARD",
    startMode: initialConfig?.startMode ?? "recommended",
  }));

  const [device, setDevice] = useState<PreviewDevice>("desktop");
  const [deviceInitialized, setDeviceInitialized] = useState(false);
  const [studioMode, setStudioMode] = useState<StudioMode>("website");
  const [compareMode, setCompareMode] = useState<CompareMode>("build");
  const [featureGroup, setFeatureGroup] = useState<FeatureGroup>("recommended");
  const [language, setLanguage] = useState<"en" | "sw">("en");
  const [changeLog, setChangeLog] = useState<PriceChangeEntry[]>([]);
  const [controlsOpen, setControlsOpen] = useState(true);
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [mobileSheet, setMobileSheet] = useState<"features" | "build" | "price" | null>(null);
  const [configId, setConfigId] = useState<string | null>(
    initialConfig?.configurationId ?? null,
  );
  const [editToken, setEditToken] = useState<string | null>(null);
  const [savedVersion] = useState(initialConfig?.priceBookVersion);
  const [frozenSnapshot] = useState(initialConfig?.frozenSnapshot);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [modals, setModals] = useState<{
    save?: boolean;
    submit?: boolean;
    compare?: boolean;
  }>({});
  const [catalogBanner, setCatalogBanner] = useState(
    Boolean(initialConfig?.fromCatalog),
  );
  const [catalogLocked, setCatalogLocked] = useState(
    Boolean(initialConfig?.fromCatalog),
  );
  const catalogLabel = initialConfig?.catalogViewingLabel ?? "Catalog selection";
  const readOnly = Boolean(initialConfig?.readOnly) || catalogLocked;

  useEffect(() => {
    if (deviceInitialized) return;
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches) {
      setDevice("mobile");
    }
    setDeviceInitialized(true);
  }, [deviceInitialized]);


  const livePricing = useMemo(
    () => priceStudioConfiguration(commercial),
    [commercial],
  );

  /** Never silently reprice an older Price Book snapshot. */
  const pricing = useMemo(() => {
    if (
      frozenSnapshot &&
      savedVersion &&
      savedVersion !== PRICE_BOOK_VERSION
    ) {
      return {
        ...livePricing,
        priceBookVersion: frozenSnapshot.priceBookVersion as typeof PRICE_BOOK_VERSION,
        charges: frozenSnapshot.charges,
        totals: frozenSnapshot.totals,
        entitlements: frozenSnapshot.entitlements,
        snapshot: frozenSnapshot,
        validation: { ok: true, issues: [] },
      };
    }
    return livePricing;
  }, [frozenSnapshot, savedVersion, livePricing]);

  const baseCommercial = useMemo((): CommercialConfigState => {
    return {
      ...emptyCommercialState(),
      industry: commercial.industry,
      packageCode: commercial.packageCode ?? INDUSTRY_PACKAGE_HINTS[commercial.industry ?? "general"],
      delivery: "STANDARD",
      startMode: commercial.startMode,
    };
  }, [commercial.industry, commercial.packageCode, commercial.startMode]);

  const activeCommercial =
    compareMode === "base" ? baseCommercial : commercial;
  const caps = useMemo(
    () => resolvePreviewCapabilities(activeCommercial),
    [activeCommercial],
  );
  const business = commercial.industry
    ? businessForIndustry(commercial.industry)
    : null;

  const bundleHints = useMemo(
    () => detectEligibleBundles(commercial),
    [commercial],
  );

  const packageBundleOverlap = useMemo(
    () => detectPackageBundleOverlap(commercial),
    [commercial],
  );

  const deliveryEst = estimateDelivery(
    commercial.packageCode,
    commercial.delivery,
  );

  function applyCommercial(
    next: CommercialConfigState,
    label: string,
  ) {
    const before = priceStudioConfiguration(commercial);
    const after = priceStudioConfiguration(next);
    setCommercial(next);
    setChangeLog((log) => [makeChangeEntry(label, before, after), ...log].slice(0, 20));
  }

  function selectIndustry(id: DemoIndustryId) {
    trackDemo("industry_selected", { industry: id });
    setCommercial({
      ...emptyCommercialState(),
      industry: id,
      delivery: "STANDARD",
    });
    setStep("start");
  }

  function applyStart(mode: StartMode) {
    if (!commercial.industry) return;
    trackDemo("start_mode_selected", { mode });
    trackDemo("demo_started", { industry: commercial.industry });
    const industry = commercial.industry;
    let next = { ...commercial, startMode: mode };

    if (mode === "recommended") {
      const bundle = INDUSTRY_BUNDLE_HINTS[industry];
      if (bundle) {
        next = {
          ...next,
          bundleCode: bundle,
          packageCode: null,
          featureCodes: normalizeExclusiveFeatureCodes(
            chargeableRecommendations(industry).filter(
              (c) => !["SEO-PRO", "SEO-FND"].includes(c),
            ),
          ),
        };
      } else {
        next = {
          ...next,
          packageCode: INDUSTRY_PACKAGE_HINTS[industry],
          featureCodes: normalizeExclusiveFeatureCodes(
            chargeableRecommendations(industry),
          ),
        };
      }
    } else if (mode === "package") {
      next = {
        ...next,
        packageCode: INDUSTRY_PACKAGE_HINTS[industry],
        bundleCode: null,
        featureCodes: [],
      };
    } else if (mode === "bundle") {
      const bundle = INDUSTRY_BUNDLE_HINTS[industry] ?? "BND-LAUNCH";
      next = {
        ...next,
        bundleCode: bundle,
        packageCode: null,
        featureCodes: [],
      };
    } else {
      next = {
        ...next,
        packageCode: null,
        bundleCode: null,
        featureCodes: [],
      };
    }
    setCommercial(next);
    setStep("studio");
  }

  function toggleFeature(code: string) {
    if (readOnly) return;
    const item = getItem(book, code);
    const on = commercial.featureCodes.includes(code);
    let featureCodes: string[];
    if (on) {
      featureCodes = commercial.featureCodes.filter((c) => c !== code);
      trackDemo("feature_removed", { code });
      applyCommercial({ ...commercial, featureCodes }, `${item?.name ?? code} removed`);
    } else {
      featureCodes = replaceExclusiveMember(commercial.featureCodes, code);
      trackDemo("feature_added", { code });
      const family = book.families.find((f) =>
        f.members.some((m) => m.code === code),
      );
      const label =
        family &&
        commercial.featureCodes.some((c) =>
          family.members.some((m) => m.code === c && m.code !== code),
        )
          ? `${item?.name ?? code} selected (replaces lower tier)`
          : `${item?.name ?? code} added`;
      applyCommercial({ ...commercial, featureCodes }, label);
    }
  }

  function setPackage(code: string | null) {
    if (readOnly) return;
    trackDemo("package_selected", { code: code ?? "none" });
    // If downgrading and a previously included feature was selected, keep as paid
    applyCommercial(
      { ...commercial, packageCode: code, bundleCode: code ? commercial.bundleCode : commercial.bundleCode },
      code ? `Package ${getItem(book, code)?.name ?? code}` : "Package cleared",
    );
  }

  function setBundle(code: string | null) {
    if (readOnly) return;
    trackDemo("bundle_selected", { code: code ?? "none" });
    applyCommercial(
      { ...commercial, bundleCode: code, packageCode: code ? null : commercial.packageCode },
      code ? `Bundle ${getItem(book, code)?.name ?? code}` : "Bundle cleared",
    );
  }

  async function saveBuild() {
    const msgs = clientValidationMessages(pricing);
    if (msgs.length) {
      setStatusMsg(msgs[0]);
      return;
    }
    if (!commercial.industry || !business) return;
    setStatusMsg("Saving…");
    try {
      const res = await fetch("/api/demo-studio/configurations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry: commercial.industry,
          fictionalBusinessKey: business.key,
          packageCode: commercial.packageCode,
          bundleCode: commercial.bundleCode,
          selectedFeatures: commercial.featureCodes,
          carePlan: commercial.carePlan,
          kbPlan: commercial.kbPlan,
          seoSetup: commercial.seoSetup,
          seoRecurring: commercial.seoRecurring,
          socialPlan: commercial.socialPlan,
          deliveryOption: commercial.delivery,
          commercialSnapshot: pricing.snapshot,
          configurationId: configId,
          editToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setConfigId(data.configurationId);
      setEditToken(data.editToken);
      trackDemo("configuration_saved", { id: data.configurationId });
      setStatusMsg(`Saved ${data.configurationId}`);
      setModals((m) => ({ ...m, save: true }));
    } catch (e) {
      setStatusMsg(e instanceof Error ? e.message : "Save failed");
    }
  }

  async function downloadEstimate() {
    const msgs = clientValidationMessages(pricing);
    if (msgs.length) {
      setStatusMsg(msgs[0]);
      return;
    }
    if (!commercial.industry) return;
    try {
      const res = await fetch("/api/demo-studio/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          configurationId: configId ?? "KT-CONFIG-DRAFT",
          industry: commercial.industry,
          packageCode: commercial.packageCode,
          bundleCode: commercial.bundleCode,
          delivery: commercial.delivery,
          snapshot: pricing.snapshot,
        }),
      });
      if (!res.ok) throw new Error("Estimate failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `KasiTech_Project_Estimate_${configId ?? "draft"}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      trackDemo("estimate_downloaded", { id: configId ?? "draft" });
    } catch {
      setStatusMsg("Could not generate estimate.");
    }
  }

  async function shareBuild() {
    if (!configId) {
      await saveBuild();
      return;
    }
    const url = `${window.location.origin}/build/${configId}`;
    trackDemo("configuration_shared", { id: configId });
    if (navigator.share) {
      try {
        await navigator.share({ title: "KasiTech build", url });
        return;
      } catch {
        /* fall through */
      }
    }
    await navigator.clipboard.writeText(url);
    setStatusMsg("Link copied");
  }

  const featureList = useMemo(() => {
    const rec = new Set(
      commercial.industry
        ? chargeableRecommendations(commercial.industry)
        : [],
    );
    return FEATURE_REGISTRY.filter((e) => {
      if (!e.demoSupported) return false;
      if (!isFeatureRelevant(e, commercial.industry)) return false;
      if (featureGroup === "all") return true;
      if (featureGroup === "recommended") return rec.has(e.featureCode);
      return e.group === featureGroup;
    });
  }, [commercial.industry, featureGroup]);

  const deviceWidth =
    device === "desktop" ? "100%" : device === "tablet" ? "768px" : "390px";

  if (step === "industry") {
    return (
      <Shell>
        <EntryTitle
          title="What type of business are you building for?"
          sub="Choose your type of business to see what KasiTech could build for you."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_INDUSTRIES.map((ind) => {
            const biz = businessForIndustry(ind.id);
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => selectIndustry(ind.id)}
                className="border border-kasi-border bg-[#0c0c0c] p-5 text-left transition hover:border-kasi-green/50"
              >
                <div
                  className="mb-4 h-1.5 w-10"
                  style={{ background: biz.accent }}
                />
                <div className="font-display text-lg text-kasi-ivory">
                  {ind.label}
                </div>
                <div className="mt-1 text-sm text-kasi-grey">{biz.name}</div>
                <p className="mt-2 text-[12px] text-kasi-grey/80">{biz.tagline}</p>
              </button>
            );
          })}
        </div>
      </Shell>
    );
  }

  if (step === "start" && commercial.industry) {
    const biz = businessForIndustry(commercial.industry);
    return (
      <Shell>
        <button
          type="button"
          className="text-sm text-kasi-grey hover:text-kasi-ivory"
          onClick={() => setStep("industry")}
        >
          ← Change industry
        </button>
        <EntryTitle
          title="What would you like to start with?"
          sub={`Configuring a demo for ${biz.name}.`}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {(
            [
              [
                "recommended",
                "Recommended for my business",
                "We pre-select relevant features and a fitting package or bundle.",
              ],
              [
                "package",
                "Website package",
                "Start from One Page through Signature, then add features.",
              ],
              [
                "bundle",
                "Bundle",
                "Start from an approved industry or growth bundle.",
              ],
              [
                "scratch",
                "Build from scratch",
                "Empty build — toggle only what you need.",
              ],
            ] as const
          ).map(([mode, title, blurb]) => (
            <button
              key={mode}
              type="button"
              onClick={() => applyStart(mode)}
              className="border border-kasi-border p-6 text-left hover:border-kasi-green/40"
            >
              <div className="font-display text-xl text-kasi-ivory">{title}</div>
              <p className="mt-2 text-sm text-kasi-grey">{blurb}</p>
            </button>
          ))}
        </div>
      </Shell>
    );
  }

  if (!business || !commercial.industry) return null;

  const oldBook =
    savedVersion && savedVersion !== PRICE_BOOK_VERSION ? savedVersion : null;

  return (
    <div className="flex h-[100dvh] flex-col bg-kasi-black text-kasi-ivory">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-kasi-border px-3 py-2 md:px-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <a href="/pricing" className="font-mono text-[10px] text-kasi-green">
              KasiTech
            </a>
            <span className="text-kasi-grey">/</span>
            <span className="truncate text-sm">Demo Studio</span>
          </div>
          <div className="truncate text-[11px] text-kasi-grey">
            {business.name} · Pricing: {PRICE_BOOK_VERSION}
            {configId && ` · ${configId}`}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <ModeToggle value={studioMode} onChange={setStudioMode} />
          <DeviceToggle value={device} onChange={setDevice} />
          <button
            type="button"
            className="hidden rounded border border-kasi-border px-2 py-1 text-[11px] md:inline"
            onClick={() =>
              setCompareMode((m) => (m === "build" ? "base" : "build"))
            }
          >
            {compareMode === "build" ? "Your build" : "Base"}
          </button>
        </div>
      </header>

      {oldBook && (
        <div className="border-b border-amber-900/50 bg-amber-950/40 px-4 py-2 text-[12px] text-amber-100">
          Created with {oldBook}. Totals shown from the saved snapshot — not
          silently repriced.{" "}
          <a href="/demo-studio" className="underline">
            Update to current pricing
          </a>{" "}
          starts a new configuration.
        </div>
      )}

      {catalogBanner && (
        <CatalogEntryBanner
          label={catalogLabel}
          commercial={commercial}
          pricing={pricing}
          book={book}
          onCustomize={() => {
            setCatalogLocked(false);
            setCatalogBanner(false);
            trackDemo("catalog_customize", { label: catalogLabel });
          }}
          onDismiss={() => setCatalogBanner(false)}
        />
      )}

      {statusMsg && (
        <div className="border-b border-kasi-border bg-[#111] px-4 py-1.5 text-[12px] text-kasi-grey">
          {statusMsg}
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        {/* Left controls — desktop */}
        {controlsOpen && (
          <aside className="hidden w-[320px] shrink-0 flex-col border-r border-kasi-border lg:flex">
            <Controls
              commercial={commercial}
              featureGroup={featureGroup}
              setFeatureGroup={setFeatureGroup}
              featureList={featureList}
              pricing={pricing}
              book={book}
              onToggle={toggleFeature}
              onPackage={setPackage}
              onBundle={setBundle}
              onCare={(c) => {
                trackDemo("care_selected", { code: c ?? "none" });
                applyCommercial(
                  { ...commercial, carePlan: c },
                  c ? `Care ${getItem(book, c)?.name}` : "Care cleared",
                );
              }}
              onKb={(c) => {
                trackDemo("kb_plan_selected", { code: c ?? "none" });
                applyCommercial(
                  { ...commercial, kbPlan: c },
                  c ? `KasiTech Business ${getItem(book, c)?.name}` : "KB cleared",
                );
              }}
              onSeoSetup={(c) =>
                applyCommercial(
                  { ...commercial, seoSetup: c },
                  c ? `SEO setup ${getItem(book, c)?.name}` : "SEO setup cleared",
                )
              }
              onSeoRec={(c) =>
                applyCommercial(
                  { ...commercial, seoRecurring: c },
                  c ? `SEO ${getItem(book, c)?.name}` : "SEO recurring cleared",
                )
              }
              onSocial={(c) =>
                applyCommercial(
                  { ...commercial, socialPlan: c },
                  c ? `Social ${getItem(book, c)?.name}` : "Social cleared",
                )
              }
              onDelivery={(d) => {
                trackDemo("delivery_selected", { level: d });
                applyCommercial(
                  { ...commercial, delivery: d },
                  `Delivery ${d}`,
                );
              }}
              bundleHints={bundleHints}
              packageBundleOverlap={packageBundleOverlap}
              readOnly={readOnly}
              packages={WEB_PKGS}
              care={CARE}
              kb={KB}
              seoSetup={SEO_SETUP}
              seoRec={SEO_REC}
              social={SOCIAL}
            />
          </aside>
        )}

        {/* Center preview */}
        <main className="relative flex min-w-0 flex-1 flex-col bg-[#151515]">
          <div className="flex items-center justify-center gap-2 border-b border-kasi-border/60 px-2 py-1.5">
            <button
              type="button"
              className="hidden text-[11px] text-kasi-grey lg:inline"
              onClick={() => setControlsOpen((v) => !v)}
            >
              {controlsOpen ? "Hide controls" : "Show controls"}
            </button>
            <span className="font-mono text-[10px] text-kasi-grey">
              {device.toUpperCase()} PREVIEW
            </span>
            <button
              type="button"
              className="hidden text-[11px] text-kasi-grey lg:inline"
              onClick={() => setSummaryOpen((v) => !v)}
            >
              {summaryOpen ? "Hide summary" : "Show summary"}
            </button>
          </div>
          <div className="flex flex-1 items-stretch justify-center overflow-hidden p-2 md:p-4">
            <div
              className="h-full overflow-hidden border border-kasi-border bg-white shadow-2xl shadow-black/40 transition-[width] duration-300"
              style={{ width: deviceWidth, maxWidth: "100%" }}
            >
              {studioMode === "website" ? (
                <DemoWebsite
                  business={business}
                  caps={caps}
                  language={language}
                  onLanguage={setLanguage}
                />
              ) : (
                <KbPreview
                  kbPlan={commercial.kbPlan}
                  businessName={business.name}
                />
              )}
            </div>
          </div>

          {/* Mobile bottom nav */}
          <div className="flex border-t border-kasi-border lg:hidden">
            {(
              [
                ["features", "Features"],
                ["build", "Build"],
                ["price", "Price"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`flex-1 py-3 text-xs ${
                  mobileSheet === id ? "text-kasi-green" : "text-kasi-grey"
                }`}
                onClick={() =>
                  setMobileSheet((s) => (s === id ? null : id))
                }
              >
                {label}
              </button>
            ))}
          </div>
        </main>

        {/* Right summary */}
        {summaryOpen && (
          <aside className="hidden w-[300px] shrink-0 flex-col border-l border-kasi-border xl:flex">
            <BuildSummaryPanel
              commercial={commercial}
              pricing={pricing}
              deliveryEst={deliveryEst}
              changeLog={changeLog}
              bundleHints={bundleHints}
              packageBundleOverlap={packageBundleOverlap}
              onApplyBundle={(code) => setBundle(code)}
              onUseBundleWebsite={() =>
                applyCommercial(
                  { ...commercial, packageCode: null },
                  "Using website included in bundle",
                )
              }
              onKeepPackageAndBundle={() =>
                setStatusMsg(
                  "Kept both — package and bundle remain separate charges as priced.",
                )
              }
              onSave={saveBuild}
              onShare={shareBuild}
              onEstimate={downloadEstimate}
              onSubmit={() => setModals((m) => ({ ...m, submit: true }))}
              onCompare={() => setModals((m) => ({ ...m, compare: true }))}
              readOnly={readOnly}
              book={book}
            />
          </aside>
        )}
      </div>

      {mobileSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 lg:hidden">
          <button
            type="button"
            className="flex-1"
            aria-label="Close"
            onClick={() => setMobileSheet(null)}
          />
          <div className="max-h-[75dvh] overflow-y-auto rounded-t-2xl border border-kasi-border bg-kasi-black p-4">
            {mobileSheet === "price" ? (
              <BuildSummaryPanel
                commercial={commercial}
                pricing={pricing}
                deliveryEst={deliveryEst}
                changeLog={changeLog}
                bundleHints={bundleHints}
              packageBundleOverlap={packageBundleOverlap}
                onApplyBundle={(code) => setBundle(code)}
                onUseBundleWebsite={() =>
                  applyCommercial(
                    { ...commercial, packageCode: null },
                    "Using website included in bundle",
                  )
                }
                onKeepPackageAndBundle={() =>
                  setStatusMsg(
                    "Kept both — package and bundle remain separate charges as priced.",
                  )
                }
                onSave={saveBuild}
                onShare={shareBuild}
                onEstimate={downloadEstimate}
                onSubmit={() => setModals((m) => ({ ...m, submit: true }))}
                onCompare={() => setModals((m) => ({ ...m, compare: true }))}
                readOnly={readOnly}
                book={book}
              />
            ) : (
              <Controls
                commercial={commercial}
                featureGroup={featureGroup}
                setFeatureGroup={setFeatureGroup}
                featureList={featureList}
                pricing={pricing}
                book={book}
                onToggle={toggleFeature}
                onPackage={setPackage}
                onBundle={setBundle}
                onCare={(c) =>
                  applyCommercial({ ...commercial, carePlan: c }, "Care updated")
                }
                onKb={(c) =>
                  applyCommercial({ ...commercial, kbPlan: c }, "KB updated")
                }
                onSeoSetup={(c) =>
                  applyCommercial({ ...commercial, seoSetup: c }, "SEO setup")
                }
                onSeoRec={(c) =>
                  applyCommercial(
                    { ...commercial, seoRecurring: c },
                    "SEO recurring",
                  )
                }
                onSocial={(c) =>
                  applyCommercial({ ...commercial, socialPlan: c }, "Social")
                }
                onDelivery={(d) =>
                  applyCommercial({ ...commercial, delivery: d }, `Delivery ${d}`)
                }
                bundleHints={bundleHints}
              packageBundleOverlap={packageBundleOverlap}
                readOnly={readOnly}
                packages={WEB_PKGS}
                care={CARE}
                kb={KB}
                seoSetup={SEO_SETUP}
                seoRec={SEO_REC}
                social={SOCIAL}
                compact={mobileSheet === "features"}
              />
            )}
          </div>
        </div>
      )}

      {modals.save && configId && (
        <Modal onClose={() => setModals((m) => ({ ...m, save: false }))}>
          <h3 id="demo-studio-modal-title" className="font-display text-xl pr-8">
            Build saved
          </h3>
          <p className="mt-2 font-mono text-sm text-kasi-green">{configId}</p>
          <p className="mt-2 text-sm text-kasi-grey">
            Share link: /build/{configId}
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              className="border border-kasi-border px-3 py-2 text-sm text-kasi-ivory"
              onClick={() => shareBuild()}
            >
              Copy / share link
            </button>
            <button
              type="button"
              className="border border-kasi-border px-3 py-2 text-sm text-kasi-ivory"
              onClick={() => downloadEstimate()}
            >
              Download project estimate
            </button>
          </div>
          <p className="mt-3 text-[11px] text-kasi-grey">
            Press Escape, click outside, or Close to continue configuring.
          </p>
        </Modal>
      )}

      {modals.submit && (
        <SubmitModal
          configurationId={configId}
          onClose={() => setModals((m) => ({ ...m, submit: false }))}
          onNeedSave={saveBuild}
          onDone={() => {
            trackDemo("configuration_submitted", { id: configId ?? "" });
            setModals((m) => ({ ...m, submit: false }));
            setStatusMsg("Submitted to KasiTech — we will follow up.");
          }}
        />
      )}

      {modals.compare && (
        <CompareModal
          currentId={configId}
          compareIds={compareIds}
          setCompareIds={setCompareIds}
          onClose={() => setModals((m) => ({ ...m, compare: false }))}
        />
      )}
    </div>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-kasi-black px-5 py-10 text-kasi-ivory md:px-10">
      <a href="/pricing" className="font-mono text-[10px] text-kasi-green">
        ← Services & Pricing
      </a>
      {children}
    </div>
  );
}

function EntryTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mt-8 max-w-2xl">
      <h1 className="font-display text-3xl tracking-tight md:text-4xl">{title}</h1>
      <p className="mt-3 text-kasi-grey">{sub}</p>
    </div>
  );
}

function ModeToggle({
  value,
  onChange,
}: {
  value: StudioMode;
  onChange: (v: StudioMode) => void;
}) {
  return (
    <div className="flex rounded border border-kasi-border text-[10px]">
      {(
        [
          ["website", "Customer site"],
          ["business", "KasiTech Business"],
        ] as const
      ).map(([id, label]) => (
        <button
          key={id}
          type="button"
          className={`px-2 py-1 ${value === id ? "bg-kasi-green text-kasi-black" : "text-kasi-grey"}`}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function DeviceToggle({
  value,
  onChange,
}: {
  value: PreviewDevice;
  onChange: (v: PreviewDevice) => void;
}) {
  return (
    <div className="flex rounded border border-kasi-border text-[10px]">
      {(["desktop", "tablet", "mobile"] as const).map((d) => (
        <button
          key={d}
          type="button"
          className={`px-2 py-1 uppercase ${value === d ? "text-kasi-green" : "text-kasi-grey"}`}
          onClick={() => onChange(d)}
        >
          {d[0]}
        </button>
      ))}
    </div>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-studio-modal-title"
        className="relative w-full max-w-md border border-kasi-border bg-kasi-black p-6 shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          className="absolute right-3 top-3 px-2 py-1 text-sm text-kasi-grey hover:text-kasi-ivory"
          onClick={onClose}
        >
          Close
        </button>
        {children}
        <button
          type="button"
          className="mt-6 w-full border border-kasi-border py-2 text-sm text-kasi-ivory"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function FeaturePicker(props: {
  featureList: typeof FEATURE_REGISTRY;
  commercial: CommercialConfigState;
  pricing: ReturnType<typeof priceStudioConfiguration>;
  book: ReturnType<typeof loadPriceBook>;
  readOnly: boolean;
  onToggle: (code: string) => void;
}) {
  const { featureList, commercial, pricing, book, onToggle } = props;
  const rendered = new Set<string>();
  const nodes: ReactNode[] = [];

  for (const familyCode of EXCLUSIVE_FEATURE_FAMILIES) {
    const family = book.families.find((f) => f.code === familyCode);
    if (!family) continue;
    const members = featureList.filter((f) =>
      family.members.some((m) => m.code === f.featureCode),
    );
    if (members.length < 2) continue;
    for (const m of members) rendered.add(m.featureCode);
    const active = activeExclusiveCode(commercial.featureCodes, familyCode);
    nodes.push(
      <li key={familyCode} className="border border-kasi-border/70 p-2">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-kasi-grey">
          {family.name}
        </div>
        <div className="space-y-2" role="radiogroup" aria-label={family.name}>
          <label className="flex cursor-pointer gap-2">
            <input
              type="radio"
              name={`ex-${familyCode}`}
              checked={!active}
              disabled={props.readOnly}
              onChange={() => {
                const cleared = clearExclusiveFamily(
                  commercial.featureCodes,
                  familyCode,
                );
                // Toggle off active member via onToggle of active if present
                if (active) onToggle(active);
                else if (cleared.length !== commercial.featureCodes.length) {
                  /* no-op */
                }
              }}
            />
            <span className="text-xs text-kasi-grey">None</span>
          </label>
          {family.members
            .slice()
            .sort((a, b) => a.rank - b.rank)
            .map((m) => {
              const entry = members.find((f) => f.featureCode === m.code);
              if (!entry) return null;
              const item = getItem(book, m.code);
              const includesLower = Boolean(m.includesLower);
              return (
                <label key={m.code} className="flex cursor-pointer gap-2">
                  <input
                    type="radio"
                    name={`ex-${familyCode}`}
                    checked={active === m.code}
                    disabled={props.readOnly}
                    onChange={() => {
                      if (active !== m.code) onToggle(m.code);
                    }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-kasi-ivory">
                      {item?.name ?? m.code}
                    </span>
                    <span className="block text-[11px] text-kasi-grey">
                      {entry.shortExplanation}
                    </span>
                    {includesLower && (
                      <span className="mt-0.5 block text-[10px] text-kasi-green/80">
                        Includes lower tier capability
                      </span>
                    )}
                    <span className="mt-1 block font-mono text-[10px] text-kasi-green">
                      {item?.priceTsh != null
                        ? `${formatTsh(item.priceTsh)}${
                            item.billing === "MONTHLY"
                              ? "/mo"
                              : item.billing === "ANNUAL"
                                ? "/yr"
                                : ""
                          }`
                        : billingLabel(item?.billing ?? "INCLUDED")}
                    </span>
                  </span>
                </label>
              );
            })}
        </div>
      </li>,
    );
  }

  for (const f of featureList) {
    if (rendered.has(f.featureCode)) continue;
    const item = getItem(book, f.featureCode);
    const selected = commercial.featureCodes.includes(f.featureCode);
    const suppressed = pricing.suppressedCodes.some(
      (s) => s.code === f.featureCode,
    );
    const included =
      suppressed ||
      (commercial.packageCode &&
        (book.inclusionsByPackage.get(commercial.packageCode) ?? []).includes(
          f.featureCode,
        ));
    const isLocal = f.group === "local";
    nodes.push(
      <li key={f.featureCode} className="border border-kasi-border/70 p-2">
        <label className="flex cursor-pointer gap-2">
          <input
            type="checkbox"
            checked={selected || Boolean(included && !selected)}
            disabled={props.readOnly}
            onChange={() => onToggle(f.featureCode)}
          />
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-kasi-ivory">
              {item?.name ?? f.featureCode}
            </span>
            <span className="block text-[11px] text-kasi-grey">
              {f.shortExplanation}
            </span>
            {isLocal && (
              <span className="mt-1 block text-[10px] text-kasi-grey/80">
                What this does: improves how customers find and trust you locally.
                How it helps: more discovery without changing your website layout.
              </span>
            )}
            <span className="mt-1 block font-mono text-[10px] text-kasi-green">
              {included && !selected
                ? `INCLUDED${
                    commercial.packageCode
                      ? ` WITH ${getItem(book, commercial.packageCode)?.name}`
                      : ""
                  }`
                : item?.priceTsh != null
                  ? `${formatTsh(item.priceTsh)}${
                      item.billing === "MONTHLY"
                        ? "/mo"
                        : item.billing === "ANNUAL"
                          ? "/yr"
                          : ""
                    }`
                  : billingLabel(item?.billing ?? "INCLUDED")}
            </span>
          </span>
        </label>
      </li>,
    );
  }

  return <ul className="space-y-2">{nodes}</ul>;
}

function Controls(props: {
  commercial: CommercialConfigState;
  featureGroup: FeatureGroup;
  setFeatureGroup: (g: FeatureGroup) => void;
  featureList: typeof FEATURE_REGISTRY;
  pricing: ReturnType<typeof priceStudioConfiguration>;
  book: ReturnType<typeof loadPriceBook>;
  onToggle: (code: string) => void;
  onPackage: (code: string | null) => void;
  onBundle: (code: string | null) => void;
  onCare: (code: string | null) => void;
  onKb: (code: string | null) => void;
  onSeoSetup: (code: string | null) => void;
  onSeoRec: (code: string | null) => void;
  onSocial: (code: string | null) => void;
  onDelivery: (d: CommercialConfigState["delivery"]) => void;
  bundleHints: ReturnType<typeof detectEligibleBundles>;
  packageBundleOverlap: ReturnType<typeof detectPackageBundleOverlap>;
  readOnly: boolean;
  packages: string[];
  care: string[];
  kb: string[];
  seoSetup: string[];
  seoRec: string[];
  social: string[];
  compact?: boolean;
}) {
  const {
    commercial,
    featureGroup,
    setFeatureGroup,
    featureList,
    pricing,
    book,
    onToggle,
    compact,
  } = props;

  return (
    <div className="flex h-full flex-col overflow-y-auto p-3 text-sm">
      {!compact && (
        <>
          <Section label="Website package">
            <div className="space-y-2">
              <button
                type="button"
                disabled={props.readOnly}
                onClick={() => props.onPackage(null)}
                className={`w-full border px-2 py-2 text-left text-[11px] ${
                  !commercial.packageCode
                    ? "border-kasi-green bg-kasi-green/10"
                    : "border-kasi-border"
                }`}
              >
                None — add features à la carte
              </button>
              {props.packages.map((c) => {
                const item = getItem(book, c);
                const blurb = PACKAGE_BLURBS[c];
                const selected = commercial.packageCode === c;
                return (
                  <button
                    key={c}
                    type="button"
                    disabled={props.readOnly}
                    onClick={() => props.onPackage(c)}
                    className={`w-full border px-2 py-2 text-left ${
                      selected
                        ? "border-kasi-green bg-kasi-green/10"
                        : "border-kasi-border"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs text-kasi-ivory">
                        {item?.name ?? c}
                      </span>
                      <span className="shrink-0 font-mono text-[10px] text-kasi-green">
                        {item?.priceTsh != null
                          ? formatTsh(item.priceTsh)
                          : "Quote"}
                      </span>
                    </div>
                    {blurb && (
                      <>
                        <div className="mt-1 text-[10px] text-kasi-grey">
                          Best for: {blurb.bestFor}
                        </div>
                        <div className="text-[10px] text-kasi-grey/80">
                          {blurb.value}
                        </div>
                      </>
                    )}
                  </button>
                );
              })}
              <a
                href="/pricing"
                className="inline-block text-[10px] text-kasi-green underline"
              >
                Compare packages on Pricing →
              </a>
            </div>
          </Section>
          <Section label="Bundle">
            <select
              className="w-full border border-kasi-border bg-transparent px-2 py-1.5 text-xs"
              disabled={props.readOnly}
              value={commercial.bundleCode ?? ""}
              onChange={(e) => props.onBundle(e.target.value || null)}
            >
              <option value="">None</option>
              {book.items
                .filter((i) => i.kind === "BUNDLE")
                .map((i) => (
                  <option key={i.code} value={i.code}>
                    {i.name}
                    {i.priceTsh != null ? ` · ${formatTsh(i.priceTsh)}` : ""}
                  </option>
                ))}
            </select>
          </Section>
        </>
      )}

      <Section label="Features">
        <div className="mb-2 flex flex-wrap gap-1">
          {GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              className={`rounded px-2 py-0.5 text-[10px] ${
                featureGroup === g.id
                  ? "bg-kasi-green text-kasi-black"
                  : "border border-kasi-border text-kasi-grey"
              }`}
              onClick={() => setFeatureGroup(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>
        <FeaturePicker
          featureList={featureList}
          commercial={commercial}
          pricing={pricing}
          book={book}
          readOnly={props.readOnly}
          onToggle={onToggle}
        />
      </Section>

      {!compact && (
        <>
          <TierSelect
            label="Care plan"
            value={commercial.carePlan}
            codes={props.care}
            book={book}
            onChange={props.onCare}
            allowNone
            disabled={props.readOnly}
          />
          <p className="mb-4 -mt-2 text-[10px] text-kasi-grey">
            Care plans cover ongoing website care. Exact inclusions (response
            times, update allowance) are confirmed by KasiTech for your plan —
            Demo Studio shows approved plan names and catalog prices only.
          </p>
          <TierSelect
            label="KasiTech Business"
            value={commercial.kbPlan}
            codes={props.kb}
            book={book}
            onChange={props.onKb}
            allowNone
            disabled={props.readOnly}
          />
          <TierSelect
            label="SEO setup"
            value={commercial.seoSetup}
            codes={props.seoSetup}
            book={book}
            onChange={props.onSeoSetup}
            allowNone
            disabled={props.readOnly}
          />
          <TierSelect
            label="SEO recurring"
            value={commercial.seoRecurring}
            codes={props.seoRec}
            book={book}
            onChange={props.onSeoRec}
            allowNone
            disabled={props.readOnly}
          />
          <TierSelect
            label="Social plan"
            value={commercial.socialPlan}
            codes={props.social}
            book={book}
            onChange={props.onSocial}
            allowNone
            disabled={props.readOnly}
          />
          <Section label="Delivery">
            <select
              className="w-full border border-kasi-border bg-transparent px-2 py-1.5 text-xs"
              disabled={props.readOnly}
              value={commercial.delivery}
              onChange={(e) =>
                props.onDelivery(
                  e.target.value as CommercialConfigState["delivery"],
                )
              }
            >
              <option value="STANDARD">Standard</option>
              <option value="PRIORITY">Priority +25%</option>
              <option value="RUSH">Rush +40%</option>
              <option value="EMERGENCY">Accelerated +50%</option>
            </select>
          </Section>
        </>
      )}
    </div>
  );
}

function TierSelect(props: {
  label: string;
  value: string | null;
  codes: string[];
  book: ReturnType<typeof loadPriceBook>;
  onChange: (v: string | null) => void;
  allowNone?: boolean;
  disabled?: boolean;
}) {
  return (
    <Section label={props.label}>
      <select
        className="w-full border border-kasi-border bg-transparent px-2 py-1.5 text-xs"
        disabled={props.disabled}
        value={props.value ?? ""}
        onChange={(e) => props.onChange(e.target.value || null)}
      >
        {props.allowNone && <option value="">None</option>}
        {props.codes.map((c) => {
          const item = getItem(props.book, c);
          return (
            <option key={c} value={c}>
              {item?.name}
              {item?.priceTsh != null
                ? ` · ${formatTsh(item.priceTsh)}${item.billing === "MONTHLY" ? "/mo" : item.billing === "ANNUAL" ? "/yr" : ""}`
                : " · Custom quote"}
            </option>
          );
        })}
      </select>
    </Section>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-kasi-grey">
        {label}
      </div>
      {children}
    </div>
  );
}

function BuildSummaryPanel(props: {
  commercial: CommercialConfigState;
  pricing: ReturnType<typeof priceStudioConfiguration>;
  deliveryEst: ReturnType<typeof estimateDelivery>;
  changeLog: PriceChangeEntry[];
  bundleHints: ReturnType<typeof detectEligibleBundles>;
  packageBundleOverlap: ReturnType<typeof detectPackageBundleOverlap>;
  onApplyBundle: (code: string) => void;
  onUseBundleWebsite: () => void;
  onKeepPackageAndBundle: () => void;
  onSave: () => void;
  onShare: () => void;
  onEstimate: () => void;
  onSubmit: () => void;
  onCompare: () => void;
  readOnly: boolean;
  book: ReturnType<typeof loadPriceBook>;
}) {
  const { pricing, commercial, book } = props;
  return (
    <div className="flex h-full flex-col overflow-y-auto p-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-kasi-green">
        Your KasiTech build
      </div>
      <dl className="mt-3 space-y-1 text-[12px] text-kasi-grey">
        <Row
          k="Package"
          v={
            commercial.packageCode
              ? getItem(book, commercial.packageCode)?.name
              : "—"
          }
        />
        <Row
          k="Bundle"
          v={
            commercial.bundleCode
              ? getItem(book, commercial.bundleCode)?.name
              : "—"
          }
        />
        <Row k="Features" v={`${commercial.featureCodes.length} selected`} />
        <Row
          k="KasiTech Business"
          v={
            commercial.kbPlan
              ? getItem(book, commercial.kbPlan)?.name
              : "None"
          }
        />
        <Row
          k="Care"
          v={
            commercial.carePlan
              ? getItem(book, commercial.carePlan)?.name
              : "None"
          }
        />
        <Row k="Delivery" v={commercial.delivery} />
        <Row k="Est. delivery" v={props.deliveryEst.baselineLabel} />
      </dl>

      {props.packageBundleOverlap && (
        <div className="mt-3 border border-amber-700/50 bg-amber-950/30 p-2 text-[11px] text-amber-50">
          <p>{props.packageBundleOverlap.message}</p>
          <div className="mt-2 flex flex-col gap-1">
            <button
              type="button"
              className="text-left text-kasi-green underline"
              onClick={props.onUseBundleWebsite}
            >
              Use bundle website
            </button>
            <button
              type="button"
              className="text-left text-amber-100/80 underline"
              onClick={props.onKeepPackageAndBundle}
            >
              Keep business package + bundle
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 space-y-2 border-t border-kasi-border pt-3">
        <div className="font-mono text-[10px] uppercase tracking-wider text-kasi-grey">
          What you&apos;re building
        </div>
        {pricing.charges.slice(0, 8).map((ch) => (
          <div key={ch.itemCode + ch.name} className="text-[11px]">
            <div className="flex justify-between gap-2">
              <span className="text-kasi-ivory">{ch.name}</span>
              <span className="shrink-0 font-mono text-kasi-green">
                {formatTsh(ch.amountTsh)}
                {ch.billing === "MONTHLY"
                  ? "/mo"
                  : ch.billing === "ANNUAL"
                    ? "/yr"
                    : ""}
              </span>
            </div>
            <p className="text-kasi-grey">{outcomeForCode(ch.itemCode)}</p>
          </div>
        ))}
        {pricing.charges.length > 8 && (
          <p className="text-[10px] text-kasi-grey">
            +{pricing.charges.length - 8} more lines in the estimate PDF
          </p>
        )}
      </div>

      <div className="mt-4 space-y-1 border-t border-kasi-border pt-3">
        <div className="flex justify-between text-sm">
          <span>One-time</span>
          <span className="font-mono">{formatTsh(pricing.totals.oneTimeTsh)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Monthly</span>
          <span className="font-mono">
            {formatTsh(pricing.totals.monthlyTsh)}/mo
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Annual</span>
          <span className="font-mono">
            {formatTsh(pricing.totals.annualTsh)}/yr
          </span>
        </div>
        {pricing.totals.estimatedFirst12MonthsTsh != null && (
          <div className="flex justify-between pt-1 text-sm text-kasi-green">
            <span>First 12 months</span>
            <span className="font-mono">
              {formatTsh(pricing.totals.estimatedFirst12MonthsTsh)}
            </span>
          </div>
        )}
      </div>

      {props.bundleHints.length > 0 && !commercial.bundleCode && (
        <div className="mt-3 space-y-2 border border-kasi-green/30 bg-kasi-green/5 p-2 text-[11px]">
          {props.bundleHints.map((b) => (
            <div key={b.bundleCode}>
              {b.showSavings && b.savingsTsh != null ? (
                <p>
                  You can save {formatTsh(b.savingsTsh)} with {b.name}
                </p>
              ) : (
                <p>{b.name} matches your build</p>
              )}
              <button
                type="button"
                className="mt-1 text-kasi-green underline"
                onClick={() => props.onApplyBundle(b.bundleCode)}
              >
                {b.showSavings && b.savingsTsh != null
                  ? "Apply bundle"
                  : "View / apply bundle"}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 space-y-2">
        {!props.readOnly && (
          <>
            <Action onClick={props.onSave}>Save build</Action>
            <Action onClick={props.onShare}>Share build</Action>
          </>
        )}
        <Action onClick={props.onEstimate}>Download project estimate</Action>
        {!props.readOnly && (
          <Action onClick={props.onSubmit} primary>
            Submit to KasiTech
          </Action>
        )}
        <Action onClick={props.onCompare}>Compare builds</Action>
      </div>

      <div className="mt-4 border-t border-kasi-border pt-3">
        <div className="font-mono text-[10px] uppercase tracking-wider text-kasi-grey">
          Price changes
        </div>
        <ul className="mt-2 max-h-40 space-y-2 overflow-y-auto text-[11px]">
          {props.changeLog.length === 0 && (
            <li className="text-kasi-grey">Changes will appear here.</li>
          )}
          {props.changeLog.map((c) => (
            <li key={c.id} className="border-b border-kasi-border/50 pb-1">
              <div>{c.label}</div>
              <div className="font-mono text-kasi-green">
                {[
                  formatDelta(c.deltaOneTimeTsh),
                  c.deltaMonthlyTsh
                    ? `${formatDelta(c.deltaMonthlyTsh)}/mo`
                    : "",
                  c.deltaAnnualTsh
                    ? `${formatDelta(c.deltaAnnualTsh)}/yr`
                    : "",
                ]
                  .filter(Boolean)
                  .join(" · ") || "No price change"}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-[10px] text-kasi-grey">
        Third-party costs (domain, hosting) are disclosed before approval.
        Demo interactions never process real payments.
      </p>
    </div>
  );
}

function Row({ k, v }: { k: string; v?: string | null }) {
  return (
    <div className="flex justify-between gap-2">
      <dt>{k}</dt>
      <dd className="truncate text-right text-kasi-ivory/90">{v ?? "—"}</dd>
    </div>
  );
}

function Action({
  children,
  onClick,
  primary,
}: {
  children: ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-3 py-2 text-left text-xs ${
        primary
          ? "bg-kasi-green text-kasi-black"
          : "border border-kasi-border text-kasi-ivory hover:border-kasi-green/40"
      }`}
    >
      {children}
    </button>
  );
}

function SubmitModal({
  configurationId,
  onClose,
  onNeedSave,
  onDone,
}: {
  configurationId: string | null;
  onClose: () => void;
  onNeedSave: () => Promise<void> | void;
  onDone: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    let id = configurationId;
    if (!id) {
      await onNeedSave();
      setErr("Save your build first, then submit again.");
      return;
    }
    const res = await fetch("/api/demo-studio/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, configurationId: id }),
    });
    const data = await res.json();
    if (!res.ok) {
      setErr(data.error ?? "Submission failed");
      return;
    }
    onDone();
  }

  return (
    <Modal onClose={onClose}>
      <h3 className="font-display text-xl">Submit to KasiTech</h3>
      <p className="mt-2 text-sm text-kasi-grey">
        We will review your configuration. This is not a CRM yet — your details
        are stored as a submission intent for Phase 4.
      </p>
      <form className="mt-4 space-y-2" onSubmit={submit}>
        {(
          [
            ["name", "Name"],
            ["businessName", "Business name"],
            ["email", "Email"],
            ["phone", "Phone / WhatsApp"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="block text-[11px] text-kasi-grey">
            {label}
            <input
              required
              className="mt-1 w-full border border-kasi-border bg-transparent px-3 py-2 text-sm text-kasi-ivory"
              value={form[key]}
              onChange={(e) =>
                setForm((f) => ({ ...f, [key]: e.target.value }))
              }
            />
          </label>
        ))}
        <label className="block text-[11px] text-kasi-grey">
          Message (optional)
          <textarea
            className="mt-1 w-full border border-kasi-border bg-transparent px-3 py-2 text-sm"
            rows={3}
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
          />
        </label>
        {err && <p className="text-xs text-red-400">{err}</p>}
        <button
          type="submit"
          className="mt-2 w-full bg-kasi-green py-2 text-sm text-kasi-black"
        >
          Submit configuration
        </button>
      </form>
    </Modal>
  );
}

function CompareModal({
  currentId,
  compareIds,
  setCompareIds,
  onClose,
}: {
  currentId: string | null;
  compareIds: string[];
  setCompareIds: (ids: string[]) => void;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [rows, setRows] = useState<
    {
      configurationId: string;
      packageCode: string | null;
      bundleCode: string | null;
      kbPlan: string | null;
      carePlan: string | null;
      oneTime: number;
      monthly: number;
      annual: number;
      firstYear: number | null;
    }[]
  >([]);

  async function load() {
    const ids = [...new Set([currentId, ...compareIds, input].filter(Boolean))] as string[];
    if (ids.length > 3) {
      alert("Compare up to 3 configurations.");
      return;
    }
    const res = await fetch("/api/demo-studio/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    const data = await res.json();
    if (res.ok) setRows(data.rows);
  }

  return (
    <Modal onClose={onClose}>
      <h3 className="font-display text-xl">Compare builds</h3>
      <p className="mt-2 text-sm text-kasi-grey">Up to 3 saved configuration IDs.</p>
      <input
        className="mt-3 w-full border border-kasi-border bg-transparent px-3 py-2 font-mono text-xs"
        placeholder="KT-CONFIG-…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="button"
        className="mt-2 text-sm text-kasi-green"
        onClick={() => {
          if (input) setCompareIds([...new Set([...compareIds, input])].slice(0, 2));
          void load();
        }}
      >
        Add & compare
      </button>
      {rows.length > 0 && (
        <div className="mt-4 overflow-x-auto text-[11px]">
          <table className="w-full text-left">
            <thead>
              <tr className="text-kasi-grey">
                <th className="p-1">ID</th>
                <th className="p-1">Pkg</th>
                <th className="p-1">One-time</th>
                <th className="p-1">Monthly</th>
                <th className="p-1">Year 1</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.configurationId} className="border-t border-kasi-border">
                  <td className="p-1 font-mono">{r.configurationId.slice(-8)}</td>
                  <td className="p-1">{r.packageCode ?? r.bundleCode ?? "—"}</td>
                  <td className="p-1">{formatTsh(r.oneTime)}</td>
                  <td className="p-1">{formatTsh(r.monthly)}</td>
                  <td className="p-1">
                    {r.firstYear != null ? formatTsh(r.firstYear) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
}

function CatalogEntryBanner({
  label,
  commercial,
  pricing,
  book,
  onCustomize,
  onDismiss,
}: {
  label: string;
  commercial: CommercialConfigState;
  pricing: ReturnType<typeof priceStudioConfiguration>;
  book: ReturnType<typeof loadPriceBook>;
  onCustomize: () => void;
  onDismiss: () => void;
}) {
  const bundle = commercial.bundleCode
    ? getItem(book, commercial.bundleCode)
    : null;
  const pkg = commercial.packageCode
    ? getItem(book, commercial.packageCode)
    : null;
  const hints = detectEligibleBundles({
    ...commercial,
    bundleCode: null,
  });
  const match = commercial.bundleCode
    ? hints.find((h) => h.bundleCode === commercial.bundleCode)
    : null;
  // When bundle already applied, price via components for display
  const comps = commercial.bundleCode
    ? (book.componentsByBundle.get(commercial.bundleCode) ?? []).filter(
        (c) => c.role === "CHARGE",
      )
    : [];
  const standalone = comps.reduce((s, c) => {
    const it = book.itemByCode.get(c.componentCode);
    return s + (it?.priceTsh ?? 0);
  }, 0);
  const bundlePrice = bundle?.priceTsh ?? null;
  const saved =
    bundlePrice != null && standalone > bundlePrice
      ? standalone - bundlePrice
      : match?.savingsTsh ?? null;

  return (
    <div className="border-b border-kasi-green/40 bg-kasi-green/10 px-4 py-3 text-[12px] text-kasi-ivory">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-kasi-green">
            Viewing from catalog
          </div>
          <div className="mt-1 font-display text-lg">{label}</div>
          <dl className="mt-2 grid gap-1 sm:grid-cols-2">
            {bundle && (
              <div>
                <dt className="text-kasi-grey">Bundle</dt>
                <dd>
                  {bundle.name}
                  {bundle.priceTsh != null ? ` · ${formatTsh(bundle.priceTsh)}` : ""}
                </dd>
              </div>
            )}
            {pkg && (
              <div>
                <dt className="text-kasi-grey">Website package</dt>
                <dd>
                  {pkg.name} · {formatTsh(pkg.priceTsh ?? 0)}
                </dd>
              </div>
            )}
            {comps.length > 0 && (
              <div className="sm:col-span-2">
                <dt className="text-kasi-grey">Included (charge components)</dt>
                <dd>
                  {comps
                    .map((c) => {
                      const it = book.itemByCode.get(c.componentCode);
                      return it
                        ? `${it.name} (${formatTsh(it.priceTsh ?? 0)})`
                        : c.componentCode;
                    })
                    .join(" · ")}
                </dd>
              </div>
            )}
            {commercial.featureCodes.length > 0 && !bundle && (
              <div className="sm:col-span-2">
                <dt className="text-kasi-grey">Features</dt>
                <dd>
                  {commercial.featureCodes
                    .map((c) => getItem(book, c)?.name ?? c)
                    .join(" · ")}
                </dd>
              </div>
            )}
            {commercial.kbPlan && (
              <div>
                <dt className="text-kasi-grey">KasiTech Business</dt>
                <dd>{getItem(book, commercial.kbPlan)?.name}</dd>
              </div>
            )}
            {commercial.carePlan && (
              <div>
                <dt className="text-kasi-grey">Care</dt>
                <dd>{getItem(book, commercial.carePlan)?.name}</dd>
              </div>
            )}
            <div>
              <dt className="text-kasi-grey">Live total (one-time)</dt>
              <dd className="font-mono text-kasi-green">
                {formatTsh(pricing.totals.oneTimeTsh)}
              </dd>
            </div>
            {standalone > 0 && bundlePrice != null && (
              <>
                <div>
                  <dt className="text-kasi-grey">Standalone value</dt>
                  <dd className="font-mono">{formatTsh(standalone)}</dd>
                </div>
                {saved != null && saved > 0 && (
                  <div>
                    <dt className="text-kasi-grey">You save</dt>
                    <dd className="font-mono text-kasi-green">
                      {formatTsh(saved)}
                    </dd>
                  </div>
                )}
              </>
            )}
          </dl>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <button
            type="button"
            className="bg-kasi-green px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-kasi-black"
            onClick={onCustomize}
          >
            Customize this build
          </button>
          <button
            type="button"
            className="text-[11px] text-kasi-grey underline"
            onClick={onDismiss}
          >
            Dismiss banner
          </button>
        </div>
      </div>
    </div>
  );
}
