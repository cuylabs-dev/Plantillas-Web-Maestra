import { Section, SectionHead } from "../components/site";
import type { Template } from "../lib/params";

interface Props {
  id: string;
  template: Template;
  cliente: string;
  dark?: boolean;
}

const CONTENT: Partial<
  Record<Template, Record<string, { title: string; subtitle: string; items?: string[] }>>
> = {
  gimnasios: {
    stats: {
      title: "Resultados que hablan",
      subtitle: "Métricas de nuestros miembros en Lima.",
      items: ["+500 activos", "12 coaches", "7 días abierto", "4.9 valoración"],
    },
    beneficios: {
      title: "Por qué entrenar aquí",
      subtitle: "Beneficios pensados para tu progreso real.",
      items: ["Plan personalizado", "Coaches en piso", "Comunidad motivadora"],
    },
    coaches: {
      title: "Conoce al equipo",
      subtitle: "Profesionales certificados en cada disciplina.",
      items: ["Coach principal", "Especialista fuerza", "Movilidad y recuperación"],
    },
    horarios: {
      title: "Horarios flexibles",
      subtitle: "Mañana, tarde y noche para que no faltes.",
      items: ["Lun-Vie 6am-10pm", "Sáb 7am-2pm", "Dom clases grupales"],
    },
    galeria: {
      title: "Nuestras instalaciones",
      subtitle: "Espacios amplios, equipamiento y ambiente.",
    },
    testimonios: {
      title: "Lo que dicen nuestros miembros",
      subtitle: "Historias reales de progreso en {cliente}",
      items: [
        '"En 3 meses bajé grasa y gané fuerza." — Ana',
        '"Los coaches corrigen técnica en cada clase." — Luis',
      ],
    },
    cta: {
      title: "Tu primera clase te espera",
      subtitle: "Reserva hoy y empieza con evaluación gratuita.",
    },
  },
  clinicas: {
    precios: { title: "Planes y tarifas", subtitle: "Transparencia desde la primera consulta." },
    reservas: { title: "Reserva en línea", subtitle: "Agenda tu cita en minutos por WhatsApp o web." },
    antes_despues: { title: "Resultados", subtitle: "Casos reales con seguimiento profesional." },
    seguros: { title: "Seguros y convenios", subtitle: "Trabajamos con las principales aseguradoras." },
    confianza: { title: "Confianza médica", subtitle: "Protocolos y equipo certificado." },
    ubicacion: { title: "Ubicación", subtitle: "Fácil acceso en Lima con estacionamiento." },
    faq: { title: "Preguntas frecuentes", subtitle: "Resolvemos tus dudas antes de la cita." },
    cta: { title: "Agenda tu evaluación", subtitle: "Primera consulta con cupos limitados." },
  },
  colegios: {
    niveles: { title: "Niveles educativos", subtitle: "Inicial, primaria y secundaria integrados." },
    metodologia: { title: "Metodología", subtitle: "Aprendizaje activo y acompañamiento cercano." },
    admision: { title: "Proceso de admisión", subtitle: "Vacantes limitadas — postula hoy." },
    vida_escolar: { title: "Vida escolar", subtitle: "Actividades, valores y comunidad." },
    instalaciones: { title: "Instalaciones", subtitle: "Aulas, laboratorios y zonas deportivas." },
    docentes: { title: "Nuestros docentes", subtitle: "Equipo pedagógico con experiencia." },
    calendario: { title: "Calendario", subtitle: "Fechas clave del año escolar." },
    padres: { title: "Portal de padres", subtitle: "Comunicación y seguimiento académico." },
    faq: { title: "Preguntas frecuentes", subtitle: "Información para familias nuevas." },
    cta: { title: "Agenda una visita", subtitle: "Conoce el colegio con tour guiado." },
  },
  tiendas: {
    categorias: { title: "Explora por categoría", subtitle: "Encuentra lo que buscas rápido." },
    destacados: { title: "Productos destacados", subtitle: "Lo más pedido esta semana." },
    envios: { title: "Envíos a todo el Perú", subtitle: "Delivery rápido y seguro." },
    tallas: { title: "Guía de tallas", subtitle: "Elige tu talla con confianza." },
    lookbook: { title: "Lookbook", subtitle: "Inspírate con outfits de temporada." },
    ofertas: { title: "Ofertas activas", subtitle: "Descuentos por tiempo limitado." },
    reviews: { title: "Opiniones de clientes", subtitle: "4.8/5 de satisfacción promedio." },
    tienda_fisica: { title: "Visítanos en tienda", subtitle: "Prueba, compra y recibe asesoría." },
    faq: { title: "Preguntas frecuentes", subtitle: "Cambios, devoluciones y pagos." },
    cta: { title: "Compra hoy", subtitle: "Stock limitado en favoritos." },
  },
  corporativo: {
    casos: { title: "Casos de éxito", subtitle: "Resultados medibles con clientes en Perú." },
    metodologia: { title: "Cómo trabajamos", subtitle: "Diagnóstico, ejecución y mejora continua." },
    equipo: { title: "Equipo", subtitle: "Consultores senior por industria." },
    industrias: { title: "Industrias", subtitle: "Retail, servicios, salud y educación." },
    metricas: { title: "Impacto", subtitle: "KPIs claros desde el primer mes." },
    partners: { title: "Partners", subtitle: "Alianzas tecnológicas y estratégicas." },
    blog_teaser: { title: "Insights", subtitle: "Tendencias y buenas prácticas." },
    faq: { title: "Preguntas frecuentes", subtitle: "Alcance, plazos y soporte." },
    cta: { title: "Agenda diagnóstico", subtitle: "Sesión inicial sin compromiso." },
  },
};

export default function GenericSection({ id, template, cliente, dark }: Props) {
  const block = CONTENT[template]?.[id];
  if (!block) return null;
  const subtitle = block.subtitle.replace("{cliente}", cliente);

  return (
    <Section id={id} className={dark ? "border-y border-white/10" : "border-y border-slate-100"}>
      <SectionHead eyebrow={cliente} title={block.title} subtitle={subtitle} center />
      {block.items && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {block.items.map((item) => (
            <div
              key={item}
              className={`rounded-2xl p-6 ${
                dark ? "border border-white/10 bg-white/5" : "border border-slate-100 bg-white shadow-sm"
              }`}
            >
              <p className={`font-semibold ${dark ? "text-white" : "text-slate-800"}`}>{item}</p>
            </div>
          ))}
        </div>
      )}
      {!block.items && (
        <div
          className={`mx-auto max-w-3xl rounded-3xl p-10 text-center ${
            dark ? "bg-white/5" : "bg-brand-soft"
          }`}
        >
          <p className={dark ? "text-white/70" : "text-slate-600"}>{subtitle}</p>
        </div>
      )}
    </Section>
  );
}
