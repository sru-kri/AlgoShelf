export function generateRandomArray(size = 8, min = 5, max = 99) {
  const set = new Set();
  while (set.size < size) {
    const val = Math.floor(Math.random() * (max - min + 1)) + min;
    set.add(val);
  }
  return Array.from(set);
}

export function parseTargetInput(input) {
  const trimmed = String(input ?? "").trim();
  if (trimmed === "") {
    return { value: null, error: "Please enter a target number to search for." };
  }
  const num = Number(trimmed);
  if (!Number.isFinite(num)) {
    return { value: null, error: "Target must be a valid number." };
  }
  return { value: num, error: null };
}

export function linearSearchSteps(array, target) {
  const steps = [];
  let comparisons = 0;
  const checkedIndices = [];

  // Frame 0: Initial Start
  steps.push({
    array: [...array],
    currentIndex: -1,
    checkedIndices: [],
    foundIndex: -1,
    target,
    comparisons: 0,
    currentLine: 0,
    status: "idle",
    message: {
      title: "Ready to Search",
      description: `Starting Linear Search for target value ${target} in an array of ${array.length} elements.`,
      insight:
        "Linear Search will examine elements from index 0 sequentially until it finds the target or reaches the end.",
    },
  });

  for (let i = 0; i < array.length; i++) {
    comparisons++;

    // Checking element i
    steps.push({
      array: [...array],
      currentIndex: i,
      checkedIndices: [...checkedIndices],
      foundIndex: -1,
      target,
      comparisons,
      currentLine: 2,
      status: "checking",
      message: {
        title: `Inspecting Index ${i}`,
        description: `Checking arr[${i}] = ${array[i]}. Is ${array[i]} equal to target ${target}?`,
        insight:
          "Linear Search evaluates one element at a time, moving strictly from left to right.",
      },
    });

    if (array[i] === target) {
      // Found element
      steps.push({
        array: [...array],
        currentIndex: i,
        checkedIndices: [...checkedIndices],
        foundIndex: i,
        target,
        comparisons,
        currentLine: 4,
        status: "found",
        message: {
          title: "Target Found!",
          description: `Success! arr[${i}] is equal to ${target}. Search completed in ${comparisons} ${
            comparisons === 1 ? "comparison" : "comparisons"
          }.`,
          insight:
            "Linear Search immediately returns the matching index and halts without inspecting remaining elements.",
        },
      });

      return steps;
    }

    checkedIndices.push(i);
  }

  // Not found
  steps.push({
    array: [...array],
    currentIndex: -1,
    checkedIndices: [...checkedIndices],
    foundIndex: -1,
    target,
    comparisons,
    currentLine: 5,
    status: "not_found",
    message: {
      title: "Target Not Found",
      description: `Examined all ${array.length} elements. Target ${target} does not exist in the array.`,
      insight:
        "When the target is not in the array, Linear Search must check every single item (worst-case O(n)).",
    },
  });

  return steps;
}
