/** Format catalog prices as Tanzanian Shillings (TSh). */
export function formatTsh(amount: number): string {
  return `TSh ${amount.toLocaleString("en-TZ")}`;
}

/** Display helper for catalog price strings that may be custom / monthly. */
export function displayPrice(
  price: number | "custom",
  suffix?: string,
): string {
  if (price === "custom") return "Custom Quote";
  const base = formatTsh(price);
  return suffix ? `${base}${suffix}` : base;
}
