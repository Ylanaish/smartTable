export const PURPOSES = [
  { id: "birthday", label: "День рождения" },
  { id: "jubilee", label: "Юбилей" },
  { id: "corporate", label: "Корпоратив" },
  { id: "houseparty", label: "Домашняя вечеринка" },
  { id: "wedding", label: "Свадьба" },
  { id: "buffet", label: "Фуршет" },
];

export const STYLES = [
  {
    id: "loft",
    name: "Лофт / Гранж",
    tags: ["Свечи", "Барбери", "Брускетто"],
    seed: 0,
  },
  {
    id: "classic",
    name: "Классик Элеганс",
    tags: ["Юбилей", "Свадьба", "Торжество"],
    seed: 3,
  },
  {
    id: "botanic",
    name: "Ботаника",
    tags: ["Зелень", "Дерево", "Лён"],
    seed: 1,
  },
  {
    id: "terrace",
    name: "Терраса",
    tags: ["Свечи", "Гирлянды", "Открытый воздух"],
    seed: 5,
  },
];

export const DISH_CATEGORIES = [
  { id: "snacks", label: "Закуски" },
  { id: "hot", label: "Горячее" },
  { id: "sides", label: "Гарниры" },
  { id: "desserts", label: "Десерты" },
];

export const DISHES = [
  {
    id: "bruschetta",
    category: "snacks",
    name: "Брускетта с томатами",
    portion: "120 г",
    price: 320,
    fullness: 0.5,
    seed: 2,
  },
  {
    id: "salad-caesar",
    category: "snacks",
    name: "Салат Цезарь",
    portion: "180 г",
    price: 540,
    fullness: 0.8,
    seed: 4,
  },
  {
    id: "meat-birds",
    category: "hot",
    name: "Стейк из говядины",
    portion: "200 г",
    price: 890,
    fullness: 1.5,
    seed: 6,
  },
  {
    id: "salmon",
    category: "hot",
    name: "Запечённый лосось",
    portion: "180 г",
    price: 760,
    fullness: 1.3,
    seed: 1,
  },
  {
    id: "cardinale",
    category: "hot",
    name: "Картофель по-деревенски",
    portion: "150 г",
    price: 290,
    fullness: 0.6,
    seed: 3,
  },
  {
    id: "chicken",
    category: "hot",
    name: "Цыплёнок на гриле",
    portion: "200 г",
    price: 690,
    fullness: 1.4,
    seed: 5,
  },
  {
    id: "bulgur",
    category: "sides",
    name: "Булгур с овощами",
    portion: "150 г",
    price: 240,
    fullness: 0.6,
    seed: 0,
  },
  {
    id: "mashed",
    category: "sides",
    name: "Картофельное пюре",
    portion: "150 г",
    price: 210,
    fullness: 0.5,
    seed: 4,
  },
  {
    id: "tiramisu",
    category: "desserts",
    name: "Тирамису",
    portion: "120 г",
    price: 390,
    fullness: 0.7,
    seed: 2,
  },
  {
    id: "charlotte",
    category: "desserts",
    name: "Шарлотка",
    portion: "120 г",
    price: 340,
    fullness: 0.6,
    seed: 1,
  },
  {
    id: "mousse",
    category: "desserts",
    name: "Мусс из чёрной смородины",
    portion: "100 г",
    price: 310,
    fullness: 0.5,
    seed: 5,
  },
];

export const FORMATS = [
  {
    id: "boxes",
    name: "Боксы",
    description: "Стильные подставки в коробках (самовывоз/доставка)",
    priceFrom: 1500,
    seed: 3,
  },
  {
    id: "eco",
    name: "Эко",
    description: "Натуральные материалы и минимализм",
    priceFrom: 2000,
    seed: 1,
  },
  {
    id: "premium",
    name: "Премиум под ключ",
    description: "Сервировка, декор, обслуживание. Спецодежда, официанты",
    priceFrom: 3500,
    seed: 5,
  },
];

export const PAYMENT_METHODS = [
  { id: "card", label: "Банковская карта" },
  { id: "sbp", label: "СБП (Система быстрых платежей)" },
  { id: "yookassa", label: "ЮKassa" },
  { id: "tinkoff", label: "Тинькофф Звонок" },
];

// Жизненный цикл заказа. Индекс в массиве = сколько шагов трекинга уже выполнено.
export const ORDER_STATUSES = [
  { id: "paid", label: "Оплата получена", badge: "Оплачен", badgeClass: "bg-brand-soft text-brand" },
  { id: "cooking", label: "Готовы в кухне", badge: "Готовим", badgeClass: "bg-brand-soft text-brand" },
  { id: "delivery", label: "К доставке", badge: "В пути", badgeClass: "bg-[#e7eef5] text-[#2f5f74]" },
  { id: "served", label: "Доставлен и сервирован", badge: "Завершён", badgeClass: "bg-line text-ink/70" },
];

export function getStatus(id) {
  return ORDER_STATUSES.find((status) => status.id === id) ?? ORDER_STATUSES[0];
}

export function getStatusIndex(id) {
  const index = ORDER_STATUSES.findIndex((status) => status.id === id);
  return index < 0 ? 0 : index;
}

// Четыре шага мастера. `path` — маршрут шага, `next` — куда ведёт кнопка «Далее».
export const STEPS = [
  { step: 1, path: "/event", next: "/style", label: "Далее: выбрать стиль стола" },
  { step: 2, path: "/style", next: "/menu", label: "Далее: меню" },
  { step: 3, path: "/menu", next: "/format", label: "Далее: формат сервиса" },
  { step: 4, path: "/format", next: "/payment", label: "Далее: оплата" },
];

export const PREPAYMENT_PERCENT = 30;