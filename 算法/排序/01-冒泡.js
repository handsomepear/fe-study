function bubleSort(arr) {
    let len = arr.length;
    for (let outer = len; outer >= 2; outer--) {
        for (let inner = 0; inner <= outer - 1; inner++) {
            if (arr[inner] > arr[inner + 1]) {
                [arr[inner], arr[inner + 1]] = [arr[inner + 1], arr[inner]];
            }
        }
    }
    return arr;
}

const test = bubleSort([5, 3, 2, 4, 1]);
console.log(test);
