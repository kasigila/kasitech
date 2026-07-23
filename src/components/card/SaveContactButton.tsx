"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

export function SaveContactButton() {
  const [hint, setHint] = useState(false);

  return (
    <div className="w-full">
      <a
        href="/card/vcf"
        download="KasiTech.vcf"
        onClick={() => {
          track("card_save_contact");
          setHint(true);
        }}
        className="flex w-full items-center justify-center bg-kasi-green px-6 py-4 text-sm font-medium tracking-[0.06em] text-kasi-black transition hover:brightness-95"
      >
        SAVE TO CONTACTS
      </a>
      {hint && (
        <p className="mt-3 text-center text-[12px] leading-relaxed text-kasi-grey">
          On iPhone or Android, choose Add to Contacts when the file opens.
        </p>
      )}
    </div>
  );
}
