// 订阅 发布模式



const fs = require('fs');
const path = require('path');


let eventObj = {
    arr:[], // 中介
    on(fn) {
        this.arr.push(fn);
    },
    emit(){
        this.arr.forEach(fn=>fn());
    }
}
let obj = {};
fs.readFile(path.resolve(__dirname,'age.txt'),'utf8',function(err,data){
    obj.age = data;
    eventObj.emit();
});
fs.readFile(path.resolve(__dirname,'name.txt'),'utf8',function(err,data){
    obj.name = data;
    eventObj.emit();
});

eventObj.on(()=>{
    if(Object.keys(obj).length==2){
        console.log('当前数据读取回来了');
    }
    
})


