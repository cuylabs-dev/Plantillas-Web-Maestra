// ============================================================================
// CONTRATO DE URL  (debe coincidir EXACTO con el generador en preparador.js)
//   ?cliente=&template=&color=&font=&blocks=&sec=&head=&sub=&eb=&pri=<hex>&logo=<https url>
// Si cambias un nombre aqui, hay que cambiarlo tambien en el Investigador.
// ============================================================================

export const TEMPLATES = [
  "clinicas",
  "corporativo",
  "gimnasios",
  "colegios",
  "tiendas",
] as const;
export type Template = (typeof TEMPLATES)[number];

export const COLORS = [
  "blue",
  "green",
  "red",
  "violet",
  "orange",
  "slate",
] as const;
export type ColorKey = (typeof COLORS)[number];

export const FONTS = ["inter", "roboto", "poppins", "montserrat"] as const;
export type FontKey = (typeof FONTS)[number];

export const BLOCKS = ["login", "reservas", "ecommerce", "galeria"] as const;
export type BlockKey = (typeof BLOCKS)[number];

/** Sub-estilo de plantilla gimnasios (?v=) */
export const GYM_VARIANTS = ["fight", "crossfit", "wellness", "premium", "fit", "studio"] as const;
export type GymVariant = (typeof GYM_VARIANTS)[number];

export interface Copy {
  head?: string;
  sub?: string;
  eyebrow?: string;
}

export interface LandingConfig {
  cliente: string;
  template: Template;
  color: ColorKey;
  font: FontKey;
  blocks: BlockKey[];
  /** Secciones modulares activas (?sec=hero,planes,...) */
  sections: string[];
  copy: Copy;
  /** Color primario de marca (#hex sin #) desde logo / Gemini Vision */
  brandPrimary?: string;
  /** URL del logo para el navbar (HTTPS, corta) */
  logoUrl?: string;
  /** Layout gimnasios: fight | crossfit | wellness | premium | fit */
  gymVariant?: GymVariant;
  /** Link wa.me para botón flotante (?wa=) */
  waLink?: string;
  /** Manifest de marca (?kit=slug) */
  kitSlug?: string;
}

import { parseSectionIds, resolveSections } from "../catalog/index";

const DEFAULTS: Omit<LandingConfig, "copy" | "sections"> = {
  cliente: "Tu Negocio",
  template: "corporativo",
  color: "blue",
  font: "inter",
  blocks: [],
};

function pickEnum<T extends string>(
  value: string | null,
  allowed: readonly T[],
  fallback: T,
): T {
  if (!value) return fallback;
  const clean = value.trim().toLowerCase() as T;
  return allowed.includes(clean) ? clean : fallback;
}

function parseBlocks(value: string | null): BlockKey[] {
  if (!value) return [];
  return value
    .split(",")
    .map((b) => b.trim().toLowerCase())
    .filter((b): b is BlockKey => (BLOCKS as readonly string[]).includes(b));
}

function cleanText(value: string | null, max: number): string | undefined {
  if (!value) return undefined;
  const t = value.trim();
  if (!t) return undefined;
  return t.length > max ? t.slice(0, max) : t;
}

function parseHexPrimary(value: string | null): string | undefined {
  if (!value) return undefined;
  let h = value.trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return undefined;
  return h.toLowerCase();
}

function parseLogoUrl(value: string | null): string | undefined {
  if (!value) return undefined;
  const u = value.trim();
  if (!u.startsWith("https://") || u.length > 600) return undefined;
  return u;
}

function parseWaLink(value: string | null): string | undefined {
  if (!value) return undefined;
  const u = value.trim();
  if (u.startsWith("https://wa.me/")) return u.slice(0, 200);
  const digits = u.replace(/\D/g, "");
  if (digits.length >= 9) return `https://wa.me/${digits}`;
  return undefined;
}

export function paletteFromPrimary(hex: string): Record<string, string> | null {
  const n = parseHexPrimary(hex);
  if (!n) return null;
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  const toHex = (R: number, G: number, B: number) =>
    `#${[R, G, B]
      .map((x) => Math.min(255, Math.max(0, Math.round(x))).toString(16).padStart(2, "0"))
      .join("")}`;
  const tint = (w: number) => toHex(r + (255 - r) * w, g + (255 - g) * w, b + (255 - b) * w);
  const shade = (f: number) => toHex(r * f, g * f, b * f);
  return {
    50: tint(0.92),
    100: tint(0.85),
    500: `#${n}`,
    600: shade(0.88),
    700: shade(0.72),
  };
}

export function readConfig(search: string = window.location.search): LandingConfig {
  const p = new URLSearchParams(search);
  const cliente = (p.get("cliente") || "").trim();
  const template = pickEnum(p.get("template"), TEMPLATES, DEFAULTS.template);
  const sectionIds = parseSectionIds(p.get("sec"), template);
  return {
    cliente: cliente.length > 0 ? cliente : DEFAULTS.cliente,
    template,
    color: pickEnum(p.get("color"), COLORS, DEFAULTS.color),
    font: pickEnum(p.get("font"), FONTS, DEFAULTS.font),
    blocks: parseBlocks(p.get("blocks")),
    sections: resolveSections(template, sectionIds),
    copy: {
      head: cleanText(p.get("head"), 90),
      sub: cleanText(p.get("sub"), 200),
      eyebrow: cleanText(p.get("eb"), 48),
    },
    brandPrimary: parseHexPrimary(p.get("pri")),
    logoUrl: parseLogoUrl(p.get("logo")),
    gymVariant: pickEnum(p.get("v"), GYM_VARIANTS, "fit"),
    waLink: parseWaLink(p.get("wa")),
    kitSlug: (p.get("kit") || "").trim() || undefined,
  };
}

// ---- Paletas (cada color -> escala usada por las variables CSS) ----------
export const PALETTES: Record<ColorKey, Record<string, string>> = {
  blue: { 50: "#eff6ff", 100: "#dbeafe", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8" },
  green: { 50: "#ecfdf5", 100: "#d1fae5", 500: "#10b981", 600: "#059669", 700: "#047857" },
  red: { 50: "#fef2f2", 100: "#fee2e2", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c" },
  violet: { 50: "#f5f3ff", 100: "#ede9fe", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9" },
  orange: { 50: "#fff7ed", 100: "#ffedd5", 500: "#f97316", 600: "#ea580c", 700: "#c2410c" },
  slate: { 50: "#f8fafc", 100: "#f1f5f9", 500: "#64748b", 600: "#475569", 700: "#334155" },
};

export const FONT_STACKS: Record<FontKey, string> = {
  inter: "'Inter', system-ui, sans-serif",
  roboto: "'Roboto', system-ui, sans-serif",
  poppins: "'Poppins', system-ui, sans-serif",
  montserrat: "'Montserrat', system-ui, sans-serif",
};

export function applyTheme(config: LandingConfig): void {
  const root = document.documentElement;
  const custom =
    config.brandPrimary && paletteFromPrimary(config.brandPrimary);
  const palette = custom || PALETTES[config.color];
  Object.entries(palette).forEach(([k, v]) => {
    root.style.setProperty(`--brand-${k}`, v);
  });
  root.style.setProperty("--brand-font", FONT_STACKS[config.font]);
  root.style.setProperty("--surface-light", palette[50] || "#f8fafc");
  root.style.setProperty("--surface-card", "#ffffff");
}
