const fs = require('fs').promises;
// await async === co +  generator
function  *read() {
    let getName = yield fs.readFile('name.txt','utf8');
    let getAge = yield fs.readFile(getName, 'utf8');
    return getAge;
}
function co(it) { // 异步迭代采用函数的方法
 return new Promise((resolve,reject)=>{
     function step(data) {
         let {value,done} = it.next(data);
         if(!done) {
            Promise.resolve(value).then((data)=>{
                step(data)
            },reject)
         }else{
            resolve(value);
         }
     }
     step();
 })
}

co(read()).then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err);
})