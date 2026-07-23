export function WhyKasiTech() {
  const items = [
    {
      t: "Beyond the screen",
      d: "Strategy first.",
    },
    {
      t: "For real people",
      d: "Clarity over tricks.",
    },
    {
      t: "Built for what's next",
      d: "Systems that can grow.",
    },
  ];

  return (
    <section className="bg-kasi-black px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
          WHY KASITECH
        </p>
        <div className="mt-8 grid gap-8 border-t border-kasi-border pt-8 md:grid-cols-3 md:gap-10">
          {items.map((item) => (
            <div key={item.t}>
              <h3 className="font-display text-2xl tracking-[-0.03em] md:text-3xl">
                {item.t}
              </h3>
              <p className="mt-3 text-sm text-kasi-grey">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
