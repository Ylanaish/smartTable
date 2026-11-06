import { useNavigate } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";
import { useOrder } from "../hooks/useOrder";
import { CartIcon, FishIcon, ReceiptIcon } from "./icons";

const TABS = [
  { path: "/collection", label: "Привоз", Icon: FishIcon },
  { path: "/cart", label: "Корзина", Icon: CartIcon },
  { path: "/orders", label: "Заявки", Icon: ReceiptIcon },
];

export default function BottomNav({ active }) {
  const navigate = useNavigate();
  const telegram = useTelegram();
  const { order } = useOrder();
  const cartCount = Object.keys(order.cart).length;

  return (
    <nav
      className="flex items-stretch justify-around rounded-3xl bg-card/92 shadow-card backdrop-blur-xl"
      aria-label="Основная навигация"
    >
      {TABS.map(({ path, label, Icon }) => {
        const isActive = active === path || active.startsWith(`${path}/`);
        const badge = path === "/cart" && cartCount > 0 ? cartCount : null;
        return (
          <button
            key={path}
            type="button"
            onClick={() => {
              telegram.haptic("light");
              navigate(path);
            }}
            aria-current={isActive ? "page" : undefined}
            className={[
              "relative flex min-h-[52px] min-w-[72px] flex-col items-center justify-center gap-1 rounded-2xl px-3 py-1.5 transition-colors duration-200",
              isActive ? "text-sea-deep" : "text-muted hover:text-ink",
            ].join(" ")}
          >
            {isActive && (
              <span className="absolute inset-x-2 top-1.5 h-[3px] rounded-full bg-sea" aria-hidden="true" />
            )}
            <span className="relative">
              <Icon className="h-[22px] w-[22px]" />
              {badge != null && (
                <span
                  aria-label={`${badge} ${badge === 1 ? "товар" : "товаров"} в корзине`}
                  className="absolute -top-1.5 -right-2.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-cta px-1 text-[10px] leading-none font-bold text-white"
                >
                  {badge}
                </span>
              )}
            </span>
            <span className="text-[11px] leading-none font-bold">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
