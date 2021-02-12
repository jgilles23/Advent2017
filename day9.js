//Read the input files to data
const { fail } = require('assert');
const fs = require('fs');
const { setMaxListeners } = require('process');
let data = fs.readFileSync('day9_input.txt','utf-8');
console.log('Input:'.padEnd(15),data.slice(0,100), data.length);

//Remove canceled characters
nonCanceled = '';
let i = 0;
while (i < data.length) {
    if (data[i]==='!') {
        i += 2;
    } else {
        nonCanceled += data[i];
        i += 1;
    }
}
console.log('nonCanceled:'.padEnd(15),nonCanceled.slice(0,100), nonCanceled.length);

//Remove garbage
nonGarbage = '';
let garbageCount = 0;
i = 0;
while (i < nonCanceled.length) {
    if (nonCanceled[i]==='<') {
        i += 1;
        while (nonCanceled[i]!='>') {
            i += 1;
            garbageCount += 1;
        }
        i += 1;
    } else {
        nonGarbage += nonCanceled[i];
        i += 1;
    }
}
console.log('nonGarbage:'.padEnd(15),nonGarbage.slice(0,100), nonGarbage.length);

//Remove Commas
let nonComma = nonGarbage.replace(/,/g,'').slice(0,-1);
console.log('nonComma:'.padEnd(15),nonComma.slice(0,100), nonComma.length);

//Count opens and closes
let opens = 0;
let closes = 0;
[...nonComma].forEach(c => {
    if (c==='{') {
        opens += 1;
    } else if (c==='}') {
        closes += 1;
    } else {
        console.log('Other:',c)
    }
})
console.log(opens,closes)

//Iterate through
function getScore(str,depth=1) {
    let score = depth;
    while (str.length > 0) {
        if (str[0]==='{') {
            let [retScore,retStr] = getScore(str.slice(1,),depth+1);
            score += retScore;
            str = retStr;
        } else if (str[0]==='}'){
            return [str.slice(1,), depth];
        }
    }
    return ['',score]
}

let score = 0;
i = 0;
depth = 0;
while (i < nonComma.length) {
    if (nonComma[i]==='{') {
        depth += 1
    } else if (nonComma[i] === '}') {
        score += depth;
        depth -= 1;
    }
    i += 1;
}
console.log('Part 1:',score)
console.log('Part 2:',garbageCount)
