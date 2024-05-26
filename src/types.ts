
export type Algorithm = {
  name: string,
  value: string
}

export type VisualizerContextType = {
  algorithm: Algorithm,
  setAlgorithm: React.Dispatch<React.SetStateAction<Algorithm>>,
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  size: number,
  setSize: React.Dispatch<React.SetStateAction<number>>,
  speed: number,
  setSpeed: React.Dispatch<React.SetStateAction<number>>,
  generateRandomArray: () => void,
  barsRef: React.MutableRefObject<HTMLDivElement | null>
}


export type BubbleSortOperation = {
  compare: number[],
  swap: boolean
}

export type SelectionSortOperation = {
  compare?: number[],
  swap?: number[]
}

export type insertionSortOpertation = {
  current: number,
  compare?: number,
  insert?: number
}