import { useEffect, useState } from "react";
import { TimerIcon } from "./icons";

function parts(msLeft) {
  const totalMinutes = Math.max(0, Math.floor(msLeft / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

const Digit = ({ value, label }) => (
  <span className="flex flex-col items-center">
    <span className="rounded-xl bg-white/12 px-3.5 py-1.5 text-[22px] leading-none font-extrabold tabular-nums text-white">
      {String(value).padStart(2, "0")}
    </span>
    <span className="mt-1 text-[10px] leading-none font-semibold tracking-wide text-white/60 uppercase">
      {label}
    </span>
  </span>
);

export default function CollectionTimer({ closesAt, closed = false }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    if (closed) return undefined;
    const tick = () => setNow(Date.now());
    const raf = requestAnimationFrame(tick);
    const timer = setInterval(tick, 30000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer);
    };
  }, [closed]);

  if (closed) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-bold text-accent-dark">
        Сбор закрыт
      </span>
    );
  }

  if (now === null) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-[12px] font-bold text-white">
        <TimerIcon className="h-3.5 w-3.5" />
        Приём заказов открыт
      </span>
    );
  }

  const { hours, minutes } = parts(closesAt - now);
  const urgent = hours < 4;

  return (
    <div className="flex items-center gap-3">
      <div
        className={[
          "flex items-center gap-2 rounded-2xl px-3.5 py-2.5",
          urgent ? "bg-accent-strong/25" : "bg-white/10",
        ].join(" ")}
        role="timer"
        aria-label={urgent ? `Осталось меньше четырёх часов: ${hours} часов ${minutes} минут` : `Осталось ${hours} часов ${minutes} минут`}
      >
        <TimerIcon className={`h-5 w-5 shrink-0 ${urgent ? "text-accent-soft" : "text-white/70"}`} />
        <span className="flex items-center gap-2">
          <Digit value={hours} label="часов" />
          <span className="self-start pt-2 text-[18px] font-extrabold text-white/50">:</span>
          <Digit value={minutes} label="минут" />
        </span>
      </div>
      {urgent && (
        <span className="animate-pulse-ring h-2.5 w-2.5 shrink-0 rounded-full bg-accent-soft" aria-hidden="true" />
      )}
    </div>
  );
}
