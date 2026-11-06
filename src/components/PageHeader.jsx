export default function PageHeader({ title, subtitle, className = "" }) {
  return (
    <div className={`w-full text-left ${className}`}>
      <h1 className="text-[clamp(22px,5.6vw,26px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-[clamp(13px,3.4vw,14.5px)] leading-snug font-medium text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
