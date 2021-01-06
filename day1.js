console.log("Hello Advent of Code 2017!")

//Read the input files to data
const fs = require('fs');
let data = fs.readFileSync('day1_input.txt','utf-8');
console.log('Input Sample:',data.slice(0,50));
//data = '1111'

data = data.split("").map(Number);
data.pop(); //Remove new line character

let acc = 0
for (let i=0; i<data.length; i++) {
    x1 = data[i];
    x2 = data[(i+1)%data.length]
    //console.log(x1,x2)
    if (x1 === x2) {
        acc += x1;
    }
}
console.log('part 1:',acc)


//Part 2

acc = 0
half = data.length/2
for (let i=0; i<data.length; i++) {
    x1 = data[i];
    x2 = data[(i+half)%data.length]
    //console.log(x1,x2)
    if (x1 === x2) {
        acc += x1;
    }
}

console.log('part 2:',acc)