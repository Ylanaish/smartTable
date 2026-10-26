import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import TrackingPanel from "../components/TrackingPanel";
import Button from "../components/Button";
import { useOrders } from "../hooks/useOrders";

export default function OrderTrackingPage() {
  const navigate = useNavigate();
  const { currentOrder } = useOrders();

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

      <TrackingPanel order={currentOrder} />
    </PageShell>
  );
}
