import { useEffect, useState } from "react";
import { Section, SectionHead } from "./site";

const GYM_STATS = [
  { v: "+500", l: "miembros activos", accent: "from-orange-500 to-amber-400" },
  { v: "12", l: "coaches certificados", accent: "from-slate-800 to-slate-600" },
  { v: "7", l: "días a la semana", accent: "from-emerald-500 to-teal-400" },
  { v: "4.9", l: "valoración Google", accent: "from-violet-500 to-purple-400" },
];

const GYM_TESTIMONIALS = [
  {
    quote: "En 3 meses bajé grasa y gané fuerza. Los coaches corrigen técnica en cada clase.",
    author: "Ana R.",
    role: "Miembro · 8 meses",
  },
  {
    quote: "El ambiente me empuja a venir incluso cuando estoy cansado. Mejor inversión del año.",
    author: "Luis M.",
    role: "Plan mensual",
  },
  {
    quote: "Probé otros gyms y acá sí hay seguimiento. No entrenas solo frente a una máquina.",
    author: "Carla V.",
    role: "Cross / funcional",
  },
  {
    quote: "Mi hija empezó adolescente y el equipo la trató con paciencia y seguridad.",
    author: "Patricia S.",
    role: "Mamá de miembro",
  },
  {
    quote: "Horarios flexibles y vestuarios limpios. Se nota que cuidan la experiencia.",
    author: "Diego F.",
    role: "Open gym",
  },
  {
    quote: "La primera clase me convenció. Plan claro desde el día uno sin letra chica.",
    author: "Marco T.",
    role: "Nuevo ingreso",
  },
];

export function GymStatsSection({ cliente }: { cliente: string }) {
  return (
    <Section id="stats" className="bg-white text-slate-900">
      <SectionHead
        eyebrow="Impacto real"
        title="Resultados que hablan"
        subtitle={`Métricas y confianza de quienes entrenan en ${cliente}.`}
        center
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {GYM_STATS.map((s, i) => (
          <div
            key={s.l}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${s.accent}`}
              aria-hidden
            />
            <p className="mt-2 text-4xl font-black tracking-tight text-slate-900">{s.v}</p>
            <p className="mt-2 text-sm font-medium text-slate-600">{s.l}</p>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${s.accent} transition-all duration-700 group-hover:w-full`}
                style={{ width: `${55 + i * 8}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function GymTestimonialsCarousel({ cliente }: { cliente: string }) {
  const [idx, setIdx] = useState(0);
  const n = GYM_TESTIMONIALS.length;

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 5500);
    return () => clearInterval(t);
  }, [n]);

  const visible = [
    GYM_TESTIMONIALS[idx],
    GYM_TESTIMONIALS[(idx + 1) % n],
    GYM_TESTIMONIALS[(idx + 2) % n],
  ];

  return (
    <Section id="testimonios" className="bg-slate-50 text-slate-900">
      <SectionHead
        eyebrow="Comunidad"
        title="Lo que dicen nuestros miembros"
        subtitle={`Opiniones de quienes ya entrenan en ${cliente}.`}
        center
      />
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
          {visible.map((t) => (
            <article
              key={`${t.author}-${t.quote.slice(0, 12)}`}
              className="min-w-[85%] shrink-0 snap-center rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-xl md:min-w-0"
            >
              <p className="text-4xl font-serif leading-none text-brand opacity-40">"</p>
              <p className="mt-2 text-base leading-relaxed text-slate-700">{t.quote}</p>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full brand-gradient text-sm font-bold text-white">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{t.author}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {GYM_TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Opinión ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === idx ? "w-8 bg-brand" : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
