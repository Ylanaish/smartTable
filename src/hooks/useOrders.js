import { useContext } from "react";
import { HistoryContext } from "../store/HistoryContext";
import { getStatusIndex } from "../data/catalog";

export function useOrders() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useOrders должен вызываться внутри HistoryProvider");
  }
  return context;
}

/** Заказ по номеру; undefined, если такого номера нет. */
export function useOrderByNo(orderNo) {
  const { orders } = useOrders();
  return orders.find((order) => order.orderNo === orderNo);
}

/** Заказы, которые ещё не доставлены — счётчик для хаба. */
export function useActiveOrdersCount() {
  const { orders } = useOrders();
  return orders.filter((order) => getStatusIndex(order.status) < 3).length;
}

export default useOrders;
