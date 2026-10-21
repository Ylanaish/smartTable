import { useState } from "react";
import { useTelegram } from "../hooks/useTelegram";
import { MinusIcon, PlusIcon } from "./icons";

export default function GuestCounter({ value, onChange, min = 1 }) {
  const telegram = useTelegram();
  // Пока поле в фокусе, показываем ровно то, что набрал пользователь: иначе
  // зажатие в min не даёт стереть пятёрку и набрать новое число.
  const [draft, setDraft] = useState(null);

  const commit = (next) => {
    setDraft(null);
    if (next !== value) onChange(next);
  };

  const step = (delta) => {
    telegram.haptic("light");
    commit(Math.max(min, value + delta));
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

      <input
        type="number"
        inputMode="numeric"
        value={draft ?? String(value)}
        aria-label="Количество гостей"
        onChange={(event) => setDraft(event.target.value.replace(/\D/g, ""))}
        onBlur={() => commit(Math.max(min, Number(draft) || min))}
        className="w-14 min-w-0 bg-transparent text-center text-[14px] font-semibold tabular-nums text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />

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
