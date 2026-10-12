import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import { ChevronRightIcon, InboxIcon } from "../components/icons";
import { useOrders } from "../hooks/useOrders";
import { formatDate, formatPrice } from "../store/selectors";

export default function OrdersPage() {
  const navigate = useNavigate();
  const { orders } = useOrders();

  return (
    <PageShell
      docTitle="Статус заказов"
      contentClassName="pb-6"
      footer={
        <Button icon="none" onClick={() => navigate("/home")}>
          На главную
        </Button>
      }
    >
      <PageHeader
        title="Статус заказов"
        subtitle={
          orders.length > 0
            ? `Всего заказов: ${orders.length}`
            : "Здесь появятся все ваши банкеты"
        }
        className="pt-6 mb-5"
      />

      {orders.length === 0 ? (
        <div className="flex flex-col items-center rounded-card border border-line bg-card px-6 py-12 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-canvas">
            <InboxIcon className="h-6 w-6 text-muted" />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">Заказов пока нет</p>
          <p className="mt-1 max-w-[240px] text-[13px] leading-snug text-muted">
            Оформите первый банкет — он появится здесь со статусом и трекингом.
          </p>
          <div className="mt-5 w-full">
            <Button icon="none" onClick={() => navigate("/home")}>
              Создать первый заказ
            </Button>
          </div>
        </div>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {orders.map((order) => (
            <li key={order.orderNo}>
              <button
                type="button"
                onClick={() => navigate(`/orders/${order.orderNo}`)}
                className="flex w-full items-center gap-3 rounded-card border border-line bg-card p-3.5 text-left transition-all duration-200 hover:border-ink/20 active:scale-[0.99]"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-[15px] font-bold tracking-[-0.01em] text-ink">
                      № {order.orderNo}
                    </span>
                    <StatusBadge status={order.status} />
                  </span>

                  <span className="mt-1 block truncate text-[12.5px] text-muted">
                    {formatDate(order.eventDate)}, {order.time} · {order.guests} персон
                  </span>

                  <span className="mt-0.5 block text-[13px] font-medium text-ink/80">
                    {formatPrice(order.total)}
                  </span>
                </span>

                <ChevronRightIcon className="h-5 w-5 shrink-0 text-muted" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
