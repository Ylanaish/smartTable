import { apiFetch } from "../api";

function money(value) {
  return Number(value ?? 0);
}

function mapItems(items = []) {
  return items.map((item) => ({
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
}

function mapSummary(data) {
  const eventDate = data.datetime;
  return {
    id: data.id,
    orderNo: data.order_number,
    orderNumber: data.order_number,
    status: data.status,
    eventDate,
    time: eventDate?.slice(11, 16) ?? "",
    guests: data.person_count,
    guestCount: data.person_count,
    total: money(data.total_amount),
    totalAmount: money(data.total_amount),
  };
}

function mapDetails(data) {
  const eventDate = data.datetime;
  const items = mapItems(data.items);
  return {
    ...mapSummary({
      id: data.id,
      order_number: data.order_number,
      status: data.status,
      datetime: eventDate,
      person_count: data.person_count,
      total_amount: data.total_amount,
    }),
    serviceType: data.service_type,
    total: money(data.total_amount),
    totalAmount: money(data.total_amount),
    prepayment: money(data.prepaid_amount),
    prepaidAmount: money(data.prepaid_amount),
    address: data.delivery_address ?? "",
    clientPhone: data.client_phone ?? "",
    comment: data.comment ?? "",
    style: data.style,
    styleName: data.style?.name ?? "",
    formatName: data.service_type ?? "",
    dishes: items,
    items,
  };
}

function throwApiError(response) {
  return response.json()
    .then((body) => {
      throw new Error(typeof body.detail === "string" ? body.detail : `orders: ${response.status}`);
    })
    .catch((error) => {
      throw error instanceof Error ? error : new Error(`orders: ${response.status}`);
    });
}

export class OrderHistoryRepository {
  constructor(webApp) {
    this.webApp = webApp;
  }

  async getAll() {
    const response = await apiFetch("/orders/", {}, this.webApp);
    if (!response.ok) return throwApiError(response);
    return (await response.json()).map(mapSummary);
  }

  async getById(orderId) {
    const response = await apiFetch(`/orders/${encodeURIComponent(orderId)}`, {}, this.webApp);
    if (!response.ok) return throwApiError(response);
    return mapDetails(await response.json());
  }
}

export { mapDetails, mapSummary };
export default OrderHistoryRepository;
