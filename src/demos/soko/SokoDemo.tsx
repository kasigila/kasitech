"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { DemoChrome } from "@/components/site/DemoChrome";
import { MpesaOverlay } from "@/components/demo/MpesaOverlay";
import { cn } from "@/lib/cn";
import {
  abandonedCarts,
  accountOrders,
  addresses,
  allSizes,
  businessOrders,
  businessStats,
  campaignLook,
  categories,
  customers,
  formatTzs,
  getProduct,
  heroImage,
  inventory,
  products,
  recommendSize,
  rewards,
  sizeGuide,
  wishlistIds,
  type Product,
  type LookPiece,
} from "./data";

type View =
  | "home"
  | "shop"
  | "product"
  | "size"
  | "look"
  | "checkout"
  | "confirm"
  | "account"
  | "business";

type CartItem = {
  productId: string;
  color: string;
  size: string;
  qty: number;
};

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

function DemoBadge() {
  return (
    <p className="font-mono text-[10px] tracking-[0.16em] text-black/45">
      KASI CONCEPT · DEMO DATA
    </p>
  );
}

export function SokoDemo() {
  const [mode, setMode] = useState<"customer" | "business">("customer");
  const [view, setView] = useState<View>("home");
  const [productId, setProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(wishlistIds);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [sizeFilter, setSizeFilter] = useState<string>("All");
  const [colorFilter, setColorFilter] = useState<string>("All");
  const [priceMax, setPriceMax] = useState(500000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");

  // PDP
  const [pdpColor, setPdpColor] = useState(0);
  const [pdpSize, setPdpSize] = useState("M");
  const [pdpImage, setPdpImage] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Find my size
  const [heightCm, setHeightCm] = useState(165);
  const [bust, setBust] = useState(88);
  const [waist, setWaist] = useState(70);
  const [hip, setHip] = useState(96);
  const [fitPref, setFitPref] = useState<"fitted" | "regular" | "relaxed">(
    "regular",
  );
  const [sizeRec, setSizeRec] = useState<{ size: string; note: string } | null>(
    null,
  );
  const [sizeHold, setSizeHold] = useState<{ size: string } | null>(null);

  // Look
  const [lookSlots, setLookSlots] = useState<LookPiece[]>(
    () => campaignLook.pieces.map((p) => ({ ...p })),
  );
  const [lookSelected, setLookSelected] = useState<string[]>(
    campaignLook.pieces.map((p) => p.productId),
  );

  // Checkout
  const [payment, setPayment] = useState<"mpesa" | "airtel" | "card">("mpesa");
  const [mpesaOpen, setMpesaOpen] = useState(false);
  const [delivery, setDelivery] = useState<"dar" | "tz" | "intl">("dar");
  const [phone, setPhone] = useState("+255 7");
  const [accountTab, setAccountTab] = useState<
    "orders" | "tracking" | "returns" | "wishlist" | "addresses" | "rewards"
  >("orders");
  const [bizTab, setBizTab] = useState<
    "orders" | "revenue" | "inventory" | "products" | "customers" | "abandoned"
  >("orders");

  const allColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.colors.forEach((c) => set.add(c.name)));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (sizeFilter !== "All")
      list = list.filter((p) => p.sizes.includes(sizeFilter));
    if (colorFilter !== "All")
      list = list.filter((p) => p.colors.some((c) => c.name === colorFilter));
    list = list.filter((p) => p.price <= priceMax);
    if (onlyAvailable) list = list.filter((p) => p.available);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [search, category, sizeFilter, colorFilter, priceMax, onlyAvailable, sort]);

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => {
    const p = getProduct(i.productId);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);

  const deliveryFee =
    delivery === "dar" ? 0 : delivery === "tz" ? 15000 : 85000;

  function openProduct(id: string) {
    const p = getProduct(id);
    if (!p) return;
    setProductId(id);
    setPdpColor(0);
    setPdpSize(p.sizes.includes("M") ? "M" : p.sizes[0]);
    setPdpImage(0);
    setView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(
    id: string,
    color: string,
    size: string,
    qty = 1,
    open = true,
  ) {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === id && i.color === color && i.size === size,
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { productId: id, color, size, qty }];
    });
    if (open) setCartOpen(true);
  }

  function updateQty(index: number, qty: number) {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((_, i) => i !== index);
      const next = [...prev];
      next[index] = { ...next[index], qty };
      return next;
    });
  }

  function toggleWishlist(id: string) {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function placeOrder() {
    const id = `SK-${4800 + Math.floor(Math.random() * 90)}`;
    setOrderId(id);
    setCart([]);
    setCartOpen(false);
    setMpesaOpen(false);
    setView("confirm");
  }

  function requestCheckout() {
    if (payment === "mpesa") {
      setMpesaOpen(true);
      return;
    }
    placeOrder();
  }

  function swapLookPiece(index: number, newProductId: string) {
    setLookSlots((prev) => {
      const oldId = prev[index]?.productId;
      return prev.map((slot, i) =>
        i === index ? { ...slot, productId: newProductId } : slot,
      );
    });
    setLookSelected((prev) => {
      const oldId = lookSlots[index]?.productId;
      if (!oldId || !prev.includes(oldId)) return prev;
      return [...prev.filter((x) => x !== oldId), newProductId];
    });
  }

  function switchMode(next: "customer" | "business") {
    setMode(next);
    setView(next === "business" ? "business" : "home");
    setCartOpen(false);
  }

  const product = productId ? getProduct(productId) : null;

  return (
    <div className="min-h-screen bg-[#F7F5F0] pt-12 text-black">
      <DemoChrome slug="soko" />

      <header className="sticky top-12 z-40 border-b border-black/10 bg-[#F7F5F0]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
          <button
            type="button"
            className="font-[Georgia,serif] text-xl tracking-[0.18em]"
            onClick={() => {
              setMode("customer");
              setView("home");
            }}
          >
            SOKO
          </button>
          <nav className="hidden items-center gap-6 text-[12px] tracking-[0.12em] uppercase md:flex">
            <NavBtn
              active={view === "shop" || view === "product"}
              onClick={() => setView("shop")}
            >
              Shop
            </NavBtn>
            <NavBtn active={view === "look"} onClick={() => setView("look")}>
              Complete the Look
            </NavBtn>
            <NavBtn active={view === "size"} onClick={() => setView("size")}>
              Find My Size
            </NavBtn>
            <NavBtn
              active={view === "account"}
              onClick={() => setView("account")}
            >
              Account
            </NavBtn>
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-black/15 p-0.5 text-[10px] tracking-wider uppercase">
              <button
                type="button"
                className={cn(
                  "rounded-full px-2.5 py-1",
                  mode === "customer" && "bg-black text-white",
                )}
                onClick={() => switchMode("customer")}
              >
                Customer
              </button>
              <button
                type="button"
                className={cn(
                  "rounded-full px-2.5 py-1",
                  mode === "business" && "bg-black text-white",
                )}
                onClick={() => switchMode("business")}
              >
                Business
              </button>
            </div>
            {mode === "customer" && (
              <button
                type="button"
                className="relative border border-black px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase"
                onClick={() => setCartOpen(true)}
              >
                Cart
                {cartCount > 0 && (
                  <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center bg-black px-1 text-[10px] text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto border-t border-black/5 px-4 py-2 md:hidden">
          {(
            [
              ["shop", "Shop"],
              ["look", "Look"],
              ["size", "Size"],
              ["account", "Account"],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              className={cn(
                "shrink-0 px-3 py-1 text-[11px] tracking-wider uppercase",
                view === v && "bg-black text-white",
              )}
              onClick={() => {
                setMode("customer");
                setView(v);
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
          <HomeView
            onDiscover={() => setView("shop")}
            onLook={() => setView("look")}
            onOpen={openProduct}
          />
        ) : view === "shop" ? (
          <ShopView
            products={filtered}
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            sizeFilter={sizeFilter}
            setSizeFilter={setSizeFilter}
            colorFilter={colorFilter}
            setColorFilter={setColorFilter}
            allColors={allColors}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            onlyAvailable={onlyAvailable}
            setOnlyAvailable={setOnlyAvailable}
            sort={sort}
            setSort={setSort}
            wishlist={wishlist}
            onToggleWish={toggleWishlist}
            onOpen={openProduct}
          />
        ) : view === "product" && product ? (
          <ProductView
            product={product}
            colorIdx={pdpColor}
            setColorIdx={setPdpColor}
            size={pdpSize}
            setSize={setPdpSize}
            imageIdx={pdpImage}
            setImageIdx={setPdpImage}
            sizeGuideOpen={sizeGuideOpen}
            setSizeGuideOpen={setSizeGuideOpen}
            wished={wishlist.includes(product.id)}
            onToggleWish={() => toggleWishlist(product.id)}
            onAdd={() =>
              addToCart(
                product.id,
                product.colors[pdpColor].name,
                pdpSize,
              )
            }
            onOpen={openProduct}
            onFindSize={() => setView("size")}
            heldSize={sizeHold?.size ?? null}
          />
        ) : view === "size" ? (
          <SizeFinder
            heightCm={heightCm}
            setHeightCm={setHeightCm}
            bust={bust}
            setBust={setBust}
            waist={waist}
            setWaist={setWaist}
            hip={hip}
            setHip={setHip}
            fitPref={fitPref}
            setFitPref={setFitPref}
            sizeRec={sizeRec}
            sizeHold={sizeHold}
            onRecommend={() =>
              setSizeRec(
                recommendSize({
                  heightCm,
                  bust,
                  waist,
                  hip,
                  fit: fitPref,
                }),
              )
            }
            onHoldSize={() => {
              if (sizeRec) setSizeHold({ size: sizeRec.size });
            }}
            onShop={() => {
              if (sizeRec) setSizeFilter(sizeRec.size);
              setView("shop");
            }}
          />
        ) : view === "look" ? (
          <CompleteTheLook
            slots={lookSlots}
            selected={lookSelected}
            setSelected={setLookSelected}
            onSwap={swapLookPiece}
            onAddOne={(id) => {
              const p = getProduct(id);
              if (!p) return;
              addToCart(id, p.colors[0].name, p.sizes[0]);
            }}
            onAddLook={() => {
              lookSlots.forEach((slot) => {
                const p = getProduct(slot.productId);
                if (!p) return;
                if (!lookSelected.includes(slot.productId)) return;
                addToCart(
                  slot.productId,
                  p.colors[0].name,
                  p.sizes.includes("M") ? "M" : p.sizes[0],
                  1,
                  false,
                );
              });
              setCartOpen(true);
            }}
          />
        ) : view === "checkout" ? (
          <CheckoutView
            cart={cart}
            payment={payment}
            setPayment={setPayment}
            delivery={delivery}
            setDelivery={setDelivery}
            phone={phone}
            setPhone={setPhone}
            cartTotal={cartTotal}
            deliveryFee={deliveryFee}
            onPlace={requestCheckout}
            onBack={() => setCartOpen(true)}
          />
        ) : view === "confirm" && orderId ? (
          <ConfirmView
            orderId={orderId}
            payment={payment}
            delivery={delivery}
            onContinue={() => setView("account")}
            onShop={() => setView("shop")}
          />
        ) : view === "account" ? (
          <AccountView
            tab={accountTab}
            setTab={setAccountTab}
            wishlist={wishlist}
            onOpen={openProduct}
            onToggleWish={toggleWishlist}
          />
        ) : null}
      </main>

      <MpesaOverlay
        open={mpesaOpen}
        amountLabel={formatTzs(cartTotal + deliveryFee)}
        phoneHint={phone.trim() || "07XX XXX XXX"}
        onSuccess={placeOrder}
        onCancel={() => setMpesaOpen(false)}
      />

      {/* Cart drawer / bottom sheet */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
          />
          <aside
            className={cn(
              "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#F7F5F0] shadow-2xl",
              "max-md:top-auto max-md:h-[85vh] max-md:max-w-none max-md:rounded-t-2xl",
            )}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <h2 className="font-[Georgia,serif] text-xl">Bag</h2>
              <button
                type="button"
                className="text-sm text-black/60"
                onClick={() => setCartOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.length === 0 ? (
                <p className="text-sm text-black/55">Your bag is empty.</p>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item, i) => {
                    const p = getProduct(item.productId);
                    if (!p) return null;
                    return (
                      <li key={`${item.productId}-${i}`} className="flex gap-3">
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-black/5">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {p.name}
                          </p>
                          <p className="text-xs text-black/50">
                            {item.color} · {item.size}
                          </p>
                          <p className="mt-1 text-sm">{formatTzs(p.price)}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              className="h-7 w-7 border border-black/20"
                              onClick={() => updateQty(i, item.qty - 1)}
                            >
                              −
                            </button>
                            <span className="text-sm">{item.qty}</span>
                            <button
                              type="button"
                              className="h-7 w-7 border border-black/20"
                              onClick={() => updateQty(i, item.qty + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="border-t border-black/10 p-5">
              <div className="mb-3 flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">{formatTzs(cartTotal)}</span>
              </div>
              <button
                type="button"
                disabled={cart.length === 0}
                className="w-full bg-black py-3.5 text-[12px] tracking-[0.16em] text-white uppercase disabled:opacity-40"
                onClick={() => {
                  setCartOpen(false);
                  setView("checkout");
                }}
              >
                Checkout
              </button>
            </div>
          </aside>
        </div>
      )}
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
        "hover:opacity-70",
        active && "underline underline-offset-4",
      )}
    >
      {children}
    </button>
  );
}

function HomeView({
  onDiscover,
  onLook,
  onOpen,
}: {
  onDiscover: () => void;
  onLook: () => void;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="space-y-16">
      <section className="relative -mx-4 min-h-[70vh] overflow-hidden md:mx-0 md:min-h-[75vh]">
        <Image
          src={heroImage}
          alt="SOKO Collection 02"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
          <p className="font-mono text-[11px] tracking-[0.22em] text-white/80">
            COLLECTION 02 / 2026
          </p>
          <h1 className="mt-3 max-w-xl font-[Georgia,serif] text-4xl leading-[1.05] text-white md:text-6xl">
            BETWEEN WORLDS.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
            Soft structure for coastal cities. Linen, silk, and tailored ease for
            Dar evenings.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onDiscover}
              className="bg-white px-6 py-3 text-[12px] tracking-[0.16em] text-black uppercase"
            >
              Discover Collection
            </button>
            <button
              type="button"
              onClick={onLook}
              className="border border-white/70 px-6 py-3 text-[12px] tracking-[0.16em] text-white uppercase"
            >
              Complete the Look
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-[Georgia,serif] text-2xl md:text-3xl">
            New arrivals
          </h2>
          <button
            type="button"
            className="text-[11px] tracking-[0.14em] uppercase underline"
            onClick={onDiscover}
          >
            View all
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCard({
  product,
  onOpen,
  wished,
  onToggleWish,
}: {
  product: Product;
  onOpen: (id: string) => void;
  wished?: boolean;
  onToggleWish?: () => void;
}) {
  return (
    <article className="group">
      <button
        type="button"
        className="relative block aspect-[3/4] w-full overflow-hidden bg-black/5"
        onClick={() => onOpen(product.id)}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 50vw, 25vw"
        />
        {!product.available && (
          <span className="absolute left-2 top-2 bg-white/90 px-2 py-1 text-[10px] tracking-wider uppercase">
            Waitlist
          </span>
        )}
      </button>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <button
            type="button"
            className="text-left text-sm font-medium"
            onClick={() => onOpen(product.id)}
          >
            {product.name}
          </button>
          <p className="mt-0.5 text-xs text-black/50">{product.category}</p>
          <p className="mt-1 text-sm">{formatTzs(product.price)}</p>
        </div>
        {onToggleWish && (
          <button
            type="button"
            aria-label="Wishlist"
            className="text-lg leading-none"
            onClick={onToggleWish}
          >
            {wished ? "♥" : "♡"}
          </button>
        )}
      </div>
    </article>
  );
}

function ShopView({
  products: list,
  search,
  setSearch,
  category,
  setCategory,
  sizeFilter,
  setSizeFilter,
  colorFilter,
  setColorFilter,
  allColors,
  priceMax,
  setPriceMax,
  onlyAvailable,
  setOnlyAvailable,
  sort,
  setSort,
  wishlist,
  onToggleWish,
  onOpen,
}: {
  products: Product[];
  search: string;
  setSearch: (v: string) => void;
  category: (typeof categories)[number];
  setCategory: (v: (typeof categories)[number]) => void;
  sizeFilter: string;
  setSizeFilter: (v: string) => void;
  colorFilter: string;
  setColorFilter: (v: string) => void;
  allColors: string[];
  priceMax: number;
  setPriceMax: (v: number) => void;
  onlyAvailable: boolean;
  setOnlyAvailable: (v: boolean) => void;
  sort: SortKey;
  setSort: (v: SortKey) => void;
  wishlist: string[];
  onToggleWish: (id: string) => void;
  onOpen: (id: string) => void;
}) {
  return (
    <div>
      <h1 className="font-[Georgia,serif] text-3xl md:text-4xl">Shop</h1>
      <p className="mt-2 text-sm text-black/55">
        Filter by fit, color, and availability: {list.length} pieces
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-5 text-sm">
          <label className="block">
            <span className="text-[11px] tracking-[0.14em] uppercase text-black/50">
              Search
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Dress, linen, tote…"
              className="mt-1.5 w-full border border-black/15 bg-transparent px-3 py-2 outline-none focus:border-black"
            />
          </label>
          <div>
            <p className="text-[11px] tracking-[0.14em] uppercase text-black/50">
              Category
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    "border px-2.5 py-1 text-xs",
                    category === c
                      ? "border-black bg-black text-white"
                      : "border-black/15",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.14em] uppercase text-black/50">
              Size
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Chip
                active={sizeFilter === "All"}
                onClick={() => setSizeFilter("All")}
              >
                All
              </Chip>
              {allSizes.map((s) => (
                <Chip
                  key={s}
                  active={sizeFilter === s}
                  onClick={() => setSizeFilter(s)}
                >
                  {s}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.14em] uppercase text-black/50">
              Color
            </p>
            <select
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
              className="mt-1.5 w-full border border-black/15 bg-transparent px-3 py-2"
            >
              {allColors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <label className="block">
            <span className="text-[11px] tracking-[0.14em] uppercase text-black/50">
              Max price · {formatTzs(priceMax)}
            </span>
            <input
              type="range"
              min={50000}
              max={500000}
              step={5000}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
            />
            In stock only
          </label>
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs text-black/50">{list.length} results</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-black/15 bg-transparent px-2 py-1.5 text-xs"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="name">Name</option>
            </select>
          </div>
          {list.length === 0 ? (
            <p className="py-16 text-center text-sm text-black/50">
              No pieces match these filters. Try widening size or price.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {list.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onOpen={onOpen}
                  wished={wishlist.includes(p.id)}
                  onToggleWish={() => onToggleWish(p.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({
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
        "border px-2.5 py-1 text-xs",
        active ? "border-black bg-black text-white" : "border-black/15",
      )}
    >
      {children}
    </button>
  );
}

function ProductView({
  product,
  colorIdx,
  setColorIdx,
  size,
  setSize,
  imageIdx,
  setImageIdx,
  sizeGuideOpen,
  setSizeGuideOpen,
  wished,
  onToggleWish,
  onAdd,
  onOpen,
  onFindSize,
  heldSize,
}: {
  product: Product;
  colorIdx: number;
  setColorIdx: (n: number) => void;
  size: string;
  setSize: (s: string) => void;
  imageIdx: number;
  setImageIdx: (n: number) => void;
  sizeGuideOpen: boolean;
  setSizeGuideOpen: (v: boolean) => void;
  wished: boolean;
  onToggleWish: () => void;
  onAdd: () => void;
  onOpen: (id: string) => void;
  onFindSize: () => void;
  heldSize: string | null;
}) {
  const stock = product.stock[size] ?? 0;
  const related = product.related
    .map((id) => getProduct(id))
    .filter(Boolean) as Product[];

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
            <Image
              src={product.images[imageIdx]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="mt-3 flex gap-2">
            {product.images.map((src, i) => (
              <button
                key={src}
                type="button"
                className={cn(
                  "relative h-16 w-14 overflow-hidden border",
                  imageIdx === i ? "border-black" : "border-transparent",
                )}
                onClick={() => setImageIdx(i)}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-black/50">
            {product.category}
          </p>
          <h1 className="mt-2 font-[Georgia,serif] text-3xl md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-lg">{formatTzs(product.price)}</p>
          {heldSize && (
            <p className="mt-3 border border-black/15 bg-white/70 px-3 py-2 text-sm">
              We held your size <strong>{heldSize}</strong> for 48 hours - Gold
              perk.
            </p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-black/70">
            {product.description}
          </p>
          <p className="mt-2 text-xs text-black/45">{product.fabric}</p>

          <div className="mt-6">
            <p className="text-[11px] tracking-[0.14em] uppercase text-black/50">
              Color · {product.colors[colorIdx].name}
            </p>
            <div className="mt-2 flex gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  className={cn(
                    "h-8 w-8 rounded-full border-2",
                    colorIdx === i ? "border-black" : "border-transparent",
                  )}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setColorIdx(i)}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] tracking-[0.14em] uppercase text-black/50">
                Size
              </p>
              <div className="flex gap-3 text-[11px] tracking-wider uppercase">
                <button
                  type="button"
                  className="underline"
                  onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                >
                  Size guide
                </button>
                <button type="button" className="underline" onClick={onFindSize}>
                  Find my size
                </button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const sStock = product.stock[s] ?? 0;
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={sStock === 0}
                    onClick={() => setSize(s)}
                    className={cn(
                      "min-w-11 border px-3 py-2 text-sm",
                      size === s
                        ? "border-black bg-black text-white"
                        : "border-black/20",
                      sStock === 0 && "opacity-30 line-through",
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            {sizeGuideOpen && (
              <div className="mt-4 overflow-x-auto border border-black/10 p-3 text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      {sizeGuide.titles.map((t) => (
                        <th key={t} className="pb-2 pr-4 font-medium">
                          {t}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuide.rows.map((row) => (
                      <tr key={row[0]} className="border-t border-black/5">
                        {row.map((cell) => (
                          <td key={cell} className="py-1.5 pr-4">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <p className="mt-4 text-sm text-black/60">
            {stock > 5
              ? "In stock: ships within 24h"
              : stock > 0
                ? `Only ${stock} left in ${size}`
                : "Out of stock in this size"}
          </p>
          <p className="mt-1 text-xs text-black/45">
            Dar same-day delivery available at checkout · Easy returns within 14
            days
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!product.available || stock === 0}
              onClick={onAdd}
              className="bg-black px-8 py-3.5 text-[12px] tracking-[0.16em] text-white uppercase disabled:opacity-40"
            >
              Add to bag
            </button>
            <button
              type="button"
              onClick={onToggleWish}
              className="border border-black/25 px-5 py-3.5 text-[12px] tracking-[0.14em] uppercase"
            >
              {wished ? "Saved ♥" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-[Georgia,serif] text-2xl">You may also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={onOpen} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SizeFinder({
  heightCm,
  setHeightCm,
  bust,
  setBust,
  waist,
  setWaist,
  hip,
  setHip,
  fitPref,
  setFitPref,
  sizeRec,
  sizeHold,
  onRecommend,
  onHoldSize,
  onShop,
}: {
  heightCm: number;
  setHeightCm: (n: number) => void;
  bust: number;
  setBust: (n: number) => void;
  waist: number;
  setWaist: (n: number) => void;
  hip: number;
  setHip: (n: number) => void;
  fitPref: "fitted" | "regular" | "relaxed";
  setFitPref: (v: "fitted" | "regular" | "relaxed") => void;
  sizeRec: { size: string; note: string } | null;
  sizeHold: { size: string } | null;
  onRecommend: () => void;
  onHoldSize: () => void;
  onShop: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-[Georgia,serif] text-3xl md:text-4xl">Find My Size</h1>
      <p className="mt-3 text-sm text-black/60">
        Enter your measurements and fit preference. We&apos;ll recommend a size
        across the collection.
      </p>
      <div className="mt-8 space-y-5">
        <Field
          label={`Height · ${heightCm} cm`}
          type="range"
          min={145}
          max={190}
          value={heightCm}
          onChange={setHeightCm}
        />
        <Field
          label={`Bust · ${bust} cm`}
          type="range"
          min={70}
          max={120}
          value={bust}
          onChange={setBust}
        />
        <Field
          label={`Waist · ${waist} cm`}
          type="range"
          min={55}
          max={110}
          value={waist}
          onChange={setWaist}
        />
        <Field
          label={`Hip · ${hip} cm`}
          type="range"
          min={75}
          max={130}
          value={hip}
          onChange={setHip}
        />
        <div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-black/50">
            Fit preference
          </p>
          <div className="mt-2 flex gap-2">
            {(["fitted", "regular", "relaxed"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFitPref(f)}
                className={cn(
                  "flex-1 border py-2.5 text-xs capitalize",
                  fitPref === f
                    ? "border-black bg-black text-white"
                    : "border-black/20",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={onRecommend}
          className="w-full bg-black py-3.5 text-[12px] tracking-[0.16em] text-white uppercase"
        >
          Get recommendation
        </button>
        {sizeRec && (
          <div className="border border-black/15 bg-white/50 p-5">
            <p className="text-[11px] tracking-[0.14em] uppercase text-black/50">
              Recommended size
            </p>
            <p className="mt-2 font-[Georgia,serif] text-4xl">{sizeRec.size}</p>
            <p className="mt-2 text-sm text-black/65">{sizeRec.note}</p>
            {sizeHold?.size === sizeRec.size ? (
              <p className="mt-4 border border-black/10 bg-[#F4F2EA] px-3 py-2 text-sm">
                We held your size <strong>{sizeHold.size}</strong> for 48 hours -
                Gold perk.
              </p>
            ) : (
              <button
                type="button"
                onClick={onHoldSize}
                className="mt-4 w-full border border-black bg-white py-3 text-[12px] tracking-[0.14em] uppercase"
              >
                Hold size {sizeRec.size} for 48 hours
              </button>
            )}
            <button
              type="button"
              onClick={onShop}
              className="mt-3 text-[12px] tracking-[0.14em] uppercase underline"
            >
              Shop size {sizeRec.size}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  type: string;
  min: number;
  max: number;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.14em] uppercase text-black/50">
        {label}
      </span>
      <input
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full"
      />
    </label>
  );
}

function CompleteTheLook({
  slots,
  selected,
  setSelected,
  onSwap,
  onAddOne,
  onAddLook,
}: {
  slots: LookPiece[];
  selected: string[];
  setSelected: (ids: string[]) => void;
  onSwap: (index: number, newProductId: string) => void;
  onAddOne: (id: string) => void;
  onAddLook: () => void;
}) {
  const toggle = (id: string) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id],
    );
  };
  const total = selected.reduce((sum, id) => {
    const p = getProduct(id);
    return sum + (p?.price ?? 0);
  }, 0);
  const lookTotal = slots.reduce((sum, slot) => {
    const p = getProduct(slot.productId);
    return sum + (p?.price ?? 0);
  }, 0);

  const swapOptionsFor = (currentId: string) => {
    const current = getProduct(currentId);
    if (!current) return [];
    return products
      .filter(
        (p) =>
          p.id !== currentId &&
          p.available &&
          (p.category === current.category ||
            (current.category === "Accessories" &&
              p.category === "Accessories")),
      )
      .slice(0, 3);
  };

  return (
    <div>
      <p className="text-[11px] tracking-[0.18em] uppercase text-black/50">
        Campaign
      </p>
      <h1 className="mt-2 font-[Georgia,serif] text-3xl md:text-4xl">
        {campaignLook.title}
      </h1>
      <p className="mt-2 text-sm text-black/60">{campaignLook.subtitle}</p>
      <p className="mt-3 text-sm">
        Look total{" "}
        <strong className="font-[Georgia,serif] text-xl">
          {formatTzs(lookTotal)}
        </strong>
        <span className="text-black/50"> · swap one piece to rewrite the story</span>
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
          <Image
            src={campaignLook.image}
            alt={campaignLook.title}
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-sm text-black/65">
            Select the pieces you want. Swap one item and watch the outfit price
            update.
          </p>
          <ul className="mt-6 space-y-4">
            {slots.map((piece, index) => {
              const p = getProduct(piece.productId);
              if (!p) return null;
              const on = selected.includes(p.id);
              const swaps = swapOptionsFor(p.id);
              return (
                <li
                  key={`${piece.role}-${p.id}`}
                  className={cn(
                    "border p-3",
                    on ? "border-black bg-white/60" : "border-black/10",
                  )}
                >
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="relative h-24 w-20 shrink-0 overflow-hidden"
                      onClick={() => toggle(p.id)}
                    >
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                    <div className="flex flex-1 flex-col">
                      <p className="text-[10px] tracking-[0.14em] uppercase text-black/45">
                        {piece.role}
                      </p>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm">{formatTzs(p.price)}</p>
                      <div className="mt-auto flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => toggle(p.id)}
                          className="border border-black/20 px-2.5 py-1 text-[11px] uppercase"
                        >
                          {on ? "Selected" : "Select"}
                        </button>
                        <button
                          type="button"
                          onClick={() => onAddOne(p.id)}
                          className="bg-black px-2.5 py-1 text-[11px] text-white uppercase"
                        >
                          Add one
                        </button>
                      </div>
                    </div>
                  </div>
                  {swaps.length > 0 && (
                    <div className="mt-3 border-t border-black/10 pt-3">
                      <p className="text-[10px] tracking-[0.14em] uppercase text-black/45">
                        Swap for
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {swaps.map((alt) => (
                          <button
                            key={alt.id}
                            type="button"
                            onClick={() => onSwap(index, alt.id)}
                            className="border border-black/15 px-2.5 py-1.5 text-left text-[11px] hover:border-black"
                          >
                            {alt.name}
                            <span className="mt-0.5 block text-black/50">
                              {formatTzs(alt.price)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-6 border-t border-black/10 pt-4">
            <div className="flex justify-between text-sm">
              <span>{selected.length} pieces selected</span>
              <span className="font-medium">{formatTzs(total)}</span>
            </div>
            <button
              type="button"
              disabled={selected.length === 0}
              onClick={onAddLook}
              className="mt-4 w-full bg-black py-3.5 text-[12px] tracking-[0.16em] text-white uppercase disabled:opacity-40"
            >
              Add complete look
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutView({
  cart,
  payment,
  setPayment,
  delivery,
  setDelivery,
  phone,
  setPhone,
  cartTotal,
  deliveryFee,
  onPlace,
  onBack,
}: {
  cart: CartItem[];
  payment: "mpesa" | "airtel" | "card";
  setPayment: (v: "mpesa" | "airtel" | "card") => void;
  delivery: "dar" | "tz" | "intl";
  setDelivery: (v: "dar" | "tz" | "intl") => void;
  phone: string;
  setPhone: (v: string) => void;
  cartTotal: number;
  deliveryFee: number;
  onPlace: () => void;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg">
      <button
        type="button"
        onClick={onBack}
        className="text-xs tracking-wider uppercase text-black/50"
      >
        ← Back to bag
      </button>
      <h1 className="mt-4 font-[Georgia,serif] text-3xl">Checkout</h1>
      <p className="mt-2 text-sm text-black/55">
        Demo checkout: no real charges. {cart.length} item
        {cart.length === 1 ? "" : "s"}.
      </p>

      <div className="mt-8">
        <p className="text-[11px] tracking-[0.14em] uppercase text-black/50">
          Delivery
        </p>
        <div className="mt-2 space-y-2">
          {(
            [
              ["dar", "Dar es Salaam: same-day", "Free"],
              ["tz", "Tanzania mainland: 2-4 days", "TZS 15,000"],
              ["intl", "International: 7-12 days", "TZS 85,000"],
            ] as const
          ).map(([id, label, fee]) => (
            <button
              key={id}
              type="button"
              onClick={() => setDelivery(id)}
              className={cn(
                "flex w-full items-center justify-between border px-4 py-3 text-left text-sm",
                delivery === id
                  ? "border-black bg-white"
                  : "border-black/15",
              )}
            >
              <span>{label}</span>
              <span className="text-black/50">{fee}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-[11px] tracking-[0.14em] uppercase text-black/50">
          Payment
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(
            [
              ["mpesa", "M-Pesa"],
              ["airtel", "Airtel Money"],
              ["card", "Cards"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setPayment(id)}
              className={cn(
                "border py-3 text-xs",
                payment === id
                  ? "border-black bg-black text-white"
                  : "border-black/15",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        {(payment === "mpesa" || payment === "airtel") && (
          <label className="mt-4 block text-sm">
            <span className="text-black/50">Phone number</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1.5 w-full border border-black/15 bg-transparent px-3 py-2.5 outline-none focus:border-black"
            />
          </label>
        )}
        {payment === "card" && (
          <div className="mt-4 space-y-3 text-sm">
            <input
              placeholder="Card number · 4242 ····"
              className="w-full border border-black/15 bg-transparent px-3 py-2.5"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="MM/YY"
                className="border border-black/15 bg-transparent px-3 py-2.5"
              />
              <input
                placeholder="CVC"
                className="border border-black/15 bg-transparent px-3 py-2.5"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-2 border-t border-black/10 pt-4 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatTzs(cartTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{deliveryFee === 0 ? "Free" : formatTzs(deliveryFee)}</span>
        </div>
        <div className="flex justify-between text-base font-medium">
          <span>Total</span>
          <span>{formatTzs(cartTotal + deliveryFee)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onPlace}
        className="mt-6 w-full bg-black py-3.5 text-[12px] tracking-[0.16em] text-white uppercase"
      >
        Place demo order
      </button>
    </div>
  );
}

function ConfirmView({
  orderId,
  payment,
  delivery,
  onContinue,
  onShop,
}: {
  orderId: string;
  payment: string;
  delivery: string;
  onContinue: () => void;
  onShop: () => void;
}) {
  const payLabel =
    payment === "mpesa"
      ? "M-Pesa"
      : payment === "airtel"
        ? "Airtel Money"
        : "Card";
  const delLabel =
    delivery === "dar"
      ? "Dar same-day"
      : delivery === "tz"
        ? "Tanzania"
        : "International";

  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <p className="text-[11px] tracking-[0.18em] uppercase text-black/50">
        Order confirmed
      </p>
      <h1 className="mt-3 font-[Georgia,serif] text-3xl">Thank you.</h1>
      <p className="mt-4 text-sm text-black/60">
        Your demo order <span className="font-medium text-black">{orderId}</span>{" "}
        is confirmed via {payLabel}. Delivery: {delLabel}.
      </p>
      <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-black/40">
        DEMO DATA · NO REAL CHARGE
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onContinue}
          className="bg-black px-6 py-3 text-[12px] tracking-[0.14em] text-white uppercase"
        >
          View account
        </button>
        <button
          type="button"
          onClick={onShop}
          className="border border-black/25 px-6 py-3 text-[12px] tracking-[0.14em] uppercase"
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
}

function AccountView({
  tab,
  setTab,
  wishlist,
  onOpen,
  onToggleWish,
}: {
  tab: "orders" | "tracking" | "returns" | "wishlist" | "addresses" | "rewards";
  setTab: (t: typeof tab) => void;
  wishlist: string[];
  onOpen: (id: string) => void;
  onToggleWish: (id: string) => void;
}) {
  const tabs = [
    ["orders", "Orders"],
    ["tracking", "Tracking"],
    ["returns", "Returns"],
    ["wishlist", "Wishlist"],
    ["addresses", "Addresses"],
    ["rewards", "Rewards"],
  ] as const;

  return (
    <div>
      <h1 className="font-[Georgia,serif] text-3xl">Account</h1>
      <p className="mt-2 text-sm text-black/55">Neema Rweyemamu · Demo profile</p>
      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-black/10 pb-px">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "shrink-0 px-3 py-2 text-[11px] tracking-[0.12em] uppercase",
              tab === id && "border-b-2 border-black",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "orders" && (
          <ul className="space-y-3">
            {accountOrders.map((o) => (
              <li
                key={o.id}
                className="flex flex-wrap items-center justify-between gap-2 border border-black/10 p-4"
              >
                <div>
                  <p className="font-medium">{o.id}</p>
                  <p className="text-xs text-black/50">
                    {o.date} · {o.items.join(", ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{formatTzs(o.total)}</p>
                  <p className="text-xs text-black/50">{o.status}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {tab === "tracking" && (
          <ul className="space-y-3">
            {accountOrders
              .filter((o) => o.tracking)
              .map((o) => (
                <li key={o.id} className="border border-black/10 p-4">
                  <p className="font-medium">{o.id}</p>
                  <p className="mt-1 text-sm">
                    Tracking:{" "}
                    <span className="font-mono text-xs">{o.tracking}</span>
                  </p>
                  <p className="mt-2 text-xs text-black/50">
                    Status: {o.status} · Last scan: DSM sorting hub
                  </p>
                </li>
              ))}
          </ul>
        )}
        {tab === "returns" && (
          <ul className="space-y-3">
            {accountOrders
              .filter((o) => o.status === "Returned")
              .map((o) => (
                <li key={o.id} className="border border-black/10 p-4 text-sm">
                  <p className="font-medium">{o.id} · Returned</p>
                  <p className="mt-1 text-black/60">
                    {o.items.join(", ")}: refund processed to original payment.
                  </p>
                </li>
              ))}
            <p className="text-xs text-black/45">
              Start a return from any Delivered order within 14 days.
            </p>
          </ul>
        )}
        {tab === "wishlist" && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {wishlist.map((id) => {
              const p = getProduct(id);
              if (!p) return null;
              return (
                <ProductCard
                  key={id}
                  product={p}
                  onOpen={onOpen}
                  wished
                  onToggleWish={() => onToggleWish(id)}
                />
              );
            })}
            {wishlist.length === 0 && (
              <p className="col-span-full text-sm text-black/50">
                Wishlist is empty.
              </p>
            )}
          </div>
        )}
        {tab === "addresses" && (
          <ul className="space-y-3">
            {addresses.map((a) => (
              <li key={a.id} className="border border-black/10 p-4 text-sm">
                <p className="font-medium">{a.label}</p>
                <p className="mt-1 text-black/65">{a.line}</p>
                <p className="text-black/65">{a.city}</p>
                <p className="mt-1 text-xs text-black/45">{a.phone}</p>
              </li>
            ))}
          </ul>
        )}
        {tab === "rewards" && (
          <div className="border border-black/10 p-6">
            <p className="text-[11px] tracking-[0.14em] uppercase text-black/50">
              {rewards.tier} member
            </p>
            <p className="mt-2 font-[Georgia,serif] text-4xl">
              {rewards.points.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-black/55">points · {rewards.nextTier}</p>
            <ul className="mt-5 space-y-2 text-sm">
              {rewards.perks.map((perk) => (
                <li key={perk}>· {perk}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function BusinessView({
  tab,
  setTab,
}: {
  tab: "orders" | "revenue" | "inventory" | "products" | "customers" | "abandoned";
  setTab: (t: typeof tab) => void;
}) {
  const tabs = [
    ["orders", "Orders"],
    ["revenue", "Revenue"],
    ["inventory", "Inventory"],
    ["products", "Products"],
    ["customers", "Customers"],
    ["abandoned", "Abandoned"],
  ] as const;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] tracking-[0.16em] uppercase text-black/45">
            Merchant ops
          </p>
          <h1 className="mt-1 font-[Georgia,serif] text-3xl">Business</h1>
        </div>
        <DemoBadge />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Revenue today" value={formatTzs(businessStats.revenueToday)} />
        <Stat label="This week" value={formatTzs(businessStats.revenueWeek)} />
        <Stat label="Open orders" value={String(businessStats.ordersOpen)} />
        <Stat label="Conversion" value={businessStats.conversion} />
      </div>

      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-black/10">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "shrink-0 px-3 py-2 text-[11px] tracking-[0.12em] uppercase",
              tab === id && "border-b-2 border-black",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto">
        {tab === "orders" && (
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-[11px] tracking-wider uppercase text-black/45">
              <tr>
                <th className="pb-2 pr-3 font-medium">Order</th>
                <th className="pb-2 pr-3 font-medium">Customer</th>
                <th className="pb-2 pr-3 font-medium">Total</th>
                <th className="pb-2 pr-3 font-medium">Pay</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {businessOrders.map((o) => (
                <tr key={o.id} className="border-t border-black/8">
                  <td className="py-2.5 pr-3 font-mono text-xs">{o.id}</td>
                  <td className="py-2.5 pr-3">{o.customer}</td>
                  <td className="py-2.5 pr-3">{formatTzs(o.total)}</td>
                  <td className="py-2.5 pr-3">{o.channel}</td>
                  <td className="py-2.5">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "revenue" && (
          <div className="grid gap-4 md:grid-cols-3">
            <Stat label="Today" value={formatTzs(businessStats.revenueToday)} />
            <Stat label="7-day" value={formatTzs(businessStats.revenueWeek)} />
            <Stat label="Avg order" value="TZS 378,000" />
            <div className="md:col-span-3 border border-black/10 p-5">
              <p className="text-[11px] tracking-[0.14em] uppercase text-black/45">
                Channel mix
              </p>
              <div className="mt-4 flex h-8 overflow-hidden">
                <div className="flex w-[52%] items-center justify-center bg-black text-[10px] text-white">
                  M-Pesa 52%
                </div>
                <div className="flex w-[28%] items-center justify-center bg-black/40 text-[10px] text-white">
                  Card 28%
                </div>
                <div className="flex w-[20%] items-center justify-center bg-black/20 text-[10px]">
                  Airtel 20%
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === "inventory" && (
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-[11px] tracking-wider uppercase text-black/45">
              <tr>
                <th className="pb-2 pr-3 font-medium">SKU</th>
                <th className="pb-2 pr-3 font-medium">Product</th>
                <th className="pb-2 pr-3 font-medium">Size</th>
                <th className="pb-2 pr-3 font-medium">Stock</th>
                <th className="pb-2 font-medium">Reserved</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((row) => (
                <tr key={row.sku} className="border-t border-black/8">
                  <td className="py-2.5 pr-3 font-mono text-xs">{row.sku}</td>
                  <td className="py-2.5 pr-3">
                    {row.product}
                    <span className="text-black/40"> · {row.color}</span>
                  </td>
                  <td className="py-2.5 pr-3">{row.size}</td>
                  <td
                    className={cn(
                      "py-2.5 pr-3",
                      row.stock === 0 && "font-medium text-red-700",
                    )}
                  >
                    {row.stock}
                  </td>
                  <td className="py-2.5">{row.reserved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "products" && (
          <div className="grid gap-3 sm:grid-cols-2">
            {products.slice(0, 8).map((p) => (
              <div
                key={p.id}
                className="flex gap-3 border border-black/10 p-3"
              >
                <div className="relative h-16 w-14 shrink-0 overflow-hidden">
                  <Image
                    src={p.images[0]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0 text-sm">
                  <p className="truncate font-medium">{p.name}</p>
                  <p className="text-xs text-black/45">{p.category}</p>
                  <p className="mt-1">{formatTzs(p.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "customers" && (
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="text-[11px] tracking-wider uppercase text-black/45">
              <tr>
                <th className="pb-2 pr-3 font-medium">Customer</th>
                <th className="pb-2 pr-3 font-medium">Orders</th>
                <th className="pb-2 pr-3 font-medium">Spent</th>
                <th className="pb-2 font-medium">Last active</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-t border-black/8">
                  <td className="py-2.5 pr-3">{c.name}</td>
                  <td className="py-2.5 pr-3">{c.orders}</td>
                  <td className="py-2.5 pr-3">{formatTzs(c.spent)}</td>
                  <td className="py-2.5">{c.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "abandoned" && (
          <ul className="space-y-3">
            {abandonedCarts.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-2 border border-black/10 p-4 text-sm"
              >
                <div>
                  <p className="font-medium">{a.email}</p>
                  <p className="text-xs text-black/45">
                    {a.items} items · {a.abandonedAt}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span>{formatTzs(a.value)}</span>
                  <button
                    type="button"
                    className="border border-black px-3 py-1.5 text-[11px] tracking-wider uppercase"
                  >
                    Send reminder
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-black/10 p-4">
      <p className="text-[10px] tracking-[0.14em] uppercase text-black/45">
        {label}
      </p>
      <p className="mt-2 text-lg font-medium tabular-nums">{value}</p>
    </div>
  );
}
