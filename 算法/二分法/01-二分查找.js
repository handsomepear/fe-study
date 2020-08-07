/**
 * [-4,-3,0,0,0,6,2,3]这样⼀一 个有规律律的数列列，0的左边都 是负数，0的右边都是整数， 要求找到与0相邻的正数和负 数(-3,6)，要求复杂度为 log n(采⽤用两次⼆二分查找找 出整数和负数)
 */

/**
 * 二分法：
 * 1. 若目标值比中间值大，即目标值在mid与low之间，就修改low的值。再对比中间值
 * 2. 若目标值比中间值小，即目标值在start与mid之间，就修改end的值，再对比中间值
 */
// 不重复的数据
function binarySearch(arr, key) {
    let start = 0,
        mid = 0,
        end = arr.length - 1;
    while (start <= end) {
        // 注意 这里的mid求值 如果写 end + start的话 可能会溢出 所以要以这种形式来求中间值
        // 或者直接写位运算 start + (end -start) >> 1
        // mid = parseInt(start + (end - start) / 2);
        mid = parseInt(start + ((end - start) >> 1));
        if (arr[mid] == key) {
            return mid;
        } else if (arr[mid] > key) {
            end = mid - 1;
        } else if (arr[mid] < key) {
            start = mid + 1;
        }
    }
    return -1;
}

var arr = [5, 13, 19, 21, 37, 56, 64, 75, 80, 88, 92];
var result = binarySearch(arr, 11);
console.log(result);

function binarySearch1(arr, key) {
    let start = 0,
        mid = 0,
        end = arr.length - 1;
    while (start <= end) {
        // 注意 这里的mid求值 如果写 end + start的话 可能会溢出 所以要以这种形式来求中间值
        // 或者直接写位运算 start + (end -start) >> 1
        // mid = parseInt(start + (end - start) / 2);
        mid = parseInt(start + ((end - start) >> 1));
        if (arr[mid] > key) {
            end = mid - 1;
        } else if (arr[mid] < key) {
            start = mid + 1;
        } else {
            if (mid == arr.length - 1 || arr[mid + 1] !== key) return mid;
            else start = mid + 1;
        }
    }
    return -1;
}
