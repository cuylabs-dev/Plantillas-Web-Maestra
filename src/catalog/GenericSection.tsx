import { Section, SectionHead } from "../components/site";
import StockImage from "../components/StockImage";
import { MotionStagger } from "../components/motion";
import { useBrandKit } from "../context/BrandKitContext";
import type { Template } from "../lib/params";

interface Props {
  id: string;
  template: Template;
  cliente: string;
  dark?: boolean;
  /** Fuerza fondo claro + texto oscuro (mejor contraste en gyms oscuros). */
  light?: boolean;
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
    servicios: {
      title: "Servicios para tu empresa",
      subtitle: "Consultoría a medida para {cliente} y equipos en Lima.",
      items: ["Diagnóstico operativo", "Implementación ágil", "Capacitación de equipos", "Soporte continuo"],
    },
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
  hoteles: {
    amenidades: {
      title: "Amenidades",
      subtitle: "Todo para una estadía cómoda en {cliente}",
      items: ["WiFi", "Desayuno", "Estacionamiento", "Room service"],
    },
    reservas: { title: "Reserva directa", subtitle: "Mejor tarifa sin comisiones de terceros." },
    ubicacion: { title: "Ubicación", subtitle: "Cerca de los principales distritos de Lima." },
    galeria: { title: "Galería", subtitle: "Habitaciones y áreas comunes." },
    testimonios: { title: "Opiniones de huéspedes", subtitle: "Experiencias reales." },
    faq: { title: "Preguntas frecuentes", subtitle: "Check-in, cancelaciones y pagos." },
    cta: { title: "Reserva tu estadía", subtitle: "Cupos limitados — confirma por WhatsApp." },
    contacto: { title: "Contacto", subtitle: "Recepción y reservas 24/7." },
  },
  inmobiliarias: {
    zonas: {
      title: "Zonas de Lima",
      subtitle: "Cobertura en los distritos más buscados",
      items: ["Miraflores y Barranco", "San Isidro", "Surco y La Molina", "San Borja"],
    },
    servicios: {
      title: "Servicios",
      subtitle: "Todo el ciclo inmobiliario",
      items: ["Venta", "Alquiler", "Tasación", "Asesoría legal"],
    },
    proceso: {
      title: "Cómo trabajamos",
      subtitle: "Pasos claros hasta el cierre",
      items: ["Asesoría inicial", "Visitas coordinadas", "Negociación", "Cierre seguro"],
    },
    equipo: {
      title: "Nuestros asesores",
      subtitle: "Equipo local con experiencia en el mercado limeño",
      items: ["Asesor residencial", "Asesor corporativo", "Especialista legal"],
    },
    testimonios: { title: "Lo que dicen nuestros clientes", subtitle: "Compradores y propietarios en Lima." },
    faq: {
      title: "Preguntas frecuentes",
      subtitle: "Comisiones, documentos y tiempos de cierre.",
      items: ["¿Cobran comisión al comprador?", "¿Cuánto demora una venta?", "¿Hacen tasaciones?"],
    },
    cta: { title: "Agenda tu visita", subtitle: "Te respondemos por WhatsApp el mismo día." },
    contacto: { title: "Contacto", subtitle: "Oficina en Lima · visitas con cita previa." },
  },
  estetica: {
    servicios: { title: "Servicios", subtitle: "Tratamientos a tu medida", items: ["Facial", "Corporal", "Láser"] },
    confianza: { title: "Por qué elegirnos", subtitle: "Seguridad y resultados." },
    faq: { title: "FAQ", subtitle: "Sesiones, cuidados y promociones." },
    cta: { title: "Reserva hoy", subtitle: "Cupos limitados esta semana." },
    contacto: { title: "Contacto", subtitle: "WhatsApp y citas en Lima." },
  },
  spas: {
    beneficios: {
      title: "Beneficios",
      subtitle: "Bienestar integral",
      items: ["Reduce estrés", "Mejora sueño", "Piel hidratada"],
    },
    servicios: {
      title: "Servicios",
      subtitle: "Experiencias spa",
      items: ["Masajes", "Faciales", "Day spa"],
    },
    faq: { title: "FAQ", subtitle: "Reservas y políticas." },
    cta: { title: "Reserva tu ritual", subtitle: "Te confirmamos por WhatsApp." },
    contacto: { title: "Contacto", subtitle: "Horarios y ubicación." },
  },
};

export default function GenericSection({ id, template, cliente, dark, light }: Props) {
  const kit = useBrandKit();
  const kitBlock = kit?.sectionsCopy?.[id] as { title?: string; subtitle?: string; items?: string[] } | undefined;
  const block = CONTENT[template]?.[id];
  if (!block && !kitBlock) return null;
  const title = kitBlock?.title || block?.title || id;
  const subtitle = (kitBlock?.subtitle || block?.subtitle || "").replace("{cliente}", cliente);
  const items = kitBlock?.items || block?.items;
  const onLight = light || !dark;
  const altClass =
    id.length % 2 === 0 ? "section-alt-a" : onLight ? "section-alt-b" : "section-alt-dark";

  return (
    <Section
      id={id}
      className={
        onLight
          ? `border-y border-slate-200 text-slate-900 ${altClass}`
          : `border-y border-white/10 text-white ${altClass}`
      }
    >
      <SectionHead eyebrow={cliente} title={title} subtitle={subtitle} center dark={!onLight} />
      {items && (
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <StockImage
            template={template}
            variant="section"
            sectionId={id}
            alt=""
            className="h-56 w-full lg:h-80"
            overlay
          />
          <MotionStagger
            className="grid gap-4 sm:grid-cols-2"
            staggerMs={70}
            children={items.map((item) => (
              <div
                key={item}
                className={`rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-lg ${
                  onLight
                    ? "border border-slate-200 bg-white shadow-sm"
                    : "border border-white/10 bg-white/10"
                }`}
              >
                <p className={`font-semibold ${onLight ? "text-slate-800" : "text-white"}`}>{item}</p>
              </div>
            ))}
          />
        </div>
      )}
      {!items && (
        <div
          className={`mx-auto max-w-3xl rounded-3xl p-10 text-center ${
            onLight ? "bg-brand-soft" : "bg-white/5"
          }`}
        >
          <p className={onLight ? "text-slate-600" : "text-white/75"}>{subtitle}</p>
        </div>
      )}
    </Section>
  );
}
