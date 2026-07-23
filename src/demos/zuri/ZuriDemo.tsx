"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { DemoChrome } from "@/components/site/DemoChrome";
import { cn } from "@/lib/cn";
import {
  addons,
  buildPersonalItinerary,
  conciergeQuestions,
  contentBlocks,
  coordinates,
  dayMoments,
  diningNotes,
  experiences,
  findConciergeByQuery,
  heroImage,
  initialBookings,
  initialGuestRequests,
  navItems,
  revenueSnapshot,
  rooms,
  serifStyle,
  zanzibarNotes,
  type ConciergeQA,
  type DayMoment,
  type DemoBooking,
  type GuestRequest,
  type Room,
  type RoomId,
} from "./data";

type ViewMode = "guest" | "business";
type BookingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type BizTab =
  | "bookings"
  | "occupancy"
  | "rooms"
  | "pricing"
  | "addons"
  | "requests"
  | "revenue"
  | "content";

type BookingState = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomId: RoomId | null;
  selectedAddons: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  bookingRef: string | null;
};

const emptyBooking: BookingState = {
  checkIn: "",
  checkOut: "",
  adults: 2,
  children: 0,
  roomId: null,
  selectedAddons: [],
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
  bookingRef: null,
};

function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(checkIn);
  const b = new Date(checkOut);
  const diff = Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(diff, 0);
}

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function makeBookingRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ZURI-BK-${code}`;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ZuriDemo() {
  const [view, setView] = useState<ViewMode>("guest");
  const [mobileNav, setMobileNav] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [dayMoment, setDayMoment] = useState<DayMoment | null>(null);
  const [concierge, setConcierge] = useState<ConciergeQA | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>(1);
  const [booking, setBooking] = useState<BookingState>(emptyBooking);
  const [checkoutBusy, setCheckoutBusy] = useState(false);

  const [soldOut, setSoldOut] = useState<Record<RoomId, boolean>>({
    "ocean-villa": false,
    "garden-residence": false,
    "pool-suite": false,
  });
  const [roomPrices, setRoomPrices] = useState<Record<RoomId, number>>(
    Object.fromEntries(rooms.map((r) => [r.id, r.pricePerNight])) as Record<
      RoomId,
      number
    >,
  );
  const [addonEnabled, setAddonEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(addons.map((a) => [a.id, true])),
  );
  const [bizBookings, setBizBookings] = useState<DemoBooking[]>(initialBookings);
  const [guestRequests, setGuestRequests] =
    useState<GuestRequest[]>(initialGuestRequests);
  const [bizTab, setBizTab] = useState<BizTab>("bookings");
  const [contentState, setContentState] = useState(contentBlocks);

  const nights = nightsBetween(booking.checkIn, booking.checkOut);
  const guestCount = booking.adults + booking.children;
  const selectedRoomData = rooms.find((r) => r.id === booking.roomId) ?? null;

  const availableRooms = useMemo(() => {
    return rooms.filter((r) => {
      if (soldOut[r.id]) return false;
      if (guestCount > r.occupancy) return false;
      return true;
    });
  }, [soldOut, guestCount]);

  const addonTotal = useMemo(() => {
    return booking.selectedAddons.reduce((sum, id) => {
      const a = addons.find((x) => x.id === id);
      if (!a || !addonEnabled[id]) return sum;
      if (a.per === "person") return sum + a.price * Math.max(booking.adults, 1);
      if (a.per === "night") return sum + a.price * Math.max(nights, 1);
      return sum + a.price;
    }, 0);
  }, [booking.selectedAddons, booking.adults, nights, addonEnabled]);

  const roomTotal =
    selectedRoomData && nights > 0
      ? roomPrices[selectedRoomData.id] * nights
      : 0;
  const grandTotal = roomTotal + addonTotal;

  function openBooking(step: BookingStep = 1, preset?: Partial<BookingState>) {
    setBooking((b) => ({ ...b, ...preset, bookingRef: null }));
    setBookingStep(step);
    setBookingOpen(true);
    setView("guest");
  }

  function openEnhance(addonId?: string) {
    const selectedAddons = addonId
      ? Array.from(new Set([...booking.selectedAddons, addonId]))
      : booking.selectedAddons;
    const next = { ...booking, selectedAddons, bookingRef: null };
    const n = nightsBetween(next.checkIn, next.checkOut);
    let step: BookingStep = 5;
    if (n <= 0) step = 1;
    else if (!next.roomId) step = 3;
    setBooking(next);
    setBookingStep(step);
    setBookingOpen(true);
    setView("guest");
  }

  function handleConciergeAction(
    target: ConciergeQA["actions"][number]["target"],
  ) {
    if (target === "day") {
      setConcierge(null);
      scrollToId("day");
      return;
    }
    if (target === "eat") {
      setConcierge(null);
      scrollToId("eat");
      return;
    }
    if (target === "spa") {
      openEnhance("spa");
      setConcierge(null);
      return;
    }
    if (target === "transfer") {
      openEnhance("airport-transfer");
      setConcierge(null);
      return;
    }
    openBooking(1);
    setConcierge(null);
  }

  async function completeCheckout() {
    setCheckoutBusy(true);
    await new Promise((r) => setTimeout(r, 900));
    const ref = makeBookingRef();
    setBooking((b) => ({ ...b, bookingRef: ref }));
    if (booking.roomId) {
      const newBooking: DemoBooking = {
        id: ref,
        guest: `${booking.firstName} ${booking.lastName}`.trim() || "Guest",
        roomId: booking.roomId,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: guestCount,
        status: "confirmed",
        total: grandTotal,
        addons: booking.selectedAddons
          .map((id) => addons.find((a) => a.id === id)?.name ?? "")
          .filter(Boolean),
        justNow: true,
      };
      setBizBookings((list) => [newBooking, ...list]);
    }
    setCheckoutBusy(false);
    setBookingStep(9);
  }

  function resetBooking() {
    setBooking(emptyBooking);
    setBookingStep(1);
    setBookingOpen(false);
  }

  return (
    <div
      className="min-h-screen bg-[#F7F3EA] text-[#27251F]"
      style={{ fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif" }}
    >
      <DemoChrome slug="zuri" />

      <div className="pt-12">
        {/* Top bar */}
        <header className="sticky top-12 z-50 border-b border-[#27251F]/10 bg-[#F7F3EA]/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
            <button
              type="button"
              className="text-lg tracking-[0.28em]"
              style={serifStyle}
              onClick={() => {
                setView("guest");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              ZURI
            </button>

            <nav className="hidden items-center gap-6 text-[11px] tracking-[0.18em] md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="hover:text-[#52777A]"
                  onClick={() => {
                    setView("guest");
                    if (item.id === "book") openBooking(1);
                    else scrollToId(item.id);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setView((v) => (v === "guest" ? "business" : "guest"))
                }
                className={cn(
                  "rounded-sm border px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase transition",
                  view === "business"
                    ? "border-[#52777A] bg-[#52777A] text-[#F7F3EA]"
                    : "border-[#27251F]/25 text-[#27251F] hover:border-[#52777A]",
                )}
              >
                {view === "business" ? "Guest View" : "Business View"}
              </button>
              <button
                type="button"
                className="md:hidden text-[11px] tracking-[0.14em]"
                onClick={() => setMobileNav((o) => !o)}
                aria-label="Menu"
              >
                {mobileNav ? "Close" : "Menu"}
              </button>
            </div>
          </div>

          {mobileNav && (
            <div className="border-t border-[#27251F]/10 px-4 py-3 md:hidden">
              <div className="flex flex-col gap-3 text-[12px] tracking-[0.16em]">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="text-left"
                    onClick={() => {
                      setMobileNav(false);
                      setView("guest");
                      if (item.id === "book") openBooking(1);
                      else scrollToId(item.id);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        <p className="border-b border-[#27251F]/10 bg-[#E8DDCB]/60 px-4 py-1.5 text-center font-mono text-[10px] tracking-[0.16em] text-[#27251F]/70">
          KASI CONCEPT · DEMO DATA · FICTIONAL PROPERTY
        </p>

        {view === "guest" ? (
          <GuestView
            soldOut={soldOut}
            roomPrices={roomPrices}
            onOpenRoom={(room) => {
              setSelectedRoom(room);
              setGalleryIndex(0);
            }}
            onBook={() => openBooking(1)}
            onBookRoom={(roomId) =>
              openBooking(1, { roomId, selectedAddons: [] })
            }
            setDayMoment={setDayMoment}
            setConcierge={setConcierge}
          />
        ) : (
          <BusinessView
            tab={bizTab}
            setTab={setBizTab}
            bookings={bizBookings}
            soldOut={soldOut}
            setSoldOut={setSoldOut}
            roomPrices={roomPrices}
            setRoomPrices={setRoomPrices}
            addonEnabled={addonEnabled}
            setAddonEnabled={setAddonEnabled}
            guestRequests={guestRequests}
            setGuestRequests={setGuestRequests}
            contentState={contentState}
            setContentState={setContentState}
          />
        )}
      </div>

      {/* Room detail */}
      <AnimatePresence>
        {selectedRoom && (
          <Modal onClose={() => setSelectedRoom(null)}>
            <div className="relative aspect-[16/10] bg-[#27251F]">
              <Image
                src={selectedRoom.images[galleryIndex] ?? selectedRoom.images[0]}
                alt={selectedRoom.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto px-5 pt-4">
              {selectedRoom.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setGalleryIndex(i)}
                  className={cn(
                    "relative h-14 w-20 shrink-0 overflow-hidden border",
                    i === galleryIndex
                      ? "border-[#52777A]"
                      : "border-transparent opacity-70",
                  )}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
            <div className="space-y-4 p-5 md:p-7">
              <div>
                <p className="text-[11px] tracking-[0.18em] text-[#52777A]">
                  {selectedRoom.tagline.toUpperCase()}
                </p>
                <h3 className="mt-2 text-3xl" style={serifStyle}>
                  {selectedRoom.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#27251F]/80">
                  {selectedRoom.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                <Meta label="Size" value={`${selectedRoom.sqm} sqm`} />
                <Meta label="Guests" value={`Up to ${selectedRoom.occupancy}`} />
                <Meta label="Bed" value={selectedRoom.bed} />
                <Meta label="View" value={selectedRoom.view} />
              </div>
              <div>
                <p className="text-[11px] tracking-[0.16em] text-[#27251F]/55">
                  AMENITIES
                </p>
                <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
                  {selectedRoom.amenities.map((a) => (
                    <li key={a}>· {a}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-[#27251F]/70">
                Floor plan · {selectedRoom.floorPlanNote}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#27251F]/10 pt-4">
                <div>
                  <p className="text-2xl" style={serifStyle}>
                    {formatMoney(roomPrices[selectedRoom.id])}
                    <span className="text-sm tracking-normal"> / night</span>
                  </p>
                  <p className="text-xs text-[#27251F]/60">
                    {soldOut[selectedRoom.id]
                      ? "Currently sold out"
                      : `${selectedRoom.units} residences · demo availability`}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={soldOut[selectedRoom.id]}
                  onClick={() => {
                    setSelectedRoom(null);
                    openBooking(1, { roomId: selectedRoom.id });
                  }}
                  className="bg-[#27251F] px-5 py-3 text-[11px] tracking-[0.16em] text-[#F7F3EA] disabled:opacity-40"
                >
                  {soldOut[selectedRoom.id] ? "SOLD OUT" : "BOOK THIS SPACE"}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Day moment */}
      <AnimatePresence>
        {dayMoment && (
          <Modal onClose={() => setDayMoment(null)}>
            <div className="relative aspect-[16/10] bg-[#27251F]">
              <Image
                src={dayMoment.image}
                alt={dayMoment.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
            <div className="space-y-3 p-5 md:p-7">
              <p className="font-mono text-sm tracking-[0.12em] text-[#52777A]">
                {dayMoment.time}
              </p>
              <h3 className="text-3xl" style={serifStyle}>
                {dayMoment.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#27251F]/85">
                {dayMoment.detail}
              </p>
              <button
                type="button"
                onClick={() => {
                  setDayMoment(null);
                  openEnhance();
                }}
                className="mt-2 border border-[#27251F]/25 px-4 py-2 text-[11px] tracking-[0.14em]"
              >
                ADD TO STAY
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Concierge answer */}
      <AnimatePresence>
        {concierge && (
          <Modal onClose={() => setConcierge(null)}>
            <div className="space-y-4 p-5 md:p-7">
              <p className="text-[11px] tracking-[0.18em] text-[#52777A]">
                ASK ZURI
              </p>
              <h3 className="text-2xl" style={serifStyle}>
                {concierge.question}
              </h3>
              <p className="text-sm leading-relaxed text-[#27251F]/85">
                {concierge.answer}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {concierge.actions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => handleConciergeAction(action.target)}
                    className="bg-[#52777A] px-4 py-2 text-[11px] tracking-[0.12em] text-[#F7F3EA]"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Booking flow */}
      <AnimatePresence>
        {bookingOpen && (
          <Modal onClose={() => setBookingOpen(false)} wide>
            <div className="border-b border-[#27251F]/10 px-5 py-4 md:px-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] tracking-[0.18em] text-[#52777A]">
                    RESERVE YOUR STAY
                  </p>
                  <h3 className="mt-1 text-2xl" style={serifStyle}>
                    {bookingStep === 9 ? "Confirmed" : "Book Zuri"}
                  </h3>
                </div>
                {bookingStep < 9 && (
                  <p className="font-mono text-[11px] text-[#27251F]/55">
                    Step {Math.min(bookingStep, 8)} / 8
                  </p>
                )}
              </div>
              {bookingStep < 9 && (
                <div className="mt-4 h-1 overflow-hidden bg-[#E8DDCB]">
                  <div
                    className="h-full bg-[#52777A] transition-all"
                    style={{ width: `${(Math.min(bookingStep, 8) / 8) * 100}%` }}
                  />
                </div>
              )}
            </div>

            <div className="max-h-[65vh] overflow-y-auto px-5 py-5 md:px-7">
              {bookingStep === 1 && (
                <StepShell title="When will you arrive?">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Check-in">
                      <input
                        type="date"
                        value={booking.checkIn}
                        onChange={(e) =>
                          setBooking((b) => ({ ...b, checkIn: e.target.value }))
                        }
                        className="w-full border border-[#27251F]/20 bg-[#F7F3EA] px-3 py-2"
                      />
                    </Field>
                    <Field label="Check-out">
                      <input
                        type="date"
                        value={booking.checkOut}
                        min={booking.checkIn || undefined}
                        onChange={(e) =>
                          setBooking((b) => ({ ...b, checkOut: e.target.value }))
                        }
                        className="w-full border border-[#27251F]/20 bg-[#F7F3EA] px-3 py-2"
                      />
                    </Field>
                  </div>
                  {nights > 0 && (
                    <p className="mt-3 text-sm text-[#52777A]">
                      {nights} night{nights === 1 ? "" : "s"} selected
                    </p>
                  )}
                </StepShell>
              )}

              {bookingStep === 2 && (
                <StepShell title="Who is travelling?">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Counter
                      label="Adults"
                      value={booking.adults}
                      min={1}
                      max={6}
                      onChange={(adults) => setBooking((b) => ({ ...b, adults }))}
                    />
                    <Counter
                      label="Children"
                      value={booking.children}
                      min={0}
                      max={4}
                      onChange={(children) =>
                        setBooking((b) => ({ ...b, children }))
                      }
                    />
                  </div>
                </StepShell>
              )}

              {bookingStep === 3 && (
                <StepShell title="Available residences">
                  <div className="space-y-3">
                    {availableRooms.length === 0 && (
                      <p className="text-sm text-[#27251F]/70">
                        No residences match these guests right now. Try fewer
                        guests or toggle availability in Business View.
                      </p>
                    )}
                    {availableRooms.map((room) => (
                      <button
                        key={room.id}
                        type="button"
                        onClick={() =>
                          setBooking((b) => ({ ...b, roomId: room.id }))
                        }
                        className={cn(
                          "flex w-full gap-3 border p-3 text-left transition",
                          booking.roomId === room.id
                            ? "border-[#52777A] bg-[#E8DDCB]/50"
                            : "border-[#27251F]/15 hover:border-[#52777A]/60",
                        )}
                      >
                        <div className="relative h-20 w-24 shrink-0 overflow-hidden">
                          <Image
                            src={room.images[0]}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium" style={serifStyle}>
                            {room.name}
                          </p>
                          <p className="text-xs text-[#27251F]/65">
                            {room.sqm} sqm · up to {room.occupancy} guests
                          </p>
                          <p className="mt-1 text-sm">
                            {formatMoney(roomPrices[room.id])} / night
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </StepShell>
              )}

              {bookingStep === 4 && selectedRoomData && (
                <StepShell title="Confirm your space">
                  <div className="relative mb-4 aspect-[16/9] overflow-hidden">
                    <Image
                      src={selectedRoomData.images[0]}
                      alt={selectedRoomData.name}
                      fill
                      className="object-cover"
                      sizes="640px"
                    />
                  </div>
                  <h4 className="text-xl" style={serifStyle}>
                    {selectedRoomData.name}
                  </h4>
                  <p className="mt-2 text-sm text-[#27251F]/75">
                    {selectedRoomData.description}
                  </p>
                  <p className="mt-3 text-sm">
                    {nights} nights · {formatMoney(roomPrices[selectedRoomData.id])}{" "}
                    / night · room subtotal{" "}
                    <strong>{formatMoney(roomTotal)}</strong>
                  </p>
                </StepShell>
              )}

              {bookingStep === 5 && (
                <StepShell title="Enhance your stay">
                  <div className="space-y-2">
                    {addons
                      .filter((a) => addonEnabled[a.id])
                      .map((addon) => {
                        const on = booking.selectedAddons.includes(addon.id);
                        return (
                          <button
                            key={addon.id}
                            type="button"
                            onClick={() =>
                              setBooking((b) => ({
                                ...b,
                                selectedAddons: on
                                  ? b.selectedAddons.filter((x) => x !== addon.id)
                                  : [...b.selectedAddons, addon.id],
                              }))
                            }
                            className={cn(
                              "flex w-full items-start justify-between gap-3 border p-3 text-left",
                              on
                                ? "border-[#52777A] bg-[#E8DDCB]/40"
                                : "border-[#27251F]/15",
                            )}
                          >
                            <div>
                              <p className="text-sm font-medium">{addon.name}</p>
                              <p className="mt-1 text-xs text-[#27251F]/65">
                                {addon.description}
                              </p>
                            </div>
                            <p className="shrink-0 text-sm">
                              {formatMoney(addon.price)}
                              <span className="text-[10px] text-[#27251F]/55">
                                {" "}
                                / {addon.per}
                              </span>
                            </p>
                          </button>
                        );
                      })}
                  </div>
                </StepShell>
              )}

              {bookingStep === 6 && (
                <StepShell title="Guest details">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="First name">
                      <input
                        value={booking.firstName}
                        onChange={(e) =>
                          setBooking((b) => ({
                            ...b,
                            firstName: e.target.value,
                          }))
                        }
                        className="w-full border border-[#27251F]/20 bg-[#F7F3EA] px-3 py-2"
                      />
                    </Field>
                    <Field label="Last name">
                      <input
                        value={booking.lastName}
                        onChange={(e) =>
                          setBooking((b) => ({
                            ...b,
                            lastName: e.target.value,
                          }))
                        }
                        className="w-full border border-[#27251F]/20 bg-[#F7F3EA] px-3 py-2"
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        type="email"
                        value={booking.email}
                        onChange={(e) =>
                          setBooking((b) => ({ ...b, email: e.target.value }))
                        }
                        className="w-full border border-[#27251F]/20 bg-[#F7F3EA] px-3 py-2"
                      />
                    </Field>
                    <Field label="Phone">
                      <input
                        value={booking.phone}
                        onChange={(e) =>
                          setBooking((b) => ({ ...b, phone: e.target.value }))
                        }
                        className="w-full border border-[#27251F]/20 bg-[#F7F3EA] px-3 py-2"
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Notes for the team">
                        <textarea
                          rows={3}
                          value={booking.notes}
                          onChange={(e) =>
                            setBooking((b) => ({ ...b, notes: e.target.value }))
                          }
                          className="w-full border border-[#27251F]/20 bg-[#F7F3EA] px-3 py-2"
                          placeholder="Arrival time, celebrations, dietary notes…"
                        />
                      </Field>
                    </div>
                  </div>
                </StepShell>
              )}

              {bookingStep === 7 && selectedRoomData && (
                <StepShell title="Transparent summary">
                  <dl className="space-y-2 text-sm">
                    <Row
                      label="Dates"
                      value={`${booking.checkIn} → ${booking.checkOut} (${nights} nights)`}
                    />
                    <Row
                      label="Guests"
                      value={`${booking.adults} adults${booking.children ? `, ${booking.children} children` : ""}`}
                    />
                    <Row label="Residence" value={selectedRoomData.name} />
                    <Row label="Room" value={formatMoney(roomTotal)} />
                    <Row
                      label="Enhancements"
                      value={
                        booking.selectedAddons.length
                          ? booking.selectedAddons
                              .map(
                                (id) =>
                                  addons.find((a) => a.id === id)?.name ?? id,
                              )
                              .join(", ")
                          : "None"
                      }
                    />
                    <Row label="Add-ons total" value={formatMoney(addonTotal)} />
                    <Row label="Guest" value={`${booking.firstName} ${booking.lastName}`} />
                    <div className="border-t border-[#27251F]/15 pt-3">
                      <Row label="Total" value={formatMoney(grandTotal)} strong />
                    </div>
                  </dl>
                  <p className="mt-4 text-xs text-[#27251F]/55">
                    Demo checkout only: no real payment is processed.
                  </p>
                </StepShell>
              )}

              {bookingStep === 8 && (
                <StepShell title="Demo checkout">
                  <div className="space-y-4 rounded-sm border border-[#27251F]/15 bg-[#E8DDCB]/35 p-4">
                    <p className="text-sm leading-relaxed">
                      This is a simulated payment step for the Zuri concept demo.
                      Confirm to generate a booking reference and add it to Business
                      View.
                    </p>
                    <p className="text-2xl" style={serifStyle}>
                      {formatMoney(grandTotal)}
                    </p>
                    <p className="text-xs text-[#27251F]/60">
                      Card · M-Pesa · Bank transfer: demo only
                    </p>
                  </div>
                </StepShell>
              )}

              {bookingStep === 9 && booking.bookingRef && (
                <div className="space-y-6 text-center">
                  <p className="text-[11px] tracking-[0.18em] text-[#52777A]">
                    YOU&apos;RE CONFIRMED
                  </p>
                  <h4 className="text-3xl" style={serifStyle}>
                    Welcome to Zuri
                  </h4>
                  <p className="font-mono text-lg tracking-[0.08em]">
                    {booking.bookingRef}
                  </p>
                  <p className="mx-auto max-w-md text-sm text-[#27251F]/75">
                    {selectedRoomData?.name} · {booking.checkIn} to{" "}
                    {booking.checkOut} · {formatMoney(grandTotal)}
                  </p>
                  <div className="mx-auto max-w-md border border-[#27251F]/15 bg-[#E8DDCB]/35 px-4 py-5 text-left">
                    <p className="text-[11px] tracking-[0.18em] text-[#52777A]">
                      YOUR DAY AT ZURI
                    </p>
                    <p className="mt-1 text-xs text-[#27251F]/60">
                      Personal rhythm{booking.selectedAddons.length ? ", updated for your add-ons" : ""}.
                    </p>
                    <ul className="mt-4 space-y-0 border-t border-[#27251F]/10">
                      {buildPersonalItinerary(booking.selectedAddons).map(
                        (item) => (
                          <li
                            key={`${item.time}-${item.title}`}
                            className={cn(
                              "border-b border-[#27251F]/10 py-3",
                              item.highlighted && "bg-[#52777A]/10 px-2 -mx-2",
                            )}
                          >
                            <div className="flex gap-3">
                              <span className="w-14 shrink-0 font-mono text-xs text-[#52777A]">
                                {item.time}
                              </span>
                              <div>
                                <p
                                  className="text-base"
                                  style={serifStyle}
                                >
                                  {item.title}
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-[#27251F]/70">
                                  {item.note}
                                </p>
                              </div>
                            </div>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <p className="text-xs text-[#27251F]/55">
                    Confirmation appears in Business View → Bookings.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={resetBooking}
                      className="bg-[#27251F] px-5 py-3 text-[11px] tracking-[0.14em] text-[#F7F3EA]"
                    >
                      DONE
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBookingOpen(false);
                        setView("business");
                        setBizTab("bookings");
                      }}
                      className="border border-[#27251F]/25 px-5 py-3 text-[11px] tracking-[0.14em]"
                    >
                      VIEW IN BUSINESS
                    </button>
                  </div>
                </div>
              )}
            </div>

            {bookingStep < 9 && (
              <div className="flex items-center justify-between gap-3 border-t border-[#27251F]/10 px-5 py-4 md:px-7">
                <button
                  type="button"
                  onClick={() =>
                    setBookingStep((s) =>
                      s > 1 ? ((s - 1) as BookingStep) : s,
                    )
                  }
                  disabled={bookingStep === 1}
                  className="text-[11px] tracking-[0.14em] disabled:opacity-30"
                >
                  BACK
                </button>
                {bookingStep < 8 ? (
                  <button
                    type="button"
                    disabled={!canAdvance(bookingStep, booking, nights, availableRooms)}
                    onClick={() =>
                      setBookingStep((s) => (s + 1) as BookingStep)
                    }
                    className="bg-[#27251F] px-5 py-2.5 text-[11px] tracking-[0.14em] text-[#F7F3EA] disabled:opacity-40"
                  >
                    CONTINUE
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={checkoutBusy}
                    onClick={completeCheckout}
                    className="bg-[#52777A] px-5 py-2.5 text-[11px] tracking-[0.14em] text-[#F7F3EA] disabled:opacity-60"
                  >
                    {checkoutBusy ? "PROCESSING…" : "CONFIRM DEMO PAYMENT"}
                  </button>
                )}
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function canAdvance(
  step: BookingStep,
  booking: BookingState,
  nights: number,
  availableRooms: Room[],
) {
  if (step === 1) return nights > 0;
  if (step === 2) return booking.adults >= 1;
  if (step === 3)
    return Boolean(booking.roomId) && availableRooms.some((r) => r.id === booking.roomId);
  if (step === 4) return Boolean(booking.roomId);
  if (step === 5) return true;
  if (step === 6)
    return Boolean(
      booking.firstName.trim() &&
        booking.lastName.trim() &&
        booking.email.trim(),
    );
  if (step === 7) return true;
  return true;
}

function GuestView({
  soldOut,
  roomPrices,
  onOpenRoom,
  onBook,
  onBookRoom,
  setDayMoment,
  setConcierge,
}: {
  soldOut: Record<RoomId, boolean>;
  roomPrices: Record<RoomId, number>;
  onOpenRoom: (room: Room) => void;
  onBook: () => void;
  onBookRoom: (roomId: RoomId) => void;
  setDayMoment: (m: DayMoment | null) => void;
  setConcierge: (q: ConciergeQA | null) => void;
}) {
  const [askText, setAskText] = useState("");

  function submitAsk() {
    const match = findConciergeByQuery(askText);
    if (match) setConcierge(match);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt="Zuri resort shoreline at dusk"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#27251F]/75 via-[#27251F]/25 to-[#27251F]/20" />
        <div className="relative z-10 flex min-h-[88vh] flex-col justify-end px-4 pb-16 pt-28 md:px-10 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-6xl"
          >
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#E8DDCB]/90">
              {coordinates}
            </p>
            <h1
              className="mt-4 max-w-3xl text-4xl leading-[1.05] text-[#F7F3EA] sm:text-5xl md:text-7xl"
              style={serifStyle}
            >
              TIME MOVES
              <br />
              DIFFERENTLY HERE.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#E8DDCB]/90 md:text-base">
              A quiet luxury resort on Zanzibar&apos;s western shore, ocean villas,
              garden residences and days that refuse to hurry.
            </p>
            <button
              type="button"
              onClick={onBook}
              className="mt-8 bg-[#F7F3EA] px-7 py-3.5 text-[11px] tracking-[0.2em] text-[#27251F] transition hover:bg-[#E8DDCB]"
            >
              BOOK YOUR STAY
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stay / Rooms */}
      <section id="stay" className="scroll-mt-28 px-4 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[0.2em] text-[#52777A]">STAY</p>
            <h2 className="mt-3 text-4xl md:text-5xl" style={serifStyle}>
              FIND YOUR SPACE.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#27251F]/75 md:text-base">
              Three residences along one shoreline. Choose by light, privacy and
              how close you want the water.
            </p>
          </motion.div>

          <div className="mt-14 space-y-16 md:space-y-24">
            {rooms.map((room, index) => (
              <motion.article
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className={cn(
                  "grid items-center gap-8 md:grid-cols-2 md:gap-12",
                  index % 2 === 1 && "md:[&>*:first-child]:order-2",
                )}
              >
                <button
                  type="button"
                  onClick={() => onOpenRoom(room)}
                  className="group relative aspect-[4/3] overflow-hidden bg-[#E8DDCB] text-left"
                >
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </button>
                <div>
                  <p className="text-[11px] tracking-[0.16em] text-[#52777A]">
                    {room.tagline.toUpperCase()}
                  </p>
                  <h3 className="mt-2 text-3xl md:text-4xl" style={serifStyle}>
                    {room.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#27251F]/75">
                    {room.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs tracking-[0.06em] text-[#27251F]/65">
                    <span>{room.sqm} sqm</span>
                    <span>Up to {room.occupancy}</span>
                    <span>{room.bed}</span>
                    <span>{room.view}</span>
                  </div>
                  <p className="mt-4 text-xl" style={serifStyle}>
                    {formatMoney(roomPrices[room.id])}
                    <span className="text-sm"> / night</span>
                  </p>
                  <p className="mt-1 text-xs text-[#27251F]/55">
                    {soldOut[room.id]
                      ? "Sold out in demo inventory"
                      : "Available · demo calendar"}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenRoom(room)}
                      className="border border-[#27251F]/25 px-4 py-2.5 text-[11px] tracking-[0.14em]"
                    >
                      VIEW DETAILS
                    </button>
                    <button
                      type="button"
                      disabled={soldOut[room.id]}
                      onClick={() => onBookRoom(room.id)}
                      className="bg-[#27251F] px-4 py-2.5 text-[11px] tracking-[0.14em] text-[#F7F3EA] disabled:opacity-40"
                    >
                      BOOK
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="scroll-mt-28 bg-[#E8DDCB]/55 px-4 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.2em] text-[#52777A]">EXPERIENCE</p>
          <h2 className="mt-3 text-4xl md:text-5xl" style={serifStyle}>
            SLOW DAYS. CLEAR WATER.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-[#27251F]/75">
            Reef mornings, spice walks, and a dhow at dusk, curated to feel like
            belonging, not a checklist.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {experiences.map((exp) => (
              <article key={exp.title}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="mt-4 text-xl" style={serifStyle}>
                  {exp.title}
                </h3>
                <p className="mt-2 text-sm text-[#27251F]/75">{exp.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Eat */}
      <section id="eat" className="scroll-mt-28 px-4 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.2em] text-[#52777A]">EAT</p>
          <h2 className="mt-3 text-4xl md:text-5xl" style={serifStyle}>
            FROM MARKET BOATS TO YOUR TABLE.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {diningNotes.map((d) => (
              <div key={d.title} className="border-t border-[#27251F]/15 pt-5">
                <h3 className="text-xl" style={serifStyle}>
                  {d.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#27251F]/75">
                  {d.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zanzibar */}
      <section
        id="zanzibar"
        className="scroll-mt-28 border-y border-[#27251F]/10 bg-[#27251F] px-4 py-20 text-[#F7F3EA] md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.2em] text-[#E8DDCB]/80">
            ZANZIBAR
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl" style={serifStyle}>
            AN ISLAND WITH ITS OWN CLOCK.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {zanzibarNotes.map((z) => (
              <div key={z.title}>
                <h3 className="text-xl text-[#E8DDCB]" style={serifStyle}>
                  {z.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#F7F3EA]/75">
                  {z.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Day */}
      <section id="day" className="scroll-mt-28 px-4 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.2em] text-[#52777A]">
            YOUR DAY AT ZURI
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl" style={serifStyle}>
            A SUGGESTED RHYTHM.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-[#27251F]/75">
            Open any moment for the feeling, the setting, and how to add it to
            your stay.
          </p>
          <div className="mt-12 space-y-0 border-t border-[#27251F]/15">
            {dayMoments.map((moment) => (
              <button
                key={moment.id}
                type="button"
                onClick={() => setDayMoment(moment)}
                className="group flex w-full items-center gap-4 border-b border-[#27251F]/15 py-5 text-left transition hover:bg-[#E8DDCB]/35 md:gap-8"
              >
                <span className="w-16 shrink-0 font-mono text-sm text-[#52777A] md:w-20">
                  {moment.time}
                </span>
                <span className="flex-1 text-xl md:text-2xl" style={serifStyle}>
                  {moment.title}
                </span>
                <span className="hidden max-w-xs text-sm text-[#27251F]/60 md:block">
                  {moment.blurb}
                </span>
                <span className="text-[11px] tracking-[0.14em] text-[#52777A] opacity-0 transition group-hover:opacity-100">
                  OPEN
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Ask Zuri */}
      <section
        id="concierge"
        className="scroll-mt-28 bg-[#E8DDCB]/45 px-4 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.2em] text-[#52777A]">
            ASK ZURI
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl" style={serifStyle}>
            YOUR CONCIERGE.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-[#27251F]/75">
            Predefined questions with actionable answers, or type your own. Demo
            of an intelligent guest assistant.
          </p>
          <form
            className="mt-8 flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              submitAsk();
            }}
          >
            <input
              value={askText}
              onChange={(e) => setAskText(e.target.value)}
              placeholder="Ask anything: spa, airport transfer, tomorrow…"
              className="flex-1 border border-[#27251F]/20 bg-[#F7F3EA] px-4 py-3 text-sm placeholder:text-[#27251F]/40"
            />
            <button
              type="submit"
              disabled={!askText.trim()}
              className="bg-[#27251F] px-6 py-3 text-[11px] tracking-[0.14em] text-[#F7F3EA] disabled:opacity-40"
            >
              ASK ZURI
            </button>
          </form>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {conciergeQuestions.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setConcierge(q)}
                className="border border-[#27251F]/15 bg-[#F7F3EA] px-5 py-4 text-left transition hover:border-[#52777A]"
              >
                <p className="text-lg" style={serifStyle}>
                  {q.question}
                </p>
                <p className="mt-2 text-[11px] tracking-[0.14em] text-[#52777A]">
                  ASK →
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section id="book" className="scroll-mt-28 px-4 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl border border-[#27251F]/10 bg-[#27251F] px-6 py-14 text-center text-[#F7F3EA] md:px-12">
          <h2 className="text-3xl md:text-5xl" style={serifStyle}>
            READY WHEN YOU ARE.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-[#E8DDCB]/85">
            Eight clear steps from dates to confirmation, no opaque fees, no dead
            ends.
          </p>
          <button
            type="button"
            onClick={onBook}
            className="mt-8 bg-[#F7F3EA] px-7 py-3.5 text-[11px] tracking-[0.2em] text-[#27251F]"
          >
            START BOOKING
          </button>
        </div>
      </section>

      <footer className="border-t border-[#27251F]/10 px-4 py-8 text-center">
        <p className="text-sm tracking-[0.28em]" style={serifStyle}>
          ZURI
        </p>
        <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-[#27251F]/50">
          KASI CONCEPT · DEMO DATA · NOT A REAL PROPERTY
        </p>
      </footer>
    </>
  );
}

function BusinessView({
  tab,
  setTab,
  bookings,
  soldOut,
  setSoldOut,
  roomPrices,
  setRoomPrices,
  addonEnabled,
  setAddonEnabled,
  guestRequests,
  setGuestRequests,
  contentState,
  setContentState,
}: {
  tab: BizTab;
  setTab: (t: BizTab) => void;
  bookings: DemoBooking[];
  soldOut: Record<RoomId, boolean>;
  setSoldOut: React.Dispatch<React.SetStateAction<Record<RoomId, boolean>>>;
  roomPrices: Record<RoomId, number>;
  setRoomPrices: React.Dispatch<React.SetStateAction<Record<RoomId, number>>>;
  addonEnabled: Record<string, boolean>;
  setAddonEnabled: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  guestRequests: GuestRequest[];
  setGuestRequests: React.Dispatch<React.SetStateAction<GuestRequest[]>>;
  contentState: typeof contentBlocks;
  setContentState: React.Dispatch<React.SetStateAction<typeof contentBlocks>>;
}) {
  const tabs: { id: BizTab; label: string }[] = [
    { id: "bookings", label: "Bookings" },
    { id: "occupancy", label: "Occupancy" },
    { id: "rooms", label: "Rooms" },
    { id: "pricing", label: "Pricing" },
    { id: "addons", label: "Add-ons" },
    { id: "requests", label: "Requests" },
    { id: "revenue", label: "Revenue" },
    { id: "content", label: "Content" },
  ];

  const occupied = rooms.filter((r) => soldOut[r.id]).length;
  const occPct = Math.round(
    ((rooms.length - occupied) / rooms.length) * 78 + occupied * 8,
  );

  return (
    <section className="min-h-[80vh] bg-[#F7F3EA] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-[#52777A]">
              OPERATIONS
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl" style={serifStyle}>
              Business View
            </h2>
            <p className="mt-2 text-sm text-[#27251F]/65">
              Live demo console: same truth guests see when you toggle inventory.
            </p>
          </div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-[#27251F]/45">
            DEMO DATA
          </p>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "shrink-0 border px-3 py-2 text-[11px] tracking-[0.12em]",
                tab === t.id
                  ? "border-[#52777A] bg-[#52777A] text-[#F7F3EA]"
                  : "border-[#27251F]/15 hover:border-[#52777A]/50",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8 border border-[#27251F]/10 bg-white/40 p-4 md:p-6">
          {tab === "bookings" && (
            <div className="space-y-3">
              <h3 className="text-lg" style={serifStyle}>
                Bookings ({bookings.length})
              </h3>
              {bookings.map((b) => {
                const room = rooms.find((r) => r.id === b.roomId);
                return (
                  <div
                    key={b.id}
                    className={cn(
                      "flex flex-col gap-2 border p-4 sm:flex-row sm:items-center sm:justify-between",
                      b.justNow
                        ? "border-[#52777A] bg-[#E8DDCB]/50"
                        : "border-[#27251F]/10",
                    )}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-mono text-xs text-[#52777A]">{b.id}</p>
                        {b.justNow && (
                          <span className="bg-[#52777A] px-2 py-0.5 font-mono text-[9px] tracking-[0.16em] text-[#F7F3EA]">
                            JUST NOW
                          </span>
                        )}
                      </div>
                      <p className="mt-1 font-medium">{b.guest}</p>
                      <p className="text-sm text-[#27251F]/65">
                        {room?.name} · {b.checkIn} → {b.checkOut} · {b.guests}{" "}
                        guests
                      </p>
                      {b.addons.length > 0 && (
                        <p className="mt-1 text-xs text-[#27251F]/55">
                          {b.addons.join(" · ")}
                        </p>
                      )}
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm uppercase tracking-[0.12em] text-[#52777A]">
                        {b.status}
                      </p>
                      <p className="mt-1" style={serifStyle}>
                        {formatMoney(b.total)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "occupancy" && (
            <div>
              <h3 className="text-lg" style={serifStyle}>
                Occupancy snapshot
              </h3>
              <p className="mt-4 text-5xl" style={serifStyle}>
                {Math.min(occPct, 96)}%
              </p>
              <p className="mt-2 text-sm text-[#27251F]/65">
                Next 14 days · influenced by sold-out toggles below
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {rooms.map((r) => (
                  <div
                    key={r.id}
                    className="border border-[#27251F]/10 p-4 text-sm"
                  >
                    <p style={serifStyle}>{r.name}</p>
                    <p className="mt-2 text-[#52777A]">
                      {soldOut[r.id] ? "Sold out" : `${r.units} open`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "rooms" && (
            <div className="space-y-3">
              <h3 className="text-lg" style={serifStyle}>
                Room management
              </h3>
              {rooms.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-3 border border-[#27251F]/10 p-4"
                >
                  <div>
                    <p style={serifStyle}>{r.name}</p>
                    <p className="text-sm text-[#27251F]/65">
                      {r.units} units · max {r.occupancy} guests
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSoldOut((s) => ({ ...s, [r.id]: !s[r.id] }))
                    }
                    className={cn(
                      "px-4 py-2 text-[11px] tracking-[0.12em]",
                      soldOut[r.id]
                        ? "bg-[#27251F] text-[#F7F3EA]"
                        : "border border-[#27251F]/25",
                    )}
                  >
                    {soldOut[r.id] ? "MARK AVAILABLE" : "TOGGLE SOLD OUT"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "pricing" && (
            <div className="space-y-4">
              <h3 className="text-lg" style={serifStyle}>
                Pricing
              </h3>
              {rooms.map((r) => (
                <label
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-3 border border-[#27251F]/10 p-4"
                >
                  <span style={serifStyle}>{r.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#27251F]/55">USD</span>
                    <input
                      type="number"
                      min={100}
                      step={10}
                      value={roomPrices[r.id]}
                      onChange={(e) =>
                        setRoomPrices((p) => ({
                          ...p,
                          [r.id]: Number(e.target.value) || 0,
                        }))
                      }
                      className="w-28 border border-[#27251F]/20 bg-[#F7F3EA] px-3 py-2 text-right"
                    />
                    <span className="text-sm">/ night</span>
                  </div>
                </label>
              ))}
              <p className="text-xs text-[#27251F]/55">
                Guest View prices update immediately.
              </p>
            </div>
          )}

          {tab === "addons" && (
            <div className="space-y-3">
              <h3 className="text-lg" style={serifStyle}>
                Add-ons catalogue
              </h3>
              {addons.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-wrap items-center justify-between gap-3 border border-[#27251F]/10 p-4"
                >
                  <div>
                    <p className="font-medium">{a.name}</p>
                    <p className="text-sm text-[#27251F]/65">
                      {formatMoney(a.price)} / {a.per}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setAddonEnabled((s) => ({ ...s, [a.id]: !s[a.id] }))
                    }
                    className={cn(
                      "px-4 py-2 text-[11px] tracking-[0.12em]",
                      addonEnabled[a.id]
                        ? "border border-[#52777A] text-[#52777A]"
                        : "bg-[#27251F]/10 text-[#27251F]/50",
                    )}
                  >
                    {addonEnabled[a.id] ? "ENABLED" : "DISABLED"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "requests" && (
            <div className="space-y-3">
              <h3 className="text-lg" style={serifStyle}>
                Guest requests
              </h3>
              {guestRequests.map((req) => (
                <div
                  key={req.id}
                  className="border border-[#27251F]/10 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{req.guest}</p>
                    <span className="text-[10px] tracking-[0.14em] uppercase text-[#52777A]">
                      {req.priority} · {req.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#27251F]/55">{req.room}</p>
                  <p className="mt-2 text-sm">{req.request}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(
                      ["open", "in-progress", "done"] as GuestRequest["status"][]
                    ).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() =>
                          setGuestRequests((list) =>
                            list.map((r) =>
                              r.id === req.id ? { ...r, status } : r,
                            ),
                          )
                        }
                        className={cn(
                          "px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase",
                          req.status === status
                            ? "bg-[#52777A] text-[#F7F3EA]"
                            : "border border-[#27251F]/15",
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "revenue" && (
            <div>
              <h3 className="text-lg" style={serifStyle}>
                Revenue
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {revenueSnapshot.map((item) => (
                  <div
                    key={item.label}
                    className="border border-[#27251F]/10 p-4"
                  >
                    <p className="text-[11px] tracking-[0.14em] text-[#27251F]/55">
                      {item.label.toUpperCase()}
                    </p>
                    <p className="mt-2 text-2xl" style={serifStyle}>
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-[#52777A]">{item.delta}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "content" && (
            <div className="space-y-3">
              <h3 className="text-lg" style={serifStyle}>
                Content
              </h3>
              {contentState.map((block) => (
                <div
                  key={block.id}
                  className="border border-[#27251F]/10 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{block.title}</p>
                    <button
                      type="button"
                      onClick={() =>
                        setContentState((list) =>
                          list.map((b) =>
                            b.id === block.id
                              ? {
                                  ...b,
                                  status:
                                    b.status === "published"
                                      ? "draft"
                                      : "published",
                                }
                              : b,
                          ),
                        )
                      }
                      className={cn(
                        "px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase",
                        block.status === "published"
                          ? "bg-[#52777A] text-[#F7F3EA]"
                          : "border border-[#27251F]/20",
                      )}
                    >
                      {block.status}
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-[#27251F]/75">{block.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Modal({
  children,
  onClose,
  wide,
}: {
  children: React.ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-[#27251F]/55 p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative z-10 max-h-[92vh] w-full overflow-hidden bg-[#F7F3EA] shadow-2xl",
          wide ? "max-w-xl" : "max-w-lg",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 text-[11px] tracking-[0.14em] text-[#27251F]/60 hover:text-[#27251F]"
        >
          CLOSE
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

function StepShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-4 text-xl" style={serifStyle}>
        {title}
      </h4>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-[11px] tracking-[0.12em] text-[#27251F]/55">
        {label.toUpperCase()}
      </span>
      {children}
    </label>
  );
}

function Counter({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between border border-[#27251F]/15 px-4 py-3">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className="h-8 w-8 border border-[#27251F]/20 disabled:opacity-30"
        >
          −
        </button>
        <span className="w-6 text-center">{value}</span>
        <button
          type="button"
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className="h-8 w-8 border border-[#27251F]/20 disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.14em] text-[#27251F]/45">
        {label.toUpperCase()}
      </p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-[#27251F]/55">{label}</dt>
      <dd className={cn("text-right", strong && "text-lg")} style={strong ? serifStyle : undefined}>
        {value}
      </dd>
    </div>
  );
}
