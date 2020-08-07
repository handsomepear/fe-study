console.log(Object.is(NaN, NaN)); // true

const obj = { a: 123 };
console.log(Object.is(obj, { a: 123 })); // false

const num = 1;
console.log(Object.is(num, 1)); // true

const str = 'hello';
console.log(Object.is(str, 'hello')); // true
