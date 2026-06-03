import { createContext, useContext, type ReactNode } from "react";
import type { BrandKit } from "../lib/kit";

const BrandKitContext = createContext<BrandKit | null>(null);

export function BrandKitProvider({ kit, children }: { kit: BrandKit | null; children: ReactNode }) {
  return <BrandKitContext.Provider value={kit}>{children}</BrandKitContext.Provider>;
}

export function useBrandKit() {
  return useContext(BrandKitContext);
}
