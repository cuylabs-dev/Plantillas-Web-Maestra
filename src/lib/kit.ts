import type { Template, FontKey, ColorKey } from "./params";

export interface BrandKitColors {
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
}

export interface BrandKitFonts {
  heading: string;
  body: string;
}

export interface TestimonialCopy {
  quote: string;
  author: string;
  role: string;
}

export interface SectionBlockCopy {
  title?: string;
  subtitle?: string;
  items?: string[];
}

export interface BrandKit {
  slug: string;
  cliente: string;
  template: Template;
  variant?: string;
  color: ColorKey;
  font: FontKey;
  colors: BrandKitColors;
  fonts: BrandKitFonts;
  logo: string | null;
  heroImage: string | null;
  gallery: string[];
  instagram: string | null;
  bio: string | null;
  tone: string;
  copy: { head?: string; sub?: string; eyebrow?: string };
  sections: string[];
  sectionsCopy: Record<string, SectionBlockCopy | TestimonialCopy[]>;
  wa_text?: string;
  gaps?: string[];
}

function kitCdnBase(): string {
  const base = import.meta.env.VITE_KIT_CDN_BASE as string | undefined;
  return base?.replace(/\/+$/, "") || "";
}

export async function fetchBrandKit(slug: string): Promise<BrandKit | null> {
  const cdn = kitCdnBase();
  const paths: string[] = [];
  if (cdn) paths.push(`${cdn}/kits/${slug}.json`);
  paths.push(`/kits/${slug}.json`, `/api/kit/${slug}`);
  for (const path of paths) {
    try {
      const res = await fetch(path);
      if (res.ok) return (await res.json()) as BrandKit;
    } catch {
      /* try next */
    }
  }
  return null;
}

export function applyKitTheme(kit: BrandKit): void {
  const root = document.documentElement;
  const pri = kit.colors.primary.replace(/^#/, "");
  const r = parseInt(pri.slice(0, 2), 16);
  const g = parseInt(pri.slice(2, 4), 16);
  const b = parseInt(pri.slice(4, 6), 16);
  const toHex = (R: number, G: number, B: number) =>
    `#${[R, G, B]
      .map((x) => Math.min(255, Math.max(0, Math.round(x))).toString(16).padStart(2, "0"))
      .join("")}`;
  const tint = (w: number) => toHex(r + (255 - r) * w, g + (255 - g) * w, b + (255 - b) * w);
  const shade = (f: number) => toHex(r * f, g * f, b * f);
  root.style.setProperty("--brand-50", tint(0.92));
  root.style.setProperty("--brand-100", tint(0.85));
  root.style.setProperty("--brand-500", `#${pri}`);
  root.style.setProperty("--brand-600", shade(0.88));
  root.style.setProperty("--brand-700", shade(0.72));
  root.style.setProperty("--brand-secondary", `#${kit.colors.secondary.replace(/^#/, "")}`);
  root.style.setProperty("--brand-surface", `#${kit.colors.surface.replace(/^#/, "")}`);
}

export function loadGoogleFonts(fonts: BrandKitFonts): void {
  const id = "brand-kit-fonts";
  if (document.getElementById(id)) return;
  const families = [fonts.heading, fonts.body]
    .filter(Boolean)
    .map((f) => f.replace(/ /g, "+"))
    .join("&family=");
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
  document.head.appendChild(link);
  document.documentElement.style.setProperty("--brand-font-heading", `"${fonts.heading}", sans-serif`);
  document.documentElement.style.setProperty("--brand-font", `"${fonts.body}", sans-serif`);
}
