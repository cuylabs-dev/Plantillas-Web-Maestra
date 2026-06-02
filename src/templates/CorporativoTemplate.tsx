import { SiteNav, Section, SectionHead, SiteFooter } from "../components/site";
import type { Copy } from "../lib/params";

const NAV = [
  { label: "Soluciones", href: "#soluciones" },
  { label: "Casos de éxito", href: "#casos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

const SOLUCIONES = [
  { t: "Consultoría estratégica", d: "Diseñamos la hoja de ruta para que tu operación escale con tecnología." },
  { t: "Transformación digital", d: "Modernizamos procesos y sistemas para una empresa más ágil." },
  { t: "Automatización", d: "Eliminamos tareas repetitivas y liberamos a tu equipo." },
  { t: "Datos e inteligencia", d: "Decisiones basadas en datos confiables y en tiempo real." },
  { t: "Integración de sistemas", d: "Conectamos tus plataformas en un ecosistema único." },
  { t: "Soporte y resiliencia", d: "Operación continua, segura y preparada para crecer." },
];

const CASOS = [
  { m: "5M", d: "de activos unificados bajo un solo inventario para trazabilidad total." },
  { m: "+40%", d: "de eficiencia operativa tras automatizar procesos clave." },
  { m: "2x", d: "de usuarios activos luego de rediseñar la plataforma." },
];

export default function CorporativoTemplate({ cliente, copy }: { cliente: string; copy: Copy }) {
  return (
    <div id="top">
      <SiteNav cliente={cliente} links={NAV} cta="Hablar con ventas" />

      {/* Hero editorial */}
      <header className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-0 top-0 h-full w-1/2 bg-slate-50" />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand">
              {copy.eyebrow || `${cliente} · Tecnología empresarial`}
            </p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[0.98] tracking-tight text-slate-900 sm:text-6xl">
              {copy.head || "Construya una empresa moderna"}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-slate-600">
              {copy.sub ||
                "Desde la estrategia hasta la ejecución, ayudamos a tu organización a operar mejor, vender más y escalar con soluciones rápidas, seguras y preparadas para el futuro."}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contacto" className="inline-flex h-12 items-center rounded-md bg-slate-900 px-7 font-semibold text-white transition hover:bg-slate-800">
                Solicitar propuesta
              </a>
              <a href="#soluciones" className="inline-flex h-12 items-center rounded-md border border-slate-300 px-7 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
                Ver soluciones →
              </a>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl brand-gradient shadow-2xl">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
        </div>
      </header>

      {/* Logos band */}
      <div className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Empresas que confían en nosotros
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60">
            {["NORTE", "Vértice", "ANDINA", "Quantia", "Meridian", "CUMBRE"].map((l) => (
              <span key={l} className="text-lg font-extrabold tracking-tight text-slate-500">{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Soluciones */}
      <Section id="soluciones">
        <SectionHead
          eyebrow="Lo que hacemos"
          title="Soluciones que impulsan resultados reales"
          subtitle="Experiencia multisectorial para reinventar el funcionamiento de tu negocio."
        />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-3">
          {SOLUCIONES.map((s) => (
            <div key={s.t} className="group bg-white p-8 transition hover:bg-slate-50">
              <div className="mb-4 h-1 w-10 bg-brand transition-all group-hover:w-16" />
              <h3 className="text-lg font-bold text-slate-900">{s.t}</h3>
              <p className="mt-2 text-sm text-slate-500">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Casos de éxito */}
      <Section id="casos" className="bg-slate-900 text-white">
        <SectionHead eyebrow="Casos de éxito" title="Negocios más inteligentes. Impacto real" dark />
        <div className="grid gap-8 md:grid-cols-3">
          {CASOS.map((c) => (
            <div key={c.m} className="border-t-2 border-brand pt-6">
              <div className="text-5xl font-extrabold text-white">{c.m}</div>
              <p className="mt-3 text-white/65">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Nosotros / valor */}
      <Section id="nosotros">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="Nuestra compañía"
              title="Tecnología al servicio del mundo real"
            />
            <p className="text-slate-600">
              Combinamos consultoría, ingeniería y diseño para construir herramientas simples,
              funcionales y preparadas para evolucionar junto a cada negocio. Nuestro objetivo no es
              solo entregar software: es crear un plan de productividad a escala empresarial.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["100%", "enfoque a resultados"],
              ["<1s", "tiempos de respuesta"],
              ["24/7", "soporte y monitoreo"],
              ["+10", "industrias atendidas"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-slate-50 p-6">
                <div className="text-3xl font-extrabold text-brand">{v}</div>
                <div className="mt-1 text-sm text-slate-500">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA / newsletter */}
      <Section id="contacto" className="bg-slate-50">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-white p-10 ring-1 ring-slate-200 md:flex-row">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Lidere la próxima era de su industria</h2>
            <p className="mt-2 text-slate-500">Conversemos sobre cómo {cliente} puede ayudar a su empresa.</p>
          </div>
          <a href="#" className="inline-flex h-12 flex-none items-center rounded-md bg-brand px-8 font-semibold text-white transition hover:opacity-90">
            Agendar reunión
          </a>
        </div>
      </Section>

      <SiteFooter
        cliente={cliente}
        tagline="Software útil, rápido y escalable para empresas que quieren crecer."
        columns={[
          { title: "Soluciones", items: ["Consultoría", "Transformación digital", "Automatización", "Datos"] },
          { title: "Compañía", items: ["Nosotros", "Casos de éxito", "Trabaja con nosotros"] },
          { title: "Contacto", items: ["Lima, Perú", "ventas@" + cliente.toLowerCase().replace(/\s+/g, "") + ".com"] },
        ]}
      />
    </div>
  );
}
