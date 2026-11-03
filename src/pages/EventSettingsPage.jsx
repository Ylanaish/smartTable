import { useRef, useState } from "react";
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
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const setField = (field) => (value) => dispatch({ type: "setField", field, value });

  const goNext = () => {
    if (!order.address?.trim()) {
      setAddressError(true);
      addressRef.current?.focus();
      return;
    }

    if (!order.phone?.trim()) {
      setPhoneError(true);
      phoneRef.current?.focus();
      return;
    }

    navigate(STEPS[0].next);
  };

  const goToStep = (step) => {
    if (step > 1 && (!order.address?.trim() || !order.phone?.trim())) {
      if (!order.address?.trim()) {
        setAddressError(true);
        addressRef.current?.focus();
      } else {
        setPhoneError(true);
        phoneRef.current?.focus();
      }
      return;
    }

    navigate(STEPS[step - 1].path);
  };

  return (
    <PageShell
      docTitle="Параметры мероприятия"
      contentClassName="pb-6"
      footer={<Button onClick={goNext}>{STEPS[0].label}</Button>}
    >
      <StepCounter
        className="pt-3 pb-6"
        currentStep={1}
        onStepClick={goToStep}
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
          <div
            ref={addressRef}
            tabIndex={-1}
          >
            <AddressInput
              value={order.address}
              error={addressError}
              onChange={(value) => {
                setField("address")(value);
                if (value.trim()) setAddressError(false);
              }}
            />
          </div>
        </Field>

        <Field label="Номер телефона">
          <input
            ref={phoneRef}
            type="tel"
            value={order.phone ?? ""}
            onChange={(event) => {
              setField("phone")(event.target.value);
              if (event.target.value.trim()) setPhoneError(false);
            }}
            placeholder="+7 (999) 123-45-67"
            aria-invalid={phoneError}
            className={`w-full rounded-xl border bg-card px-3.5 py-2.5 text-[14px] leading-snug text-ink outline-none transition-colors placeholder:text-muted/80 ${
              phoneError
                ? "border-red-500 bg-red-50/40 focus:border-red-500"
                : "border-line focus:border-ink/35"
            }`}
          />
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
