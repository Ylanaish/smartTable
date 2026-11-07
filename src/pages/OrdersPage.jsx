import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import { useOrders } from "../hooks/useOrders";
import { formatDateTime } from "../store/selectors";
import { ChevronRightIcon, InboxIcon } from "../components/icons";

function Skeleton() {
  return (
    <div aria-busy="true" className="mt-4 flex flex-col gap-2.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex animate-pulse items-center gap-3 rounded-card bg-card p-3.5 shadow-soft"
          style={{ animationDelay: `${i * 120}ms` }}
        >
          <div className="h-12 w-12 shrink-0 rounded-xl bg-canvas" />
          <div className="flex-1">
            <div className="h-3.5 w-2/5 rounded-full bg-canvas" />
            <div className="mt-2 h-3 w-3/5 rounded-full bg-canvas" />
          </div>
          <div className="h-6 w-16 rounded-full bg-canvas" />
        </div>
      ))}
      <span className="sr-only">Загружаем заявки…</span>
    </div>
  );
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const { orders, loading, error, reload } = useOrders();

  return (
    <PageShell docTitle="Мои заявки" showNav contentClassName="pb-4">
      <h1 className="mt-3 text-[24px] font-extrabold tracking-[-0.02em] text-ink">Мои заявки</h1>

      {loading ? (
        <Skeleton />
      ) : error ? (
        <div className="mt-4 flex flex-col items-center rounded-card bg-card px-6 py-12 text-center shadow-soft">
          <p className="text-[15px] font-bold text-ink">Не удалось загрузить заявки</p>
          <p className="mt-1 max-w-[240px] text-[13px] leading-snug text-muted">
            {error.message || "Проверьте соединение и попробуйте ещё раз."}
          </p>
          <div className="mt-5 w-full">
            <Button variant="accent" onClick={() => reload()}>
              Повторить
            </Button>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-4 flex animate-fade-up flex-col items-center rounded-card bg-card px-6 py-12 text-center shadow-soft">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-canvas text-muted">
            <InboxIcon className="h-6 w-6" />
          </span>
          <p className="mt-4 text-[15px] font-bold text-ink">Заявок пока нет</p>
          <p className="mt-1 max-w-[240px] text-[13px] leading-snug text-muted">
            Оформите заявку в текущем привозе — она появится здесь.
          </p>
          <div className="mt-5 w-full">
            <Button variant="accent" onClick={() => navigate("/collection")}>
              К текущему привозу
            </Button>
          </div>
        </div>
      ) : (
        <ul className="mt-4 flex flex-col gap-2.5">
          {orders.map((order, i) => (
            <li
              key={order.id}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
            >
              <button
                type="button"
                onClick={() => navigate(`/orders/${encodeURIComponent(order.id)}`)}
                className="flex w-full items-center gap-3 rounded-card bg-card p-3.5 text-left shadow-soft transition-[transform,box-shadow] duration-200 hover:shadow-card active:scale-[0.99]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[14.5px] font-bold tracking-tight text-ink">
                    Заявка {order.order_number}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] font-medium text-muted">
                    {formatDateTime(order.datetime)}
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1.5">
                  {order.total_amount != null ? (
                    <span className="text-[14px] font-extrabold text-ink tabular-nums">
                      {order.total_amount.toLocaleString("ru-RU")} ₽
                    </span>
                  ) : (
                    <span className="text-[12px] font-medium text-muted">сумма уточняется</span>
                  )}
                  <StatusBadge status={order.status} />
                </span>
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
