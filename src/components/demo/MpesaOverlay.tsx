"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type MpesaOverlayProps = {
  open: boolean;
  amountLabel: string;
  phoneHint?: string;
  onSuccess: () => void;
  onCancel: () => void;
};

/** Fake STK-push phone overlay for East Africa payment theatre. */
export function MpesaOverlay({
  open,
  amountLabel,
  phoneHint = "07XX XXX XXX",
  onSuccess,
  onCancel,
}: MpesaOverlayProps) {
  const [phase, setPhase] = useState<"push" | "pin" | "ok">("push");
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (!open) {
      setPhase("push");
      setPin("");
      return;
    }
    const t = setTimeout(() => setPhase("pin"), 900);
    return () => clearTimeout(t);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-4 sm:items-center">
      <div
        className="w-full max-w-[320px] overflow-hidden rounded-2xl bg-[#0b1f14] text-[#e8f5e9] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="M-Pesa payment"
      >
        <div className="bg-[#00A651] px-4 py-3 text-center text-sm font-semibold tracking-wide text-white">
          M-PESA
        </div>
        <div className="space-y-4 p-5">
          {phase === "push" && (
            <>
              <p className="text-center text-xs uppercase tracking-[0.14em] text-white/60">
                STK Push
              </p>
              <p className="text-center text-sm">
                Sending request to {phoneHint}…
              </p>
              <div className="mx-auto h-8 w-8 animate-pulse rounded-full border-2 border-[#00A651] border-t-transparent" />
            </>
          )}
          {phase === "pin" && (
            <>
              <p className="text-center text-xs text-white/60">
                Enter M-Pesa PIN to pay
              </p>
              <p className="text-center text-2xl font-semibold tracking-tight">
                {amountLabel}
              </p>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={(e) =>
                  setPin(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                className="w-full border border-white/20 bg-black/30 px-3 py-3 text-center text-lg tracking-[0.4em] outline-none focus:border-[#00A651]"
                placeholder="••••"
                autoFocus
              />
              <button
                type="button"
                disabled={pin.length < 4}
                onClick={() => {
                  setPhase("ok");
                  setTimeout(onSuccess, 700);
                }}
                className={cn(
                  "w-full py-3 text-sm font-semibold",
                  pin.length >= 4
                    ? "bg-[#00A651] text-white"
                    : "bg-white/10 text-white/40",
                )}
              >
                Pay
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="w-full text-center text-xs text-white/50"
              >
                Cancel
              </button>
            </>
          )}
          {phase === "ok" && (
            <p className="py-6 text-center text-sm text-[#00A651]">
              Payment received.
            </p>
          )}
        </div>
        <p className="border-t border-white/10 px-4 py-2 text-center text-[10px] tracking-[0.12em] text-white/35">
          DEMO ONLY · NO REAL CHARGE
        </p>
      </div>
    </div>
  );
}
