import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import TrackingPanel from "../components/TrackingPanel";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import { getStatus } from "../data/catalog";
import { useTelegram } from "../hooks/useTelegram";
import OrderHistoryRepository from "../repositories/orderHistoryRepository";

export default function OrderStatusPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const telegram = useTelegram();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    new OrderHistoryRepository(telegram.webApp).getById(orderId)
      .then(setOrder)
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [orderId, telegram.webApp]);

  if (loading) {
    return (
      <PageShell docTitle="Заказ" contentClassName="pb-6">
        <p className="pt-10 text-center text-[13px] text-muted">Загружаем заказ…</p>
      </PageShell>
    );
  }

  if (!order) {
    return (
      <PageShell
        docTitle="Заказ не найден"
        contentClassName="pb-6"
        footer={<Button icon="none" onClick={() => navigate("/orders")}>К списку заказов</Button>}
      >
        <PageHeader
          title="Заказ не найден"
          subtitle={`Заказа с идентификатором ${orderId} не найдено`}
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
