import { useTelegram } from "../hooks/useTelegram";
import { MinusIcon, PlusIcon } from "./icons";

export function QuantityStepper({ value, onChange, min = 0, max = 99, compact = false }) {
  const telegram = useTelegram();

  const step = (delta) => {
    const next = Math.min(max, Math.max(min, value + delta));
    if (next === value) return;
    telegram.haptic("light");
    onChange(next);
  };

  const side = [
    "flex h-full items-center justify-center text-ink-soft transition-colors active:scale-90",
    compact ? "w-8" : "w-10",
  ];

  return (
    <div
      className={[
        "flex shrink-0 items-center rounded-xl border border-line bg-card shadow-soft",
        compact ? "h-8" : "h-10",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={value <= min}
        aria-label="Убрать одну порцию"
        className={[
          ...side,
          "rounded-l-xl",
          value <= min ? "opacity-30" : "hover:bg-canvas",
        ].join(" ")}
      >
        <MinusIcon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </button>

      <span
        className={[
          "min-w-7 text-center font-extrabold tabular-nums text-ink",
          compact ? "text-[12px]" : "text-[14px]",
        ].join(" ")}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Добавить порцию"
        className={[...side, "rounded-r-xl hover:bg-canvas"].join(" ")}
      >
        <PlusIcon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </button>
    </div>
  );
}

export default QuantityStepper;
