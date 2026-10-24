import { useEffect, useMemo, useRef, useState } from "react";
import { apiFetch } from "./api";
import { useTelegram } from "./hooks/useTelegram";
import {
  DISHES as FALLBACK_DISHES,
  DISH_CATEGORIES as FALLBACK_CATEGORIES,
  FORMATS as FALLBACK_FORMATS,
  STYLES as FALLBACK_STYLES,
} from "./data/catalog";
import { useOrder } from "./hooks/useOrder";
import { CatalogContext } from "./catalogContext.js";

function normalizeCatalog(menu, styles, formats) {
  const dishes = (menu.dishes ?? []).map((dish, index) => ({
    id: dish.id,
    category: dish.category_id,
    categoryName: dish.category_name,
    name: dish.title,
    portion: `${dish.weight_grams} г`,
    price: Number(dish.price_client),
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
  }));

  const categories = [...new Map(
    dishes.map((dish) => [dish.category, { id: dish.category, label: dish.categoryName }]),
  ).values()];

  return {
    dishes,
    categories,
    styles: (styles.styles ?? []).map((style, index) => ({
      id: style.id,
      name: style.name,
      tags: [],
      seed: index % 6,
      description: style.description ?? "",
    })),
    formats: (formats.formats ?? []).map((format, index) => ({
      id: format.id,
      name: format.name,
      description: format.description,
      priceFrom: Number(format.price_per_person),
      seed: index % 6,
    })),
  };
}

const fallbackCatalog = {
  dishes: FALLBACK_DISHES,
  categories: FALLBACK_CATEGORIES,
  styles: FALLBACK_STYLES,
  formats: FALLBACK_FORMATS,
};

export function CatalogProvider({ children }) {
  const telegram = useTelegram();
  const { order, dispatch } = useOrder();
  const orderRef = useRef(order);
  const [catalog, setCatalog] = useState(fallbackCatalog);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderRef.current = order;
  }, [order]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      apiFetch("/serviceDetails/menu", {}, telegram.webApp).then((response) => {
        if (!response.ok) throw new Error(`menu: ${response.status}`);
        return response.json();
      }),
      apiFetch("/serviceDetails/styles", {}, telegram.webApp).then((response) => {
        if (!response.ok) throw new Error(`styles: ${response.status}`);
        return response.json();
      }),
      apiFetch("/serviceDetails/format", {}, telegram.webApp).then((response) => {
        if (!response.ok) throw new Error(`formats: ${response.status}`);
        return response.json();
      }),
    ])
      .then(([menu, styles, formats]) => {
        if (cancelled) return;
        const next = normalizeCatalog(menu, styles, formats);
        setCatalog(next);

        const dishIds = new Set(next.dishes.map((dish) => dish.id));
        const currentOrder = orderRef.current;
        const dishes = Object.fromEntries(
          Object.entries(currentOrder.dishes).filter(([id]) => dishIds.has(Number(id))),
        );
        dispatch({ type: "setField", field: "dishes", value: dishes });
        if (!next.styles.some((style) => style.id === currentOrder.styleId) && next.styles[0]) {
          dispatch({ type: "setField", field: "styleId", value: next.styles[0].id });
        }
        if (!next.formats.some((format) => format.id === currentOrder.formatId) && next.formats[0]) {
          dispatch({ type: "setField", field: "formatId", value: next.formats[0].id });
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [telegram.webApp, dispatch]);

  const value = useMemo(() => ({ catalog, loading }), [catalog, loading]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}
