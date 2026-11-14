import { FishIcon } from "./icons";

// Дуотоновые SVG-иллюстрации вместо эмодзи: единый визуальный язык каталога.
// Используют currentColor поверх градиентной плитки, которую задаёт потребитель.
// Пока product.photo === null — рисуем иллюстрацию; когда появится фото, оно
// займёт плитку автоматически (см. ProductVisual).

function Illus({ children, className = "h-full w-full", viewBox = "0 0 64 64" }) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" className={className} fill="none">
      {children}
    </svg>
  );
}

/* --- Рыба (форель / сибас / скумбрия): обтекаемое тело + плавники --- */
function Fish({ tail = false }) {
  return (
    <Illus>
      <path
        d="M10 32c6-10 14-15 23-15 9 0 16 6 21 12-5 6-12 13-21 13-9 0-17-2-23-10z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M54 29c3-4 3-10 0-14-3 2-5 6-5 9" fill="currentColor" opacity="0.55" />
      <path d="M54 35c3 4 3 10 0 14-3-2-5-6-5-9" fill="currentColor" opacity="0.55" />
      <circle cx="19" cy="29" r="2.6" fill="#fff" opacity="0.95" />
      <circle cx="19.8" cy="29.6" r="1.1" fill="currentColor" />
      <path d="M28 18.5c2-4 6-5 9-4-1 3-4 5-7 6" fill="#fff" opacity="0.28" />
      <path d="M30 45c2 3 5 4 8 4-1-3-3-5-6-6" fill="#fff" opacity="0.18" />
      {tail && <path d="M12 32c4 2 8 3 12 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.25" />}
    </Illus>
  );
}

/* --- Креветка: изогнутое сегментное тело с усами --- */
function Shrimp() {
  return (
    <Illus>
      <path
        d="M20 46c-6-4-8-12-4-18 4-7 13-10 20-7l-3 5c-5-2-11 0-14 5-2 4-1 9 2 12"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M18 40l7-2 3 7-6 3z" fill="currentColor" opacity="0.55" />
      <path d="M28 36l8-1 2 7-7 2z" fill="currentColor" opacity="0.75" />
      <path d="M37 33l8 0 2 6-7 2z" fill="currentColor" opacity="0.6" />
      <path d="M44 30c3-2 8-3 12-1M45 26c2-3 6-5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      <circle cx="22" cy="31" r="2" fill="#fff" opacity="0.95" />
      <circle cx="22.6" cy="31.4" r="0.9" fill="currentColor" />
    </Illus>
  );
}

/* --- Гребешок: раковина с рёбрами --- */
function Scallop() {
  return (
    <Illus>
      <path
        d="M32 10c11 0 20 9 20 21 0 13-9 23-20 23S12 44 12 31c0-12 9-21 20-21z"
        fill="currentColor"
        opacity="0.85"
      />
      <path d="M32 12v40M32 12c-7 3-11 10-11 19s4 16 11 21M32 12c7 3 11 10 11 19s-4 16-11 21" stroke="#fff" strokeWidth="1.6" opacity="0.3" />
      <path d="M32 10c-3-3-8-4-11-2 2 2 5 3 8 3M32 10c3-3 8-4 11-2-2 2-5 3-8 3" fill="currentColor" opacity="0.55" />
    </Illus>
  );
}

/* --- Икра: баночка с горкой икры --- */
function CaviarJar() {
  return (
    <Illus>
      <rect x="17" y="22" width="30" height="28" rx="5" fill="currentColor" opacity="0.85" />
      <rect x="14" y="15" width="36" height="9" rx="4.5" fill="currentColor" opacity="0.6" />
      <path d="M20 30c4-4 9-6 12-6s8 2 12 6c-3 2-7 3-12 3s-9-1-12-3z" fill="#fff" opacity="0.25" />
      <circle cx="26" cy="30" r="1.4" fill="#fff" opacity="0.5" />
      <circle cx="32" cy="28" r="1.4" fill="#fff" opacity="0.4" />
      <circle cx="38" cy="30" r="1.4" fill="#fff" opacity="0.5" />
      <circle cx="29" cy="33" r="1.4" fill="#fff" opacity="0.35" />
      <circle cx="35" cy="33" r="1.4" fill="#fff" opacity="0.35" />
    </Illus>
  );
}

/* --- Мидии: две раскрытые раковины --- */
function Mussels() {
  return (
    <Illus>
      <path d="M14 40c-2-12 6-22 17-22 2 8-2 20-11 24-3-0.5-5-1-6-2z" fill="currentColor" opacity="0.85" />
      <path d="M50 42c2-12-6-22-17-22-2 8 2 20 11 24 3-0.5 5-1 6-2z" fill="currentColor" opacity="0.65" />
      <path d="M31 18c-6 2-10 8-10 14 4-2 8-6 10-14z" fill="#fff" opacity="0.22" />
      <path d="M33 18c6 2 10 8 10 14-4-2-8-6-10-14z" fill="#fff" opacity="0.16" />
      <path d="M20 46l-4 6M44 48l4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </Illus>
  );
}

/* --- Кальмар: тушку с щупальцами --- */
function Squid() {
  return (
    <Illus>
      <path
        d="M32 8c8 0 13 6 13 14 0 7-4 12-9 14l1 8-5-4-4 4 1-8c-5-2-9-7-9-14C20 14 24 8 32 8z"
        fill="currentColor"
        opacity="0.85"
      />
      <path d="M27 36l-2 10 4-4M37 36l2 10-4-4" fill="currentColor" opacity="0.55" />
      <path d="M31 40l-1 9 4-5" fill="currentColor" opacity="0.45" />
      <circle cx="27" cy="20" r="2.2" fill="#fff" opacity="0.9" />
      <circle cx="37" cy="20" r="2.2" fill="#fff" opacity="0.9" />
      <circle cx="27.6" cy="20.4" r="0.9" fill="currentColor" />
      <circle cx="37.6" cy="20.4" r="0.9" fill="currentColor" />
    </Illus>
  );
}

/* --- Краб (запасная иллюстрация категории «морепродукты») --- */
function Crab() {
  return (
    <Illus>
      <ellipse cx="32" cy="36" rx="14" ry="10" fill="currentColor" opacity="0.85" />
      <path d="M20 30l-7-6c-3 1-4 4-3 7l10 1M44 30l7-6c3 1 4 4 3 7l-10 1" fill="currentColor" opacity="0.6" />
      <circle cx="18" cy="22" r="2" fill="#fff" opacity="0.9" />
      <circle cx="46" cy="22" r="2" fill="#fff" opacity="0.9" />
      <path d="M24 44l-3 6M32 46v6M40 44l3 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M26 34c2-2 10-2 12 0" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.25" />
    </Illus>
  );
}

const BY_NAME = [
  [/форел|сибас|скумбр|лосос|горбуш|треск|камбал|селд/i, () => <Fish />],
  [/креветк/i, () => <Shrimp />],
  [/гребеш/i, () => <Scallop />],
  [/икр/i, () => <CaviarJar />],
  [/миди/i, () => <Mussels />],
  [/кальмар/i, () => <Squid />],
  [/краб/i, () => <Crab />],
];

const BY_CATEGORY = {
  fish: () => <Fish />,
  seafood: () => <Shrimp />,
  caviar: () => <CaviarJar />,
  frozen: () => <Mussels />,
};

// Цвет плитки-подложки: тёплый моряк-градиент по категориям.
const TILE = {
  fish: "from-sea-soft to-[#c9e7ef] text-sea-deep",
  seafood: "from-[#fdeee4] to-[#fbdcc8] text-accent-dark",
  caviar: "from-[#f3e8ff] to-[#e6d5f7] text-[#7c3aed]",
  frozen: "from-[#e8f1f8] to-[#dbeaf4] text-sea-deep",
};

/**
 * Плитка-визуал товара. Приоритет: реальное фото > SVG-иллюстрация > иконка рыбы.
 * Размер задаётся пропом size ("md" — карточка списка, "lg" — страница товара).
 */
export default function ProductVisual({ product, size = "md", className = "" }) {
  const tile = TILE[product.category] ?? TILE.fish;
  const box = size === "lg" ? "h-44 w-full" : "h-16 w-16";

  if (product.photo && !/\.(mp4|webm|mov|m4v)(?:$|\?)/i.test(product.photo)) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-2xl ${box} ${className}`}
      >
        <img
          src={product.photo}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </span>
    );
  }

  const match = BY_NAME.find(([re]) => re.test(product.name));
  const Illustration = (match?.[1] ?? BY_CATEGORY[product.category] ?? (() => null))();

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${tile} ${box} ${className}`}
    >
      {Illustration ?? <FishIcon className="h-1/2 w-1/2" />}
    </span>
  );
}
