import { DISHES } from "../data/catalog";
import { currentTime, generateOrderNo } from "./orderReducer";
import {
  getFormat,
  getOrderTotal,
  getPrepayment,
  getStyle,
} from "./selectors";

export const HISTORY_KEY = "smarttable:orders";
export const MAX_HISTORY = 20;

export function createOrderSnapshot(order, now = new Date()) {
  const format = getFormat(order.formatId);
  const style = getStyle(order.styleId);
  const total = getOrderTotal(order);

  return {
    orderNo: order.orderNo || generateOrderNo(),
    createdAt: now.toISOString(),
    eventDate: order.date,
    time: order.time,
    guests: order.guests,
    purpose: order.purpose,
    address: order.address,
    styleName: style?.name ?? "",
    formatName: format?.name ?? "",
    formatId: order.formatId,
    payMethod: order.payMethod,
    paidAt: order.paidAt || currentTime(now),
    total,
    prepayment: getPrepayment(total),
    status: "cooking",
    dishes: Object.entries(order.dishes).flatMap(([id, qty]) => {
      const dish = DISHES.find((item) => item.id === id);
      return dish ? [{ id: dish.id, name: dish.name, portion: dish.portion, price: dish.price, qty }] : [];
    }),
  };
}

export function loadHistory() {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistory(orders) {
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(orders.slice(0, MAX_HISTORY)));
  } catch {
    // приватный режим или переполненное хранилище — молча пропускаем
  }
}

/** Новые заказы сверху, один и тот же номер не дублируется. */
export function prependOrder(orders, snapshot) {
  return [snapshot, ...orders.filter((item) => item.orderNo !== snapshot.orderNo)];
}
