import type { ReactNode } from "react";

// ---- Navbar reutilizable -----------------------------------------------------
export interface NavLink {
  label: string;
  href: string;
}

interface SiteNavProps {
  cliente: string;
  logoUrl?: string;
  links: NavLink[];
  cta: string;
  ctaHref?: string;
  dark?: boolean;
}

export function SiteNav({ cliente, logoUrl, links, cta, ctaHref = "#contacto", dark }: SiteNavProps) {
  return (
    <div
      className={`sticky top-0 z-50 backdrop-blur ${
        dark ? "bg-black/70 text-white" : "bg-white/80 text-slate-900 border-b border-slate-100"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex min-w-0 max-w-[55%] items-center gap-3">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt=""
              className="h-10 w-auto max-w-[120px] shrink-0 object-contain object-left"
              referrerPolicy="no-referrer"
            />
          ) : null}
          <span className="truncate text-lg font-extrabold tracking-tight">{cliente}</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition hover:text-brand ${
                dark ? "text-white/70 hover:text-white" : "text-slate-600"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href={ctaHref}
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          {cta}
        </a>
      </nav>
    </div>
  );
}

// ---- Section wrapper ---------------------------------------------------------
interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}
export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`px-6 py-20 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

// ---- Eyebrow + título de sección --------------------------------------------
export function SectionHead({
  eyebrow,
  title,
  subtitle,
  center,
  dark,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} mb-12`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand">{eyebrow}</p>
      )}
      <h2
        className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg ${dark ? "text-white/70" : "text-slate-500"}`}>{subtitle}</p>
      )}
    </div>
  );
}

// ---- Footer reutilizable -----------------------------------------------------
interface SiteFooterProps {
  cliente: string;
  tagline: string;
  columns: { title: string; items: string[] }[];
  dark?: boolean;
}
export function SiteFooter({ cliente, tagline, columns, dark = true }: SiteFooterProps) {
  return (
    <footer className={dark ? "bg-slate-950 text-white" : "bg-slate-900 text-white"}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="text-xl font-extrabold">{cliente}</div>
          <p className="mt-3 text-sm text-white/60">{tagline}</p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/80">{col.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/55">
              {col.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {cliente}. Sitio creado por Cuy Labs.
      </div>
    </footer>
  );
}

// ---- Avatar / placeholder visual con gradiente de marca ---------------------
export function GradientTile({ className = "", rounded = "rounded-2xl" }: { className?: string; rounded?: string }) {
  return <div className={`brand-gradient ${rounded} ${className}`} />;
}
