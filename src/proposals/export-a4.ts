/**
 * Shared A4 HTML → PDF exporter for Credo proposals.
 */
import {
  mkdirSync,
  copyFileSync,
  writeFileSync,
  existsSync,
  statSync,
  cpSync,
  readdirSync,
  readFileSync,
  lstatSync,
} from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import puppeteer from "puppeteer-core";

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

function countPages(htmlPath: string): number {
  const html = readFileSync(htmlPath, "utf8");
  return html.match(/class="page[\s"]/g)?.length ?? 0;
}

export type ExportOpts = {
  srcDir: string;
  outPdfName: string;
  aliasPdfName?: string;
  publicFolderName: string;
  manifestName: string;
  meta: Record<string, unknown>;
};

export async function exportProposalPdf(opts: ExportOpts) {
  // This file lives at src/proposals/export-a4.ts → repo root is ../..
  const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  const SRC_DIR = resolve(ROOT, opts.srcDir);
  const HTML = resolve(SRC_DIR, "index.html");
  const OUT_DIR = resolve(ROOT, "public/proposals");
  const OUT_PDF = resolve(OUT_DIR, opts.outPdfName);

  if (!existsSync(HTML)) throw new Error(`Missing proposal HTML at ${HTML}`);
  mkdirSync(OUT_DIR, { recursive: true });

  const publicSrc = resolve(OUT_DIR, opts.publicFolderName);
  mkdirSync(publicSrc, { recursive: true });
  copyFileSync(HTML, resolve(publicSrc, "index.html"));
  if (existsSync(resolve(SRC_DIR, "styles.css"))) {
    copyFileSync(resolve(SRC_DIR, "styles.css"), resolve(publicSrc, "styles.css"));
  }
  if (existsSync(resolve(SRC_DIR, "README.md"))) {
    copyFileSync(resolve(SRC_DIR, "README.md"), resolve(publicSrc, "README.md"));
  }
  const assetsSrc = resolve(SRC_DIR, "assets");
  if (existsSync(assetsSrc)) {
    // Resolve symlinks by copying real trees
    mkdirSync(resolve(publicSrc, "assets"), { recursive: true });
    for (const entry of readdirSync(assetsSrc)) {
      const from = resolve(assetsSrc, entry);
      const to = resolve(publicSrc, "assets", entry);
      const st = lstatSync(from);
      if (st.isSymbolicLink() || st.isDirectory()) {
        cpSync(from, to, { recursive: true });
      } else {
        copyFileSync(from, to);
      }
    }
  }

  const pages = countPages(HTML);
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
      timeout: 180_000,
    });
    await page.evaluateHandle("document.fonts.ready");
    await new Promise((r) => setTimeout(r, 1200));
    const pdf = await page.pdf({
      path: OUT_PDF,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    if (opts.aliasPdfName) {
      copyFileSync(OUT_PDF, resolve(OUT_DIR, opts.aliasPdfName));
    }
    const bytes = pdf?.byteLength ?? statSync(OUT_PDF).size;
    writeFileSync(
      resolve(OUT_DIR, opts.manifestName),
      JSON.stringify({ ...opts.meta, pages, bytes, pdf: opts.outPdfName }, null, 2),
    );
    console.log(`Wrote ${OUT_PDF}`);
    console.log(`Pages  ${pages}`);
  } finally {
    await browser.close();
  }
}
