"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { DemoChrome } from "@/components/site/DemoChrome";
import {
  categories,
  condensedStyle,
  floorTables,
  formatTzs,
  heroImage,
  menuItems as initialMenu,
  motoColors,
  occasions,
  seatingOptions,
  seedOrders,
  seedReservations,
  spiceLabel,
  timeSlots,
  type MenuItem,
  type OrderRecord,
  type Reservation,
} from "@/demos/moto/data";

type ViewMode = "customer" | "business";
type CustomerSection = "home" | "menu" | "order" | "book";
type TimeMode = "auto" | "lunch" | "dinner";
type CartLine = { itemId: string; qty: number };

type GuestOrderPhase = "grill" | "preparing" | "ready";

function guestStatusCopy(phase: GuestOrderPhase) {
  if (phase === "grill") return "Your food is on the grill.";
  if (phase === "preparing") return "We're preparing your order.";
  return "Your order is ready for pickup.";
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

function isLunchHour(date = new Date()) {
  const h = date.getHours();
  return h >= 11 && h < 16;
}

export function MotoDemo() {
  const [viewMode, setViewMode] = useState<ViewMode>("customer");
  const [section, setSection] = useState<CustomerSection>("home");
  const [timeMode, setTimeMode] = useState<TimeMode>("auto");
  const [items, setItems] = useState<MenuItem[]>(initialMenu);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [schedule, setSchedule] = useState("ASAP");
  const [address, setAddress] = useState("");
  const [orderConfirm, setOrderConfirm] = useState<string | null>(null);
  const [guestOrderPhase, setGuestOrderPhase] =
    useState<GuestOrderPhase | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [partySize, setPartySize] = useState(2);
  const [bookDate, setBookDate] = useState("2026-07-25");
  const [bookTime, setBookTime] = useState("19:00");
  const [seating, setSeating] =
    useState<(typeof seatingOptions)[number]>("Indoor");
  const [selectedTableId, setSelectedTableId] = useState<string | null>("in-2");
  const [occasion, setOccasion] =
    useState<(typeof occasions)[number]>("Just dining");
  const [guestName, setGuestName] = useState("");
  const [bookConfirm, setBookConfirm] = useState<Reservation | null>(null);

  const [reservations, setReservations] =
    useState<Reservation[]>(seedReservations);
  const [orders, setOrders] = useState<OrderRecord[]>(seedOrders);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);

  const lunch = timeMode === "auto" ? isLunchHour() : timeMode === "lunch";

  useEffect(() => {
    if (!orderConfirm) {
      setGuestOrderPhase(null);
      return;
    }
    setGuestOrderPhase("grill");
    const t1 = setTimeout(() => {
      setGuestOrderPhase("preparing");
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderConfirm ? { ...o, status: "preparing" } : o,
        ),
      );
    }, 2800);
    const t2 = setTimeout(() => {
      setGuestOrderPhase("ready");
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderConfirm ? { ...o, status: "ready" } : o,
        ),
      );
    }, 5800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [orderConfirm]);

  const bookedTableIds = useMemo(() => {
    const set = new Set<string>();
    reservations.forEach((r) => {
      if (r.table) {
        const t = floorTables.find(
          (ft) => ft.label === r.table && ft.zone === r.seating,
        );
        if (t) set.add(t.id);
      }
    });
    return set;
  }, [reservations]);

  const cartDetailed = useMemo(() => {
    return cart
      .map((line) => {
        const item = items.find((i) => i.id === line.itemId);
        if (!item) return null;
        return { ...line, item };
      })
      .filter(Boolean) as { itemId: string; qty: number; item: MenuItem }[];
  }, [cart, items]);

  const cartTotal = cartDetailed.reduce(
    (sum, l) => sum + l.item.price * l.qty,
    0,
  );

  const popularDishes = useMemo(() => {
    return [...items]
      .filter((i) => i.popular)
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);
  }, [items]);

  const revenue = useMemo(() => {
    const orderRev = orders.reduce((s, o) => s + o.total, 0);
    return orderRev + 245000;
  }, [orders]);

  function addToCart(id: string) {
    const item = items.find((i) => i.id === id);
    if (!item || item.soldOut) return;
    setCart((prev) => {
      const existing = prev.find((l) => l.itemId === id);
      if (existing) {
        return prev.map((l) =>
          l.itemId === id ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [...prev, { itemId: id, qty: 1 }];
    });
  }

  function updateQty(id: string, qty: number) {
    if (qty <= 0) {
      setCart((prev) => prev.filter((l) => l.itemId !== id));
      return;
    }
    setCart((prev) =>
      prev.map((l) => (l.itemId === id ? { ...l, qty } : l)),
    );
  }

  function placeOrder() {
    if (cartDetailed.length === 0) return;
    if (orderType === "delivery" && !address.trim()) return;
    const id = uid("ORD");
    const record: OrderRecord = {
      id,
      type: orderType,
      items: cartDetailed.map((l) => ({
        name: l.item.name,
        qty: l.qty,
        price: l.item.price,
      })),
      total: cartTotal,
      status: "preparing",
      scheduledFor: schedule === "ASAP" ? "ASAP" : schedule,
      address: orderType === "delivery" ? address : undefined,
    };
    setOrders((prev) => [record, ...prev]);
    setOrderConfirm(id);
    setGuestOrderPhase("grill");
    setCart([]);
    setCheckoutOpen(false);
  }

  function confirmBooking() {
    if (!guestName.trim() || !selectedTableId) return;
    const table = floorTables.find((t) => t.id === selectedTableId);
    const reservation: Reservation = {
      id: uid("RSV"),
      name: guestName.trim(),
      partySize,
      date: bookDate,
      time: bookTime,
      seating: table?.zone ?? seating,
      table: table?.label,
      occasion,
      status: "confirmed",
    };
    setReservations((prev) => [reservation, ...prev]);
    setBookConfirm(reservation);
  }

  function toggleSoldOut(id: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, soldOut: !i.soldOut } : i)),
    );
  }

  function updatePrice(id: string, price: number) {
    if (Number.isNaN(price) || price < 0) return;
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, price } : i)),
    );
  }

  const nav = (
    <nav className="flex flex-wrap items-center gap-1 text-[11px] uppercase tracking-[0.14em]">
      {(
        [
          ["home", "Home"],
          ["menu", "Menu"],
          ["order", "Order"],
          ["book", "Book"],
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
              ? "text-[#C45C26]"
              : "text-[#F3EDE4]/70 hover:text-[#F3EDE4]"
          }`}
        >
          {label}
        </button>
      ))}
      <button
        type="button"
        onClick={() => setViewMode(viewMode === "business" ? "customer" : "business")}
        className={`ml-2 border px-3 py-1.5 transition ${
          viewMode === "business"
            ? "border-[#C45C26] bg-[#C45C26] text-[#1A1614]"
            : "border-[#F3EDE4]/30 text-[#F3EDE4]/80 hover:border-[#C45C26]"
        }`}
      >
        {viewMode === "business" ? "Customer View" : "Business View"}
      </button>
    </nav>
  );

  return (
    <div
      className="min-h-screen pt-12"
      style={{ background: motoColors.charcoal, color: motoColors.cream }}
    >
      <DemoChrome slug="moto" />

      <header className="sticky top-12 z-40 border-b border-white/10 bg-[#1A1614]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => {
              setViewMode("customer");
              setSection("home");
            }}
            className="text-left"
          >
            <p
              className="text-2xl uppercase leading-none"
              style={condensedStyle}
            >
              MOTO
            </p>
            <p className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-[#8A7E74]">
              KASI CONCEPT / 002
            </p>
          </button>
          {nav}
        </div>
      </header>

      {viewMode === "customer" && section === "home" && (
        <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden">
          <Image
            src={heroImage}
            alt="Open fire grill with flame and meat"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-[#1A1614]/70 to-[#1A1614]/30" />
          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col justify-end px-4 pb-16 pt-24">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#C45C26]">
              MASAKI / DAR ES SALAAM
            </p>
            <h1
              className="mt-3 max-w-3xl text-5xl uppercase leading-[0.92] sm:text-7xl md:text-8xl"
              style={condensedStyle}
            >
              Cooked over fire.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#F3EDE4]/85">
              {lunch
                ? "Lunch fire is lit: lighter plates, cold drinks, walk-ins welcome until 16:00."
                : "Dinner service: full fire menu, reservations recommended after 19:00."}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] tracking-[0.14em] text-[#8A7E74]">
                TIME MODE
              </span>
              {(["auto", "lunch", "dinner"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTimeMode(mode)}
                  className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
                    timeMode === mode
                      ? "border-[#C45C26] text-[#C45C26]"
                      : "border-white/20 text-[#F3EDE4]/60"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSection("menu")}
                className="bg-[#C45C26] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#1A1614] transition hover:bg-[#d46a33]"
              >
                Menu
              </button>
              <button
                type="button"
                onClick={() => setSection("book")}
                className="border border-[#F3EDE4] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#F3EDE4] transition hover:border-[#C45C26] hover:text-[#C45C26]"
              >
                Book
              </button>
            </div>
          </div>
        </section>
      )}

      {viewMode === "customer" && section === "menu" && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-[#C45C26]">
                FULL MENU
              </p>
              <h2
                className="mt-2 text-4xl uppercase sm:text-5xl"
                style={condensedStyle}
              >
                From the flame
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setSection("order")}
              className="border border-[#C45C26] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#C45C26]"
            >
              Cart · {cart.reduce((s, l) => s + l.qty, 0)} · {formatTzs(cartTotal)}
            </button>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {categories.map((c) => (
              <a
                key={c.id}
                href={`#cat-${c.id}`}
                className="shrink-0 border border-white/15 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-[#F3EDE4]/80 hover:border-[#C45C26] hover:text-[#C45C26]"
              >
                {c.label}
              </a>
            ))}
          </div>

          <div className="mt-10 space-y-14">
            {categories.map((cat) => {
              const catItems = items.filter((i) => i.category === cat.id);
              return (
                <div key={cat.id} id={`cat-${cat.id}`}>
                  <h3
                    className="border-b border-[#8B1E1E]/50 pb-2 text-2xl uppercase text-[#C45C26]"
                    style={condensedStyle}
                  >
                    {cat.label}
                  </h3>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {catItems.map((item) => (
                      <article
                        key={item.id}
                        className={`overflow-hidden border border-white/10 bg-[#2A2420]/60 ${
                          item.soldOut ? "opacity-55" : ""
                        }`}
                      >
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width:768px) 100vw, 50vw"
                          />
                          {item.soldOut && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                              <span
                                className="text-xl uppercase text-[#F3EDE4]"
                                style={condensedStyle}
                              >
                                Sold out
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <h4
                              className="text-xl uppercase leading-tight"
                              style={condensedStyle}
                            >
                              {item.name}
                            </h4>
                            <p className="shrink-0 font-mono text-sm text-[#C45C26]">
                              {formatTzs(item.price)}
                            </p>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-[#F3EDE4]/75">
                            {item.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {item.dietary.map((d) => (
                              <span
                                key={d}
                                className="border border-white/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#8A7E74]"
                              >
                                {d}
                              </span>
                            ))}
                            {item.allergens.length > 0 && (
                              <span className="border border-[#8B1E1E]/60 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#c97a7a]">
                                Contains: {item.allergens.join(", ")}
                              </span>
                            )}
                            <span className="border border-[#C45C26]/40 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#C45C26]">
                              Spice · {spiceLabel(item.spice)}
                              {" · "}
                              {"●".repeat(item.spice || 0) || "○"}
                            </span>
                          </div>
                          <button
                            type="button"
                            disabled={!!item.soldOut}
                            onClick={() => addToCart(item.id)}
                            className="mt-4 w-full bg-[#C45C26] py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1614] disabled:cursor-not-allowed disabled:bg-[#5a4034] disabled:text-[#8A7E74]"
                          >
                            {item.soldOut ? "Unavailable" : "Add to order"}
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {viewMode === "customer" && section === "order" && (
        <section className="mx-auto max-w-3xl px-4 py-10">
          <p className="font-mono text-[11px] tracking-[0.18em] text-[#C45C26]">
            ORDER
          </p>
          <h2 className="mt-2 text-4xl uppercase" style={condensedStyle}>
            Pickup or delivery
          </h2>

          {orderConfirm ? (
            <div className="mt-8 border border-[#C45C26] bg-[#2A2420] p-6">
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#C45C26]">
                ORDER CONFIRMED
              </p>
              <p className="mt-3 text-3xl uppercase" style={condensedStyle}>
                {orderConfirm}
              </p>
              {guestOrderPhase && (
                <div className="mt-5 border border-white/10 bg-[#1A1614]/80 p-4">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-[#8A7E74]">
                    LIVE STATUS
                  </p>
                  <p className="mt-2 text-lg uppercase text-[#F3EDE4]" style={condensedStyle}>
                    {guestStatusCopy(guestOrderPhase)}
                  </p>
                  <div className="mt-4 flex gap-2">
                    {(
                      [
                        ["grill", "On the grill"],
                        ["preparing", "Preparing"],
                        ["ready", "Ready"],
                      ] as const
                    ).map(([key, label]) => {
                      const order = ["grill", "preparing", "ready"].indexOf(
                        guestOrderPhase,
                      );
                      const step = ["grill", "preparing", "ready"].indexOf(key);
                      const active = step <= order;
                      return (
                        <div
                          key={key}
                          className={`flex-1 border px-2 py-2 text-center font-mono text-[9px] uppercase tracking-[0.1em] ${
                            active
                              ? "border-[#C45C26] bg-[#C45C26]/15 text-[#C45C26]"
                              : "border-white/15 text-[#8A7E74]"
                          }`}
                        >
                          {label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <p className="mt-3 text-sm text-[#F3EDE4]/75">
                Demo checkout complete. Switch to Business View to see the
                kitchen ticket.
              </p>
              <button
                type="button"
                onClick={() => {
                  setOrderConfirm(null);
                  setGuestOrderPhase(null);
                  setSection("menu");
                }}
                className="mt-6 border border-[#F3EDE4]/40 px-4 py-2 text-xs uppercase tracking-[0.14em]"
              >
                Order again
              </button>
            </div>
          ) : (
            <>
              <div className="mt-6 flex gap-2">
                {(["pickup", "delivery"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setOrderType(t)}
                    className={`flex-1 py-3 text-xs uppercase tracking-[0.14em] ${
                      orderType === t
                        ? "bg-[#C45C26] text-[#1A1614]"
                        : "border border-white/20 text-[#F3EDE4]/70"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <label className="mt-6 block">
                <span className="font-mono text-[10px] tracking-[0.14em] text-[#8A7E74]">
                  SCHEDULE
                </span>
                <select
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="mt-2 w-full border border-white/15 bg-[#2A2420] px-3 py-3 text-sm outline-none focus:border-[#C45C26]"
                >
                  <option value="ASAP">ASAP</option>
                  <option value="Today 18:30">Today 18:30</option>
                  <option value="Today 19:00">Today 19:00</option>
                  <option value="Today 19:30">Today 19:30</option>
                  <option value="Today 20:00">Today 20:00</option>
                  <option value="Tomorrow 12:30">Tomorrow 12:30</option>
                </select>
              </label>

              {orderType === "delivery" && (
                <label className="mt-4 block">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-[#8A7E74]">
                    DELIVERY ADDRESS
                  </span>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, neighbourhood, Dar es Salaam"
                    className="mt-2 w-full border border-white/15 bg-[#2A2420] px-3 py-3 text-sm outline-none placeholder:text-[#8A7E74]/60 focus:border-[#C45C26]"
                  />
                </label>
              )}

              <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {cartDetailed.length === 0 ? (
                  <p className="text-sm text-[#8A7E74]">
                    Cart is empty.{" "}
                    <button
                      type="button"
                      onClick={() => setSection("menu")}
                      className="text-[#C45C26] underline"
                    >
                      Browse menu
                    </button>
                  </p>
                ) : (
                  cartDetailed.map((line) => (
                    <div
                      key={line.itemId}
                      className="flex items-center justify-between gap-3 border border-white/10 p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{line.item.name}</p>
                        <p className="font-mono text-xs text-[#C45C26]">
                          {formatTzs(line.item.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQty(line.itemId, line.qty - 1)}
                          className="h-8 w-8 border border-white/20 text-sm"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-mono text-sm">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(line.itemId, line.qty + 1)}
                          className="h-8 w-8 border border-white/20 text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartDetailed.length > 0 && (
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.1em]">Total</p>
                  <p className="text-xl font-mono text-[#C45C26]">
                    {formatTzs(cartTotal)}
                  </p>
                </div>
              )}

              <button
                type="button"
                disabled={
                  cartDetailed.length === 0 ||
                  (orderType === "delivery" && !address.trim())
                }
                onClick={() => setCheckoutOpen(true)}
                className="mt-6 w-full bg-[#C45C26] py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#1A1614] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Demo checkout
              </button>
            </>
          )}

          {checkoutOpen && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center">
              <div className="w-full max-w-md border border-[#C45C26]/50 bg-[#1A1614] p-6">
                <p className="font-mono text-[11px] tracking-[0.16em] text-[#C45C26]">
                  DEMO PAYMENT
                </p>
                <p className="mt-3 text-sm text-[#F3EDE4]/80">
                  No real charge. Confirm to generate an order ID and push the
                  ticket into Business View.
                </p>
                <p className="mt-4 font-mono text-lg text-[#C45C26]">
                  {formatTzs(cartTotal)}
                </p>
                <div className="mt-6 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutOpen(false)}
                    className="flex-1 border border-white/20 py-3 text-xs uppercase tracking-[0.12em]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={placeOrder}
                    className="flex-1 bg-[#C45C26] py-3 text-xs uppercase tracking-[0.12em] text-[#1A1614]"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {viewMode === "customer" && section === "book" && (
        <section className="mx-auto max-w-3xl px-4 py-10">
          <p className="font-mono text-[11px] tracking-[0.18em] text-[#C45C26]">
            RESERVATIONS
          </p>
          <h2 className="mt-2 text-4xl uppercase" style={condensedStyle}>
            Book a table
          </h2>

          {bookConfirm ? (
            <div className="mt-8 border border-[#C45C26] bg-[#2A2420] p-6">
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#C45C26]">
                TABLE CONFIRMED
              </p>
              <p className="mt-3 text-3xl uppercase" style={condensedStyle}>
                {bookConfirm.id}
              </p>
              <ul className="mt-4 space-y-1 text-sm text-[#F3EDE4]/80">
                <li>{bookConfirm.name} · party of {bookConfirm.partySize}</li>
                <li>
                  {bookConfirm.date} at {bookConfirm.time}
                </li>
                <li>
                  {bookConfirm.seating}
                  {bookConfirm.table ? ` · Table ${bookConfirm.table}` : ""} ·{" "}
                  {bookConfirm.occasion}
                </li>
              </ul>
              <button
                type="button"
                onClick={() => {
                  setBookConfirm(null);
                  setGuestName("");
                }}
                className="mt-6 border border-[#F3EDE4]/40 px-4 py-2 text-xs uppercase tracking-[0.14em]"
              >
                Book another
              </button>
            </div>
          ) : (
            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                confirmBooking();
              }}
            >
              <label className="block">
                <span className="font-mono text-[10px] tracking-[0.14em] text-[#8A7E74]">
                  NAME
                </span>
                <input
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="mt-2 w-full border border-white/15 bg-[#2A2420] px-3 py-3 text-sm outline-none focus:border-[#C45C26]"
                />
              </label>

              <label className="block">
                <span className="font-mono text-[10px] tracking-[0.14em] text-[#8A7E74]">
                  PARTY SIZE
                </span>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPartySize((n) => Math.max(1, n - 1))}
                    className="h-10 w-10 border border-white/20"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-lg font-mono">
                    {partySize}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPartySize((n) => Math.min(12, n + 1))}
                    className="h-10 w-10 border border-white/20"
                  >
                    +
                  </button>
                </div>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-[#8A7E74]">
                    DATE
                  </span>
                  <input
                    type="date"
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="mt-2 w-full border border-white/15 bg-[#2A2420] px-3 py-3 text-sm outline-none focus:border-[#C45C26]"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-[#8A7E74]">
                    TIME
                  </span>
                  <select
                    value={bookTime}
                    onChange={(e) => setBookTime(e.target.value)}
                    className="mt-2 w-full border border-white/15 bg-[#2A2420] px-3 py-3 text-sm outline-none focus:border-[#C45C26]"
                  >
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <fieldset>
                <legend className="font-mono text-[10px] tracking-[0.14em] text-[#8A7E74]">
                  SEATING · FLOOR MAP
                </legend>
                <p className="mt-1 text-xs text-[#F3EDE4]/55">
                  Tap a table to choose zone and seat. Grey tables are already
                  held for tonight.
                </p>
                <div className="mt-4 space-y-4">
                  {(
                    [
                      "Indoor",
                      "Terrace",
                      "Chef's Counter",
                    ] as const
                  ).map((zone) => (
                    <div key={zone}>
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#C45C26]">
                        {zone}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {floorTables
                          .filter((t) => t.zone === zone)
                          .map((t) => {
                            const held = bookedTableIds.has(t.id);
                            const selected = selectedTableId === t.id;
                            const tooSmall = partySize > t.seats;
                            return (
                              <button
                                key={t.id}
                                type="button"
                                disabled={held || tooSmall}
                                onClick={() => {
                                  setSelectedTableId(t.id);
                                  setSeating(t.zone);
                                }}
                                className={`min-w-[3.25rem] border px-3 py-2 font-mono text-xs ${
                                  held || tooSmall
                                    ? "cursor-not-allowed border-white/10 text-[#8A7E74]/50 line-through"
                                    : selected
                                      ? "border-[#C45C26] bg-[#C45C26] text-[#1A1614]"
                                      : "border-white/15 text-[#F3EDE4]/80 hover:border-[#C45C26]"
                                }`}
                                title={`Seats ${t.seats}`}
                              >
                                {t.label}
                                <span className="mt-0.5 block text-[8px] opacity-70">
                                  {t.seats}p
                                </span>
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
                {selectedTableId && (
                  <p className="mt-3 text-sm text-[#F3EDE4]/75">
                    Selected:{" "}
                    <span className="text-[#C45C26]">
                      {floorTables.find((t) => t.id === selectedTableId)?.label}{" "}
                      · {seating}
                    </span>
                  </p>
                )}
              </fieldset>

              <fieldset>
                <legend className="font-mono text-[10px] tracking-[0.14em] text-[#8A7E74]">
                  SEATING TYPE
                </legend>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {seatingOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSeating(s);
                        const first = floorTables.find(
                          (t) => t.zone === s && t.seats >= partySize,
                        );
                        if (first && !bookedTableIds.has(first.id)) {
                          setSelectedTableId(first.id);
                        }
                      }}
                      className={`px-2 py-3 text-[11px] uppercase tracking-[0.1em] ${
                        seating === s
                          ? "bg-[#8B1E1E] text-[#F3EDE4]"
                          : "border border-white/15 text-[#F3EDE4]/70"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="font-mono text-[10px] tracking-[0.14em] text-[#8A7E74]">
                  OCCASION
                </span>
                <select
                  value={occasion}
                  onChange={(e) =>
                    setOccasion(e.target.value as (typeof occasions)[number])
                  }
                  className="mt-2 w-full border border-white/15 bg-[#2A2420] px-3 py-3 text-sm outline-none focus:border-[#C45C26]"
                >
                  {occasions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                disabled={!selectedTableId}
                className="w-full bg-[#C45C26] py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#1A1614] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Confirm reservation
              </button>
            </form>
          )}
        </section>
      )}

      {viewMode === "business" && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <p className="font-mono text-[11px] tracking-[0.18em] text-[#C45C26]">
            BUSINESS VIEW
          </p>
          <h2 className="mt-2 text-4xl uppercase" style={condensedStyle}>
            Kitchen & floor ops
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="border border-white/10 bg-[#2A2420] p-5">
              <p className="font-mono text-[10px] tracking-[0.14em] text-[#8A7E74]">
                REVENUE TODAY
              </p>
              <p className="mt-2 text-2xl font-mono text-[#C45C26]">
                {formatTzs(revenue)}
              </p>
            </div>
            <div className="border border-white/10 bg-[#2A2420] p-5">
              <p className="font-mono text-[10px] tracking-[0.14em] text-[#8A7E74]">
                OPEN ORDERS
              </p>
              <p className="mt-2 text-2xl font-mono">{orders.length}</p>
            </div>
            <div className="border border-white/10 bg-[#2A2420] p-5">
              <p className="font-mono text-[10px] tracking-[0.14em] text-[#8A7E74]">
                RESERVATIONS
              </p>
              <p className="mt-2 text-2xl font-mono">{reservations.length}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <h3
                className="text-xl uppercase text-[#C45C26]"
                style={condensedStyle}
              >
                Menu controls
              </h3>
              <div className="mt-4 max-h-[420px] space-y-2 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center gap-2 border border-white/10 p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm">{item.name}</p>
                      {editingPriceId === item.id ? (
                        <input
                          type="number"
                          defaultValue={item.price}
                          autoFocus
                          onBlur={(e) => {
                            updatePrice(item.id, Number(e.target.value));
                            setEditingPriceId(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              updatePrice(
                                item.id,
                                Number((e.target as HTMLInputElement).value),
                              );
                              setEditingPriceId(null);
                            }
                          }}
                          className="mt-1 w-28 border border-[#C45C26] bg-[#1A1614] px-2 py-1 font-mono text-xs"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setEditingPriceId(item.id)}
                          className="mt-1 font-mono text-xs text-[#C45C26] underline"
                        >
                          {formatTzs(item.price)} · edit
                        </button>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSoldOut(item.id)}
                      className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
                        item.soldOut
                          ? "bg-[#8B1E1E] text-[#F3EDE4]"
                          : "border border-white/20 text-[#F3EDE4]/70"
                      }`}
                    >
                      {item.soldOut ? "Sold out" : "Mark sold out"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3
                className="text-xl uppercase text-[#C45C26]"
                style={condensedStyle}
              >
                Popular dishes
              </h3>
              <ul className="mt-4 space-y-2">
                {popularDishes.map((d, i) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between border border-white/10 px-3 py-2 text-sm"
                  >
                    <span>
                      <span className="mr-2 font-mono text-[#8A7E74]">
                        {i + 1}.
                      </span>
                      {d.name}
                    </span>
                    <span className="font-mono text-xs text-[#C45C26]">
                      {formatTzs(d.price)}
                    </span>
                  </li>
                ))}
              </ul>

              <h3
                className="mt-8 text-xl uppercase text-[#C45C26]"
                style={condensedStyle}
              >
                Reservations
              </h3>
              <ul className="mt-4 max-h-48 space-y-2 overflow-y-auto">
                {reservations.map((r) => (
                  <li
                    key={r.id}
                    className="border border-white/10 px-3 py-2 text-sm"
                  >
                    <div className="flex justify-between gap-2">
                      <span className="font-mono text-xs text-[#C45C26]">
                        {r.id}
                      </span>
                      <span className="text-xs text-[#8A7E74]">{r.status}</span>
                    </div>
                    <p className="mt-1">
                      {r.name} · {r.partySize} · {r.seating}
                    </p>
                    <p className="text-xs text-[#8A7E74]">
                      {r.date} {r.time} · {r.occasion}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h3
              className="text-xl uppercase text-[#C45C26]"
              style={condensedStyle}
            >
              Kitchen board
            </h3>
            <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-[#8A7E74]">
              New guest orders appear at the top · Preparing tickets pulse
            </p>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className={`min-w-[220px] shrink-0 border p-4 ${
                    o.status === "preparing"
                      ? "animate-pulse border-[#C45C26] bg-[#C45C26]/10"
                      : "border-white/10 bg-[#2A2420]/40"
                  }`}
                >
                  <div className="flex justify-between gap-2">
                    <span className="font-mono text-xs text-[#C45C26]">
                      {o.id}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-[#F3EDE4]">
                      {o.status}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-0.5 text-sm text-[#F3EDE4]/85">
                    {o.items.map((it, idx) => (
                      <li key={idx}>
                        {it.qty}× {it.name}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-mono text-[10px] text-[#8A7E74]">
                    {o.type} · {o.scheduledFor}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3
              className="text-xl uppercase text-[#C45C26]"
              style={condensedStyle}
            >
              Orders
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {orders.map((o) => (
                <div key={o.id} className="border border-white/10 p-4">
                  <div className="flex justify-between">
                    <span className="font-mono text-xs text-[#C45C26]">
                      {o.id}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-[#8A7E74]">
                      {o.type} · {o.status}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-0.5 text-sm text-[#F3EDE4]/80">
                    {o.items.map((it, idx) => (
                      <li key={idx}>
                        {it.qty}× {it.name}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-mono text-sm">{formatTzs(o.total)}</p>
                  <p className="text-xs text-[#8A7E74]">{o.scheduledFor}</p>
                  {o.address && (
                    <p className="text-xs text-[#8A7E74]">{o.address}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-white/10 px-4 py-8 text-center">
        <p className="font-mono text-[10px] tracking-[0.18em] text-[#8A7E74]">
          KASI CONCEPT / 002 · DEMO DATA · FICTIONAL
        </p>
      </footer>
    </div>
  );
}
