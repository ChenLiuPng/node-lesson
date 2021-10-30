function core(a, b, c) {
    console.log('core',a,b,c);
}

Function.prototype.before = function (beforeFn) {
    //this
    return (...args) => {
        beforeFn();
        this(...args)
    }
}

let newFn = core.before(() => {
    console.log('core before')
});

newFn(1, 2, 3);