// Bubble Sort: Generate step-by-step swaps
export function bubbleSort(arr) {
  const animations = [];
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Record the current swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        animations.push({ array: [...arr], swaps: [j, j + 1] });
      }
    }
  }
  return animations;
}

// Selection Sort: Generate step-by-step swaps
export function selectionSort(arr) {
  const animations = [];
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // Record the swap if needed
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      animations.push({ array: [...arr], swaps: [i, minIndex] });
    }
  }
  return animations;
}

// Quick Sort: Generate step-by-step swaps
export function quickSort(arr) {
  const animations = [];

  function quickSortHelper(arr, low, high) {
    if (low < high) {
      const pivotIndex = partition(arr, low, high);
      quickSortHelper(arr, low, pivotIndex - 1);
      quickSortHelper(arr, pivotIndex + 1, high);
    }
  }

  function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        animations.push({ array: [...arr], swaps: [i, j] });
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    animations.push({ array: [...arr], swaps: [i + 1, high] });
    return i + 1;
  }

  quickSortHelper(arr, 0, arr.length - 1);
  return animations;
}
