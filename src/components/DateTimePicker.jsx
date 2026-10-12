const FIELDS =
  "w-full min-w-0 appearance-none bg-transparent text-[14px] text-ink outline-none placeholder:text-muted/80 [&::-webkit-calendar-picker-indicator]:hidden";

// Инпуты не должны показывать нативные иконки выбора даты/времени —
// свои иконки уже нарисованы компонентом Field.

export function Field({ icon: Icon, children, className = "" }) {
  return (
    <div
      className={[
        "flex items-center gap-2.5 rounded-xl border border-line bg-card px-3.5",
        "h-11 transition-colors focus-within:border-ink/35",
        className,
      ].join(" ")}
    >
      {Icon && <Icon className="h-[18px] w-[18px] shrink-0 text-muted" />}
      {children}
    </div>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 3v3M16 3v3M4 9h16M5.5 5.5h13a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 19V7a1.5 1.5 0 011.5-1.5z" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function DatePicker({ value, onChange }) {
  return (
    <Field icon={CalendarIcon}>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={FIELDS}
      />
    </Field>
  );
}

export function TimePicker({ value, onChange }) {
  return (
    <Field icon={ClockIcon}>
      <input
        type="time"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={FIELDS}
      />
    </Field>
  );
}
