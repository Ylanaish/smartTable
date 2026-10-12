import { getStatus } from "../data/catalog";

export default function StatusBadge({ status }) {
  const config = getStatus(status);

  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] leading-none font-medium ${config.badgeClass}`}
    >
      {config.badge}
    </span>
  );
}
