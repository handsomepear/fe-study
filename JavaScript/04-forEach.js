// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/389
const list = [1, 2, 3];
const square = (num) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * num);
        }, 1000);
    });
};

// function test() {
//     list.forEach(async (x) => {
//         const res = await square(x);
//         console.log(res); // 几乎同时输出 1 4 9
//     });
// }

async function test() {
    for (let x of list) {
        const res = await square(x);
        console.log(res);
    }
}

test();
