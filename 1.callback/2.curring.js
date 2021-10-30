// 柯里化  通用



function istype(typing) {
    return function (val) {
        return Object.prototype.toLocaleString.call(val) === `[object ${typing}]`
    }
}
let utils = {};
['String','Number','Boolean'].forEach(method=>{
    utils[`is`+method] = istype(method);
}) 

const curring = (fn, arr=[]) => {
    let len = fn.length;
    return function(...args){
        let newArgs = [...arr,...args];
        if(newArgs.length == len) {
            return fn(...newArgs);
        }else{
            return curring(fn,newArgs);
        }
    }
}

let newSum = curring(sum);

function sum(a,b,c,d,e) {
    return a+b+c+d+e;
}

function istype1(typing,val) {
        return Object.prototype.toLocaleString.call(val) === `[object ${typing}]`
}
let newIstype = curring(istype1)
let isNumber = newIstype('String');
console.log(isNumber(1))
console.log(newSum(1)(2)(3)(4)(5));

