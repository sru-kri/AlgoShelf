import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import Footer from "../../../components/Footer";
import LinkedListVisualizer from "../components/LinkedListVisualizer";
import LinkedListControls from "../components/LinkedListControls";
import LinkedListStepExplanation from "../components/LinkedListStepExplanation";
import {
  buildLinkedList,
  linkedListToArray,
  LinkedListNode,
} from "../utils/linkedListEngine";
import { INITIAL_LINKED_LIST } from "../data/linkedListData";

export default function LinkedListPage() {
  const [head, setHead] = useState(() => buildLinkedList(INITIAL_LINKED_LIST));
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [highlightType, setHighlightType] = useState(null);
  const [error, setError] = useState(null);
  const [lastAction, setLastAction] = useState({
    type: "ready",
    message: `Initialized singly linked list with ${INITIAL_LINKED_LIST.length} nodes.`,
    pointerCode: "head ──> [15] ──> [30] ──> [45] ──> [60] ──> null",
  });

  // Track any pending deletion-animation timer so we can cancel it.
  const pendingTimerRef = useRef(null);

  const clearPendingTimer = () => {
    if (pendingTimerRef.current !== null) {
      clearTimeout(pendingTimerRef.current);
      pendingTimerRef.current = null;
    }
  };

  const nodes = linkedListToArray(head);

  // 1. Insert Beginning (Head) — O(1): no full-list clone needed
  const handleInsertBeginning = (val) => {
    clearPendingTimer();
    setError(null);
    // Simply point the new node at the existing head; no cloning required.
    const newHead = new LinkedListNode(val);
    newHead.next = head;
    setHead(newHead);

    setHighlightedIndex(0);
    setHighlightType("insert");
    setLastAction({
      type: "insert_beginning",
      message: `Inserted new node (${val}) at beginning. newNode.next points to old head, head updated to newNode.`,
      pointerCode: `newNode.next = head; head = newNode; // O(1) time`,
    });
    setTimeout(() => setHighlightedIndex(null), 800);
  };

  // Helper: schedule a deletion animation with proper timer cleanup
  const scheduleDeleteFinalize = (finalize) => {
    clearPendingTimer();
    pendingTimerRef.current = setTimeout(() => {
      pendingTimerRef.current = null;
      finalize();
    }, 300);
  };

  // 2. Insert End (Tail)
  const handleInsertEnd = (val) => {
    clearPendingTimer();
    setError(null);
    const newNode = new LinkedListNode(val);

    if (!head) {
      setHead(newNode);
      setHighlightedIndex(0);
    } else {
      // Clone to avoid mutating React state directly during traversal
      let tail = head;
      while (tail.next) {
        tail = tail.next;
      }
      // Build a new list with the new tail appended immutably
      const newList = new LinkedListNode(head.value);
      let writePtr = newList;
      let readPtr = head.next;
      while (readPtr) {
        writePtr.next = new LinkedListNode(readPtr.value);
        writePtr = writePtr.next;
        readPtr = readPtr.next;
      }
      writePtr.next = newNode;
      setHead(newList);
      setHighlightedIndex(nodes.length);
    }

    setHighlightType("insert");
    setLastAction({
      type: "insert_end",
      message: `Inserted new node (${val}) at the end. Traversed to current tail and set tail.next = newNode.`,
      pointerCode: `tail.next = newNode; newNode.next = null; // O(n) traversal`,
    });
    setTimeout(() => setHighlightedIndex(null), 800);
  };

  // 3. Insert At Position
  const handleInsertAtPosition = (val, pos) => {
    if (pos < 0 || pos > nodes.length) {
      setError(`Invalid position ${pos}! Valid insertion index range is 0 to ${nodes.length}.`);
      return;
    }
    setError(null);

    if (pos === 0) {
      handleInsertBeginning(val);
      return;
    }

    clearPendingTimer();
    // Rebuild the list immutably, splicing newNode at pos
    const arr = linkedListToArray(head);
    arr.splice(pos, 0, val);
    setHead(buildLinkedList(arr));

    setHighlightedIndex(pos);
    setHighlightType("insert");
    setLastAction({
      type: "insert_position",
      message: `Inserted node (${val}) at position [${pos}]. Spliced newNode between node[${pos - 1}] and node[${pos}].`,
      pointerCode: `newNode.next = prev.next; prev.next = newNode; // O(pos)`,
    });
    setTimeout(() => setHighlightedIndex(null), 800);
  };

  // 4. Delete Beginning (Head) — O(1): just advance head pointer
  const handleDeleteBeginning = () => {
    if (!head) {
      setError("Cannot delete: linked list is empty.");
      return;
    }
    setError(null);
    const removedVal = head.value;
    // Capture the successor before the state update closes over it
    const successor = head.next;
    setHighlightedIndex(0);
    setHighlightType("delete");

    scheduleDeleteFinalize(() => {
      setHead(successor);
      setHighlightedIndex(null);
      setLastAction({
        type: "delete_beginning",
        message: `Deleted head node (${removedVal}). Head pointer moved to head.next.`,
        pointerCode: `head = head.next; // O(1) time`,
      });
    });
  };

  // 5. Delete End (Tail)
  const handleDeleteEnd = () => {
    if (!head) {
      setError("Cannot delete: linked list is empty.");
      return;
    }
    setError(null);

    if (!head.next) {
      const removedVal = head.value;
      setHighlightedIndex(0);
      setHighlightType("delete");
      scheduleDeleteFinalize(() => {
        setHead(null);
        setHighlightedIndex(null);
        setLastAction({
          type: "delete_end",
          message: `Deleted solitary node (${removedVal}). List is now empty.`,
          pointerCode: `head = null;`,
        });
      });
      return;
    }

    // Rebuild list without the last element (immutable)
    const arr = linkedListToArray(head);
    const removedVal = arr[arr.length - 1];
    setHighlightedIndex(arr.length - 1);
    setHighlightType("delete");

    scheduleDeleteFinalize(() => {
      setHead(buildLinkedList(arr.slice(0, -1)));
      setHighlightedIndex(null);
      setLastAction({
        type: "delete_end",
        message: `Deleted tail node (${removedVal}). Second-to-last node.next set to null.`,
        pointerCode: `prevToTail.next = null; // O(n) traversal`,
      });
    });
  };

  // 6. Delete At Position
  const handleDeleteAtPosition = (pos) => {
    if (pos < 0 || pos >= nodes.length) {
      setError(`Invalid position ${pos}! Valid deletion index range is 0 to ${nodes.length - 1}.`);
      return;
    }
    setError(null);

    if (pos === 0) {
      handleDeleteBeginning();
      return;
    }

    const arr = linkedListToArray(head);
    const removedVal = arr[pos];
    setHighlightedIndex(pos);
    setHighlightType("delete");

    scheduleDeleteFinalize(() => {
      arr.splice(pos, 1);
      setHead(buildLinkedList(arr));
      setHighlightedIndex(null);
      setLastAction({
        type: "delete_position",
        message: `Deleted node (${removedVal}) at position [${pos}]. Pointer bypassed target node.`,
        pointerCode: `prev.next = targetNode.next; // O(pos)`,
      });
    });
  };

  const handleReset = () => {
    // Cancel any in-flight deletion animation before resetting
    clearPendingTimer();
    setHead(buildLinkedList(INITIAL_LINKED_LIST));
    setHighlightedIndex(null);
    setHighlightType(null);
    setError(null);
    setLastAction({
      type: "ready",
      message: `Reset singly linked list to initial state.`,
      pointerCode: "head ──> [15] ──> [30] ──> [45] ──> [60] ──> null",
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 md:pt-14">
        {/* Navigation Breadcrumb */}
        <Link
          to="/learn/linked-list"
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DA78D]"
        >
          <ArrowLeft size={16} />
          Back to Linked List Overview
        </Link>

        {/* Page Header */}
        <header className="mt-8 border-b border-[#E8DDD1] pb-8 md:mt-10">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#E7EFE7] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#567156]">
              Linear Structures · Chapter III
            </span>
            <span className="text-xs text-[#8C837B]">Interactive Laboratory</span>
          </div>

          <h1 className="mt-4 font-display text-4xl leading-tight text-[#1F1B18] sm:text-5xl md:text-6xl">
            Singly Linked List Operations
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#6B645D] md:text-lg">
            Observe pointer rewiring during dynamic node insertion and deletion at the beginning,
            end, or arbitrary positions in memory.
          </p>
        </header>

        {/* Controls Section */}
        <section className="mt-8">
          <LinkedListControls
            onInsertBeginning={handleInsertBeginning}
            onInsertEnd={handleInsertEnd}
            onInsertAtPosition={handleInsertAtPosition}
            onDeleteBeginning={handleDeleteBeginning}
            onDeleteEnd={handleDeleteEnd}
            onDeleteAtPosition={handleDeleteAtPosition}
            onReset={handleReset}
            length={nodes.length}
            error={error}
          />
        </section>

        {/* Visualizer Section */}
        <section className="mt-6">
          <LinkedListVisualizer
            nodes={nodes}
            highlightedIndex={highlightedIndex}
            highlightType={highlightType}
          />
        </section>

        {/* Step Explanation & Complexity */}
        <section className="mt-6">
          <LinkedListStepExplanation
            lastAction={lastAction}
            length={nodes.length}
          />
        </section>

        {/* Theoretical Reference */}
        <section className="mt-16 rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <Sparkles size={20} className="text-[#567156]" />
            <h2 className="font-display text-2xl text-[#1F1B18]">
              Linked Lists vs. Arrays: The Memory Trade-Off
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#EEE5DB] bg-white p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4B7754]">
                Instant Head Operations: O(1)
              </span>
              <p className="mt-2 text-sm leading-6 text-[#6B645D]">
                Inserting or deleting at index 0 requires merely rewiring the Head pointer to point to the new node, avoiding the massive $O(n)$ element memory copying required by contiguous arrays.
              </p>
            </div>
            <div className="rounded-2xl border border-[#EEE5DB] bg-white p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D97706]">
                Sequential Access Penalty: O(n)
              </span>
              <p className="mt-2 text-sm leading-6 text-[#6B645D]">
                Because nodes are scattered throughout heap memory, random index access ($O(1)$) is impossible. Accessing or modifying the $k$-th item requires walking along each predecessor’s pointer chain.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
