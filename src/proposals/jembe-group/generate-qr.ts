import { mkdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import QRCode from "qrcode";
import { JEMBE_PREVIEW_URL } from "./commercial";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

async function writeQr(outPath: string) {
  mkdirSync(dirname(outPath), { recursive: true });
  const buf = await QRCode.toBuffer(JEMBE_PREVIEW_URL, {
    type: "png",
    width: 512,
    margin: 2,
    errorCorrectionLevel: "H",
    color: { dark: "#090909", light: "#FFFFFF" },
  });
  writeFileSync(outPath, buf);
  console.log(`Wrote ${outPath}`);
}

async function main() {
  await writeQr(resolve(ROOT, "proposals/jembe-group/assets/qr/preview.png"));
  await writeQr(resolve(ROOT, "proposals/jembe-invoice/assets/qr/preview.png"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
