const fs = require('fs').promises;

 async function read() {
    let getName = await fs.readFile('name.txt','utf8');
    let getAge = await fs.readFile(getName, 'utf8');
    return getAge;
}

read().then(data=>{
    console.log(data)
})