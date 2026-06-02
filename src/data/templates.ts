import type { Template } from "../lib/params";

export interface Feature {
  icon: string;
  title: string;
  text: string;
}

export interface TemplateContent {
  eyebrow: string;
  headline: string;
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  features: Feature[];
  stats: { value: string; label: string }[];
}

export const TEMPLATE_CONTENT: Record<Template, TemplateContent> = {
  clinicas: {
    eyebrow: "Salud y bienestar",
    headline: "Tu clínica, presente cuando tus pacientes te buscan",
    subhead:
      "Una web moderna que transmite confianza, muestra tus especialidades y permite que reserven una cita en segundos.",
    ctaPrimary: "Reservar una cita",
    ctaSecondary: "Ver especialidades",
    features: [
      { icon: "🩺", title: "Especialidades claras", text: "Presenta tus servicios médicos de forma ordenada y profesional." },
      { icon: "📅", title: "Citas en línea", text: "Tus pacientes agendan sin llamar, a cualquier hora del día." },
      { icon: "⭐", title: "Confianza que vende", text: "Testimonios y certificaciones que respaldan tu prestigio." },
    ],
    stats: [
      { value: "+60%", label: "más citas agendadas" },
      { value: "24/7", label: "disponible para reservas" },
      { value: "100%", label: "responsive en móvil" },
    ],
  },
  corporativo: {
    eyebrow: "Empresa y servicios",
    headline: "La imagen digital que tu empresa merece",
    subhead:
      "Un sitio profesional, rápido y claro que comunica tu propuesta de valor y convierte visitantes en clientes.",
    ctaPrimary: "Solicitar propuesta",
    ctaSecondary: "Conocer más",
    features: [
      { icon: "🏢", title: "Imagen profesional", text: "Diseño premium que posiciona tu marca por encima de la competencia." },
      { icon: "🚀", title: "Carga ultrarrápida", text: "Optimizada para Google y para no perder ni un cliente." },
      { icon: "📈", title: "Orientada a conversión", text: "Cada sección guía al visitante hacia el contacto." },
    ],
    stats: [
      { value: "+45%", label: "mejora en conversión" },
      { value: "<1s", label: "tiempo de carga" },
      { value: "+85%", label: "presencia digital" },
    ],
  },
  gimnasios: {
    eyebrow: "Fitness y entrenamiento",
    headline: "Llena tu gimnasio con una web que motiva",
    subhead:
      "Muestra tus planes, horarios y resultados. Capta nuevos miembros y deja que se inscriban desde el celular.",
    ctaPrimary: "Ver planes",
    ctaSecondary: "Inscribirme ahora",
    features: [
      { icon: "💪", title: "Planes y membresías", text: "Presenta tus precios y promociones de forma irresistible." },
      { icon: "🗓️", title: "Horarios de clases", text: "Tus alumnos consultan disponibilidad al instante." },
      { icon: "🔥", title: "Resultados reales", text: "Galería de transformaciones que inspiran a inscribirse." },
    ],
    stats: [
      { value: "+70%", label: "más inscripciones" },
      { value: "+3x", label: "alcance en redes" },
      { value: "24/7", label: "captación activa" },
    ],
  },
  colegios: {
    eyebrow: "Educación",
    headline: "El colegio que los padres eligen con confianza",
    subhead:
      "Comunica tu propuesta educativa, valores y logros. Facilita el proceso de admisión desde un solo lugar.",
    ctaPrimary: "Proceso de admisión",
    ctaSecondary: "Conocer el colegio",
    features: [
      { icon: "🎓", title: "Propuesta educativa", text: "Comunica tu metodología y diferenciales con claridad." },
      { icon: "📝", title: "Admisión simple", text: "Los padres inician el proceso de matrícula en línea." },
      { icon: "🏫", title: "Confianza familiar", text: "Galería e historias que transmiten seguridad y prestigio." },
    ],
    stats: [
      { value: "+50%", label: "más solicitudes" },
      { value: "100%", label: "info siempre actual" },
      { value: "24/7", label: "admisión abierta" },
    ],
  },
  tiendas: {
    eyebrow: "Comercio y retail",
    headline: "Tu tienda abierta al mundo, las 24 horas",
    subhead:
      "Muestra tu catálogo, recibe pedidos y vende en línea. Una vitrina digital que nunca cierra.",
    ctaPrimary: "Ver catálogo",
    ctaSecondary: "Hacer un pedido",
    features: [
      { icon: "🛍️", title: "Catálogo atractivo", text: "Tus productos lucen profesionales y listos para vender." },
      { icon: "💳", title: "Pedidos en línea", text: "Recibe órdenes por WhatsApp o pago directo." },
      { icon: "📦", title: "Siempre disponible", text: "Tu tienda vende mientras duermes, sin horarios." },
    ],
    stats: [
      { value: "+90%", label: "más alcance" },
      { value: "24/7", label: "tienda abierta" },
      { value: "+40%", label: "más ventas" },
    ],
  },
};
