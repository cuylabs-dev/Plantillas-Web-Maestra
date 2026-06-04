import { SiteNav, Section, SectionHead, SiteFooter } from "../components/site";
import { SubPagePills } from "../components/SubPagePills";
import StockImage from "../components/StockImage";
import BrandGallery from "../components/BrandGallery";
import { Motion } from "../components/motion";
import type { Copy } from "../lib/params";
import { buildNavLinks, makeShow, DEFAULT_SECTIONS } from "../catalog/index";
import GenericSection from "../catalog/GenericSection";
import { useBrandKit } from "../context/BrandKitContext";

type Propiedad = { titulo?: string; detalle?: string; zona?: string; title?: string; d?: string };

function parsePropiedades(items: unknown[]): Propiedad[] {
  return items.map((it) => {
    if (typeof it === "string") return { titulo: it, detalle: "Consultar disponibilidad", zona: "Lima" };
    if (it && typeof it === "object") return it as Propiedad;
    return { titulo: "Inmueble disponible", detalle: "", zona: "Lima" };
  });
}

const FALLBACK_PROPS: Propiedad[] = [
  { titulo: "Departamento con vista", detalle: "3 dorm. · 85 m² · Miraflores", zona: "Miraflores" },
  { titulo: "Casa en condominio", detalle: "4 dorm. · jardín · La Molina", zona: "La Molina" },
  { titulo: "Oficina lista para operar", detalle: "San Isidro · 48 m²", zona: "San Isidro" },
];

export default function InmobiliariasTemplate({
  cliente,
  copy,
  logoUrl,
  activeSections = DEFAULT_SECTIONS.inmobiliarias,
}: {
  cliente: string;
  copy: Copy;
  logoUrl?: string;
  activeSections?: string[];
}) {
  const show = makeShow(activeSections);
  const nav = buildNavLinks("inmobiliarias", activeSections);
  const kit = useBrandKit();
  const sc = kit?.sectionsCopy || {};
  const hero = sc.hero as { eyebrow?: string; tagline?: string } | undefined;
  const propsBlock = sc.propiedades as { title?: string; subtitle?: string; items?: unknown[] } | undefined;
  const propiedades = parsePropiedades(propsBlock?.items?.length ? propsBlock.items : FALLBACK_PROPS);
  const stats = (sc.stats as { items?: string[] } | undefined)?.items || [
    "+80 propiedades",
    "10 años en Lima",
    "Asesores certificados",
    "4.8★ en Google",
  ];
  const quienes = sc.quienes_somos as { title?: string; subtitle?: string; body?: string } | undefined;

  return (
    <div id="top" className="bg-slate-950 text-white">
      <SiteNav cliente={cliente} logoUrl={logoUrl} links={nav} cta="Agendar visita" dark />
      <SubPagePills items={nav} />

      {show("hero") && (
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40" />
          <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <Motion variant="left">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
                {copy.eyebrow || hero?.eyebrow || "Inmobiliaria en Lima"}
              </p>
              <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                {copy.head || `${cliente}: encuentra tu próximo inmueble`}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                {copy.sub ||
                  hero?.tagline ||
                  `Compra, venta y alquiler con asesores que conocen cada distrito. ${cliente} te acompaña de la primera visita al cierre.`}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contacto"
                  className="inline-flex h-12 items-center rounded-full bg-amber-500 px-8 font-semibold text-slate-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-400"
                >
                  Hablar con un asesor
                </a>
                <a
                  href="#propiedades"
                  className="inline-flex h-12 items-center rounded-full border border-white/20 px-8 font-semibold text-white hover:border-amber-400/60"
                >
                  Ver propiedades
                </a>
              </div>
            </Motion>
            <Motion variant="right">
              <StockImage
                template="inmobiliarias"
                variant="hero"
                alt={cliente}
                className="h-72 w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 lg:h-[420px]"
              />
            </Motion>
          </div>
        </header>
      )}

      {show("busqueda") && (
        <Section id="busqueda" className="border-y border-white/10 bg-slate-900/80 py-10">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 px-6">
            {["Comprar", "Alquilar", "Tasación", "Invertir"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-amber-500/30 bg-slate-950 px-5 py-2 text-sm font-medium text-amber-100"
              >
                {t}
              </span>
            ))}
          </div>
        </Section>
      )}

      {(show("stats") || show("metricas")) && (
        <section className="border-b border-white/10 bg-slate-900">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
            {stats.slice(0, 4).map((line) => {
              const parts = line.split(/\s+/);
              const v = parts[0];
              const l = parts.slice(1).join(" ");
              return (
                <div key={line} className="text-center">
                  <div className="text-3xl font-bold text-amber-400 lg:text-4xl">{v}</div>
                  <p className="mt-2 text-sm text-slate-400">{l}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {show("propiedades") && (
        <Section id="propiedades" className="bg-slate-950 py-20">
          <SectionHead
            title={propsBlock?.title || "Propiedades destacadas"}
            subtitle={propsBlock?.subtitle || `Selección actual de ${cliente}`}
            dark
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {propiedades.slice(0, 6).map((p, i) => (
              <article
                key={i}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 transition hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-700">
                  <StockImage
                    template="inmobiliarias"
                    variant="section"
                    className="h-full w-full object-cover opacity-90 transition group-hover:scale-[1.02]"
                    alt={p.titulo || "Propiedad"}
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    {p.zona || "Lima"}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-white">{p.titulo || p.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{p.detalle || p.d}</p>
                  <a
                    href="#contacto"
                    className="mt-4 inline-flex text-sm font-semibold text-amber-400 hover:text-amber-300"
                  >
                    Solicitar ficha →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Section>
      )}

      {show("quienes_somos") && (
        <Section id="quienes_somos" className="section-alt-a border-y border-slate-200 bg-white py-20 text-slate-900">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
            <div>
              <SectionHead
                title={quienes?.title || `Sobre ${cliente}`}
                subtitle={quienes?.subtitle || "Tu inmobiliaria de confianza en Lima"}
                center
              />
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                {quienes?.body ||
                  `${cliente} nació para simplificar la compra y venta de inmuebles en Lima: asesoría honesta, visitas coordinadas y negociación transparente.`}
              </p>
            </div>
            <StockImage template="inmobiliarias" variant="people" className="rounded-2xl shadow-xl" alt={cliente} />
          </div>
        </Section>
      )}

      {["zonas", "servicios", "proceso", "equipo", "testimonios", "faq", "cta"].map(
        (id) =>
          show(id) && (
            <GenericSection
              key={id}
              id={id}
              template="inmobiliarias"
              cliente={cliente}
              light={id !== "cta"}
            />
          ),
      )}

      {show("galeria") && <BrandGallery template="inmobiliarias" />}

      <SiteFooter
        cliente={cliente}
        tagline={`${cliente} — compra, venta y alquiler de inmuebles en Lima.`}
        columns={[
          { title: "Servicios", items: ["Venta", "Alquiler", "Tasación", "Asesoría legal"] },
          { title: "Zonas", items: ["Miraflores", "San Isidro", "Surco", "La Molina"] },
          { title: "Contacto", items: ["Lima, Perú", "WhatsApp directo", "Visita sin compromiso"] },
        ]}
        dark
      />
    </div>
  );
}
