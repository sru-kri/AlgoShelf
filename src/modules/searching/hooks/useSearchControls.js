import { useState } from "react";
import { generateRandomArray, parseTargetInput } from "../utils/searchHelpers";

export default function useSearchControls(initialSize = 8) {
  const [array, setArray] = useState(() => generateRandomArray(initialSize));
  const [targetInput, setTargetInput] = useState(() => String(array[Math.floor(array.length / 2)]));
  const [error, setError] = useState("");

  const handleShuffle = () => {
    const newArr = generateRandomArray(initialSize);
    setArray(newArr);
    setTargetInput(String(newArr[Math.floor(Math.random() * newArr.length)]));
    setError("");
  };

  const handlePickPresent = () => {
    if (array.length === 0) return;
    const randomExisting = array[Math.floor(Math.random() * array.length)];
    setTargetInput(String(randomExisting));
    setError("");
  };

  const handlePickAbsent = () => {
    // Pick a number guaranteed not in array
    let candidate = 100;
    while (array.includes(candidate)) {
      candidate++;
    }
    setTargetInput(String(candidate));
    setError("");
  };

  const validateTarget = () => {
    const { value, error: err } = parseTargetInput(targetInput);
    if (err) {
      setError(err);
      return null;
    }
    setError("");
    return value;
  };

  return {
    array,
    setArray,
    targetInput,
    setTargetInput,
    error,
    setError,
    handleShuffle,
    handlePickPresent,
    handlePickAbsent,
    validateTarget,
  };
}
