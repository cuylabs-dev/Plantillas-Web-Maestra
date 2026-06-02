import type { TemplateContent } from "../data/templates";

interface Props {
  cliente: string;
  content: TemplateContent;
}

export default function Hero({ cliente, content }: Props) {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-10 brand-gradient" />
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-xl font-extrabold tracking-tight">{cliente}</span>
        <a
          href="#contacto"
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Contacto
        </a>
      </nav>

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-10 sm:pt-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          {content.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          {content.headline}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-slate-600">{content.subhead}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#contacto"
            className="inline-flex h-12 items-center rounded-full bg-brand px-7 font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            {content.ctaPrimary}
          </a>
          <a
            href="#servicios"
            className="inline-flex h-12 items-center rounded-full border border-slate-300 px-7 font-semibold text-slate-700 transition hover:border-[color:var(--brand-500)] hover:text-brand"
          >
            {content.ctaSecondary}
          </a>
        </div>

        <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6">
          {content.stats.map((s) => (
            <div key={s.label}>
              <dt className="text-3xl font-extrabold text-brand sm:text-4xl">{s.value}</dt>
              <dd className="mt-1 text-sm text-slate-500">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
