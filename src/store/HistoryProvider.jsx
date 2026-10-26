import { useCallback, useEffect, useMemo, useState } from "react";
import { HistoryContext } from "./HistoryContext";
import { useTelegram } from "../hooks/useTelegram";
import OrderHistoryRepository from "../repositories/orderHistoryRepository";

export default function HistoryProvider({ children }) {
  const telegram = useTelegram();
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setOrders(await new OrderHistoryRepository(telegram.webApp).getAll());
    } catch (nextError) {
      setError(nextError);
    } finally {
      setLoading(false);
    }
  }, [telegram.webApp]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setError(null);
      try {
        const nextOrders = await new OrderHistoryRepository(telegram.webApp).getAll();
        if (!cancelled) setOrders(nextOrders);
      } catch (nextError) {
        if (!cancelled) setError(nextError);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [telegram.webApp]);

  const addOrder = useCallback((order) => {
    setCurrentOrder(order);
    setOrders((previous) => [order, ...previous.filter((item) => item.id !== order.id)]);
  }, []);

  const value = useMemo(
    () => ({ orders, currentOrder, addOrder, reload, loading, error }),
    [orders, currentOrder, addOrder, reload, loading, error],
  );

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}
