function bubleSort(arr) {
    let len = arr.length;
    // 因为两两比较所以 outer初始值是2
    for (let outer = len; outer >= 2; outer--) {
        // 外层循环控制整个循环的趟数 每一趟做的事情就是找到循环中的最大值放到最右边
        for (let inner = 0; inner <= outer - 1; inner++) {
            // 内部循环控制两两比较 变换位置
            if (arr[inner] > arr[inner + 1]) {
                [arr[inner], arr[inner + 1]] = [arr[inner + 1], arr[inner]];
            }
        }
    }
    return arr;
}

const test = bubleSort([5, 3, 2, 4, 1]);
console.log(test);
