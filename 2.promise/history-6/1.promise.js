// const Promise = require("./promise.js");
const fs = require('fs').promises;
const path = require('path')

let getName = fs.readFile(path.resolve(__dirname,'name.txt'),'utf8');
let getAge = fs.readFile(path.resolve(__dirname,'name.txt'),'utf8');

// function isPromise(val) {
//     return typeof val.then === 'function'
// }
// Promise.all = function(promises){
//     return new Promise((resolve,reject)=>{
//         let result = [];
//         let times = 0;
//         function processData(index,val){
//             result[index] = val;
//             if(++times === promises.length){
//                 resolve(result);
//             }
//         }
//         for(let i = 0;i<promises.length;i++){
//             let p = promises[i];
//             if(isPromise(p)){
//                 p.then((data)=>{
//                     processData(i,data);
//                 },reject);
//             }else{
//                 processData(i,p);
//             }
//         }
//     })
// }


// Promise.all([1,getName,getAge,2]).then(data=>{
//     console.log(data)
// })

Promise.prototype.finally = function(callback) {
    return this.then((data)=>{
        // 让函数执行 内部会调用方法，如果方法是promise需要等待他完成
        return Promise.resolve(callback()).then(()=>data);
    },err=>{
        return Promise.resolve(callback()).then(()=>{
            throw err;
        });
    })
}


Promise.reject(123).finally((data)=>{ // 这里传入的函数 无论都会执行
    console.log('finally');
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('ok');
        },5000)
    })
}).then(data=>{
    console.log('s',data);
},err=>{
    console.log('e',err);
})