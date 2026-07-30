import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage, type PDFImage } from "pdf-lib";
import QRCode from "qrcode";
import { PRICE_BOOK_VERSION } from "@/commercial/types";
import { displayItemPrice } from "@/commercial/catalog/presentation";
import {
  FAQ_ENTRIES,
  WEB_BASELINE_INCLUDED,
  buildBundleGuides,
  buildCapabilityGuides,
  buildCareGuides,
  buildKbGuides,
  buildPackageGuides,
  formatMoney,
} from "@/commercial/catalog/buying-guide-content";
import {
  CATALOG_QR_TARGETS,
  DEMO_STUDIO_ORIGIN,
} from "@/demo-studio/configuration/deep-link";

const PAGE = { w: 595.28, h: 841.89 };
const M = 48;
const BLACK = rgb(0.035, 0.035, 0.035);
const IVORY = rgb(0.957, 0.949, 0.918);
const LIME = rgb(0.78, 1, 0);
const GREY = rgb(0.38, 0.38, 0.36);
const MUTED = rgb(0.55, 0.55, 0.52);
const RULE = rgb(0.88, 0.86, 0.82);
const SOFT = rgb(0.97, 0.96, 0.94);

type Ctx = {
  pdf: PDFDocument;
  font: PDFFont;
  fontBold: PDFFont;
  page: PDFPage;
  y: number;
  section: string;
};

/**
 * Commercial Catalog V2 — buying guide from KT-PB-2026.1.
 * No printed calendar date. Prices unchanged. No invented products.
 */
export async function buildCatalogPdf(): Promise<Buffer> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`KasiTech Services & Pricing · ${PRICE_BOOK_VERSION}`);
  pdf.setAuthor("KasiTech");
  pdf.setSubject("Commercial buying guide");
  pdf.setCreator("KasiTech");
  pdf.setKeywords([PRICE_BOOK_VERSION, "catalog", "Tanzania"]);

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const qrImages = new Map<string, PDFImage>();
  for (const t of CATALOG_QR_TARGETS) {
    const dataUrl = await QRCode.toDataURL(t.url, {
      width: 160,
      margin: 1,
      color: { dark: "#090909", light: "#ffffff" },
    });
    const raw = Buffer.from(dataUrl.split(",")[1]!, "base64");
    qrImages.set(t.label, await pdf.embedPng(raw));
  }

  cover(pdf, font, fontBold);
  howToRead(pdf, font, fontBold);

  // Packages
  {
    let ctx = page(pdf, font, fontBold, "Website packages");
    h1(ctx, "Website packages");
    p(
      ctx,
      "Every serious digital presence starts with a website package. Higher packages include more structure — pages, content types, and architecture — so you can see why Signature costs more than Essential.",
    );
    space(ctx, 8);
    p(
      ctx,
      "All packages WEB-ONE through WEB-SIG include the website baseline below. Custom Platform is quoted separately.",
    );
    space(ctx, 6);
    label(ctx, "WEBSITE BASELINE (INCLUDED IN PACKAGES)");
    for (const b of WEB_BASELINE_INCLUDED) bullet(ctx, b);
    space(ctx, 10);

    for (const g of buildPackageGuides()) {
      ctx = ensure(ctx, 220);
      productHeader(ctx, g.item.name, displayItemPrice(g.item));
      field(ctx, "VALUE", g.valueProp);
      field(ctx, "WHAT IT DOES", g.whatItDoes);
      label(ctx, "WHAT IS INCLUDED");
      for (const line of g.included) bullet(ctx, line);
      field(ctx, "IDEAL FOR", g.idealFor);
      field(ctx, "COMMONLY USED BY", g.commonlyUsedBy);
      if (g.timeline) field(ctx, "TYPICAL TIMELINE", g.timeline);
      seeLive(ctx, g.seeLiveUrl, qrImages);
      if (g.notes) field(ctx, "NOTES", g.notes);
      divider(ctx);
    }
    // Comparison table
    ctx = ensure(ctx, 200);
    h2(ctx, "Website packages at a glance");
    const pkgs = buildPackageGuides();
    for (const g of pkgs) {
      ctx = ensure(ctx, 36);
      const line = `${g.item.name}  ·  ${displayItemPrice(g.item)}  ·  ${g.idealFor}`;
      p(ctx, line, 8);
    }
    foot(ctx);
  }

  // Bundles
  {
    let ctx = page(pdf, font, fontBold, "Popular bundles");
    h1(ctx, "Popular bundles");
    p(
      ctx,
      "Bundles group the services customers usually need together. Every line below shows individual prices, the standalone total, the bundle price, and savings — you never have to calculate.",
    );
    space(ctx, 10);

    for (const b of buildBundleGuides()) {
      ctx = ensure(ctx, 260);
      productHeader(ctx, b.name, b.bundlePriceLabel);
      field(ctx, "WHAT THIS BUNDLE IS", b.valueProp);
      field(ctx, "WHY THESE SERVICES BELONG TOGETHER", b.whyTogether);
      label(ctx, "WHAT IS INCLUDED (WITH STANDALONE PRICES)");
      for (const c of b.components) {
        bullet(ctx, `${c.name}  —  normally ${c.priceLabel}`);
      }
      for (const e of b.entitlements) {
        bullet(ctx, `${e} (included entitlement — not a separate charge)`);
      }
      space(ctx, 6);
      if (b.standaloneTotalTsh != null) {
        field(ctx, "TOTAL IF PURCHASED SEPARATELY", formatMoney(b.standaloneTotalTsh));
      }
      field(ctx, "BUNDLE PRICE", b.bundlePriceLabel);
      if (b.showSavings && b.savingsTsh != null && b.savingsTsh > 0) {
        field(ctx, "YOU SAVE", formatMoney(b.savingsTsh));
      } else {
        field(
          ctx,
          "SAVINGS",
          "Shown only when the Price Book authorises a savings figure for this bundle.",
        );
      }
      seeLive(ctx, b.seeLiveUrl, qrImages);
      divider(ctx);
    }
    foot(ctx);
  }

  // Capabilities
  {
    let ctx = page(pdf, font, fontBold, "Popular capabilities");
    h1(ctx, "Popular capabilities");
    p(
      ctx,
      "Add capabilities to a package or use them inside a bundle. If a capability is included in your package or absorbed by a bundle, you are not charged again for that inclusion.",
    );
    space(ctx, 10);

    for (const g of buildCapabilityGuides()) {
      ctx = ensure(ctx, 200);
      productHeader(ctx, g.item.name, displayItemPrice(g.item));
      field(ctx, "PURPOSE", g.valueProp);
      field(ctx, "WHAT IT DOES", g.whatItDoes);
      label(ctx, "INCLUDED FUNCTIONALITY");
      for (const line of g.included) bullet(ctx, line);
      field(ctx, "IDEAL FOR", g.idealFor);
      field(ctx, "COMMONLY USED BY", g.commonlyUsedBy);
      field(ctx, "RELATED CAPABILITIES", g.related.join(" · "));
      field(ctx, "EXAMPLE WORKFLOW", g.workflow);
      seeLive(ctx, g.seeLiveUrl, qrImages);
      if (g.notes) field(ctx, "NOTES", g.notes);
      divider(ctx);
    }
    foot(ctx);
  }

  // Care
  {
    let ctx = page(pdf, font, fontBold, "Website Care");
    h1(ctx, "What is Website Care?");
    p(
      ctx,
      "A website is not finished at launch. Content changes, security needs attention, and small improvements appear. Website Care is the commercial relationship for ongoing maintenance after launch.",
    );
    space(ctx, 6);
    p(
      ctx,
      "Exact hours, response times, and backup allowances are confirmed in your quotation. This catalog lists approved plan names and prices only — we do not invent entitlements.",
    );
    space(ctx, 12);

    for (const g of buildCareGuides()) {
      ctx = ensure(ctx, 150);
      productHeader(ctx, g.item.name, displayItemPrice(g.item));
      field(ctx, "VALUE", g.valueProp);
      field(ctx, "WHO IT IS FOR", g.whoFor);
      label(ctx, "INCLUDED");
      for (const line of g.included) bullet(ctx, line);
      field(ctx, "WHEN TO UPGRADE", g.whenUpgrade);
      seeLive(ctx, g.seeLiveUrl, qrImages);
      if (g.notes) field(ctx, "NOTES", g.notes);
      divider(ctx);
    }

    ctx = ensure(ctx, 120);
    h2(ctx, "Care plans at a glance");
    for (const g of buildCareGuides()) {
      p(ctx, `${g.item.name}  ·  ${displayItemPrice(g.item)}  ·  ${g.whoFor}`, 8);
    }
    foot(ctx);
  }

  // KB
  {
    let ctx = page(pdf, font, fontBold, "KasiTech Business");
    h1(ctx, "What is KasiTech Business?");
    p(
      ctx,
      "KasiTech Business transforms a website into a business management platform — so owners can manage website content, analytics, bookings, customers, catalog/services, feedback, QR experiences, locations, and day-to-day operations from one place.",
    );
    space(ctx, 6);
    p(
      ctx,
      "Only approved modules are documented. Launch unlocks website and analytics basics. Growth unlocks the fuller operator set. Pro, Scale, and Enterprise are commercial tiers — additional modules beyond Growth are scoped with KasiTech, not invented here.",
    );
    space(ctx, 12);

    for (const g of buildKbGuides()) {
      ctx = ensure(ctx, 150);
      productHeader(ctx, g.item.name, displayItemPrice(g.item));
      field(ctx, "VALUE", g.valueProp);
      field(ctx, "WHO IT IS FOR", g.whoFor);
      label(ctx, "MODULES / SCOPE");
      for (const line of g.included) bullet(ctx, line);
      field(ctx, "WHEN TO UPGRADE", g.whenUpgrade);
      seeLive(ctx, g.seeLiveUrl, qrImages);
      if (g.notes) field(ctx, "NOTES", g.notes);
      divider(ctx);
    }

    ctx = ensure(ctx, 100);
    h2(ctx, "KasiTech Business at a glance");
    for (const g of buildKbGuides()) {
      p(ctx, `${g.item.name}  ·  ${displayItemPrice(g.item)}  ·  ${g.whoFor}`, 8);
    }
    foot(ctx);
  }

  // QR index
  {
    let ctx = page(pdf, font, fontBold, "See it live · QR");
    h1(ctx, "See it live");
    p(
      ctx,
      "Scan a QR code or open the link. Demo Studio loads the matching fictional business, applies the package or bundle, calculates the live price, and shows what customers experience.",
    );
    space(ctx, 8);
    p(ctx, `Base: ${DEMO_STUDIO_ORIGIN}/demo-studio`, 8);
    space(ctx, 12);

    let col = 0;
    let rowY = ctx.y;
    for (const t of CATALOG_QR_TARGETS) {
      const img = qrImages.get(t.label);
      if (!img) continue;
      if (col === 0 && ctx.y < 160) {
        foot(ctx);
        ctx = page(pdf, font, fontBold, "See it live · QR");
        rowY = ctx.y;
      }
      const x = col === 0 ? M : PAGE.w / 2 + 8;
      if (col === 0) rowY = ctx.y;
      const size = 72;
      ctx.page.drawImage(img, { x, y: rowY - size - 4, width: size, height: size });
      draw(ctx.page, t.label, fontBold, 8, x, rowY - size - 16, BLACK);
      const short = t.url.replace(DEMO_STUDIO_ORIGIN, "");
      draw(ctx.page, short.slice(0, 42), font, 6, x, rowY - size - 28, MUTED);
      col += 1;
      if (col === 2) {
        col = 0;
        ctx.y = rowY - size - 44;
      }
    }
    if (col === 1) ctx.y = rowY - 120;
    foot(ctx);
  }

  // FAQ
  {
    let ctx = page(pdf, font, fontBold, "FAQ");
    h1(ctx, "Frequently asked questions");
    space(ctx, 8);
    for (const f of FAQ_ENTRIES) {
      ctx = ensure(ctx, 70);
      draw(ctx.page, f.q, fontBold, 10, M, ctx.y, BLACK);
      ctx.y -= 14;
      p(ctx, f.a, 9);
      space(ctx, 8);
    }
    foot(ctx);
  }

  // Journey
  {
    const pg = pdf.addPage([PAGE.w, PAGE.h]);
    pg.drawRectangle({ x: 0, y: 0, width: PAGE.w, height: PAGE.h, color: BLACK });
    pg.drawRectangle({ x: 0, y: PAGE.h - 8, width: PAGE.w, height: 8, color: LIME });
    draw(pg, "Your journey with KasiTech", fontBold, 22, M, PAGE.h - 100, IVORY);
    const steps = [
      ["1 · Choose", "Pick a package, bundle, or capability from this catalog."],
      ["2 · Configure", "Open Demo Studio — see the live fictional site and price."],
      ["3 · Approve", "Receive a formal quotation. Nothing starts without written approval."],
      ["4 · Build", "We design and build the agreed scope."],
      ["5 · Launch", "Go live with QA, domain connection, and launch support."],
      ["6 · Grow", "Add Care, KasiTech Business, and new capabilities over time."],
    ];
    let y = PAGE.h - 150;
    for (const [t, d] of steps) {
      draw(pg, t, fontBold, 12, M, y, LIME);
      draw(pg, d, font, 10, M, y - 16, MUTED);
      y -= 48;
    }
    draw(pg, "Demo Studio sits in step 2 — Configure.", font, 10, M, y - 10, IVORY);
    draw(pg, DEMO_STUDIO_ORIGIN + "/demo-studio", fontBold, 11, M, y - 36, LIME);
    draw(
      pg,
      `${PRICE_BOOK_VERSION}  ·  All prices in TSh  ·  kasitechinnovations.com`,
      font,
      8,
      M,
      48,
      GREY,
    );
    draw(
      pg,
      "This catalog is a commercial reference — not a quotation or invoice.",
      font,
      8,
      M,
      34,
      MUTED,
    );
  }

  return Buffer.from(await pdf.save());
}

function cover(pdf: PDFDocument, font: PDFFont, fontBold: PDFFont) {
  const page = pdf.addPage([PAGE.w, PAGE.h]);
  page.drawRectangle({ x: 0, y: 0, width: PAGE.w, height: PAGE.h, color: BLACK });
  page.drawRectangle({ x: 0, y: PAGE.h - 10, width: PAGE.w, height: 10, color: LIME });
  page.drawRectangle({ x: 0, y: 0, width: 8, height: PAGE.h, color: LIME });
  draw(page, "KasiTech", fontBold, 40, M + 8, PAGE.h - 160, IVORY);
  draw(page, "SERVICES & PRICING", font, 13, M + 8, PAGE.h - 188, LIME);
  draw(page, "Commercial buying guide", font, 12, M + 8, PAGE.h - 230, IVORY);
  draw(
    page,
    "Understand what we sell, what each service does,",
    font,
    11,
    M + 8,
    PAGE.h - 270,
    MUTED,
  );
  draw(
    page,
    "what is included, who it is for, how pieces relate,",
    font,
    11,
    M + 8,
    PAGE.h - 286,
    MUTED,
  );
  draw(
    page,
    "how much it costs, and how to see it live —",
    font,
    11,
    M + 8,
    PAGE.h - 302,
    MUTED,
  );
  draw(page, "without guessing.", font, 11, M + 8, PAGE.h - 318, MUTED);
  draw(page, PRICE_BOOK_VERSION, fontBold, 11, M + 8, 80, LIME);
  draw(page, "All prices in Tanzanian Shillings (TSh)", font, 9, M + 8, 62, GREY);
  draw(page, "kasitechinnovations.com  ·  Dar es Salaam", font, 9, M + 8, 46, GREY);
}

function howToRead(pdf: PDFDocument, font: PDFFont, fontBold: PDFFont) {
  const ctx = page(pdf, font, fontBold, "How to read this guide");
  h1(ctx, "How to read this guide");
  p(
    ctx,
    "This is KasiTech’s commercial reference manual — not a brochure and not a technical manual. Every product is documented so you can decide with confidence.",
  );
  space(ctx, 10);
  label(ctx, "EVERY PRODUCT FOLLOWS THE SAME STRUCTURE");
  for (const line of [
    "Name and price",
    "Short value proposition (what you gain)",
    "What it does",
    "What is included",
    "Ideal for / commonly used by",
    "See it live (Demo Studio link + QR where shown)",
    "Notes when something important must be confirmed in a quotation",
  ]) {
    bullet(ctx, line);
  }
  space(ctx, 10);
  label(ctx, "PRICES APPEAR WHERE YOU NEED THEM");
  p(
    ctx,
    "Bundle pages show each component’s standalone price, the total if bought separately, the bundle price, and savings. You should never flip pages to reconstruct a total.",
  );
  space(ctx, 8);
  label(ctx, "SEE IT LIVE");
  p(
    ctx,
    `Open ${DEMO_STUDIO_ORIGIN}/demo-studio with the links in this guide. Demo Studio selects the matching configuration, loads a fictional Tanzanian business, and shows live pricing.`,
  );
  space(ctx, 8);
  p(
    ctx,
    "Formal quotations confirm final scope, compatibility, timeline, third-party fees, taxes, and commercial terms before commencement. This catalog is not an invoice.",
  );
  foot(ctx);
}

function page(
  pdf: PDFDocument,
  font: PDFFont,
  fontBold: PDFFont,
  section: string,
): Ctx {
  const pg = pdf.addPage([PAGE.w, PAGE.h]);
  pg.drawRectangle({ x: 0, y: PAGE.h - 34, width: PAGE.w, height: 34, color: BLACK });
  pg.drawRectangle({ x: 0, y: PAGE.h - 34, width: 5, height: 34, color: LIME });
  draw(pg, "KasiTech", fontBold, 8, M, PAGE.h - 20, LIME);
  draw(pg, section.toUpperCase(), font, 7, M + 58, PAGE.h - 20, IVORY);
  return { pdf, font, fontBold, page: pg, y: PAGE.h - 58, section };
}

function ensure(ctx: Ctx, need: number): Ctx {
  if (ctx.y - need >= 56) return ctx;
  foot(ctx);
  const next = page(ctx.pdf, ctx.font, ctx.fontBold, ctx.section);
  ctx.page = next.page;
  ctx.y = next.y;
  return ctx;
}

function sanitize(text: string): string {
  return text
    .replace(/→/g, "->")
    .replace(/—/g, "-")
    .replace(/–/g, "-")
    .replace(/·/g, "|")
    .replace(/'/g, "'")
    .replace(/'/g, "'")
    .replace(/'/g, "'")
    .replace(/"/g, '"')
    .replace(/"/g, '"')
    .replace(/•/g, "-")
    .replace(/[^\x00-\x7F]/g, "?");
}

function draw(
  page: PDFPage,
  text: string,
  font: PDFFont,
  size: number,
  x: number,
  y: number,
  color: ReturnType<typeof rgb>,
) {
  page.drawText(sanitize(text), {
    x,
    y,
    size,
    font,
    color,
  });
}

function space(ctx: Ctx, n: number) {
  ctx.y -= n;
}

function h1(ctx: Ctx, t: string) {
  draw(ctx.page, t, ctx.fontBold, 18, M, ctx.y, BLACK);
  ctx.y -= 8;
  ctx.page.drawRectangle({ x: M, y: ctx.y, width: 36, height: 2, color: LIME });
  ctx.y -= 18;
}

function h2(ctx: Ctx, t: string) {
  ctx = ensure(ctx, 40);
  draw(ctx.page, t, ctx.fontBold, 12, M, ctx.y, BLACK);
  ctx.y -= 16;
}

function label(ctx: Ctx, t: string) {
  ctx = ensure(ctx, 20);
  draw(ctx.page, t, ctx.fontBold, 7, M, ctx.y, MUTED);
  ctx.y -= 12;
}

function p(ctx: Ctx, text: string, size = 9) {
  const lines = wrap(text, ctx.font, size, PAGE.w - M * 2);
  for (const line of lines) {
    ctx = ensure(ctx, size + 4);
    draw(ctx.page, line, ctx.font, size, M, ctx.y, GREY);
    ctx.y -= size + 4;
  }
}

function bullet(ctx: Ctx, text: string) {
  const lines = wrap(text, ctx.font, 8, PAGE.w - M * 2 - 12);
  ctx = ensure(ctx, 12 * lines.length);
  draw(ctx.page, "-", ctx.font, 8, M, ctx.y, LIME);
  for (const line of lines) {
    draw(ctx.page, line, ctx.font, 8, M + 10, ctx.y, GREY);
    ctx.y -= 11;
  }
}

function field(ctx: Ctx, labelText: string, value: string) {
  ctx = ensure(ctx, 28);
  draw(ctx.page, labelText, ctx.fontBold, 7, M, ctx.y, MUTED);
  ctx.y -= 11;
  p(ctx, value, 9);
  space(ctx, 4);
}

function productHeader(ctx: Ctx, name: string, price: string) {
  ctx = ensure(ctx, 40);
  ctx.page.drawRectangle({
    x: M,
    y: ctx.y - 8,
    width: PAGE.w - M * 2,
    height: 28,
    color: SOFT,
  });
  draw(ctx.page, name, ctx.fontBold, 12, M + 8, ctx.y, BLACK);
  const pw = ctx.fontBold.widthOfTextAtSize(price, 10);
  draw(ctx.page, price, ctx.fontBold, 10, PAGE.w - M - 8 - pw, ctx.y, BLACK);
  ctx.y -= 28;
}

function seeLive(
  ctx: Ctx,
  url: string,
  qrImages: Map<string, PDFImage>,
) {
  ctx = ensure(ctx, 50);
  draw(ctx.page, "SEE IT LIVE", ctx.fontBold, 7, M, ctx.y, MUTED);
  ctx.y -= 11;
  const short = url.replace(DEMO_STUDIO_ORIGIN, "kasitechinnovations.com");
  p(ctx, short, 8);
  // Attach QR if we have a matching target URL
  for (const [label, img] of qrImages) {
    const t = CATALOG_QR_TARGETS.find((x) => x.label === label);
    if (t && t.url === url) {
      ctx = ensure(ctx, 70);
      ctx.page.drawImage(img, {
        x: PAGE.w - M - 56,
        y: ctx.y - 52,
        width: 52,
        height: 52,
      });
      break;
    }
  }
  space(ctx, 4);
}

function divider(ctx: Ctx) {
  ctx = ensure(ctx, 16);
  ctx.page.drawLine({
    start: { x: M, y: ctx.y },
    end: { x: PAGE.w - M, y: ctx.y },
    thickness: 0.5,
    color: RULE,
  });
  ctx.y -= 14;
}

function foot(ctx: Ctx) {
  draw(
    ctx.page,
    `${PRICE_BOOK_VERSION}  ·  All prices in TSh  ·  kasitechinnovations.com`,
    ctx.font,
    7,
    M,
    28,
    MUTED,
  );
  const n = String(ctx.pdf.getPageCount());
  const w = ctx.font.widthOfTextAtSize(n, 7);
  draw(ctx.page, n, ctx.font, 7, PAGE.w - M - w, 28, MUTED);
}

function wrap(text: string, font: PDFFont, size: number, max: number): string[] {
  const words = sanitize(text).split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const word of words) {
    const next = cur ? `${cur} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > max && cur) {
      lines.push(cur);
      cur = word;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [""];
}
