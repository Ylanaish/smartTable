import { apiFetch } from "../api";

function money(value) {
  return Number(value ?? 0);
}

function mapCatalog(menu, styles, formats) {
  const dishes = (menu.dishes ?? []).map((dish, index) => ({
    id: Number(dish.id),
    category: dish.category_id == null ? null : Number(dish.category_id),
    categoryName: dish.category_name,
    name: dish.title,
    portion: `${dish.weight_grams} г`,
    price: money(dish.price_client),
    // Backend пока не хранит пищевую ценность и fullness.
    fullness: 1,
    seed: index % 6,
    description: dish.description ?? "",
    ingredients: [],
    allergens: [],
    kcal: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    tags: [],
    imageUrl: dish.image_url,
  }));

  return {
    dishes,
    categories: [...new Map(
      dishes
        .filter((dish) => dish.category != null)
        .map((dish) => [dish.category, { id: dish.category, label: dish.categoryName ?? "" }]),
    ).values()],
    styles: (styles.styles ?? []).map((style, index) => ({
      id: style.id,
      name: style.name,
      tags: [],
      seed: index % 6,
      description: style.description ?? "",
      photos: style.photos ?? [],
      priceTurnkey: money(style.price_turnkey),
    })),
    formats: (formats.formats ?? []).map((format, index) => ({
      id: format.id,
      name: format.name,
      description: format.description,
      priceFrom: money(format.price_per_person),
      seed: index % 6,
      imageUrl: format.image_url,
    })),
  };
}

function readError(response, fallback) {
  return response.json()
    .then((body) => {
      const detail = typeof body.detail === "string" ? body.detail : fallback;
      throw new Error(detail);
    })
    .catch((error) => {
      if (error instanceof Error && error.message !== fallback) throw error;
      throw new Error(fallback);
    });
}

function serviceType(formatId) {
  if (Number(formatId) === 2) return "eco";
  if (Number(formatId) === 3) return "turnkey";
  return "boxes";
}

function mapCreatedOrder(data, draft) {
  const eventDate = data.datetime ?? `${draft.date}T${draft.time}:00`;
  const items = (data.items ?? []).map((item) => ({
    id: item.id,
    dishId: item.dish_id,
    name: item.dish_title,
    title: item.dish_title,
    portion: `${item.dish_weight_grams} г`,
    price: money(item.dish_price_client),
    qty: item.quantity,
    quantity: item.quantity,
    priceAtMoment: money(item.price_at_moment),
    weightAtMoment: item.weight_at_moment,
  }));

  return {
    id: data.id,
    orderNo: data.order_number,
    orderNumber: data.order_number,
    status: data.status,
    eventDate,
    time: eventDate.slice(11, 16) || draft.time,
    guests: data.guest_count ?? draft.guests,
    guestCount: data.guest_count ?? draft.guests,
    address: draft.address ?? "",
    comment: data.comment ?? draft.comment ?? "",
    styleName: data.style?.name ?? "",
    formatName: draft.formatName ?? "",
    formatId: draft.formatId,
    total: money(data.total_amount),
    totalAmount: money(data.total_amount),
    prepayment: money(data.prepaid_amount),
    prepaidAmount: money(data.prepaid_amount),
    dishes: items,
    items,
  };
}

export class OrderCreationRepository {
  constructor(webApp) {
    this.webApp = webApp;
  }

  async getCatalog() {
    const load = (path, name) => apiFetch(path, {}, this.webApp).then((response) => {
      if (!response.ok) return readError(response, `${name}: ${response.status}`);
      return response.json();
    });

    const [menu, styles, formats] = await Promise.all([
      load("/serviceDetails/menu", "menu"),
      load("/serviceDetails/styles", "styles"),
      load("/serviceDetails/format", "formats"),
    ]);

    return mapCatalog(menu, styles, formats);
  }

  async createOrder(draft) {
    const response = await apiFetch("/orders/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_date: `${draft.date}T${draft.time}:00`,
        guest_count: draft.guests,
        format_id: draft.formatId,
        service_type: serviceType(draft.formatId),
        delivery_address: draft.address || "Не указан",
        client_phone: draft.clientPhone || "не указан",
        comment: draft.comment ?? "",
        style_id: draft.styleId,
        items: Object.entries(draft.dishes).map(([dish_id, quantity]) => ({
          dish_id: Number(dish_id),
          quantity,
        })),
      }),
    }, this.webApp);

    if (!response.ok) return readError(response, `orders: ${response.status}`);
    return mapCreatedOrder(await response.json(), draft);
  }
}

export default OrderCreationRepository;
