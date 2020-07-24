// 插入排序 默认第一位是有序队列 然后将后面的每一项跟它对比 然后放到正确的位置形成新的有序队列 后续依次跟前面形成的有序队列做对比就可以了
function insertSort(arr) {
    let len = arr.length;
    for (let i = 1; i < len; i++) {
        // 内部循环进行排序
        for (let j = i; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
            } else {
                break;
            }
        }
    }
    return arr;
}

const test = insertSort([5, 3, 2, 4, 1]);
console.log(test);
