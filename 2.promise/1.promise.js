// 1.用法  2.生态 3.原理


// 解决问题: 1.异步并发问题(Promise.all) 2.解决回调地狱问题

// 缺陷 依旧是基于回调函数的 => generator + async await

// Promsie 是一个类，类中的构造函数需要传入一个excutor 默认就会执行
// excutor中有两个参数，分别是resolve reject
// 默认创建一个promise 状态是pending fulfilled rejected

// 调用成功和失败 需要传递一个成功的原因和失败的原因
// 如果已经成功就不能失败了
// 每一个promise实例都有一个then方法
const Promise = require('./promise.js');
let p = new Promise((resolve,reject)=>{
    // throw new Error('1');
    // reject('失败了');
    resolve('成功了!');
});
p.then((data)=>{
    console.log('success',data);
},(error)=>{
    console.log('fail',error);
})
console.log(2)
console.log(p)

