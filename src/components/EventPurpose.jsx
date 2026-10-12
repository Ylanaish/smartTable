import Chip from "./Chip";
import { PURPOSES } from "../data/catalog";

export default function EventPurpose({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {PURPOSES.map((purpose) => (
        <Chip
          key={purpose.id}
          label={purpose.label}
          active={purpose.id === value}
          onClick={() => onChange(purpose.id)}
        />
      ))}
    </div>
  );
}
