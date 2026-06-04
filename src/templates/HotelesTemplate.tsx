import { SiteNav, Section, SectionHead, SiteFooter } from "../components/site";
import { SubPagePills } from "../components/SubPagePills";
import StockImage from "../components/StockImage";
import { Motion } from "../components/motion";
import type { Copy } from "../lib/params";
import { buildNavLinks, makeShow, DEFAULT_SECTIONS } from "../catalog/index";
import GenericSection from "../catalog/GenericSection";
import { useBrandKit } from "../context/BrandKitContext";

const ROOMS = [
  { n: "Suite ejecutiva", d: "Vista ciudad, king size y escritorio." },
  { n: "Doble matrimonial", d: "Ideal parejas o viaje de negocios." },
  { n: "Twin estándar", d: "Dos camas, baño privado, WiFi." },
  { n: "Family room", d: "Espacio amplio para familias." },
];

export default function HotelesTemplate({
  cliente,
  copy,
  logoUrl,
  activeSections = DEFAULT_SECTIONS.hoteles,
}: {
  cliente: string;
  copy: Copy;
  logoUrl?: string;
  activeSections?: string[];
}) {
  const show = makeShow(activeSections);
  const nav = buildNavLinks("hoteles", activeSections);
  const kit = useBrandKit();
  const rooms =
    (kit?.sectionsCopy?.habitaciones as { items?: string[] } | undefined)?.items ||
    ROOMS.map((r) => r.n);

  return (
    <div id="top">
      <SiteNav cliente={cliente} logoUrl={logoUrl} links={nav} cta="Reservar" />
      <SubPagePills items={nav} />

      {show("hero") && (
        <header className="relative overflow-hidden bg-brand-soft">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <Motion variant="left">
              <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand shadow-sm">
                {copy.eyebrow || "Hospedaje en Lima"}
              </span>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                {copy.head || cliente}
              </h1>
              <p className="mt-4 text-lg text-slate-600">{copy.sub || "Reserva directa, mejor tarifa."}</p>
            </Motion>
            <Motion variant="right">
              <StockImage
                template="hoteles"
                variant="hero"
                alt={cliente}
                className="h-72 w-full rounded-2xl object-cover shadow-xl lg:h-96"
              />
            </Motion>
          </div>
        </header>
      )}

      {show("habitaciones") && (
        <Section id="habitaciones">
          <SectionHead
            title={(kit?.sectionsCopy?.habitaciones as { title?: string })?.title || "Habitaciones"}
            subtitle={
              (kit?.sectionsCopy?.habitaciones as { subtitle?: string })?.subtitle ||
              `Descansa en ${cliente}`
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {rooms.map((name, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">{name}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {ROOMS[i]?.d || "Confort, limpieza y atención personalizada."}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {["amenidades", "reservas", "ubicacion", "galeria", "testimonios", "faq", "cta", "contacto"].map(
        (id) =>
          show(id) && (
            <GenericSection key={id} id={id} template="hoteles" cliente={cliente} light />
          ),
      )}

      <SiteFooter
        cliente={cliente}
        tagline="Hospedaje cómodo en Lima — reserva directa y mejor tarifa."
        columns={[
          { title: "Habitaciones", items: ["Suite", "Doble", "Twin", "Family"] },
          { title: "Servicios", items: ["WiFi", "Desayuno", "Estacionamiento", "Recepción 24h"] },
          { title: "Contacto", items: ["Lima, Perú", "reservas@" + cliente.toLowerCase().replace(/\s+/g, "") + ".pe"] },
        ]}
      />
    </div>
  );
}
