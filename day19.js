//Read the input files to data
//const { fail } = require('assert');
const fs = require('fs');
//const { setMaxListeners } = require('process');
let data = fs.readFileSync('day19_input.txt', 'utf-8');
data = data.slice(0, -1).split('\n').map(x => x.split(""));
//console.log('Input:', data.slice(0,10));
let M = data;

//Find the starting point
let y = 0; //Row
let x = 0; //Column
let dy = 1; //Vertical direction
let dx = 0; //Horizontal direction
while (M[y][x] != '|') {
    x++
}
console.log(`starting ${y}, ${x}`)

function step() {
    //console.log(`pos (${y},${x}), vel (${dy},${dx})`)
    y += dy;
    x += dx;
    let c = M[y][x];
    if (c=='|' || c=='-') {
        //Normal return
        return ""
    } else if (c.match(/[A-Z]/i)) { //Matches charactes A through Z
        //Return letter to add to the string
        return c
    } else if (c=='+') {
        //Change direction
        if (dy==0) {
            dx = 0;
            if (M[y+1][x] != " ") {dy = 1
            } else {dy = -1}
        } else {
            dy = 0;
            if (M[y][x+1] != " ") {dx = 1
            } else {dx = -1}
        }
        return ""
    } else {
        return "#"
    }
}

let s = "";
let ret = "";
let count = 0;
while (ret != "#") {
    count++; //Count steps
    s += ret;
    ret = step();
}

console.log('Part 1:',s)
console.log('Part 2:',count)