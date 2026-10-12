import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import Chip from "../components/Chip";
import Placeholder from "../components/Placeholder";
import Button from "../components/Button";
import { DISHES, DISH_CATEGORIES } from "../data/catalog";
import { useOrder } from "../hooks/useOrder";
import { formatPrice } from "../store/selectors";

const CATEGORIES = [{ id: "all", label: "Все" }, ...DISH_CATEGORIES];

export default function CatalogPage() {
  const navigate = useNavigate();
  const { order } = useOrder();
  const [category, setCategory] = useState("all");

  const dishes = useMemo(
    () =>
      category === "all"
        ? DISHES
        : DISHES.filter((dish) => dish.category === category),
    [category],
  );

  return (
    <PageShell
      docTitle="Каталог блюд"
      contentClassName="flex flex-col pb-6"
      footer={<Button onClick={() => navigate("/menu")}>Выбрать блюда</Button>}
    >
      <PageHeader
        title="Каталог блюд"
        subtitle="Всё, что мы готовим на банкеты"
        className="pt-6 mb-5"
      />

      <div className="scrollbar-none -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 sm:-mx-6 sm:px-6">
        {CATEGORIES.map((item) => (
          <Chip
            key={item.id}
            label={item.label}
            active={item.id === category}
            onClick={() => setCategory(item.id)}
            className="shrink-0"
          />
        ))}
      </div>

      <ul className="flex flex-col gap-2.5">
        {dishes.map((dish) => {
          const qty = order.dishes[dish.id] ?? 0;

          return (
            <li
              key={dish.id}
              className="flex items-center gap-3 rounded-card border border-line bg-card p-2.5"
            >
              <Placeholder
                seed={dish.seed}
                className="h-12 w-12 shrink-0 rounded-[10px]"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-medium text-ink">{dish.name}</p>
                <p className="text-[12px] text-muted">
                  {dish.portion} · {formatPrice(dish.price)}
                </p>
              </div>

              {qty > 0 && (
                <span className="shrink-0 rounded-full bg-ink px-2.5 py-1 text-[11px] leading-none font-medium text-white tabular-nums">
                  {qty} в заказе
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-[12px] leading-relaxed text-muted">
        Цены указаны за одну порцию. Состав меню меняется — итоговую смету подтверждает
        менеджер.
      </p>
    </PageShell>
  );
}
