import {bubbleSort, insertionSort, selectionSort} from "algorithms/index";
import VisualizerContext from "context/VisualizerContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { BubbleSortOperation, SelectionSortOperation, VisualizerContextType, insertionSortOpertation } from "types";
import { IoOptions as OptionsIcon } from "react-icons/io5";
import clsx from "clsx";

export default function Controls() {
  const { 
    array, setArray, 
    generateRandomArray, 
    barsRef,
    algorithm,
    size,setSize,
    speed, setSpeed
  } = useContext(VisualizerContext) as VisualizerContextType;

  const [sorting, setSorting] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const interval = useMemo(() => {
    const time = 1000 - ((speed - 1) * 110);
    return time;
  }, [speed]);

  useEffect(generateRandomArray, [size]);

  const visualizeBubbleSort = () => {
    let i = 0;
    const operations: BubbleSortOperation[] = bubbleSort(array);
    setSorting(true)

    const sortInterval = setInterval(() => {
      const bars = barsRef.current as HTMLDivElement;
      if (i > 0) {
        for (let index of operations[i-1].compare) {
          bars.children[index].classList.remove("comparing");
          if (operations[i-1].swap)
            bars.children[index].classList.remove("swapping");
        }
      }
      
      if (i >= operations.length) {
        clearInterval(sortInterval);
        setSorting(false);
        return;
      }
      
      const BubbleSortOperation = operations[i];
      for (let index of BubbleSortOperation.compare)
        bars.children[index].classList.add("comparing");

      if (BubbleSortOperation.swap) {
        for (let index of BubbleSortOperation.compare)
          bars.children[index].classList.add("swapping");

        setArray((prev: number[]) => {
          const tempArray = [...prev];
          let temp = tempArray[BubbleSortOperation.compare[0]];
          tempArray[BubbleSortOperation.compare[0]] = tempArray[BubbleSortOperation.compare[1]];
          tempArray[BubbleSortOperation.compare[1]] = temp;

          return tempArray;
        });
      }

      i++;
    }, interval);
  }

  const visualizeSelectionSort = () => {
    const operations: SelectionSortOperation[] = selectionSort(array);
    const bars = barsRef.current as HTMLDivElement;

    setSorting(true);

    let i = 0;
    const sortInterval = setInterval(() => {

      if (i > 0) {
        const prevOperation = operations[i-1];
        if (prevOperation.compare) {
          for (let index of prevOperation.compare)
            bars.children[index].classList.remove("comparing");
        } else if (prevOperation.swap) {
          for (let index of prevOperation.swap)
            bars.children[index].classList.remove("swapping");
        }
      }

      if (i >= operations.length) {
        clearInterval(sortInterval);
        setSorting(false);
        return;
      }

      const operation = operations[i];
      if (operation.compare) {
        for (let index of operation.compare)
          bars.children[index].classList.add("comparing");
      } else if (operation.swap) {
        for (let index of operation.swap)
          bars.children[index].classList.add("swapping");

        setArray((prev: number[]) => {
          const tempArray = [...prev];
          const swap = operation.swap as number[];
          let temp = tempArray[swap[0]];
          tempArray[swap[0]] = tempArray[swap[1]];
          tempArray[swap[1]] = temp;

          return tempArray;
        });
      }

      i++;
    }, interval);
  }

  const visualizeInsertionSort = () => {
    const operations: insertionSortOpertation[] = insertionSort(array);
    const bars = barsRef.current as HTMLDivElement;

    setSorting(true);

    let i = 0;
    const sortInterval = setInterval(() => {
      if (i > 0) {
        const prevOperation = operations[i - 1];
        if (prevOperation.compare !== undefined) {
          bars.children[prevOperation.current].classList.remove("comparing");
          bars.children[prevOperation.compare].classList.remove("comparing");
        } else if (prevOperation.insert !== undefined) {
          bars.children[prevOperation.insert].classList.remove("swapping");
          bars.children[prevOperation.current].classList.remove("swapping");
        }
      }


      if (i >= operations.length) {
        clearInterval(sortInterval);
        setSorting(false);
        return;
      }

      const operation = operations[i];
      if (operation.compare !== undefined) {
        bars.children[operation.current].classList.add("comparing");
        bars.children[operation.compare].classList.add("comparing");
      } else if (operation.insert !== undefined) {
        bars.children[operation.insert].classList.add("swapping");
        bars.children[operation.current].classList.add("swapping");

        setArray((prev) => {
          const tempArray = [...prev];
          let i = operation.current - 1;
          const current = tempArray[operation.current];
          while(i >= (operation.insert as number)) {
            tempArray[i + 1] = tempArray[i];
            i--;
          }
          tempArray[i + 1] = current;

          return tempArray;
        });
      }

      i++;
    }, interval);
  }

  const visualize = () => {
    setSettingsOpen(false);

    const value = algorithm.value;
    if (value === "bubble")
      return visualizeBubbleSort();
    else if (value === "selection")
      return visualizeSelectionSort();
    else if (value === "insertion")
      return visualizeInsertionSort();
  }

  return (
    <div className="controls">
      <button 
        id="generate-button"
        className="control-button" 
        onClick={generateRandomArray}
        disabled={sorting}
      >
        Generate Array
      </button>

      <button 
        id="sort-button"
        className="control-button" 
        onClick={visualize}
        disabled={sorting}
      >
        Sort
      </button>

      <OptionsIcon 
        id="settings-icon" 
        onClick={() => setSettingsOpen(prev => !prev)} 
        className={clsx({ "disabled": sorting })}
      />

      <div className={clsx("settings", { "opened": settingsOpen })}>
        <div className="setting">
          <label htmlFor="size" className="setting-label">Size</label>
          <input 
            type="range" 
            min={10}
            max={50}
            className="slider-input"
            defaultValue={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
          />
        </div>
        <div className="setting">
          <label htmlFor="speed" className="setting-label">Speed</label>
          <input 
            type="range" 
            min={1}
            max={10}
            className="slider-input"
            defaultValue={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}