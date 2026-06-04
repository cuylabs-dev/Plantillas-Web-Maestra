import type { Template } from "../lib/params";

export const SECTION_CATALOG: Record<Template, readonly string[]> = {
  gimnasios: [
    "hero", "stats", "entrenamiento", "coaches_campeones", "planes", "beneficios", "coaches",
    "eventos", "eventos_peleas", "horarios", "galeria", "testimonios", "faq", "cta", "contacto",
  ],
  clinicas: [
    "hero", "servicios", "equipo", "precios", "reservas", "antes_despues", "seguros",
    "faq", "ubicacion", "cta", "contacto", "confianza",
  ],
  colegios: [
    "hero", "niveles", "metodologia", "admision", "vida_escolar", "instalaciones",
    "docentes", "calendario", "faq", "padres", "cta", "contacto",
  ],
  tiendas: [
    "hero", "prime_banner", "categorias", "filas", "grid_catalogo", "destacados", "ofertas",
    "envios", "reviews", "faq", "cta", "contacto",
  ],
  corporativo: [
    "hero", "stats_holding", "metricas", "quienes_somos", "lineas_negocio", "valores", "prioridades",
    "presencia", "noticias", "marcas", "sostenibilidad", "servicios", "casos", "metodologia", "equipo",
    "industrias", "partners", "blog_teaser", "faq", "cta", "contacto", "galeria",
  ],
};

export const DEFAULT_SECTIONS: Record<Template, string[]> = {
  gimnasios: [
    "hero", "stats", "entrenamiento", "coaches_campeones", "planes", "eventos", "beneficios", "faq", "contacto",
  ],
  clinicas: ["hero", "servicios", "equipo", "precios", "reservas", "faq", "cta", "contacto"],
  colegios: ["hero", "niveles", "metodologia", "admision", "instalaciones", "faq", "cta", "contacto"],
  tiendas: ["hero", "prime_banner", "categorias", "filas", "grid_catalogo", "ofertas", "envios", "contacto"],
  corporativo: [
    "hero", "stats_holding", "quienes_somos", "lineas_negocio", "valores", "prioridades", "noticias", "contacto",
  ],
};

const NAV_LABELS: Record<Template, Record<string, string>> = {
  gimnasios: {
    hero: "Inicio",
    stats: "Logros",
    entrenamiento: "Entrenamiento",
    coaches_campeones: "Campeones",
    planes: "Planes",
    beneficios: "Beneficios",
    coaches: "Coaches",
    eventos: "Eventos",
    eventos_peleas: "Fight Night",
    horarios: "Horarios",
    galeria: "Galería",
    testimonios: "Testimonios",
    faq: "FAQ",
    cta: "Empieza",
    contacto: "Contacto",
  },
  clinicas: {
    hero: "Inicio",
    servicios: "Servicios",
    equipo: "Equipo",
    precios: "Precios",
    reservas: "Reservas",
    antes_despues: "Resultados",
    seguros: "Seguros",
    confianza: "Confianza",
    faq: "FAQ",
    ubicacion: "Ubicación",
    cta: "Reservar",
    contacto: "Contacto",
  },
  colegios: {
    hero: "Inicio",
    niveles: "Niveles",
    metodologia: "Metodología",
    admision: "Admisión",
    vida_escolar: "Vida escolar",
    instalaciones: "Instalaciones",
    docentes: "Docentes",
    calendario: "Calendario",
    faq: "FAQ",
    padres: "Padres",
    cta: "Visita",
    contacto: "Contacto",
  },
  tiendas: {
    hero: "Inicio",
    prime_banner: "Ofertas",
    categorias: "Departamentos",
    filas: "Para ti",
    grid_catalogo: "Catálogo",
    destacados: "Destacados",
    ofertas: "Promos",
    envios: "Envíos",
    reviews: "Reseñas",
    faq: "FAQ",
    cta: "Comprar",
    contacto: "Contacto",
  },
  corporativo: {
    hero: "Inicio",
    stats_holding: "Cifras",
    quienes_somos: "Quiénes somos",
    lineas_negocio: "Negocios",
    valores: "Valores",
    prioridades: "Estrategia",
    presencia: "Presencia",
    noticias: "Noticias",
    marcas: "Marcas",
    sostenibilidad: "Sostenibilidad",
    servicios: "Servicios",
    casos: "Casos",
    metodologia: "Método",
    equipo: "Equipo",
    metricas: "Impacto",
    industrias: "Industrias",
    partners: "Partners",
    blog_teaser: "Insights",
    galeria: "Galería",
    faq: "FAQ",
    cta: "Diagnóstico",
    contacto: "Contacto",
  },
};

export function parseSectionIds(csv: string | null, template: Template): string[] | null {
  const allowed = new Set(SECTION_CATALOG[template]);
  if (!csv) return null;
  const ids = csv
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => allowed.has(s));
  return ids.length ? ids : null;
}

export function resolveSections(template: Template, ids: string[] | null): string[] {
  const catalog = SECTION_CATALOG[template];
  let list = ids?.length ? ids : DEFAULT_SECTIONS[template];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const id of list) {
    if (catalog.includes(id) && !seen.has(id)) {
      seen.add(id);
      out.push(id);
    }
    if (out.length >= 12) break;
  }
  if (!out.includes("hero")) out.unshift("hero");
  if (!out.includes("contacto")) out.push("contacto");
  return out.slice(0, 12);
}

export function buildNavLinks(template: Template, sections: string[]) {
  const labels = NAV_LABELS[template];
  return sections
    .filter((id) => id !== "hero" && labels[id])
    .slice(0, 7)
    .map((id) => ({
      label: labels[id],
      href: id === "contacto" ? "#contacto" : `#${id}`,
    }));
}

export function makeShow(sections: string[]) {
  const set = new Set(sections);
  return (id: string) => set.has(id);
}
