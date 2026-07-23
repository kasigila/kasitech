"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { DemoChrome } from "@/components/site/DemoChrome";
import {
  events as initialEvents,
  formatTzs,
  getFeaturedEvent,
  groteskStyle,
  noirColors,
  seedGuestList,
  seedTicketSales,
  vipTables as initialTables,
  type EventItem,
  type GuestListEntry,
  type TicketSale,
  type TicketTierId,
  type VipTable,
} from "@/demos/noir/data";

type ViewMode = "customer" | "business";
type CustomerSection = "home" | "events" | "tickets" | "vip";

type IssuedTicket = {
  id: string;
  eventCode: string;
  tier: string;
  guest: string;
  amount: number;
};

type VipReservation = {
  id: string;
  tableId: string;
  partySize: number;
  name: string;
  minSpend: number;
};

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

/** Pseudo-QR pattern from ticket ID: visual demo only */
function DemoQr({ seed }: { seed: string }) {
  const cells = useMemo(() => {
    const size = 21;
    const grid: boolean[][] = [];
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    for (let y = 0; y < size; y++) {
      const row: boolean[] = [];
      for (let x = 0; x < size; x++) {
        const inFinder =
          (x < 7 && y < 7) ||
          (x > size - 8 && y < 7) ||
          (x < 7 && y > size - 8);
        if (inFinder) {
          const edge = x === 0 || y === 0 || x === 6 || y === 6 || x === size - 1 || y === size - 1 ||
            (x >= size - 7 && (x === size - 7 || y === 0 || y === 6)) ||
            (y >= size - 7 && (y === size - 7 || x === 0 || x === 6));
          const inner =
            (x >= 2 && x <= 4 && y >= 2 && y <= 4) ||
            (x >= size - 5 && x <= size - 3 && y >= 2 && y <= 4) ||
            (x >= 2 && x <= 4 && y >= size - 5 && y <= size - 3);
          row.push(edge || inner);
        } else {
          const n = (h ^ (x * 73856093) ^ (y * 19349663)) >>> 0;
          row.push(n % 3 !== 0);
        }
      }
      grid.push(row);
    }
    return grid;
  }, [seed]);

  const size = cells.length;
  const cell = 6;
  const dim = size * cell;

  return (
    <svg
      width={dim}
      height={dim}
      viewBox={`0 0 ${dim} ${dim}`}
      className="bg-white"
      aria-label={`Demo QR for ${seed}`}
    >
      {cells.map((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect
              key={`${x}-${y}`}
              x={x * cell}
              y={y * cell}
              width={cell}
              height={cell}
              fill="#0A0A0A"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

function Countdown({ targetISO }: { targetISO: string }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, new Date(targetISO).getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const parts = [
    ["D", days],
    ["H", hours],
    ["M", mins],
    ["S", secs],
  ] as const;

  return (
    <div className="flex gap-3">
      {parts.map(([label, value]) => (
        <div key={label} className="min-w-[3.25rem] text-center">
          <p
            className="text-3xl tabular-nums text-[#FF2A2A] sm:text-4xl"
            style={groteskStyle}
          >
            {String(value).padStart(2, "0")}
          </p>
          <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-[#6B6B6B]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function NoirDemo() {
  const [viewMode, setViewMode] = useState<ViewMode>("customer");
  const [section, setSection] = useState<CustomerSection>("home");
  const [eventList, setEventList] = useState<EventItem[]>(initialEvents);
  const [selectedEventId, setSelectedEventId] = useState(getFeaturedEvent().id);
  const [selectedTier, setSelectedTier] = useState<TicketTierId>("early-bird");
  const [guestName, setGuestName] = useState("");
  const [payOpen, setPayOpen] = useState(false);
  const [issuedTicket, setIssuedTicket] = useState<IssuedTicket | null>(null);

  const [tables, setTables] = useState<VipTable[]>(initialTables);
  const [selectedTableId, setSelectedTableId] = useState<string | null>("A07");
  const [vipParty, setVipParty] = useState(6);
  const [vipName, setVipName] = useState("");
  const [vipConfirm, setVipConfirm] = useState<VipReservation | null>(null);

  const [sales, setSales] = useState<TicketSale[]>(seedTicketSales);
  const [guests, setGuests] = useState<GuestListEntry[]>(seedGuestList);
  const [vipReservations, setVipReservations] = useState<VipReservation[]>([]);

  const featured = eventList.find((e) => e.featured) ?? eventList[0];
  const selectedEvent =
    eventList.find((e) => e.id === selectedEventId) ?? featured;
  const selectedTable = tables.find((t) => t.id === selectedTableId) ?? null;

  const ticketRevenue = useMemo(
    () => sales.reduce((s, t) => s + t.amount, 0),
    [sales],
  );
  const vipRevenue = useMemo(
    () => vipReservations.reduce((s, r) => s + r.minSpend, 0) + 750000,
    [vipReservations],
  );
  const attendance = guests.filter((g) => g.checkedIn).length;

  function goTickets(eventId?: string) {
    if (eventId) setSelectedEventId(eventId);
    setSection("tickets");
    setViewMode("customer");
    setIssuedTicket(null);
  }

  function purchaseTicket() {
    if (!guestName.trim()) return;
    const tier = selectedEvent.tiers.find((t) => t.id === selectedTier);
    if (!tier || tier.remaining <= 0) return;
    const id = uid("TIX");
    setEventList((prev) =>
      prev.map((ev) =>
        ev.id !== selectedEvent.id
          ? ev
          : {
              ...ev,
              tiers: ev.tiers.map((t) =>
                t.id === selectedTier
                  ? { ...t, remaining: Math.max(0, t.remaining - 1) }
                  : t,
              ),
            },
      ),
    );
    setSales((prev) => [
      {
        id,
        eventId: selectedEvent.id,
        tier: tier.name,
        guest: guestName.trim(),
        amount: tier.price,
        time: new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ...prev,
    ]);
    setGuests((prev) => [
      {
        id: uid("G"),
        name: guestName.trim(),
        tier: tier.name,
        checkedIn: false,
      },
      ...prev,
    ]);
    setIssuedTicket({
      id,
      eventCode: selectedEvent.code,
      tier: tier.name,
      guest: guestName.trim(),
      amount: tier.price,
    });
    setPayOpen(false);
  }

  function reserveTable() {
    if (!selectedTable || selectedTable.status !== "AVAILABLE") return;
    if (!vipName.trim()) return;
    if (vipParty > selectedTable.capacity) return;
    const reservation: VipReservation = {
      id: uid("VIP"),
      tableId: selectedTable.id,
      partySize: vipParty,
      name: vipName.trim(),
      minSpend: selectedTable.minSpend,
    };
    setTables((prev) =>
      prev.map((t) =>
        t.id === selectedTable.id ? { ...t, status: "RESERVED" } : t,
      ),
    );
    setVipReservations((prev) => [reservation, ...prev]);
    setGuests((prev) => [
      {
        id: uid("G"),
        name: vipName.trim(),
        tier: "VIP Table",
        checkedIn: false,
        table: selectedTable.id,
      },
      ...prev,
    ]);
    setVipConfirm(reservation);
  }

  const nav = (
    <nav className="flex flex-wrap items-center gap-1 text-[11px] uppercase tracking-[0.16em]">
      {(
        [
          ["home", "Home"],
          ["events", "Events"],
          ["tickets", "Tickets"],
          ["vip", "VIP"],
        ] as const
      ).map(([id, label]) => (
        <button
          key={id}
          type="button"
          onClick={() => {
            setSection(id);
            setViewMode("customer");
          }}
          className={`px-3 py-2 transition ${
            viewMode === "customer" && section === id
              ? "text-[#FF2A2A]"
              : "text-[#C8C8C8]/70 hover:text-[#C8C8C8]"
          }`}
        >
          {label}
        </button>
      ))}
      <button
        type="button"
        onClick={() =>
          setViewMode(viewMode === "business" ? "customer" : "business")
        }
        className={`ml-2 border px-3 py-1.5 transition ${
          viewMode === "business"
            ? "border-[#FF2A2A] bg-[#FF2A2A] text-black"
            : "border-[#C8C8C8]/35 text-[#C8C8C8]/80 hover:border-[#FF2A2A]"
        }`}
      >
        {viewMode === "business" ? "Customer View" : "Business View"}
      </button>
    </nav>
  );

  return (
    <div
      className="min-h-screen pt-12"
      style={{ background: noirColors.black, color: noirColors.silver }}
    >
      <DemoChrome slug="noir" />

      <header className="sticky top-12 z-40 border-b border-white/10 bg-black/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => {
              setViewMode("customer");
              setSection("home");
            }}
            className="text-left"
          >
            <p className="text-2xl leading-none text-white" style={groteskStyle}>
              NOIR
            </p>
            <p className="mt-0.5 font-mono text-[10px] tracking-[0.2em] text-[#6B6B6B]">
              KASI CONCEPT / 003
            </p>
          </button>
          {nav}
        </div>
      </header>

      {viewMode === "customer" && section === "home" && (
        <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden">
          <Image
            src={featured.poster}
            alt={`${featured.code} event flash photography`}
            fill
            priority
            className="object-cover opacity-70"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/40" />
          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col justify-end px-4 pb-14 pt-24">
            <p className="font-mono text-[12px] tracking-[0.22em] text-[#FF2A2A]">
              {featured.dateLabel}
            </p>
            <h1
              className="mt-2 text-6xl leading-none text-white sm:text-8xl md:text-9xl"
              style={groteskStyle}
            >
              {featured.code}
            </h1>
            <p className="mt-4 max-w-lg text-lg text-[#C8C8C8]">
              {featured.artist}
            </p>
            <p className="mt-1 font-mono text-xs tracking-[0.16em] text-[#6B6B6B]">
              {featured.city.toUpperCase()} · {featured.venue.toUpperCase()}
            </p>
            <div className="mt-8">
              <Countdown targetISO={featured.dateISO} />
            </div>
            <button
              type="button"
              onClick={() => goTickets(featured.id)}
              className="mt-10 w-fit bg-[#FF2A2A] px-8 py-4 text-sm text-black"
              style={groteskStyle}
            >
              Tickets
            </button>
          </div>
        </section>
      )}

      {viewMode === "customer" && section === "events" && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#FF2A2A]">
            EVENTS
          </p>
          <h2 className="mt-2 text-4xl text-white sm:text-5xl" style={groteskStyle}>
            Nights on the board
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eventList.map((ev) => (
              <article
                key={ev.id}
                className="group border border-white/10 bg-[#111111]"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={ev.poster}
                    alt={`${ev.code} poster`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <p
                    className="absolute bottom-3 left-3 text-2xl text-white"
                    style={groteskStyle}
                  >
                    {ev.code}
                  </p>
                </div>
                <div className="space-y-2 p-4">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-[#FF2A2A]">
                    {ev.dateLabel} · {ev.time}
                  </p>
                  <p className="text-sm text-[#C8C8C8]">{ev.artist}</p>
                  <p className="text-xs text-[#6B6B6B]">
                    Dress · {ev.dressCode}
                  </p>
                  <p className="text-xs text-[#6B6B6B]">Age · {ev.age}</p>
                  <p className="text-xs text-[#6B6B6B]">
                    VIP · {ev.vipAvailable ? "Tables open" : "Closed"}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {ev.tiers.map((t) => (
                      <span
                        key={t.id}
                        className="border border-white/15 px-2 py-0.5 font-mono text-[9px] tracking-wider text-[#C8C8C8]/80"
                      >
                        {t.name} {formatTzs(t.price)}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => goTickets(ev.id)}
                    disabled={ev.tiers.every((t) => t.remaining === 0)}
                    className="mt-2 w-full bg-[#FF2A2A] py-2.5 text-xs text-black disabled:cursor-not-allowed disabled:bg-[#3a1515] disabled:text-[#6B6B6B]"
                    style={groteskStyle}
                  >
                    {ev.tiers.every((t) => t.remaining === 0)
                      ? "Sold out"
                      : "Get tickets"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {viewMode === "customer" && section === "tickets" && (
        <section className="mx-auto max-w-3xl px-4 py-10">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#FF2A2A]">
            TICKETING
          </p>
          <h2 className="mt-2 text-4xl text-white" style={groteskStyle}>
            {selectedEvent.code}
          </h2>
          <p className="mt-2 text-sm text-[#C8C8C8]">{selectedEvent.artist}</p>

          <label className="mt-6 block">
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#6B6B6B]">
              EVENT
            </span>
            <select
              value={selectedEventId}
              onChange={(e) => {
                setSelectedEventId(e.target.value);
                setIssuedTicket(null);
              }}
              className="mt-2 w-full border border-white/15 bg-[#161616] px-3 py-3 text-sm outline-none focus:border-[#FF2A2A]"
            >
              {eventList.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.code}: {ev.dateLabel}
                </option>
              ))}
            </select>
          </label>

          {issuedTicket ? (
            <div className="mt-8 border border-[#FF2A2A] bg-[#111111] p-6">
              <p className="font-mono text-[11px] tracking-[0.18em] text-[#FF2A2A]">
                ENTRY PASS ISSUED
              </p>
              <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <DemoQr seed={issuedTicket.id} />
                <div>
                  <p className="text-2xl text-white" style={groteskStyle}>
                    {issuedTicket.id}
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-[#C8C8C8]">
                    <li>{issuedTicket.eventCode}</li>
                    <li>{issuedTicket.tier}</li>
                    <li>{issuedTicket.guest}</li>
                    <li className="font-mono text-[#FF2A2A]">
                      {formatTzs(issuedTicket.amount)}
                    </li>
                  </ul>
                  <p className="mt-4 text-xs text-[#6B6B6B]">
                    Demo QR pattern: fictional ticket, no live venue scan.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIssuedTicket(null);
                      setGuestName("");
                    }}
                    className="mt-4 border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.14em]"
                  >
                    Buy another
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-8 space-y-3">
                {selectedEvent.tiers.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    disabled={tier.remaining <= 0}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`w-full border p-4 text-left transition ${
                      selectedTier === tier.id
                        ? "border-[#FF2A2A] bg-[#FF2A2A]/10"
                        : "border-white/10 bg-[#111111]"
                    } disabled:opacity-40`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg text-white" style={groteskStyle}>
                          {tier.name}
                        </p>
                        <ul className="mt-2 space-y-0.5 text-xs text-[#6B6B6B]">
                          {tier.perks.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm text-[#FF2A2A]">
                          {formatTzs(tier.price)}
                        </p>
                        <p className="mt-1 font-mono text-[10px] text-[#6B6B6B]">
                          {tier.remaining} left
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <label className="mt-6 block">
                <span className="font-mono text-[10px] tracking-[0.16em] text-[#6B6B6B]">
                  GUEST NAME
                </span>
                <input
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Name on ticket"
                  className="mt-2 w-full border border-white/15 bg-[#161616] px-3 py-3 text-sm outline-none placeholder:text-[#6B6B6B] focus:border-[#FF2A2A]"
                />
              </label>

              <button
                type="button"
                disabled={
                  !guestName.trim() ||
                  (selectedEvent.tiers.find((t) => t.id === selectedTier)
                    ?.remaining ?? 0) <= 0
                }
                onClick={() => setPayOpen(true)}
                className="mt-6 w-full bg-[#FF2A2A] py-3.5 text-sm text-black disabled:cursor-not-allowed disabled:opacity-40"
                style={groteskStyle}
              >
                Demo payment
              </button>
            </>
          )}

          {payOpen && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-4 sm:items-center">
              <div className="w-full max-w-md border border-[#FF2A2A]/60 bg-[#0A0A0A] p-6">
                <p className="font-mono text-[11px] tracking-[0.18em] text-[#FF2A2A]">
                  DEMO PAYMENT
                </p>
                <p className="mt-3 text-sm text-[#C8C8C8]">
                  No real charge. Confirm to mint a demo QR ticket.
                </p>
                <p className="mt-4 font-mono text-lg text-[#FF2A2A]">
                  {formatTzs(
                    selectedEvent.tiers.find((t) => t.id === selectedTier)
                      ?.price ?? 0,
                  )}
                </p>
                <div className="mt-6 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPayOpen(false)}
                    className="flex-1 border border-white/20 py-3 text-xs uppercase tracking-[0.12em]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={purchaseTicket}
                    className="flex-1 bg-[#FF2A2A] py-3 text-xs text-black"
                    style={groteskStyle}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {viewMode === "customer" && section === "vip" && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#FF2A2A]">
            VIP SIGNATURE
          </p>
          <h2 className="mt-2 text-4xl text-white sm:text-5xl" style={groteskStyle}>
            Floor plan
          </h2>
          <p className="mt-3 max-w-xl text-sm text-[#C8C8C8]/80">
            Select table A07: 6 people, TZS 750,000 minimum, AVAILABLE: then
            reserve. On mobile, use the list below the map.
          </p>

          {vipConfirm ? (
            <div className="mt-8 max-w-xl border border-[#FF2A2A] bg-[#111111] p-6">
              <p className="font-mono text-[11px] tracking-[0.18em] text-[#FF2A2A]">
                VIP TABLE CONFIRMED
              </p>
              <p className="mt-3 text-3xl text-white" style={groteskStyle}>
                {vipConfirm.id}
              </p>
              <ul className="mt-4 space-y-1 text-sm text-[#C8C8C8]">
                <li>
                  Table {vipConfirm.tableId} · party of {vipConfirm.partySize}
                </li>
                <li>{vipConfirm.name}</li>
                <li className="font-mono text-[#FF2A2A]">
                  Min spend {formatTzs(vipConfirm.minSpend)}
                </li>
              </ul>
              <button
                type="button"
                onClick={() => {
                  setVipConfirm(null);
                  setVipName("");
                  setSelectedTableId("A07");
                }}
                className="mt-6 border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.14em]"
              >
                Reserve another
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              {/* Desktop / tablet floor plan */}
              <div className="relative hidden aspect-[4/3] border border-white/15 bg-[#0d0d0d] md:block">
                {/* Zones */}
                <div
                  className="absolute border border-dashed border-white/20 bg-[#FF2A2A]/5"
                  style={{ left: "28%", top: "42%", width: "44%", height: "22%" }}
                >
                  <span className="absolute left-2 top-1 font-mono text-[9px] tracking-[0.16em] text-[#FF2A2A]/80">
                    DANCE FLOOR
                  </span>
                </div>
                <div
                  className="absolute border border-white/20 bg-white/5"
                  style={{ left: "38%", top: "8%", width: "24%", height: "10%" }}
                >
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-[0.16em] text-[#C8C8C8]">
                    DJ
                  </span>
                </div>
                <div
                  className="absolute border border-white/20 bg-white/5"
                  style={{ left: "4%", top: "48%", width: "12%", height: "28%" }}
                >
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-[0.16em] text-[#C8C8C8] [writing-mode:vertical-rl]">
                    BAR
                  </span>
                </div>
                <div
                  className="absolute border border-white/20 bg-white/5"
                  style={{ right: "4%", top: "48%", width: "12%", height: "28%" }}
                >
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-[0.16em] text-[#C8C8C8] [writing-mode:vertical-rl]">
                    BAR
                  </span>
                </div>

                {tables.map((table) => {
                  const selected = selectedTableId === table.id;
                  const available = table.status === "AVAILABLE";
                  return (
                    <button
                      key={table.id}
                      type="button"
                      disabled={!available}
                      onClick={() => setSelectedTableId(table.id)}
                      className={`absolute flex items-center justify-center font-mono text-[10px] transition ${
                        selected
                          ? "z-10 border-2 border-[#FF2A2A] bg-[#FF2A2A] text-black"
                          : available
                            ? "border border-[#C8C8C8]/50 bg-[#161616] text-[#C8C8C8] hover:border-[#FF2A2A]"
                            : "cursor-not-allowed border border-white/10 bg-[#1a1a1a] text-[#6B6B6B] line-through"
                      }`}
                      style={{
                        left: `${table.x}%`,
                        top: `${table.y}%`,
                        width: `${table.w}%`,
                        height: `${table.h}%`,
                      }}
                      title={`${table.id} · ${table.status}`}
                    >
                      {table.id}
                    </button>
                  );
                })}
              </div>

              {/* Mobile list selection */}
              <div className="md:hidden">
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#6B6B6B]">
                  TABLE LIST
                </p>
                <div className="mt-3 max-h-64 space-y-2 overflow-y-auto">
                  {tables.map((table) => (
                    <button
                      key={table.id}
                      type="button"
                      disabled={table.status !== "AVAILABLE"}
                      onClick={() => setSelectedTableId(table.id)}
                      className={`flex w-full items-center justify-between border px-3 py-3 text-left text-sm ${
                        selectedTableId === table.id
                          ? "border-[#FF2A2A] bg-[#FF2A2A]/10"
                          : "border-white/10"
                      } disabled:opacity-40`}
                    >
                      <span>
                        <span className="font-mono text-[#FF2A2A]">
                          {table.id}
                        </span>
                        <span className="ml-2 text-[#6B6B6B]">
                          · {table.capacity} pax
                        </span>
                      </span>
                      <span className="font-mono text-[10px]">
                        {table.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 bg-[#111111] p-5">
                {selectedTable ? (
                  <>
                    <p
                      className="text-3xl text-white"
                      style={groteskStyle}
                    >
                      {selectedTable.id}
                    </p>
                    <p className="mt-2 font-mono text-xs tracking-[0.16em] text-[#FF2A2A]">
                      {selectedTable.status}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-[#C8C8C8]">
                      <li>Capacity · {selectedTable.capacity} people</li>
                      <li>
                        Minimum · {formatTzs(selectedTable.minSpend)}
                      </li>
                      <li>Zone · {selectedTable.zone}</li>
                    </ul>

                    <label className="mt-6 block">
                      <span className="font-mono text-[10px] tracking-[0.16em] text-[#6B6B6B]">
                        PARTY SIZE
                      </span>
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setVipParty((n) => Math.max(1, n - 1))
                          }
                          className="h-10 w-10 border border-white/20"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-mono text-lg">
                          {vipParty}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setVipParty((n) =>
                              Math.min(selectedTable.capacity, n + 1),
                            )
                          }
                          className="h-10 w-10 border border-white/20"
                        >
                          +
                        </button>
                      </div>
                    </label>

                    <label className="mt-4 block">
                      <span className="font-mono text-[10px] tracking-[0.16em] text-[#6B6B6B]">
                        NAME ON RESERVATION
                      </span>
                      <input
                        value={vipName}
                        onChange={(e) => setVipName(e.target.value)}
                        className="mt-2 w-full border border-white/15 bg-[#0A0A0A] px-3 py-3 text-sm outline-none focus:border-[#FF2A2A]"
                      />
                    </label>

                    <button
                      type="button"
                      disabled={
                        selectedTable.status !== "AVAILABLE" ||
                        !vipName.trim() ||
                        vipParty > selectedTable.capacity
                      }
                      onClick={reserveTable}
                      className="mt-6 w-full bg-[#FF2A2A] py-3.5 text-sm text-black disabled:cursor-not-allowed disabled:opacity-40"
                      style={groteskStyle}
                    >
                      Reserve
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-[#6B6B6B]">Select a table.</p>
                )}

                {/* List also on desktop for accessibility */}
                <div className="mt-8 hidden md:block">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-[#6B6B6B]">
                    ALL TABLES
                  </p>
                  <div className="mt-2 max-h-40 space-y-1 overflow-y-auto">
                    {tables.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        disabled={t.status !== "AVAILABLE"}
                        onClick={() => setSelectedTableId(t.id)}
                        className={`flex w-full justify-between px-2 py-1.5 text-left font-mono text-[11px] ${
                          selectedTableId === t.id
                            ? "bg-[#FF2A2A] text-black"
                            : "text-[#C8C8C8]/70 hover:bg-white/5"
                        } disabled:opacity-35`}
                      >
                        <span>
                          {t.id} · {t.capacity}p
                        </span>
                        <span>{t.status}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {viewMode === "business" && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#FF2A2A]">
            BUSINESS VIEW
          </p>
          <h2 className="mt-2 text-4xl text-white" style={groteskStyle}>
            Night ops
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["TICKET REVENUE", formatTzs(ticketRevenue)],
              ["VIP REVENUE", formatTzs(vipRevenue)],
              ["ATTENDANCE", `${attendance} / ${guests.length}`],
              [
                "VIP TABLES",
                `${tables.filter((t) => t.status === "RESERVED").length} reserved`,
              ],
            ].map(([label, value]) => (
              <div key={label} className="border border-white/10 bg-[#111111] p-4">
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#6B6B6B]">
                  {label}
                </p>
                <p className="mt-2 font-mono text-lg text-[#FF2A2A]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-xl text-white" style={groteskStyle}>
                Events
              </h3>
              <ul className="mt-4 space-y-2">
                {eventList.map((ev) => (
                  <li
                    key={ev.id}
                    className="border border-white/10 px-3 py-3 text-sm"
                  >
                    <div className="flex justify-between gap-2">
                      <span className="text-white">{ev.code}</span>
                      <span className="font-mono text-[10px] text-[#6B6B6B]">
                        {ev.dateLabel}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#C8C8C8]/70">{ev.artist}</p>
                    <p className="mt-1 font-mono text-[10px] text-[#FF2A2A]">
                      {ev.tiers.reduce((s, t) => s + t.remaining, 0)} tickets left
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl text-white" style={groteskStyle}>
                Ticket sales
              </h3>
              <ul className="mt-4 max-h-72 space-y-2 overflow-y-auto">
                {sales.map((s) => (
                  <li
                    key={s.id}
                    className="flex justify-between gap-2 border border-white/10 px-3 py-2 text-sm"
                  >
                    <div>
                      <p className="font-mono text-xs text-[#FF2A2A]">{s.id}</p>
                      <p>
                        {s.guest} · {s.tier}
                      </p>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <p>{formatTzs(s.amount)}</p>
                      <p className="text-[#6B6B6B]">{s.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl text-white" style={groteskStyle}>
                Guest list
              </h3>
              <ul className="mt-4 max-h-72 space-y-2 overflow-y-auto">
                {guests.map((g) => (
                  <li
                    key={g.id}
                    className="flex items-center justify-between gap-2 border border-white/10 px-3 py-2 text-sm"
                  >
                    <div>
                      <p>{g.name}</p>
                      <p className="font-mono text-[10px] text-[#6B6B6B]">
                        {g.tier}
                        {g.table ? ` · ${g.table}` : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setGuests((prev) =>
                          prev.map((x) =>
                            x.id === g.id
                              ? { ...x, checkedIn: !x.checkedIn }
                              : x,
                          ),
                        )
                      }
                      className={`px-2 py-1 font-mono text-[9px] uppercase tracking-wider ${
                        g.checkedIn
                          ? "bg-[#FF2A2A] text-black"
                          : "border border-white/20 text-[#C8C8C8]"
                      }`}
                    >
                      {g.checkedIn ? "In" : "Check in"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl text-white" style={groteskStyle}>
                VIP tables
              </h3>
              <ul className="mt-4 space-y-2">
                {tables.map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between border border-white/10 px-3 py-2 font-mono text-xs"
                  >
                    <span>
                      {t.id} · {t.capacity}p · {formatTzs(t.minSpend)}
                    </span>
                    <span
                      className={
                        t.status === "AVAILABLE"
                          ? "text-[#C8C8C8]"
                          : t.status === "RESERVED"
                            ? "text-[#FF2A2A]"
                            : "text-[#6B6B6B]"
                      }
                    >
                      {t.status}
                    </span>
                  </li>
                ))}
              </ul>
              {vipReservations.length > 0 && (
                <div className="mt-4 border border-[#FF2A2A]/40 p-3">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-[#FF2A2A]">
                    NEW RESERVATIONS
                  </p>
                  {vipReservations.map((r) => (
                    <p key={r.id} className="mt-2 text-sm">
                      {r.id} · {r.tableId} · {r.name} · {r.partySize}p
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-white/10 px-4 py-8 text-center">
        <p className="font-mono text-[10px] tracking-[0.18em] text-[#6B6B6B]">
          KASI CONCEPT / 003 · DEMO DATA · FICTIONAL
        </p>
      </footer>
    </div>
  );
}
