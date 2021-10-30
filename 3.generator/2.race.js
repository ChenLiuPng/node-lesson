// all(一个失败就全失败) race(赛跑 采用跑的快的作为结果)
// allSettled 纪要成功也要失败 finally
const p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('ok');
    },1000);
})

const p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('no ok');
    },2);
})

Promise.race = function (promises) {
    return new Promise((resolve,reject) =>{
        for(let i = 0;i<promises.length;i++){
            let currentVal = promises[i];
            if(currentVal&& typeof currentVal.then==='function'){
                currentVal.then(resolve,reject)
            }else{
                resolve(currentVal);
            }
        }
    })
}

Promise.race([p1,p2]).then((data)=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
})


// Promise.allSettled([p2,p1]).then((value)=>{
//     console.log(value);
// })
