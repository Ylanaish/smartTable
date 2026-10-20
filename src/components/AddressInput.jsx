import { useEffect, useRef, useState } from "react";
import { MapPinIcon } from "./icons";
import { useTelegram } from "../hooks/useTelegram";

// Запросы идут в наш бэкенд: ключ Dadata живёт на сервере, в бандл не попадает.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";
const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 350;

export default function AddressInput({ value, onChange }) {
  const telegram = useTelegram();
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const handleInput = (next) => {
    // Короткий ввод не ищем, но старый список сразу убираем.
    if (next.trim().length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setOpen(false);
    }
    onChange(next);
  };

  useEffect(() => {
    const query = value.trim();
    if (query.length < MIN_QUERY_LENGTH) return;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      const params = new URLSearchParams({ q: query });
      const headers = {};
      // rbacx пускает только по подписи Telegram initData.
      if (telegram.webApp?.initData) {
        headers["X-Telegram-Init-Data"] = telegram.webApp.initData;
      }

      fetch(`${API_BASE_URL}/address/suggest?${params}`, {
        headers,
        signal: controller.signal,
      })
        .then((response) => (response.ok ? response.json() : { suggestions: [] }))
        .then((data) => {
          const items = data.suggestions ?? [];
          setSuggestions(items);
          setOpen(items.length > 0);
        })
        // Бэкенд или Dadata недоступны — молча оставляем обычный текстовый ввод.
        .catch(() => {});
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value, telegram.webApp]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  const select = (item) => {
    onChange(item.value);
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex h-11 items-center gap-2.5 rounded-xl border border-line bg-card px-3.5 transition-colors focus-within:border-ink/35">
        <MapPinIcon className="h-[18px] w-[18px] shrink-0 text-muted" />
        <input
          type="text"
          value={value}
          onChange={(event) => handleInput(event.target.value)}
          onKeyDown={(event) => event.key === "Escape" && setOpen(false)}
          placeholder="Город, улица, дом, подъезд/этаж"
          aria-autocomplete="list"
          aria-expanded={open}
          className="w-full min-w-0 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted/80"
        />
      </div>

      {open && (
        <ul
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%+4px)] z-30 max-h-60 overflow-y-auto rounded-xl border border-line bg-card py-1 shadow-[0_8px_24px_rgba(16,22,20,0.12)]"
        >
          {suggestions.map((item) => (
            <li key={item.unrestricted_value ?? item.value}>
              <button
                type="button"
                role="option"
                aria-selected="false"
                onClick={() => select(item)}
                className="block w-full px-3.5 py-2.5 text-left text-[13px] leading-snug text-ink/85 transition-colors hover:bg-canvas active:bg-line/60"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
