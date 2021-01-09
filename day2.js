//Read the input files to data
const fs = require('fs');
let data = fs.readFileSync('day2_input.txt','utf-8');
console.log('Input Sample:',data.slice(0,50));

data = data.split('\n');
data.pop()

let acc = 0;
data.forEach((line) => {
    line = line.split('\t');
    line = line.map(Number);
    let x = Math.max(...line) - Math.min(...line);
    console.log(x);
    acc += x
});
console.log('Part 1:',acc)

acc = 0;
data.forEach((line,lineNum) => {
    line = line.split('\t');
    line = line.map(Number);
    line.forEach((x,i) => {
        line.slice(i+1,).forEach((y) => {
            if (x/y%1===0) {
                console.log(lineNum,x,y,acc)
                acc += x/y;
            } else if (y/x%1===0) {
                console.log(lineNum,x,y,acc)
                acc += y/x;
            }
        })
    })
});
console.log('Part 2:',acc)