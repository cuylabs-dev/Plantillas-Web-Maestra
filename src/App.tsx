import { useMemo } from "react";
import { readConfig, applyTheme, type Template, type Copy, type GymVariant } from "./lib/params";
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
  const config = useMemo(() => {
    const cfg = readConfig();
    applyTheme(cfg);
    document.title = `${cfg.cliente} | Propuesta web`;
    return cfg;
  }, []);

  const Template = TEMPLATES[config.template];
  return (
    <Template
      cliente={config.cliente}
      copy={config.copy}
      logoUrl={config.logoUrl}
      gymVariant={config.gymVariant}
      activeSections={config.sections}
    />
  );
}
