import { SiteNav, Section, SectionHead, SiteFooter } from "../components/site";
import { SubPagePills } from "../components/SubPagePills";
import StockImage from "../components/StockImage";
import BrandGallery from "../components/BrandGallery";
import { Motion } from "../components/motion";
import type { Copy } from "../lib/params";
import { buildNavLinks, makeShow, DEFAULT_SECTIONS } from "../catalog/index";
import GenericSection from "../catalog/GenericSection";
import { useBrandKit } from "../context/BrandKitContext";

const HOLDING_STATS = [
  { v: "+25", l: "años de trayectoria" },
  { v: "+500", l: "colaboradores" },
  { v: "Top 3", l: "en su sector · Perú" },
  { v: "5", l: "países con operación" },
];

const LINEAS = [
  { t: "Solución principal", d: "Núcleo del negocio y mayor participación en ingresos." },
  { t: "Servicios complementarios", d: "Portafolio que amplía valor al cliente final." },
  { t: "Innovación y digital", d: "Transformación, datos y nuevos canales." },
  { t: "Alianzas estratégicas", d: "Partners y venture para escalar en la región." },
];

const VALORES = [
  { t: "Integridad", d: "Actuamos con transparencia en cada decisión." },
  { t: "Excelencia", d: "Buscamos el mejor estándar en lo que entregamos." },
  { t: "Innovación", d: "Aceleramos ideas que mejoran vidas y negocios." },
  { t: "Sostenibilidad", d: "Crecimiento responsable con la comunidad." },
  { t: "Talento", d: "Desarrollamos a quienes construyen el futuro." },
];

const PRIORIDADES = [
  { t: "Transformación digital", d: "Innovación y tecnología al servicio del crecimiento." },
  { t: "Talento y cultura", d: "Formación continua y equipos de alto rendimiento." },
  { t: "Sostenibilidad integrada", d: "Compromiso ambiental y social en cada línea." },
];

const PRESENCIA = [
  { pais: "Perú", rank: "Operación principal", note: "Sede y mayor volumen." },
  { pais: "Chile", rank: "Expansión regional", note: "Servicios especializados." },
  { pais: "Colombia", rank: "Crecimiento", note: "Nuevos clientes B2B." },
  { pais: "Bolivia", rank: "Presencia", note: "Alianzas locales." },
];

function noticiasFor(cliente: string) {
  return [
    { fecha: "19 may 2026", titulo: `${cliente} reconocido por gestión de talento en la región` },
    { fecha: "15 may 2026", titulo: "Nueva alianza estratégica fortalece portafolio digital" },
    { fecha: "24 abr 2026", titulo: "Programa comunitario alcanza nuevos beneficiarios" },
    { fecha: "01 abr 2026", titulo: "Resultados del trimestre superan expectativas" },
  ];
}

const CONSULTORA_GENERIC = [
  "servicios",
  "metodologia",
  "casos",
  "equipo",
  "industrias",
  "partners",
  "blog_teaser",
  "faq",
  "cta",
] as const;

function MetricasBar({ cliente, dark }: { cliente: string; dark?: boolean }) {
  const kit = useBrandKit();
  const block = (kit?.sectionsCopy?.metricas || kit?.sectionsCopy?.stats) as
    | { items?: string[]; title?: string }
    | undefined;
  const items =
    block?.items ||
    ["+40 proyectos", "12 industrias", "ROI en 90 días", "Equipo senior local"];
  return (
    <section
      id="metricas"
      className={`border-y ${dark ? "border-white/10 bg-slate-900 text-white" : "border-slate-100 bg-slate-900 text-white"}`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
        {items.slice(0, 4).map((line) => {
          const [v, ...rest] = line.split(/\s+/);
          const l = rest.join(" ") || cliente;
          return (
            <div key={line} className="text-center">
              <div className="text-3xl font-extrabold text-brand lg:text-4xl">{v}</div>
              <p className="mt-2 text-sm text-white/70">{l}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ConsultoraLayout({
  cliente,
  copy,
  show,
}: {
  cliente: string;
  copy: Copy;
  show: (id: string) => boolean;
}) {
  return (
    <>
      {show("hero") && (
        <header className="relative border-b border-slate-100 section-alt-a">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-22">
            <Motion variant="left">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">
                {copy.eyebrow || "Consultoría B2B · Lima"}
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                {copy.head || (
                  <>
                    {cliente}: consultoría que entiende tu operación en Perú
                  </>
                )}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                {copy.sub ||
                  `Diagnóstico, ejecución y acompañamiento para que ${cliente} gane claridad, velocidad y resultados medibles — sin plantillas genéricas.`}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#cta"
                  className="inline-flex h-12 items-center rounded-full bg-brand px-8 font-semibold text-white"
                >
                  Agenda diagnóstico
                </a>
                <a
                  href="#casos"
                  className="inline-flex h-12 items-center rounded-full border border-slate-300 px-8 font-semibold text-slate-700 hover:border-brand"
                >
                  Ver casos
                </a>
              </div>
            </Motion>
            <Motion variant="right">
              <StockImage template="corporativo" variant="hero" className="h-64 w-full lg:h-[360px]" overlay />
            </Motion>
          </div>
        </header>
      )}

      {(show("metricas") || show("stats_holding")) && <MetricasBar cliente={cliente} />}

      {CONSULTORA_GENERIC.filter((id) => show(id)).map((id) => (
        <GenericSection key={id} id={id} template="corporativo" cliente={cliente} light />
      ))}

      {show("galeria") && <BrandGallery template="corporativo" />}

      {show("servicios") && !CONSULTORA_GENERIC.includes("servicios") && (
        <GenericSection id="servicios" template="corporativo" cliente={cliente} light />
      )}
    </>
  );
}

export default function CorporativoTemplate({
  cliente,
  copy,
  logoUrl,
  activeSections = DEFAULT_SECTIONS.corporativo,
}: {
  cliente: string;
  copy: Copy;
  logoUrl?: string;
  activeSections?: string[];
}) {
  const show = makeShow(activeSections);
  const nav = buildNavLinks("corporativo", activeSections);
  const noticias = noticiasFor(cliente);
  const isConsultora =
    activeSections.includes("casos") ||
    activeSections.includes("metodologia") ||
    activeSections.includes("metricas") ||
    (activeSections.includes("servicios") && !activeSections.includes("stats_holding"));

  return (
    <div id="top" className="bg-white">
      <SiteNav
        cliente={cliente}
        logoUrl={logoUrl}
        links={nav}
        cta={isConsultora ? "Diagnóstico gratis" : "Únete al equipo"}
        ctaHref={isConsultora ? "#cta" : "#contacto"}
      />
      <SubPagePills items={nav} />

      {isConsultora ? (
        <ConsultoraLayout cliente={cliente} copy={copy} show={show} />
      ) : (
        <>
          {show("hero") && (
            <header className="relative border-b border-slate-100 section-alt-a">
              <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-24">
                <Motion variant="left">
                  <p className="text-sm font-semibold uppercase tracking-widest text-brand">
                    {copy.eyebrow || "Líder en su industria · Perú y LATAM"}
                  </p>
                  <h1 className="mt-6 max-w-4xl text-4xl font-light leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                    {copy.head || (
                      <>
                        Contribuimos a mejorar vidas, acelerando los cambios que{" "}
                        <span className="font-semibold text-brand">{cliente}</span> impulsa
                      </>
                    )}
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                    {copy.sub ||
                      `Somos un grupo con presencia regional, décadas de experiencia y un propósito claro: crear valor para colaboradores, clientes y comunidades.`}
                  </p>
                </Motion>
                <Motion variant="right">
                  <StockImage template="corporativo" variant="hero" className="h-64 w-full lg:h-[380px]" overlay />
                </Motion>
              </div>
            </header>
          )}

          {show("stats_holding") && (
            <section id="stats_holding" className="border-y border-slate-100 bg-slate-900 text-white">
              <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
                {HOLDING_STATS.map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="text-4xl font-extrabold text-brand lg:text-5xl">{s.v}</div>
                    <p className="mt-2 text-sm text-white/70">{s.l}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {show("quienes_somos") && (
            <Section id="quienes_somos">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                  <SectionHead eyebrow="¿Quiénes somos?" title={`El equipo detrás de ${cliente}`} />
                  <p className="leading-relaxed text-slate-600">
                    Referente en nuestro sector con operación en Perú y la región. Creamos valor para
                    colaboradores, clientes e inversionistas.
                  </p>
                </div>
                <StockImage template="corporativo" variant="section" sectionId="quienes_somos" className="aspect-[4/3] w-full" overlay />
              </div>
            </Section>
          )}

          {show("lineas_negocio") && (
            <Section id="lineas_negocio" className="bg-slate-50">
              <SectionHead eyebrow="Portafolio" title="Líneas de negocio" center />
              <div className="grid gap-6 md:grid-cols-2">
                {LINEAS.map((l) => (
                  <div key={l.t} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-4 h-1 w-12 bg-brand" />
                    <h3 className="text-xl font-bold text-slate-900">{l.t}</h3>
                    <p className="mt-2 text-slate-600">{l.d}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {show("valores") && (
            <Section id="valores">
              <SectionHead eyebrow="Cultura" title="¿En qué creemos?" center />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {VALORES.map((v) => (
                  <div key={v.t} className="rounded-xl bg-brand-soft p-6 text-center">
                    <h3 className="font-bold text-slate-900">{v.t}</h3>
                    <p className="mt-2 text-sm text-slate-600">{v.d}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {show("prioridades") && (
            <Section id="prioridades" className="section-alt-dark">
              <SectionHead eyebrow="Estrategia" title="Prioridades estratégicas" dark center />
              <div className="grid gap-8 md:grid-cols-3">
                {PRIORIDADES.map((p, i) => (
                  <div key={p.t} className="border-t-2 border-brand pt-6">
                    <span className="text-4xl font-light text-white/30">0{i + 1}</span>
                    <h3 className="mt-4 text-xl font-bold text-white">{p.t}</h3>
                    <p className="mt-3 text-white/65">{p.d}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {show("presencia") && (
            <Section id="presencia">
              <SectionHead eyebrow="Regional" title="Presencia en la región" center />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {PRESENCIA.map((r) => (
                  <div key={r.pais} className="rounded-xl border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-brand">{r.pais}</h3>
                    <p className="mt-1 font-semibold text-slate-900">{r.rank}</p>
                    <p className="mt-2 text-sm text-slate-500">{r.note}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {show("noticias") && (
            <Section id="noticias" className="bg-slate-50">
              <SectionHead eyebrow="Novedades" title="Noticias" center />
              <div className="divide-y divide-slate-200 rounded-2xl bg-white ring-1 ring-slate-100">
                {noticias.map((n) => (
                  <article key={n.titulo} className="flex flex-col gap-2 p-6 sm:flex-row sm:gap-8">
                    <time className="shrink-0 text-sm font-semibold text-brand">{n.fecha}</time>
                    <h3 className="font-semibold text-slate-900">{n.titulo}</h3>
                  </article>
                ))}
              </div>
            </Section>
          )}
        </>
      )}

      {show("contacto") && (
        <Section id="contacto" className="bg-slate-50">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-light text-slate-900">
              ¿Hablamos, <span className="font-semibold text-brand">{cliente}</span>?
            </h2>
            <p className="mt-4 text-slate-600">
              {isConsultora
                ? "Agenda un diagnóstico inicial sin compromiso."
                : "Inversionistas, alianzas o talento — contáctanos."}
            </p>
            <a
              href="#cta"
              className="mt-8 inline-flex h-12 items-center rounded-full bg-brand px-10 font-semibold text-white"
            >
              Contactar
            </a>
          </div>
        </Section>
      )}

      <SiteFooter
        cliente={cliente}
        tagline={
          isConsultora
            ? `${cliente} — consultoría con foco en resultados en Perú.`
            : "Contribuimos a mejorar vidas, acelerando los cambios que nuestros países necesitan."
        }
        columns={[
          {
            title: "Empresa",
            items: isConsultora ? ["Servicios", "Casos", "Equipo", "FAQ"] : ["Nosotros", "Inversionistas", "Noticias"],
          },
          {
            title: isConsultora ? "Servicios" : "Negocios",
            items: isConsultora ? ["Diagnóstico", "Implementación", "Capacitación"] : ["Líneas de negocio", "Marcas"],
          },
          { title: "Contacto", items: ["Lima, Perú", "WhatsApp", "Agenda reunión"] },
        ]}
      />
    </div>
  );
}
