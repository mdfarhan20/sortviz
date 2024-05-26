import { insertionSortOpertation } from "types";


export default function insertionSort(array: number[]) {
  const tempArray = [...array];
  const length = tempArray.length;

  const operations: insertionSortOpertation[] = [];

  for (let i = 1; i < length; i++) { 
    let current = tempArray[i];
    
    let j = i - 1;
    while (j >= 0 && tempArray[j] > current) {
      operations.push({
        current: i,
        compare: j
      });

      tempArray[j + 1] = tempArray[j];
      j--;
    }

    tempArray[j + 1] = current;
    operations.push({
      current: i,
      insert: j + 1
    });
  }

  return operations;
}