import { rgb, type RGB } from "pdf-lib";

/** Phase 3.2 catalog visual theme — presentation only. */
export const PAGE = { w: 595.28, h: 841.89 };
export const M = 40;
export const HEADER_H = 36;
export const FOOT_H = 36;
export const CONTENT_TOP = PAGE.h - HEADER_H - 18;
export const CONTENT_BOTTOM = FOOT_H + 14;
/** Two equal editorial slots per page. */
export const CARD_GAP = 14;
export const CARD_SLOT_H =
  (CONTENT_TOP - CONTENT_BOTTOM - CARD_GAP) / 2;

export const C = {
  black: rgb(0.04, 0.04, 0.04),
  ink: rgb(0.1, 0.1, 0.1),
  ivory: rgb(0.957, 0.949, 0.918),
  lime: rgb(0.78, 1, 0),
  limeDeep: rgb(0.55, 0.78, 0),
  grey: rgb(0.36, 0.36, 0.34),
  muted: rgb(0.52, 0.52, 0.5),
  rule: rgb(0.88, 0.86, 0.82),
  soft: rgb(0.965, 0.96, 0.945),
  softDark: rgb(0.94, 0.935, 0.92),
  white: rgb(1, 1, 1),
} as const;

export type Color = RGB;

export const QR = 52;
