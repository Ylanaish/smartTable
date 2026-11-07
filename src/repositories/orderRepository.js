import { apiFetch } from "../api";

// POST /orders — backend берёт supply_id из активного привоза сам и
// пересчитывает цены по базе; клиент присылает только идентификаторы и количества.
export default class OrderRepository {
  constructor(webApp) {
    this.webApp = webApp;
  }

  // items: [{ product_id, quantity }]
  // Возвращает { id, order_number, status, total_amount, comment, items }
  async createOrder({ phone, address, comment, items }) {
    const response = await apiFetch(
      "/orders/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, address, comment, items }),
      },
      this.webApp,
    );
    if (!response.ok) {
      let detail = `Ошибка оформления: ${response.status}`;
      try {
        const data = await response.json();
        if (typeof data.detail === "string") detail = data.detail;
      } catch {
        // тело не JSON — оставляем статус
      }
      throw new Error(detail);
    }
    return response.json();
  }

  // GET /orders — список заявок пользователя.
  // Возвращает [{ id, order_number, status, datetime, total_amount }]
  async getAll() {
    const response = await apiFetch("/orders/", {}, this.webApp);
    if (!response.ok) {
      throw new Error(`Не удалось загрузить заявки: ${response.status}`);
    }
    return response.json();
  }

  // GET /orders/{id} — детальная карточка заявки.
  async getById(orderId) {
    const response = await apiFetch(`/orders/${orderId}`, {}, this.webApp);
    if (!response.ok) {
      throw new Error(`Не удалось загрузить заявку: ${response.status}`);
    }
    return response.json();
  }
}
