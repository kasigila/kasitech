"use client";

export default function BusinessError({ error }: { error: Error }) {
  return (
    <main className="mx-auto max-w-lg px-6 py-24 text-kasi-ivory">
      <h1 className="font-display text-4xl">The shop desk could not be opened.</h1>
      <p className="mt-4 text-sm text-kasi-grey">{error.message}</p>
    </main>
  );
}
