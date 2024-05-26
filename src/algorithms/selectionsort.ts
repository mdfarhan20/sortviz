
import type { SelectionSortOperation } from "types";

export default function selectionSort(array: number[]) {
  const tempArray = [...array];
  const length = tempArray.length;

  const operations: SelectionSortOperation[] = [];

  for (let i = 0; i < length; i++) {
    let min = i;
    for (let j = i + 1; j < length; j++) {
      if (tempArray[j] < tempArray[min])
        min = j;

      operations.push({ compare: [min, j] });
    }

    const temp = tempArray[min];
    tempArray[min] = tempArray[i];
    tempArray[i] = temp;

    operations.push({ swap: [min, i] });
  }

  return operations;
}
