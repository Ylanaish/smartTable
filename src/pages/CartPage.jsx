import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import Button from "../components/Button";
import ProductVisual from "../components/ProductVisual";
import { formatPrice, unitLabel } from "../data/catalog";
import { useOrder } from "../hooks/useOrder";
import { useSupply } from "../store/supplyContext";
import { useTelegram } from "../hooks/useTelegram";
import { cartLines, itemsTotal } from "../store/selectors";
import { COLLECTION } from "../data/catalog";
import { CartIcon, MinusIcon, PlusIcon } from "../components/icons";

export default function CartPage() {
  const navigate = useNavigate();
  const telegram = useTelegram();
  const { order, dispatch } = useOrder();
  const { supply } = useSupply();
  const lines = cartLines(order.cart, supply?.products ?? []);
  const total = itemsTotal(order.cart, supply?.products ?? []);

  const change = (product, delta) => {
    const current = order.cart[product.id] ?? 0;
    const step = product.unit === "kg" ? 0.5 : 1;
    const next = current + delta * step;
    telegram.haptic("light");
    dispatch({ type: "setQty", id: product.id, qty: Math.max(0, next) });
  };

  const empty = (
    <div className="mt-4 flex flex-col items-center rounded-card bg-card px-6 py-12 text-center shadow-soft">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-canvas text-muted">
        <CartIcon className="h-6 w-6" />
      </span>
      <p className="mt-4 text-[15px] font-bold text-ink">Корзина пуста</p>
      <p className="mt-1 max-w-[240px] text-[13px] leading-snug text-muted">
        Загляните в текущий привоз — там свежая рыба и морепродукты.
      </p>
      <div className="mt-5 w-full">
        <Button variant="accent" onClick={() => navigate("/collection")}>
          К текущему привозу
        </Button>
      </div>
    </div>
  );

  return (
    <PageShell
      docTitle="Корзина"
      showNav
      footer={
        lines.length > 0 ? (
          <Button variant="accent" onClick={() => navigate("/checkout")}>
            Оформить заявку{total > 0 ? ` · ${formatPrice(total)}` : ""}
          </Button>
        ) : null
      }
    >
      <h1 className="mt-3 text-[24px] font-extrabold tracking-[-0.02em] text-ink">Корзина</h1>
      <p className="mt-1 text-[13px] font-medium text-muted">
        Привоз №{COLLECTION.id} · доставка{" "}
        {new Date(COLLECTION.deliveryDate).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
        })}
      </p>

      {lines.length === 0 ? (
        empty
      ) : (
        <ul className="mt-4 flex flex-col gap-2.5">
          {lines.map(({ product, qty }, i) => (
            <li
              key={product.id}
              className="animate-fade-up flex items-center gap-3 rounded-card bg-card p-3 shadow-soft"
              style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
            >
              <ProductVisual product={product} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-bold text-ink">
                  {product.name}
                </span>
                {product.price > 0 && (
                  <>
                    <span className="mt-0.5 block text-[12px] text-muted">
                      {formatPrice(product.price)} / {unitLabel(product.unit)}
                    </span>
                    <span className="mt-0.5 block text-[14px] font-extrabold text-accent-strong tabular-nums">
                      {formatPrice(product.price * qty)}
                    </span>
                  </>
                )}
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => change(product, -1)}
                  aria-label={`Уменьшить ${product.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-canvas text-ink-soft transition-colors hover:bg-line/50 active:scale-90"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="min-w-10 text-center text-[14px] font-extrabold tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => change(product, 1)}
                  aria-label={`Увеличить ${product.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-sea text-white shadow-soft transition-transform hover:bg-sea-deep active:scale-90"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
