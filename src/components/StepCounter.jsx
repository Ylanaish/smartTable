import { useTelegram } from "../hooks/useTelegram";

const STEP_SIZE_REM = 1.75; // h-7 / 2 = 14px — радиус кружка шага

export default function StepCounter({
  currentStep,
  onStepClick,
  totalSteps = 4,
  className = "",
}) {
  const telegram = useTelegram();
  const progress = totalSteps > 1 ? (currentStep - 1) / (totalSteps - 1) : 0;

  const handleClick = (step) => {
    if (step === currentStep) return;
    telegram.haptic("light");
    onStepClick?.(step);
  };

  return (
    <nav aria-label="Прогресс" className={`w-full ${className}`}>
      <div className="relative mx-auto w-full max-w-[240px]">
        <div className="absolute top-1/2 right-3.5 left-3.5 h-[2px] -translate-y-1/2 rounded-full bg-line" />
        <div
          className="absolute top-1/2 left-3.5 h-[2px] -translate-y-1/2 rounded-full bg-ink transition-[width] duration-500 ease-out"
          style={{ width: `calc((100% - ${STEP_SIZE_REM}rem) * ${progress})` }}
        />

        <ol className="relative flex items-center justify-between">
          {Array.from({ length: totalSteps }, (_, index) => {
            const step = index + 1;
            const isCurrent = step === currentStep;
            const isPassed = step < currentStep;

            return (
              <li key={step}>
                <button
                  type="button"
                  onClick={() => handleClick(step)}
                  aria-current={isCurrent ? "step" : undefined}
                  className={[
                    "flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-semibold tabular-nums",
                    "transition-all duration-300 active:scale-90",
                    isCurrent
                      ? "scale-105 bg-ink text-white shadow-sm"
                      : isPassed
                        ? "bg-brand-soft text-brand"
                        : "bg-card text-muted ring-1 ring-line",
                  ].join(" ")}
                >
                  {step}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
