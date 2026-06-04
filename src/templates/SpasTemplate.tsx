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

const RITUALES = [
  { n: "Masaje relajante 60 min", d: "Presión media, aceites esenciales." },
  { n: "Facial hidratante", d: "Piel luminosa post-sesión." },
  { n: "Circuito aromaterapia", d: "Vapor, exfoliación suave y mascarilla." },
  { n: "Piedras calientes", d: "Relaja musculatura profunda." },
];

export default function SpasTemplate({
  cliente,
  copy,
  logoUrl,
  activeSections = DEFAULT_SECTIONS.spas,
}: {
  cliente: string;
  copy: Copy;
  logoUrl?: string;
  activeSections?: string[];
}) {
  const show = makeShow(activeSections);
  const nav = buildNavLinks("spas", activeSections);
  const kit = useBrandKit();
  const brand = shortenBrandName(cliente, 40);
  const head = formatHeroHeadline(copy.head, cliente, 52);
  const sub =
    formatHeroSubhead(copy.sub, 150) ||
    `Rituales de bienestar en ${brand}: masajes, faciales y un espacio pensado para desconectar.`;
  const block = kit?.sectionsCopy?.rituales as { title?: string; items?: string[] } | undefined;
  const items = block?.items || RITUALES.map((r) => r.n);

  return (
    <div id="top" className="bg-teal-950 text-white">
      <SiteNav cliente={cliente} logoUrl={logoUrl} links={nav} cta="Reservar" dark />
      <SubPagePills items={nav} />

      {show("hero") && (
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-900 to-teal-950" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <Motion variant="left">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">
                {copy.eyebrow || "Spa · Bienestar"}
              </p>
              <h1 className="mt-6 font-serif text-4xl font-medium leading-tight sm:text-5xl">{head}</h1>
              <p className="mt-6 max-w-lg text-lg text-teal-100/90">{sub}</p>
              <a
                href="#contacto"
                className="mt-10 inline-flex h-12 items-center rounded-full bg-teal-400 px-8 font-semibold text-teal-950"
              >
                Reserva tu ritual
              </a>
            </Motion>
            <Motion variant="right">
              <StockImage
                template="spas"
                variant="hero"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
              />
            </Motion>
          </div>
        </header>
      )}

      {show("rituales") && (
        <Section id="rituales" className="bg-teal-950 py-20">
          <SectionHead title={block?.title || "Rituales"} subtitle={`Experiencias en ${brand}`} dark />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {items.slice(0, 4).map((name, i) => (
              <article
                key={i}
                className="rounded-2xl border border-teal-800/80 bg-teal-900/40 p-6 backdrop-blur"
              >
                <h3 className="text-lg font-semibold text-white">{name}</h3>
                <p className="mt-2 text-sm text-teal-200/80">{RITUALES[i]?.d}</p>
              </article>
            ))}
          </div>
        </Section>
      )}

      {["servicios", "beneficios", "reservas", "testimonios", "faq", "cta"].map(
        (id) =>
          show(id) && <GenericSection key={id} id={id} template="spas" cliente={cliente} dark />,
      )}

      {show("galeria") && <BrandGallery template="spas" />}

      <SiteFooter
        cliente={cliente}
        tagline={`${brand} — spa y bienestar en Lima.`}
        columns={[
          { title: "Rituales", items: items.slice(0, 4) },
          { title: "Reservas", items: ["WhatsApp", "Horario extendido"] },
          { title: "Ubicación", items: ["Lima, Perú"] },
        ]}
        dark
      />
    </div>
  );
}
