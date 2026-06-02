import { useState } from "react";
import { SiteNav, Section, SiteFooter } from "../components/site";
import type { Copy } from "../lib/params";

const NAV = [
  { label: "Entrenamiento", href: "#entrenamiento" },
  { label: "Planes", href: "#planes" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "FAQ", href: "#faq" },
];

const BENEFICIOS_HERO = [
  { t: "Entrenamiento guiado", d: "Coaches que te corrigen y arman tu rutina según tu objetivo." },
  { t: "Horarios flexibles", d: "Entrena a tu ritmo. Abierto los 7 días de la semana." },
  { t: "Resultados medibles", d: "Seguimiento de tu progreso clase a clase. No solo sudar por sudar." },
];

const PLANES = [
  { n: "Pase del Día", p: "S/ 25", note: "Prueba sin compromiso", items: ["Acceso a 1 clase", "Equipo incluido", "Ideal para empezar"], destacado: false },
  { n: "Plan Mensual", p: "S/ 149", note: "El más elegido", items: ["Clases ilimitadas", "Plan personalizado", "Seguimiento de progreso"], destacado: true },
  { n: "Plan Trimestral", p: "S/ 379", note: "Ahorra S/ 68", items: ["Clases ilimitadas", "Evaluación física", "Congela cuando quieras"], destacado: false },
];

const BENEFICIOS = [
  "Horarios flexibles, 7 días a la semana",
  "App para reservar y seguir tu rendimiento",
  "Sin contratos a largo plazo",
  "Congelación de membresía cuando lo necesites",
  "Coaches certificados en cada clase",
  "Primera clase de cortesía",
];

const FAQ = [
  { q: "¿Necesito experiencia previa?", a: "No. Adaptamos cada clase a tu nivel: desde principiante hasta avanzado, con progresiones seguras." },
  { q: "¿Qué incluye la membresía?", a: "Acceso a clases, uso del equipamiento y el acompañamiento de nuestros coaches para que avances de verdad." },
  { q: "¿Puedo congelar mi plan si viajo?", a: "Sí. Puedes congelar tu membresía sin perder los días que pagaste." },
  { q: "¿Cómo reservo mi clase?", a: "Por WhatsApp o desde la app. Recomendamos reservar con anticipación para asegurar tu cupo." },
];

export default function GimnasiosTemplate({ cliente, copy }: { cliente: string; copy: Copy }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div id="top" className="bg-slate-950 text-white">
      <SiteNav cliente={cliente} links={NAV} cta="Reservar clase" dark />

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-slate-950" />
        <div className="absolute right-[-15%] top-[-10%] -z-10 h-[600px] w-[600px] rounded-full brand-gradient opacity-25 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
          <span className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80">
            {copy.eyebrow || `Entrena distinto · ${cliente}`}
          </span>
          <h1 className="mt-6 max-w-4xl text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl">
            {copy.head ? (
              copy.head
            ) : (
              <>
                Transforma tu cuerpo con <span className="text-brand">entrenamiento real</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            {copy.sub ||
              "Olvídate de entrenar sin rumbo. Coaches que te guían, rutinas a tu medida y un ambiente que te empuja a dar más. Resultados que se notan."}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#planes" className="inline-flex items-center rounded-full bg-brand px-8 py-3.5 font-bold uppercase tracking-wide text-white transition hover:opacity-90">
              Empieza hoy
            </a>
            <a href="#contacto" className="inline-flex items-center rounded-full border border-white/25 px-8 py-3.5 font-bold uppercase tracking-wide text-white transition hover:bg-white/10">
              Primera clase gratis
            </a>
          </div>
        </div>
      </header>

      {/* Beneficios hero */}
      <Section id="entrenamiento" className="border-y border-white/10">
        <div className="grid gap-8 md:grid-cols-3">
          {BENEFICIOS_HERO.map((b, i) => (
            <div key={b.t}>
              <div className="text-5xl font-extrabold text-brand">0{i + 1}</div>
              <h3 className="mt-3 text-xl font-bold">{b.t}</h3>
              <p className="mt-2 text-white/60">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Planes */}
      <Section id="planes">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand">Membresías</p>
          <h2 className="mt-3 text-4xl font-extrabold uppercase tracking-tight">Elige tu plan</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANES.map((p) => (
            <div
              key={p.n}
              className={`rounded-3xl border p-8 ${
                p.destacado ? "border-brand bg-white/[0.04] shadow-brand" : "border-white/10 bg-white/[0.02]"
              }`}
            >
              {p.destacado && (
                <span className="mb-4 inline-block rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase">
                  Más elegido
                </span>
              )}
              <h3 className="text-xl font-bold">{p.n}</h3>
              <p className="text-sm text-white/50">{p.note}</p>
              <div className="mt-4 text-4xl font-extrabold text-brand">{p.p}</div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-white/75">
                    <span className="text-brand">▸</span> {it}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className={`mt-8 flex h-12 items-center justify-center rounded-full font-bold uppercase tracking-wide transition ${
                p.destacado ? "bg-brand text-white hover:opacity-90" : "border border-white/25 text-white hover:bg-white/10"
              }`}>
                Inscribirme
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* Beneficios membresía */}
      <Section id="beneficios" className="border-y border-white/10 bg-white/[0.02]">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand">Beneficios</p>
            <h2 className="mt-3 text-4xl font-extrabold uppercase tracking-tight">Todo incluido en tu membresía</h2>
            <p className="mt-4 text-white/60">Entrena con la flexibilidad y el soporte de un estudio de primer nivel.</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {BENEFICIOS.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-4">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand text-xs font-bold">✓</span>
                <span className="text-sm text-white/80">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold uppercase tracking-tight">Preguntas frecuentes</h2>
        </div>
        <div className="mx-auto max-w-3xl divide-y divide-white/10">
          {FAQ.map((f, i) => (
            <div key={f.q} className="py-5">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between text-left text-lg font-bold"
              >
                {f.q}
                <span className="text-brand">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <p className="mt-3 text-white/65">{f.a}</p>}
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section id="contacto" className="bg-brand">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold uppercase tracking-tight">Tu primera clase es gratis</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Ven, conoce {cliente} y entrena con nosotros. Escríbenos y cuadramos tu cupo al instante.
          </p>
          <a href="#" className="mt-8 inline-flex items-center rounded-full bg-white px-9 py-3.5 font-bold uppercase tracking-wide text-slate-900 transition hover:bg-white/90">
            Reservar por WhatsApp
          </a>
        </div>
      </Section>

      <SiteFooter
        cliente={cliente}
        tagline="Entrenamiento real, coaches que te guían y resultados que se notan."
        columns={[
          { title: "Entrenamiento", items: ["Funcional", "Pesas y fuerza", "Clases grupales", "Asesoría 1-a-1"] },
          { title: "Estudio", items: ["Planes", "Beneficios", "Horarios"] },
          { title: "Contacto", items: ["Lima, Perú", "WhatsApp de reservas", "Lun-Dom"] },
        ]}
      />
    </div>
  );
}
