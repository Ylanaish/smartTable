import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import StepCounter from "../components/StepCounter";
import RadioCircle from "../components/RadioCircle";
import Button from "../components/Button";
import Placeholder from "../components/Placeholder";
import { useTelegram } from "../hooks/useTelegram";
import { STEPS, STYLES } from "../data/catalog";
import { useOrder } from "../hooks/useOrder";

export default function ChooseStylePage() {
  const navigate = useNavigate();
  const telegram = useTelegram();
  const { order, dispatch } = useOrder();

  const selectStyle = (id) => {
    telegram.haptic("light");
    dispatch({ type: "setField", field: "styleId", value: id });
  };

  return (
    <PageShell
      docTitle="Выбор стиля стола"
      contentClassName="pb-6"
      footer={<Button onClick={() => navigate(STEPS[1].next)}>{STEPS[1].label}</Button>}
    >
      <StepCounter
        className="pt-3 pb-6"
        currentStep={2}
        onStepClick={(step) => navigate(STEPS[step - 1].path)}
      />

      <PageHeader
        title="Выберите стиль стола"
        subtitle="Вдохновляйтесь и выбирайте оформление"
        className="mb-5"
      />

      <ul className="flex flex-col gap-3.5" role="radiogroup" aria-label="Стиль стола">
        {STYLES.map((style) => {
          const isActive = style.id === order.styleId;

          return (
            <li key={style.id}>
              <button
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => selectStyle(style.id)}
                className={[
                  "block w-full overflow-hidden rounded-2xl bg-card text-left",
                  "transition-all duration-200 active:scale-[0.99]",
                  isActive
                    ? "ring-2 ring-ink ring-offset-2 ring-offset-canvas"
                    : "shadow-[0_2px_10px_rgba(16,22,20,0.06)]",
                ].join(" ")}
              >
                <span className="relative block">
                  <Placeholder
                    seed={style.seed}
                    className="aspect-[16/10] w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                  <span className="absolute right-3 top-3">
                    <RadioCircle checked={isActive} />
                  </span>

                  <span className="absolute bottom-3 left-4 text-[17px] leading-tight font-semibold tracking-[-0.01em] text-white">
                    {style.name}
                  </span>
                </span>

                <span className="flex flex-wrap gap-1.5 px-4 py-3.5">
                  {style.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-canvas px-2 py-1 text-[11px] leading-none text-ink/70"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}
