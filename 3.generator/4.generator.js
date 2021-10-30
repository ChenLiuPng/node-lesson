// promise中有很多问题 内部还是采用回调的方式，如果逻辑过多还是可能会导致 回调地狱

// 我们希望写的代码更像同步一些 generator
// koa1.0 用的generator koa2 => async = await

// generator 函数可以实现暂停的功能 => redux-saga(dva)

//yield 表示的是产出 * generator函数 (迭代器函数)


const context = {
    prev: 0,
    next: 0,
    done: false,
    stop() {
        this.done = true; // 更改完成状态
    }
}

function gen$() {
    while (true) {
        switch (context.prev = context.next) {
            case 0:
                context.next = 1;
                return 1;
            case 1:
                context.next = 2;
                return 2;
            case 2:
                context.next = 3;
                return 3;
            case 3:
                context.stop();
                return 100;

        }
    }
}
let gen = function () {
    return {
        next() {
            return {
                value:gen$(context),
                done:context.done
            }
        }
    }
}



// function * gen() { // 根据指针向下执行  + switch-case 来实现
//     yield 1
//     yield 2
//     yield 3
//     return 100;
// }

let it = gen();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());