// 1. 数组去重
var fruits = ['banana', 'apple', 'apple'];
// console.log(Array.from(new Set(fruits)));
// console.log([...new Set(fruits)]);

// 2. 学习替换
// splice

// 3. 遍历数组
var friends = [
    { name: 'john', age: 22 },
    { name: 'peter', age: 22 },
    { name: 'mark', age: 22 },
    { name: 'maria', age: 22 },
];
var friendsNames = Array.from(friends, ({ name }) => name);
console.log(friendsNames);

// 4. 清空数组
// fruits.length = 0;

// 5. 数组转换对象
var fruitObj = { ...fruits };
console.log(fruitObj);

// 6. 数组交集
var numOne = [0, 2, 4, 6, 8, 8];
var numTwo = [1, 2, 3, 4, 5, 6];

// 先去重 然后再通过filter筛选出第二个数组包含的值
var duplicatedValues = [...new Set(numOne)].filter((num) => numTwo.includes(num));
console.log(duplicatedValues);

// 7. 去除假值
var mixedArr = [0, 'blue', '', NaN, 9, true, undefined, false];
var truthyArr = mixedArr.filter(Boolean);
// console.log(truthyArr);

// 8. 随机值
var colors = ['blue', 'pink', 'green', 'purple'];

var randomColor = colors[Math.floor(Math.random() * colors.length)];
// console.log(randomColor);

// 9. 数组倒叙
var colors = ['blue', 'pink', 'green', 'purple'];
// 不会改变原数组 slice生成了新数组
console.log(colors.slice().reverse());
console.log(colors);
