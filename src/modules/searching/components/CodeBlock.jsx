import { ChevronRight } from "lucide-react";

export default function CodeBlock({
  pseudocode = [],
  currentLine = -1,
}) {
  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
          Algorithm Trace
        </p>
        <h3 className="mt-1 font-display text-3xl text-[#1F1B18]">
          Pseudocode
        </h3>
      </div>

      <div className="space-y-1.5 font-mono text-sm">
        {pseudocode.map((line, index) => {
          const active = currentLine === index;

          return (
            <div
              key={index}
              className={`flex items-center rounded-xl px-3 py-2 transition-all duration-200 ${
                active
                  ? "bg-[#F7EFE3] font-semibold text-[#1F1B18] shadow-sm"
                  : "text-[#5F5952] hover:bg-[#FAF8F5]"
              }`}
            >
              {/* Active Arrow indicator */}
              <div className="w-6 flex items-center justify-center">
                {active ? (
                  <ChevronRight size={16} className="text-[#A1764E]" />
                ) : (
                  <span className="text-xs text-[#C5B7A8]">{index + 1}</span>
                )}
              </div>

              {/* Accent bar */}
              <div
                className={`mx-3 h-5 w-[2px] rounded-full transition-all ${
                  active ? "bg-[#A1764E]" : "bg-transparent"
                }`}
              />

              {/* Line Code */}
              <code className="flex-1 whitespace-pre">{line}</code>
            </div>
          );
        })}
      </div>
    </div>
  );
}
