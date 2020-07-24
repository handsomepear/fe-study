/*
快排是处理大数据最快的排序算法之一。
它是一种分而治之的算法，通过递归的方式将数据依次分解为包含较小元素和较大元素的不同子序列。
该算法不断重复这个步骤直至所有数据都是有序的。
 */
function quickSort(arr) {
    if (arr.length <= 1) {
        // 递归出口
        return arr;
    }
    let left = [],
        right = [],
        current = arr.splice(0, 1);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < current) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(current, quickSort(right));
}

const test = quickSort([5, 3, 2, 4, 1]);
console.log(test);
