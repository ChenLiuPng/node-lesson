// 观察者模式  观察者模式  被观察者模式

const { brotliDecompressSync } = require("zlib");

// 将所有的观察者都放到被观察者中 （基于发布订阅)

class Subject {
    constructor(name) {
        this.name = name;
        this.Observers = [];
        this.state = '玩呢';
    }
    attach(o){ // 被观察者中要存放所有观察者
        this.Observers.push(o);
    }
    setState(newState) {
       if(this.state!=newState) {
        this.state = newState;
        this.Observers.forEach(o=>o.update(this))
       }
    }
    
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    update(baby) {
        console.log(baby.name+"跟"+this.name+"说:"+baby.state);
    }
}



// 小宝 state =>  主动通知

let baby = new Subject('小宝宝');
let o1 = new Observer('爸爸');
let o2 = new Observer('妈妈');

baby.attach(o1);
baby.attach(o2);
baby.setState('有人打我')
baby.setState('我打他们')