import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import StepCounter from "../components/StepCounter";
import SegmentedTabs from "../components/SegmentedTabs";
import Chip from "../components/Chip";
import ProgressRing from "../components/ProgressRing";
import Placeholder from "../components/Placeholder";
import { QuantityStepper } from "../components/QuantityStepper";
import Button from "../components/Button";
import { STEPS } from "../data/catalog";
import { useCatalog } from "../catalogContext.js";
import { useOrder } from "../hooks/useOrder";
import {
  SATIETY_OPTIMAL_MAX,
  SATIETY_OPTIMAL_MIN,
  getSatiety,
} from "../store/selectors";

const SATIETY_MODES = [
  { id: "perPerson", label: "На человека" },
  { id: "perCompany", label: "На всю компанию" },
];

function getHint(value) {
  if (value === 0) return "Начните выбирать блюда";
  if (value < SATIETY_OPTIMAL_MIN) return "Добавьте ещё блюд";
  if (value > SATIETY_OPTIMAL_MAX) return "Немного перебор — уберите лишнее";
  return "Отличный выбор";
}

export default function ChooseDishesPage() {
  const navigate = useNavigate();
  const { order, dispatch } = useOrder();
  const { catalog } = useCatalog();
  const [category, setCategory] = useState(null);

  const activeCategory = category ?? catalog.categories[0]?.id;

  const dishes = useMemo(
    () => catalog.dishes.filter((dish) => dish.category === activeCategory),
    [catalog.dishes, activeCategory],
  );

  const perPerson = order.satietyMode === "perPerson";
  const satiety = getSatiety(order.dishes, order.guests, perPerson, catalog);
  const tone =
    satiety < SATIETY_OPTIMAL_MIN
      ? "low"
      : satiety > SATIETY_OPTIMAL_MAX
        ? "high"
        : "ok";

  const setQuantity = (id) => (quantity) =>
    dispatch({ type: "setDishQuantity", id, quantity });

  return (
    <PageShell
      docTitle="Меню"
      contentClassName="flex flex-col pb-6"
      footer={<Button onClick={() => navigate(STEPS[2].next)}>{STEPS[2].label}</Button>}
    >
      <StepCounter
        className="pt-3 pb-6"
        currentStep={3}
        onStepClick={(step) => navigate(STEPS[step - 1].path)}
      />

      <PageHeader
        title="Меню"
        subtitle="Подберите блюда и следите за шкалой сытости"
        className="mb-5"
      />

      <SegmentedTabs
        className="mb-4"
        options={SATIETY_MODES}
        value={order.satietyMode}
        onChange={(value) => dispatch({ type: "setField", field: "satietyMode", value })}
      />

      <div className="flex items-center gap-4 rounded-card border border-line bg-card px-4 py-4">
        <ProgressRing value={satiety} size={78} stroke={9} tone={tone} />

        <div className="min-w-0">
          <p className="text-[14px] leading-tight font-semibold text-ink">
            Сытость {perPerson ? "на человека" : "на всю компанию"}
          </p>
          <p className="mt-1 text-[12.5px] text-muted">
            Оптимум: {SATIETY_OPTIMAL_MIN}–{SATIETY_OPTIMAL_MAX}%
          </p>
          <p className="mt-0.5 text-[12.5px] text-muted">{getHint(satiety)}</p>
        </div>
      </div>

      <div className="scrollbar-none -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 sm:-mx-6 sm:px-6">
        {catalog.categories.map((item) => (
          <Chip
            key={item.id}
            label={item.label}
            active={item.id === activeCategory}
            onClick={() => setCategory(item.id)}
            className="shrink-0"
          />
        ))}
      </div>

      <ul className="mt-4 flex flex-col gap-2.5">
        {dishes.map((dish) => (
          <li
            key={dish.id}
            className="flex items-center gap-1 rounded-card border border-line bg-card pr-2.5"
          >
            {/* Название и фото — соседние кнопки со степпером, а не вложенные в него:
                button внутри button невалиден. */}
            <button
              type="button"
              onClick={() => navigate(`/dish/${dish.id}`, { state: { from: "/menu" } })}
              className="flex min-w-0 flex-1 items-center gap-3 rounded-l-card p-2.5 text-left transition-colors hover:bg-canvas/70"
            >
              <Placeholder
                seed={dish.seed}
                className="h-12 w-12 shrink-0 rounded-[10px]"
              />

              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-medium text-ink">
                  {dish.name}
                </span>
                <span className="block text-[12px] text-muted">{dish.portion}</span>
              </span>
            </button>

            <QuantityStepper
              compact
              value={order.dishes[dish.id] ?? 0}
              onChange={setQuantity(dish.id)}
            />
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
