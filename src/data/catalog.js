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
    description:
      "Хрустящий хлеб с обожжёнными томатами, свежим базиликом и оливковым маслом.",
    ingredients: [
      "Чиабатта",
      "Томаты черри",
      "Базилик",
      "Оливковое масло",
      "Сыр пармезан",
    ],
    allergens: ["Пшеница", "Молоко"],
    kcal: 248,
    protein: 7,
    fat: 12,
    carbs: 26,
    tags: ["Вегетарианское", "Лёгкое"],
  },
  {
    id: "salad-caesar",
    category: "snacks",
    name: "Салат Цезарь",
    portion: "180 г",
    price: 540,
    fullness: 0.8,
    seed: 4,
    description:
      "Классика: хрустящий салат ромэн с пармезаном, сухариками и заправкой на основе горчицы.",
    ingredients: [
      "Салат ромэн",
      "Куриное филе",
      "Сыр пармезан",
      "Сухарики",
      "Соус «Цезарь»",
    ],
    allergens: ["Пшеница", "Молоко", "Яйцо", "Горчица"],
    kcal: 342,
    protein: 24,
    fat: 22,
    carbs: 14,
    tags: ["Популярное"],
  },
  {
    id: "meat-birds",
    category: "hot",
    name: "Стейк из говядины",
    portion: "200 г",
    price: 890,
    fullness: 1.5,
    seed: 6,
    description:
      "Мраморная говядина прожарки medium rare с гарниром из запечённых овощей и соусом из чёрного перца.",
    ingredients: [
      "Говядина (ребра)", "Запечённые овощи", "Соус из чёрного перца", "Масло оливковое"
    ],
    allergens: ["Горчица", "Молоко"],
    kcal: 524,
    protein: 46,
    fat: 36,
    carbs: 6,
    tags: ["Главное блюдо", "Высокобелковое"],
  },
  {
    id: "salmon",
    category: "hot",
    name: "Запечённый лосось",
    portion: "180 г",
    price: 760,
    fullness: 1.3,
    seed: 1,
    description:
      "Филе лосося на гриле с лимоном, цукини и свежей зеленью.",
    ingredients: ["Филе лосося", "Цукини", "Лимон", "Укроп", "Масло оливковое"],
    allergens: ["Рыба"],
    kcal: 368,
    protein: 34,
    fat: 22,
    carbs: 4,
    tags: ["Главное блюдо", "Нежное"],
  },
  {
    id: "cardinale",
    category: "hot",
    name: "Картофель по-деревенски",
    portion: "150 г",
    price: 290,
    fullness: 0.6,
    seed: 3,
    description:
      "Дольки картофеля, запечённые с чесноком и зеленью, с хрустящей корочкой.",
    ingredients: ["Картофель", "Чеснок", "Розмарин", "Масло подсолнечное"],
    allergens: [],
    kcal: 264,
    protein: 4,
    fat: 14,
    carbs: 32,
    tags: ["Гарнир", "Вегетарианское"],
  },
  {
    id: "chicken",
    category: "hot",
    name: "Цыплёнок на гриле",
    portion: "200 г",
    price: 690,
    fullness: 1.4,
    seed: 5,
    description:
      "Цыплячья грудка на гриле с маринадом из тимьяна и свежими овощами.",
    ingredients: [
      "Филе цыплёнка",
      "Тимьян",
      "Овощи гриль",
      "Масло оливковое",
    ],
    allergens: [],
    kcal: 398,
    protein: 42,
    fat: 20,
    carbs: 5,
    tags: ["Главное блюдо", "Диетическое"],
  },
  {
    id: "bulgur",
    category: "sides",
    name: "Булгур с овощами",
    portion: "150 г",
    price: 240,
    fullness: 0.6,
    seed: 0,
    description:
      "Булгур с болгарским перцем, кабачком и свежей зеленью.",
    ingredients: ["Булгур", "Перец болгарский", "Кабачок", "Петрушка"],
    allergens: ["Пшеница"],
    kcal: 212,
    protein: 8,
    fat: 6,
    carbs: 34,
    tags: ["Гарнир", "Вегетарианское", "Постное"],
  },
  {
    id: "mashed",
    category: "sides",
    name: "Картофельное пюре",
    portion: "150 г",
    price: 210,
    fullness: 0.5,
    seed: 4,
    description:
      "Нежное пюре на сливках со сливочным маслом.",
    ingredients: ["Картофель", "Сливки 20%", "Масло сливочное"],
    allergens: ["Молоко"],
    kcal: 238,
    protein: 5,
    fat: 12,
    carbs: 28,
    tags: ["Гарнир", "Вегетарианское"],
  },
  {
    id: "tiramisu",
    category: "desserts",
    name: "Тирамису",
    portion: "120 г",
    price: 390,
    fullness: 0.7,
    seed: 2,
    description:
      "Воздушный крем из маскарпоне с печеньем савоярди и ароматным эспрессо.",
    ingredients: ["Маскарпоне", "Печенье савоярди", "Сливки", "Эспрессо", "Какао"],
    allergens: ["Пшеница", "Молоко", "Яйцо"],
    kcal: 386,
    protein: 7,
    fat: 22,
    carbs: 38,
    tags: ["Десерт", "Популярное"],
  },
  {
    id: "charlotte",
    category: "desserts",
    name: "Шарлотка",
    portion: "120 г",
    price: 340,
    fullness: 0.6,
    seed: 1,
    description:
      "Классическая шарлотка с яблочной начинкой и ванильным кремом.",
    ingredients: ["Яблоки", "Яйца", "Сахар", "Мука", "Сливки"],
    allergens: ["Пшеница", "Яйцо", "Молоко"],
    kcal: 312,
    protein: 5,
    fat: 14,
    carbs: 42,
    tags: ["Десерт", "Домашнее"],
  },
  {
    id: "mousse",
    category: "desserts",
    name: "Мусс из чёрной смородины",
    portion: "100 г",
    price: 310,
    fullness: 0.5,
    seed: 5,
    description:
      "Воздушный мусс с ягодным пюре и тонкой миндальной крошкой.",
    ingredients: ["Смородина", "Сливки", "Сахар", "Миндаль"],
    allergens: ["Молоко", "Орехи"],
    kcal: 248,
    protein: 4,
    fat: 12,
    carbs: 28,
    tags: ["Десерт", "Лёгкое"],
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