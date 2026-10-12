export default function PageHeader({ title, subtitle, className = "" }) {
  return (
    <div className={`w-full text-left ${className}`}>
      <h1 className="text-[clamp(20px,5.2vw,25px)] leading-[1.2] font-bold tracking-[-0.02em] text-ink">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-[clamp(13px,3.4vw,14.5px)] leading-snug text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
