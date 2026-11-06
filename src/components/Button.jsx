import { useTelegram } from "../hooks/useTelegram";
import { ArrowRightIcon, SendIcon } from "./icons";

const VARIANTS = {
  dark: "bg-primary text-white shadow-soft hover:bg-primary-deep active:bg-primary-deep",
  light:
    "bg-white text-ink shadow-soft hover:bg-canvas active:bg-canvas border border-line",
  accent:
    "bg-cta text-white shadow-glow hover:brightness-110 active:brightness-95",
  ghost: "bg-transparent text-ink-soft hover:bg-canvas active:bg-canvas",
};

function Button({
  children,
  variant = "dark",
  onClick,
  to,
  type = "button",
  disabled = false,
  icon = "arrow",
  className = "",
}) {
  const telegram = useTelegram();

  const handleClick = (event) => {
    if (disabled) return;
    telegram.haptic("light");
    onClick?.(event);
  };

  const content = (
    <>
      {icon === "send" && <SendIcon className="h-[18px] w-[18px] shrink-0" />}
      <span className="truncate">{children}</span>
      {icon === "arrow" && (
        <ArrowRightIcon className="h-[18px] w-[18px] shrink-0 opacity-90" />
      )}
    </>
  );

  const classes = [
    "flex w-full items-center justify-center gap-2 rounded-2xl px-5",
    "h-12 text-[15px] font-bold tracking-tight transition-all duration-200 active:scale-[0.985]",
    "disabled:pointer-events-none disabled:opacity-45",
    VARIANTS[variant],
    className,
  ].join(" ");

  if (to) {
    return (
      <a href={to} onClick={handleClick} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={handleClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}

export default Button;
