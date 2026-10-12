import { useTelegram } from "../hooks/useTelegram";

export default function Chip({
  label,
  active = false,
  onClick,
  size = "md",
  className = "",
}) {
  const telegram = useTelegram();

  const handleClick = (event) => {
    telegram.haptic("light");
    onClick?.(event);
  };

  const sizes = {
    sm: "px-2.5 py-1 text-[11px]",
    md: "px-4 py-2.5 text-[13.5px]",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      className={[
        "rounded-[10px] font-medium transition-all duration-200 active:scale-[0.96]",
        sizes[size],
        active
          ? "bg-ink text-white shadow-sm"
          : "border border-line bg-card text-ink/80 hover:border-ink/25",
        className,
      ].join(" ")}
    >
      {label}
    </button>
  );
}
