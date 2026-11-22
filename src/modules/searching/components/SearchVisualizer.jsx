import { motion } from "framer-motion";
import { Check, Search, X } from "lucide-react";

export default function SearchVisualizer({
  array,
  currentIndex = -1,
  checkedIndices = [],
  foundIndex = -1,
  target = null,
  status = "idle",
}) {
  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Header Info */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Search Space
          </p>
          <h2 className="mt-1 font-display text-3xl text-[#1F1B18]">
            {array.length} Elements
          </h2>
        </div>

        {/* Target Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2">
            <Search size={16} className="text-[#A1764E]" />
            <span className="text-xs uppercase tracking-wider text-[#8C837B]">
              Target:
            </span>
            <span className="font-mono text-lg font-bold text-[#1F1B18]">
              {target !== null ? target : "--"}
            </span>
          </div>

          {/* Status Badge */}
          {status === "found" && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#EAF2E8] px-3.5 py-1.5 text-xs font-semibold text-[#3D5A37]">
              <Check size={14} />
              Found at index {foundIndex}
            </div>
          )}
          {status === "not_found" && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#FCEEEA] px-3.5 py-1.5 text-xs font-semibold text-[#A84533]">
              <X size={14} />
              Target not found
            </div>
          )}
          {status === "checking" && (
            <div className="flex items-center gap-1.5 rounded-full bg-[#FEF9EE] px-3.5 py-1.5 text-xs font-semibold text-[#8B5A2B]">
              <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[#A1764E]" />
              Checking index {currentIndex}
            </div>
          )}
        </div>
      </div>

      {/* Array Elements Container */}
      <div className="min-h-44 overflow-x-auto py-6">
        <div className="flex min-w-max items-center justify-center gap-4 px-4">
          {array.map((value, index) => {
            const isCurrent = index === currentIndex;
            const isFound = index === foundIndex;
            const isChecked = checkedIndices.includes(index) && !isFound;

            let cardStyle =
              "border-[#E8DDD1] bg-[#FCFBF8] text-[#1F1B18] shadow-sm";

            if (isFound) {
              cardStyle =
                "border-[#5A7354] bg-[#EAF2E8] text-[#3D5A37] shadow-md ring-2 ring-[#5A7354]/30";
            } else if (isCurrent) {
              cardStyle =
                "border-[#D39B2A] bg-[#FEF9EE] text-[#8B5A2B] shadow-lg ring-2 ring-[#D39B2A]/40";
            } else if (isChecked) {
              cardStyle = "border-[#E8E2D9] bg-[#F7F5F2] text-[#8C837B] opacity-60";
            }

            return (
              <motion.div
                key={index}
                layout
                animate={{
                  scale: isFound ? 1.08 : isCurrent ? 1.05 : 1,
                  y: isFound ? -8 : isCurrent ? -5 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 22,
                }}
                className="flex flex-col items-center gap-3"
              >
                {/* Pointer indicator above current */}
                <div className="h-6 flex items-center justify-center">
                  {isCurrent && !isFound && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-full bg-[#A1764E] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                    >
                      Scan
                    </motion.div>
                  )}
                  {isFound && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="rounded-full bg-[#5A7354] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                    >
                      Match
                    </motion.div>
                  )}
                </div>

                {/* Number Box */}
                <div
                  className={`flex h-20 w-18 items-center justify-center rounded-2xl border font-mono text-2xl font-bold transition-all duration-300 ${cardStyle}`}
                >
                  {value}
                </div>

                {/* Index Subtitle */}
                <span
                  className={`font-mono text-xs font-medium ${
                    isFound
                      ? "text-[#5A7354] font-semibold"
                      : isCurrent
                      ? "text-[#A1764E] font-semibold"
                      : "text-[#8C837B]"
                  }`}
                >
                  [{index}]
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
