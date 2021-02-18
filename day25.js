//Read the input files to data
//const { fail } = require('assert');
const fs = require('fs');
//const { setMaxListeners } = require('process');
let data = fs.readFileSync('day25_input.txt', 'utf-8');
data = data.slice(0, -1).split('\n');
//console.log('Input:', data.slice(0, 10));

let state = data[0].match(/state (.)/)[1];
let N = data[1].match(/after (\d+)/)[1];

let lookup = {};
for (let i=3; i<data.length-1; i+=10) {
    let s = data[i].match(/state (.)/)[1];
    lookup[s] = {0:{}, 1:{}}
    //Record for current value of 0
    lookup[s][0].write = Number(data[i+2].match(/\d/)[0]);
    lookup[s][0].move = data[i+3].match(/right|left/)[0];
    lookup[s][0].continue = data[i+4].match(/state (.)/)[1];
    //Record for current value of 1
    lookup[s][1].write = Number(data[i+6].match(/\d/)[0]);
    lookup[s][1].move = data[i+7].match(/right|left/)[0];
    lookup[s][1].continue = data[i+8].match(/state (.)/)[1];
}

console.log(lookup)

function print() {
    console.log(`State: ${state}, pos: ${pos}, range: -${negTape.length-1} to ${posTape.length}`);
    console.log('Pos:',posTape);
    console.log('Neg:',negTape);
}

let posTape = [0, 0];
let negTape = [0, 0];
let pos = 0;
//state defined above

for (let i=0; i<N; i++) {
    //Choose the actions, modify the tape
    let actions
    if (pos >= 0) {
        if (pos===posTape.length) {posTape.push(0)}
        actions = lookup[state][posTape[pos]];
        posTape[pos] = actions.write;
    } else {
        if (-pos===negTape.length) {negTape.push(0)}
        actions = lookup[state][negTape[-pos]];
        negTape[-pos] = actions.write;
    }
    //Change position
    if (actions.move==='right') {
        pos += 1;
    } else {
        pos -= 1;
    }
    //Change state
    state = actions.continue;
    //console.log(actions);
    //print();
}

function sum(list) {
    let count = 0;
    list.forEach(x => {count += x})
    return count;
}

console.log("Part 1:",sum(posTape)+sum(negTape))