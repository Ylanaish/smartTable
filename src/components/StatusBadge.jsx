// Цветовое кодирование статусов заявки: цвет + подпись, а не только цвет.
const CONFIG = {
  new: { label: "Новая", tone: "bg-sea-soft text-sea-deep" },
  confirmed: { label: "Подтверждена", tone: "bg-sea-soft text-sea-deep" },
  paid: { label: "Оплачена", tone: "bg-good-soft text-good" },
  packing: { label: "К комплектации", tone: "bg-warn-soft text-warn" },
  delivery: { label: "К доставке", tone: "bg-warn-soft text-warn" },
  delivered: { label: "Доставлена", tone: "bg-good-soft text-good" },
  canceled: { label: "Отменена", tone: "bg-accent-soft text-accent-dark" },
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
