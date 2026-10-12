import { useTelegram } from "../hooks/useTelegram";
import { MinusIcon, PlusIcon } from "./icons";

export default function GuestCounter({ value, onChange, min = 1, max = 300 }) {
  const telegram = useTelegram();

  const step = (delta) => {
    const next = Math.min(max, Math.max(min, value + delta));
    if (next === value) return;
    telegram.haptic("light");
    onChange(next);
  };

  return (
    <div className="flex h-10 w-[152px] items-center justify-between rounded-xl border border-line bg-card px-1">
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={value <= min}
        aria-label="Уменьшить количество гостей"
        className={[
          "flex h-8 w-8 items-center justify-center rounded-lg text-ink/70 transition-colors",
          value <= min ? "opacity-30" : "hover:bg-canvas active:bg-line/60",
        ].join(" ")}
      >
        <MinusIcon className="h-4 w-4" />
      </button>

      <span className="text-[14px] font-semibold tabular-nums">{value}</span>

      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Увеличить количество гостей"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/70 transition-colors hover:bg-canvas active:bg-line/60"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
