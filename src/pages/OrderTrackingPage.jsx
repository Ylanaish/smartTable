import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import TrackingPanel from "../components/TrackingPanel";
import Button from "../components/Button";
import { useOrder } from "../hooks/useOrder";
import { createOrderSnapshot } from "../store/orderHistory";

export default function OrderTrackingPage() {
  const navigate = useNavigate();
  const { order } = useOrder();

  // Панель читает снимок заказа, поэтому черновик приводим к той же форме.
  const snapshot = useMemo(() => createOrderSnapshot(order), [order]);

  return (
    <PageShell
      docTitle="Трекинг заказа"
      contentClassName="pb-6"
      footer={
        <Button icon="none" onClick={() => navigate("/done")}>
          Смотреть детали заказа
        </Button>
      }
    >
      <PageHeader
        title="Заказ оформлен!"
        subtitle="Мы уже готовим ваш банкет. Следите за статусом в этом чате."
        className="pt-6 mb-7"
      />

      <TrackingPanel order={snapshot} />
    </PageShell>
  );
}
