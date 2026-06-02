const PRODUCTOS = [
  { nombre: "Producto destacado", precio: "S/ 89" },
  { nombre: "Más vendido", precio: "S/ 129" },
  { nombre: "Nuevo ingreso", precio: "S/ 59" },
  { nombre: "Edición especial", precio: "S/ 199" },
];

export default function EcommerceBlock() {
  return (
    <section id="catalogo" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Nuestro catálogo</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Explora nuestros productos y haz tu pedido en línea.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {PRODUCTOS.map((p) => (
            <div key={p.nombre} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <div className="brand-gradient aspect-square opacity-80" />
              <div className="p-4">
                <h3 className="font-semibold">{p.nombre}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-brand">{p.precio}</span>
                  <button className="rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90">
                    Pedir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
