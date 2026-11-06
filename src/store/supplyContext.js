import { createContext, useContext } from "react";

export const SupplyContext = createContext(null);

export function useSupply() {
  const context = useContext(SupplyContext);
  if (!context) throw new Error("useSupply должен вызываться внутри SupplyProvider");
  return context;
}
