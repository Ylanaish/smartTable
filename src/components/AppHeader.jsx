import { useLocation, useNavigate } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";
import { DotsIcon, HomeIcon } from "./icons";

export default function AppHeader({
  title = "Умный Стол",
  subtitle = "мини-приложение",
  theme = "dark",
}) {
  const navigate = useNavigate();
  const telegram = useTelegram();
  const { pathname } = useLocation();
  const isLight = theme === "light";

  // На самой главной иконка ведёт бы сама на себя — там оставляем пустой слот.
  const showHome = pathname !== "/home";

  const goHome = () => {
    telegram.haptic("light");
    navigate("/home");
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
      {showHome ? (
        <button type="button" onClick={goHome} aria-label="На главную" className={iconButton}>
          <HomeIcon className="h-[22px] w-[22px]" />
        </button>
      ) : (
        // Плейсхолдер нужен, иначе justify-between прижмёт кнопку меню влево.
        <span className="h-9 w-9" aria-hidden="true" />
      )}

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
