import { useNavigate, useParams } from "react-router-dom";
import PageShell from "../components/PageShell";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import { useOrders } from "../hooks/useOrders";
import { useTelegram } from "../hooks/useTelegram";
import { formatDateTime } from "../store/selectors";
import { PhoneIcon, ReceiptIcon, CheckIcon } from "../components/icons";
import { unitLabel } from "../data/catalog";

// Порядок этапов жизни заявки для вертикального таймлайна.
const TIMELINE = [
  { status: "new", label: "Заявка создана" },
  { status: "confirmed", label: "Подтверждена менеджером" },
  { status: "packing", label: "Комплектуется" },
  { status: "delivery", label: "Курьер в пути" },
  { status: "delivered", label: "Доставлена" },
];

const STATUS_INDEX = Object.fromEntries(TIMELINE.map((s, i) => [s.status, i]));

export default function OrderStatusPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const telegram = useTelegram();
  const { orders } = useOrders();
  const order = orders.find((o) => o.id === decodeURIComponent(orderId));

  if (!order) {
    return (
      <PageShell docTitle="Заявка не найдена" showNav>
        <div className="mt-8 rounded-card bg-card px-6 py-12 text-center shadow-soft">
          <p className="text-[15px] font-bold">Заявка не найдена</p>
          <div className="mt-5">
            <Button onClick={() => navigate("/orders")}>К моим заявкам</Button>
          </div>
        </div>
      </PageShell>
    );
  }

  const a = order.address ?? {};
  const canceled = order.status === "canceled";
  const doneIndex = canceled ? -1 : (STATUS_INDEX[order.status] ?? 0);

  return (
    <PageShell docTitle={`Заявка ${order.orderNo}`} showNav headerBack contentClassName="pb-4">
      <div className="animate-fade-up" style={{ animationDelay: "50ms" }}>
        <div className="mt-2 flex flex-wrap items-center gap-2.5">
          <h1 className="text-[24px] font-extrabold tracking-[-0.02em] text-ink">
            Заявка {order.orderNo}
          </h1>
          <StatusBadge status={order.status} />
        </div>
        <p className="mt-1 text-[13px] font-medium text-muted">{formatDateTime(order.createdAt)}</p>
      </div>

      {/* Таймлайн статусов: цвет + подпись + позиция, не только цвет */}
      <section
        className="animate-fade-up mt-4 rounded-card bg-card p-4 shadow-soft"
        style={{ animationDelay: "100ms" }}
        aria-label="Ход выполнения заявки"
      >
        <ol className="flex flex-col">
          {TIMELINE.map((step, i) => {
            const done = i < doneIndex;
            const current = i === doneIndex;
            return (
              <li key={step.status} className="flex items-stretch gap-3">
                <span className="flex flex-col items-center">
                  <span
                    className={[
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors",
                      done || current ? "bg-sea-deep text-white" : "bg-canvas text-muted",
                      current && !canceled && "animate-pulse-ring",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {done ? (
                      <CheckIcon className="h-3 w-3" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    )}
                  </span>
                  {i < TIMELINE.length - 1 && (
                    <span
                      className={`w-0.5 flex-1 ${done ? "bg-sea-deep/60" : "bg-line"}`}
                      aria-hidden="true"
                    />
                  )}
                </span>
                <span className={`pb-4 pl-0.5 text-[13.5px] ${i === TIMELINE.length - 1 ? "pb-0" : ""}`}>
                  <span
                    className={[
                      "block leading-tight",
                      done || current ? "font-bold text-ink" : "font-medium text-muted",
                    ].join(" ")}
                  >
                    {step.label}
                  </span>
                  {current && (
                    <span className="mt-0.5 block text-[12px] font-semibold text-sea-deep">
                      текущий этап
                    </span>
                  )}
                </span>
              </li>
            );
          })}
          {canceled && (
            <li className="flex items-center gap-3">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-dark"
                aria-hidden="true"
              >
                <span className="text-[13px] font-bold leading-none">×</span>
              </span>
              <span className="text-[13.5px] font-bold text-accent-dark">Заявка отменена</span>
            </li>
          )}
        </ol>
      </section>

      <section
        className="animate-fade-up mt-3 rounded-card bg-card p-4 shadow-soft"
        style={{ animationDelay: "150ms" }}
      >
        <p className="text-[12px] font-extrabold tracking-widest text-sea uppercase">Состав</p>
        <ul className="mt-2.5 flex flex-col gap-1.5 text-[14px]">
          {order.items.map((item) => (
            <li key={item.productId} className="flex justify-between gap-3">
              <span className="text-ink">
                {item.name} — {item.qty} {unitLabel(item.unit)}
              </span>
              <span className="shrink-0 font-bold tabular-nums text-ink">
                {item.price != null ? `${(item.price * item.qty).toLocaleString("ru-RU")} ₽` : ""}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 border-t border-line pt-3 text-[14px] font-extrabold text-ink">
          Итого:{" "}
          {order.total != null
            ? `${order.total.toLocaleString("ru-RU")} ₽`
            : "ожидает подтверждения менеджером"}
        </div>
      </section>

      <section
        className="animate-fade-up mt-3 rounded-card bg-card p-4 text-[13.5px] shadow-soft"
        style={{ animationDelay: "200ms" }}
      >
        <p className="text-[12px] font-extrabold tracking-widest text-sea uppercase">Доставка</p>
        <p className="mt-2 font-medium text-ink">
          {[a.zoneName, a.street && `ул. ${a.street}`, a.house && `д. ${a.house}`, a.apartment]
            .filter(Boolean)
            .join(", ")}
        </p>
        {a.comment && <p className="mt-1.5 text-muted">Комментарий: {a.comment}</p>}
      </section>

      <div
        className="animate-fade-up mt-5 flex flex-col gap-2.5"
        style={{ animationDelay: "250ms" }}
      >
        <Button variant="light" icon="none" onClick={() => telegram.haptic("light")}>
          <span className="flex items-center gap-2">
            <PhoneIcon className="h-[18px] w-[18px]" /> Связаться с менеджером
          </span>
        </Button>
        <Button variant="ghost" icon="none" onClick={() => navigate("/collection")}>
          <span className="flex items-center gap-2">
            <ReceiptIcon className="h-[18px] w-[18px]" /> К текущему привозу
          </span>
        </Button>
      </div>
    </PageShell>
  );
}
