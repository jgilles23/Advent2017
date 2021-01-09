//Read the input files to data
const fs = require('fs');
let data = fs.readFileSync('day5_input.txt','utf-8');
//console.log('Input Sample:',data.slice(0,100));

let program = data.split('\n').map(Number);
program.pop();
console.log(program);

function runProgram(program) {
    let P = program.map(p => {return p});
    let i = 0;
    let cycles = 0;
    while (i < program.length) {
        P[i] += 1;
        i += P[i] - 1;
        cycles += 1;
    }
    return cycles;
}

console.log("Part 1: ", runProgram(program))

function runProgram2(program) {
    let P = program.map(p => {return p});
    let i = 0;
    let cycles = 0;
    while (i < program.length) {
        let offset = P[i];
        if (offset >= 3) {
            P[i] -= 1;
        } else {
            P[i] += 1;
        }
        i += offset;
        cycles += 1;
    }
    return cycles;
}

console.log("Part 2: ", runProgram2(program))