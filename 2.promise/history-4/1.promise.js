// const Promise = require('./promise.js')
// const fs = require('fs');
// const path = require('path');
// function read(...args) {
//     let dfd = Promise.defer();
//     fs.readFile(...args, function (err, data){
//         if(err) return dfd.reject();
//         dfd.resolve(data);
//     })
//     return dfd.promise;
// }

const Promise = require("./promise.js");


let p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('ok');
    },1000)
})

// Promise.resolve(p).then(data=>{
//     console.log(data);
// })

Promise.reject(p).catch(data=>{
    console.log(data);
})