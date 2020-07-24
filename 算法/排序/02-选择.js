// 每次将最小值依次放置到最左边
function selectSort(arr) {
    let len = arr.length;
    for (let outer = 0; outer < len - 1; outer++) {
        for (let inner = outer + 1; inner < len; inner++) {
            if (arr[outer] > arr[inner]) {
                [arr[outer], arr[inner]] = [arr[inner], arr[outer]];
            }
        }
    }
    return arr;
}
const test = selectSort([5, 3, 2, 4, 1]);
console.log(test);
