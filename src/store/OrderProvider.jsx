import { useEffect, useMemo, useReducer } from "react";
import { OrderContext, STORAGE_KEY, initialOrder, orderReducer } from "./orderReducer";

export const MIN_GUESTS = 5;

const LEGACY_STYLE_IDS = { loft: 1, classic: 2, botanic: 3, terrace: 4 };
const LEGACY_FORMAT_IDS = { boxes: 1, eco: 2, premium: 3 };
const LEGACY_DISH_IDS = {
  bruschetta: 1,
  "salad-caesar": 2,
  "meat-birds": 3,
  salmon: 4,
  cardinale: 5,
  chicken: 6,
  bulgur: 7,
  mashed: 8,
  tiramisu: 9,
  charlotte: 10,
  mousse: 11,
};

function numericId(value, legacyIds) {
  return typeof value === "number" ? value : legacyIds[value] ?? Number(value);
}

function migrateOrder(parsed) {
  return {
    ...initialOrder,
    ...parsed,
    styleId: numericId(parsed.styleId, LEGACY_STYLE_IDS),
    formatId: numericId(parsed.formatId, LEGACY_FORMAT_IDS),
    guests: Math.max(MIN_GUESTS, parsed.guests ?? initialOrder.guests),
    dishes: Object.fromEntries(
      Object.entries(parsed.dishes ?? {}).map(([id, quantity]) => [
        numericId(id, LEGACY_DISH_IDS),
        quantity,
      ]),
    ),
  };
}

function loadOrder() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return initialOrder;

    return migrateOrder(JSON.parse(raw));
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
