import { CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";

export default function TheorySection({ content }) {
  if (!content) return null;

  return (
    <section className="space-y-12">
      {/* Overview & Key Takeaways Grid */}
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Overview */}
        <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Foundations
          </p>
          <h3 className="mt-2 font-display text-3xl text-[#1F1B18]">
            {content.overview.heading}
          </h3>
          <p className="mt-4 text-base leading-8 text-[#5F5952]">
            {content.overview.description}
          </p>
        </div>

        {/* Takeaways */}
        <div className="rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Quick Summary
          </p>
          <h4 className="mt-2 font-display text-2xl text-[#1F1B18]">
            Key Takeaways
          </h4>
          <ul className="mt-4 space-y-3">
            {content.takeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm leading-6 text-[#5F5952]">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#A1764E]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Advantages, Disadvantages & Applications */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Advantages */}
        <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2.5 text-[#5A7354]">
            <CheckCircle2 size={20} />
            <h4 className="font-semibold text-[#1F1B18]">Advantages</h4>
          </div>
          <ul className="space-y-2.5 text-sm leading-6 text-[#6B645D]">
            {content.advantages.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#5A7354]">•</span>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disadvantages */}
        <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2.5 text-[#A84533]">
            <ShieldAlert size={20} />
            <h4 className="font-semibold text-[#1F1B18]">Trade-offs</h4>
          </div>
          <ul className="space-y-2.5 text-sm leading-6 text-[#6B645D]">
            {content.disadvantages.map((dis, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#A84533]">•</span>
                <span>{dis}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Applications */}
        <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2.5 text-[#A1764E]">
            <Sparkles size={20} />
            <h4 className="font-semibold text-[#1F1B18]">Applications</h4>
          </div>
          <ul className="space-y-2.5 text-sm leading-6 text-[#6B645D]">
            {content.applications.map((app, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#A1764E]">•</span>
                <span>{app}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
