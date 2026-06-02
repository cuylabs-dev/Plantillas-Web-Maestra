const HORARIOS = ["09:00", "10:30", "12:00", "15:00", "16:30", "18:00"];

export default function ReservasBlock() {
  return (
    <section id="reservas" className="py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Reserva en segundos</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-500">
          Elige el horario que prefieras y nos encargamos del resto.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {HORARIOS.map((h) => (
            <button key={h}
              className="rounded-xl border border-slate-200 bg-white px-4 py-4 font-semibold transition hover:border-[color:var(--brand-500)] hover:text-brand">
              {h}
            </button>
          ))}
        </div>
        <button className="mt-8 inline-flex h-12 items-center rounded-full bg-brand px-8 font-semibold text-white transition hover:opacity-90">
          Confirmar reserva
        </button>
      </div>
    </section>
  );
}
