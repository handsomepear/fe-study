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
        // 参数默认值
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : (reason) => {
                      throw reason;
                  };

        let promise2 = null;
        // 返回的promise
        promise2 = new MyPromise((resolve, reject) => {
            if (this.state === PENDING) {
                // 将用户注册的事件函数保存起来
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // 获取then参数方法的返回值 如果出错那么就调用reject
                            let x = onFulfilled(this.value);
                            this.resolvePromise(promise2, x, resolve, reject);
                        } catch (reason) {
                            reject(reason);
                        }
                    }, 0);
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            this.resolvePromise(promise2, x, resolve, reject);
                        } catch (reason) {
                            reject(reason);
                        }
                    }, 0);
                });
            }

            if (this.state === FULFILLED) {
                try {
                    let x = onFulfilled(this.value);
                    this.resolvePromise(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            }
            if (this.state === REJECTED) {
                try {
                    let x = onRejected(this.reason);
                    this.resolvePromise(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            }
        });

        return promise2;
    }
    // 解析then函数返回一个promise或者带有一个then方法的对象
    resolvePromise(promise2, x, resolve, reject) {
        let called = false;
        if (promise2 === x) {
            return reject(new TypeError('循环引用'));
        }

        if (
            x !== null &&
            (Object.prototype.toString.call(x) === '[object Object]' || Object.prototype.toString.call(x) === '[object Function]')
        ) {
            try {
                let then = x.then;
                if (typeof then === 'function') {
                    then.call(
                        x,
                        (y) => {
                            if (called) return;
                            called = true;
                            this.resolvePromise(promise2, y, resolve, reject);
                        },
                        (reason) => {
                            if (called) return;
                            called = true;
                            reject(reason);
                        }
                    );
                } else {
                    if (called) return;
                    called = true;
                    resolve(x);
                }
            } catch (reason) {
                if (called) return;
                called = true;
                reject(reason);
            }
        } else {
            resolve(x);
        }
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }
    // 不管是state是 FULFILLED 还是 REJECTED 都会执行finally传入的方法
    finally(fn) {
        return this.then(
            (value) => {
                fn();
                return value;
            },
            (reason) => {
                fn();
                throw reason;
            }
        );
    }
    // Promise 链式调用的最后一步，用来向全局抛出没有被promise内部捕获的错误，并且不再返回Promise。一般用来结束一个Promise链
    done() {
        this.catch((reason) => {
            console.log('done', reason);
            throw reason;
        });
    }
    // Promise.all ：当所有Promise均为fulfilled的时候返回一个结果数组 与传入的promise数组的顺序一致，如果有一个promise的状态为rejected状态 则整个Promise.all为rejected
    static all(promiseArr) {
        return new MyPromise((resolve, reject) => {
            let result = [];
            promiseArr.forEach((promise, index) => {
                promise.then((value) => {
                    result[index] = value;
                    //
                    if (result.length === promiseArr.length) {
                        resolve(result);
                    }
                }, reject);
            });
        });
    }
    // Promise.race 根据第一个执行完成的状态作为返回的状态
    static race(promiseArr) {
        return new MyPromise((resolve, reject) => {
            promiseArr.forEach((promise) => {
                promise.then((value) => {
                    resolve(value);
                }, reject);
            });
        });
    }
    // 返回一个fulfilled状态的promise 一般用来作为promise链的开端
    static resolve(value) {
        return new MyPromise((resolve) => {
            resolve(value);
        });
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason);
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

MyPromise.reject(111)
    .then((val) => {
        console.log(val);
    })
    .catch((reason) => {
        console.log('reason', reason);
    });
