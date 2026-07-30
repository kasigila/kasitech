import type { PDFPage } from "pdf-lib";
import { C, type Color } from "./theme";

export type IconKind =
  | "globe"
  | "layers"
  | "calendar"
  | "utensils"
  | "bag"
  | "search"
  | "card"
  | "home"
  | "compass"
  | "star"
  | "mapPin"
  | "qr"
  | "monitor"
  | "chart"
  | "users"
  | "shield"
  | "spark"
  | "check"
  | "arrowDown"
  | "link";

/** Map Price Book / product codes to a restrained outline icon. */
export function iconForCode(code: string): IconKind {
  if (code.startsWith("WEB-")) return "globe";
  if (code.startsWith("BND-")) {
    if (code.includes("REST")) return "utensils";
    if (code.includes("STORE")) return "bag";
    if (code.includes("TOUR")) return "compass";
    if (code.includes("RE")) return "home";
    if (code.includes("BEAUTY")) return "calendar";
    return "layers";
  }
  if (code.startsWith("BKG-")) return "calendar";
  if (code.startsWith("REST-")) return "utensils";
  if (code.startsWith("ECOM-") || code.startsWith("PAY-")) return code.startsWith("PAY-") ? "card" : "bag";
  if (code.startsWith("SEO-")) return "search";
  if (code.startsWith("RE-")) return "home";
  if (code.startsWith("TOUR-")) return "compass";
  if (code === "LOC-GBP") return "mapPin";
  if (code === "LOC-REV") return "star";
  if (code.startsWith("LANG-")) return "globe";
  if (code.startsWith("CARE-")) return "shield";
  if (code.startsWith("KB-")) return "spark";
  return "link";
}

/**
 * Draw a 16×16-unit outline icon scaled into a square.
 * Origin (x,y) is the top-left of the icon box; y decreases downward in our layouts.
 */
export function drawIcon(
  page: PDFPage,
  kind: IconKind,
  x: number,
  yTop: number,
  size: number,
  color: Color = C.ink,
) {
  const t = Math.max(1, size * 0.08);
  const y = yTop - size;
  const stroke = { borderColor: color, borderWidth: t, color: undefined as undefined };

  const line = (x1: number, y1: number, x2: number, y2: number) => {
    page.drawLine({
      start: { x: x1, y: y1 },
      end: { x: x2, y: y2 },
      thickness: t,
      color,
    });
  };

  switch (kind) {
    case "globe": {
      page.drawEllipse({
        x: x + size / 2,
        y: y + size / 2,
        xScale: size * 0.38,
        yScale: size * 0.38,
        borderColor: color,
        borderWidth: t,
      });
      page.drawEllipse({
        x: x + size / 2,
        y: y + size / 2,
        xScale: size * 0.18,
        yScale: size * 0.38,
        borderColor: color,
        borderWidth: t,
      });
      line(x + size * 0.18, y + size / 2, x + size * 0.82, y + size / 2);
      break;
    }
    case "layers": {
      line(x + size * 0.2, y + size * 0.7, x + size * 0.5, y + size * 0.85);
      line(x + size * 0.5, y + size * 0.85, x + size * 0.8, y + size * 0.7);
      line(x + size * 0.2, y + size * 0.7, x + size * 0.8, y + size * 0.7);
      line(x + size * 0.2, y + size * 0.5, x + size * 0.5, y + size * 0.65);
      line(x + size * 0.5, y + size * 0.65, x + size * 0.8, y + size * 0.5);
      line(x + size * 0.2, y + size * 0.5, x + size * 0.8, y + size * 0.5);
      line(x + size * 0.2, y + size * 0.3, x + size * 0.5, y + size * 0.45);
      line(x + size * 0.5, y + size * 0.45, x + size * 0.8, y + size * 0.3);
      line(x + size * 0.2, y + size * 0.3, x + size * 0.8, y + size * 0.3);
      break;
    }
    case "calendar": {
      page.drawRectangle({
        x: x + size * 0.15,
        y: y + size * 0.15,
        width: size * 0.7,
        height: size * 0.65,
        ...stroke,
      });
      line(x + size * 0.15, y + size * 0.55, x + size * 0.85, y + size * 0.55);
      line(x + size * 0.32, y + size * 0.72, x + size * 0.32, y + size * 0.88);
      line(x + size * 0.68, y + size * 0.72, x + size * 0.68, y + size * 0.88);
      break;
    }
    case "utensils": {
      line(x + size * 0.32, y + size * 0.2, x + size * 0.32, y + size * 0.8);
      line(x + size * 0.28, y + size * 0.55, x + size * 0.28, y + size * 0.8);
      line(x + size * 0.36, y + size * 0.55, x + size * 0.36, y + size * 0.8);
      line(x + size * 0.55, y + size * 0.2, x + size * 0.55, y + size * 0.55);
      page.drawEllipse({
        x: x + size * 0.55,
        y: y + size * 0.68,
        xScale: size * 0.12,
        yScale: size * 0.16,
        borderColor: color,
        borderWidth: t,
      });
      break;
    }
    case "bag": {
      page.drawRectangle({
        x: x + size * 0.22,
        y: y + size * 0.18,
        width: size * 0.56,
        height: size * 0.52,
        ...stroke,
      });
      page.drawEllipse({
        x: x + size / 2,
        y: y + size * 0.7,
        xScale: size * 0.16,
        yScale: size * 0.12,
        borderColor: color,
        borderWidth: t,
      });
      break;
    }
    case "search": {
      page.drawEllipse({
        x: x + size * 0.42,
        y: y + size * 0.55,
        xScale: size * 0.22,
        yScale: size * 0.22,
        borderColor: color,
        borderWidth: t,
      });
      line(x + size * 0.58, y + size * 0.38, x + size * 0.78, y + size * 0.2);
      break;
    }
    case "card": {
      page.drawRectangle({
        x: x + size * 0.12,
        y: y + size * 0.28,
        width: size * 0.76,
        height: size * 0.44,
        ...stroke,
      });
      line(x + size * 0.12, y + size * 0.55, x + size * 0.88, y + size * 0.55);
      line(x + size * 0.22, y + size * 0.38, x + size * 0.45, y + size * 0.38);
      break;
    }
    case "home": {
      line(x + size * 0.2, y + size * 0.48, x + size * 0.5, y + size * 0.78);
      line(x + size * 0.5, y + size * 0.78, x + size * 0.8, y + size * 0.48);
      page.drawRectangle({
        x: x + size * 0.28,
        y: y + size * 0.2,
        width: size * 0.44,
        height: size * 0.3,
        ...stroke,
      });
      break;
    }
    case "compass": {
      page.drawEllipse({
        x: x + size / 2,
        y: y + size / 2,
        xScale: size * 0.36,
        yScale: size * 0.36,
        borderColor: color,
        borderWidth: t,
      });
      line(x + size * 0.5, y + size * 0.72, x + size * 0.62, y + size * 0.38);
      line(x + size * 0.62, y + size * 0.38, x + size * 0.38, y + size * 0.48);
      line(x + size * 0.38, y + size * 0.48, x + size * 0.5, y + size * 0.72);
      break;
    }
    case "star": {
      const cx = x + size / 2;
      const cy = y + size / 2;
      const pts = [0, 1, 2, 3, 4].map((i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        return {
          x: cx + Math.cos(a) * size * 0.32,
          y: cy + Math.sin(a) * size * 0.32,
        };
      });
      for (let i = 0; i < 5; i++) {
        const a = pts[i]!;
        const b = pts[(i + 2) % 5]!;
        line(a.x, a.y, b.x, b.y);
      }
      break;
    }
    case "mapPin": {
      page.drawEllipse({
        x: x + size / 2,
        y: y + size * 0.62,
        xScale: size * 0.22,
        yScale: size * 0.22,
        borderColor: color,
        borderWidth: t,
      });
      line(x + size * 0.5, y + size * 0.4, x + size * 0.5, y + size * 0.18);
      page.drawEllipse({
        x: x + size / 2,
        y: y + size * 0.62,
        xScale: size * 0.08,
        yScale: size * 0.08,
        borderColor: color,
        borderWidth: t,
      });
      break;
    }
    case "qr": {
      page.drawRectangle({
        x: x + size * 0.18,
        y: y + size * 0.18,
        width: size * 0.28,
        height: size * 0.28,
        ...stroke,
      });
      page.drawRectangle({
        x: x + size * 0.54,
        y: y + size * 0.18,
        width: size * 0.28,
        height: size * 0.28,
        ...stroke,
      });
      page.drawRectangle({
        x: x + size * 0.18,
        y: y + size * 0.54,
        width: size * 0.28,
        height: size * 0.28,
        ...stroke,
      });
      page.drawRectangle({
        x: x + size * 0.54,
        y: y + size * 0.54,
        width: size * 0.14,
        height: size * 0.14,
        color,
      });
      break;
    }
    case "monitor": {
      page.drawRectangle({
        x: x + size * 0.12,
        y: y + size * 0.38,
        width: size * 0.76,
        height: size * 0.42,
        ...stroke,
      });
      line(x + size * 0.35, y + size * 0.38, x + size * 0.35, y + size * 0.22);
      line(x + size * 0.65, y + size * 0.38, x + size * 0.65, y + size * 0.22);
      line(x + size * 0.28, y + size * 0.22, x + size * 0.72, y + size * 0.22);
      break;
    }
    case "chart": {
      line(x + size * 0.2, y + size * 0.2, x + size * 0.2, y + size * 0.8);
      line(x + size * 0.2, y + size * 0.2, x + size * 0.8, y + size * 0.2);
      line(x + size * 0.32, y + size * 0.2, x + size * 0.32, y + size * 0.45);
      line(x + size * 0.48, y + size * 0.2, x + size * 0.48, y + size * 0.62);
      line(x + size * 0.64, y + size * 0.2, x + size * 0.64, y + size * 0.78);
      break;
    }
    case "users": {
      page.drawEllipse({
        x: x + size * 0.38,
        y: y + size * 0.65,
        xScale: size * 0.12,
        yScale: size * 0.12,
        borderColor: color,
        borderWidth: t,
      });
      page.drawEllipse({
        x: x + size * 0.62,
        y: y + size * 0.65,
        xScale: size * 0.1,
        yScale: size * 0.1,
        borderColor: color,
        borderWidth: t,
      });
      page.drawEllipse({
        x: x + size * 0.38,
        y: y + size * 0.35,
        xScale: size * 0.2,
        yScale: size * 0.14,
        borderColor: color,
        borderWidth: t,
      });
      break;
    }
    case "shield": {
      line(x + size * 0.5, y + size * 0.82, x + size * 0.78, y + size * 0.68);
      line(x + size * 0.78, y + size * 0.68, x + size * 0.78, y + size * 0.42);
      line(x + size * 0.78, y + size * 0.42, x + size * 0.5, y + size * 0.18);
      line(x + size * 0.5, y + size * 0.18, x + size * 0.22, y + size * 0.42);
      line(x + size * 0.22, y + size * 0.42, x + size * 0.22, y + size * 0.68);
      line(x + size * 0.22, y + size * 0.68, x + size * 0.5, y + size * 0.82);
      break;
    }
    case "spark": {
      line(x + size * 0.5, y + size * 0.82, x + size * 0.5, y + size * 0.18);
      line(x + size * 0.22, y + size * 0.5, x + size * 0.78, y + size * 0.5);
      line(x + size * 0.3, y + size * 0.7, x + size * 0.7, y + size * 0.3);
      line(x + size * 0.3, y + size * 0.3, x + size * 0.7, y + size * 0.7);
      break;
    }
    case "check": {
      line(x + size * 0.2, y + size * 0.48, x + size * 0.42, y + size * 0.28);
      line(x + size * 0.42, y + size * 0.28, x + size * 0.82, y + size * 0.72);
      break;
    }
    case "arrowDown": {
      line(x + size * 0.5, y + size * 0.75, x + size * 0.5, y + size * 0.28);
      line(x + size * 0.5, y + size * 0.28, x + size * 0.32, y + size * 0.45);
      line(x + size * 0.5, y + size * 0.28, x + size * 0.68, y + size * 0.45);
      break;
    }
    case "link":
    default: {
      page.drawEllipse({
        x: x + size * 0.38,
        y: y + size * 0.5,
        xScale: size * 0.16,
        yScale: size * 0.12,
        borderColor: color,
        borderWidth: t,
      });
      page.drawEllipse({
        x: x + size * 0.62,
        y: y + size * 0.5,
        xScale: size * 0.16,
        yScale: size * 0.12,
        borderColor: color,
        borderWidth: t,
      });
      break;
    }
  }
}
