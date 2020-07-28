// 状态机
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class MyPromise {
    constructor(executor) {
        this.state = PENDING;
        this.value = null;
        this.reason = null;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.value = value;
                // 将回调函数执行放到 resolve 执行的时机，这样就可以兼容异步调用resolve了
                this.onFulfilledCallbacks.forEach((fulfilledCallback) => {
                    fulfilledCallback();
                });
            }
        };
        const reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach((rejectedCallback) => {
                    rejectedCallback();
                });
            }
        };
        try {
            executor(resolve, reject);
        } catch (reason) {
            reject(reason);
        }
    }
    /**
     * Promise A+ 规范：then()方法返回的仍是一个promise，并且返回的promise的resolve的值是上一个Promise的onFulfilled函数或者onRejected函数的返回值。如果上一个Promise的then()方法回调函数的执行过程中发生了错误，那么会将其捕获到，并且作为返回的Promise的onRejected的函数的参数传入
     */
    then(onFulfilled, onRejected) {
        console.log(this.state);
        // 异步调用resolve的时候 then方法只是把用户的事件函数收集起来 在resolve执行的时候再去取列表里面的方法依次执行
        if (this.state === PENDING) {
            this.onFulfilledCallbacks.push(() => {
                onFulfilled(this.value);
            });
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason);
            });
        }
        if (this.state === FULFILLED) {
            onFulfilled(this.value);
        }
        if (this.state === REJECTED) {
            onRejected(this.reason);
        }
    }
}

let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(123);
    }, 100);
});

promise.then((res) => {
    console.log(res);
});

promise.then(
    (res) => {
        console.log(res);
    },
    (reason) => {
        console.log(reason);
    }
);

let promise2 = new MyPromise((resolve, reject) => {
    reject(123);
});

promise2
    .then(
        (val) => {
            console.log('value1', val);
            return 456;
        },
        (reason) => {
            console.log('reason1', reason);
        }
    )
    .then(
        (val) => {
            console.log('value2', val);
            return;
        },
        (reason) => {
            console.log('reason2', reason);
        }
    );
