import { useCallback, useMemo, useState } from "react";
import { HistoryContext, loadOrders, saveOrders } from "./HistoryContext";

// Мок-версия истории заявок на localStorage. Позже заменяется загрузкой с сервера.
export default function HistoryProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const addOrder = useCallback((order) => {
    const record = { ...order, id: order.orderNo, status: "new", createdAt: new Date().toISOString() };
    setCurrentOrder(record);
    setOrders((previous) => {
      const next = [record, ...previous.filter((item) => item.id !== record.id)];
      saveOrders(next);
      return next;
    });
  }, []);

  const reload = useCallback(async () => {
    setLoading(true);
    setOrders(loadOrders());
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({ orders, currentOrder, addOrder, reload, loading, error: null }),
    [orders, currentOrder, addOrder, reload, loading],
  );

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}
