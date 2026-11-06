import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import Button from "../components/Button";
import { COLLECTION } from "../data/catalog";
import { FishIcon, MapPinIcon, TruckIcon } from "../components/icons";

export default function IntroPage() {
  const navigate = useNavigate();

  const advantages = [
    {
      Icon: FishIcon,
      title: "Свежий улов",
      text: "Рыба и морепродукты напрямую с Мурманска и Дальнего Востока",
      tone: "bg-sea-soft text-sea-deep",
    },
    {
      Icon: TruckIcon,
      title: "Доставка на дом",
      text: "Павлово, Тумботино, Ворсма, Богородск — по маршрутам и интервалам",
      tone: "bg-accent-soft text-accent-dark",
    },
    {
      Icon: MapPinIcon,
      title: "Прозрачные заявки",
      text: "Номер заявки, состав и сумма — сразу после оформления",
      tone: "bg-[#ede9fe] text-[#6d28d9]",
    },
  ];

  return (
    <PageShell headerOnDark contentClassName="flex flex-col">
      {/* Хиро на градиенте «северного моря» с мягкой волной к подложке */}
      <div className="-mx-4 -mt-[62px] bg-hero relative px-6 pt-16 pb-14 text-white sm:-mx-6 sm:px-8">
        <div
          className="animate-fade-up"
          style={{ animationDelay: "60ms" }}
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 text-white">
            <FishIcon className="h-7 w-7" />
          </span>
          <h1 className="mt-5 text-[clamp(30px,8vw,38px)] leading-[1.05] font-extrabold tracking-[-0.02em]">
            Северный
            <br />
            привоз
          </h1>
          <p className="mt-3 max-w-[300px] text-[14.5px] leading-snug font-medium text-white/75">
            Свежая рыба и морепродукты с доставкой домой. Оформите заказ к текущему привозу — остальное
            мы возьмём на себя.
          </p>
        </div>

        {/* Мягкая волна-переход к светлому фону */}
        <svg
          className="absolute -bottom-px left-0 h-6 w-full text-canvas"
          viewBox="0 0 400 24"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 24h400V12c-66-12-133-12-200-4S66 20 0 12v12z" fill="currentColor" />
        </svg>
      </div>

      <ul className="mt-5 flex flex-col gap-3">
        {advantages.map(({ Icon, title, text, tone }, i) => (
          <li
            key={title}
            className="animate-fade-up flex items-start gap-3.5 rounded-card bg-card p-4 shadow-soft"
            style={{ animationDelay: `${160 + i * 80}ms` }}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-[14.5px] font-bold tracking-tight text-ink">{title}</span>
              <span className="mt-0.5 block text-[13px] leading-snug text-muted">{text}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="flex-1" />

      <div className="sticky bottom-0 -mx-4 px-4 pt-3 pb-safe sm:-mx-6 sm:px-6">
        <Button variant="accent" onClick={() => navigate("/collection")}>
          Текущий привоз — {COLLECTION.title.replace("Северный привоз ", "")}
        </Button>
      </div>
    </PageShell>
  );
}
