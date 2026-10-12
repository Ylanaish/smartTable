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

  return (
    <div
      className={[
        "flex shrink-0 items-center rounded-[10px] border border-line bg-card",
        compact ? "h-8" : "h-10",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={value <= min}
        aria-label="Убрать одну порцию"
        className={[
          "flex h-full items-center justify-center rounded-l-[10px] text-ink/70 transition-colors",
          compact ? "w-8" : "w-10",
          value <= min ? "opacity-30" : "hover:bg-canvas active:bg-line/60",
        ].join(" ")}
      >
        <MinusIcon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </button>

      <span
        className={[
          "min-w-7 text-center font-semibold tabular-nums text-ink",
          compact ? "text-[12px]" : "text-[14px]",
        ].join(" ")}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Добавить порцию"
        className={[
          "flex h-full items-center justify-center rounded-r-[10px] text-ink/70 transition-colors",
          compact ? "w-8" : "w-10",
          "hover:bg-canvas active:bg-line/60",
        ].join(" ")}
      >
        <PlusIcon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </button>
    </div>
  );
}

export default QuantityStepper;
