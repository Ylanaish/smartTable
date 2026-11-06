import { useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import CollectionTimer from "../components/CollectionTimer";
import ProductCard from "../components/ProductCard";
import { useSupply } from "../store/supplyContext";
import { useOrder } from "../hooks/useOrder";
import { cartLines, itemsTotal } from "../store/selectors";
import { formatPrice } from "../data/catalog";
import { CartIcon, CalendarIcon } from "../components/icons";

const deliveryLabel = (date) =>
  date.toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

function CatalogSkeleton() {
  return (
    <ul className="mt-3 flex flex-col gap-2.5" aria-busy="true" aria-label="Загрузка привоза">
      {[0, 1, 2].map((i) => (
        <li key={i} className="h-[76px] animate-pulse rounded-card bg-card shadow-soft" />
      ))}
    </ul>
  );
}

export default function CatalogPage() {
  const { order, dispatch } = useOrder();
  const { supply, loading, error } = useSupply();
  const [category, setCategory] = useState("all");

  const products = useMemo(() => supply?.products ?? [], [supply]);
  const closed = supply?.closeAt ? supply.closeAt <= new Date() : false;

  const categories = useMemo(
    () =>
      [...new Set(products.map((p) => p.category))].filter(Boolean).map((name) => ({
        id: name,
        label: name,
      })),
    [products],
  );

  const visible = useMemo(
    () =>
      category === "all" ? products : products.filter((p) => p.category === category),
    [category, products],
  );

  const lines = cartLines(order.cart);
  const total = itemsTotal(order.cart);

  const onAdd = (product, qty) => {
    dispatch({ type: "setQty", id: product.id, qty: (order.cart[product.id] ?? 0) + qty });
  };

  const noSupply = !loading && (supply == null || supply.supplyId == null);
  const showContent = !loading && !error && !noSupply;

  return (
    <PageShell
      docTitle="Текущий привоз"
      showNav
      headerOnDark
      contentClassName="pb-4"
    >
      {/* Хиро привоза */}
      <section className="-mx-4 -mt-[62px] bg-hero relative px-4 pt-[74px] pb-6 text-white sm:-mx-6 sm:px-6">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-[11px] font-bold tracking-wide uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7dd3a8]" aria-hidden="true" />
            Текущий привоз
          </span>
          <h1 className="mt-3 text-[clamp(23px,6.4vw,30px)] leading-tight font-extrabold tracking-[-0.02em]">
            {loading ? "Текущий привоз" : (supply?.title ?? "Текущий привоз").replace("Северный привоз", "Привоз")}
          </h1>
          {supply?.description && (
            <p className="mt-2 max-w-[340px] text-[13px] leading-snug font-medium text-white/70">
              {supply.description}
            </p>
          )}
        </div>

        <div className="mt-4 animate-fade-up" style={{ animationDelay: "80ms" }}>
          {showContent && <CollectionTimer closesAt={supply.closeAt ?? 0} closed={closed} />}
        </div>

        <div
          className="mt-3.5 flex animate-fade-up items-center gap-2"
          style={{ animationDelay: "140ms" }}
        >
          {supply?.deliveryDate && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white/85">
              <CalendarIcon className="h-3.5 w-3.5" />
              Доставка — {deliveryLabel(supply.deliveryDate)}
            </span>
          )}
        </div>

        {/* Мягкая волна-переход к подложке */}
        <svg
          className="absolute -bottom-px left-0 h-5 w-full text-canvas"
          viewBox="0 0 400 20"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 20h400V10c-66-10-133-10-200-3S66 17 0 10v10z" fill="currentColor" />
        </svg>
      </section>

      {loading && <CatalogSkeleton />}

      {error && (
        <div className="mt-6 rounded-card bg-card px-6 py-8 text-center shadow-soft">
          <p className="text-[15px] font-bold text-ink">Не удалось загрузить привоз</p>
          <p className="mt-1.5 text-[13px] leading-snug text-muted">
            Проверьте соединение и попробуйте ещё раз.
          </p>
        </div>
      )}

      {noSupply && (
        <div className="mt-6 rounded-card bg-card px-6 py-10 text-center shadow-soft">
          <p className="text-[15px] font-bold text-ink">Активных привозов нет</p>
          <p className="mt-1.5 text-[13px] leading-snug text-muted">
            Дата следующего привоза появится в боте.
          </p>
        </div>
      )}

      {showContent && closed && (
        <div className="mt-6 rounded-card bg-card px-6 py-10 text-center shadow-soft">
          <p className="text-[15px] font-bold text-ink">Сбор закрыт</p>
          <p className="mt-1.5 text-[13px] leading-snug text-muted">
            Новые заявки больше не принимаются. Дата следующего привоза появится в боте.
          </p>
        </div>
      )}

      {showContent && !closed && (
        <>
          <div
            className="scrollbar-none -mx-4 mt-3 flex animate-fade-up gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6"
            style={{ animationDelay: "180ms" }}
          >
            {[{ id: "all", label: "Всё" }, ...categories].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                aria-pressed={category === cat.id}
                className={[
                  "shrink-0 rounded-full px-4 py-2 text-[13px] font-bold transition-all duration-200",
                  category === cat.id
                    ? "bg-primary text-white shadow-soft"
                    : "bg-card text-ink-soft shadow-soft hover:shadow-card",
                ].join(" ")}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <ul className="mt-3 flex flex-col gap-2.5">
            {visible.map((product, i) => (
              // Ключ включает фильтр — список мягко пере-анимируется при смене категории.
              <li key={`${category}-${product.id}`}>
                <ProductCard
                  product={product}
                  qty={order.cart[product.id] ?? 0}
                  onAdd={onAdd}
                  index={i}
                />
              </li>
            ))}
          </ul>

          {visible.length === 0 && (
            <p className="mt-6 rounded-card bg-card px-6 py-8 text-center text-[13.5px] font-semibold text-muted shadow-soft">
              В этой категории пока нет товаров
            </p>
          )}
        </>
      )}

      {lines.length > 0 && showContent && !closed && (
        <div className="sticky bottom-0 z-20 -mx-4 mt-4 px-4 pt-3 pb-safe sm:-mx-6 sm:px-6">
          <button
            type="button"
            onClick={() => {
              window.location.hash = "#/cart";
            }}
            className="flex w-full items-center justify-between rounded-full bg-cta px-5 py-3.5 text-white shadow-glow transition-all duration-200 hover:brightness-110 active:scale-[0.99]"
          >
            <span className="flex items-center gap-2 text-[14.5px] font-bold">
              <CartIcon className="h-5 w-5" />
              Корзина · {lines.length} поз.
            </span>
            <span className="text-[16px] font-extrabold tabular-nums">{formatPrice(total)}</span>
          </button>
        </div>
      )}
    </PageShell>
  );
}
