import { SiteNav, Section, SectionHead, SiteFooter } from "../components/site";
import { SubPagePills } from "../components/SubPagePills";
import StockImage from "../components/StockImage";
import BrandGallery from "../components/BrandGallery";
import { Motion } from "../components/motion";
import type { Copy } from "../lib/params";
import { buildNavLinks, makeShow, DEFAULT_SECTIONS } from "../catalog/index";
import GenericSection from "../catalog/GenericSection";
import { useBrandKit } from "../context/BrandKitContext";
import { formatHeroHeadline, formatHeroSubhead, shortenBrandName } from "../lib/displayText";

const TRATAMIENTOS = [
  { n: "Limpieza facial profunda", d: "Renovación, extracción y hidratación." },
  { n: "Radiofrecuencia", d: "Firmeza y contorno sin cirugía." },
  { n: "Depilación láser", d: "Zonas pequeñas y medianas." },
  { n: "Peeling químico", d: "Manchas y textura uniforme." },
];

export default function EsteticaTemplate({
  cliente,
  copy,
  logoUrl,
  activeSections = DEFAULT_SECTIONS.estetica,
}: {
  cliente: string;
  copy: Copy;
  logoUrl?: string;
  activeSections?: string[];
}) {
  const show = makeShow(activeSections);
  const nav = buildNavLinks("estetica", activeSections);
  const kit = useBrandKit();
  const brand = shortenBrandName(cliente, 40);
  const head = formatHeroHeadline(copy.head, cliente, 52);
  const sub =
    formatHeroSubhead(copy.sub, 150) ||
    `Tratamientos faciales y corporales en ${brand} — resultados visibles con tecnología y equipo especializado.`;
  const block = kit?.sectionsCopy?.tratamientos as { title?: string; items?: string[] } | undefined;
  const items = block?.items || TRATAMIENTOS.map((t) => t.n);

  return (
    <div id="top" className="bg-rose-50/30">
      <SiteNav cliente={cliente} logoUrl={logoUrl} links={nav} cta="Reservar" />
      <SubPagePills items={nav} />

      {show("hero") && (
        <header className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-violet-50">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <Motion variant="left">
              <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand shadow-sm">
                {copy.eyebrow || "Estética · Lima"}
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">{head}</h1>
              <p className="mt-5 max-w-lg text-lg text-slate-600">{sub}</p>
              <a
                href="#contacto"
                className="mt-8 inline-flex h-12 items-center rounded-full bg-brand px-8 font-semibold text-white shadow-lg"
              >
                Agenda tu evaluación
              </a>
            </Motion>
            <Motion variant="right">
              <StockImage template="estetica" variant="hero" className="aspect-[4/3] w-full rounded-2xl shadow-2xl" overlay />
            </Motion>
          </div>
        </header>
      )}

      {show("tratamientos") && (
        <Section id="tratamientos">
          <SectionHead
            title={block?.title || "Tratamientos"}
            subtitle={`Protocolos personalizados en ${brand}`}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {items.slice(0, 6).map((name, i) => (
              <div key={i} className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">{name}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {TRATAMIENTOS[i]?.d || "Consulta disponibilidad y promociones del mes."}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {["antes_despues", "servicios", "precios", "reservas", "confianza", "faq", "cta"].map(
        (id) => show(id) && <GenericSection key={id} id={id} template="estetica" cliente={cliente} light />,
      )}

      {show("galeria") && <BrandGallery template="estetica" />}

      <SiteFooter
        cliente={cliente}
        tagline={`${brand} — estética facial y corporal en Lima.`}
        columns={[
          { title: "Tratamientos", items: items.slice(0, 4) },
          { title: "Horario", items: ["Lun-Sáb", "Citas previas", "WhatsApp"] },
          { title: "Ubicación", items: ["Lima, Perú", "Surco / Miraflores"] },
        ]}
        dark={false}
      />
    </div>
  );
}
