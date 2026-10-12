function MirLogo() {
  return (
    <span className="flex h-[16px] items-center rounded-[3px] bg-[#1a1f71] px-1 text-[9px] leading-none font-bold text-white">
      МИР
    </span>
  );
}

function VisaLogo() {
  return (
    <span className="flex h-[16px] items-center rounded-[3px] bg-[#1434cb] px-1 text-[8px] leading-none font-bold italic tracking-tight text-white">
      VISA
    </span>
  );
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 34 20" className="h-[16px] w-[26px]" aria-hidden="true">
      <circle cx="12" cy="10" r="9" fill="#eb001b" />
      <circle cx="22" cy="10" r="9" fill="#f79e1b" />
      <path
        d="M17 3.6a9 9 0 000 12.8 9 9 0 000-12.8z"
        fill="#ff5f00"
        opacity=".85"
      />
    </svg>
  );
}

export function CardLogos() {
  return (
    <span className="mt-2 flex items-center gap-1.5">
      <MirLogo />
      <VisaLogo />
      <MastercardLogo />
    </span>
  );
}

export default CardLogos;
