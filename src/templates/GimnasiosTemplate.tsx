import { useState } from "react";
import { SiteNav, Section, SiteFooter } from "../components/site";
import type { Copy, GymVariant } from "../lib/params";
import { buildNavLinks, makeShow, DEFAULT_SECTIONS } from "../catalog/index";
import GenericSection from "../catalog/GenericSection";
import {
  CoachesCampeonesSection,
  EventosGymSection,
  EventosPeleasSection,
} from "../components/GymExtraSections";

function normalizeVariant(v?: GymVariant): ActiveVariant {
  if (v === "studio") return "crossfit";
  if (v === "fight" || v === "crossfit" || v === "wellness" || v === "premium" || v === "fit") return v;
  return "fit";
}

type ActiveVariant = "fight" | "crossfit" | "wellness" | "premium" | "fit";

const CONTENT: Record<
  ActiveVariant,
  {
    cta1: string;
    cta2: string;
    navCta: string;
    benefits: { t: string; d: string }[];
    plans: { n: string; p: string; note: string; items: string[]; destacado: boolean }[];
    tagline: string;
    footerCols: { title: string; items: string[] }[];
  }
> = {
  fight: {
    cta1: "Reservar 1-a-1",
    cta2: "Ver horarios",
    navCta: "Entrar al gym",
    benefits: [
      { t: "Técnica real", d: "Corrección en vivo. No solo cardio vacío." },
      { t: "Coaches de competición", d: "Experiencia en ring y preparación física." },
      { t: "Progreso medible", d: "Plan por nivel: principiante a avanzado." },
    ],
    plans: [
      { n: "Sesión prueba", p: "S/ 79", note: "Diagnóstico técnico", items: ["1 clase guiada", "Evaluación de nivel", "Sin contrato"], destacado: false },
      { n: "Pack 8 clases", p: "S/ 640", note: "Más vendido", items: ["2x por semana", "Plan personalizado", "Seguimiento"], destacado: true },
      { n: "Ilimitado", p: "S/ 490/mes", note: "Competidores", items: ["Clases ilimitadas", "Open gym", "Asesoría nutricional básica"], destacado: false },
    ],
    tagline: "Potencia, técnica y disciplina en cada round.",
    footerCols: [
      { title: "Disciplinas", items: ["Boxeo", "Muay Thai", "MMA", "Fuerza"] },
      { title: "Club", items: ["Planes", "Horarios", "Coaches"] },
      { title: "Contacto", items: ["Lima, Perú", "Reservas WhatsApp", "Lun-Sáb"] },
    ],
  },
  crossfit: {
    cta1: "Reservar WOD",
    cta2: "Clase de prueba",
    navCta: "Unirme al box",
    benefits: [
      { t: "WODs diarios", d: "Rutinas variadas que nunca aburren." },
      { t: "Comunidad", d: "Entrenas acompañado, no solo en una máquina." },
      { t: "Escalable", d: "Cada movimiento adaptado a tu nivel." },
    ],
    plans: [
      { n: "Drop-in", p: "S/ 35", note: "1 WOD", items: ["Acceso 1 clase", "Coach en piso", "Ideal probar"], destacado: false },
      { n: "Mensual", p: "S/ 399", note: "Ilimitado", items: ["WODs ilimitados", "Open gym", "App de reservas"], destacado: true },
      { n: "Pareja", p: "S/ 649", note: "2 personas", items: ["Plan compartido", "Descuento familiar", "Misma sede"], destacado: false },
    ],
    tagline: "Fuerza, resistencia y comunidad en cada WOD.",
    footerCols: [
      { title: "Box", items: ["WOD", "Strength", "Gymnastics", "Cardio"] },
      { title: "Horarios", items: ["Mañana", "Tarde", "Noche"] },
      { title: "Contacto", items: ["Lima", "WhatsApp", "Lun-Dom"] },
    ],
  },
  wellness: {
    cta1: "Agendar clase",
    cta2: "Ver horarios",
    navCta: "Reservar",
    benefits: [
      { t: "Ambiente calmado", d: "Espacios amplios y luz natural." },
      { t: "Profes certificados", d: "Yoga, pilates y movilidad con criterio." },
      { t: "Tu ritmo", d: "Planes flexibles sin presión de rendimiento." },
    ],
    plans: [
      { n: "Clase suelta", p: "S/ 45", note: "Prueba", items: ["1 sesión", "Mat incluido", "Sin compromiso"], destacado: false },
      { n: "8 clases", p: "S/ 280", note: "Popular", items: ["Válido 30 días", "Variedad de clases", "App reservas"], destacado: true },
      { n: "Mensual", p: "S/ 320", note: "Ilimitado suave", items: ["Clases ilimitadas", "Talleres mensuales", "Congela viaje"], destacado: false },
    ],
    tagline: "Mueve tu cuerpo con intención y calma.",
    footerCols: [
      { title: "Clases", items: ["Yoga", "Pilates", "Movilidad", "Stretch"] },
      { title: "Bienestar", items: ["Planes", "Talleres", "Horarios"] },
      { title: "Contacto", items: ["Lima", "WhatsApp", "Lun-Dom"] },
    ],
  },
  premium: {
    cta1: "Tour del club",
    cta2: "Membresía",
    navCta: "Ser miembro",
    benefits: [
      { t: "Equipamiento pro", d: "Máquinas y zona funcional de primer nivel." },
      { t: "Servicio concierge", d: "Te asignamos coach y plan desde el día 1." },
      { t: "Espacios exclusivos", d: "Vestuarios, lounge y estacionamiento." },
    ],
    plans: [
      { n: "Day pass", p: "S/ 55", note: "Visita", items: ["Acceso día completo", "Tour guiado", "Toalla incluida"], destacado: false },
      { n: "Gold", p: "S/ 299", note: "Recomendado", items: ["Ilimitado", "2 sesiones PT/mes", "Nutrición básica"], destacado: true },
      { n: "Platinum", p: "S/ 449", note: "VIP", items: ["Todo Gold", "PT semanal", "Prioridad reservas"], destacado: false },
    ],
    tagline: "Un club pensado para quienes exigen más.",
    footerCols: [
      { title: "Club", items: ["Fitness", "PT", "Recuperación", "Spa"] },
      { title: "Servicios", items: ["Membresías", "Corporate", "Eventos"] },
      { title: "Contacto", items: ["Lima", "Concierge", "Lun-Dom"] },
    ],
  },
  fit: {
    cta1: "Empieza hoy",
    cta2: "Primera clase gratis",
    navCta: "Reservar clase",
    benefits: [
      { t: "Entrenamiento guiado", d: "Coaches que arman tu rutina según tu meta." },
      { t: "Horarios flexibles", d: "Abierto los 7 días." },
      { t: "Resultados medibles", d: "Seguimiento clase a clase." },
    ],
    plans: [
      { n: "Pase del día", p: "S/ 25", note: "Prueba", items: ["1 clase", "Equipo incluido", "Sin contrato"], destacado: false },
      { n: "Mensual", p: "S/ 149", note: "Más elegido", items: ["Ilimitado", "Plan personalizado", "App"], destacado: true },
      { n: "Trimestral", p: "S/ 379", note: "Ahorra", items: ["Ilimitado", "Evaluación física", "Congela"], destacado: false },
    ],
    tagline: "Entrenamiento real con coaches que te guían.",
    footerCols: [
      { title: "Entrenamiento", items: ["Funcional", "Pesas", "Grupales", "1-a-1"] },
      { title: "Estudio", items: ["Planes", "Beneficios", "Horarios"] },
      { title: "Contacto", items: ["Lima", "WhatsApp", "Lun-Dom"] },
    ],
  },
};

const FAQ = [
  { q: "¿Necesito experiencia?", a: "No. Adaptamos cada clase a tu nivel con progresiones seguras." },
  { q: "¿Qué incluye la membresía?", a: "Acceso, coaches en piso y seguimiento según tu plan." },
  { q: "¿Puedo congelar?", a: "Sí, según tu membresía puedes pausar sin perder días pagados." },
  { q: "¿Cómo reservo?", a: "Por WhatsApp o app. Reserva con anticipación para asegurar cupo." },
];

export default function GimnasiosTemplate({
  cliente,
  copy,
  logoUrl,
  gymVariant,
  activeSections = DEFAULT_SECTIONS.gimnasios,
}: {
  cliente: string;
  copy: Copy;
  logoUrl?: string;
  gymVariant?: GymVariant;
  activeSections?: string[];
}) {
  const v = normalizeVariant(gymVariant);
  const C = CONTENT[v];
  const show = makeShow(activeSections);
  const nav = buildNavLinks("gimnasios", activeSections);
  const dark = v !== "wellness";
  const [open, setOpen] = useState(0);
  const isLight = v === "wellness";
  const isFight = v === "fight";
  const isCross = v === "crossfit";
  const isPremium = v === "premium";
  const showPeleas = show("eventos_peleas") || (isFight && show("eventos"));

  const rootClass = isLight
    ? "bg-slate-50 text-slate-900"
    : isPremium
      ? "bg-slate-900 text-white"
      : "bg-slate-950 text-white";

  const heroClass = isFight
    ? "border-b-4 border-brand"
    : isCross
      ? "bg-gradient-to-br from-slate-950 via-slate-900 to-brand/30"
      : isPremium
        ? "brand-gradient-soft"
        : isLight
          ? "bg-white border-b border-slate-200"
          : "";

  const titleClass = isFight
    ? "text-6xl font-black uppercase italic leading-[0.9] tracking-tighter sm:text-8xl"
    : isCross
      ? "text-5xl font-extrabold leading-tight sm:text-7xl"
      : isPremium
        ? "text-5xl font-light tracking-tight sm:text-6xl"
        : isLight
          ? "text-5xl font-bold text-slate-900 sm:text-6xl"
          : "text-5xl font-extrabold uppercase leading-[0.95] sm:text-7xl";

  return (
    <div id="top" className={rootClass}>
      <SiteNav
        cliente={cliente}
        logoUrl={logoUrl}
        links={nav}
        cta={C.navCta}
        dark={!isLight}
      />

      {show("hero") && (
      <header className={`relative overflow-hidden ${heroClass}`}>
        {!isLight && (
          <div className="absolute right-[-10%] top-[-20%] -z-10 h-[500px] w-[500px] rounded-full brand-gradient opacity-20 blur-3xl" />
        )}
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          {isCross && (
            <div className="mb-8 grid grid-cols-3 gap-4 max-w-lg text-center text-sm">
              {["45 min", "HIIT", "Comunidad"].map((s) => (
                <div key={s} className="rounded-xl border border-white/15 bg-white/5 py-3 font-bold">
                  {s}
                </div>
              ))}
            </div>
          )}
          <span
            className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${
              isLight
                ? "bg-brand/10 text-brand"
                : "border border-white/20 text-white/80"
            }`}
          >
            {copy.eyebrow || `${cliente}`}
          </span>
          <h1 className={`mt-6 max-w-4xl ${titleClass}`}>
            {copy.head || (
              <>
                Tu mejor versión en <span className="text-brand">{cliente}</span>
              </>
            )}
          </h1>
          <p
            className={`mt-6 max-w-xl text-lg ${
              isLight ? "text-slate-600" : "text-white/70"
            }`}
          >
            {copy.sub ||
              "Entrena con plan, coaches y un ambiente que te empuja a dar más."}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#planes"
              className={`inline-flex items-center rounded-full bg-brand px-8 py-3.5 font-bold text-white transition hover:opacity-90 ${
                isFight ? "uppercase tracking-widest" : ""
              }`}
            >
              {C.cta1}
            </a>
            <a
              href="#contacto"
              className={`inline-flex items-center rounded-full px-8 py-3.5 font-bold transition ${
                isLight
                  ? "border-2 border-slate-300 text-slate-800 hover:bg-slate-100"
                  : "border border-white/25 text-white hover:bg-white/10"
              } ${isFight ? "uppercase tracking-wide" : ""}`}
            >
              {C.cta2}
            </a>
          </div>
        </div>
      </header>
      )}

      {show("stats") && <GenericSection id="stats" template="gimnasios" cliente={cliente} dark={dark} />}

      {show("entrenamiento") && (
      <Section id="entrenamiento" className={isLight ? "border-y border-slate-200" : "border-y border-white/10"}>
        <div className="grid gap-8 md:grid-cols-3">
          {C.benefits.map((b, i) => (
            <div key={b.t}>
              <div className={`text-5xl font-extrabold ${isLight ? "text-brand" : "text-brand"}`}>
                0{i + 1}
              </div>
              <h3 className={`mt-3 text-xl font-bold ${isLight ? "text-slate-900" : ""}`}>{b.t}</h3>
              <p className={`mt-2 ${isLight ? "text-slate-600" : "text-white/60"}`}>{b.d}</p>
            </div>
          ))}
        </div>
      </Section>
      )}

      {show("beneficios") && (
        <GenericSection id="beneficios" template="gimnasios" cliente={cliente} dark={dark} />
      )}

      {show("coaches_campeones") && (
        <CoachesCampeonesSection cliente={cliente} dark={dark} />
      )}

      {show("planes") && (
      <Section id="planes">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand">Membresías</p>
          <h2
            className={`mt-3 text-4xl font-extrabold tracking-tight ${
              isFight ? "uppercase" : ""
            } ${isLight ? "text-slate-900" : ""}`}
          >
            Elige tu plan
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {C.plans.map((p) => (
            <div
              key={p.n}
              className={`rounded-3xl border p-8 ${
                p.destacado
                  ? "border-brand bg-brand/5 shadow-brand"
                  : isLight
                    ? "border-slate-200 bg-white"
                    : "border-white/10 bg-white/[0.02]"
              }`}
            >
              {p.destacado && (
                <span className="mb-4 inline-block rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase text-white">
                  Top
                </span>
              )}
              <h3 className={`text-xl font-bold ${isLight ? "text-slate-900" : ""}`}>{p.n}</h3>
              <p className={isLight ? "text-slate-500" : "text-white/50"}>{p.note}</p>
              <div className="mt-4 text-4xl font-extrabold text-brand">{p.p}</div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.items.map((it) => (
                  <li
                    key={it}
                    className={`flex gap-2 ${isLight ? "text-slate-700" : "text-white/75"}`}
                  >
                    <span className="text-brand">▸</span> {it}
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className={`mt-8 flex h-12 items-center justify-center rounded-full font-bold transition ${
                  p.destacado
                    ? "bg-brand text-white hover:opacity-90"
                    : isLight
                      ? "border-2 border-slate-300 text-slate-800"
                      : "border border-white/25 text-white hover:bg-white/10"
                }`}
              >
                Inscribirme
              </a>
            </div>
          ))}
        </div>
      </Section>
      )}

      {show("eventos") && <EventosGymSection cliente={cliente} dark={dark} />}

      {showPeleas && <EventosPeleasSection cliente={cliente} dark={dark} />}

      {["coaches", "horarios", "galeria", "testimonios"].map(
        (sid) =>
          show(sid) && (
            <GenericSection
              key={sid}
              id={sid}
              template="gimnasios"
              cliente={cliente}
              dark={dark}
            />
          ),
      )}

      {show("faq") && (
      <Section id="faq">
        <h2 className={`mb-10 text-center text-3xl font-extrabold ${isLight ? "text-slate-900" : ""}`}>
          Preguntas frecuentes
        </h2>
        <div
          className={`mx-auto max-w-3xl divide-y ${
            isLight ? "divide-slate-200" : "divide-white/10"
          }`}
        >
          {FAQ.map((f, i) => (
            <div key={f.q} className="py-5">
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
                className={`flex w-full items-center justify-between text-left text-lg font-bold ${
                  isLight ? "text-slate-900" : ""
                }`}
              >
                {f.q}
                <span className="text-brand">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <p className={`mt-3 ${isLight ? "text-slate-600" : "text-white/65"}`}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </Section>
      )}

      {show("cta") && <GenericSection id="cta" template="gimnasios" cliente={cliente} dark={dark} />}

      {show("contacto") && (
      <Section id="contacto" className="bg-brand">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold uppercase tracking-tight text-white">
            {C.cta2}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Escríbenos desde {cliente} y asegura tu cupo hoy.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex rounded-full bg-white px-9 py-3.5 font-bold text-slate-900"
          >
            WhatsApp
          </a>
        </div>
      </Section>
      )}

      <SiteFooter cliente={cliente} tagline={C.tagline} columns={C.footerCols} dark={!isLight} />
    </div>
  );
}
