import { useNavigate } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";
import { formatPrice, formatUnitPrice, unitLabel } from "../data/catalog";
import { SnowflakeIcon, PlusIcon } from "./icons";
import ProductVisual from "./ProductVisual";

export default function ProductCard({ product, qty = 0, onAdd, index = 0 }) {
  const navigate = useNavigate();
  const telegram = useTelegram();

  const open = () => {
    telegram.haptic("light");
    navigate(`/product/${product.id}`);
  };

  const add = (event) => {
    event.stopPropagation();
    telegram.haptic("medium");
    onAdd(product, product.unit === "kg" ? 0.5 : 1);
  };

  return (
    <div
      className={[
        "group animate-fade-up flex w-full items-center gap-3 rounded-card bg-card p-3 text-left",
        "shadow-soft transition-[transform,box-shadow] duration-200",
        product.available
          ? "hover:shadow-card active:scale-[0.99]"
          : "opacity-60 saturate-50",
      ].join(" ")}
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <button
        type="button"
        onClick={open}
        aria-label={`${product.name} — подробнее`}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
      >
        <ProductVisual product={product} />

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14.5px] font-bold tracking-tight text-ink">
            {product.name}
          </span>
          <span className="mt-0.5 block truncate text-[12px] text-muted">
            {product.portion} · {product.origin}
          </span>
          <span className="mt-1.5 flex items-center gap-2">
            <span className="text-[14.5px] font-extrabold text-accent-strong tabular-nums">
              {formatUnitPrice(product)}
            </span>
            {product.storage.startsWith("заморозка") && (
              <span className="inline-flex items-center gap-1 rounded-full bg-canvas px-2 py-0.5 text-[10.5px] font-semibold text-muted">
                <SnowflakeIcon className="h-3 w-3" /> заморозка
              </span>
            )}
          </span>
        </span>
      </button>

      <span className="shrink-0">
        {!product.available ? (
          <span className="rounded-xl bg-canvas px-3 py-2 text-[12px] font-semibold text-muted">
            Нет в наличии
          </span>
        ) : qty > 0 ? (
          <button
            type="button"
            onClick={open}
            aria-label={`${product.name}: в корзине ${qty} ${unitLabel(product.unit)} за ${formatPrice(product.price * qty)}. Открыть товар`}
            className="animate-pop flex min-w-[64px] flex-col items-center rounded-xl bg-sea px-3 py-1.5 text-white shadow-soft transition-transform active:scale-95"
          >
            <span className="text-[13px] leading-none font-bold tabular-nums">
              {qty} {unitLabel(product.unit)}
            </span>
            <span className="mt-0.5 text-[11px] leading-none opacity-85 tabular-nums">
              {formatPrice(product.price * qty)}
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={add}
            aria-label={`Добавить ${product.name} в корзину`}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-cta text-white shadow-glow transition-transform duration-200 hover:brightness-110 active:scale-90"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        )}
      </span>
    </div>
  );
}
