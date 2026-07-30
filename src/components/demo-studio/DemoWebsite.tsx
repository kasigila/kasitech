"use client";

import { useMemo, useState } from "react";
import type { FictionalBusiness } from "@/demo-studio/industries/businesses";
import type { PreviewCapabilities } from "@/demo-studio/configuration/capabilities";
import { FlagshipAmani } from "./previews/FlagshipAmani";
import { FlagshipJiko } from "./previews/FlagshipJiko";
import { FlagshipTembea } from "./previews/FlagshipTembea";
import { FlagshipNuru } from "./previews/FlagshipNuru";

type Props = {
  business: FictionalBusiness;
  caps: PreviewCapabilities;
  language: "en" | "sw";
  onLanguage?: (l: "en" | "sw") => void;
  /** Initial path for Proposal Companion deep-links */
  initialPath?: string;
  /** Remount key when companion section changes */
  pathKey?: string;
};

const SW: Record<string, string> = {
  Services: "Huduma",
  Gallery: "Picha",
  Book: "Weka nafasi",
  Contact: "Wasiliana",
  Menu: "Menyu",
  Reserve: "Hifadhi",
  Shop: "Duka",
  Tours: "Safari",
  Listings: "Orodha",
  Track: "Fuatilia",
  Donate: "Changia",
};

function normalizePath(raw?: string): string {
  if (!raw) return "home";
  const p = raw.trim().toLowerCase();
  if (p === "inquiry") return "enquiry";
  if (p === "home" || p === "homepage") return "home";
  return p;
}

function t(label: string, lang: "en" | "sw"): string {
  if (lang === "en") return label;
  return SW[label] ?? label;
}

export function DemoWebsite(props: Props) {
  const { business: b } = props;
  const keyed = (
    <DemoWebsiteInner key={props.pathKey ?? props.initialPath ?? "default"} {...props} />
  );
  return keyed;
}

function DemoWebsiteInner(props: Props) {
  const { business: b, caps, language, onLanguage } = props;
  const flagship = { business: b, caps, language, onLanguage };
  if (b.industry === "beauty") return <FlagshipAmani {...flagship} />;
  if (b.industry === "restaurant") return <FlagshipJiko {...flagship} />;
  if (b.industry === "tourism") return <FlagshipTembea {...flagship} />;
  if (b.industry === "real-estate") return <FlagshipNuru {...flagship} />;
  return <GenericDemoWebsite {...props} />;
}

function GenericDemoWebsite({
  business: b,
  caps,
  language,
  onLanguage,
  initialPath = "home",
}: Props) {
  const [path, setPath] = useState(() => normalizePath(initialPath));
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingDone, setBookingDone] = useState(false);
  const [cart, setCart] = useState<{ name: string; priceLabel: string }[]>([]);
  const [trackInput, setTrackInput] = useState("");
  const [trackResult, setTrackResult] = useState(false);
  const [filterArea, setFilterArea] = useState("all");
  const [reserveDone, setReserveDone] = useState(false);

  const nav = useMemo(() => {
    const items = [...b.nav];
    if (caps.blog && !items.includes("Blog")) items.splice(-1, 0, "Blog");
    if (caps.team && !items.includes("Team")) items.splice(-1, 0, "Team");
    if (caps.store && !items.includes("Shop")) items.unshift("Shop");
    if (caps.tours && !items.includes("Tours")) items.unshift("Tours");
    if (caps.listings && !items.includes("Listings")) items.unshift("Listings");
    if ((caps.tracking || caps.trackingLive) && !items.includes("Track"))
      items.unshift("Track");
    return items;
  }, [b.nav, caps]);

  const style = {
    "--demo-accent": b.accent,
    "--demo-surface": b.surface,
    "--demo-ink": b.ink,
  } as React.CSSProperties;

  return (
    <div
      className="demo-site h-full overflow-y-auto text-[13px] leading-relaxed"
      style={{
        ...style,
        background: "var(--demo-surface)",
        color: "var(--demo-ink)",
      }}
    >
      <header className="sticky top-0 z-10 border-b border-black/10 bg-[var(--demo-surface)]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <button
            type="button"
            className="font-semibold tracking-tight"
            style={{ color: "var(--demo-ink)" }}
            onClick={() => setPath("home")}
          >
            {b.name}
          </button>
          <nav className="hidden flex-wrap items-center gap-3 sm:flex">
            {nav.map((item) => (
              <button
                key={item}
                type="button"
                className="text-[11px] uppercase tracking-[0.12em] opacity-70 hover:opacity-100"
                onClick={() => setPath(item.toLowerCase())}
              >
                {t(item, language)}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {caps.multilingual && (
              <button
                type="button"
                className="rounded border border-black/15 px-2 py-0.5 text-[10px] uppercase"
                onClick={() => onLanguage?.(language === "en" ? "sw" : "en")}
              >
                {language === "en" ? "SW" : "EN"}
              </button>
            )}
            {caps.search && (
              <span className="hidden rounded-full border border-black/10 px-2 py-0.5 text-[10px] opacity-60 sm:inline">
                Search
              </span>
            )}
            {caps.store && (
              <button
                type="button"
                className="text-[11px]"
                onClick={() => setPath("cart")}
              >
                Cart ({cart.length})
              </button>
            )}
          </div>
        </div>
      </header>

      {path === "home" && (
        <section className="px-5 pb-10 pt-8">
          <p
            className="text-[10px] uppercase tracking-[0.18em]"
            style={{ color: "var(--demo-accent)" }}
          >
            {b.hero.eyebrow}
          </p>
          <h1 className="mt-3 max-w-[16ch] text-3xl font-semibold tracking-tight sm:text-4xl">
            {language === "sw" ? "Karibu " + b.name : b.hero.title}
          </h1>
          <p className="mt-3 max-w-md text-sm opacity-75">
            {language === "sw"
              ? "Tovuti ya mfano — jaribu vipengele vilivyochaguliwa."
              : b.hero.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full px-4 py-2 text-xs font-medium text-white"
              style={{ background: "var(--demo-accent)" }}
              onClick={() => {
                if (caps.bookingApt || caps.bookingStaff) {
                  setBookingStep(1);
                  setBookingDone(false);
                  setPath("book");
                } else if (caps.reservations) {
                  setPath("reserve");
                } else if (caps.store) {
                  setPath("shop");
                } else if (caps.tours) {
                  setPath("tours");
                } else if (caps.listings) {
                  setPath("listings");
                } else if (caps.tracking || caps.trackingLive) {
                  setPath("track");
                } else if (caps.donate) {
                  setPath("donate");
                } else {
                  setPath("contact");
                }
              }}
            >
              {t(b.hero.cta, language)}
            </button>
            {caps.inquiry && (
              <button
                type="button"
                className="rounded-full border border-black/20 px-4 py-2 text-xs"
                onClick={() => setPath("enquiry")}
              >
                Enquire
              </button>
            )}
            {caps.socialLinks && (
              <span className="self-center text-[10px] opacity-50">
                Instagram · Facebook
              </span>
            )}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {b.services.map((s) => (
              <div key={s.name} className="border border-black/10 p-4">
                <div className="font-medium">{s.name}</div>
                <p className="mt-1 text-[12px] opacity-70">{s.blurb}</p>
                {s.priceLabel && (
                  <p className="mt-2 text-[11px] opacity-60">{s.priceLabel}</p>
                )}
              </div>
            ))}
          </div>

          {caps.gallery && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold">Gallery</h2>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {b.galleryLabels.map((g) => (
                  <div
                    key={g}
                    className="flex aspect-[4/3] items-end p-2 text-[10px] text-white"
                    style={{
                      background: `linear-gradient(135deg, ${b.accent}99, ${b.ink}88)`,
                    }}
                  >
                    {g}
                  </div>
                ))}
              </div>
            </div>
          )}

          {caps.menu && (
            <MenuBlock
              business={b}
              advanced={!!caps.menuAdvanced}
              ordering={!!caps.ordering}
              qr={!!caps.menuQr}
            />
          )}

          {caps.tours && (
            <ToursBlock business={b} itinerary={!!caps.itinerary} />
          )}

          {caps.listings && (
            <ListingsBlock
              business={b}
              filters={!!caps.listingFilters}
              map={!!caps.propertyMap}
              filterArea={filterArea}
              setFilterArea={setFilterArea}
            />
          )}

          {caps.store && b.products && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold">Shop</h2>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {b.products.map((p) => (
                  <div key={p.name} className="border border-black/10 p-3">
                    <div
                      className="mb-2 aspect-square"
                      style={{ background: `${b.accent}22` }}
                    />
                    <div className="text-[12px] font-medium">{p.name}</div>
                    <div className="text-[11px] opacity-60">{p.priceLabel}</div>
                    <button
                      type="button"
                      className="mt-2 text-[11px] underline"
                      onClick={() => setCart((c) => [...c, p])}
                    >
                      Add to cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(caps.tracking || caps.trackingLive) && (
            <div className="mt-10 border border-black/10 p-4">
              <h2 className="text-sm font-semibold">
                {caps.trackingLive ? "Live tracking" : "Track shipment"}
              </h2>
              <p className="mt-1 text-[12px] opacity-70">
                Try demo code{" "}
                <span className="font-mono">{b.trackingDemoCode}</span>
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  className="flex-1 border border-black/15 bg-white px-3 py-2 text-xs"
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  placeholder="Tracking number"
                />
                <button
                  type="button"
                  className="px-3 py-2 text-xs text-white"
                  style={{ background: "var(--demo-accent)" }}
                  onClick={() =>
                    setTrackResult(
                      trackInput.trim().toUpperCase() ===
                        b.trackingDemoCode.toUpperCase() ||
                        trackInput.length > 3,
                    )
                  }
                >
                  Track
                </button>
              </div>
              {trackResult && (
                <ol className="mt-4 space-y-2 text-[12px]">
                  <li>✓ Picked up — Dar warehouse</li>
                  <li>✓ In transit — corridor hub</li>
                  <li>
                    {caps.trackingLive ? "● Live: out for delivery" : "○ Out for delivery"}
                  </li>
                </ol>
              )}
            </div>
          )}

          {caps.team && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold">Team</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {b.team.map((m) => (
                  <div key={m.name} className="border border-black/10 p-3">
                    <div
                      className="mb-2 h-16 w-16 rounded-full"
                      style={{ background: `${b.accent}33` }}
                    />
                    <div className="font-medium">{m.name}</div>
                    <div className="text-[11px] opacity-60">{m.role}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {caps.practitioners && b.practitioners && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold">Practitioners</h2>
              <ul className="mt-3 space-y-2">
                {b.practitioners.map((p) => (
                  <li key={p.name} className="border border-black/10 px-3 py-2">
                    <span className="font-medium">{p.name}</span>
                    <span className="ml-2 text-[11px] opacity-60">
                      {p.specialty}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {caps.courses && b.courses && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold">Programs</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {b.courses.map((c) => (
                  <div key={c.name} className="border border-black/10 p-3">
                    <div className="font-medium">{c.name}</div>
                    <p className="text-[12px] opacity-70">{c.blurb}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {caps.programs && b.programs && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold">Our programs</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {b.programs.map((p) => (
                  <div key={p.name} className="border border-black/10 p-3">
                    <div className="font-medium">{p.name}</div>
                    <p className="text-[12px] opacity-70">{p.blurb}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {caps.map && (
            <div className="mt-10 border border-black/10 p-4">
              <h2 className="text-sm font-semibold">Find us</h2>
              <p className="mt-1 text-[12px] opacity-70">{b.city}</p>
              <div
                className="mt-3 flex h-28 items-center justify-center text-[11px] opacity-60"
                style={{ background: `${b.accent}15` }}
              >
                Map preview · {b.city}
              </div>
            </div>
          )}

          <footer className="mt-12 border-t border-black/10 pt-4 text-[10px] opacity-50">
            {b.name} · {b.email} · {b.phone}
            <span className="ml-2 rounded bg-black/5 px-1.5 py-0.5">
              DEMO MODE — not a real business
            </span>
          </footer>
        </section>
      )}

      {path === "book" && (caps.bookingApt || caps.bookingStaff) && (
        <BookingFlow
          business={b}
          staff={!!caps.bookingStaff}
          payments={!!caps.payments}
          step={bookingStep}
          setStep={setBookingStep}
          done={bookingDone}
          setDone={setBookingDone}
          onClose={() => setPath("home")}
        />
      )}

      {path === "reserve" && caps.reservations && (
        <div className="px-5 py-8">
          <h2 className="text-lg font-semibold">Reserve a table</h2>
          {!reserveDone ? (
            <form
              className="mt-4 max-w-sm space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setReserveDone(true);
              }}
            >
              <input className="w-full border px-3 py-2 text-xs" placeholder="Date" required />
              <input className="w-full border px-3 py-2 text-xs" placeholder="Time" required />
              <input className="w-full border px-3 py-2 text-xs" placeholder="Party size" required />
              <button
                type="submit"
                className="px-4 py-2 text-xs text-white"
                style={{ background: "var(--demo-accent)" }}
              >
                Confirm reservation
              </button>
            </form>
          ) : (
            <p className="mt-4 text-sm">
              Reservation confirmed (demo). No real booking was made.
            </p>
          )}
        </div>
      )}

      {path === "cart" && (
        <div className="px-5 py-8">
          <h2 className="text-lg font-semibold">Cart</h2>
          {cart.length === 0 ? (
            <p className="mt-2 text-sm opacity-70">Cart is empty.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {cart.map((c, i) => (
                <li key={`${c.name}-${i}`} className="flex justify-between border-b py-2 text-sm">
                  <span>{c.name}</span>
                  <span>{c.priceLabel}</span>
                </li>
              ))}
            </ul>
          )}
          {caps.payments && cart.length > 0 && (
            <button
              type="button"
              className="mt-4 px-4 py-2 text-xs text-white"
              style={{ background: "var(--demo-accent)" }}
              onClick={() => alert("Demo checkout only — no real payment.")}
            >
              Simulated checkout
            </button>
          )}
        </div>
      )}

      {path === "blog" && caps.blog && (
        <div className="space-y-4 px-5 py-8">
          <h2 className="text-lg font-semibold">Blog</h2>
          {["Seasonal tips", "Behind the scenes", "Client stories"].map((t) => (
            <article key={t} className="border border-black/10 p-4">
              <h3 className="font-medium">{t}</h3>
              <p className="mt-1 text-[12px] opacity-70">
                Sample article for {b.name}. Toggle Blog off to remove this section.
              </p>
            </article>
          ))}
        </div>
      )}

      {path === "enquiry" && (
        <div className="px-5 py-8">
          <h2 className="text-lg font-semibold">Enquiry</h2>
          <p className="mt-2 text-sm opacity-70">Demo form — messages are not sent.</p>
          <form className="mt-4 max-w-sm space-y-2" onSubmit={(e) => e.preventDefault()}>
            <input className="w-full border px-3 py-2 text-xs" placeholder="Name" />
            <input className="w-full border px-3 py-2 text-xs" placeholder="Email" />
            <select className="w-full border px-3 py-2 text-xs">
              <option>Residential buyer</option>
              <option>Municipality / utility</option>
              <option>Distributor / partner</option>
              <option>Commercial / institutional</option>
            </select>
            <textarea className="w-full border px-3 py-2 text-xs" placeholder="Message" rows={3} />
            <button type="submit" className="px-4 py-2 text-xs text-white" style={{ background: "var(--demo-accent)" }}>
              Send (demo)
            </button>
          </form>
        </div>
      )}

      {path === "products" && (
        <div className="px-5 py-8">
          <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--demo-accent)" }}>
            Products
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Product systems with institutional clarity.</h2>
          <p className="mt-2 max-w-lg text-sm opacity-70">
            Explore Credo’s portfolio with specs, use-cases, and a direct path to enquiry — not a generic product grid.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {(b.products ?? b.services.map((s) => ({ name: s.name, priceLabel: "Enquire" }))).map(
              (p) => (
                <div key={p.name} className="border border-black/10 p-4">
                  <div
                    className="mb-3 aspect-[16/9]"
                    style={{ background: `linear-gradient(135deg, ${b.accent}55, ${b.ink}88)` }}
                  />
                  <div className="font-medium">{p.name}</div>
                  <div className="mt-1 text-[11px] opacity-60">{p.priceLabel}</div>
                  <button
                    type="button"
                    className="mt-3 text-[11px] underline"
                    onClick={() => setPath("enquiry")}
                  >
                    Request details
                  </button>
                </div>
              ),
            )}
          </div>
        </div>
      )}

      {path === "solutions" && (
        <div className="px-5 py-8">
          <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--demo-accent)" }}>
            Solutions
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Audience-specific journeys.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { t: "Residential", d: "Solar cooling and home energy systems." },
              { t: "Municipal", d: "Smart utilities and infrastructure." },
              { t: "Partners", d: "Distributor and institutional pathways." },
            ].map((x) => (
              <div key={x.t} className="border border-black/10 p-4">
                <div className="font-medium">{x.t}</div>
                <p className="mt-1 text-[12px] opacity-70">{x.d}</p>
                <button
                  type="button"
                  className="mt-3 text-[11px] underline"
                  onClick={() => setPath("enquiry")}
                >
                  Start consultation
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {path === "projects" && (
        <div className="px-5 py-8">
          <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--demo-accent)" }}>
            Projects
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Proof architecture.</h2>
          <p className="mt-2 max-w-lg text-sm opacity-70">
            Structured project templates ready for Credo-supplied deployments — field narrative, outcomes, and partners.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {b.galleryLabels.map((g) => (
              <div key={g} className="border border-black/10">
                <div
                  className="aspect-[16/9]"
                  style={{ background: `linear-gradient(145deg, ${b.ink}, ${b.accent}99)` }}
                />
                <div className="p-4">
                  <div className="font-medium">{g} deployment</div>
                  <p className="mt-1 text-[12px] opacity-70">Case template · location · outcome</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {path === "about" && (
        <div className="px-5 py-8">
          <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--demo-accent)" }}>
            About
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Institutional trust, clearly told.</h2>
          <p className="mt-2 max-w-lg text-sm opacity-70">{b.tagline}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {b.team.map((m) => (
              <div key={m.name} className="border border-black/10 p-4">
                <div
                  className="mb-3 h-14 w-14 rounded-full"
                  style={{ background: `${b.accent}33` }}
                />
                <div className="font-medium">{m.name}</div>
                <div className="text-[11px] opacity-60">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {path === "contact" && (
        <div className="px-5 py-8">
          <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--demo-accent)" }}>
            Contact
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Segmented lead capture.</h2>
          <p className="mt-2 text-sm opacity-70">
            {b.city} · {b.email} · {b.phone}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {["Request a quote", "Partner with Credo", "Utility consultation", "Product support"].map(
              (label) => (
                <button
                  key={label}
                  type="button"
                  className="border border-black/10 px-4 py-4 text-left text-sm font-medium hover:border-black/30"
                  onClick={() => setPath("enquiry")}
                >
                  {label}
                </button>
              ),
            )}
          </div>
        </div>
      )}

      {path === "donate" && caps.donate && (
        <div className="px-5 py-8">
          <h2 className="text-lg font-semibold">Donate</h2>
          <p className="mt-2 text-sm opacity-70">Demo donation — no real payment.</p>
          <button
            type="button"
            className="mt-4 px-4 py-2 text-xs text-white"
            style={{ background: "var(--demo-accent)" }}
            onClick={() => alert("Demo donation only.")}
          >
            Give TSh 50,000 (demo)
          </button>
        </div>
      )}
    </div>
  );
}

function MenuBlock({
  business: b,
  advanced,
  ordering,
  qr,
}: {
  business: FictionalBusiness;
  advanced: boolean;
  ordering: boolean;
  qr: boolean;
}) {
  const [cat, setCat] = useState("all");
  if (!b.menu) return null;
  const cats = b.menu.map((m) => m.category);
  const items =
    cat === "all"
      ? b.menu.flatMap((m) => m.items.map((i) => ({ ...i, category: m.category })))
      : b.menu
          .filter((m) => m.category === cat)
          .flatMap((m) => m.items.map((i) => ({ ...i, category: m.category })));

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">
          {advanced ? "Menu · filterable" : "Menu"}
        </h2>
        {qr && (
          <span className="text-[10px] uppercase tracking-wider opacity-50">
            QR menu
          </span>
        )}
      </div>
      {advanced && (
        <div className="mt-2 flex flex-wrap gap-2">
          <button type="button" className="text-[11px] underline" onClick={() => setCat("all")}>
            All
          </button>
          {cats.map((c) => (
            <button key={c} type="button" className="text-[11px] underline" onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
      )}
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i.name} className="flex justify-between border-b border-black/5 py-2 text-sm">
            <span>
              {i.name}
              {advanced && (
                <span className="ml-2 text-[10px] opacity-50">{i.category}</span>
              )}
            </span>
            <span className="opacity-70">
              {i.priceLabel}
              {ordering && (
                <button type="button" className="ml-2 text-[10px] underline">
                  Order
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ToursBlock({
  business: b,
  itinerary,
}: {
  business: FictionalBusiness;
  itinerary: boolean;
}) {
  const [open, setOpen] = useState<string | null>(null);
  if (!b.tours) return null;
  return (
    <div className="mt-10">
      <h2 className="text-sm font-semibold">Tours</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {b.tours.map((t) => (
          <div key={t.name} className="border border-black/10 p-3">
            <div className="font-medium">{t.name}</div>
            <div className="text-[11px] opacity-60">
              {t.days} · {t.priceLabel}
            </div>
            {itinerary && (
              <button
                type="button"
                className="mt-2 text-[11px] underline"
                onClick={() => setOpen(open === t.name ? null : t.name)}
              >
                {open === t.name ? "Hide itinerary" : "View itinerary"}
              </button>
            )}
            {open === t.name && (
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-[11px] opacity-80">
                <li>Arrival & briefing</li>
                <li>Guided experience</li>
                <li>Return transfer</li>
              </ol>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ListingsBlock({
  business: b,
  filters,
  map,
  filterArea,
  setFilterArea,
}: {
  business: FictionalBusiness;
  filters: boolean;
  map: boolean;
  filterArea: string;
  setFilterArea: (v: string) => void;
}) {
  if (!b.properties) return null;
  const areas = [...new Set(b.properties.map((p) => p.area))];
  const list =
    filterArea === "all"
      ? b.properties
      : b.properties.filter((p) => p.area === filterArea);
  return (
    <div className="mt-10">
      <h2 className="text-sm font-semibold">Listings</h2>
      {filters && (
        <div className="mt-2 flex flex-wrap gap-2">
          <button type="button" className="text-[11px] underline" onClick={() => setFilterArea("all")}>
            All
          </button>
          {areas.map((a) => (
            <button key={a} type="button" className="text-[11px] underline" onClick={() => setFilterArea(a)}>
              {a}
            </button>
          ))}
        </div>
      )}
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {list.map((p) => (
          <div key={p.title} className="border border-black/10 p-3">
            <div
              className="mb-2 aspect-[16/10]"
              style={{ background: `${b.accent}22` }}
            />
            <div className="text-[12px] font-medium">{p.title}</div>
            <div className="text-[11px] opacity-60">{p.priceLabel}</div>
          </div>
        ))}
      </div>
      {map && (
        <div
          className="mt-3 flex h-24 items-center justify-center text-[11px] opacity-60"
          style={{ background: `${b.accent}12` }}
        >
          Map view of listings
        </div>
      )}
    </div>
  );
}

function BookingFlow({
  business: b,
  staff,
  payments,
  step,
  setStep,
  done,
  setDone,
  onClose,
}: {
  business: FictionalBusiness;
  staff: boolean;
  payments: boolean;
  step: number;
  setStep: (n: number) => void;
  done: boolean;
  setDone: (v: boolean) => void;
  onClose: () => void;
}) {
  return (
    <div className="px-5 py-8">
      <button type="button" className="text-[11px] opacity-60" onClick={onClose}>
        ← Back
      </button>
      <h2 className="mt-2 text-lg font-semibold">
        {staff ? "Book with your preferred stylist" : "Book appointment"}
      </h2>
      {done ? (
        <p className="mt-4 text-sm">
          Appointment confirmed (demo). No real booking was created.
          {payments && " Payment step available in demo mode."}
        </p>
      ) : (
        <div className="mt-4 max-w-sm space-y-3">
          {step >= 1 && (
            <label className="block text-xs">
              Service
              <select className="mt-1 w-full border px-2 py-2">
                {b.services.map((s) => (
                  <option key={s.name}>{s.name}</option>
                ))}
              </select>
            </label>
          )}
          {staff && step >= 1 && (
            <label className="block text-xs">
              Staff
              <select className="mt-1 w-full border px-2 py-2">
                {b.team.map((m) => (
                  <option key={m.name}>{m.name}</option>
                ))}
              </select>
            </label>
          )}
          {step >= 2 && (
            <>
              <input className="w-full border px-3 py-2 text-xs" placeholder="Date" />
              <input className="w-full border px-3 py-2 text-xs" placeholder="Time" />
            </>
          )}
          {step >= 3 && (
            <input className="w-full border px-3 py-2 text-xs" placeholder="Your name (demo)" />
          )}
          <button
            type="button"
            className="px-4 py-2 text-xs text-white"
            style={{ background: "var(--demo-accent)" }}
            onClick={() => {
              if (step < 3) setStep(step + 1);
              else setDone(true);
            }}
          >
            {step < 3 ? "Continue" : "Confirm (demo)"}
          </button>
        </div>
      )}
    </div>
  );
}
