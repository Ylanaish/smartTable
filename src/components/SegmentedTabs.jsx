import { useTelegram } from "../hooks/useTelegram";

export default function SegmentedTabs({ options, value, onChange, className = "" }) {
  const telegram = useTelegram();

  const handleChange = (id) => {
    if (id === value) return;
    telegram.haptic("light");
    onChange(id);
  };

  return (
    <div
      className={`flex gap-1 rounded-[10px] bg-line/60 p-1 ${className}`}
      role="tablist"
    >
      {options.map((option) => {
        const isActive = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleChange(option.id)}
            className={[
              "flex-1 rounded-[8px] px-3 py-2 text-[13px] font-medium transition-all duration-200",
              isActive
                ? "bg-ink text-white shadow-sm"
                : "text-ink/60 hover:text-ink active:scale-[0.98]",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
