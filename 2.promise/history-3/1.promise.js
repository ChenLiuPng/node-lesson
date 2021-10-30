const Promise = require('./promise.js')
const p = new Promise((resolve,reject)=>{
    reject('ok');
}).then().then().then().then(null,(err)=>{
    console.log(err);
})