const fs = require('fs');
const path = require('path');


let obj = {};

function after(times,callback) {
    return function() {
        --times == 0 && callback();
    }
}

let fn = after(2,()=>{
    console.log(obj);
})



fs.readFile(path.resolve(__dirname,'age.txt'),'utf8',function(err,data){
    obj.age = data;
    fn()
});
fs.readFile(path.resolve(__dirname,'name.txt'),'utf8',function(err,data){
    obj.name = data;
    fn()
});