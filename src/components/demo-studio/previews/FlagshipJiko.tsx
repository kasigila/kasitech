"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { FictionalBusiness } from "@/demo-studio/industries/businesses";
import type { PreviewCapabilities } from "@/demo-studio/configuration/capabilities";

type Props = {
  business: FictionalBusiness;
  caps: PreviewCapabilities;
  language: "en" | "sw";
  onLanguage?: (l: "en" | "sw") => void;
};

const MENU = [
  {
    cat: "Starters",
    items: [
      { name: "Mchicha croquettes", note: "Amaranth · lemon aioli", price: "18,000", diet: "V" },
      { name: "Zanzibar octopus", note: "Charred chilli · coconut", price: "28,000", diet: "" },
    ],
  },
  {
    cat: "Mains",
    items: [
      { name: "Nyama choma plate", note: "Slow fire · kachumbari · ugali", price: "42,000", diet: "GF" },
      { name: "Coastal prawn curry", note: "Coconut · cardamom · rice", price: "48,000", diet: "" },
      { name: "Garden coconut stew", note: "Seasonal vegetables · chapati", price: "32,000", diet: "V" },
    ],
  },
  {
    cat: "Sweets",
    items: [
      { name: "Mandazi & cream", note: "Vanilla · spice sugar", price: "14,000", diet: "V" },
    ],
  },
];

export function FlagshipJiko({ business: b, caps, language, onLanguage }: Props) {
  const [path, setPath] = useState("home");
  const [filter, setFilter] = useState<"all" | "V" | "GF">("all");
  const [cart, setCart] = useState<{ name: string; price: string }[]>([]);
  const [reserved, setReserved] = useState(false);

  const menu = useMemo(() => {
    if (!caps.menuAdvanced || filter === "all") return MENU;
    return MENU.map((sec) => ({
      ...sec,
      items: sec.items.filter((i) => i.diet === filter),
    })).filter((sec) => sec.items.length);
  }, [caps.menuAdvanced, filter]);

  return (
    <div className="h-full overflow-y-auto bg-[#0f0e0c] text-[#f3ebe1] [font-family:system-ui,sans-serif]">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 md:px-8">
        <button type="button" onClick={() => setPath("home")} className="text-left">
          <div className="text-lg font-semibold tracking-tight">{b.name}</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#d4a574]">
            Fire · Coast · Table
          </div>
        </button>
        <nav className="hidden gap-5 text-[11px] uppercase tracking-[0.14em] md:flex">
          {["Story", "Menu", ...(caps.events ? ["Events"] : []), "Visit"].map((n) => (
            <button key={n} type="button" className="opacity-80 hover:opacity-100" onClick={() => setPath(n.toLowerCase())}>
              {n}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {caps.multilingual && (
            <button
              type="button"
              className="border border-white/30 px-2 py-1 text-[10px]"
              onClick={() => onLanguage?.(language === "en" ? "sw" : "en")}
            >
              {language === "en" ? "SW" : "EN"}
            </button>
          )}
          {caps.reservations && (
            <button
              type="button"
              className="bg-[#d4a574] px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-[#0f0e0c]"
              onClick={() => {
                setReserved(false);
                setPath("reserve");
              }}
            >
              Reserve
            </button>
          )}
          {caps.ordering && (
            <button type="button" className="text-[11px]" onClick={() => setPath("order")}>
              Order ({cart.length})
            </button>
          )}
        </div>
      </header>

      {path === "home" && (
        <>
          <section className="relative h-[78vh] min-h-[420px]">
            <Image src="/demo/jiko/hero.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-[#0f0e0c]/45" />
            <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-16 text-center">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#d4a574]">
                {language === "sw" ? "Karibu mezani" : "Open fire · Coastal spice"}
              </p>
              <h1 className="mt-3 max-w-[18ch] text-4xl font-semibold leading-tight md:text-6xl">
                {language === "sw"
                  ? "Meza yenye moto na ladha za pwani"
                  : "A table built around fire, spice, and slow evenings"}
              </h1>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {caps.reservations && (
                  <button
                    type="button"
                    className="bg-[#d4a574] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#0f0e0c]"
                    onClick={() => setPath("reserve")}
                  >
                    Reserve a table
                  </button>
                )}
                {caps.menu && (
                  <button
                    type="button"
                    className="border border-white/40 px-5 py-3 text-[11px] uppercase tracking-wider"
                    onClick={() => setPath("menu")}
                  >
                    View menu
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-2">
            <div className="relative min-h-[320px]">
              <Image src="/demo/jiko/interior.jpg" alt="" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="flex flex-col justify-center px-8 py-12 md:px-12">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#d4a574]">Our story</p>
              <h2 className="mt-3 text-3xl font-semibold">From the jiko to your plate</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Chef Faraja cooks East African favourites over live fire — nyama
                choma, coastal curry, garden stews — served in a warm room near
                the waterfront. This is hospitality that feels local, not staged.
              </p>
            </div>
          </section>

          <section className="px-5 py-14 md:px-10">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#d4a574]">
                  Menu highlights
                </p>
                <h2 className="mt-2 text-3xl font-semibold">Tonight&apos;s fire</h2>
              </div>
              {caps.menu && (
                <button type="button" className="text-[11px] uppercase tracking-wider text-[#d4a574]" onClick={() => setPath("menu")}>
                  Full menu →
                </button>
              )}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { img: "/demo/jiko/dish-1.jpg", name: "Nyama choma plate", blurb: "Slow fire · kachumbari" },
                { img: "/demo/jiko/dish-2.jpg", name: "Coastal prawn curry", blurb: "Coconut · cardamom" },
              ].map((d) => (
                <article key={d.name} className="relative aspect-[16/10] overflow-hidden">
                  <Image src={d.img} alt="" fill className="object-cover" sizes="50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-medium">{d.name}</h3>
                    <p className="text-sm text-white/70">{d.blurb}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {caps.events && (
            <section className="border-y border-white/10 bg-[#161410] px-5 py-12 md:px-10">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#d4a574]">Events</p>
              <h2 className="mt-2 text-2xl font-semibold">Private tables & live nights</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="border border-white/10 p-5">
                  <h3 className="font-medium">Friday fire tasting</h3>
                  <p className="mt-2 text-sm text-white/65">Five courses · 19:30 · limited seats</p>
                </div>
                <div className="border border-white/10 p-5">
                  <h3 className="font-medium">Private courtyard</h3>
                  <p className="mt-2 text-sm text-white/65">Birthdays & team dinners · from 12 guests</p>
                </div>
              </div>
            </section>
          )}

          <section className="grid gap-3 px-5 py-12 sm:grid-cols-3 md:px-10">
            {["/demo/jiko/gallery-1.jpg", "/demo/jiko/gallery-2.jpg", "/demo/jiko/gallery-3.jpg"].map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden">
                <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </section>

          <section className="px-5 pb-14 md:px-10">
            <h2 className="text-2xl font-semibold">Find us</h2>
            <p className="mt-2 text-sm text-white/65">{b.city} · {b.phone}</p>
            <p className="text-sm text-white/65">Tue–Sun · 12:00–22:30 · Kitchen closes 21:45</p>
            {caps.googleBusiness && (
              <p className="mt-3 text-[12px] text-[#d4a574]">Listed on Google Business Profile</p>
            )}
            {caps.menuQr && (
              <p className="mt-2 text-[12px] text-white/50">Table QR opens this menu instantly</p>
            )}
          </section>

          <footer className="border-t border-white/10 px-5 py-6 text-center text-[10px] text-white/40">
            {b.name} · Demo Mode — fictional restaurant for KasiTech Demo Studio
          </footer>
        </>
      )}

      {path === "menu" && caps.menu && (
        <div className="px-5 pb-16 pt-24 md:px-10">
          <button type="button" className="text-sm text-white/60" onClick={() => setPath("home")}>
            ← Back
          </button>
          <h2 className="mt-4 text-4xl font-semibold">Menu</h2>
          {caps.menuAdvanced && (
            <div className="mt-4 flex gap-2">
              {(["all", "V", "GF"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`px-3 py-1 text-[11px] uppercase tracking-wider ${
                    filter === f ? "bg-[#d4a574] text-[#0f0e0c]" : "border border-white/20"
                  }`}
                  onClick={() => setFilter(f)}
                >
                  {f === "all" ? "All" : f === "V" ? "Vegetarian" : "Gluten-free"}
                </button>
              ))}
            </div>
          )}
          <div className="mt-8 space-y-10">
            {menu.map((sec) => (
              <div key={sec.cat}>
                <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#d4a574]">{sec.cat}</h3>
                <ul className="mt-4 space-y-4">
                  {sec.items.map((item) => (
                    <li key={item.name} className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                      <div>
                        <div className="font-medium">
                          {item.name}
                          {item.diet && caps.menuAdvanced && (
                            <span className="ml-2 text-[10px] text-[#d4a574]">{item.diet}</span>
                          )}
                        </div>
                        <div className="text-sm text-white/55">{item.note}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm">TSh {item.price}</span>
                        {caps.ordering && (
                          <button
                            type="button"
                            className="text-[11px] uppercase text-[#d4a574]"
                            onClick={() =>
                              setCart((c) => [...c, { name: item.name, price: item.price }])
                            }
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {path === "reserve" && caps.reservations && (
        <div className="mx-auto max-w-md px-5 pb-16 pt-24">
          <button type="button" className="text-sm text-white/60" onClick={() => setPath("home")}>
            ← Back
          </button>
          <h2 className="mt-4 text-3xl font-semibold">Reserve a table</h2>
          {!reserved ? (
            <form
              className="mt-6 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setReserved(true);
              }}
            >
              <input className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm" placeholder="Date" required />
              <input className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm" placeholder="Time" required />
              <input className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm" placeholder="Party size" required />
              <input className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm" placeholder="Name" required />
              <button type="submit" className="w-full bg-[#d4a574] py-3 text-[11px] font-semibold uppercase tracking-wider text-[#0f0e0c]">
                Confirm reservation
              </button>
            </form>
          ) : (
            <p className="mt-6 text-sm text-white/70">Table held (demo). No real reservation was made.</p>
          )}
        </div>
      )}

      {path === "order" && caps.ordering && (
        <div className="mx-auto max-w-md px-5 pb-16 pt-24">
          <button type="button" className="text-sm text-white/60" onClick={() => setPath("menu")}>
            ← Menu
          </button>
          <h2 className="mt-4 text-3xl font-semibold">Your order</h2>
          {cart.length === 0 ? (
            <p className="mt-4 text-sm text-white/60">Cart is empty — add dishes from the menu.</p>
          ) : (
            <ul className="mt-6 space-y-3">
              {cart.map((c, i) => (
                <li key={`${c.name}-${i}`} className="flex justify-between border-b border-white/10 pb-2 text-sm">
                  <span>{c.name}</span>
                  <span className="font-mono">TSh {c.price}</span>
                </li>
              ))}
            </ul>
          )}
          {caps.payments && cart.length > 0 && (
            <button
              type="button"
              className="mt-6 w-full border border-[#d4a574] py-3 text-[11px] uppercase tracking-wider text-[#d4a574]"
              onClick={() => alert("Demo checkout only — no real payment.")}
            >
              Simulated checkout
            </button>
          )}
        </div>
      )}

      {(path === "story" || path === "events" || path === "visit") && (
        <div className="px-5 pb-16 pt-24 md:px-10">
          <button type="button" className="text-sm text-white/60" onClick={() => setPath("home")}>
            ← Back
          </button>
          <h2 className="mt-4 text-3xl font-semibold capitalize">{path}</h2>
          <p className="mt-3 max-w-lg text-sm text-white/65">
            Full narrative lives on the home scroll for client demos — use Reserve / Menu to show commercial features.
          </p>
        </div>
      )}
    </div>
  );
}
