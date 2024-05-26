import { useContext, useState } from "react";
import { ALGORITHMS } from "constants";
import VisualizerContext from "context/VisualizerContext";
import type { VisualizerContextType } from "types";
import clsx from "clsx";

export default function AlgorithmSelect() {
  const { algorithm, setAlgorithm } = useContext(VisualizerContext) as VisualizerContextType;

  const [isOpen, setIsOpen] = useState<boolean>(false); 

  return (
    <div>
      <button 
        className="algo-burger" 
        onClick={() => setIsOpen(prev => !prev)}
      >
        <div></div>
        <div></div>
        <div></div>
      </button>
      <div className={clsx("algo-select", { "opened": isOpen })}>
        { ALGORITHMS.map((algo, index) => (
          <button 
            className={clsx("algo-button", { "algo-selected": algorithm.value == algo.value})}
            onClick={() => {
              setAlgorithm(algo);
              setTimeout(() => setIsOpen(false), 200);
            }}
            key={index}
          >
            { algo.name }
          </button>
        )) }
      </div>
    </div>
  );
}