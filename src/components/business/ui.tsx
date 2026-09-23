import Link from "next/link";
import { logoutBusiness } from "@/lib/business-portal/actions";

export const fieldClass = "mt-1 h-11 w-full border border-kasi-border bg-black px-3 text-sm text-kasi-ivory";

export function Notice({ saved, error, savedText = "Saved." }: { saved?: string; error?: string; savedText?: string }) {
  if (error) return <p role="alert" className="mb-4 border border-red-400/40 px-4 py-3 text-sm">{error}</p>;
  if (saved) return <p role="status" className="mb-4 border border-kasi-border px-4 py-3 text-sm">{savedText}</p>;
  return null;
}

const links = [
  ["/business/unique-trends", "Home"],
  ["/business/unique-trends/products", "Products"],
  ["/business/unique-trends/categories", "Sections"],
  ["/business/unique-trends/brands", "Brands"],
  ["/business/unique-trends/collections", "Scents"],
  ["/business/unique-trends/orders", "Orders"],
  ["/business/unique-trends/homepage", "Front page"],
  ["/business/unique-trends/settings", "Shop details"],
  ["/business/unique-trends/account", "Password"],
];

export function DeskShell({ children, shopUrl }: { children: React.ReactNode; shopUrl: string }) {
  return (
    <div className="min-h-screen bg-kasi-black text-kasi-ivory lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="border-b border-kasi-border lg:border-b-0 lg:border-r">
        <div className="px-5 py-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-kasi-grey">KasiTech</p>
          <p className="mt-2 font-display text-2xl">Unique Trends TZ</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 lg:flex-col lg:px-3" aria-label="Shop desk">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="shrink-0 px-3 py-2 text-sm text-kasi-ivory/80 hover:text-kasi-green">
              {label}
            </Link>
          ))}
          {shopUrl ? (
            <a href={shopUrl} target="_blank" rel="noreferrer" className="shrink-0 px-3 py-2 text-sm text-kasi-grey hover:text-kasi-green">
              See the shop
            </a>
          ) : null}
          <form action={logoutBusiness} className="shrink-0">
            <button type="submit" className="px-3 py-2 text-sm text-kasi-grey hover:text-kasi-ivory">
              Sign out
            </button>
          </form>
        </nav>
      </aside>
      <div className="px-5 py-8 sm:px-8">{children}</div>
    </div>
  );
}

export function PageTitle({ title, text }: { title: string; text?: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-4xl tracking-[-0.03em]">{title}</h1>
      {text ? <p className="mt-2 max-w-2xl text-sm text-kasi-grey">{text}</p> : null}
    </div>
  );
}
