import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import StepCounter from "../components/StepCounter";
import RadioCircle from "../components/RadioCircle";
import Placeholder from "../components/Placeholder";
import Button from "../components/Button";
import { useTelegram } from "../hooks/useTelegram";
import { FORMATS, STEPS } from "../data/catalog";
import { useOrder } from "../hooks/useOrder";
import { formatPrice } from "../store/selectors";

export default function ChooseServiceFormatPage() {
  const navigate = useNavigate();
  const telegram = useTelegram();
  const { order, dispatch } = useOrder();

  const select = (id) => {
    telegram.haptic("light");
    dispatch({ type: "setField", field: "formatId", value: id });
  };

  return (
    <PageShell
      docTitle="Формат сервиса"
      contentClassName="pb-6"
      footer={<Button onClick={() => navigate(STEPS[3].next)}>{STEPS[3].label}</Button>}
    >
      <StepCounter
        className="pt-3 pb-6"
        currentStep={4}
        onStepClick={(step) => navigate(STEPS[step - 1].path)}
      />

      <PageHeader
        title="Формат сервиса"
        subtitle="Выберите, как мы накроем ваш стол"
        className="mb-5"
      />

      <ul className="flex flex-col gap-2.5" role="radiogroup" aria-label="Формат сервиса">
        {FORMATS.map((format) => {
          const isActive = format.id === order.formatId;

          return (
            <li key={format.id}>
              <button
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => select(format.id)}
                className={[
                  "flex w-full items-center gap-3 rounded-card bg-card p-2.5 text-left",
                  "transition-all duration-200 active:scale-[0.99]",
                  isActive
                    ? "ring-2 ring-brand"
                    : "border border-line hover:border-ink/20",
                ].join(" ")}
              >
                <Placeholder
                  seed={format.seed}
                  className="h-[62px] w-[62px] shrink-0 rounded-[10px]"
                />

                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-ink">
                    {format.name}
                  </span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-muted">
                    {format.description}
                  </span>
                  <span className="mt-1 block text-[12.5px] font-medium text-accent">
                    от {formatPrice(format.priceFrom)} / чел.
                  </span>
                </span>

                <RadioCircle checked={isActive} />
              </button>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}
