import { useState } from "react";
import { ArrowLeft, ArrowRight, Clock3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import SearchVisualizer from "../components/SearchVisualizer";
import SearchControls from "../components/SearchControls";
import StepExplanation from "../components/StepExplanation";
import CodeBlock from "../components/CodeBlock";
import ComplexityCard from "../components/ComplexityCard";
import TheorySection from "../components/TheorySection";
import { linearContent } from "../data/content/linear";
import { linearSearchSteps } from "../utils/searchHelpers";
import useSearchControls from "../hooks/useSearchControls";
import useSearchAnimation from "../hooks/useSearchAnimation";

export default function LinearSearch() {
  const {
    array,
    targetInput,
    setTargetInput,
    error,
    handleShuffle,
    handlePickPresent,
    handlePickAbsent,
    validateTarget,
  } = useSearchControls(8);

  const [steps, setSteps] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const animation = useSearchAnimation(steps, 650);

  const startSearch = () => {
    const targetVal = validateTarget();
    if (targetVal === null) return;

    const generatedSteps = linearSearchSteps(array, targetVal);
    setSteps(generatedSteps);
    setIsSearching(true);
    animation.reset();
    animation.play();
  };

  const handleResetSearch = () => {
    animation.reset();
    setIsSearching(false);
    setSteps([]);
  };

  const onShuffleWithReset = () => {
    handleResetSearch();
    handleShuffle();
  };

  const currentFrame = animation.currentFrame || {
    array,
    currentIndex: -1,
    checkedIndices: [],
    foundIndex: -1,
    target: Number(targetInput) || null,
    status: "idle",
    comparisons: 0,
    currentLine: -1,
    message: {
      title: "Ready to Search",
      description: "Set a target value and click Start Search to watch Linear Search in action.",
      insight: "Linear Search examines each item in the array sequentially until the target is found.",
    },
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      {/* Editorial Chapter Hero */}
      <header className="border-b border-[#ECE3D8] bg-[#F7F5F2]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          <Link
            to="/searching"
            className="inline-flex items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white"
          >
            <ArrowLeft size={16} />
            Back to Searching Shelf
          </Link>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-[#D8C5B0]" />
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
                  BOOK III · {linearContent.chapter}
                </p>
              </div>

              <h1 className="mt-6 font-display text-6xl leading-[0.95] text-[#1F1B18] sm:text-7xl md:text-8xl">
                {linearContent.title}
              </h1>

              <p className="mt-4 text-xl text-[#7A7068]">
                {linearContent.subtitle}
              </p>

              <div className="mt-6 h-[2px] w-16 rounded-full bg-[#A1764E]" />

              <div className="mt-8 max-w-xl border-l-2 border-[#DDD2C5] pl-6 text-[#5F5952]">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
                  Editorial Note
                </p>
                <p className="mt-2 text-base leading-7 italic">
                  “Before algorithms learn to divide and conquer, they must first master the honesty of looking at every piece of data.”
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DDD1] bg-white px-3.5 py-1.5 font-medium text-[#6B5B4D]">
                  <Clock3 size={15} /> 5 min read
                </span>
                <span className="rounded-full bg-green-100 px-3.5 py-1.5 font-medium text-green-700">
                  Beginner
                </span>
                <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-medium text-[#8C837B]">
                  Unsorted Inputs Supported
                </span>
              </div>
            </div>

            {/* Quick Overview Card */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-7 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
                <Sparkles size={16} />
                Quick Intuition
              </div>
              <p className="mt-3 text-sm leading-7 text-[#5F5952]">
                Linear search is like flipping through pages of an unindexed notebook one by one. You check the first page, then the second, until you locate the page you need.
              </p>

              <div className="mt-6 rounded-2xl border border-[#EEE5DB] bg-white p-4">
                <p className="text-xs uppercase tracking-wider text-[#8C837B]">
                  Complexity Highlights
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-center font-mono">
                  <div className="rounded-xl bg-[#FAF8F5] p-2">
                    <span className="text-xs text-[#8C837B]">Best:</span>{" "}
                    <strong className="text-sm text-[#1F1B18]">O(1)</strong>
                  </div>
                  <div className="rounded-xl bg-[#FAF8F5] p-2">
                    <span className="text-xs text-[#8C837B]">Worst:</span>{" "}
                    <strong className="text-sm text-[#1F1B18]">O(n)</strong>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  document.getElementById("interactive-visualizer")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F1B18] py-3 text-sm font-medium text-white transition hover:bg-[#342D28]"
              >
                Jump to Visualizer
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Section */}
      <main id="interactive-visualizer" className="mx-auto max-w-7xl px-6 py-14 md:px-8 space-y-10">
        {/* Visualizer Display */}
        <SearchVisualizer
          array={currentFrame.array}
          currentIndex={currentFrame.currentIndex}
          checkedIndices={currentFrame.checkedIndices}
          foundIndex={currentFrame.foundIndex}
          target={currentFrame.target}
          status={currentFrame.status}
        />

        {/* Controls */}
        <SearchControls
          targetInput={targetInput}
          onTargetChange={setTargetInput}
          onStartSearch={startSearch}
          onPlayPause={animation.togglePlayPause}
          playing={animation.playing}
          onNext={animation.nextStep}
          onPrev={animation.prevStep}
          onReset={handleResetSearch}
          onShuffle={onShuffleWithReset}
          onPickPresent={handlePickPresent}
          onPickAbsent={handlePickAbsent}
          currentStep={animation.currentStep}
          totalSteps={animation.totalSteps}
          speed={animation.speed}
          onSpeedChange={animation.setSpeed}
          isSearching={isSearching}
          error={error}
        />

        {/* Step Explanation & Pseudocode Grid */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <StepExplanation
            message={currentFrame.message}
            currentStep={animation.currentStep}
            totalSteps={animation.totalSteps}
            comparisons={currentFrame.comparisons}
          />

          <CodeBlock
            pseudocode={linearContent.pseudocode}
            currentLine={currentFrame.currentLine}
          />
        </div>

        {/* Complexity Analysis Cards */}
        <section className="pt-8 border-t border-[#ECE3D8]">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
            Performance Analysis
          </p>
          <h2 className="mt-2 font-display text-4xl text-[#1F1B18]">
            Complexity Breakdown
          </h2>
          <p className="mt-2 max-w-2xl text-base text-[#6B645D]">
            Understand how Linear Search behaves as your collection grows from ten elements to ten million.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ComplexityCard
              title="Best Case"
              value={linearContent.complexity.best}
              subtitle="Target is at the very first index (index 0)"
            />
            <ComplexityCard
              title="Average Case"
              value={linearContent.complexity.average}
              subtitle="Target is found halfway through on average"
            />
            <ComplexityCard
              title="Worst Case"
              value={linearContent.complexity.worst}
              subtitle="Target is at the last index or absent"
            />
            <ComplexityCard
              title="Auxiliary Space"
              value={linearContent.complexity.space}
              subtitle="Operates in-place with no extra memory"
            />
          </div>
        </section>

        {/* Theory & Discussion */}
        <section className="pt-6">
          <TheorySection content={linearContent} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
