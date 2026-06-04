import { useBrandKit } from "../context/BrandKitContext";
import { Motion } from "./motion";
import StockImage from "./StockImage";
import type { Template } from "../lib/params";

export default function BrandGallery({
  template,
  id = "galeria",
}: {
  template: Template;
  id?: string;
}) {
  const kit = useBrandKit();
  const images = (kit?.gallery || []).filter(
    (u) => u?.startsWith("http") && !/maps\.gstatic|favicon/i.test(u),
  );

  if (!images.length) {
    return (
      <section id={id} className="px-6 py-20 section-alt-b">
        <div className="mx-auto max-w-6xl">
          <StockImage template={template} variant="section" className="h-72 w-full" overlay />
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="px-6 py-20 section-alt-b">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-slate-900">
          {kit?.cliente ? `Así se vive en ${kit.cliente}` : "Galería"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, i) => (
            <Motion key={src.slice(-24)} delay={i * 60} variant="scale">
              <img
                src={src}
                alt=""
                className="aspect-square w-full rounded-2xl object-cover shadow-md transition hover:scale-[1.02]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </Motion>
          ))}
        </div>
      </div>
    </section>
  );
}
