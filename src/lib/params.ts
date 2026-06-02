// ============================================================================
// CONTRATO DE URL  (debe coincidir EXACTO con el generador en preparador.js)
//   https://<factoria>.vercel.app/?cliente=<txt>&template=<t>&color=<c>&font=<f>&blocks=<csv>
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
  copy: Copy;
}

const DEFAULTS: Omit<LandingConfig, "copy"> = {
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

export function readConfig(search: string = window.location.search): LandingConfig {
  const p = new URLSearchParams(search);
  const cliente = (p.get("cliente") || "").trim();
  return {
    cliente: cliente.length > 0 ? cliente : DEFAULTS.cliente,
    template: pickEnum(p.get("template"), TEMPLATES, DEFAULTS.template),
    color: pickEnum(p.get("color"), COLORS, DEFAULTS.color),
    font: pickEnum(p.get("font"), FONTS, DEFAULTS.font),
    blocks: parseBlocks(p.get("blocks")),
    copy: {
      head: cleanText(p.get("head"), 90),
      sub: cleanText(p.get("sub"), 200),
      eyebrow: cleanText(p.get("eb"), 48),
    },
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
  const palette = PALETTES[config.color];
  Object.entries(palette).forEach(([k, v]) => {
    root.style.setProperty(`--brand-${k}`, v);
  });
  root.style.setProperty("--brand-font", FONT_STACKS[config.font]);
}
