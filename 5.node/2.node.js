// node 中的全局对象  浏览器中的this指代的是window  服务端中的this指代的都是global
// 默认我们访问是在文件中访问的thsi 内部被更改了 所以不是global  modules.exports

// 全局属性

// clearInterval clearTimeout setInterval setTimeout queueMicrotask setImmediate
// process Buffer

// require module exports __dirname __filename
// 全局变量是可以直接在文件中不声明直接访问的变量, 但是global上的属性叫全局变量


// process
// platform chdir cwd env argv nextTick
// platform 平台可以区分操作系统
// 用途 根据不同平台 操作系统文件
console.log(process.platform); // win32 window/drawin linux /etc/usr/
// 用途 可以获取当前执行node命令的目录
console.log(process.cwd()) // 当前工作目录  可以改变
// console.log(process.chdir('a'));  // 一般用不到
console.log(process.env);// 环境变量