// const Promise = require("./promise.js");
const fs = require('fs').promises;
const path = require('path')

let getName = fs.readFile(path.resolve(__dirname,'name.txt'),'utf8');
let getAge = fs.readFile(path.resolve(__dirname,'name.txt'),'utf8');

function isPromise(val) {
    return typeof val.then === 'function'
}
Promise.all = function(promises){
    return new Promise((resolve,reject)=>{
        let result = [];
        let times = 0;
        function processData(index,val){
            result[index] = val;
            if(++times === promises.length){
                resolve(result);
            }
        }
        for(let i = 0;i<promises.length;i++){
            let p = promises[i];
            if(isPromise(p)){
                p.then((data)=>{
                    processData(i,data);
                },reject);
            }else{
                processData(i,p);
            }
        }
    })
}


Promise.all([1,getName,getAge,2]).then(data=>{
    console.log(data)
})