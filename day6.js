//Read the input files to data
const fs = require('fs');
let data = fs.readFileSync('day6_input.txt','utf-8');
data = data.split('\t');
//data.pop();
data = data.map(Number)
console.log('Input Sample:',data.slice(0,100));
let memory = data.map(x => {return x});

function redistribute(memory) {
    let m = Math.max(...memory);
    i = memory.indexOf(m);
    memory[i] = 0;
    while (m > 0) {
        i = (i + 1) % memory.length;
        memory[i] += 1;
        m -= 1;
    }
    //No return, memory is modified in place
}

/*
console.log(memory);
redistribute(memory);
console.log(memory);
*/

let cycles = 0;
let seenBefore = {};
let memoryString = memory.toString();
while (!seenBefore[memoryString]) {
    seenBefore[memoryString] = cycles;
    redistribute(memory); //Modifies memory in place
    memoryString = memory.toString();
    cycles += 1;
}

console.log("Part 1:", cycles);
console.log("Part 2:", cycles - seenBefore[memoryString])