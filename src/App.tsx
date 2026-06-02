import { useMemo } from "react";
import { readConfig, applyTheme, type BlockKey } from "./lib/params";
import { TEMPLATE_CONTENT } from "./data/templates";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import LoginBlock from "./components/blocks/LoginBlock";
import ReservasBlock from "./components/blocks/ReservasBlock";
import EcommerceBlock from "./components/blocks/EcommerceBlock";
import GaleriaBlock from "./components/blocks/GaleriaBlock";

const BLOCK_COMPONENTS: Record<BlockKey, () => JSX.Element> = {
  login: LoginBlock,
  reservas: ReservasBlock,
  ecommerce: EcommerceBlock,
  galeria: GaleriaBlock,
};

export default function App() {
  const config = useMemo(() => {
    const cfg = readConfig();
    applyTheme(cfg);
    document.title = `${cfg.cliente} | Propuesta web`;
    return cfg;
  }, []);

  const content = TEMPLATE_CONTENT[config.template];

  return (
    <main>
      <Hero cliente={config.cliente} content={content} />
      <Features content={content} />
      {config.blocks.map((b) => {
        const Block = BLOCK_COMPONENTS[b];
        return <Block key={b} />;
      })}
      <CTA cliente={config.cliente} content={content} />
      <Footer cliente={config.cliente} />
    </main>
  );
}
