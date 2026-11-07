import { getZone } from "../data/catalog";

// Источник товаров передаётся вызывающей стороной (supply.products из API);
// PRODUCTS из data/catalog больше не источник корзины.
export function cartLines(cart, products) {
  return Object.entries(cart)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === Number(id));
      return product ? { product, qty } : null;
    })
    .filter(Boolean);
}

export function itemsTotal(cart, products) {
  return cartLines(cart, products).reduce(
    (sum, { product, qty }) => sum + product.price * qty,
    0,
  );
}

export function deliveryInfo(state) {
  const zone = getZone(state.zoneId);
  if (!zone) return { mode: null, price: 0, label: "" };
  if (zone.mode === "fixed") {
    return {
      mode: "fixed",
      price: zone.price,
      label: `${zone.name} — ${zone.price} ₽`,
    };
  }
  return { mode: "manager", price: null, label: `${zone.name} — рассчитает менеджер` };
}

export function minOrderFor(zoneId) {
  const zone = getZone(zoneId);
  return zone?.minOrder ?? 0;
}

export function isValidPhone(phone) {
  return /^\+?[\d\s()-]{10,18}$/.test(phone.trim());
}

export function formatPhoneInput(value) {
  const digits = value.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  if (!digits) return "";
  const lead = digits[0] === "7" ? "7" : `7${digits}`.slice(0, 11);
  const d = lead.padEnd(11, "_").split("");
  return `+${d[0]} (${d.slice(1, 4).join("")}) ${d.slice(4, 7).join("")}-${d
    .slice(7, 9)
    .join("")}-${d.slice(9, 11).join("")}`
    .replace(/[_)]+$/g, (m) => (m.includes(")") ? ")" : ""))
    .trimEnd();
}

export function formatDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}

export function formatDateTime(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  return date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
