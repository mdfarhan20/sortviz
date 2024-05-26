
import type { BubbleSortOperation } from "types";

export default function bubbleSort(array: number[]): BubbleSortOperation[] {
  const tempArray = [...array];
  const length = tempArray.length;
  let swapped = true;

  const BubbleSortOperations: BubbleSortOperation[] = [];

  let c = 1;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < length - c; i++) {
      const BubbleSortOperation: BubbleSortOperation = {
        compare: [i, i + 1],
        swap: false
      } 

      if (tempArray[i] > tempArray[i + 1]) {
        let temp = tempArray[i];
        tempArray[i] = tempArray[i + 1];
        tempArray[i + 1] = temp;
        swapped = true;
        BubbleSortOperation.swap = true;
      }

      BubbleSortOperations.push(BubbleSortOperation);
    }

    c++;
  };

  console.log("Sorted:", tempArray);

  return BubbleSortOperations;
}