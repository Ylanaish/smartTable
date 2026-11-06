import { useEffect } from "react";
import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";
import { useLocation } from "react-router-dom";

export default function PageShell({
  children,
  docTitle,
  headerTitle = "Северный привоз",
  headerSubtitle = "свежая рыба с доставкой",
  headerOnDark = false,
  footer = null,
  showNav = false,
  headerBack = false,
  contentClassName = "",
}) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = docTitle ? `${docTitle} — Северный привоз` : "Северный привоз";
  }, [docTitle]);

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[520px] flex-col bg-canvas">
      <AppHeader
        title={headerTitle}
        subtitle={headerSubtitle}
        onDark={headerOnDark}
        back={headerBack}
      />

      <main className={`flex-1 overscroll-contain px-4 pb-6 sm:px-6 ${contentClassName}`}>
        {children}
      </main>

      {(footer || showNav) && (
        <div className="sticky bottom-0 z-20 shrink-0 px-4 pt-2 pb-safe sm:px-6">
          {footer && <div className="mb-2">{footer}</div>}
          {showNav && <BottomNav active={pathname} />}
        </div>
      )}
    </div>
  );
}
