export default function Advantage({ iconSrc, mainText, subText }) {
  return (
    <div className="flex items-center gap-3.5">
      <img src={iconSrc} alt="" className="h-7 w-7 shrink-0 object-contain" />
      <span className="flex flex-col">
        <span className="text-[13px] leading-4 font-semibold text-white drop-shadow">
          {mainText}
        </span>
        <span className="text-[11px] leading-4 text-white/70">{subText}</span>
      </span>
    </div>
  );
}
