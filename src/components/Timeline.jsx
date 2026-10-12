import { CheckIcon } from "./icons";

export default function Timeline({ steps }) {
  return (
    <ol className="relative flex flex-col gap-0">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <li key={step.label} className="relative flex gap-3.5 pb-5 last:pb-0">
            {!isLast && (
              <span
                className={[
                  "absolute top-[18px] bottom-0 left-[8px] w-[1.5px] -translate-y-px",
                  step.done ? "bg-brand" : "bg-line",
                ].join(" ")}
              />
            )}

            <span
              className={[
                "relative z-10 mt-[3px] flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full",
                step.done ? "bg-brand" : "border-[1.5px] border-line bg-card",
              ].join(" ")}
            >
              {step.done && <CheckIcon className="h-2.5 w-2.5 text-white" />}
            </span>

            <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
              <span
                className={[
                  "truncate text-[13.5px]",
                  step.done ? "font-medium text-ink" : "text-muted",
                ].join(" ")}
              >
                {step.label}
              </span>
              <span
                className={[
                  "shrink-0 text-[12px] tabular-nums",
                  step.done ? "text-muted" : "text-muted/70",
                ].join(" ")}
              >
                {step.time}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
