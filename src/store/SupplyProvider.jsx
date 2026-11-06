import { useEffect, useMemo, useState } from "react";
import { useTelegram } from "../hooks/useTelegram";
import SupplyRepository from "../repositories/supplyRepository";
import { SupplyContext } from "./supplyContext";

// Одна загрузка активного привоза на всё приложение: каталог и страница
// товара берут данные отсюда, без повторных запросов.
export default function SupplyProvider({ children }) {
  const telegram = useTelegram();
  const [supply, setSupply] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    new SupplyRepository(telegram.webApp)
      .getActiveSupply()
      .then((next) => {
        if (!cancelled) setSupply(next);
      })
      .catch((e) => {
        if (!cancelled) setError(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [telegram.webApp]);

  const value = useMemo(() => ({ supply, loading, error }), [supply, loading, error]);

  return <SupplyContext.Provider value={value}>{children}</SupplyContext.Provider>;
}
