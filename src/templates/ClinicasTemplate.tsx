import { SiteNav, Section, SectionHead, SiteFooter } from "../components/site";
import { SubPagePills } from "../components/SubPagePills";
import StockImage from "../components/StockImage";
import { Motion } from "../components/motion";
import type { Copy } from "../lib/params";
import { buildNavLinks, makeShow, DEFAULT_SECTIONS } from "../catalog/index";
import GenericSection from "../catalog/GenericSection";

const ESPECIALIDADES = [
  { n: "Dermatología", d: "Cuidado integral de la piel con tecnología de vanguardia." },
  { n: "Endocrinología", d: "Diagnóstico y tratamiento hormonal personalizado." },
  { n: "Medicina Interna", d: "Atención clínica integral para el adulto." },
  { n: "Nutrición", d: "Planes alimentarios que se adaptan a tu vida." },
  { n: "Traumatología", d: "Recuperación de lesiones y dolor articular." },
  { n: "Medicina Física", d: "Rehabilitación para que vuelvas a moverte." },
];

const STATS = [
  { v: "+14", l: "años de experiencia" },
  { v: "+25k", l: "pacientes atendidos" },
  { v: "98%", l: "de satisfacción" },
  { v: "+12", l: "especialidades" },
];

const STAFF = ["Dra. Karim Flores", "Dr. Edson Serrano", "Dra. Lucía Paredes", "Dr. Manuel Rivas"];

export default function ClinicasTemplate({
  cliente,
  copy,
  logoUrl,
  activeSections = DEFAULT_SECTIONS.clinicas,
}: {
  cliente: string;
  copy: Copy;
  logoUrl?: string;
  activeSections?: string[];
}) {
  const show = makeShow(activeSections);
  const nav = buildNavLinks("clinicas", activeSections);
  const genericIds = ["precios", "reservas", "antes_despues", "seguros", "ubicacion", "faq", "cta"];

  return (
    <div id="top">
      <SiteNav cliente={cliente} logoUrl={logoUrl} links={nav} cta="Reservar cita" />
      <SubPagePills items={nav} />

      {show("hero") && (
      <header className="relative overflow-hidden bg-brand-soft">
        <div className="absolute right-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full brand-gradient opacity-20 blur-3xl float-soft" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <Motion variant="left">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand shadow-sm">
              ● {copy.eyebrow || "Atención presencial y online"}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl">
              {copy.head ? copy.head : <>Bienvenidos a <span className="text-brand">{cliente}</span></>}
            </h1>
            <p className="mt-5 max-w-lg text-lg text-slate-600">
              {copy.sub ||
                "Servicios integrales de salud y de vanguardia para lograr tu plena recuperación en el menor tiempo posible, con un equipo multidisciplinario que te acompaña."}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contacto" className="inline-flex h-12 items-center rounded-full bg-brand px-7 font-semibold text-white shadow-lg transition hover:opacity-90">
                Reserva una cita
              </a>
              <a href="#especialidades" className="inline-flex h-12 items-center rounded-full border border-slate-300 bg-white px-7 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
                Ver especialidades
              </a>
            </div>
          </Motion>
          <Motion variant="right" className="relative">
            <StockImage template="clinicas" variant="hero" className="aspect-[4/3] w-full shadow-2xl" overlay />
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-xl pulse-brand">
              <div className="text-3xl font-extrabold text-brand">24/7</div>
              <div className="text-sm text-slate-500">Reserva en línea</div>
            </div>
          </Motion>
        </div>
      </header>
      )}

      {show("confianza") && (
      <div id="confianza" className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-4xl font-extrabold text-brand">{s.v}</div>
              <div className="mt-1 text-sm text-slate-500">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      )}

      {show("servicios") && (
      <>
      <Section id="servicios" className="bg-slate-50">
        <SectionHead eyebrow="Lo que hacemos" title="Nuestras especialidades" center />
        <div className="grid gap-6 md:grid-cols-3">
          {ESPECIALIDADES.map((e) => (
            <div key={e.n} className="group rounded-2xl border border-slate-100 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <span className="text-xl font-bold">+</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{e.n}</h3>
              <p className="mt-2 text-sm text-slate-500">{e.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section id="especialidades">
        <div className="rounded-3xl brand-gradient px-8 py-14 text-white sm:px-14">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-white/80">Tu bienestar es prioridad</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Salud integral en un solo lugar</h2>
            <p className="mt-4 text-white/85">
              Años de trayectoria ofreciendo soluciones de salud precisas y oportunas.
            </p>
          </div>
        </div>
      </Section>
      </>
      )}

      {show("equipo") && (
      <Section id="equipo" className="bg-slate-50">
        <SectionHead eyebrow="Staff profesional" title="Un equipo de expertos listo para atenderte" center />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAFF.map((nombre) => (
            <div key={nombre} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <div className="aspect-square bg-brand-soft" />
              <div className="p-5">
                <h3 className="font-bold text-slate-900">{nombre}</h3>
                <p className="text-sm text-brand">Especialista</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      )}

      {genericIds.map(
        (sid) => show(sid) && <GenericSection key={sid} id={sid} template="clinicas" cliente={cliente} />,
      )}

      {show("contacto") && (
      <Section id="contacto">
        <div className="rounded-3xl bg-slate-900 px-8 py-16 text-center text-white sm:px-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Da el primer paso hacia tu bienestar</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Nuestro equipo está listo para atenderte con la tecnología y la confianza de {cliente}.
          </p>
          <a href="#" className="mt-8 inline-flex h-12 items-center rounded-full bg-brand px-8 font-semibold text-white transition hover:opacity-90">
            Quiero reservar
          </a>
        </div>
      </Section>
      )}

      <SiteFooter
        cliente={cliente}
        tagline="Servicios integrales de salud y de vanguardia para tu plena recuperación."
        columns={[
          { title: "Especialidades", items: ["Dermatología", "Endocrinología", "Nutrición", "Traumatología"] },
          { title: "Centro médico", items: ["Nosotros", "Staff profesional", "Servicios"] },
          { title: "Contacto", items: ["Lima, Perú", "+51 989 046 102", "citas@" + cliente.toLowerCase().replace(/\s+/g, "") + ".pe"] },
        ]}
      />
    </div>
  );
}
