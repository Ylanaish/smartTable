import { MapPinIcon } from "./icons";

export default function AddressInput({ value, onChange }) {
  return (
    <div className="flex h-11 items-center gap-2.5 rounded-xl border border-line bg-card px-3.5 transition-colors focus-within:border-ink/35">
      <MapPinIcon className="h-[18px] w-[18px] shrink-0 text-muted" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Город, улица, дом, подъезд/этаж"
        className="w-full min-w-0 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted/80"
      />
    </div>
  );
}
