import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
        404
      </p>
      <h1 className="mt-6 font-display text-4xl tracking-[-0.04em] md:text-6xl">
        TOOK A WRONG TURN?
      </h1>
      <p className="mt-6 text-kasi-grey">Let&apos;s get you back.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
        <Link href="/" className="hover:text-kasi-green">
          Home
        </Link>
        <Link href="/work" className="hover:text-kasi-green">
          Work
        </Link>
        <Link href="/start" className="text-kasi-green">
          Start a Project
        </Link>
      </div>
    </div>
  );
}
