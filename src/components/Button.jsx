import { useTelegram } from "../hooks/useTelegram";
import { ArrowRightIcon, SendIcon } from "./icons";

const VARIANTS = {
  dark: "bg-ink text-white hover:bg-ink-soft active:bg-black",
  light: "bg-white text-ink hover:bg-white/90 active:bg-white/80",
  accent: "bg-brand text-white hover:bg-brand/90 active:bg-brand",
  ghost: "bg-transparent text-ink hover:bg-canvas active:bg-canvas",
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
    "flex w-full items-center justify-center gap-2 rounded-xl px-5",
    "h-12 text-[15px] font-medium transition-all duration-200 active:scale-[0.985]",
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
