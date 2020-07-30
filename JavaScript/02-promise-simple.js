const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class MyPromise {
    constructor(executor) {
        this.state = PENDING;
        this.value = null;
        this.reason = null;
        this.onFulfilledCallbacks = [];
        this.onRejectCallbacks = [];

        const resolve = (value) => {
            if (this.state === PENDING) {
                if (value !== null && typeof value.then === 'function') {
                    return value.then(resolve, reject);
                }
                this.state = FULFILLED;
                this.value = value;

                this.onFulfilledCallbacks.forEach((onFulFilledCallback) => {
                    onFulFilledCallback();
                });
            }
        };

        const reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectCallbacks.forEach((onRejectCallback) => {
                    onRejectCallback();
                });
            }
        };

        // 执行promise传递的执行函数
        try {
            executor(resolve, reject);
        } catch (reason) {
            reject(reason);
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            if (this.state === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolve(x);
                    } catch (reason) {
                        reject(reason);
                    }
                });
                this.onRejectCallbacks.push(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolve(x);
                    } catch (reason) {
                        reject(reason);
                    }
                });
            }
        });
    }
}

const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        console.log('promise');
        resolve(0);
    }, 1000);
});

promise
    .then(
        (res) => {
            console.log('1st then');
            return new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    console.log('setTimeout');
                    resolve('async data');
                }, 100);
            });
        },
        (reason) => {
            console.log(reason);
        }
    )
    .then((res) => {
        console.log('2nd then');
        console.log(res);
    });
