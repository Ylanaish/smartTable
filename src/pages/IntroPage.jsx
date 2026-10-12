import { useNavigate } from "react-router-dom";
import background from "../assets/intro-page-background.jpg";
import cloche from "../assets/icons/cloche.png";
import rushIcon from "../assets/icons/rush.png";
import allIcon from "../assets/icons/all.png";
import priceIcon from "../assets/icons/price-tag.png";
import AppHeader from "../components/AppHeader";
import Button from "../components/Button";
import Advantage from "../components/Advantage";

const advantages = [
  { icon: rushIcon, title: "Быстро", subtitle: "(3–4 минуты)" },
  { icon: allIcon, title: "Всё в одном", subtitle: "(доставка + сервировка)" },
  { icon: priceIcon, title: "Прозрачная цена", subtitle: "(без скрытых платежей)" },
];

export default function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="relative isolate mx-auto flex min-h-dvh w-full max-w-[520px] flex-col overflow-hidden bg-black text-white">
      <img
        src={background}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-20 bg-black/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/15 to-black/85" />

      <AppHeader title="Telegram" subtitle="Умный Стол" theme="light" />

      <main className="relative flex flex-1 flex-col items-center px-5 pb-5 text-center sm:px-7">
        <div className="mt-[6vh] flex flex-col items-center sm:mt-[9vh]">
          <img src={cloche} alt="" className="h-12 w-[68px] object-contain drop-shadow-lg" />

          <h1 className="mt-2 font-display text-[clamp(30px,9vw,42px)] leading-none font-medium tracking-[0.06em] text-white uppercase drop-shadow-lg">
            Умный стол
          </h1>

          <p className="mt-4 max-w-[260px] text-[clamp(13px,3.6vw,15px)] leading-[1.5] font-medium text-white/95 drop-shadow-md">
            Банкетная доставка
            <br />
            и сервировка под ключ
          </p>
        </div>

        <div className="mt-auto w-full pt-10">
          <ul className="flex flex-col gap-3.5 text-left">
            {advantages.map((item) => (
              <li key={item.title}>
                <Advantage
                  iconSrc={item.icon}
                  mainText={item.title}
                  subText={item.subtitle}
                />
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <Button variant="light" icon="send" onClick={() => navigate("/event")}>
              Накрыть умный стол
            </Button>

            <button
              type="button"
              onClick={() => navigate("/home")}
              className="mt-3.5 w-full py-2 text-center text-[12.5px] text-white/65 underline-offset-4 transition-colors hover:text-white/90 hover:underline"
            >
              Мои заказы и каталог блюд
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
