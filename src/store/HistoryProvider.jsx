import { useCallback, useMemo, useState } from "react";
import { HistoryContext } from "./HistoryContext";
import { createOrderSnapshot, loadHistory, prependOrder, saveHistory } from "./orderHistory";

export default function HistoryProvider({ children }) {
  const [orders, setOrders] = useState(loadHistory);

  const update = useCallback((updater) => {
    setOrders((prev) => {
      const next = updater(prev);
      saveHistory(next);
      return next;
    });
  }, []);

  const addOrder = useCallback(
    (order) => {
      const snapshot = createOrderSnapshot(order);
      update((prev) => prependOrder(prev, snapshot));
      return snapshot;
    },
    [update],
  );

  const removeOrder = useCallback(
    (orderNo) => update((prev) => prev.filter((item) => item.orderNo !== orderNo)),
    [update],
  );

  const value = useMemo(() => ({ orders, addOrder, removeOrder }), [orders, addOrder, removeOrder]);

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}
