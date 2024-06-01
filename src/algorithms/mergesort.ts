
export type MergeSortOperation = {
  sorted: number,
  compare?: number[],
  insert?: {
    index: number,
    position: number,
    adjust: boolean
  }
}

export default function mergeSort(array: number[], start=0, end=array.length, operations:MergeSortOperation[]=[]) {
  const length = end - start;

  if (length <= 1) return operations;

  const middle = start + Math.floor(length / 2);
  mergeSort(array, start, middle, operations);
  mergeSort(array, middle, end, operations);

  const tempArray = [...array];
  let i = start, j = middle, c = start, sorted=0;
  while (i < middle && j < end) {
    let index, adjust;
    operations.push({ compare: [i, j], sorted });
    if (tempArray[i] < tempArray[j]) {
      index = i;
      adjust = true;
      i++;
    } else {
      index = j;
      adjust = false
      j++;
      sorted++;
    }

    array[c] = tempArray[index];
    operations.push({ 
      insert: {
        index: index,
        position: c,
        adjust: adjust
      }, sorted 
    });

    c++;
  }

  while (i < middle) {
    array[c] = tempArray[i];
    operations.push({ 
      insert: {
        index: i,
        position: c,
        adjust: false
      }, sorted 
    });

    i++;
    c++;
  }

  while (j < end) {
    array[c] = tempArray[j];
    operations.push({ 
      insert: {
        index: j,
        position: c,
        adjust: false
      }, sorted 
    });

    j++;
    c++;
  }

  return operations;
}