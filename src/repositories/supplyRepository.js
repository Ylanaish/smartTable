import { apiFetch, API_BASE_URL } from "../api";

// image_url у админа — это telegram file_id; картинки раздаёт публичный эндпоинт
function mapPhoto(imageUrl) {
  if (!imageUrl) return null;
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${API_BASE_URL}/serviceDetails/product-image/${imageUrl}`;
}

// Нормализация товара API под форму карточек каталога (data/catalog.js)
function mapProduct(item) {
  return {
    id: item.id,
    category: item.category_name ?? "Без категории",
    name: item.title,
    description: item.description ?? null,
    photo: mapPhoto(item.image_url),
    emoji: null,
    unit: item.unit,
    portion: null,
    price: item.price_per_unit,
    origin: null,
    storage: null,
    available: item.is_available,
  };
}

export default class SupplyRepository {
  constructor(webApp) {
    this.webApp = webApp;
  }

  // { supplyId, title, description, closeAt, deliveryDate, products: [] }
  // supplyId === null => активного привоза нет
  async getActiveSupply() {
    const response = await apiFetch("/serviceDetails/supply", {}, this.webApp);
    if (!response.ok) {
      throw new Error(`Не удалось загрузить привоз: ${response.status}`);
    }

    const data = await response.json();
    return {
      supplyId: data.supply_id,
      title: data.title,
      description: data.description,
      closeAt: data.close_at ? new Date(data.close_at) : null,
      deliveryDate: data.planned_delivery_date
        ? new Date(data.planned_delivery_date)
        : null,
      products: (data.products ?? []).map(mapProduct),
    };
  }
}
