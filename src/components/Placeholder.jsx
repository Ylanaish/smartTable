const PALETTES = [
  ["#2b1c14", "#7a4a26", "#c98f4e"],
  ["#1e2419", "#5c6b45", "#b7c08c"],
  ["#22232a", "#6d6f7c", "#cfd1d8"],
  ["#2c1620", "#7d3350", "#cf8fa8"],
  ["#2a231a", "#8a6a44", "#dcbb8c"],
  ["#132029", "#2f5f74", "#8fbccd"],
];

export default function Placeholder({ seed = 0, className = "", alt = "" }) {
  const palette = PALETTES[Math.abs(seed) % PALETTES.length];
  const angle = 120 + (Math.abs(seed) % 4) * 35;
  const cx = 28 + (Math.abs(seed) % 3) * 22;
  const cy = 30 + (Math.abs(seed) % 5) * 9;

  const background = [
    `radial-gradient(circle at ${cx}% ${cy}%, ${palette[2]}55 0%, transparent 55%)`,
    `radial-gradient(circle at ${100 - cx}% ${100 - cy}%, ${palette[1]}66 0%, transparent 60%)`,
    `linear-gradient(${angle}deg, ${palette[0]} 0%, ${palette[1]} 100%)`,
  ].join(", ");

  return (
    <span
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : "true"}
      style={{ backgroundImage: background }}
      className={`block ${className}`}
    />
  );
}
