export default function ComplexityCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
        {title}
      </p>
      <h3 className="mt-3 font-mono text-3xl font-bold text-[#1F1B18]">
        {value}
      </h3>
      {subtitle && (
        <p className="mt-2 text-xs text-[#8C837B]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
