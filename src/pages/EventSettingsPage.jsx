import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import StepCounter from "../components/StepCounter";
import EventPurpose from "../components/EventPurpose";
import { DatePicker, TimePicker } from "../components/DateTimePicker";
import GuestCounter from "../components/GuestCounter";
import AddressInput from "../components/AddressInput";
import Button from "../components/Button";
import { STEPS } from "../data/catalog";
import { MIN_GUESTS } from "../store/OrderProvider";
import { useOrder } from "../hooks/useOrder";

function Field({ label, children }) {
  return (
    <section className="flex flex-col gap-2.5">
      <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-ink">{label}</h2>
      {children}
    </section>
  );
}

export default function EventSettingsPage() {
  const navigate = useNavigate();
  const { order, dispatch } = useOrder();

  const setField = (field) => (value) => dispatch({ type: "setField", field, value });

  return (
    <PageShell
      docTitle="Параметры мероприятия"
      contentClassName="pb-6"
      footer={<Button onClick={() => navigate(STEPS[0].next)}>{STEPS[0].label}</Button>}
    >
      <StepCounter
        className="pt-3 pb-6"
        currentStep={1}
        onStepClick={(step) => navigate(STEPS[step - 1].path)}
      />

      <PageHeader
        title="Параметры мероприятия"
        subtitle="Расскажите нам о вашем событии"
        className="mb-5"
      />

      <div className="flex flex-col gap-5">
        <Field label="Повод">
          <EventPurpose value={order.purpose} onChange={setField("purpose")} />
        </Field>

        <Field label="Дата и время подачи">
          <div className="flex gap-2.5">
            <div className="flex-1">
              <DatePicker value={order.date} onChange={setField("date")} />
            </div>
            <div className="flex-1">
              <TimePicker value={order.time} onChange={setField("time")} />
            </div>
          </div>
        </Field>

        <Field label="Количество гостей">
          <div className="flex items-center gap-3">
            <GuestCounter value={order.guests} onChange={setField("guests")} min={MIN_GUESTS} />
            <span className="text-[12.5px] text-muted">минимум {MIN_GUESTS} гостей</span>
          </div>
        </Field>

        <Field label="Адрес доставки">
          <AddressInput value={order.address} onChange={setField("address")} />
        </Field>

        <Field label="Комментарий к заказу">
          <textarea
            value={order.comment}
            onChange={(event) => setField("comment")(event.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Особенности: аллергии, детское меню, время звонка…"
            className="w-full resize-none rounded-xl border border-line bg-card px-3.5 py-2.5 text-[14px] leading-snug text-ink outline-none transition-colors placeholder:text-muted/80 focus:border-ink/35"
          />
        </Field>
      </div>
    </PageShell>
  );
}
