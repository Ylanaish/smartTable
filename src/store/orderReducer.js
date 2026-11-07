import { createContext } from "react";

export const STORAGE_KEY = "severny-privoz:order";

export const initialOrder = {
  // cart: { [productId]: quantity } — для кг это десятые доли кг? Нет:
  // для кг храним шаг по 0.5 кг как число (0.5, 1, 1.5...), для шт/упак — целые.
  cart: {},
  customerName: "",
  phone: "",
  zoneId: "",
  street: "",
  house: "",
  apartment: "",
  comment: "",
  windowId: "",
  agreed: false,
  // Снимок позиций на момент подтверждения (ТЗ п.9): name, price, unit, qty
  items: [],
  itemsTotal: 0,
  deliveryPrice: 0,
  deliveryMode: "", // fixed | manager
  total: 0,
  orderNo: "",
  collectionId: null,
  createdAt: "",
};

export function orderReducer(state, action) {
  switch (action.type) {
    case "setField":
      return { ...state, [action.field]: action.value };

    // qty для kg — с шагом 0.5, для pc/pack — целые.
    case "setQty": {
      const cart = { ...state.cart };
      if (!action.qty || action.qty <= 0) delete cart[action.id];
      else cart[action.id] = action.qty;
      return { ...state, cart };
    }

    case "reset":
      return { ...initialOrder };

    case "submit": {
      const { items, itemsTotal, deliveryPrice, deliveryMode, total, orderNo } = action;
      return {
        ...state,
        items,
        itemsTotal,
        deliveryPrice,
        deliveryMode,
        total,
        orderNo,
        collectionId: null,
        createdAt: new Date().toISOString(),
      };
    }

    default:
      return state;
  }
}

export const OrderContext = createContext(null);
