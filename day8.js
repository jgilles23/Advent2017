//Read the input files to data
const { fail } = require('assert');
const fs = require('fs');
const { setMaxListeners } = require('process');
let data = fs.readFileSync('day8_input.txt','utf-8');
data = data.split('\n');
data.pop();
data = data.map(line => {
    return line.split(' ')
})
console.log('Input Sample:',data.slice(0,1));

let compare = {
    '>=':(a,b) => a>=b,
    '<=':(a,b) => a<=b,
    '>':(a,b) => a>b,
    '<':(a,b) => a<b,
    '==':(a,b) => a===b,
    '!=':(a,b) => a!=b,
}

let highest = -100000

let reg = {};
//Run the program
data.forEach(line => {
    target = line[0];
    command = line[1];
    value = Number(line[2]);
    tester = line[4];
    testName = line[5];
    testValue = Number(line[6]);
    //Establish the registers if they do not exist
    if (!reg[target]) {reg[target] = 0};
    if (!reg[tester]) {reg[tester] = 0};
    //Check if the conditions is true, increment of decrement appropriatly
    //console.log(target,reg[target],command,value,tester,reg[tester],testName,testValue)
    if (compare[testName](reg[tester], testValue)) {
        if (command==='inc') {
            reg[target] += value;
        } else {
            reg[target] -= value;
        }
        if (reg[target] > highest) {
            highest = reg[target];
        }
        //console.log('  True',target,reg[target]);
    } else {
        //console.log('  False',target,reg[target]);
    }
})

console.log('Part 1:',Math.max(...Object.values(reg)));
console.log('Part 2:',highest);