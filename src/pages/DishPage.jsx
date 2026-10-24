import { useNavigate, useParams, useLocation } from "react-router-dom";
import PageShell from "../components/PageShell";
import Placeholder from "../components/Placeholder";
import Button from "../components/Button";
import { QuantityStepper } from "../components/QuantityStepper";
import { ArrowLeftIcon } from "../components/icons";
import { useOrder } from "../hooks/useOrder";
import { useCatalog } from "../catalogContext.js";
import { formatPrice, getCategoryLabel, getDish } from "../store/selectors";

const ORIGINS = {
  "/catalog": { back: "/catalog", label: "Вернуться в каталог", hint: "Каталог блюд" },
  "/menu": { back: "/menu", label: "Вернуться к меню", hint: "Меню" },
};

const DEFAULT_ORIGIN = ORIGINS["/menu"];

function Section({ title, children }) {
  return (
    <section>
      <h2 className="mb-2 text-[14px] font-semibold tracking-[-0.01em] text-ink">{title}</h2>
      {children}
    </section>
  );
}

function Nutrient({ label, value }) {
  return (
    <div className="rounded-[10px] bg-canvas px-3 py-2.5">
      <p className="text-[17px] leading-none font-bold tabular-nums text-ink">{value}</p>
      <p className="mt-1 text-[11.5px] text-muted">{label}</p>
    </div>
  );
}

export default function DishPage() {
  const navigate = useNavigate();
  const { dishId } = useParams();
  const location = useLocation();
  const { order, dispatch } = useOrder();
  const { catalog } = useCatalog();

  const dish = getDish(Number(dishId), catalog);

  if (!dish) {
    return (
      <PageShell
        docTitle="Блюдо не найдено"
        contentClassName="pb-6"
        footer={
          <Button icon="none" onClick={() => navigate("/catalog", { replace: true })}>
            В каталог
          </Button>
        }
      >
        <div className="pt-10 text-center">
          <h1 className="text-[20px] font-bold tracking-tight text-ink">Блюдо не найдено</h1>
          <p className="mt-1 text-[13.5px] text-muted">
            Такого блюда нет в меню — возможно, его убрали
          </p>
        </div>
      </PageShell>
    );
  }

  const origin = ORIGINS[location.state?.from] ?? DEFAULT_ORIGIN;
  const quantity = order.dishes[dish.id] ?? 0;

  return (
    <PageShell
      docTitle={dish.name}
      contentClassName="pb-6"
      footer={
        <div className="flex items-center gap-2.5">
          <QuantityStepper
            value={quantity}
            onChange={(next) =>
              dispatch({ type: "setDishQuantity", id: dish.id, quantity: next })
            }
          />
          <div className="flex-1">
            <Button icon="none" onClick={() => navigate(origin.back)}>
              {origin.label}
            </Button>
          </div>
        </div>
      }
    >
      <button
        type="button"
        onClick={() => navigate(origin.back)}
        className="mt-4 mb-3 inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        {origin.hint}
      </button>

      <div className="relative">
        <Placeholder seed={dish.seed} className="aspect-[4/3] w-full rounded-card" />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] leading-none font-medium text-ink backdrop-blur-sm">
          {getCategoryLabel(dish.category, catalog)}
        </span>
      </div>

      <h1 className="mt-4 text-[clamp(20px,5.2vw,25px)] leading-tight font-bold tracking-[-0.02em] text-ink">
        {dish.name}
      </h1>

      <p className="mt-1.5 text-[13.5px] text-muted">
        {dish.portion} ·{" "}
        <span className="font-medium text-accent">{formatPrice(dish.price)}</span> за порцию
      </p>

      <p className="mt-3 text-[14px] leading-relaxed text-ink/80">{dish.description}</p>

      {dish.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {dish.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-brand-soft px-2 py-1 text-[11px] leading-none font-medium text-brand"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-5">
        <Section title="Состав">
          <ul className="flex flex-wrap gap-1.5">
            {dish.ingredients.map((item) => (
              <li
                key={item}
                className="rounded-[10px] border border-line bg-card px-2.5 py-1.5 text-[12px] text-ink/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {dish.allergens.length > 0 && (
          <Section title="Аллергены">
            <div className="rounded-card border border-amber-line bg-amber-soft px-4 py-3">
              <p className="text-[12.5px] leading-snug text-amber-text">
                Содержит: {dish.allergens.join(", ")}
              </p>
            </div>
          </Section>
        )}

        <Section title="Пищевая ценность">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Nutrient label="ккал" value={dish.kcal} />
            <Nutrient label="белки, г" value={dish.protein} />
            <Nutrient label="жиры, г" value={dish.fat} />
            <Nutrient label="углеводы, г" value={dish.carbs} />
          </div>
        </Section>

        <Section title="Вклад в сытость">
          <div className="flex items-center justify-between rounded-card border border-line bg-card px-4 py-3.5">
            <span className="text-[13.5px] text-ink/80">Одна порция</span>
            <span className="text-[13.5px] font-semibold tabular-nums text-ink">
              {dish.fullness.toFixed(1).replace(".", ",")} усл. порции
            </span>
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
