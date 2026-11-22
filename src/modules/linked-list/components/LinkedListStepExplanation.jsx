import { Info, Gauge } from "lucide-react";

export default function LinkedListStepExplanation({
  lastAction = null,
  length = 0,
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* Operation Explanation Card */}
      <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#A1764E]">
            <Info size={16} />
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#1F1B18]">
              Pointer Updates &amp; Actions
            </h4>
          </div>
          {lastAction?.type && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-mono font-bold ${
                lastAction.type.startsWith("insert")
                  ? "bg-[#E6EFE6] text-[#2D4B34]"
                  : "bg-[#FEE2E2] text-[#991B1B]"
              }`}
            >
              {lastAction.type.toUpperCase()}
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#4A3B32]">
          {lastAction?.message || "Select an insertion or deletion operation to observe how next pointers and head references change."}
        </p>

        {lastAction?.pointerCode && (
          <div className="mt-4 rounded-xl border border-[#EEE5DB] bg-white p-3 font-mono text-xs">
            <span className="text-[#8C837B]">Pointer rewiring: </span>
            <strong className="text-[#A1764E]">{lastAction.pointerCode}</strong>
          </div>
        )}
      </div>

      {/* Complexity Card */}
      <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-5 shadow-sm">
        <div className="flex items-center gap-2 text-[#A1764E]">
          <Gauge size={16} />
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#1F1B18]">
            Operation Complexity Overview
          </h4>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="rounded-xl border border-[#EEE5DB] bg-white p-3">
            <span className="text-[11px] text-[#8C837B] uppercase tracking-wider">Total Nodes</span>
            <p className="mt-1 text-base font-bold text-[#1F1B18]">{length}</p>
          </div>
          <div className="rounded-xl border border-[#EEE5DB] bg-white p-3">
            <span className="text-[11px] text-[#8C837B] uppercase tracking-wider">Head Ops</span>
            <p className="mt-1 text-base font-bold text-[#4B7754]">O(1) Time</p>
          </div>
          <div className="rounded-xl border border-[#EEE5DB] bg-white p-3">
            <span className="text-[11px] text-[#8C837B] uppercase tracking-wider">Tail Ops</span>
            <p className="mt-1 text-base font-bold text-[#D97706]">O(n) Time</p>
          </div>
          <div className="rounded-xl border border-[#EEE5DB] bg-white p-3">
            <span className="text-[11px] text-[#8C837B] uppercase tracking-wider">Positional Ops</span>
            <p className="mt-1 text-base font-bold text-[#A1764E]">O(k) Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
