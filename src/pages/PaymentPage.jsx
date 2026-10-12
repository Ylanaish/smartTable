import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import RadioCircle from "../components/RadioCircle";
import { CardLogos } from "../components/CardLogos";
import Button from "../components/Button";
import { useTelegram } from "../hooks/useTelegram";
import { useOrders } from "../hooks/useOrders";
import { useOrder } from "../hooks/useOrder";
import { currentTime, generateOrderNo } from "../store/orderReducer";
import { PAYMENT_METHODS, PREPAYMENT_PERCENT } from "../data/catalog";
import {
  formatPrice,
  getFormat,
  getOrderTotal,
  getPrepayment,
} from "../store/selectors";

export default function PaymentPage() {
  const navigate = useNavigate();
  const telegram = useTelegram();
  const { addOrder } = useOrders();
  const { order, dispatch } = useOrder();

  const total = getOrderTotal(order);
  const prepayment = getPrepayment(total);

  const select = (id) => {
    telegram.haptic("light");
    dispatch({ type: "setField", field: "payMethod", value: id });
  };

  const handlePay = () => {
    telegram.notification("success");

    const orderNo = order.orderNo || generateOrderNo();
    const paidAt = currentTime();

    // Сначала фиксируем номер и время, потом пишем их и в черновик, и в историю,
    // чтобы оба источника показывали один и тот же заказ.
    addOrder({ ...order, orderNo, paidAt });
    dispatch({ type: "pay", method: order.payMethod, orderNo, paidAt });

    navigate("/tracking");
  };

  return (
    <PageShell
      docTitle="Оплата"
      contentClassName="pb-6"
      footer={
        <Button icon="none" onClick={handlePay}>
          Оплатить {formatPrice(prepayment)}
        </Button>
      }
    >
      <PageHeader title="Оплата" className="pt-6 pb-5" />

      <div className="flex flex-col gap-4">
        <section className="rounded-card border border-line bg-card px-4 py-4">
          <p className="text-[13px] text-muted">Сумма заказа</p>
          <p className="mt-1 text-[28px] leading-none font-bold tracking-[-0.02em] text-ink">
            {formatPrice(total)}
          </p>
          <p className="mt-1.5 text-[12px] text-muted">
            ({order.guests} персон, {getFormat(order.formatId)?.name.toLowerCase()})
          </p>
        </section>

        <section>
          <h2 className="mb-2.5 text-[14px] font-semibold tracking-[-0.01em] text-ink">
            Способы оплаты
          </h2>

          <ul
            className="overflow-hidden rounded-card border border-line bg-card"
            role="radiogroup"
            aria-label="Способ оплаты"
          >
            {PAYMENT_METHODS.map((method, index) => {
              const isActive = method.id === order.payMethod;

              return (
                <li key={method.id} className={index > 0 ? "border-t border-line" : undefined}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => select(method.id)}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-canvas"
                  >
                    <RadioCircle size="sm" checked={isActive} />
                    <span className="min-w-0 flex-1 text-[13.5px] font-medium text-ink">
                      {method.label}
                    </span>
                    {method.id === "card" && <CardLogos />}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <aside className="flex gap-2.5 rounded-card border border-amber-line bg-amber-soft px-4 py-3.5">
          <span className="text-[14px] leading-none text-amber-text" aria-hidden="true">
            ✕
          </span>
          <p className="text-[12.5px] leading-snug text-amber-text">
            Предоплата {PREPAYMENT_PERCENT}% — {formatPrice(prepayment)}. Оставшуюся сумму —
            при доставке.
          </p>
        </aside>
      </div>
    </PageShell>
  );
}
