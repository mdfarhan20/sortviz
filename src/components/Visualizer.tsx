import VisualizerContext from "context/VisualizerContext";
import { useContext, useEffect, useState } from "react";
import type { VisualizerContextType } from "types";
import Controls from "./Controls";


export default function Visualizer() {
  const { array, generateRandomArray, barsRef } = useContext(VisualizerContext) as VisualizerContextType;
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    generateRandomArray();

    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 800)
        setIsMobile(true);
      else
        setIsMobile(false);
    }

    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    }
  }, []);

  return (
    <section className="visualizer">
      <div className="bars-container" ref={barsRef}>
        { array.map((height, index) => (
          <div 
            className="bar" 
            style={ 
              isMobile ? 
              { width: `${height}%`, height: `${20 / array.length }rem` } :
              { height: `${height}%`, width: `${20 / array.length }rem` } 
            }
            key={index}
          ></div>
        )) }
      </div>
      <Controls />
    </section>
  );
}