export default function Footer({ cliente }: { cliente: string }) {
  return (
    <footer className="border-t border-slate-100 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row">
        <span className="font-semibold text-slate-700">{cliente}</span>
        <span>
          Sitio creado por{" "}
          <span className="font-semibold text-brand">Cuy Labs</span>
        </span>
      </div>
    </footer>
  );
}
