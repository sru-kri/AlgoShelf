import { useState } from "react";
import { ArrowDown, BookOpen, Cpu, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AlgorithmCard from "../../../components/AlgorithmCard";
import BackToShelf from "../../sorting/components/ui/BackToShelf";
import Footer from "../../../components/Footer";

const concepts = [
  {
    title: "Contiguous Memory",
    description:
      "All elements in an array are stored side by side in consecutive memory addresses. This structure enables predictable hardware caching and instantaneous pointer arithmetic.",
    example: "Memory addresses: [0x1000, 0x1004, 0x1008, 0x100C...]",
  },
  {
    title: "O(1) Random Access",
    description:
      "Because each item occupies a known size, the computer computes any element's exact location using formula: Address = Base + Index × Size.",
    example: "Accessing arr[0] is just as fast as accessing arr[1,000,000].",
  },
  {
    title: "Insertion & Deletion Cost",
    description:
      "Inserting or deleting an element at an arbitrary index requires shifting all succeeding elements to maintain contiguous ordering, resulting in O(n) worst-case time.",
    example: "Inserting at index 0 shifts all n elements one position to the right.",
  },
  {
    title: "Cache Locality",
    description:
      "Modern CPUs load contiguous memory into ultra-fast cache lines ahead of time. Iterating through an array is dramatically faster than traversing pointer-based structures.",
    example: "Sequential array traversal maximizes CPU L1/L2 cache hits.",
  },
];

export default function ArraysHome() {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      chapter: "Chapter I",
      title: "Insertion & Deletion",
      description:
        "Visualize how array elements make room for new data or close the gap after a deletion.",
      complexity: "O(n)",
      difficulty: "Beginner",
      path: "/learn/arrays/operations",
    },
    {
      chapter: "Chapter II",
      title: "Array Traversal",
      description:
        "Iterate over every item from index 0 to length - 1. The bedrock of linear processing.",
      complexity: "O(n)",
      difficulty: "Beginner",
      path: "/learn/arrays/traversal",
      comingSoon: true,
    },
  ];

  const scrollToChapters = () => {
    document.getElementById("array-chapters")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <BackToShelf />

        {/* Editorial Header */}
        <section className="grid gap-12 py-8 lg:grid-cols-[1.3fr_1fr] lg:items-center border-b border-[#ECE3D8] pb-16">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px w-12 bg-[#D9C9B6]" />
              <p className="font-body text-xs font-semibold uppercase tracking-[0.4em] text-[#A07A56]">
                Book I
              </p>
            </div>

            <h1 className="font-display text-6xl leading-[0.95] text-[#202020] sm:text-7xl md:text-8xl">
              Array
              <br />
              Foundations
            </h1>

            <p className="font-editorial mt-6 max-w-lg text-xl italic leading-relaxed text-[#6B5B4D]">
              “Before data can dance through complex algorithms, it must first sit in contiguous harmony within memory.”
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6B645D]">
              Arrays are the bedrock of computer science. By organizing elements in sequential memory addresses, they provide instant index-based access and serve as the physical substrate for stacks, queues, hash tables, and matrices.
            </p>

            <button
              type="button"
              onClick={scrollToChapters}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#9D7653] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#8A6645]"
            >
              <BookOpen size={18} />
              <span>Start Exploring</span>
              <ArrowDown
                size={17}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </button>
          </div>

          {/* Visual Memory Strip Representation */}
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-8 shadow-sm">
              <div className="flex items-center gap-3 text-[#A1764E]">
                <Cpu size={22} />
                <span className="text-xs font-semibold uppercase tracking-widest">
                  Memory Layout Simulation
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl text-[#1F1B18]">
                Contiguous Address Blocks
              </h3>

              {/* Animated Memory Blocks */}
              <div className="mt-6 space-y-2">
                {[
                  { idx: 0, addr: "0x1000", val: 42, label: "Base Address" },
                  { idx: 1, addr: "0x1004", val: 17, label: "+4 Bytes" },
                  { idx: 2, addr: "0x1008", val: 89, label: "+8 Bytes" },
                  { idx: 3, addr: "0x100C", val: 24, label: "+12 Bytes" },
                ].map((slot) => (
                  <motion.div
                    key={slot.idx}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between rounded-xl border border-[#EEE5DB] bg-white p-3 font-mono text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded bg-[#FAF8F5] px-2 py-0.5 font-bold text-[#A1764E]">
                        [{slot.idx}]
                      </span>
                      <span className="text-[#8C837B]">{slot.addr}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-[#A07A56]">{slot.label}</span>
                      <span className="w-8 text-right font-bold text-[#1F1B18] text-sm">
                        {slot.val}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-2xl bg-[#F7F2EB] p-3 text-xs text-[#6B5B4D]">
                <Sparkles size={16} className="text-[#A1764E] shrink-0" />
                <span>Formula: Target Address = Base + (Index × Element Size)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Foundations Tabs */}
        <section className="py-16 border-b border-[#ECE3D8]">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A07A56]">
              Foundations
            </p>
            <h2 className="mt-3 font-display text-4xl text-[#202020]">
              The Core Principles of Arrays
            </h2>
          </div>

          <div className="rounded-[30px] border border-[#E8DED2] bg-[#FCFAF7] p-8 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2.5">
              {concepts.map((concept, index) => (
                <button
                  key={concept.title}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    activeTab === index
                      ? "bg-[#9D7653] text-white shadow-md"
                      : "bg-white text-[#6B5B4D] border border-[#E8DED2] hover:bg-[#F7F3EE]"
                  }`}
                >
                  {concept.title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="mt-8 rounded-2xl bg-white p-7"
              >
                <h3 className="font-display text-2xl text-[#202020]">
                  {concepts[activeTab].title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[#666]">
                  {concepts[activeTab].description}
                </p>
                <div className="mt-6 rounded-xl bg-[#F7F5F2] p-4 border border-[#ECE3D8]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9D7653]">
                    Insight
                  </p>
                  <p className="mt-1 font-mono text-xs text-[#555]">
                    {concepts[activeTab].example}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Chapters Section */}
        <section id="array-chapters" className="pt-20">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A07A56]">
              Chapters
            </p>
            <h2 className="mt-3 font-display text-5xl text-[#202020]">
              Interactive Lessons
            </h2>
            <p className="mt-4 text-base text-[#666]">
              Step inside each interactive chapter to explore memory manipulation, live shift animations, and pointer traces.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {chapters.map((ch) => (
              <AlgorithmCard key={ch.title} {...ch} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
