import Timeline from "./Timeline";
import { CheckIcon } from "./icons";
import { getStatusIndex } from "../data/catalog";
import { formatDate } from "../store/selectors";

function addMinutes(time, delta) {
  const [hours, minutes] = String(time).split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return time;

  const total = (hours * 60 + minutes + delta) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/** Статусы до текущего этапа включительно — считаются выполненными. */
function buildSteps(order) {
  const doneCount = getStatusIndex(order.status);
  const serveAt = order.time || "18:00";
  const paidAt = order.paidAt || "10:24";

  return [
    { label: "Оплата получена", time: paidAt },
    { label: "Готовы в кухне", time: addMinutes(paidAt, 16) },
    { label: "К доставке", time: serveAt },
    { label: "Доставка и сервировка", time: serveAt },
  ].map((step, index) => ({ ...step, done: index <= doneCount }));
}

export default function TrackingPanel({ order }) {
  const steps = buildSteps(order);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-brand">
          <CheckIcon className="h-10 w-10 text-white" />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-card border border-line bg-card">
        <div className="border-b border-line px-4 py-3.5">
          <p className="text-[16px] font-bold tracking-[-0.01em] text-ink">
            № {order.orderNo}
          </p>
          {order.formatName && (
            <p className="mt-0.5 text-[12.5px] text-muted">
              {order.guests} персон · {order.formatName}
            </p>
          )}
        </div>
        <div className="px-4 py-3.5">
          <p className="text-[13px] text-muted">
            {formatDate(order.eventDate ?? order.date)}, {order.time}
          </p>
          {order.address && (
            <p className="mt-1 text-[13px] text-muted">{order.address}</p>
          )}
        </div>
      </div>

      {order.dishes?.length > 0 && (
        <div className="mt-4 rounded-card border border-line bg-card px-4 py-4">
          <h2 className="mb-3 text-[13px] font-semibold tracking-[-0.01em] text-ink">
            Состав заказа
          </h2>
          <ul className="flex flex-col gap-2">
            {order.dishes.map((dish) => (
              <li key={dish.id} className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 truncate text-[13px] text-ink/85">
                  {dish.name}
                  <span className="text-muted"> × {dish.qty}</span>
                </span>
                <span className="shrink-0 text-[12.5px] tabular-nums text-muted">
                  {dish.portion}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 rounded-card border border-line bg-card px-4 py-4">
        <Timeline steps={steps} />
      </div>
    </>
  );
}
