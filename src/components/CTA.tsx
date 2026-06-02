import type { TemplateContent } from "../data/templates";

interface Props {
  cliente: string;
  content: TemplateContent;
}

export default function CTA({ cliente, content }: Props) {
  return (
    <section id="contacto" className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="brand-gradient overflow-hidden rounded-3xl px-8 py-14 text-center text-white shadow-xl sm:px-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            ¿Listos para llevar a {cliente} al siguiente nivel?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Conversemos hoy. Tu nueva presencia digital puede estar lista esta misma semana.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-8 font-semibold text-slate-900 transition hover:bg-white/90"
          >
            {content.ctaPrimary}
          </a>
        </div>
      </div>
    </section>
  );
}
