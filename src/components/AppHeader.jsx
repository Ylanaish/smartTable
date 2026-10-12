import { useNavigate } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";
import { CloseIcon, DotsIcon } from "./icons";

export default function AppHeader({
  title = "Умный Стол",
  subtitle = "мини-приложение",
  theme = "dark",
  onClose,
  fallbackPath = "/home",
}) {
  const navigate = useNavigate();
  const telegram = useTelegram();
  const isLight = theme === "light";

  const handleClose = () => {
    telegram.haptic("light");
    if (onClose) {
      onClose();
      return;
    }
    if (telegram.canClose()) {
      telegram.close();
      return;
    }
    navigate(fallbackPath);
  };

  const iconButton = [
    "flex h-9 w-9 items-center justify-center rounded-full transition-colors active:scale-95",
    isLight ? "hover:bg-white/15" : "hover:bg-black/5",
  ].join(" ");

  return (
    <header
      className={[
        "relative z-30 flex h-[62px] shrink-0 items-center justify-between px-3",
        isLight ? "text-white" : "text-ink",
      ].join(" ")}
    >
      <button type="button" onClick={handleClose} aria-label="Закрыть" className={iconButton}>
        <CloseIcon className="h-[22px] w-[22px]" />
      </button>

      <div className="pointer-events-none absolute inset-x-16 top-1/2 -translate-y-1/2 text-center">
        <p
          className={[
            "text-[14px] leading-tight font-semibold tracking-tight",
            isLight ? "text-white" : "text-ink",
          ].join(" ")}
        >
          {title}
        </p>
        {subtitle && (
          <p
            className={[
              "text-[11px] leading-tight",
              isLight ? "text-white/65" : "text-muted",
            ].join(" ")}
          >
            {subtitle}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => telegram.haptic("light")}
        aria-label="Меню"
        className={iconButton}
      >
        <DotsIcon className="h-[22px] w-[22px]" />
      </button>
    </header>
  );
}
