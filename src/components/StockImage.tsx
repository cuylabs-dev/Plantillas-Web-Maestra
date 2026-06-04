import type { Template } from "../lib/params";
import { stockFor } from "../lib/stockImages";
import { useBrandKit } from "../context/BrandKitContext";
import { Motion } from "./motion";

type Variant = "hero" | "section" | "people" | "detail";

function usableGallery(urls: string[] | undefined): string[] {
  if (!urls?.length) return [];
  return urls.filter(
    (u) =>
      u?.startsWith("http") &&
      !/maps\.gstatic|googleusercontent\.com\/\w+=s\d+-p-k-no|favicon|\.ico(\?|$)/i.test(u),
  );
}

function galleryPick(kit: ReturnType<typeof useBrandKit>, slot: number): string | undefined {
  const g = usableGallery(kit?.gallery);
  if (!g.length) return kit?.heroImage && !/maps\.gstatic/i.test(kit.heroImage) ? kit.heroImage : undefined;
  return g[slot % g.length];
}

export default function StockImage({
  template,
  variant = "section",
  alt = "",
  className = "",
  rounded = "rounded-2xl",
  overlay,
  sectionId,
}: {
  template: Template;
  variant?: Variant;
  alt?: string;
  className?: string;
  rounded?: string;
  overlay?: boolean;
  /** Reparte fotos del kit entre secciones (evita misma imagen en todo el sitio). */
  sectionId?: string;
}) {
  const kit = useBrandKit();
  const slot =
    variant === "hero"
      ? 0
      : 1 + (sectionId ? sectionId.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 6 : 0);
  const kitSrc =
    variant === "hero"
      ? galleryPick(kit, 0) || (kit?.heroImage && !/maps\.gstatic/i.test(kit.heroImage) ? kit.heroImage : undefined)
      : galleryPick(kit, slot);
  const src = kitSrc || stockFor(template)[variant];
  return (
    <Motion variant="scale" className={`relative overflow-hidden ${rounded} ${className}`}>
      <img
        src={src}
        alt={alt || kit?.cliente || ""}
        className="h-full w-full object-cover transition duration-700 hover:scale-105"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      {overlay ? <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /> : null}
    </Motion>
  );
}
