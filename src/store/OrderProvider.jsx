import { useEffect, useMemo, useReducer } from "react";
import { OrderContext, STORAGE_KEY, initialOrder, orderReducer } from "./orderReducer";

function loadOrder() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return initialOrder;

    const parsed = JSON.parse(raw);
    return { ...initialOrder, ...parsed, dishes: parsed.dishes ?? {} };
  } catch {
    return initialOrder;
  }
}

export default function OrderProvider({ children }) {
  const [order, dispatch] = useReducer(orderReducer, undefined, loadOrder);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    } catch {
      // приватный режим — молча пропускаем сохранение
    }
  }, [order]);

  const value = useMemo(() => ({ order, dispatch }), [order]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
