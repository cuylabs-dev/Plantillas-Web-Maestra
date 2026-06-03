import type { Template } from "../lib/params";
import { stockFor } from "../lib/stockImages";
import { useBrandKit } from "../context/BrandKitContext";
import { Motion } from "./motion";

type Variant = "hero" | "section" | "people" | "detail";

export default function StockImage({
  template,
  variant = "section",
  alt = "",
  className = "",
  rounded = "rounded-2xl",
  overlay,
}: {
  template: Template;
  variant?: Variant;
  alt?: string;
  className?: string;
  rounded?: string;
  overlay?: boolean;
}) {
  const kit = useBrandKit();
  const kitSrc =
    variant === "hero" ? kit?.heroImage || kit?.gallery?.[0] : kit?.gallery?.[1];
  const src = kitSrc || stockFor(template)[variant];
  return (
    <Motion variant="scale" className={`relative overflow-hidden ${rounded} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition duration-700 hover:scale-105"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      {overlay ? <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /> : null}
    </Motion>
  );
}
