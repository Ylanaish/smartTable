import { useContext } from "react";
import { HistoryContext } from "../store/HistoryContext";

export function useOrders() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useOrders должен вызываться внутри HistoryProvider");
  }
  return context;
}

export default useOrders;
