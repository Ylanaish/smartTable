// Цветовое кодирование статусов заявки: цвет + подпись, а не только цвет.
// Ключи совпадают с OrderStatus на бэкенде.
const CONFIG = {
  new: { label: "Новая", tone: "bg-sea-soft text-sea-deep" },
  paid: { label: "Оплачена", tone: "bg-good-soft text-good" },
  confirmed: { label: "Подтверждена", tone: "bg-sea-soft text-sea-deep" },
  assembling: { label: "Комплектуется", tone: "bg-warn-soft text-warn" },
  ready_for_pickup: { label: "Готова к выдаче", tone: "bg-warn-soft text-warn" },
  in_delivery: { label: "В доставке", tone: "bg-warn-soft text-warn" },
  served: { label: "Доставлена", tone: "bg-good-soft text-good" },
  completed: { label: "Завершена", tone: "bg-good-soft text-good" },
  cancelled: { label: "Отменена", tone: "bg-accent-soft text-accent-dark" },
};

export default function StatusBadge({ status }) {
  const config = CONFIG[status] ?? CONFIG.new;

  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] leading-none font-bold ${config.tone}`}
    >
      {config.label}
    </span>
  );
}
