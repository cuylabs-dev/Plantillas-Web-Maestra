const SEDE_SUFFIX =
  /\s*[-–|]\s*(sede\s+.+|la molina|miraflores|surco|san isidro|san borja|lince|los olivos|callao|centro|norte|este|sur)$/i;

export function shortenBrandName(name: string, maxLen = 44): string {
  if (!name) return "Tu negocio";
  let s = name.trim();
  for (let i = 0; i < 3 && SEDE_SUFFIX.test(s); i++) {
    s = s.replace(SEDE_SUFFIX, "").trim();
  }
  if (s.length <= maxLen) return s;
  return `${s.slice(0, maxLen - 1).trim()}…`;
}

export function truncateText(text: string, maxLen: number): string {
  const t = (text || "").trim();
  if (!t || t.length <= maxLen) return t;
  return `${t.slice(0, maxLen - 1).trim()}…`;
}

export function formatHeroHeadline(headline: string | undefined, businessName: string, maxLen = 52): string {
  const short = shortenBrandName(businessName, 40);
  let h = (headline || "").trim();
  if (!h) return `Descubre ${short}`;
  h = h.replace(SEDE_SUFFIX, "").trim();
  if (h.length > maxLen) return truncateText(h, maxLen);
  return h;
}

const BANNED_SUB =
  /servicios integrales de salud|plena recuperaci[oó]n|equipo multidisciplinario/i;

export function formatHeroSubhead(subhead: string | undefined, maxLen = 150): string {
  let s = (subhead || "").trim();
  if (BANNED_SUB.test(s)) return "";
  return truncateText(s, maxLen);
}
