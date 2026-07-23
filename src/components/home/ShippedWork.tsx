import Link from "next/link";
import { shippedWork } from "@/data/shipped-work";

export function ShippedWork() {
  return (
    <section className="bg-kasi-ivory px-5 py-24 text-kasi-black md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-black/50">
          SHIPPED WORK
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-4xl tracking-[-0.04em] md:text-6xl">
          LIVE ON THE
          <br />
          INTERNET.
        </h2>
        <p className="mt-6 max-w-xl text-lg text-kasi-black/65">
          Real sites for real organisations. Concept demos below show range.
          This is work that shipped.
        </p>

        <div className="mt-16 space-y-8">
          {shippedWork.map((w) => (
            <article
              key={w.id}
              className="grid gap-6 border-t border-kasi-black/15 pt-10 md:grid-cols-[1fr_1.2fr] md:items-end"
            >
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-kasi-black/45">
                  {w.role.toUpperCase()} · {w.location.toUpperCase()} · {w.year}
                </p>
                <h3 className="mt-4 font-display text-3xl tracking-[-0.03em] md:text-5xl">
                  {w.name}
                </h3>
              </div>
              <div>
                <p className="max-w-xl text-base leading-relaxed text-kasi-black/70">
                  {w.summary}
                </p>
                <a
                  href={w.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block text-sm tracking-wide text-kasi-black underline decoration-kasi-black/30 underline-offset-4 hover:decoration-kasi-black"
                >
                  Visit live site ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-14 text-sm text-kasi-black/50">
          More client work will land here over time.{" "}
          <Link href="/start" className="text-kasi-black underline underline-offset-4">
            Start my project
          </Link>{" "}
          if you want yours next.
        </p>
      </div>
    </section>
  );
}
