import type { Template } from "./params";

/** Imágenes genéricas (Unsplash) por rubro — placeholders hasta foto real del cliente. */
export const STOCK_IMAGES: Record<
  Template,
  { hero: string; section: string; people: string; detail: string }
> = {
  gimnasios: {
    hero: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    section: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
    people: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
    detail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
  },
  colegios: {
    hero: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    section: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    people: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80",
    detail: "https://images.unsplash.com/photo-1497633766303-9d896a990d2e?w=800&q=80",
  },
  clinicas: {
    hero: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80",
    section: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    people: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    detail: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
  },
  tiendas: {
    hero: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    section: "https://images.unsplash.com/photo-1483985988350-763728e3685b?w=800&q=80",
    people: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    detail: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
  },
  corporativo: {
    hero: "https://images.unsplash.com/photo-1486406146926-c627a92fd1b2?w=1200&q=80",
    section: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    people: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    detail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  hoteles: {
    hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    section: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    people: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    detail: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
  },
};

export function stockFor(template: Template) {
  return STOCK_IMAGES[template] || STOCK_IMAGES.corporativo;
}
