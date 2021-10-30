const STATUS = {
    PENDING: 'PENDING',
    FUFILLED: 'FUFILLED',
    REJECTED: 'REJECTED'
}
function resolvePromise(x, promise2, resolve, reject) {
    if (promise2 == x) {
        return reject(new TypeError('出错了'));
    }
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called;
        try {
            let then = x.then; // 看一下这个对象是否有then方法
            if (typeof then === 'function') {
                // then是函数 我就认为这个x是一个promise
                // 如果x是promise 那么就采用他的状态
                then.call(x, function (y) { // 调用返回的promise 用他的结果 作为下一次then的结果
                    if (called) return;
                    called = true;
                    // 递归解析成功后的值，直到他是一个普通值为止
                    resolvePromise(y,promise2,resolve,reject);
                }, function (r) {
                    if (called) return;
                    called = true;
                    reject(r);
                })

            } else {
                resolve(x); // 就是一个普通对象
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e); // 取then时抛出错误了
        }
    } else {
        resolve(x); // x是一个原始类型 不能是promise
    }
}
class Promise {
    constructor(executor) {
        this.status = STATUS.PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = []; // 存放成功回调
        this.onRejectedCallbacks = []; // 存放失败回调
        const resolve = (val) => {
            if (this.status == STATUS.PENDING) {
                this.status = STATUS.FUFILLED
                this.value = val;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        const reject = (reason) => {
            if (this.status == STATUS.PENDING) {
                this.status = STATUS.REJECTED
                this.reason = reason;
                this.onResolvedCallbacks.forEach(fn => fn);
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => {
            if (this.status == STATUS.FUFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
            }
            if (this.status == STATUS.REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0)

            }
            if (this.status == STATUS.PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    })
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                })
            }
        })
        return promise2;

    }
}



module.exports = Promise;