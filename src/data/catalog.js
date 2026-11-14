// Мок-данные «Северного привоза». Позже заменяются данными из API,
// но форма данных совпадает со структурой ТЗ (collections / products / zones).

export const COLLECTION = {
  id: 12,
  title: "Северный привоз №12",
  description:
    "Свежая рыба и морепродукты с Дальнего Востока и Мурманска. Лов — на этой неделе, доставка — в субботу.",
  // Сбор закрыт через ~26 часов от момента загрузки (мок).
  closesAt: Date.now() + 26 * 60 * 60 * 1000,
  status: "open", // open | closed
  deliveryDate: "2026-11-07",
};

export const CATEGORIES = [
  { id: "fish", label: "Рыба" },
  { id: "seafood", label: "Морепродукты" },
  { id: "caviar", label: "Икра и деликатесы" },
  { id: "frozen", label: "Заморозка" },
];

export const PRODUCTS = [
  {
    id: 1,
    category: "fish",
    name: "Форель охлаждённая",
    photo: null,
    emoji: "🐟",
    unit: "kg", // kg | pc | pack
    portion: "от 0.5 кг",
    price: 1450, // ₽ за кг
    origin: "Мурманск",
    storage: "охлаждённая, 0…+2 °C, 3 суток",
    available: true,
  },
  {
    id: 2,
    category: "fish",
    name: "Скумбрия свежемороженая",
    photo: null,
    emoji: "🐠",
    unit: "kg",
    portion: "от 0.5 кг",
    price: 620,
    origin: "Дальний Восток",
    storage: "заморозка, −18 °C",
    available: true,
  },
  {
    id: 3,
    category: "seafood",
    name: "Креветка королевская",
    photo: null,
    emoji: "🦐",
    unit: "pack",
    portion: "упаковка 1 кг",
    price: 1150,
    origin: "Дальний Восток",
    storage: "заморозка, −18 °C",
    available: true,
  },
  {
    id: 4,
    category: "seafood",
    name: "Гребешок морской",
    photo: null,
    emoji: "🐚",
    unit: "kg",
    portion: "от 0.3 кг",
    price: 2400,
    origin: "Мурманск",
    storage: "заморозка, −18 °C",
    available: true,
  },
  {
    id: 5,
    category: "caviar",
    name: "Икра лососевая",
    photo: null,
    emoji: "🔴",
    unit: "pack",
    portion: "баночка 140 г",
    price: 1650,
    origin: "Камчатка",
    storage: "охлаждённая, 0…+4 °C",
    available: true,
  },
  {
    id: 6,
    category: "frozen",
    name: "Мидии в раковинах",
    photo: null,
    emoji: "🦪",
    unit: "kg",
    portion: "от 0.5 кг",
    price: 540,
    origin: "Дальний Восток",
    storage: "заморозка, −18 °C",
    available: true,
  },
  {
    id: 7,
    category: "fish",
    name: "Сибас охлаждённый",
    photo: null,
    emoji: "🐟",
    unit: "pc",
    portion: "штука 400–600 г",
    price: 890,
    origin: "Аквакультура",
    storage: "охлаждённый, 0…+2 °C, 3 суток",
    available: true,
  },
  {
    id: 8,
    category: "seafood",
    name: "Кальмар тушка",
    photo: null,
    emoji: "🦑",
    unit: "kg",
    portion: "от 0.5 кг",
    price: 480,
    origin: "Дальний Восток",
    storage: "заморозка, −18 °C",
    available: false, // разобрали в прошлом привозе
  },
];

// Направления получения заказа: доставка или пункт выдачи.
export const DELIVERY_ZONES = [
  { id: "pavlovo", name: "Павлово", type: "delivery" },
  { id: "tumbotino", name: "Тумботино", type: "pickup" },
  { id: "vorsma", name: "Ворсма", type: "delivery" },
  { id: "sosnovskoe", name: "Сосновское", type: "delivery" },
];

// Доступные интервалы доставки в дату привоза.
export const DELIVERY_WINDOWS = [
  { id: "w1", label: "10:00 – 12:00" },
  { id: "w2", label: "12:00 – 14:00" },
  { id: "w3", label: "14:00 – 17:00" },
];

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

export function getZone(id) {
  return DELIVERY_ZONES.find((z) => z.id === id);
}

export function formatPrice(value) {
  // 0 = цена скрыта (товар поштучно, цена за кг — в описании)
  if (!value) return "по запросу";
  return `${value.toLocaleString("ru-RU")} ₽`;
}

export function formatUnitPrice(product) {
  if (!product.price) return "";
  if (product.unit === "kg") return `${formatPrice(product.price)} / кг`;
  if (product.unit === "pc") return `${formatPrice(product.price)} / шт`;
  return `${formatPrice(product.price)} / упак.`;
}

export function unitLabel(unit) {
  if (unit === "kg") return "кг";
  if (unit === "pcs") return "шт";
  return "упак.";
}
