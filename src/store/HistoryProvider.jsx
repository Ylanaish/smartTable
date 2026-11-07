import { useCallback, useEffect, useMemo, useState } from "react";
import { HistoryContext } from "./HistoryContext";
import OrderRepository from "../repositories/orderRepository";
import { useTelegram } from "../hooks/useTelegram";

// История заявок берётся с сервера, localStorage источником больше не является.
export default function HistoryProvider({ children }) {
  const telegram = useTelegram();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Первая загрузка — как в SupplyProvider: setState только из колбэков.
  useEffect(() => {
    let cancelled = false;

    new OrderRepository(telegram.webApp)
      .getAll()
      .then((next) => {
        if (!cancelled) setOrders(next);
      })
      .catch((e) => {
        if (!cancelled) setError(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [telegram.webApp]);

  // Императивное обновление: из CheckoutPage после оформления и кнопкой «Повторить».
  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setOrders(await new OrderRepository(telegram.webApp).getAll());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [telegram.webApp]);

  const value = useMemo(
    () => ({ orders, reload, loading, error }),
    [orders, reload, loading, error],
  );

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}
