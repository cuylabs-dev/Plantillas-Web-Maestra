import type { TemplateContent } from "../data/templates";

export default function Features({ content }: { content: TemplateContent }) {
  return (
    <section id="servicios" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          Todo lo que tu negocio necesita en un solo lugar
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-2xl">
                {f.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-slate-500">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
