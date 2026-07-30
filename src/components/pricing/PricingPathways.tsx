import Link from "next/link";

const PATHS = [
  {
    href: "#websites",
    label: "I need a website",
    hint: "Packages from a simple page to a full site",
  },
  {
    href: "#bundles",
    label: "I want a ready-made package",
    hint: "Website plus booking, shop, or local tools together",
  },
  {
    href: "#browse",
    label: "I want to add something",
    hint: "Booking, payments, shop, languages, and more",
  },
  {
    href: "/start",
    label: "I'm not sure — help me choose",
    hint: "Tell us your goal and we recommend a fit",
  },
] as const;

/** Simple decision paths for non-technical buyers. */
export function PricingPathways() {
  return (
    <div className="mt-10">
      <p className="font-mono text-[10px] tracking-[0.18em] text-kasi-grey">
        START HERE
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {PATHS.map((path) => (
          <li key={path.href}>
            <Link
              href={path.href}
              className="group flex h-full flex-col border border-kasi-border px-4 py-4 transition hover:border-kasi-green/60"
            >
              <span className="text-[15px] text-kasi-ivory group-hover:text-kasi-green">
                {path.label}
              </span>
              <span className="mt-2 text-sm leading-relaxed text-kasi-grey">
                {path.hint}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
