import { useEffect, useMemo, useRef, useState } from "react";
import { useTelegram } from "./hooks/useTelegram";
import OrderCreationRepository from "./repositories/orderCreationRepository";
import { useOrder } from "./hooks/useOrder";
import { CatalogContext } from "./catalogContext.js";

const emptyCatalog = {
  dishes: [],
  categories: [],
  styles: [],
  formats: [],
};

export function CatalogProvider({ children }) {
  const telegram = useTelegram();
  const { order, dispatch } = useOrder();
  const orderRef = useRef(order);
  const [catalog, setCatalog] = useState(emptyCatalog);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderRef.current = order;
  }, [order]);

  useEffect(() => {
    let cancelled = false;
    new OrderCreationRepository(telegram.webApp).getCatalog()
      .then((next) => {
        if (cancelled) return;
        setCatalog(next);

        const dishIds = new Set(next.dishes.map((dish) => dish.id));
        const currentOrder = orderRef.current;
        const dishes = Object.fromEntries(
          Object.entries(currentOrder.dishes).filter(([id]) => dishIds.has(Number(id))),
        );
        dispatch({ type: "setField", field: "dishes", value: dishes });
        if (!next.styles.some((style) => style.id === currentOrder.styleId) && next.styles[0]) {
          dispatch({ type: "setField", field: "styleId", value: next.styles[0].id });
        }
        if (!next.formats.some((format) => format.id === currentOrder.formatId) && next.formats[0]) {
          dispatch({ type: "setField", field: "formatId", value: next.formats[0].id });
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [telegram.webApp, dispatch]);

  const value = useMemo(() => ({ catalog, loading }), [catalog, loading]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}
