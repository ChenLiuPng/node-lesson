const fs = require('fs');
const path = require('path')
const util = require('util')
function promisify(fn) {
    return function (...args) {
        return new Promise((resolve,reject)=>{
            fn(...args,function (err,data){
                if(err) return reject(err);
                resolve(data);
            });
        })
    }
}

function promisifyAll(target) {
    Reflect.ownKeys(target).forEach(key=>{
        if( typeof target[key]=='function'){
            target[key+'Async'] = util.promisify(target[key]);
        }
        
    })
    return target;
}
let obj = promisifyAll(fs);
console.log(obj);
// const readFile = promisify(fs.writeFile); // 怎么将node的api 转化成promiseapi
// readFile(path.resolve(__dirname,'note.md'),'utf8').then((data)=>{
//     console.log(data);
// })