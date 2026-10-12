import { DISHES, FORMATS, PREPAYMENT_PERCENT, STYLES } from "../data/catalog";

export const SATIETY_OPTIMAL_MIN = 70;
export const SATIETY_OPTIMAL_MAX = 85;

// fullness у блюда — это «условные порции сытости» за одну подачу.
// 1.0 единица на гостя — полностью сытый гость (100%).
const FULL_MEAL_PER_GUEST = 1;
// «На всю компанию» считаем от щедрого стола: 1.6 единицы на гостя.
const BUFFET_PER_GUEST = 1.6;

const priceFormatter = new Intl.NumberFormat("ru-RU");

export function formatPrice(value) {
  return `${priceFormatter.format(Math.round(value))} ₽`;
}

export function formatDate(iso) {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;

  return new Date(year, month - 1, day).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getStyle(id) {
  return STYLES.find((style) => style.id === id) ?? null;
}

export function getDish(id) {
  return DISHES.find((dish) => dish.id === id) ?? null;
}

export function getFormat(id) {
  return FORMATS.find((format) => format.id === id) ?? null;
}

export function getDishesCount(dishes) {
  return Object.values(dishes).reduce((sum, qty) => sum + qty, 0);
}

export function getDishesPrice(dishes) {
  return Object.entries(dishes).reduce((sum, [id, qty]) => {
    const dish = getDish(id);
    return sum + (dish ? dish.price * qty : 0);
  }, 0);
}

export function getFullness(dishes) {
  return Object.entries(dishes).reduce((sum, [id, qty]) => {
    const dish = getDish(id);
    return sum + (dish ? dish.fullness * qty : 0);
  }, 0);
}

export function getSatiety(dishes, guests, perPerson) {
  const fullness = getFullness(dishes);
  if (fullness === 0) return 0;

  const people = Math.max(guests, 1);
  const target = people * (perPerson ? FULL_MEAL_PER_GUEST : BUFFET_PER_GUEST);

  return Math.round(Math.min(100, (fullness / target) * 100));
}

export function getServicePrice(formatId, guests) {
  const format = getFormat(formatId);
  return format ? format.priceFrom * Math.max(guests, 1) : 0;
}

export function getOrderTotal({ dishes, formatId, guests }) {
  return getDishesPrice(dishes) + getServicePrice(formatId, guests);
}

export function getPrepayment(total) {
  return Math.round((total * PREPAYMENT_PERCENT) / 100);
}
