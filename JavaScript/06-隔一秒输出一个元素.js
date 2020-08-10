const list = [1, 2, 3, 4, 5];

function throttle() {
    let curDate = new Date().getTime();
    let k = 0;
    return function (list) {
        while (true) {
            if (k >= list.length) {
                return;
            }
            let cur = new Date().getTime();
            if (cur - curDate === 1000) {
                console.log(list[k++]);
                curDate = cur;
            }
        }
    };
}

throttle()(list);
