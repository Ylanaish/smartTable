import { useLocation, useNavigate } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";
import { ArrowLeftIcon } from "./icons";

// onDark: хедер лежит поверх тёмного хиро-градиента (интро, каталог) — текст белый.
// По умолчанию хедер на светлом фоне страницы — тёмный текст.
export default function AppHeader({
  title = "Северный привоз",
  subtitle = "свежая рыба с доставкой",
  onDark = false,
  back = false,
}) {
  const navigate = useNavigate();
  const telegram = useTelegram();
  const { pathname } = useLocation();

  // Назад — только на вложенных страницах; на каталоге и интро слот пустой.
  const showBack = back && pathname !== "/collection" && pathname !== "/intro";

  const goBack = () => {
    telegram.haptic("light");
    // Назад по истории возвращает в то же место списка, откуда пришёл пользователь.
    // При прямом открытии ссылки истории нет — ведём в каталог.
    if (window.history.length > 1) navigate(-1);
    else navigate("/collection");
  };

  const iconButton = [
    "flex h-10 w-10 items-center justify-center rounded-full transition-transform active:scale-90",
    onDark ? "text-white hover:bg-white/15" : "text-ink hover:bg-primary/8",
  ].join(" ");

  return (
    <header
      className={[
        "relative z-30 flex h-[62px] shrink-0 items-center justify-between px-3",
        onDark ? "text-white" : "text-ink",
      ].join(" ")}
    >
      {showBack ? (
        <button type="button" onClick={goBack} aria-label="Назад" className={iconButton}>
          <ArrowLeftIcon className="h-[22px] w-[22px]" />
        </button>
      ) : (
        // Плейсхолдер нужен, иначе содержимое сместится влево.
        <span className="h-10 w-10" aria-hidden="true" />
      )}

      <div className="pointer-events-none absolute inset-x-16 top-1/2 -translate-y-1/2 text-center">
        <p
          className={[
            "text-[14px] leading-tight font-bold tracking-tight",
            onDark ? "text-white" : "text-ink",
          ].join(" ")}
        >
          {title}
        </p>
        {subtitle && (
          <p
            className={[
              "text-[11px] leading-tight font-medium",
              onDark ? "text-white/70" : "text-muted",
            ].join(" ")}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Второй слот — пустой: держит заголовок по центру. */}
      <span className="h-10 w-10" aria-hidden="true" />
    </header>
  );
}
