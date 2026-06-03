import { SiteNav, Section, SectionHead, SiteFooter } from "../components/site";
import type { Copy } from "../lib/params";
import { buildNavLinks, makeShow, DEFAULT_SECTIONS } from "../catalog/index";

/** Inspirado en estructura Credicorp / Alicorp (holding, líneas, valores, noticias). */

const STATS = [
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
  {
    t: "Transformación digital",
    d: "Innovación y tecnología al servicio del crecimiento sostenible.",
  },
  {
    t: "Talento y cultura",
    d: "Formación continua y el mejor equipo para ejecutar la estrategia.",
  },
  {
    t: "Sostenibilidad integrada",
    d: "Compromiso ambiental y social en cada línea de negocio.",
  },
];

const PRESENCIA = [
  { pais: "Perú", rank: "Operación principal", note: "Sede y mayor volumen." },
  { pais: "Chile", rank: "Expansión regional", note: "Servicios especializados." },
  { pais: "Colombia", rank: "Crecimiento", note: "Nuevos clientes B2B." },
  { pais: "Bolivia", rank: "Presencia", note: "Alianzas locales." },
];

function noticiasFor(cliente: string) {
  return [
    { fecha: "19 may 2026", titulo: `${cliente} reconocido por su gestión de talento en la región` },
    { fecha: "15 may 2026", titulo: "Nueva alianza estratégica fortalece portafolio digital" },
    { fecha: "24 abr 2026", titulo: "Más de 10 mil beneficiarios en programa comunitario" },
    { fecha: "01 abr 2026", titulo: "Resultados del primer trimestre superan expectativas" },
  ];
}

const MARCAS = ["Marca A", "Marca B", "Marca C", "Marca D", "Marca E", "Marca F", "Marca G", "Marca H"];

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

  return (
    <div id="top" className="bg-white">
      <SiteNav cliente={cliente} logoUrl={logoUrl} links={nav} cta="Únete al equipo" ctaHref="#contacto" />

      {/* Hero editorial tipo Credicorp */}
      {show("hero") && (
        <header className="relative border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
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
            <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
              {copy.sub ||
                `Somos un grupo con presencia regional, décadas de experiencia y un propósito claro: crear valor para colaboradores, clientes y las comunidades donde operamos.`}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#quienes_somos"
                className="inline-flex h-12 items-center rounded-full bg-brand px-8 font-semibold text-white"
              >
                Conócenos
              </a>
              <a
                href="#lineas_negocio"
                className="inline-flex h-12 items-center rounded-full border border-slate-300 px-8 font-semibold text-slate-700 hover:border-brand"
              >
                Líneas de negocio
              </a>
            </div>
          </div>
        </header>
      )}

      {/* Cifras holding */}
      {show("stats_holding") && (
        <section id="stats_holding" className="border-y border-slate-100 bg-slate-900 text-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
            {STATS.map((s) => (
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
              <SectionHead eyebrow="¿Quiénes somos?" title={`El holding detrás de ${cliente}`} />
              <p className="text-slate-600 leading-relaxed">
                Empezamos como un actor local y hoy somos referente en nuestro sector. Alimentamos el
                crecimiento de cada país donde estamos y mejoramos la calidad de vida de colaboradores,
                clientes, inversionistas y comunidades.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Nuestra visión es ser un líder sostenible en Latinoamérica, guiados por un gran
                propósito y enfocados en crear valor superior.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-2xl brand-gradient shadow-xl" />
          </div>
        </Section>
      )}

      {show("lineas_negocio") && (
        <Section id="lineas_negocio" className="bg-slate-50">
          <SectionHead
            eyebrow="Portafolio"
            title="Líneas de negocio"
            subtitle="Diversificación con foco en el cliente y la región."
            center
          />
          <div className="grid gap-6 md:grid-cols-2">
            {LINEAS.map((l) => (
              <div
                key={l.t}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 h-1 w-12 bg-brand" />
                <h3 className="text-xl font-bold text-slate-900">{l.t}</h3>
                <p className="mt-2 text-slate-600">{l.d}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-brand">Ver más →</span>
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
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-white">
                  ◆
                </div>
                <h3 className="font-bold text-slate-900">{v.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{v.d}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {show("prioridades") && (
        <Section id="prioridades" className="bg-slate-900 text-white">
          <SectionHead eyebrow="Estrategia" title="Prioridades estratégicas" dark center />
          <div className="grid gap-8 md:grid-cols-3">
            {PRIORIDADES.map((p, i) => (
              <div key={p.t} className="border-t-2 border-brand pt-6">
                <span className="text-4xl font-light text-white/30">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold">{p.t}</h3>
                <p className="mt-3 text-white/65">{p.d}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {show("presencia") && (
        <Section id="presencia">
          <SectionHead
            eyebrow="Regional"
            title="Presencia en la región"
            subtitle="Negocios y operaciones donde generamos impacto."
            center
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRESENCIA.map((r) => (
              <div
                key={r.pais}
                className="rounded-xl border border-slate-200 p-6 transition hover:border-brand hover:shadow-lg"
              >
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
                <h3 className="font-semibold text-slate-900 hover:text-brand">{n.titulo}</h3>
              </article>
            ))}
          </div>
        </Section>
      )}

      {show("marcas") && (
        <Section id="marcas">
          <SectionHead eyebrow="Portafolio" title="Nuestras marcas" subtitle="Marcas que impulsan el ecosistema." center />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
            {MARCAS.map((m) => (
              <div
                key={m}
                className="flex aspect-[3/2] items-center justify-center rounded-xl bg-slate-100 text-lg font-bold text-slate-500 ring-1 ring-slate-200"
              >
                {m}
              </div>
            ))}
          </div>
        </Section>
      )}

      {show("sostenibilidad") && (
        <section id="sostenibilidad" className="brand-gradient px-6 py-16 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Nuestra estrategia de sostenibilidad</h2>
            <p className="mt-4 text-white/90">
              Integramos criterios ASG en la operación de {cliente} para ser el agente de cambio que
              aspiramos ser en la región.
            </p>
            <a href="#contacto" className="mt-8 inline-flex rounded-full bg-white px-8 py-3 font-bold text-slate-900">
              Ver reporte integrado
            </a>
          </div>
        </section>
      )}

      {show("servicios") && (
        <Section id="servicios">
          <SectionHead eyebrow="B2B" title="Soluciones para empresas" />
          <p className="max-w-2xl text-slate-600">
            Consultoría, transformación digital y soporte continuo para organizaciones que buscan
            escalar con {cliente}.
          </p>
        </Section>
      )}

      {show("contacto") && (
        <Section id="contacto" className="bg-slate-50">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-light text-slate-900">
              ¿Listo para conversar con <span className="font-semibold text-brand">{cliente}</span>?
            </h2>
            <p className="mt-4 text-slate-600">Inversionistas, alianzas o talento — contáctanos.</p>
            <a
              href="#"
              className="mt-8 inline-flex h-12 items-center rounded-full bg-brand px-10 font-semibold text-white"
            >
              Contactar
            </a>
          </div>
        </Section>
      )}

      <SiteFooter
        cliente={cliente}
        tagline="Contribuimos a mejorar vidas, acelerando los cambios que nuestros países necesitan."
        columns={[
          { title: "Empresa", items: ["Nosotros", "Inversionistas", "Sostenibilidad", "Noticias"] },
          { title: "Negocios", items: ["Líneas de negocio", "Marcas", "Presencia regional"] },
          { title: "Contacto", items: ["Lima, Perú", "Línea ética", "Trabaja con nosotros"] },
        ]}
      />
    </div>
  );
}
