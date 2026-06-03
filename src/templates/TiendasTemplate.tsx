import { SiteNav, Section, SiteFooter } from "../components/site";
import type { Copy } from "../lib/params";
import { buildNavLinks, makeShow, DEFAULT_SECTIONS } from "../catalog/index";
import GenericSection from "../catalog/GenericSection";

const DEPTOS = [
  { icon: "👕", label: "Ropa" },
  { icon: "👟", label: "Calzado" },
  { icon: "🎒", label: "Accesorios" },
  { icon: "✨", label: "Novedades" },
  { icon: "🔥", label: "Ofertas" },
  { icon: "⭐", label: "Top ventas" },
];

const FILAS = [
  {
    titulo: "Continúa explorando",
    items: ["Básico premium", "Set urbano", "Edición verano", "Clásico urbano", "Pack 2x1", "Limited drop"],
  },
  {
    titulo: "Ofertas relámpago en tu tienda",
    items: ["-40% seleccionados", "2do al 50%", "Envío gratis hoy", "Últimas tallas", "Outlet semanal", "Flash deal"],
  },
  {
    titulo: "Los más vendidos",
    items: ["Best seller #1", "Favorito clientes", "Nuevo ingreso", "Recomendado", "Trending", "Staff pick"],
  },
];

const PRODUCTOS = [
  { n: "Producto estrella", p: "S/ 129", old: "S/ 159", stars: 4.8, prime: true },
  { n: "Edición limitada", p: "S/ 89", old: "", stars: 4.9, prime: true },
  { n: "Favorito del mes", p: "S/ 199", old: "S/ 249", stars: 4.7, prime: false },
  { n: "Best seller", p: "S/ 59", old: "", stars: 4.6, prime: true },
  { n: "Pack ahorro", p: "S/ 149", old: "S/ 180", stars: 4.8, prime: false },
  { n: "Clásico", p: "S/ 99", old: "", stars: 4.5, prime: false },
  { n: "Premium line", p: "S/ 299", old: "", stars: 5, prime: true },
  { n: "Esencial", p: "S/ 45", old: "S/ 60", stars: 4.4, prime: true },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="text-amber-500 text-sm">
      {"★".repeat(Math.floor(n))}
      <span className="text-slate-300">{"★".repeat(5 - Math.floor(n))}</span>
      <span className="ml-1 text-slate-500 text-xs">{n}</span>
    </span>
  );
}

export default function TiendasTemplate({
  cliente,
  copy,
  logoUrl,
  activeSections = DEFAULT_SECTIONS.tiendas,
}: {
  cliente: string;
  copy: Copy;
  logoUrl?: string;
  activeSections?: string[];
}) {
  const show = makeShow(activeSections);
  const nav = buildNavLinks("tiendas", activeSections);

  return (
    <div id="top" className="bg-[#eaeded] min-h-screen">
      <div className="bg-slate-900 text-white">
        <SiteNav cliente={cliente} logoUrl={logoUrl} links={nav} cta="Cuenta" dark ctaHref="#contacto" />
      </div>

      {/* Barra tipo Amazon */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-6xl gap-3">
          <div className="flex flex-1 overflow-hidden rounded-lg border-2 border-brand">
            <input
              type="search"
              placeholder={`Buscar en ${cliente}...`}
              className="flex-1 px-4 py-2.5 text-sm outline-none"
              readOnly
            />
            <button type="button" className="bg-brand px-6 font-semibold text-white">
              Buscar
            </button>
          </div>
          <span className="hidden items-center rounded-lg bg-slate-100 px-4 text-sm font-medium text-slate-700 sm:flex">
            🛒 Carrito (0)
          </span>
        </div>
      </div>

      {show("hero") && (
        <header className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="rounded bg-brand px-2 py-1 text-xs font-bold text-white">
                  {copy.eyebrow || "Envío rápido Lima"}
                </span>
                <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-5xl">
                  {copy.head || (
                    <>
                      Bienvenido a <span className="text-brand">{cliente}</span>
                    </>
                  )}
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                  {copy.sub || "Millones de productos, ofertas diarias y compra segura."}
                </p>
              </div>
              <div className="aspect-[16/9] rounded-lg brand-gradient shadow-lg" />
            </div>
          </div>
        </header>
      )}

      {show("prime_banner") && (
        <section id="prime_banner" className="bg-slate-900 px-4 py-10 text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-amber-400">
                {cliente} Prime
              </p>
              <h2 className="mt-2 text-3xl font-bold">Envío gratis en pedidos seleccionados</h2>
              <p className="mt-2 text-white/75">Ofertas exclusivas y entrega prioritaria.</p>
            </div>
            <a
              href="#ofertas"
              className="rounded-lg bg-amber-400 px-8 py-3 font-bold text-slate-900 transition hover:bg-amber-300"
            >
              Ver ofertas Prime
            </a>
          </div>
        </section>
      )}

      {show("categorias") && (
        <section id="categorias" className="bg-white py-6">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {DEPTOS.map((d) => (
                <button
                  key={d.label}
                  type="button"
                  className="flex flex-col items-center rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-brand hover:shadow-md"
                >
                  <span className="text-2xl">{d.icon}</span>
                  <span className="mt-2 text-xs font-semibold text-slate-800">{d.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filas horizontales estilo Netflix */}
      {show("filas") && (
        <section id="filas" className="bg-[#141414] py-10 text-white">
          <div className="mx-auto max-w-6xl px-4">
            {FILAS.map((fila) => (
              <div key={fila.titulo} className="mb-10 last:mb-0">
                <h2 className="mb-4 text-xl font-bold">{fila.titulo}</h2>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {fila.items.map((item) => (
                    <div
                      key={item}
                      className="group w-40 flex-none cursor-pointer sm:w-48"
                    >
                      <div className="aspect-[2/3] rounded-md brand-gradient opacity-90 transition group-hover:scale-105 group-hover:ring-2 group-hover:ring-brand" />
                      <p className="mt-2 truncate text-sm font-medium text-white/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid denso estilo Amazon */}
      {show("grid_catalogo") && (
        <Section id="grid_catalogo" className="bg-[#eaeded] py-10">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Resultados destacados en {cliente}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {PRODUCTOS.map((p) => (
              <article
                key={p.n}
                className="flex flex-col rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
              >
                <div className="relative aspect-square rounded-md brand-gradient opacity-90">
                  {p.prime && (
                    <span className="absolute left-2 top-2 rounded bg-sky-700 px-2 py-0.5 text-[10px] font-bold text-white">
                      Prime
                    </span>
                  )}
                </div>
                <h3 className="mt-3 line-clamp-2 text-sm font-medium text-slate-900">{p.n}</h3>
                <Stars n={p.stars} />
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-xl font-bold text-slate-900">{p.p}</span>
                  {p.old && <span className="text-sm text-slate-400 line-through">{p.old}</span>}
                </div>
                <p className="mt-1 text-xs text-green-700 font-medium">Envío gratis elegible</p>
                <button
                  type="button"
                  className="mt-3 w-full rounded-full bg-amber-400 py-2 text-sm font-bold text-slate-900 hover:bg-amber-300"
                >
                  Añadir al carrito
                </button>
              </article>
            ))}
          </div>
        </Section>
      )}

      {show("destacados") && (
        <Section id="destacados" className="bg-white">
          <h2 className="text-2xl font-bold text-slate-900">Recomendados para ti</h2>
          <div className="mt-6 flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {PRODUCTOS.slice(0, 5).map((p) => (
              <div key={p.n} className="w-56 flex-none rounded-lg border border-slate-200 p-3">
                <div className="aspect-square rounded brand-gradient opacity-90" />
                <p className="mt-2 font-semibold text-sm">{p.n}</p>
                <p className="text-brand font-bold">{p.p}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {show("ofertas") && (
        <section id="ofertas" className="bg-white py-12">
          <div className="mx-auto max-w-6xl rounded-xl border-2 border-red-500 bg-red-50 px-6 py-10 text-center">
            <h2 className="text-3xl font-bold text-red-700">Ofertas del día</h2>
            <p className="mt-2 text-slate-700">Hasta -40% · Solo por tiempo limitado en {cliente}</p>
            <a href="#contacto" className="mt-6 inline-flex rounded-full bg-red-600 px-8 py-3 font-bold text-white">
              Ver todas las ofertas
            </a>
          </div>
        </section>
      )}

      {show("envios") && (
        <GenericSection id="envios" template="tiendas" cliente={cliente} />
      )}
      {show("reviews") && (
        <GenericSection id="reviews" template="tiendas" cliente={cliente} />
      )}
      {show("faq") && (
        <GenericSection id="faq" template="tiendas" cliente={cliente} />
      )}

      {show("contacto") && (
        <Section id="contacto" className="bg-white">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-10 text-center">
            <h2 className="text-2xl font-bold">¿Necesitas ayuda con tu pedido?</h2>
            <p className="mt-2 text-slate-600">Escríbenos por WhatsApp — {cliente}</p>
            <a
              href="#"
              className="mt-6 inline-flex rounded-full bg-brand px-8 py-3 font-semibold text-white"
            >
              Chatear ahora
            </a>
          </div>
        </Section>
      )}

      <SiteFooter
        cliente={cliente}
        tagline="Tu tienda online con experiencia tipo marketplace."
        columns={[
          { title: "Comprar", items: ["Departamentos", "Ofertas", "Prime", "Novedades"] },
          { title: "Ayuda", items: ["Envíos", "Devoluciones", "Pagos"] },
          { title: "Contacto", items: ["Lima, Perú", "WhatsApp ventas"] },
        ]}
      />
    </div>
  );
}
