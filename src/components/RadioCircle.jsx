import { CheckIcon } from "./icons";

export default function RadioCircle({ checked, size = "md" }) {
  const dims = size === "sm" ? "h-[18px] w-[18px]" : "h-[22px] w-[22px]";

  return (
    <span
      className={[
        dims,
        "flex shrink-0 items-center justify-center rounded-full transition-all duration-200",
        checked ? "bg-brand" : "border-[1.5px] border-line bg-card",
      ].join(" ")}
    >
      {checked && <CheckIcon className="h-3 w-3 text-white" />}
    </span>
  );
}
