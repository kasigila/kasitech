import Link from "next/link";
import type { PriceItem } from "@/data/catalog";
import { displayPrice } from "@/lib/format-tsh";
import { cn } from "@/lib/cn";

export function SectionEyebrow({
  num,
  children,
}: {
  num: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-[11px] tracking-[0.14em] text-kasi-green">
        {num}
      </span>
      <span className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
        {children}
      </span>
    </div>
  );
}

export function PriceList({
  items,
  className,
}: {
  items: PriceItem[];
  className?: string;
}) {
  return (
    <ul className={cn("divide-y divide-kasi-border border-t border-kasi-border", className)}>
      {items.map((item) => (
        <li
          key={item.name}
          className="grid gap-2 py-5 sm:grid-cols-[minmax(0,1.1fr)_auto] sm:items-baseline sm:gap-8"
        >
          <div>
            <p className="text-[15px] text-kasi-ivory">{item.name}</p>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-kasi-grey">
              {item.detail}
            </p>
          </div>
          <p
            className={cn(
              "font-mono text-sm tracking-[-0.01em] sm:text-right",
              item.price === "custom" ? "text-kasi-green" : "text-kasi-ivory",
            )}
          >
            {displayPrice(item.price, item.suffix)}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function DemoLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="inline-block font-mono text-[11px] tracking-[0.14em] text-kasi-green transition hover:underline"
    >
      {label.toUpperCase()} →
    </Link>
  );
}
