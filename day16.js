//Read the input files to data
const { fail } = require('assert');
const fs = require('fs');
const { setMaxListeners } = require('process');
let data = fs.readFileSync('day16_input.txt', 'utf-8');
data = data.slice(0, -1).split(',');
console.log('Input:', data.slice(0, 10));

let letters = 'abcdefghijklmnop';
let lookupLetters = {};
let lookupNumbers = {};
let L = new Array();
for (let i = 0; i < 16; i++) {
    lookupLetters[i] = letters[i];
    lookupNumbers[letters[i]] = i
    L.push(i)
}

function translate(L) {
    let word = "";
    L.forEach(x => {
        word += lookupLetters[x];
    })
    return word;
}

console.log('Start', translate(L))

function dance(L) {
    data.forEach(cmd => {
        if (cmd[0] == 's') {
            //Spin back to front
            let x = Number(cmd.slice(1,));
            L = L.slice(-x,).concat(L.slice(0, -x));
        } else if (cmd[0] == 'x') {
            //Exchange letters in positions
            let [x, y] = cmd.slice(1,).split('/').map(Number);
            let temp = L[x];
            L[x] = L[y];
            L[y] = temp;
        } else if (cmd[0] == 'p') {
            //Partner - Exchange letters by name
            let [x, y] = cmd.slice(1,).split('/').map(z => {
                return lookupNumbers[z];
            })
            for (let i = 0; i < 16; i++) {
                if (L[i] == x) {
                    L[i] = y;
                } else if (L[i] == y) {
                    L[i] = x;
                }
            }
        } else {
            console.log(cmd)
            hippo;
        }
    })
    return L;
}

console.log('Part 1:', translate(dance(L)));

L = [];
for (let i=0;i<16;i++) {L.push(i)};
let history = {};
let state = translate(L)
let i = 0;
while (!(state in history)) {
    history[state] = i;
    i++;
    L = dance(L)
    state = translate(L);
}

let D = i; //Divisor for big number
console.log(state,history[state], D)

L = [];
for (let i=0;i<16;i++) {L.push(i)};
//Iterate just the excess number of times
for (let i=0;i<(10**9)%D;i++) {
    L = dance(L);
}
console.log('Part 2:',translate(L))