
const LinkedListVisualizer = ({
  nodes = [],
  currentNode = null,
  currentNodeIndex = null,
  traversalSteps = [],
  currentStep = -1,
  status = "idle",
}) => {
  // Find all nodes that have already been visited
  const visitedNodeIndexes = new Set(
    traversalSteps
      .slice(0, currentStep + 1)
      .filter((step) => step.type === "visit")
      .map((step) => step.index)
  );

  // Empty linked list
  if (nodes.length === 0) {
    return (
      <div className="w-full rounded-xl border border-dashed border-[#A1764E]/40 bg-white p-10 text-center">
        <p className="text-lg font-semibold text-[#1F1B18]">
          Your linked list is empty
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Add some nodes to start visualizing the linked list.
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function LinkedListVisualizer({
  nodes = [],
  highlightedIndex = null,
  highlightType = null,
}) {
  if (nodes.length === 0) {
    return (
      <div className="flex h-56 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#D8CDBD] bg-[#FCFBF8] p-6 text-center">
        <p className="font-display text-lg text-[#6B5B4D]">List is Empty (Head = null)</p>
        <p className="mt-1 text-xs text-[#8C837B]">
          Insert a node at the beginning, end, or specific position to build your linked list.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Linked list heading */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-[#1F1B18]">
          Singly Linked List
        </h2>

        <span className="rounded-full bg-[#A1764E]/10 px-3 py-1 text-sm text-[#A1764E]">
          {nodes.length} {nodes.length === 1 ? "Node" : "Nodes"}
        </span>
      </div>

      {/* Nodes and pointer connections */}
      <div className="w-full overflow-x-auto rounded-xl border border-[#E8E1D9] bg-[#F7F5F2] p-6">
        <div className="flex min-w-max items-center gap-3">
          {/* HEAD label */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-[#A1764E]">
              HEAD
            </span>
            <div className="h-1 w-1 rounded-full bg-[#A1764E]" />
          </div>

          {nodes.map((node, index) => {
            const isCurrent = currentNodeIndex === node.id;
            const isVisited = visitedNodeIndexes.has(node.id);

            return (
              <div key={node.id} className="flex items-center gap-3">
                {/* Node card */}
                <div
                  className={`relative flex min-w-[130px] flex-col overflow-hidden rounded-xl border-2 bg-white shadow-sm transition-all duration-300 ${
                    isCurrent
                      ? "scale-105 border-[#A1764E] shadow-lg"
                      : isVisited
                      ? "border-green-500"
                      : "border-[#E8E1D9]"
                  }`}
                >
                  {/* Node title */}
                  <div
                    className={`px-3 py-2 text-center text-xs font-semibold ${
                      isCurrent
                        ? "bg-[#A1764E] text-white"
                        : isVisited
                        ? "bg-green-100 text-green-800"
                        : "bg-[#EEE8E1] text-[#1F1B18]"
                    }`}
                  >
                    NODE {index}
                    {isCurrent && " • CURRENT"}
                    {!isCurrent && isVisited && " • VISITED"}
                  </div>

                  {/* Data and next pointer */}
                  <div className="grid grid-cols-2 divide-x divide-[#E8E1D9]">
                    <div className="p-3 text-center">
                      <p className="text-xs text-gray-500">DATA</p>
                      <p className="mt-1 text-lg font-bold text-[#1F1B18]">
                        {node.data}
                      </p>
                    </div>

                    <div className="p-3 text-center">
                      <p className="text-xs text-gray-500">NEXT</p>
                      <p className="mt-1 text-sm font-semibold text-[#A1764E]">
                        {node.next === null ? "NULL" : `Node ${node.next}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pointer arrow */}
                {node.next !== null && (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-500">
                      next
                    </span>
                    <span className="text-2xl text-[#A1764E]">→</span>
                  </div>
                )}

                {/* NULL pointer */}
                {node.next === null && (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold text-red-500">
                      NULL
                    </span>
                    <span className="text-sm text-red-500">∅</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current node information */}
      <div className="rounded-xl border border-[#E8E1D9] bg-white p-4">
        <h3 className="font-semibold text-[#1F1B18]">
          Traversal Status
        </h3>

        {status === "idle" && (
          <p className="mt-2 text-sm text-gray-500">
            Start traversal to see how each node is visited.
          </p>
        )}

        {status === "running" && currentNode && (
          <p className="mt-2 text-sm text-[#A1764E]">
            Currently visiting Node {currentNode.id} with data:{" "}
            <strong>{currentNode.data}</strong>
          </p>
        )}

        {status === "completed" && (
          <p className="mt-2 text-sm font-medium text-green-700">
            Traversal completed! The last node points to NULL.
          </p>
        )}
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
    <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEE5DB] pb-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-[#1F1B18]">
            Singly Linked List Chain
          </h3>
          <p className="text-xs text-[#8C837B]">
            Pointers link each node sequentially to its successor in dynamic heap memory
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 shadow-sm">
            <span className="text-[#8C837B]">Head: </span>
            <strong className="text-[#4B7754]">{nodes[0]?.value ?? "null"}</strong>
          </div>
          <div className="rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 shadow-sm">
            <span className="text-[#8C837B]">Tail: </span>
            <strong className="text-[#A1764E]">{nodes[nodes.length - 1]?.value ?? "null"}</strong>
          </div>
          <div className="rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 shadow-sm">
            <span className="text-[#8C837B]">Length: </span>
            <strong className="text-[#1F1B18]">{nodes.length}</strong>
          </div>
        </div>
      </div>

      {/* Main Chain Visualizer */}
      <div className="mt-8 overflow-x-auto pb-6 pt-4">
        <div className="flex items-center gap-2 min-w-max">
          {/* Head Label */}
          <div className="flex flex-col items-center justify-center rounded-lg bg-[#E6EFE6] px-2.5 py-1.5 font-mono text-xs font-bold text-[#2D4B34] border border-[#C5DDC5] shrink-0 self-start mt-4">
            <span>HEAD</span>
            <span className="text-[10px] text-[#4B7754]">▼</span>
          </div>

          <div className="flex items-start">
            <AnimatePresence mode="popLayout">
              {nodes.map((node, idx) => {
                const isHighlighted = highlightedIndex === idx;
                const isTail = idx === nodes.length - 1;

                let nodeBorder = "border-[#D8CDBD]";
                let nodeBg = "bg-white";
                let textColor = "text-[#1F1B18]";

                if (isHighlighted) {
                  if (highlightType === "insert") {
                    nodeBorder = "border-[#4B7754]";
                    nodeBg = "bg-[#E6EFE6]";
                    textColor = "text-[#2D4B34]";
                  } else if (highlightType === "delete") {
                    nodeBorder = "border-[#DC2626]";
                    nodeBg = "bg-[#FEE2E2]";
                    textColor = "text-[#991B1B]";
                  } else {
                    nodeBorder = "border-[#D97706]";
                    nodeBg = "bg-[#FEF3C7]";
                    textColor = "text-[#92400E]";
                  }
                }

                return (
                  <motion.div
                    key={`node-${node.id}`}
                    layout
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: isHighlighted ? 1.08 : 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex items-start shrink-0"
                  >
                    {/* Node Column with Index Label aligned below */}
                    <div className="flex flex-col items-center">
                      {/* Node Dual-Compartment Card */}
                      <div
                        className={`flex items-center overflow-hidden rounded-xl border-2 ${nodeBorder} ${nodeBg} shadow-sm select-none`}
                      >
                        {/* Data compartment */}
                        <div className="flex h-14 w-14 items-center justify-center border-r border-[#EEE5DB] font-mono text-base font-bold">
                          <span className={textColor}>{node.value}</span>
                        </div>

                        {/* Next pointer compartment */}
                        <div className="flex h-14 w-10 flex-col items-center justify-center bg-[#FAF8F5] px-1 font-mono text-[10px] text-[#8C837B]">
                          <span className="text-[9px] uppercase tracking-tighter">next</span>
                          <span className="font-bold text-[#A1764E]">●</span>
                        </div>
                      </div>

                      {/* Directly aligned index label */}
                      <span className="mt-2 font-mono text-[11px] text-[#8C837B]">
                        Index [{idx}]
                      </span>
                    </div>

                    {/* Pointer Arrow or Null Terminator */}
                    <div className="mx-2 flex items-center h-14">
                      {!isTail ? (
                        <div className="flex items-center text-[#A1764E]">
                          <div className="h-0.5 w-6 bg-[#A1764E]" />
                          <ArrowRight size={14} className="-ml-1" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <div className="h-0.5 w-4 bg-[#C5BDB3]" />
                          <span className="rounded bg-[#F7F2EB] px-2 py-0.5 font-mono text-xs font-semibold text-[#8C837B] border border-[#E8DDD1]">
                            null
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
