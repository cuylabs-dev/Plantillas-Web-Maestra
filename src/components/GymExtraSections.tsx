import { Section, SectionHead } from "./site";

type Props = { cliente: string; dark?: boolean; isFight?: boolean };

const CAMPEONES = [
  { name: "Coach Martín Vega", title: "Campeón nacional boxeo", logros: "12 combates pro · USA Boxing cert." },
  { name: "Coach Ana Ríos", title: "Medallista panamericana", logros: "Muay Thai · Preparación física elite" },
  { name: "Coach Diego Soto", title: "Ex selección MMA", logros: "Jiu-jitsu negro · Striking avanzado" },
];

const EVENTOS_GYM = [
  { fecha: "15 Jun", titulo: "Open Gym Day", tipo: "Comunidad", desc: "Entrena libre + coaches en piso." },
  { fecha: "22 Jun", titulo: "Seminario de fuerza", tipo: "Taller", desc: "Técnica de levantamiento y progresiones." },
  { fecha: "05 Jul", titulo: "Reto 30 días", tipo: "Challenge", desc: "Grupo guiado con seguimiento semanal." },
];

const EVENTOS_PELEA = [
  { fecha: "12 Jul", titulo: "Fight Night Lima", main: "Main Card · 8:00 PM", tag: "Headline" },
  { fecha: "26 Jul", titulo: "Torneo amateur", main: "Categorías por peso", tag: "Inscripciones abiertas" },
  { fecha: "09 Ago", titulo: "Seminario con guest coach", main: "Técnica y sparring controlado", tag: "Cupos limitados" },
];

export function CoachesCampeonesSection({ cliente, dark }: Props) {
  return (
    <Section id="coaches_campeones" className={dark ? "border-y border-white/10 bg-slate-950" : "bg-slate-50"}>
      <SectionHead
        eyebrow={cliente}
        title="Coaches campeones"
        subtitle="Equipo con experiencia en competición, no solo entrenadores de gym."
        center
      />
      <div className="grid gap-8 md:grid-cols-3">
        {CAMPEONES.map((c) => (
          <div
            key={c.name}
            className={`overflow-hidden rounded-2xl ${
              dark ? "border border-white/10 bg-white/5" : "bg-white shadow-lg ring-1 ring-slate-100"
            }`}
          >
            <div className="aspect-[4/3] brand-gradient opacity-90" />
            <div className="p-6">
              <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase text-white">
                Campeón
              </span>
              <h3 className={`mt-3 text-xl font-bold ${dark ? "text-white" : "text-slate-900"}`}>{c.name}</h3>
              <p className="text-sm font-semibold text-brand">{c.title}</p>
              <p className={`mt-2 text-sm ${dark ? "text-white/65" : "text-slate-600"}`}>{c.logros}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function EventosGymSection({ cliente, dark }: Props) {
  return (
    <Section id="eventos">
      <SectionHead eyebrow="Agenda" title="Eventos del gym" subtitle={`Comunidad, retos y talleres en ${cliente}.`} center />
      <div className="grid gap-6 md:grid-cols-3">
        {EVENTOS_GYM.map((e) => (
          <div
            key={e.titulo}
            className={`rounded-2xl border-l-4 border-brand p-6 ${
              dark ? "border-white/10 bg-white/5" : "bg-white shadow-sm ring-1 ring-slate-100"
            }`}
          >
            <p className="text-sm font-bold uppercase tracking-widest text-brand">{e.fecha}</p>
            <span className="mt-2 inline-block rounded-md bg-brand/10 px-2 py-0.5 text-xs font-semibold text-brand">
              {e.tipo}
            </span>
            <h3 className={`mt-3 text-lg font-bold ${dark ? "text-white" : "text-slate-900"}`}>{e.titulo}</h3>
            <p className={`mt-2 text-sm ${dark ? "text-white/60" : "text-slate-600"}`}>{e.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function EventosPeleasSection({ cliente, dark }: Props) {
  return (
    <Section id="eventos_peleas" className={dark ? "bg-black" : "bg-slate-900 text-white"}>
      <div className="mb-10 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand">Fight calendar</p>
        <h2 className="mt-3 text-4xl font-black uppercase italic tracking-tight sm:text-5xl">
          Eventos de pelea
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Cards, torneos amateur y seminarios en {cliente}. Vive la energía del ring.
        </p>
      </div>
      <div className="space-y-4">
        {EVENTOS_PELEA.map((e) => (
          <div
            key={e.titulo}
            className="flex flex-col gap-4 rounded-2xl border border-brand/40 bg-gradient-to-r from-brand/20 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl font-black text-brand">{e.fecha}</span>
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-bold uppercase">
                  {e.tag}
                </span>
              </div>
              <h3 className="mt-2 text-2xl font-extrabold uppercase">{e.titulo}</h3>
              <p className="text-white/70">{e.main}</p>
            </div>
            <a
              href="#contacto"
              className="inline-flex h-12 flex-none items-center justify-center rounded-full bg-brand px-8 font-bold uppercase tracking-wide text-white"
            >
              Reservar cupo
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}
