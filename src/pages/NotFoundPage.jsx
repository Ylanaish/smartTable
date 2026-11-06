import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import { FishIcon } from "../components/icons";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageShell
      docTitle="Страница не найдена"
      contentClassName="pb-6"
      footer={
        <Button onClick={() => navigate("/collection", { replace: true })}>К текущему привозу</Button>
      }
    >
      <div className="flex flex-col items-center pt-8 pb-4 text-center">
        <span className="animate-pop flex h-16 w-16 items-center justify-center rounded-2xl bg-sea-soft text-sea-deep shadow-soft">
          <FishIcon className="h-8 w-8" />
        </span>
        <p className="mt-4 text-[42px] leading-none font-extrabold tracking-tight text-sea-soft tabular-nums">
          404
        </p>
      </div>
      <PageHeader
        title="Страница не найдена"
        subtitle="Похоже, такой ссылки не существует"
        className="animate-fade-up pb-8 text-center"
      />
    </PageShell>
  );
}
