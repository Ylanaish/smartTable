import { useEffect, useRef, useState } from "react";
import { MapPinIcon } from "./icons";

// shortcut: Nominatim без ключа, лимит ~1 запрос/сек. При росте нагрузки — свой прокси/кеш.
const SUGGEST_URL = "https://nominatim.openstreetmap.org/search";
const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 350;

export default function AddressInput({ value, onChange }) {
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
      const params = new URLSearchParams({
        q: query,
        format: "jsonv2",
        limit: "5",
        "accept-language": "ru",
      });

      fetch(`${SUGGEST_URL}?${params}`, { signal: controller.signal })
        .then((response) => (response.ok ? response.json() : []))
        .then((data) => {
          setSuggestions(data);
          setOpen(data.length > 0);
        })
        // Сеть недоступна — молча оставляем поле обычным текстовым вводом.
        .catch(() => {});
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  const select = (item) => {
    onChange(item.display_name);
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
            <li key={item.place_id}>
              <button
                type="button"
                role="option"
                aria-selected="false"
                onClick={() => select(item)}
                className="block w-full px-3.5 py-2.5 text-left text-[13px] leading-snug text-ink/85 transition-colors hover:bg-canvas active:bg-line/60"
              >
                {item.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
