import { useNavigate, useParams } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import TrackingPanel from "../components/TrackingPanel";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import { getStatus } from "../data/catalog";
import { useOrders } from "../hooks/useOrders";

export default function OrderStatusPage() {
  const navigate = useNavigate();
  const { orderNo } = useParams();
  const { orders } = useOrders();

  const order = orders.find((item) => item.orderNo === orderNo);

  if (!order) {
    return (
      <PageShell
        docTitle="Заказ не найден"
        contentClassName="pb-6"
        footer={<Button icon="none" onClick={() => navigate("/orders")}>К списку заказов</Button>}
      >
        <PageHeader
          title="Заказ не найден"
          subtitle={`Заказа № ${orderNo} нет в истории на этом устройстве`}
          className="pt-10 mb-6 text-center"
        />
      </PageShell>
    );
  }

  const status = getStatus(order.status);

  return (
    <PageShell
      docTitle={`Заказ № ${order.orderNo}`}
      contentClassName="pb-6"
      footer={
        <Button icon="none" onClick={() => navigate("/orders")}>
          К списку заказов
        </Button>
      }
    >
      <PageHeader title={`Заказ № ${order.orderNo}`} className="pt-6 mb-4" />

      <div className="mb-6 flex items-center gap-2.5">
        <StatusBadge status={order.status} />
        <span className="text-[13px] text-muted">{status.label}</span>
      </div>

      <TrackingPanel order={order} />
    </PageShell>
  );
}
