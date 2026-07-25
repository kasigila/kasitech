"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projectCovers } from "@/data/images";
import { SafeImage } from "@/components/ui/SafeImage";

const products = [
  {
    href: "/work/kasi-flow",
    name: "Kasi Flow",
    blurb: "Operations software that keeps work moving.",
    slug: "kasi-flow",
  },
  {
    href: "/work/kasi-intelligence",
    name: "Kasi Intelligence",
    blurb: "Answers and automation with evidence first.",
    slug: "kasi-intelligence",
  },
] as const;

export function CompanyBeyond() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="border-t border-kasi-border bg-kasi-black px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div id="products">
            <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-grey">
              KASI PRODUCTS
            </p>
            <h2 className="mt-5 max-w-[12ch] font-display text-4xl leading-[0.98] tracking-[-0.04em] md:text-5xl">
              BUILT TO MOVE WITH THE BUSINESS.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-kasi-grey">
              Proprietary products grow beside client work - same craft, reusable
              systems.
            </p>
          </div>

          <div className="space-y-4">
            {products.map((product, i) => (
              <motion.div
                key={product.href}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.08 + i * 0.1 }}
              >
                <Link
                  href={product.href}
                  className="group grid overflow-hidden border border-kasi-border transition hover:border-kasi-green md:grid-cols-[14rem_1fr]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-kasi-border md:aspect-auto md:min-h-[8.5rem]">
                    <SafeImage
                      src={projectCovers[product.slug] ?? projectCovers.amani}
                      alt=""
                      fill
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                      sizes="224px"
                      fallbackLabel={product.name}
                    />
                  </div>
                  <div className="flex flex-col justify-center px-5 py-5 md:px-7 md:py-6">
                    <p className="font-display text-2xl tracking-[-0.03em] transition group-hover:text-kasi-green md:text-3xl">
                      {product.name}
                    </p>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-kasi-grey md:text-base">
                      {product.blurb}
                    </p>
                    <p className="mt-4 text-xs tracking-wide text-kasi-ivory/70 group-hover:text-kasi-green">
                      Explore →
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          id="lab"
          className="mt-20 border-t border-kasi-border pt-12"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.28 }}
        >
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-kasi-green">
                KASI LAB
              </p>
              <h2 className="mt-4 font-display text-3xl tracking-[-0.035em] md:text-4xl">
                EXPERIMENTS AND PROTOTYPES.
              </h2>
              <p className="mt-4 max-w-md text-base text-kasi-grey">
                A space to try ideas early - before they become products or client
                systems.
              </p>
            </div>
            <Link
              href="/lab"
              className="inline-block border border-kasi-border px-5 py-3 text-sm tracking-wide text-kasi-ivory transition hover:border-kasi-green hover:text-kasi-green"
            >
              ENTER THE LAB →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
