//Read the input files to data
//const { fail } = require('assert');
const { Console } = require('console');
const fs = require('fs');
//const { setMaxListeners } = require('process');
let data = fs.readFileSync('day22_input.txt', 'utf-8');
data = data.slice(0, -1).split('\n').map(x => x.split(""));
//console.log('Input:', data.slice(0,2));

function getStart() {
    let onPixles = new Set()
    let offset = (data.length-1)/2;
    for (let j=0; j<data.length; j++) {
        for (let i=0; i<data.length; i++) {
            if (data[j][i]==="#") {
                onPixles.add([j-offset,i-offset].toString())
            }
        }
    }
    return onPixles
}

//print()

//console.log(onPixles)
let leftTurn = {
    "north":"west",
    "west":"south",
    "south":"east",
    "east":"north"
}
let rightTurn = {
    "north":"east",
    "east":"south",
    "south":"west",
    "west":"north"
}
let reverse = {
    "north":"south",
    "east":"west",
    "south":"north",
    "west":"east"
}
let yMove = {
    "north":-1,
    "east":0,
    "south":1,
    "west":0
}
let xMove = {
    "north":0,
    "east":1,
    "south":0,
    "west":-1
}

function burst() {
    let pos = [y,x].toString()
    //Update direction and clean
    if (onPixles.has(pos)) {
        dir = rightTurn[dir];
        onPixles.delete(pos);
    } else {
        dir = leftTurn[dir];
        onPixles.add(pos);
        infectedCount += 1;
    }
    //Update position
    x += xMove[dir]
    y += yMove[dir]
}

/*
function print() {
    let Y = [];
    let X = [];
    onPixles.forEach( pos => {
        const [y,x] = pos.split(",").map(Number);
        console.log(y,x)
        Y.push(y);
        X.push(x)
    })
    console.log(Y,X)
    let yMin = Math.min(...Y);
    let yMax = Math.max(...Y);
    let xMin = Math.min(...X);
    let xMax = Math.min(...X);
    console.log("y",yMin,yMax,"x",xMin,xMax)
    let A = [];
    for (let y=yMin; y<=yMax; y++) {
        A.push(new Array(xMax-xMin+1).fill("."))
    }
    console.log("A",A);
}
*/

let x,y,dir,infectedCount

x = 0;
y = 0;
dir = "north";
infectedCount = 0;
let onPixles = getStart();
for (let i=0;i<10000;i++) {
    burst()
}

console.log("Part 1:",infectedCount)


function burst2() {
    let pos = [y,x].toString()
    //Update direction and clean
    if (infected.has(pos)) {
        //Infected, right, flagged
        dir = rightTurn[dir];
        infected.delete(pos);
        flagged.add(pos);
    } else if (flagged.has(pos)) {
        //Flagged, reverse, clean
        dir = reverse[dir];
        flagged.delete(pos);
    } else if (weakended.has(pos)) {
        //Weakened, straight, infected
        weakended.delete(pos);
        infected.add(pos);
        infectedCount += 1;
    } else {
        //Clean, left, weakened
        dir = leftTurn[dir];
        weakended.add(pos);
    }
    //Update position
    x += xMove[dir]
    y += yMove[dir]
}

x = 0;
y = 0;
dir = "north";
infectedCount = 0;
//Setup sets for tracking nodes
let weakended = new Set();
let flagged = new Set();
let infected = getStart();

for (let i=0;i<10000000;i++) {
    burst2()
}

console.log("Part 2:", infectedCount)