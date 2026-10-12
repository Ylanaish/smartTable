import { createContext } from "react";

export const STORAGE_KEY = "smarttable:order";

function defaultDate() {
  const date = new Date();
  date.setDate(date.getDate() + 14);

  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export const initialOrder = {
  purpose: "birthday",
  date: defaultDate(),
  time: "18:00",
  guests: 10,
  address: "",
  styleId: "loft",
  dishes: { "salad-caesar": 2, "meat-birds": 2, cardinale: 2, bruschetta: 2, tiramisu: 1 },
  satietyMode: "perPerson",
  formatId: "premium",
  payMethod: "card",
  orderNo: "",
  paidAt: "",
};

export function generateOrderNo() {
  return String(1000 + Math.floor(Math.random() * 9000));
}

export function currentTime(base = new Date()) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${pad(base.getHours())}:${pad(base.getMinutes())}`;
}

export function orderReducer(state, action) {
  switch (action.type) {
    case "setField":
      return { ...state, [action.field]: action.value };

    case "setDishQuantity": {
      const { id, quantity } = action;
      const dishes = { ...state.dishes };
      if (quantity <= 0) delete dishes[id];
      else dishes[id] = quantity;
      return { ...state, dishes };
    }

    case "pay":
      return {
        ...state,
        payMethod: action.method ?? state.payMethod,
        orderNo: action.orderNo ?? state.orderNo ?? generateOrderNo(),
        paidAt: action.paidAt ?? currentTime(),
      };

    case "reset":
      return { ...initialOrder };

    default:
      return state;
  }
}

export const OrderContext = createContext(null);
