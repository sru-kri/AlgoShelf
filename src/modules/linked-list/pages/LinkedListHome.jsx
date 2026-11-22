import { useState } from "react";
import { ArrowDown, BookOpen, GitCommit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AlgorithmCard from "../../../components/AlgorithmCard";
import BackToShelf from "../../sorting/components/ui/BackToShelf";
import Footer from "../../../components/Footer";
import { LINKED_LIST_CONCEPTS } from "../data/linkedListData";

export default function LinkedListHome() {
  const [activeTab, setActiveTab] = useState(0);

  const chapters = [
    {
      chapter: "Chapter I",
      title: "Singly Linked List Operations",
      description:
        "Visualize dynamic node insertion and deletion at the beginning, end, or specific positions with live pointer tracing.",
      complexity: "O(1) / O(n)",
      difficulty: "Beginner",
      path: "/learn/linked-list/operations",
    },
    {
      chapter: "Chapter II",
      title: "Linked List Traversal",
      description:
        "Traverse linear chains of node pointers and search for target values across heap memory.",
      complexity: "O(n)",
      difficulty: "Beginner",
      path: "/learn/linked-list/traversal",
      comingSoon: true,
    },
  ];

  const scrollToChapters = () => {
    document.getElementById("linked-list-chapters")?.scrollIntoView({
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
              <p className="font-body text-xs font-semibold uppercase tracking-[0.4em] text-[#567156]">
                Linear Structures
              </p>
            </div>

            <h1 className="font-display text-6xl leading-[0.95] text-[#202020] sm:text-7xl md:text-8xl">
              Linked Lists &amp;
              <br />
              Pointers
            </h1>

            <p className="font-editorial mt-6 max-w-lg text-xl italic leading-relaxed text-[#6B5B4D]">
              “Freed from contiguous memory constraints, data travels by reference from one node to the next.”
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#6B645D]">
              Linked lists store collections without requiring contiguous blocks of memory. By connecting nodes through explicit pointers, they enable instantaneous $O(1)$ insertions at the head and dynamic growth without pre-allocated limits.
            </p>

            <button
              type="button"
              onClick={scrollToChapters}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#567156] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#435A43]"
            >
              <BookOpen size={18} />
              <span>Explore Linked Lists</span>
              <ArrowDown
                size={17}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </button>
          </div>

          {/* Micro Visualizer */}
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#EEE5DB] pb-4">
                <div className="flex items-center gap-3 text-[#567156]">
                  <GitCommit size={22} />
                  <span className="font-display text-lg text-[#1F1B18]">
                    Pointer Chain
                  </span>
                </div>
                <span className="rounded-full bg-[#E7EFE7] px-3 py-1 font-mono text-xs font-semibold text-[#567156]">
                  Heap Memory
                </span>
              </div>

              <div className="mt-6 flex items-center justify-center gap-1.5 font-mono text-xs">
                {[15, 30, 45].map((val, idx) => (
                  <div key={val} className="flex items-center">
                    <div className="flex rounded-lg border border-[#D8CDBD] bg-white shadow-sm overflow-hidden">
                      <span className="px-2.5 py-1.5 font-bold text-[#1F1B18]">{val}</span>
                      <span className="bg-[#FAF8F5] px-1.5 py-1.5 text-[9px] text-[#A1764E] border-l border-[#EEE5DB]">●</span>
                    </div>
                    {idx < 2 && <span className="mx-1 text-[#A1764E]">──&gt;</span>}
                  </div>
                ))}
                <span className="ml-1 text-[#8C837B]">──&gt; null</span>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl bg-[#F7F2EB] p-3 text-xs text-[#6B5B4D]">
                <span className="font-mono text-[#4B7754] font-bold">O(1) Head Insert</span>
                <span className="font-mono text-[#D97706] font-bold">O(n) Arbitrary Search</span>
              </div>
            </div>
          </div>
        </section>

        {/* Foundations Tabs */}
        <section className="py-16 border-b border-[#ECE3D8]">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#567156]">
              Foundations
            </p>
            <h2 className="mt-3 font-display text-4xl text-[#202020]">
              Core Principles of Linked Lists
            </h2>
          </div>

          <div className="rounded-[30px] border border-[#E8DED2] bg-[#FCFAF7] p-8 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2.5">
              {LINKED_LIST_CONCEPTS.map((concept, index) => (
                <button
                  key={concept.title}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    activeTab === index
                      ? "bg-[#567156] text-white shadow-md"
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
                  {LINKED_LIST_CONCEPTS[activeTab].title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[#666]">
                  {LINKED_LIST_CONCEPTS[activeTab].description}
                </p>
                <div className="mt-6 rounded-xl bg-[#F7F5F2] p-4 border border-[#ECE3D8]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#567156]">
                    Insight
                  </p>
                  <p className="mt-1 font-mono text-xs text-[#555]">
                    {LINKED_LIST_CONCEPTS[activeTab].example}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Chapters Section */}
        <section id="linked-list-chapters" className="pt-20">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#567156]">
              Chapters
            </p>
            <h2 className="mt-3 font-display text-5xl text-[#202020]">
              Interactive Lessons
            </h2>
            <p className="mt-4 text-base text-[#666]">
              Step inside the linked list laboratory to visualize dynamic pointer rewiring, head/tail insertions, and deletions.
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
