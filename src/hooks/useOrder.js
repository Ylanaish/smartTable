import { useContext } from "react";
import { OrderContext } from "../store/orderReducer";

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder должен вызываться внутри OrderProvider");
  }
  return context;
}

export default useOrder;
