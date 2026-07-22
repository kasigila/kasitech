export function WhyKasiTech() {
  const items = [
    {
      t: "WE THINK BEYOND THE SCREEN.",
      d: "Business strategy informs what gets built.",
    },
    {
      t: "WE DESIGN FOR REAL PEOPLE.",
      d: "Clear journeys before visual tricks.",
    },
    {
      t: "WE BUILD FOR WHAT'S NEXT.",
      d: "Technology capable of evolving with the business.",
    },
  ];

  return (
    <section className="bg-kasi-black px-5 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px] space-y-20">
        {items.map((item) => (
          <div key={item.t} className="max-w-3xl border-t border-kasi-border pt-10">
            <h3 className="font-display text-3xl tracking-[-0.03em] md:text-5xl">
              {item.t}
            </h3>
            <p className="mt-6 text-lg text-kasi-grey">{item.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
