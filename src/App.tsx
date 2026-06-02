import { useMemo } from "react";
import { readConfig, applyTheme, type Template } from "./lib/params";
import ClinicasTemplate from "./templates/ClinicasTemplate";
import CorporativoTemplate from "./templates/CorporativoTemplate";
import GimnasiosTemplate from "./templates/GimnasiosTemplate";
import ColegiosTemplate from "./templates/ColegiosTemplate";
import TiendasTemplate from "./templates/TiendasTemplate";

const TEMPLATES: Record<Template, (p: { cliente: string }) => JSX.Element> = {
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
  return <Template cliente={config.cliente} />;
}
