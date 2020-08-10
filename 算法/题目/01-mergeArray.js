/**
 * 题目：实现⼀一个合并数组的⽅方 法，使其合并后的数组仍是 有序的，
    mergeArray(arr1, arr2)
    [-10,-2, 12,15] [-4,4]
 * 思路：[-10,-4,-2,4,12,15] 利利⽤用双指针，每次⽐比较指针 的位置，当⼀一个指针完时，
 * 将另⼀一个数组直接添加到结果数组之后即可(此处拓拓展 了了⼀一下数组的concat和slice ⽅方法)
 */

// function mergeArray(arr1, arr2) {
//     let newArr = [];
//     let i = 0,
//         j = 0,
//         k = 0;
//     // 每个指针对应两个数组 从各自的第一项比较 找出最小值 然后放到新数组当中 最后将没有遍历到的那个数组的剩余部分直接concat到newArr中
//     while (i < arr1.length && j < arr2.length) {
//         if (arr1[i] <= arr2[j]) {
//             newArr[k++] = arr1[i++];
//         } else {
//             newArr[k++] = arr2[j++];
//         }
//     }
//     // 将剩余的数据直接push进去
//     if (i < arr1.length) {
//         newArr.push.apply(newArr, arr1.slice(i));
//     }
//     if (j < arr2.length) {
//         newArr.push.apply(newArr, arr2.slice(j));
//     }
//     return newArr;
// }

function mergeArray(arr1, arr2) {
    let i = arr1.length,
        j = arr2.length,
        k = i + j - 1;
    i--, j--;
    while (i >= 0 && j >= 0) {
        if (arr1[i] >= arr2[j]) {
            arr1[k--] = arr1[i--];
        } else {
            arr1[k--] = arr2[j--];
        }
    }
    console.log(i, j, k);
}
const arr1 = [-10, -2, 12, 15, 201, 202, 333, 444];
const arr2 = [-4, -2, -1, 0, 4, 5, 12];
mergeArray(arr1, arr2);
console.log(arr1);
