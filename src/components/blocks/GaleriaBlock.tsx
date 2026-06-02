const ITEMS = Array.from({ length: 6 }, (_, i) => i);

export default function GaleriaBlock() {
  return (
    <section id="galeria" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Galería</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Un vistazo a nuestro trabajo, nuestro espacio y nuestros resultados.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {ITEMS.map((i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300"
              style={{
                backgroundImage:
                  i % 2 === 0
                    ? "linear-gradient(135deg, var(--brand-100), var(--brand-500))"
                    : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
