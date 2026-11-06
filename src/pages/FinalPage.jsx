import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import Button from "../components/Button";
import { COLLECTION, getZone, unitLabel } from "../data/catalog";
import { useOrder } from "../hooks/useOrder";
import { useTelegram } from "../hooks/useTelegram";
import { CheckIcon, PhoneIcon, ReceiptIcon } from "../components/icons";

export default function FinalPage() {
  const navigate = useNavigate();
  const telegram = useTelegram();
  const { order } = useOrder();
  const zone = getZone(order.zoneId);

  const fullAddress = [
    zone?.name,
    order.street && `ул. ${order.street}`,
    order.house && `д. ${order.house}`,
    order.apartment,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <PageShell contentClassName="pb-4">
      <div className="animate-fade-up mt-6 flex flex-col items-center text-center">
        <span className="animate-pop flex h-16 w-16 items-center justify-center rounded-full bg-sea-soft text-sea-deep shadow-card">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h1 className="mt-4 text-[24px] leading-tight font-extrabold tracking-[-0.02em] text-ink">
          Заявка {order.orderNo} принята
        </h1>
        <p className="mt-1.5 max-w-[300px] text-[13.5px] leading-snug font-medium text-muted">
          Для уточнений менеджер свяжется с вами по указанному телефону.
        </p>
      </div>

      <section
        className="animate-fade-up mt-5 rounded-card bg-card p-4 shadow-soft"
        style={{ animationDelay: "90ms" }}
      >
        <p className="text-[12px] font-extrabold tracking-widest text-sea uppercase">Состав заказа</p>
        <ul className="mt-2.5 flex flex-col gap-1.5 text-[14px]">
          {order.items.map((item) => (
            <li key={item.productId} className="flex justify-between gap-3">
              <span className="text-ink">
                {item.name} — {item.qty} {unitLabel(item.unit)}
              </span>
              <span className="shrink-0 font-bold tabular-nums text-ink">
                {item.price != null && `${(item.price * item.qty).toLocaleString("ru-RU")} ₽`}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-3 flex flex-col gap-2.5 border-t border-line pt-3 text-[13.5px]">
          <div>
            <dt className="font-medium text-muted">Адрес</dt>
            <dd className="mt-0.5 font-bold text-ink">{fullAddress || "—"}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted">Телефон</dt>
            <dd className="mt-0.5 font-bold text-ink">{order.phone || "—"}</dd>
          </div>
          <div>
            <dt className="font-medium text-muted">Доставка</dt>
            <dd className="mt-0.5 font-bold text-ink">
              {order.deliveryMode === "fixed"
                ? `${new Date(COLLECTION.deliveryDate).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                  })}, выбранный интервал`
                : "менеджер согласует интервал и сумму доставки"}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-muted">Сумма</dt>
            <dd className="mt-0.5 text-[16px] font-extrabold text-ink">
              {order.total != null
                ? `${order.total.toLocaleString("ru-RU")} ₽`
                : "ожидает подтверждения менеджером"}
            </dd>
          </div>
        </dl>
      </section>

      <div
        className="animate-fade-up mt-5 flex flex-col gap-2.5"
        style={{ animationDelay: "150ms" }}
      >
        <Button variant="accent" icon="none" onClick={() => navigate("/orders")}>
          <span className="flex items-center gap-2">
            <ReceiptIcon className="h-[18px] w-[18px]" /> Мои заявки
          </span>
        </Button>
        <Button variant="light" icon="none" onClick={() => telegram.haptic("light")}>
          <span className="flex items-center gap-2">
            <PhoneIcon className="h-[18px] w-[18px]" /> Связаться с менеджером
          </span>
        </Button>
      </div>
    </PageShell>
  );
}
