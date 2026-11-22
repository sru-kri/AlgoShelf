import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  Shuffle,
  Target,
} from "lucide-react";

export default function SearchControls({
  targetInput,
  onTargetChange,
  onStartSearch,
  onPlayPause,
  playing,
  onNext,
  onPrev,
  onReset,
  onShuffle,
  onPickPresent,
  onPickAbsent,
  currentStep,
  totalSteps,
  speed,
  onSpeedChange,
  isSearching,
  error,
}) {
  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Controls
          </p>
          <h2 className="mt-1 font-display text-3xl text-[#1F1B18]">
            Configure Search
          </h2>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-1.5 text-xs">
          <span className="px-2 text-[#8C837B]">Speed:</span>
          {[
            { label: "0.5x", val: 1000 },
            { label: "1x", val: 650 },
            { label: "2x", val: 350 },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onSpeedChange(item.val)}
              className={`rounded-xl px-2.5 py-1 font-medium transition ${
                speed === item.val
                  ? "bg-[#1F1B18] text-white"
                  : "text-[#5F5952] hover:bg-[#F2ECE4]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Target Input Section */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="search-target-input"
            className="mb-2 block text-sm font-medium text-[#514940]"
          >
            Target Value
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Target
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1764E]"
              />
              <input
                id="search-target-input"
                type="number"
                value={targetInput}
                onChange={(e) => onTargetChange(e.target.value)}
                placeholder="e.g. 42"
                disabled={isSearching}
                className="h-12 w-full rounded-2xl border border-[#DDD2C6] bg-[#FCFBF8] pl-10 pr-4 font-mono text-base font-semibold text-[#1F1B18] outline-none transition focus:border-[#A1764E] focus:ring-2 focus:ring-[#A1764E]/20 disabled:opacity-60"
              />
            </div>

            <button
              type="button"
              onClick={onStartSearch}
              disabled={isSearching && playing}
              className="inline-flex h-12 min-w-[140px] items-center justify-center gap-2 rounded-2xl bg-[#1F1B18] px-6 text-sm font-medium text-white transition hover:bg-[#342D28] disabled:opacity-50"
            >
              Start Search
            </button>
          </div>

          {error && (
            <p className="mt-2 text-sm text-[#A84533]">{error}</p>
          )}

          {/* Quick preset buttons */}
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="self-center text-[#8C837B]">Quick target:</span>
            <button
              type="button"
              onClick={onPickPresent}
              disabled={isSearching}
              className="rounded-lg border border-[#DDD2C6] bg-white px-2.5 py-1 text-[#6B5B4D] hover:border-[#A1764E] hover:bg-[#FAF8F5] disabled:opacity-50"
            >
              Pick from array
            </button>
            <button
              type="button"
              onClick={onPickAbsent}
              disabled={isSearching}
              className="rounded-lg border border-[#DDD2C6] bg-white px-2.5 py-1 text-[#6B5B4D] hover:border-[#A1764E] hover:bg-[#FAF8F5] disabled:opacity-50"
            >
              Pick missing value
            </button>
          </div>
        </div>

        {/* Stepper & Playback Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#EEE5DB] pt-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              disabled={!isSearching || currentStep <= 0}
              aria-label="Previous step"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#DDD2C6] bg-white text-[#514940] transition hover:border-[#A1764E] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={onPlayPause}
              disabled={!isSearching || currentStep >= totalSteps - 1}
              className="inline-flex h-11 min-w-[120px] items-center justify-center gap-2 rounded-xl bg-[#1F1B18] px-5 text-sm font-medium text-white transition hover:bg-[#342D28] disabled:opacity-50"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
              {playing ? "Pause" : "Play"}
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={!isSearching || currentStep >= totalSteps - 1}
              aria-label="Next step"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#DDD2C6] bg-white text-[#514940] transition hover:border-[#A1764E] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DDD2C6] bg-white px-4 text-sm font-medium text-[#514940] transition hover:border-[#A1764E] hover:bg-[#FCFAF7]"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>

          <button
            type="button"
            onClick={onShuffle}
            disabled={playing}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DDD2C6] bg-white px-4 text-sm font-medium text-[#514940] transition hover:border-[#A1764E] hover:bg-[#FCFAF7] disabled:opacity-50"
          >
            <Shuffle size={15} />
            Shuffle Array
          </button>
        </div>
      </div>
    </div>
  );
}
