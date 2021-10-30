const STATUS = {
    PENDING: 'PENDING',
    FUFILLED: 'FUFILLED',
    REJECTED: 'REJECTED'
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
                try {
                    let x = onFulfilled(this.value);
                    resolve(x)
                } catch (e) {
                    reject(e);
                }
            }
            if (this.status == STATUS.REJECTED) {
                try {
                    let x = onRejected(this.reason);
                    resolve(x)
                } catch (e) {
                    reject(e);
                }

            }
            if (this.status == STATUS.PENDING) {
                this.onResolvedCallbacks.push(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolve(x)
                    } catch (e) {
                        reject(e);
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolve(x)
                    } catch (e) {
                        reject(e);
                    }
                })
            }
        })
        return promise2;

    }
}

module.exports = Promise;