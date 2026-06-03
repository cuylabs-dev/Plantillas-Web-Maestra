import { useEffect, useMemo, useState } from "react";
import { readConfig, applyTheme, type Template, type Copy, type GymVariant } from "./lib/params";
import { fetchBrandKit, applyKitTheme, loadGoogleFonts } from "./lib/kit";
import { BrandKitProvider } from "./context/BrandKitContext";
import { WhatsAppFloat } from "./components/site";
import { PageEnter } from "./components/motion";
import ClinicasTemplate from "./templates/ClinicasTemplate";
import CorporativoTemplate from "./templates/CorporativoTemplate";
import GimnasiosTemplate from "./templates/GimnasiosTemplate";
import ColegiosTemplate from "./templates/ColegiosTemplate";
import TiendasTemplate from "./templates/TiendasTemplate";

export interface TemplateProps {
  cliente: string;
  copy: Copy;
  logoUrl?: string;
  gymVariant?: GymVariant;
  activeSections: string[];
}

const TEMPLATES: Record<Template, (p: TemplateProps) => JSX.Element> = {
  clinicas: ClinicasTemplate,
  corporativo: CorporativoTemplate,
  gimnasios: GimnasiosTemplate,
  colegios: ColegiosTemplate,
  tiendas: TiendasTemplate,
};

export default function App() {
  const baseConfig = useMemo(() => readConfig(), []);
  const [kit, setKit] = useState<Awaited<ReturnType<typeof fetchBrandKit>>>(null);
  const [ready, setReady] = useState(!baseConfig.kitSlug);

  useEffect(() => {
    const slug = baseConfig.kitSlug;
    if (!slug) {
      applyTheme(baseConfig);
      document.title = `${baseConfig.cliente} | Propuesta web`;
      setReady(true);
      return;
    }
    fetchBrandKit(slug).then((k) => {
      setKit(k);
      if (k) {
        applyKitTheme(k);
        loadGoogleFonts(k.fonts);
        document.title = `${k.cliente} | Propuesta web`;
      } else {
        applyTheme(baseConfig);
        document.title = `${baseConfig.cliente} | Propuesta web`;
      }
      setReady(true);
    });
  }, [baseConfig]);

  const config = useMemo(() => {
    if (!kit) return baseConfig;
    return {
      ...baseConfig,
      cliente: kit.cliente,
      template: kit.template,
      color: kit.color,
      font: kit.font,
      brandPrimary: kit.colors.primary,
      copy: {
        head: kit.copy.head || baseConfig.copy.head,
        sub: kit.copy.sub || baseConfig.copy.sub,
        eyebrow: kit.copy.eyebrow || baseConfig.copy.eyebrow,
      },
      logoUrl: kit.logo || baseConfig.logoUrl,
      gymVariant: (kit.variant as GymVariant) || baseConfig.gymVariant,
      sections: kit.sections?.length ? kit.sections : baseConfig.sections,
    };
  }, [baseConfig, kit]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-600">
        Cargando propuesta personalizada…
      </div>
    );
  }

  const Template = TEMPLATES[config.template];
  return (
    <BrandKitProvider kit={kit}>
      <PageEnter>
        <Template
          cliente={config.cliente}
          copy={config.copy}
          logoUrl={config.logoUrl}
          gymVariant={config.gymVariant}
          activeSections={config.sections}
        />
        <WhatsAppFloat href={config.waLink} />
      </PageEnter>
    </BrandKitProvider>
  );
}
