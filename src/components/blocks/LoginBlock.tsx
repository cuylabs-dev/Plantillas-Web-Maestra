export default function LoginBlock() {
  return (
    <section id="acceso" className="py-20 bg-brand-soft">
      <div className="mx-auto max-w-md px-6">
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5">
          <h3 className="text-2xl font-bold">Área de clientes</h3>
          <p className="mt-1 text-slate-500">Accede a tu cuenta para gestionar tu información.</p>
          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="email">Correo</label>
              <input id="email" type="email" placeholder="tu@correo.com"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-[color:var(--brand-500)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="pass">Contraseña</label>
              <input id="pass" type="password" placeholder="••••••••"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-[color:var(--brand-500)]" />
            </div>
            <button type="submit" className="h-12 w-full rounded-xl bg-brand font-semibold text-white transition hover:opacity-90">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
