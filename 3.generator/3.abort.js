
// 超时处理
let p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('成功了')
    },2000)
})

function wrap(p1) { // p1是用户的，我在内部构建一个promise和用户传入的组成一队
    let abort;
    let p2 = new Promise((resolve,reject)=>{
        abort = reject;
    })
    let newP = Promise.race([p1,p2])
    newP.abort = abort;
    return newP;

}

let p2 = wrap(p1);

p2.then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
})

setTimeout(()=>{
    p2.abort('错误信息');
},3000)