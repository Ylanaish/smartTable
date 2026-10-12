import { useEffect } from "react";
import AppHeader from "./AppHeader";

export default function PageShell({
  children,
  docTitle,
  headerTitle = "Умный Стол",
  headerSubtitle = "мини-приложение",
  theme = "dark",
  headerClose,
  footer = null,
  contentClassName = "",
}) {
  useEffect(() => {
    document.title = docTitle ? `${docTitle} — Умный Стол` : "Умный Стол";
  }, [docTitle]);

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[520px] flex-col bg-canvas">
      <AppHeader
        title={headerTitle}
        subtitle={headerSubtitle}
        theme={theme}
        onClose={headerClose}
      />

      <main className={`flex-1 overscroll-contain px-4 pb-6 sm:px-6 ${contentClassName}`}>
        {children}
      </main>

      {footer && (
        <div className="sticky bottom-0 z-20 shrink-0 border-t border-line/70 bg-canvas/95 px-4 pt-3 pb-safe backdrop-blur-md sm:px-6">
          {footer}
        </div>
      )}
    </div>
  );
}
