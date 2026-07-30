/**
 * Export Credo Energy Group Digital Transformation Proposal to PDF.
 * Uses system Chrome via puppeteer-core for print-faithful A4 output.
 *
 * Run: npm run proposal:credo
 */
import {
  mkdirSync,
  copyFileSync,
  writeFileSync,
  existsSync,
  statSync,
} from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");
const SRC_DIR = resolve(ROOT, "proposals/credo-energy-group");
const HTML = resolve(SRC_DIR, "index.html");
const OUT_DIR = resolve(ROOT, "public/proposals");
const OUT_PDF = resolve(
  OUT_DIR,
  "KasiTech_Credo_Energy_Group_Digital_Transformation_Proposal.pdf",
);
const OUT_ALIAS = resolve(OUT_DIR, "Credo_Energy_Group_Proposal.pdf");

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/usr/local/bin/google-chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean) as string[];

function findChrome(): string {
  for (const p of CHROME_CANDIDATES) {
    if (existsSync(p)) return p;
  }
  throw new Error(
    "Chrome/Chromium not found. Set CHROME_PATH or install Google Chrome.",
  );
}

async function main() {
  if (!existsSync(HTML)) {
    throw new Error(`Missing proposal HTML at ${HTML}`);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  // Keep a shareable copy of editable source under public for convenience
  const publicSrc = resolve(OUT_DIR, "credo-energy-group");
  mkdirSync(publicSrc, { recursive: true });
  copyFileSync(HTML, resolve(publicSrc, "index.html"));
  copyFileSync(
    resolve(SRC_DIR, "styles.css"),
    resolve(publicSrc, "styles.css"),
  );
  if (existsSync(resolve(SRC_DIR, "research.md"))) {
    copyFileSync(
      resolve(SRC_DIR, "research.md"),
      resolve(publicSrc, "research.md"),
    );
  }

  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--font-render-hinting=none",
    ],
  });

  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(HTML).href, {
      waitUntil: "networkidle0",
      timeout: 120_000,
    });
    // Allow webfonts to settle
    await page.evaluateHandle("document.fonts.ready");
    await new Promise((r) => setTimeout(r, 800));

    const pdf = await page.pdf({
      path: OUT_PDF,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    copyFileSync(OUT_PDF, OUT_ALIAS);

    const bytes = pdf?.byteLength ?? statSync(OUT_PDF).size;
    writeFileSync(
      resolve(OUT_DIR, "credo-proposal-manifest.json"),
      JSON.stringify(
        {
          title:
            "Digital Transformation Proposal — Credo Energy Group | KasiTech",
          ref: "KT-CEG-2026-001",
          date: "2026-07-30",
          pages: 20,
          pdf: "KasiTech_Credo_Energy_Group_Digital_Transformation_Proposal.pdf",
          editableSource: "proposals/credo-energy-group/",
          bytes,
        },
        null,
        2,
      ),
    );

    console.log(`Wrote ${OUT_PDF}`);
    console.log(`Alias  ${OUT_ALIAS}`);
    console.log(`Editable source: proposals/credo-energy-group/`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
