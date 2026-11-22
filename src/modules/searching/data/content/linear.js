export const linearContent = {
  id: "linear",
  chapter: "Chapter I",
  title: "Linear Search",
  subtitle: "Sequential scan. One element at a time.",

  overview: {
    heading: "What is Linear Search?",
    description:
      "Linear Search (also known as Sequential Search) is the most fundamental searching algorithm. It checks each element of a collection sequentially from beginning to end until either a match is found or all elements have been examined without success.",
  },

  takeaways: [
    "Scans elements sequentially from index 0 to n - 1.",
    "Works on unsorted data without any prior ordering or preparation.",
    "Best case O(1) when the target is at the first position; worst case O(n) when at the end or absent.",
  ],

  pseudocode: [
    "function linearSearch(arr, target):",
    "    for i = 0 to length(arr) - 1:",
    "        inspect current element arr[i]",
    "        if arr[i] == target:",
    "            return i // match found",
    "    return -1 // target not in array",
  ],

  complexity: {
    best: "O(1)",
    average: "O(n)",
    worst: "O(n)",
    space: "O(1)",
  },

  applications: [
    "Searching small collections where simplicity is preferred",
    "Unsorted arrays and singly linked lists",
    "Single-pass searches where sorting first is unnecessary overhead",
    "Hardware and embedded systems with minimal instruction memory",
  ],

  advantages: [
    "No sorting or preprocessing required",
    "O(1) constant auxiliary space",
    "Simple, intuitive, and error-free to implement",
    "Performs well on small or nearly constant-size arrays",
  ],

  disadvantages: [
    "O(n) time complexity is slow on large datasets",
    "Performs unnecessary checks compared to divide-and-conquer search algorithms",
    "Inefficient when multiple queries are made against the same data",
  ],
};
