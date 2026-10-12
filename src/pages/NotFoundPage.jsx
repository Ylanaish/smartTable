import { useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageShell
      docTitle="Страница не найдена"
      contentClassName="pb-6"
      footer={<Button onClick={() => navigate("/home", { replace: true })}>На главную</Button>}
    >
      <PageHeader
        title="Страница не найдена"
        subtitle="Похоже, такой ссылки не существует"
        className="pt-8 pb-8 text-center"
      />
    </PageShell>
  );
}
