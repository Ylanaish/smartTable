import { useNavigate } from "react-router-dom";
import background from "../assets/intro-page-background.jpg";
import AppHeader from "../components/AppHeader";
import Button from "../components/Button";
import { useTelegram } from "../hooks/useTelegram";

export default function FinalPage() {
  const navigate = useNavigate();
  const telegram = useTelegram();

  const handleHome = () => {
    telegram.haptic("medium");
    navigate("/home", { replace: true });
  };

  return (
    <div className="relative isolate mx-auto flex min-h-dvh w-full max-w-[520px] flex-col bg-black text-white">
      <img
        src={background}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-20 bg-black/35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/30 to-black/85" />

      <AppHeader theme="light" onClose={handleHome} />

      <main className="relative flex flex-1 flex-col items-center px-6 pt-[14vh] pb-6 text-center sm:pt-[18vh]">
        <h1 className="max-w-[320px] font-display text-[clamp(28px,8.5vw,40px)] leading-[1.15] font-medium text-white drop-shadow-lg">
          Ваш банкет уже в пути!
        </h1>

        <p className="mt-4 max-w-[300px] text-[clamp(13px,3.6vw,15px)] leading-[1.55] text-white/80">
          Мы свяжемся с вами, как только всё будет готово. Приятного вечера и хорошего
          настроения!
        </p>

        <div className="mt-auto w-full pt-10">
          <Button variant="light" icon="none" onClick={handleHome}>
            На главную
          </Button>
        </div>
      </main>
    </div>
  );
}
