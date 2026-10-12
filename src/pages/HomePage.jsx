import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { BookIcon, ChevronRightIcon, PlusCircleIcon, ReceiptIcon } from "../components/icons";
import { useTelegram } from "../hooks/useTelegram";
import { useOrder } from "../hooks/useOrder";
import { useActiveOrdersCount } from "../hooks/useOrders";

export default function HomePage() {
  const navigate = useNavigate();
  const telegram = useTelegram();
  const { dispatch } = useOrder();
  const activeCount = useActiveOrdersCount();

  const startNewOrder = () => {
    telegram.haptic("medium");
    dispatch({ type: "reset" });
    navigate("/event");
  };

  const go = (path) => {
    telegram.haptic("light");
    navigate(path);
  };

  const items = [
    {
      id: "new",
      icon: PlusCircleIcon,
      title: "Создать новый заказ",
      description: "Повод, стиль, меню и оплата — 4 шага",
      onClick: startNewOrder,
    },
    {
      id: "orders",
      icon: ReceiptIcon,
      title: "Статус заказов",
      description:
        activeCount > 0
          ? `Активных заказов: ${activeCount}`
          : "История ваших банкетов",
      onClick: () => go("/orders"),
    },
    {
      id: "catalog",
      icon: BookIcon,
      title: "Каталог блюд",
      description: "Все блюда, веса и цены",
      onClick: () => go("/catalog"),
    },
  ];

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[520px] flex-col bg-ink text-white">
      <AppHeader theme="light" onClose={() => navigate("/intro")} />

      <main className="flex flex-1 flex-col px-4 pb-8 sm:px-6">
        <h1 className="mt-6 text-center font-display text-[clamp(26px,7.5vw,34px)] leading-[1.15] font-medium">
          С чего начнём?
        </h1>
        <p className="mt-2 text-center text-[13.5px] text-white/55">
          Банкетная доставка и сервировка под ключ
        </p>

        <ul className="mt-8 flex flex-col gap-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={item.onClick}
                  className={[
                    "flex w-full items-center gap-3.5 rounded-2xl border border-white/12",
                    "bg-white/[0.07] px-4 py-4 text-left backdrop-blur-sm",
                    "transition-colors duration-200 hover:bg-white/[0.12] active:scale-[0.99]",
                  ].join(" ")}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Icon className="h-5 w-5 text-white" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] leading-tight font-semibold">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[12.5px] text-white/55">
                      {item.description}
                    </span>
                  </span>

                  <ChevronRightIcon className="h-5 w-5 shrink-0 text-white/40" />
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-auto pt-8 text-center text-[11.5px] leading-relaxed text-white/35">
          Заказы хранятся на этом устройстве.
          <br />
          Меню и цены уточняйте у менеджера.
        </p>
      </main>
    </div>
  );
}
