import { SiteNav, Section, SectionHead, SiteFooter } from "../components/site";
import type { Copy } from "../lib/params";

const NAV = [
  { label: "Nuestro Colegio", href: "#colegio" },
  { label: "¿Qué ofrecemos?", href: "#oferta" },
  { label: "¿Por qué nosotros?", href: "#porque" },
  { label: "Admisión", href: "#admision" },
];

const OFERTA = [
  { t: "Early Years", d: "Primeros años con estimulación y juego guiado." },
  { t: "Excelencia académica", d: "Estándares altos y acompañamiento personalizado." },
  { t: "Bachillerato Internacional", d: "Programa IB reconocido a nivel mundial." },
  { t: "Idiomas", d: "Formación bilingüe desde los primeros grados." },
  { t: "Tecnología e innovación", d: "Aulas digitales y pensamiento computacional." },
  { t: "Deporte, arte y cultura", d: "Desarrollo integral más allá del aula." },
];

const PILARES = ["Formación en valores", "Comunidad y familia", "Pensamiento crítico", "Vocación de servicio"];

const ADMISION = [
  { n: "1", t: "Solicita información", d: "Déjanos tus datos y te contactamos." },
  { n: "2", t: "Visita el colegio", d: "Conoce nuestros ambientes en un Open Day." },
  { n: "3", t: "Postula en línea", d: "Inicia el proceso de admisión desde casa." },
];

export default function ColegiosTemplate({
  cliente,
  copy,
  logoUrl,
}: {
  cliente: string;
  copy: Copy;
  logoUrl?: string;
}) {
  return (
    <div id="top">
      <SiteNav cliente={cliente} logoUrl={logoUrl} links={NAV} cta="Admisión" ctaHref="#admision" />

      {/* Hero estilo Open Day */}
      <header className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 -z-10 brand-gradient opacity-90" />
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(white_1.5px,transparent_1.5px)] [background-size:28px_28px]" />
        <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            {copy.eyebrow || "Admisión 2027 abierta"}
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            {copy.head || "El colegio que las familias eligen con confianza"}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85">
            {copy.sub ||
              `En ${cliente} formamos personas íntegras: combinamos excelencia académica, valores y una comunidad que acompaña a cada estudiante en su camino.`}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#admision" className="inline-flex h-12 items-center rounded-full bg-white px-7 font-semibold text-slate-900 transition hover:bg-white/90">
              Inscríbete al Open Day
            </a>
            <a href="#oferta" className="inline-flex h-12 items-center rounded-full border border-white/40 px-7 font-semibold text-white transition hover:bg-white/10">
              Conocer la propuesta
            </a>
          </div>
        </div>
      </header>

      {/* Nuestro colegio */}
      <Section id="colegio">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Nuestro colegio" title="Una propuesta educativa con propósito" />
            <p className="text-slate-600">
              Acompañamos a cada estudiante a descubrir su potencial en un entorno seguro, moderno y
              lleno de oportunidades. Nuestra metodología combina rigor académico con formación
              humana para preparar a los líderes del mañana.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[["+40", "años formando"], ["1500+", "egresados"], ["100%", "ingreso a universidad"]].map(
                ([v, l]) => (
                  <div key={l} className="rounded-2xl bg-brand-soft p-5 text-center">
                    <div className="text-2xl font-extrabold text-brand">{v}</div>
                    <div className="mt-1 text-xs text-slate-500">{l}</div>
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="aspect-[4/3] rounded-3xl brand-gradient opacity-90 shadow-xl" />
        </div>
      </Section>

      {/* Qué ofrecemos */}
      <Section id="oferta" className="bg-slate-50">
        <SectionHead eyebrow="¿Qué ofrecemos?" title="Educación integral en cada etapa" center />
        <div className="grid gap-6 md:grid-cols-3">
          {OFERTA.map((o) => (
            <div key={o.t} className="rounded-2xl border border-slate-100 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">★</div>
              <h3 className="text-lg font-bold text-slate-900">{o.t}</h3>
              <p className="mt-2 text-sm text-slate-500">{o.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Por qué nosotros / pilares */}
      <Section id="porque">
        <SectionHead eyebrow="¿Por qué estudiar aquí?" title="Nuestros pilares" center />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILARES.map((p, i) => (
            <div key={p} className="rounded-2xl bg-gradient-to-b from-brand-soft to-white p-7 ring-1 ring-slate-100">
              <div className="text-4xl font-extrabold text-brand">0{i + 1}</div>
              <h3 className="mt-3 font-bold text-slate-900">{p}</h3>
            </div>
          ))}
        </div>
      </Section>

      {/* Galería */}
      <Section className="bg-slate-50">
        <SectionHead eyebrow="Nuestro espacio" title="Ambientes pensados para aprender" center />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-2xl bg-brand-soft" style={{ backgroundImage: i % 2 ? "linear-gradient(135deg,var(--brand-100),var(--brand-500))" : undefined }} />
          ))}
        </div>
      </Section>

      {/* Admisión */}
      <Section id="admision">
        <div className="rounded-3xl bg-slate-900 px-8 py-14 text-white sm:px-14">
          <SectionHead eyebrow="Admisión" title="Tu proceso de admisión en 3 pasos" dark />
          <div className="grid gap-8 md:grid-cols-3">
            {ADMISION.map((a) => (
              <div key={a.n} className="rounded-2xl bg-white/5 p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-bold">{a.n}</div>
                <h3 className="mt-4 text-lg font-bold">{a.t}</h3>
                <p className="mt-2 text-sm text-white/65">{a.d}</p>
              </div>
            ))}
          </div>
          <a href="#" className="mt-10 inline-flex h-12 items-center rounded-full bg-brand px-8 font-semibold text-white transition hover:opacity-90">
            Iniciar admisión
          </a>
        </div>
      </Section>

      <SiteFooter
        cliente={cliente}
        tagline="Formamos personas íntegras con excelencia académica y valores."
        columns={[
          { title: "Colegio", items: ["Nuestra historia", "Propuesta educativa", "Comunidad"] },
          { title: "¿Qué ofrecemos?", items: ["Early Years", "Bachillerato IB", "Idiomas", "Deporte y arte"] },
          { title: "Contacto", items: ["La Molina, Lima", "(01) 614 9500", "admision@" + cliente.toLowerCase().replace(/\s+/g, "") + ".edu.pe"] },
        ]}
      />
    </div>
  );
}
