const STATUS = {
    PENDING:'PENDING',
    FUFILLED:'FUFILLED',
    REJECTED:'REJECTED'
}
class Promise {
    constructor(executor){
        this.status = STATUS.PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = []; // 存放成功回调
        this.onRejectedCallbacks = []; // 存放失败回调
        const resolve = (val) => {
            if(this.status == STATUS.PENDING){
                this.status = STATUS.FUFILLED
                this.value = val;
                this.onResolvedCallbacks.forEach(fn=>fn());
            }
        }
        const reject = (reason) => {
            if(this.status == STATUS.PENDING){
                this.status = STATUS.REJECTED
                this.reason = reason;
                this.onResolvedCallbacks.forEach(fn=>fn);
            }
        }
        try {
            executor(resolve,reject);
        }catch(e) {
            reject(e);
        }
    }
    then(onFulfilled,onRejected) {
        if(this.status == STATUS.FUFILLED){
            onFulfilled(this.value);
        }
        if(this.status == STATUS.REJECTED) {
            onRejected(this.reason);
        }
        if(this.status == STATUS.PENDING){
            this.onResolvedCallbacks.push(()=>{
                onFulfilled(this.value);
            })
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason);
            })
        }
    }
}

module.exports = Promise;