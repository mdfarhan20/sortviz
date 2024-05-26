import type { Algorithm, VisualizerContextType } from "types";
import { ALGORITHMS } from "constants";
import { createContext, useRef, useState } from "react";
import { getRandomValue } from "utils";

const VisualizerContext = createContext<VisualizerContextType | null>(null);

export function VisualizerProvider({ children }: {children: React.ReactNode}) {
  const [algorithm, setAlgorithm] = useState<Algorithm>(ALGORITHMS[0]);
  const [array, setArray] = useState<number[]>([]);
  const [size, setSize] = useState<number>(20);
  const [speed, setSpeed] = useState<number>(5);
  const barsRef = useRef<HTMLDivElement | null>(null);

  function generateRandomArray() {
    const newArray = [];
    const minHeight = 5, maxHeight = 100;
    for (let i = 0; i < size; i++) {
      const height = getRandomValue(minHeight, maxHeight);
      newArray.push(height);
    }
    setArray(newArray);
  };

  return (
    <VisualizerContext.Provider value={{
      algorithm, setAlgorithm,
      array, setArray,
      generateRandomArray, barsRef,
      size, setSize,
      speed, setSpeed
    }}>
      { children } 
    </VisualizerContext.Provider>
  );
}


export default VisualizerContext;
