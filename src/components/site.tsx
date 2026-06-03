import type { ReactNode } from "react";
import { Motion } from "./motion";

/** Título corto en navbar (evita romper el menú). */
export function shortBrandName(name: string, max = 22): string {
  const clean = name.trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > 10) return `${cut.slice(0, lastSpace)}…`;
  return `${cut}…`;
}

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
  const brand = shortBrandName(cliente);
  return (
    <div
      className={`sticky top-0 z-50 backdrop-blur ${
        dark ? "bg-black/75 text-white" : "bg-white/90 text-slate-900 border-b border-slate-100"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <a href="#top" className="flex min-w-0 max-w-[42%] shrink items-center gap-2 sm:max-w-[38%] sm:gap-3">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt=""
              className="h-9 w-auto max-w-[96px] shrink-0 object-contain object-left sm:h-10 sm:max-w-[110px]"
              referrerPolicy="no-referrer"
            />
          ) : null}
          <span
            className="truncate text-base font-extrabold tracking-tight sm:text-lg"
            title={cliente}
          >
            {brand}
          </span>
        </a>
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-5 md:flex lg:gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap text-sm font-medium transition hover:text-brand ${
                dark ? "text-white/75 hover:text-white" : "text-slate-600"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href={ctaHref}
          className="ml-auto shrink-0 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 sm:px-5 sm:text-sm"
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
      <Motion as="div" className="mx-auto max-w-6xl">
        {children}
      </Motion>
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
        <p className={`mt-4 text-lg ${dark ? "text-white/75" : "text-slate-600"}`}>{subtitle}</p>
      )}
    </div>
  );
}

function SocialIcon({ label, children }: { label: string; children: ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-brand hover:border-brand"
    >
      {children}
    </a>
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
  const brand = shortBrandName(cliente, 28);
  return (
    <footer className={dark ? "bg-slate-950 text-white" : "bg-slate-900 text-white"}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="text-lg font-extrabold sm:text-xl">{brand}</div>
          <p className="mt-3 text-sm text-white/60">{tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <SocialIcon label="Instagram">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2.2c2.7 0 3 .01 4.04.06 1.08.05 1.8.22 2.45.47a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.25.65.42 1.37.47 2.45.05 1.04.06 1.34.06 4.04s-.01 3-.06 4.04c-.05 1.08-.22 1.8-.47 2.45a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.65.25-1.37.42-2.45.47-1.04.05-1.34.06-4.04.06s-3-.01-4.04-.06c-1.08-.05-1.8-.22-2.45-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.65-.42-1.37-.47-2.45-.05-1.04-.06-1.34-.06-4.04s.01-3 .06-4.04c.05-1.08.22-1.8.47-2.45a4.9 4.9 0 0 1 1.15-1.77 4.9 4.9 0 0 1 1.77-1.15c.65-.25 1.37-.42 2.45-.47C8.99 2.21 9.29 2.2 12 2.2zm0 1.8a9.2 9.2 0 1 0 0 18.4 9.2 9.2 0 0 0 0-18.4zm0 4.8a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8zm7.1-4.6a2.1 2.1 0 1 1-4.2 0 2.1 2.1 0 0 1 4.2 0z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Facebook">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.38H7.08v-3.55h3.05V9.41c0-3 1.79-4.66 4.53-4.66 1.31 0 2.68.23 2.68.23v2.95h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.55h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="LinkedIn">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M20.45 0H3.55A3.55 3.55 0 0 0 0 3.55v16.9A3.55 3.55 0 0 0 3.55 24h16.9A3.55 3.55 0 0 0 24 20.45V3.55A3.55 3.55 0 0 0 20.45 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm15.11 13.02h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.47v6.27z" />
              </svg>
            </SocialIcon>
          </div>
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
        © {new Date().getFullYear()} {brand}. Sitio creado por Cuy Labs.
      </div>
    </footer>
  );
}

/** Botón flotante WhatsApp — esquina inferior izquierda en todas las plantillas. */
export function WhatsAppFloat({ href = "#contacto" }: { href?: string }) {
  return (
    <a
      href={href}
      className="fixed bottom-5 left-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/30 transition hover:scale-105 hover:shadow-xl"
      aria-label="WhatsApp"
      title="Escríbenos por WhatsApp"
    >
      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ---- Avatar / placeholder visual con gradiente de marca ---------------------
export function GradientTile({ className = "", rounded = "rounded-2xl" }: { className?: string; rounded?: string }) {
  return <div className={`brand-gradient ${rounded} ${className}`} />;
}
