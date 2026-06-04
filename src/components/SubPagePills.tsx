import { Motion } from "./motion";

export interface SubPageItem {
  label: string;
  href: string;
}

/** Solo móvil: en desktop el menú va en SiteNav (evita duplicado). */
export function SubPagePills({ items }: { items: SubPageItem[] }) {
  return (
    <Motion variant="fade" className="border-b border-slate-200/80 bg-white/90 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 scrollbar-hide sm:px-6">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:bg-brand hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </div>
    </Motion>
  );
}
