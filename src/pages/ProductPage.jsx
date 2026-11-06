import { useNavigate, useParams } from "react-router-dom";
import PageShell from "../components/PageShell";
import Button from "../components/Button";
import ProductVisual from "../components/ProductVisual";
import { getProduct, formatPrice, formatUnitPrice, unitLabel } from "../data/catalog";
import { useOrder } from "../hooks/useOrder";
import { useTelegram } from "../hooks/useTelegram";
import { SnowflakeIcon, MinusIcon, PlusIcon } from "../components/icons";

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const telegram = useTelegram();
  const { order, dispatch } = useOrder();
  const product = getProduct(productId);

  if (!product) {
    return (
      <PageShell docTitle="Товар не найден" showNav>
        <div className="mt-8 rounded-card bg-card px-6 py-12 text-center shadow-soft">
          <p className="text-[15px] font-bold">Товар не найден</p>
          <div className="mt-5">
            <Button onClick={() => navigate("/collection")}>К привозу</Button>
          </div>
        </div>
      </PageShell>
    );
  }

  const qty = order.cart[product.id] ?? 0;
  const isWeight = product.unit === "kg";

  const setQty = (next) => {
    telegram.haptic("light");
    dispatch({ type: "setQty", id: product.id, qty: next });
  };

  const changeStep = (dir) => {
    const step = isWeight ? 0.5 : 1;
    const next = dir < 0 ? Math.max(0, +(qty - step).toFixed(2)) : qty + step;
    setQty(next);
  };

  return (
    <PageShell
      docTitle={product.name}
      showNav
      headerBack
      footer={
        product.available && qty > 0 ? (
          <Button variant="accent" onClick={() => navigate("/cart")}>
            В корзину · {formatPrice(product.price * qty)}
          </Button>
        ) : null
      }
    >
      <div className="animate-fade-up mt-2 flex h-44 items-center justify-center rounded-card shadow-soft">
        <ProductVisual product={product} size="lg" className="w-full rounded-card" />
      </div>

      <div className="animate-fade-up" style={{ animationDelay: "70ms" }}>
        <h1 className="mt-4 text-[24px] leading-tight font-extrabold tracking-[-0.02em] text-ink">
          {product.name}
        </h1>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-sea-soft px-3 py-1 text-[12px] font-bold text-sea-deep">
            {formatUnitPrice(product)}
          </span>
          <span className="rounded-full bg-canvas px-3 py-1 text-[12px] font-semibold text-muted">
            {product.portion}
          </span>
          {product.storage.startsWith("заморозка") ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-canvas px-3 py-1 text-[12px] font-semibold text-muted">
              <SnowflakeIcon className="h-3.5 w-3.5" /> заморозка
            </span>
          ) : (
            <span className="rounded-full bg-accent-soft px-3 py-1 text-[12px] font-semibold text-accent-dark">
              охлаждённое
            </span>
          )}
        </div>

        <dl className="mt-4 flex flex-col gap-2.5 rounded-card bg-card p-4 text-[13.5px] shadow-soft">
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Происхождение</dt>
            <dd className="font-bold text-ink">{product.origin}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Хранение</dt>
            <dd className="text-right font-bold text-ink">{product.storage}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Фасовка</dt>
            <dd className="font-bold text-ink">
              {isWeight ? "весовой, шаг 0.5 кг" : product.portion}
            </dd>
          </div>
        </dl>
      </div>

      {isWeight && (
        <p className="mt-3 rounded-card bg-amber-soft/70 border border-amber-line/40 px-4 py-3 text-[12.5px] leading-snug font-medium text-ink-soft">
          Цена за килограмм. Итоговая стоимость рассчитывается по фактическому весу — менеджер
          подтвердит сумму после комплектации привоза.
        </p>
      )}

      {product.available ? (
        <div className="mt-4 flex items-center justify-between rounded-card bg-card p-3 shadow-soft">
          <span className="text-[14px] font-bold text-ink">
            Количество{isWeight ? ", кг" : ""}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => changeStep(-1)}
              disabled={qty === 0}
              aria-label="Уменьшить количество"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-canvas text-ink transition-colors hover:bg-line/50 active:scale-90 disabled:opacity-35"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="min-w-14 text-center text-[16px] font-extrabold tabular-nums text-ink">
              {qty} {unitLabel(product.unit)}
            </span>
            <button
              type="button"
              onClick={() => changeStep(1)}
              aria-label="Увеличить количество"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-cta text-white shadow-glow transition-transform hover:brightness-110 active:scale-90"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-4 rounded-card bg-card px-4 py-4 text-center text-[13.5px] font-bold text-muted shadow-soft">
          Этой позиции нет в текущем привозе
        </p>
      )}
    </PageShell>
  );
}
