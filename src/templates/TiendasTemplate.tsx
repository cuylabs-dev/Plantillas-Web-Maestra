import { SiteNav, Section, SectionHead, SiteFooter } from "../components/site";

const NAV = [
  { label: "Catálogo", href: "#catalogo" },
  { label: "Categorías", href: "#categorias" },
  { label: "Ofertas", href: "#ofertas" },
  { label: "Contacto", href: "#contacto" },
];

const CATEGORIAS = ["Novedades", "Más vendidos", "Ofertas", "Accesorios"];

const PRODUCTOS = [
  { n: "Producto estrella", p: "S/ 129", old: "S/ 159", tag: "-19%" },
  { n: "Edición limitada", p: "S/ 89", old: "", tag: "Nuevo" },
  { n: "Favorito del mes", p: "S/ 199", old: "S/ 249", tag: "-20%" },
  { n: "Best seller", p: "S/ 59", old: "", tag: "" },
  { n: "Pack ahorro", p: "S/ 149", old: "S/ 180", tag: "Combo" },
  { n: "Clásico", p: "S/ 99", old: "", tag: "" },
  { n: "Premium", p: "S/ 299", old: "", tag: "Top" },
  { n: "Esencial", p: "S/ 45", old: "S/ 60", tag: "-25%" },
];

const BENEFICIOS = [
  { t: "Envío a todo el Perú", d: "Despacho rápido y seguro a tu puerta." },
  { t: "Pago seguro", d: "Tarjeta, Yape, Plin o transferencia." },
  { t: "Soporte por WhatsApp", d: "Te ayudamos antes y después de tu compra." },
];

export default function TiendasTemplate({ cliente }: { cliente: string }) {
  return (
    <div id="top">
      <SiteNav cliente={cliente} links={NAV} cta="🛒 Mi carrito" ctaHref="#catalogo" />

      {/* Hero promo */}
      <header className="bg-brand-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-block rounded-full bg-brand px-4 py-1.5 text-sm font-bold text-white">
              Temporada de ofertas
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
              Tu tienda <span className="text-brand">{cliente}</span> abierta las 24 horas
            </h1>
            <p className="mt-5 max-w-md text-lg text-slate-600">
              Explora el catálogo, arma tu pedido y compra en línea. Una vitrina digital que nunca cierra.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#catalogo" className="inline-flex h-12 items-center rounded-full bg-brand px-7 font-semibold text-white shadow-lg transition hover:opacity-90">
                Ver catálogo
              </a>
              <a href="#ofertas" className="inline-flex h-12 items-center rounded-full border border-slate-300 bg-white px-7 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
                Ofertas de hoy
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl brand-gradient opacity-90 shadow-2xl" />
            <div className="absolute -bottom-5 -right-5 rounded-2xl bg-white px-6 py-4 shadow-xl">
              <div className="text-2xl font-extrabold text-brand">-30%</div>
              <div className="text-xs text-slate-500">en productos seleccionados</div>
            </div>
          </div>
        </div>
      </header>

      {/* Categorías */}
      <Section id="categorias" className="py-12">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIAS.map((c, i) => (
            <button
              key={c}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                i === 0 ? "bg-brand text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Section>

      {/* Catálogo */}
      <Section id="catalogo" className="pt-4">
        <SectionHead eyebrow="Catálogo" title="Lo más buscado esta semana" />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {PRODUCTOS.map((p) => (
            <div key={p.n} className="group overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100 transition hover:shadow-lg">
              <div className="relative aspect-square brand-gradient opacity-90">
                {p.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-brand shadow">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{p.n}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-extrabold text-brand">{p.p}</span>
                  {p.old && <span className="text-sm text-slate-400 line-through">{p.old}</span>}
                </div>
                <button className="mt-3 w-full rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white transition hover:bg-brand">
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Ofertas band */}
      <Section id="ofertas">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl brand-gradient px-8 py-12 text-center text-white md:flex-row md:text-left">
          <div>
            <h2 className="text-3xl font-extrabold">Ofertas exclusivas por WhatsApp</h2>
            <p className="mt-2 text-white/85">Suscríbete y recibe los descuentos antes que nadie.</p>
          </div>
          <a href="#" className="inline-flex h-12 flex-none items-center rounded-full bg-white px-8 font-semibold text-slate-900 transition hover:bg-white/90">
            Quiero las ofertas
          </a>
        </div>
      </Section>

      {/* Beneficios */}
      <Section className="bg-slate-50">
        <div className="grid gap-6 md:grid-cols-3">
          {BENEFICIOS.map((b) => (
            <div key={b.t} className="rounded-2xl bg-white p-7 ring-1 ring-slate-100">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">●</div>
              <h3 className="font-bold text-slate-900">{b.t}</h3>
              <p className="mt-1 text-sm text-slate-500">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA contacto */}
      <Section id="contacto">
        <div className="rounded-3xl bg-slate-900 px-8 py-16 text-center text-white sm:px-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">¿Listo para tu pedido?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Escríbenos y arma tu compra con la ayuda de nuestro equipo.
          </p>
          <a href="#" className="mt-8 inline-flex h-12 items-center rounded-full bg-brand px-8 font-semibold text-white transition hover:opacity-90">
            Pedir por WhatsApp
          </a>
        </div>
      </Section>

      <SiteFooter
        cliente={cliente}
        tagline="Tu tienda en línea, abierta las 24 horas. Compra fácil y seguro."
        columns={[
          { title: "Tienda", items: ["Catálogo", "Novedades", "Ofertas", "Más vendidos"] },
          { title: "Ayuda", items: ["Envíos", "Pagos", "Cambios y devoluciones"] },
          { title: "Contacto", items: ["Lima, Perú", "WhatsApp de ventas", "@" + cliente.toLowerCase().replace(/\s+/g, "")] },
        ]}
      />
    </div>
  );
}
