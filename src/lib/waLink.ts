import type { BrandKit } from "./kit";

export function buildWaLink(phone?: string | null, text?: string | null): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9) return undefined;
  const base = `https://wa.me/${digits}`;
  if (!text?.trim()) return base;
  return `${base}?text=${encodeURIComponent(text.trim().slice(0, 500))}`;
}

export function resolveWaLink(
  urlWa: string | undefined,
  kit: BrandKit | null,
): string | undefined {
  if (urlWa) return urlWa;
  if (!kit) return undefined;
  return buildWaLink(kit.phone_e164, kit.wa_text) || "#contacto";
}
