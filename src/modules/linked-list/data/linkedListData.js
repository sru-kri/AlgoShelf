export const LINKED_LIST_CONCEPTS = [
  {
    title: "Non-Contiguous Memory & Pointers",
    description:
      "Unlike arrays where memory must be contiguous, linked list nodes can reside anywhere in memory. Each node holds its data payload and a 'next' pointer referencing the subsequent node's address.",
    example: "[Data | Next*] ──> [Data | Next*] ──> [Data | null]",
  },
  {
    title: "Head Insertion & Deletion: O(1)",
    description:
      "Inserting or deleting at the beginning (Head) takes constant O(1) time because no elements need to be shifted—only the head pointer and next reference are updated.",
    example: "newNode.next = head; head = newNode",
  },
  {
    title: "Arbitrary Position Insertion/Deletion: O(n)",
    description:
      "To insert or delete at position k or at the tail, the list must be linearly traversed from the head node, taking O(k) comparisons before pointers are rewired.",
    example: "prev.next = curr.next (bypassing node to delete)",
  },
  {
    title: "Dynamic Capacity",
    description:
      "Linked lists grow and shrink dynamically without upfront capacity allocation or costly resizing array re-allocations.",
    example: "Memory is allocated dynamically per node on demand.",
  },
];

export const INITIAL_LINKED_LIST = [15, 30, 45, 60];
