import { useEffect, useMemo } from "react";

export function useTelegram() {
  const webApp = useMemo(
    () => (typeof window !== "undefined" ? window.Telegram?.WebApp : undefined),
    [],
  );

  useEffect(() => {
    if (!webApp) return;

    webApp.ready();
    webApp.expand();

    if (typeof webApp.disableVerticalSwipes === "function") {
      webApp.disableVerticalSwipes();
    }
    if (typeof webApp.setHeaderColor === "function") {
      webApp.setHeaderColor("#101614");
    }
    if (typeof webApp.setBackgroundColor === "function") {
      webApp.setBackgroundColor("#101614");
    }
  }, [webApp]);

  const haptic = useMemo(() => {
    return (style = "light") => {
      webApp?.HapticFeedback?.impactOccurred?.(style);
    };
  }, [webApp]);

  const notification = useMemo(() => {
    return (style = "success") => {
      webApp?.HapticFeedback?.notificationOccurred?.(style);
    };
  }, [webApp]);

  const canClose = useMemo(() => Boolean(webApp), [webApp]);

  const close = useMemo(() => () => webApp?.close?.(), [webApp]);

  return { webApp, haptic, notification, canClose, close };
}

export default useTelegram;
