import { createContext } from "react";

export const HistoryContext = createContext(null);

export const ORDERS_STORAGE_KEY = "severny-privoz:orders";

export function loadOrders() {
  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders) {
  try {
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // приватный режим — пропускаем
  }
}
