"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { DemoChrome } from "@/components/site/DemoChrome";
import { cn } from "@/lib/cn";
import {
  agents,
  businessLeads,
  businessViewings,
  estimatePayment,
  formatPrice,
  getAgent,
  getListing,
  listings,
  locations,
  neighborhoodPlaces,
  performance,
  placeCategories,
  propertyTypes,
  viewingSlots,
  type Listing,
  type LocationId,
  type PlaceCategory,
  type PropertyType,
} from "./data";

type View =
  | "home"
  | "results"
  | "detail"
  | "saved"
  | "compare"
  | "estimator"
  | "neighborhood"
  | "book"
  | "booked"
  | "business";

type SearchState = {
  mode: "buy" | "rent";
  location: LocationId | "All";
  type: PropertyType | "All";
  priceMax: number;
};

function DemoBadge() {
  return (
    <p className="font-mono text-[10px] tracking-[0.16em] text-[#2F5D50]/70">
      KASI CONCEPT · DEMO DATA
    </p>
  );
}

export function NestDemo() {
  const [mode, setMode] = useState<"customer" | "business">("customer");
  const [view, setView] = useState<View>("home");
  const [search, setSearch] = useState<SearchState>({
    mode: "rent",
    location: "All",
    type: "All",
    priceMax: 1000000000,
  });
  const [listingId, setListingId] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>([
    "masaki-harbour-apt",
    "oyster-garden-villa",
  ]);
  const [compare, setCompare] = useState<string[]>([]);
  const [mobileMap, setMobileMap] = useState(false);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  // Neighborhood
  const [placeFilter, setPlaceFilter] = useState<PlaceCategory | "All">("All");
  const [nbLocation, setNbLocation] = useState<LocationId | "All">("Masaki");

  // Booking
  const [bookDate, setBookDate] = useState("2026-07-25");
  const [bookTime, setBookTime] = useState("10:30");
  const [bookType, setBookType] = useState<"In-person" | "Virtual">(
    "In-person",
  );
  const [bookName, setBookName] = useState("");
  const [bookConfirm, setBookConfirm] = useState<string | null>(null);

  // Estimator
  const [estDown, setEstDown] = useState(20);
  const [estYears, setEstYears] = useState(15);
  const [estRate, setEstRate] = useState(12);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [bizTab, setBizTab] = useState<
    "listings" | "leads" | "agents" | "viewings" | "performance"
  >("listings");

  const results = useMemo(() => {
    return listings.filter((l) => {
      if (l.mode !== search.mode) return false;
      if (search.location !== "All" && l.location !== search.location)
        return false;
      if (search.type !== "All" && l.type !== search.type) return false;
      if (l.price > search.priceMax) return false;
      return true;
    });
  }, [search]);

  const listing = listingId ? getListing(listingId) : null;
  const places = neighborhoodPlaces.filter((p) => {
    if (nbLocation !== "All" && p.location !== nbLocation) return false;
    if (placeFilter !== "All" && p.category !== placeFilter) return false;
    return true;
  });

  function runSearch(next?: Partial<SearchState>) {
    if (next) setSearch((s) => ({ ...s, ...next }));
    setView("results");
    setMode("customer");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openListing(id: string) {
    setListingId(id);
    setGalleryIdx(0);
    setView("detail");
    setSelectedPin(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleSaved(id: string) {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function toggleCompare(id: string) {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  function switchMode(next: "customer" | "business") {
    setMode(next);
    setView(next === "business" ? "business" : "home");
  }

  function submitBooking() {
    const id = `NV-${70 + Math.floor(Math.random() * 20)}`;
    setBookConfirm(id);
    setView("booked");
  }

  return (
    <div className="min-h-screen bg-[#F3F1EC] pt-12 text-[#1C2420]">
      <DemoChrome slug="nest" />

      <header className="sticky top-12 z-40 border-b border-[#2F5D50]/15 bg-[#F3F1EC]/92 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <button
            type="button"
            className="text-lg font-semibold tracking-[0.2em] text-[#2F5D50]"
            onClick={() => {
              setMode("customer");
              setView("home");
            }}
          >
            NEST
          </button>
          <nav className="hidden items-center gap-5 text-[11px] tracking-[0.14em] uppercase text-[#1C2420]/75 md:flex">
            <NavBtn
              active={view === "results" || view === "detail"}
              onClick={() => runSearch()}
            >
              Search
            </NavBtn>
            <NavBtn
              active={view === "neighborhood"}
              onClick={() => setView("neighborhood")}
            >
              Neighborhood
            </NavBtn>
            <NavBtn active={view === "saved"} onClick={() => setView("saved")}>
              Saved ({saved.length})
            </NavBtn>
            <NavBtn
              active={view === "compare"}
              onClick={() => setView("compare")}
            >
              Compare ({compare.length}/3)
            </NavBtn>
            <NavBtn
              active={view === "estimator"}
              onClick={() => setView("estimator")}
            >
              Estimator
            </NavBtn>
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-[#2F5D50]/25 p-0.5 text-[10px] tracking-wider uppercase">
              <button
                type="button"
                className={cn(
                  "rounded-full px-2.5 py-1",
                  mode === "customer" && "bg-[#2F5D50] text-white",
                )}
                onClick={() => switchMode("customer")}
              >
                Customer
              </button>
              <button
                type="button"
                className={cn(
                  "rounded-full px-2.5 py-1",
                  mode === "business" && "bg-[#2F5D50] text-white",
                )}
                onClick={() => switchMode("business")}
              >
                Business
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto border-t border-[#2F5D50]/10 px-4 py-2 md:hidden">
          {(
            [
              ["results", "Search"],
              ["neighborhood", "Explore"],
              ["saved", "Saved"],
              ["compare", "Compare"],
              ["estimator", "Pay"],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              className={cn(
                "shrink-0 px-3 py-1 text-[11px] tracking-wider uppercase",
                view === v && "bg-[#2F5D50] text-white",
              )}
              onClick={() => {
                setMode("customer");
                if (v === "results") runSearch();
                else setView(v);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-6">
        <div className="mb-6">
          <DemoBadge />
        </div>

        {mode === "business" || view === "business" ? (
          <BusinessView tab={bizTab} setTab={setBizTab} />
        ) : view === "home" ? (
          <HeroSearch
            search={search}
            setSearch={setSearch}
            onSearch={() => runSearch()}
            featured={listings.filter((l) => l.featured)}
            onOpen={openListing}
          />
        ) : view === "results" ? (
          <ResultsView
            results={results}
            search={search}
            setSearch={setSearch}
            onSearch={() => runSearch()}
            mobileMap={mobileMap}
            setMobileMap={setMobileMap}
            selectedPin={selectedPin}
            setSelectedPin={setSelectedPin}
            onOpen={openListing}
            saved={saved}
            compare={compare}
            onToggleSaved={toggleSaved}
            onToggleCompare={toggleCompare}
          />
        ) : view === "detail" && listing ? (
          <DetailView
            listing={listing}
            galleryIdx={galleryIdx}
            setGalleryIdx={setGalleryIdx}
            saved={saved.includes(listing.id)}
            inCompare={compare.includes(listing.id)}
            onToggleSaved={() => toggleSaved(listing.id)}
            onToggleCompare={() => toggleCompare(listing.id)}
            onBook={() => setView("book")}
            onEstimate={() => {
              setListingId(listing.id);
              setView("estimator");
            }}
            onNeighborhood={() => {
              setNbLocation(listing.location);
              setView("neighborhood");
            }}
          />
        ) : view === "saved" ? (
          <SavedView
            ids={saved}
            onOpen={openListing}
            onToggleSaved={toggleSaved}
            onToggleCompare={toggleCompare}
            compare={compare}
          />
        ) : view === "compare" ? (
          <CompareView
            ids={compare}
            onOpen={openListing}
            onRemove={(id) => toggleCompare(id)}
          />
        ) : view === "estimator" ? (
          <EstimatorView
            listing={listing ?? getListing(saved[0]) ?? listings[0]}
            down={estDown}
            setDown={setEstDown}
            years={estYears}
            setYears={setEstYears}
            rate={estRate}
            setRate={setEstRate}
            listingOptions={listings}
            listingId={listing?.id ?? saved[0] ?? listings[0].id}
            onSelectListing={(id) => setListingId(id)}
          />
        ) : view === "neighborhood" ? (
          <NeighborhoodView
            places={places}
            placeFilter={placeFilter}
            setPlaceFilter={setPlaceFilter}
            nbLocation={nbLocation}
            setNbLocation={setNbLocation}
            listings={listings.filter(
              (l) => nbLocation === "All" || l.location === nbLocation,
            )}
            onOpen={openListing}
          />
        ) : view === "book" && listing ? (
          <BookView
            listing={listing}
            date={bookDate}
            setDate={setBookDate}
            time={bookTime}
            setTime={setBookTime}
            type={bookType}
            setType={setBookType}
            name={bookName}
            setName={setBookName}
            onSubmit={submitBooking}
            onBack={() => setView("detail")}
          />
        ) : view === "booked" && bookConfirm && listing ? (
          <BookedView
            id={bookConfirm}
            listing={listing}
            date={bookDate}
            time={bookTime}
            type={bookType}
            onDone={() => setView("detail")}
          />
        ) : null}
      </main>
    </div>
  );
}

function NavBtn({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "hover:text-[#2F5D50]",
        active && "text-[#2F5D50] underline underline-offset-4",
      )}
    >
      {children}
    </button>
  );
}

function HeroSearch({
  search,
  setSearch,
  onSearch,
  featured,
  onOpen,
}: {
  search: SearchState;
  setSearch: (s: SearchState | ((p: SearchState) => SearchState)) => void;
  onSearch: () => void;
  featured: Listing[];
  onOpen: (id: string) => void;
}) {
  return (
    <div className="space-y-14">
      <section className="relative -mx-4 overflow-hidden md:mx-0 md:rounded-sm">
        <div className="relative min-h-[68vh]">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt="Dar es Salaam property"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C2420]/85 via-[#1C2420]/35 to-[#1C2420]/15" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
            <p className="font-mono text-[11px] tracking-[0.2em] text-white/75">
              REAL ESTATE · DAR ES SALAAM
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              FIND YOUR PLACE IN DAR.
            </h1>
            <p className="mt-4 max-w-lg text-sm text-white/80">
              Search Masaki to Kigamboni. Compare homes, explore neighborhoods,
              book a viewing.
            </p>

            <div className="mt-8 max-w-3xl border border-white/20 bg-[#F3F1EC]/95 p-4 text-[#1C2420] backdrop-blur md:p-5">
              <div className="mb-3 flex gap-2">
                {(["rent", "buy"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSearch((s) => ({ ...s, mode: m }))}
                    className={cn(
                      "px-4 py-2 text-[11px] tracking-[0.16em] uppercase",
                      search.mode === m
                        ? "bg-[#2F5D50] text-white"
                        : "border border-[#2F5D50]/25",
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <label className="text-xs">
                  <span className="text-[#1C2420]/55">Location</span>
                  <select
                    value={search.location}
                    onChange={(e) =>
                      setSearch((s) => ({
                        ...s,
                        location: e.target.value as LocationId | "All",
                      }))
                    }
                    className="mt-1 w-full border border-[#2F5D50]/20 bg-transparent px-2 py-2"
                  >
                    <option value="All">All areas</option>
                    {locations.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-xs">
                  <span className="text-[#1C2420]/55">Property type</span>
                  <select
                    value={search.type}
                    onChange={(e) =>
                      setSearch((s) => ({
                        ...s,
                        type: e.target.value as PropertyType | "All",
                      }))
                    }
                    className="mt-1 w-full border border-[#2F5D50]/20 bg-transparent px-2 py-2"
                  >
                    <option value="All">Any type</option>
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-xs sm:col-span-2 lg:col-span-1">
                  <span className="text-[#1C2420]/55">
                    Max price ·{" "}
                    {search.priceMax >= 1000000000
                      ? "Any"
                      : formatPrice(search.priceMax, search.mode)}
                  </span>
                  <input
                    type="range"
                    min={search.mode === "rent" ? 500000 : 100000000}
                    max={search.mode === "rent" ? 5000000 : 1000000000}
                    step={search.mode === "rent" ? 50000 : 10000000}
                    value={Math.min(
                      search.priceMax,
                      search.mode === "rent" ? 5000000 : 1000000000,
                    )}
                    onChange={(e) =>
                      setSearch((s) => ({
                        ...s,
                        priceMax: Number(e.target.value),
                      }))
                    }
                    className="mt-3 w-full"
                  />
                </label>
                <button
                  type="button"
                  onClick={onSearch}
                  className="bg-[#2F5D50] px-4 py-2.5 text-[12px] tracking-[0.16em] text-white uppercase sm:col-span-2 lg:col-span-1 lg:self-end"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-2 flex flex-wrap gap-2">
          {locations.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => {
                setSearch((s) => ({ ...s, location: loc }));
                onSearch();
              }}
              className="border border-[#2F5D50]/25 px-3 py-1.5 text-[11px] tracking-wider uppercase hover:bg-[#2F5D50] hover:text-white"
            >
              {loc}
            </button>
          ))}
        </div>
        <h2 className="mt-8 text-2xl font-semibold tracking-tight text-[#2F5D50]">
          Featured places
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => (
            <ListingCard key={l.id} listing={l} onOpen={onOpen} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ListingCard({
  listing,
  onOpen,
  saved,
  inCompare,
  onToggleSaved,
  onToggleCompare,
}: {
  listing: Listing;
  onOpen: (id: string) => void;
  saved?: boolean;
  inCompare?: boolean;
  onToggleSaved?: () => void;
  onToggleCompare?: () => void;
}) {
  return (
    <article className="group overflow-hidden border border-[#2F5D50]/12 bg-white/40">
      <button
        type="button"
        className="relative block aspect-[4/3] w-full overflow-hidden"
        onClick={() => onOpen(listing.id)}
      >
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <span className="absolute left-2 top-2 bg-[#F3F1EC]/95 px-2 py-1 text-[10px] tracking-wider uppercase">
          {listing.mode} · {listing.type}
        </span>
      </button>
      <div className="p-4">
        <button
          type="button"
          className="text-left font-medium"
          onClick={() => onOpen(listing.id)}
        >
          {listing.title}
        </button>
        <p className="mt-1 text-xs text-[#1C2420]/55">
          {listing.location} · {listing.beds} bed · {listing.baths} bath ·{" "}
          {listing.sqm} m²
        </p>
        <p className="mt-2 text-sm font-semibold text-[#2F5D50]">
          {formatPrice(listing.price, listing.mode)}
        </p>
        {(onToggleSaved || onToggleCompare) && (
          <div className="mt-3 flex gap-2">
            {onToggleSaved && (
              <button
                type="button"
                onClick={onToggleSaved}
                className="border border-[#2F5D50]/25 px-2.5 py-1 text-[10px] uppercase"
              >
                {saved ? "Saved" : "Save"}
              </button>
            )}
            {onToggleCompare && (
              <button
                type="button"
                onClick={onToggleCompare}
                className="border border-[#2F5D50]/25 px-2.5 py-1 text-[10px] uppercase"
              >
                {inCompare ? "In compare" : "Compare"}
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function MapCanvas({
  pins,
  selected,
  onSelect,
  accentPlaces,
}: {
  pins: { id: string; x: number; y: number; label: string }[];
  selected?: string | null;
  onSelect?: (id: string) => void;
  accentPlaces?: { id: string; x: number; y: number; label: string }[];
}) {
  return (
    <div className="relative aspect-square w-full overflow-hidden border border-[#2F5D50]/20 bg-[#E6E2D8] md:aspect-[4/3]">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="#2F5D50"
              strokeOpacity="0.08"
              strokeWidth="0.3"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        <path
          d="M5 70 Q30 55 50 60 T95 45"
          fill="none"
          stroke="#2F5D50"
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />
        <text
          x="8"
          y="12"
          fill="#2F5D50"
          fillOpacity="0.45"
          fontSize="3.5"
          fontFamily="monospace"
        >
          DAR MAP · DEMO
        </text>
      </svg>
      {accentPlaces?.map((p) => (
        <div
          key={p.id}
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C4A574]"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          title={p.label}
        />
      ))}
      {pins.map((p) => (
        <button
          key={p.id}
          type="button"
          title={p.label}
          onClick={() => onSelect?.(p.id)}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-full",
            selected === p.id && "z-10",
          )}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <span
            className={cn(
              "block h-0 w-0 border-x-[7px] border-b-[12px] border-x-transparent",
              selected === p.id
                ? "border-b-[#1C2420]"
                : "border-b-[#2F5D50]",
            )}
          />
          <span
            className={cn(
              "absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap bg-white/90 px-1.5 py-0.5 text-[9px]",
              selected !== p.id && "hidden md:group-hover:block",
              selected === p.id && "block",
            )}
          >
            {p.label}
          </span>
        </button>
      ))}
    </div>
  );
}

function ResultsView({
  results,
  search,
  setSearch,
  onSearch,
  mobileMap,
  setMobileMap,
  selectedPin,
  setSelectedPin,
  onOpen,
  saved,
  compare,
  onToggleSaved,
  onToggleCompare,
}: {
  results: Listing[];
  search: SearchState;
  setSearch: (s: SearchState | ((p: SearchState) => SearchState)) => void;
  onSearch: () => void;
  mobileMap: boolean;
  setMobileMap: (v: boolean) => void;
  selectedPin: string | null;
  setSelectedPin: (id: string | null) => void;
  onOpen: (id: string) => void;
  saved: string[];
  compare: string[];
  onToggleSaved: (id: string) => void;
  onToggleCompare: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[#2F5D50] md:text-3xl">
            {results.length} homes
          </h1>
          <p className="mt-1 text-sm text-[#1C2420]/55">
            {search.mode.toUpperCase()}
            {search.location !== "All" ? ` · ${search.location}` : ""}
            {search.type !== "All" ? ` · ${search.type}` : ""}
          </p>
        </div>
        <div className="flex gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMap(false)}
            className={cn(
              "px-3 py-1.5 text-[11px] uppercase",
              !mobileMap ? "bg-[#2F5D50] text-white" : "border border-[#2F5D50]/25",
            )}
          >
            Cards
          </button>
          <button
            type="button"
            onClick={() => setMobileMap(true)}
            className={cn(
              "px-3 py-1.5 text-[11px] uppercase",
              mobileMap ? "bg-[#2F5D50] text-white" : "border border-[#2F5D50]/25",
            )}
          >
            Map
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["rent", "buy"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setSearch((s) => ({ ...s, mode: m }));
              onSearch();
            }}
            className={cn(
              "px-3 py-1.5 text-[11px] uppercase",
              search.mode === m
                ? "bg-[#2F5D50] text-white"
                : "border border-[#2F5D50]/25",
            )}
          >
            {m}
          </button>
        ))}
        <select
          value={search.location}
          onChange={(e) => {
            setSearch((s) => ({
              ...s,
              location: e.target.value as LocationId | "All",
            }));
            onSearch();
          }}
          className="border border-[#2F5D50]/25 bg-transparent px-2 py-1.5 text-xs"
        >
          <option value="All">All locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select
          value={search.type}
          onChange={(e) => {
            setSearch((s) => ({
              ...s,
              type: e.target.value as PropertyType | "All",
            }));
            onSearch();
          }}
          className="border border-[#2F5D50]/25 bg-transparent px-2 py-1.5 text-xs"
        >
          <option value="All">All types</option>
          {propertyTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className={cn(mobileMap && "hidden md:block")}>
          {results.length === 0 ? (
            <p className="py-16 text-center text-sm text-[#1C2420]/50">
              No listings match. Try another location or raise the price cap.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((l) => (
                <ListingCard
                  key={l.id}
                  listing={l}
                  onOpen={(id) => {
                    setSelectedPin(id);
                    onOpen(id);
                  }}
                  saved={saved.includes(l.id)}
                  inCompare={compare.includes(l.id)}
                  onToggleSaved={() => onToggleSaved(l.id)}
                  onToggleCompare={() => onToggleCompare(l.id)}
                />
              ))}
            </div>
          )}
        </div>
        <div className={cn(!mobileMap && "hidden md:block", "lg:sticky lg:top-28 lg:self-start")}>
          <MapCanvas
            pins={results.map((l) => ({
              id: l.id,
              x: l.mapX,
              y: l.mapY,
              label: l.title,
            }))}
            selected={selectedPin}
            onSelect={(id) => {
              setSelectedPin(id);
              onOpen(id);
            }}
          />
          <p className="mt-2 text-[10px] tracking-wider text-[#1C2420]/45 uppercase">
            Demo map pins · not live GPS
          </p>
        </div>
      </div>
    </div>
  );
}

function DetailView({
  listing,
  galleryIdx,
  setGalleryIdx,
  saved,
  inCompare,
  onToggleSaved,
  onToggleCompare,
  onBook,
  onEstimate,
  onNeighborhood,
}: {
  listing: Listing;
  galleryIdx: number;
  setGalleryIdx: (n: number) => void;
  saved: boolean;
  inCompare: boolean;
  onToggleSaved: () => void;
  onToggleCompare: () => void;
  onBook: () => void;
  onEstimate: () => void;
  onNeighborhood: () => void;
}) {
  const agent = getAgent(listing.agentId);

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-4">
        <div className="relative aspect-[16/10] overflow-hidden md:col-span-3 md:aspect-auto md:min-h-[420px]">
          <Image
            src={listing.images[galleryIdx]}
            alt={listing.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 75vw"
            priority
          />
        </div>
        <div className="flex gap-2 overflow-x-auto md:flex-col">
          {listing.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setGalleryIdx(i)}
              className={cn(
                "relative h-20 w-28 shrink-0 overflow-hidden border md:h-28 md:w-full",
                galleryIdx === i
                  ? "border-[#2F5D50]"
                  : "border-transparent",
              )}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_300px]">
        <div>
          <p className="text-[11px] tracking-[0.16em] uppercase text-[#2F5D50]/70">
            {listing.location} · {listing.type} · For {listing.mode}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {listing.title}
          </h1>
          <p className="mt-3 text-2xl font-semibold text-[#2F5D50]">
            {formatPrice(listing.price, listing.mode)}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span>{listing.beds} bedrooms</span>
            <span>{listing.baths} bathrooms</span>
            <span>{listing.sqm} m²</span>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-[#1C2420]/75">
            {listing.description}
          </p>
          <div className="mt-6 border border-[#2F5D50]/15 bg-white/40 p-4">
            <p className="text-[11px] tracking-[0.14em] uppercase text-[#2F5D50]/70">
              Floor plan note
            </p>
            <p className="mt-2 text-sm">{listing.floorPlanNote}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Amenities</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {listing.amenities.map((a) => (
                <li
                  key={a}
                  className="border border-[#2F5D50]/20 px-3 py-1.5 text-xs"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Neighborhood</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#1C2420]/70">
              {listing.neighborhood}
            </p>
            <button
              type="button"
              onClick={onNeighborhood}
              className="mt-3 text-[12px] tracking-[0.12em] text-[#2F5D50] uppercase underline"
            >
              Explore the neighborhood
            </button>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          {agent && (
            <div className="border border-[#2F5D50]/15 bg-white/50 p-4">
              <p className="text-[11px] tracking-[0.14em] uppercase text-[#2F5D50]/70">
                Listing agent
              </p>
              <div className="mt-3 flex gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={agent.photo}
                    alt={agent.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="text-sm">
                  <p className="font-medium">{agent.name}</p>
                  <p className="text-[#1C2420]/55">{agent.phone}</p>
                  <p className="text-xs text-[#1C2420]/45">{agent.email}</p>
                </div>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={onBook}
            className="w-full bg-[#2F5D50] py-3.5 text-[12px] tracking-[0.16em] text-white uppercase"
          >
            Book a viewing
          </button>
          <button
            type="button"
            onClick={onEstimate}
            className="w-full border border-[#2F5D50] py-3 text-[12px] tracking-[0.14em] text-[#2F5D50] uppercase"
          >
            Payment estimator
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onToggleSaved}
              className="flex-1 border border-[#2F5D50]/25 py-2.5 text-[11px] uppercase"
            >
              {saved ? "Saved ✓" : "Save"}
            </button>
            <button
              type="button"
              onClick={onToggleCompare}
              className="flex-1 border border-[#2F5D50]/25 py-2.5 text-[11px] uppercase"
            >
              {inCompare ? "Compared" : "Compare"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SavedView({
  ids,
  onOpen,
  onToggleSaved,
  onToggleCompare,
  compare,
}: {
  ids: string[];
  onOpen: (id: string) => void;
  onToggleSaved: (id: string) => void;
  onToggleCompare: (id: string) => void;
  compare: string[];
}) {
  const items = ids.map((id) => getListing(id)).filter(Boolean) as Listing[];
  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#2F5D50]">Saved homes</h1>
      <p className="mt-2 text-sm text-[#1C2420]/55">{items.length} properties</p>
      {items.length === 0 ? (
        <p className="mt-10 text-sm text-[#1C2420]/50">
          No saved homes yet. Heart a listing from search results.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((l) => (
            <ListingCard
              key={l.id}
              listing={l}
              onOpen={onOpen}
              saved
              inCompare={compare.includes(l.id)}
              onToggleSaved={() => onToggleSaved(l.id)}
              onToggleCompare={() => onToggleCompare(l.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CompareView({
  ids,
  onOpen,
  onRemove,
}: {
  ids: string[];
  onOpen: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const items = ids.map((id) => getListing(id)).filter(Boolean) as Listing[];
  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#2F5D50]">Compare</h1>
      <p className="mt-2 text-sm text-[#1C2420]/55">
        Up to 3 homes side by side · {items.length}/3 selected
      </p>
      {items.length === 0 ? (
        <p className="mt-10 text-sm text-[#1C2420]/50">
          Add homes from search or detail pages using Compare.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr>
                <th className="pb-3 pr-4 text-[11px] uppercase text-[#1C2420]/45">
                  Spec
                </th>
                {items.map((l) => (
                  <th key={l.id} className="pb-3 pr-4 align-bottom">
                    <button
                      type="button"
                      className="relative mb-2 block aspect-[4/3] w-full max-w-[200px] overflow-hidden"
                      onClick={() => onOpen(l.id)}
                    >
                      <Image
                        src={l.images[0]}
                        alt={l.title}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </button>
                    <p className="font-medium">{l.title}</p>
                    <button
                      type="button"
                      onClick={() => onRemove(l.id)}
                      className="mt-1 text-[10px] uppercase text-[#1C2420]/45 underline"
                    >
                      Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Price", (l: Listing) => formatPrice(l.price, l.mode)],
                  ["Location", (l: Listing) => l.location],
                  ["Type", (l: Listing) => l.type],
                  ["Beds", (l: Listing) => String(l.beds)],
                  ["Baths", (l: Listing) => String(l.baths)],
                  ["Size", (l: Listing) => `${l.sqm} m²`],
                  ["Mode", (l: Listing) => l.mode],
                ] as const
              ).map(([label, fn]) => (
                <tr key={label} className="border-t border-[#2F5D50]/10">
                  <td className="py-2.5 pr-4 text-[#1C2420]/55">{label}</td>
                  {items.map((l) => (
                    <td key={l.id} className="py-2.5 pr-4 font-medium">
                      {fn(l)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function EstimatorView({
  listing,
  down,
  setDown,
  years,
  setYears,
  rate,
  setRate,
  listingOptions,
  listingId,
  onSelectListing,
}: {
  listing: Listing;
  down: number;
  setDown: (n: number) => void;
  years: number;
  setYears: (n: number) => void;
  rate: number;
  setRate: (n: number) => void;
  listingOptions: Listing[];
  listingId: string;
  onSelectListing: (id: string) => void;
}) {
  const est = estimatePayment({
    price: listing.price,
    mode: listing.mode,
    downPct: down,
    years,
    rate,
  });

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-semibold text-[#2F5D50]">
        Payment estimator
      </h1>
      <p className="mt-2 text-sm text-[#1C2420]/55">
        Demo calculator — not a bank quote.
      </p>
      <label className="mt-6 block text-sm">
        <span className="text-[11px] tracking-[0.14em] uppercase text-[#1C2420]/50">
          Property
        </span>
        <select
          value={listingId}
          onChange={(e) => onSelectListing(e.target.value)}
          className="mt-1.5 w-full border border-[#2F5D50]/25 bg-transparent px-3 py-2.5"
        >
          {listingOptions.map((l) => (
            <option key={l.id} value={l.id}>
              {l.title} · {formatPrice(l.price, l.mode)}
            </option>
          ))}
        </select>
      </label>

      {listing.mode === "buy" ? (
        <div className="mt-6 space-y-5">
          <label className="block text-sm">
            <span className="text-[#1C2420]/55">Down payment · {down}%</span>
            <input
              type="range"
              min={10}
              max={50}
              value={down}
              onChange={(e) => setDown(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </label>
          <label className="block text-sm">
            <span className="text-[#1C2420]/55">Term · {years} years</span>
            <input
              type="range"
              min={5}
              max={25}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </label>
          <label className="block text-sm">
            <span className="text-[#1C2420]/55">Rate · {rate}%</span>
            <input
              type="range"
              min={8}
              max={18}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </label>
        </div>
      ) : (
        <p className="mt-6 text-sm text-[#1C2420]/65">
          This is a rental listing. Estimator shows monthly rent commitment.
        </p>
      )}

      <div className="mt-8 border border-[#2F5D50]/20 bg-white/50 p-6">
        <p className="text-[11px] tracking-[0.14em] uppercase text-[#2F5D50]/70">
          Estimated monthly
        </p>
        <p className="mt-2 text-3xl font-semibold text-[#2F5D50]">
          TZS {est.monthly.toLocaleString("en-TZ")}
        </p>
        <p className="mt-2 text-xs text-[#1C2420]/50">{est.note}</p>
      </div>
    </div>
  );
}

function NeighborhoodView({
  places,
  placeFilter,
  setPlaceFilter,
  nbLocation,
  setNbLocation,
  listings: nearby,
  onOpen,
}: {
  places: typeof neighborhoodPlaces;
  placeFilter: PlaceCategory | "All";
  setPlaceFilter: (c: PlaceCategory | "All") => void;
  nbLocation: LocationId | "All";
  setNbLocation: (l: LocationId | "All") => void;
  listings: Listing[];
  onOpen: (id: string) => void;
}) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.16em] uppercase text-[#2F5D50]/70">
        Signature tool
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-[#2F5D50] md:text-4xl">
        Explore the neighborhood
      </h1>
      <p className="mt-3 max-w-xl text-sm text-[#1C2420]/60">
        Filter places that matter — dining, schools, fitness, shopping, beach and
        transport — with travel times from each area.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <select
          value={nbLocation}
          onChange={(e) =>
            setNbLocation(e.target.value as LocationId | "All")
          }
          className="border border-[#2F5D50]/25 bg-transparent px-3 py-2 text-sm"
        >
          <option value="All">All locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setPlaceFilter("All")}
          className={cn(
            "px-3 py-2 text-[11px] uppercase",
            placeFilter === "All"
              ? "bg-[#2F5D50] text-white"
              : "border border-[#2F5D50]/25",
          )}
        >
          All
        </button>
        {placeCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setPlaceFilter(c)}
            className={cn(
              "px-3 py-2 text-[11px] uppercase",
              placeFilter === c
                ? "bg-[#2F5D50] text-white"
                : "border border-[#2F5D50]/25",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <MapCanvas
          pins={nearby.map((l) => ({
            id: l.id,
            x: l.mapX,
            y: l.mapY,
            label: l.title,
          }))}
          onSelect={onOpen}
          accentPlaces={places.map((p) => ({
            id: p.id,
            x: p.mapX,
            y: p.mapY,
            label: `${p.name} · ${p.travelMin} min`,
          }))}
        />
        <div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-[#1C2420]/45">
            {places.length} places · gold dots on map
          </p>
          <ul className="mt-4 max-h-[420px] space-y-2 overflow-y-auto">
            {places.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between border border-[#2F5D50]/12 bg-white/40 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-[#1C2420]/50">
                    {p.category} · {p.location}
                  </p>
                </div>
                <span className="font-mono text-xs text-[#2F5D50]">
                  {p.travelMin} min
                </span>
              </li>
            ))}
            {places.length === 0 && (
              <p className="text-sm text-[#1C2420]/50">
                No places in this filter. Try another category.
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function BookView({
  listing,
  date,
  setDate,
  time,
  setTime,
  type,
  setType,
  name,
  setName,
  onSubmit,
  onBack,
}: {
  listing: Listing;
  date: string;
  setDate: (v: string) => void;
  time: string;
  setTime: (v: string) => void;
  type: "In-person" | "Virtual";
  setType: (v: "In-person" | "Virtual") => void;
  name: string;
  setName: (v: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto max-w-md">
      <button
        type="button"
        onClick={onBack}
        className="text-xs tracking-wider uppercase text-[#1C2420]/50"
      >
        ← Back to listing
      </button>
      <h1 className="mt-4 text-3xl font-semibold text-[#2F5D50]">
        Book a viewing
      </h1>
      <p className="mt-2 text-sm text-[#1C2420]/60">{listing.title}</p>

      <div className="mt-8 space-y-5">
        <label className="block text-sm">
          <span className="text-[11px] tracking-[0.14em] uppercase text-[#1C2420]/50">
            Your name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="mt-1.5 w-full border border-[#2F5D50]/25 bg-transparent px-3 py-2.5 outline-none focus:border-[#2F5D50]"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[11px] tracking-[0.14em] uppercase text-[#1C2420]/50">
            Date
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1.5 w-full border border-[#2F5D50]/25 bg-transparent px-3 py-2.5"
          />
        </label>
        <div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-[#1C2420]/50">
            Time
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {viewingSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setTime(slot)}
                className={cn(
                  "px-3 py-2 text-sm",
                  time === slot
                    ? "bg-[#2F5D50] text-white"
                    : "border border-[#2F5D50]/25",
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-[#1C2420]/50">
            Viewing type
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(["In-person", "Virtual"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={cn(
                  "py-3 text-sm",
                  type === t
                    ? "bg-[#2F5D50] text-white"
                    : "border border-[#2F5D50]/25",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="w-full bg-[#2F5D50] py-3.5 text-[12px] tracking-[0.16em] text-white uppercase"
        >
          Confirm viewing
        </button>
      </div>
    </div>
  );
}

function BookedView({
  id,
  listing,
  date,
  time,
  type,
  onDone,
}: {
  id: string;
  listing: Listing;
  date: string;
  time: string;
  type: string;
  onDone: () => void;
}) {
  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <p className="text-[11px] tracking-[0.18em] uppercase text-[#2F5D50]/70">
        Viewing confirmed
      </p>
      <h1 className="mt-3 text-3xl font-semibold">You&apos;re booked.</h1>
      <p className="mt-4 text-sm text-[#1C2420]/65">
        Confirmation <span className="font-medium text-[#1C2420]">{id}</span> for{" "}
        {listing.title}.
      </p>
      <p className="mt-2 text-sm">
        {date} · {time} · {type}
      </p>
      <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-[#1C2420]/40">
        DEMO DATA · FICTIONAL BOOKING
      </p>
      <button
        type="button"
        onClick={onDone}
        className="mt-8 bg-[#2F5D50] px-6 py-3 text-[12px] tracking-[0.14em] text-white uppercase"
      >
        Back to listing
      </button>
    </div>
  );
}

function BusinessView({
  tab,
  setTab,
}: {
  tab: "listings" | "leads" | "agents" | "viewings" | "performance";
  setTab: (t: typeof tab) => void;
}) {
  const tabs = [
    ["listings", "Listings"],
    ["leads", "Leads"],
    ["agents", "Agents"],
    ["viewings", "Viewings"],
    ["performance", "Performance"],
  ] as const;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] tracking-[0.16em] uppercase text-[#2F5D50]/70">
            Agency ops
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-[#2F5D50]">
            Business
          </h1>
        </div>
        <DemoBadge />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Active listings" value={String(performance.listingsActive)} />
        <Stat label="Leads this week" value={String(performance.leadsThisWeek)} />
        <Stat label="Viewings booked" value={String(performance.viewingsBooked)} />
        <Stat label="Conversion" value={performance.conversion} />
      </div>

      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-[#2F5D50]/15">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "shrink-0 px-3 py-2 text-[11px] tracking-[0.12em] uppercase",
              tab === id && "border-b-2 border-[#2F5D50] text-[#2F5D50]",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "listings" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="text-[11px] uppercase text-[#1C2420]/45">
                <tr>
                  <th className="pb-2 pr-3 font-medium">Property</th>
                  <th className="pb-2 pr-3 font-medium">Area</th>
                  <th className="pb-2 pr-3 font-medium">Mode</th>
                  <th className="pb-2 font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((l) => (
                  <tr key={l.id} className="border-t border-[#2F5D50]/10">
                    <td className="py-2.5 pr-3">{l.title}</td>
                    <td className="py-2.5 pr-3">{l.location}</td>
                    <td className="py-2.5 pr-3 capitalize">{l.mode}</td>
                    <td className="py-2.5">{formatPrice(l.price, l.mode)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === "leads" && (
          <ul className="space-y-3">
            {businessLeads.map((lead) => (
              <li
                key={lead.id}
                className="flex flex-wrap items-center justify-between gap-2 border border-[#2F5D50]/12 bg-white/40 p-4 text-sm"
              >
                <div>
                  <p className="font-medium">
                    {lead.name}{" "}
                    <span className="font-mono text-xs text-[#1C2420]/40">
                      {lead.id}
                    </span>
                  </p>
                  <p className="text-xs text-[#1C2420]/55">
                    {lead.interest} · {lead.agent}
                  </p>
                </div>
                <div className="text-right">
                  <span className="border border-[#2F5D50]/30 px-2 py-1 text-[10px] uppercase">
                    {lead.status}
                  </span>
                  <p className="mt-1 text-xs text-[#1C2420]/45">{lead.date}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {tab === "agents" && (
          <div className="grid gap-4 sm:grid-cols-3">
            {agents.map((a) => (
              <div
                key={a.id}
                className="border border-[#2F5D50]/12 bg-white/40 p-4 text-sm"
              >
                <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={a.photo}
                    alt={a.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <p className="mt-3 text-center font-medium">{a.name}</p>
                <p className="text-center text-xs text-[#1C2420]/50">
                  {a.listings} listings
                </p>
                <p className="mt-2 text-center text-xs">{a.phone}</p>
              </div>
            ))}
          </div>
        )}
        {tab === "viewings" && (
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="text-[11px] uppercase text-[#1C2420]/45">
              <tr>
                <th className="pb-2 pr-3 font-medium">ID</th>
                <th className="pb-2 pr-3 font-medium">Property</th>
                <th className="pb-2 pr-3 font-medium">Client</th>
                <th className="pb-2 pr-3 font-medium">When</th>
                <th className="pb-2 font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {businessViewings.map((v) => (
                <tr key={v.id} className="border-t border-[#2F5D50]/10">
                  <td className="py-2.5 pr-3 font-mono text-xs">{v.id}</td>
                  <td className="py-2.5 pr-3">{v.property}</td>
                  <td className="py-2.5 pr-3">{v.client}</td>
                  <td className="py-2.5 pr-3">{v.when}</td>
                  <td className="py-2.5">{v.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "performance" && (
          <div className="grid gap-4 md:grid-cols-2">
            <Stat
              label="Avg days on market"
              value={String(performance.avgDaysOnMarket)}
            />
            <Stat label="Lead → viewing" value={performance.conversion} />
            <div className="border border-[#2F5D50]/12 bg-white/40 p-5 md:col-span-2">
              <p className="text-[11px] tracking-[0.14em] uppercase text-[#2F5D50]/70">
                Pipeline this week
              </p>
              <div className="mt-4 flex h-10 overflow-hidden text-[10px] text-white">
                <div className="flex w-[35%] items-center justify-center bg-[#2F5D50]">
                  New 35%
                </div>
                <div className="flex w-[28%] items-center justify-center bg-[#2F5D50]/70">
                  Contacted
                </div>
                <div className="flex w-[22%] items-center justify-center bg-[#2F5D50]/45">
                  Viewing
                </div>
                <div className="flex w-[15%] items-center justify-center bg-[#C4A574] text-[#1C2420]">
                  Offer
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#2F5D50]/12 bg-white/40 p-4">
      <p className="text-[10px] tracking-[0.14em] uppercase text-[#1C2420]/45">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold tabular-nums text-[#2F5D50]">
        {value}
      </p>
    </div>
  );
}
