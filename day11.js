//Read the input files to data
const { fail } = require('assert');
const fs = require('fs');
const { setMaxListeners } = require('process');
let data = fs.readFileSync('day11_input.txt','utf-8');
data = data.slice(0,-1).split(',')
console.log('Input:',data.slice(0,100));

/*

  \ n  /
nw +--+ ne
  /y   \
-+     x+-
  \z   /
sw +--+ se
  / s  \

  */

let moves = {
    //Format of [x,y]
    'nw':[-1,1],
    'n':[0,1],
    'ne':[1,0],
    'se':[1,-1],
    's':[0,-1],
    'sw':[-1,0],
}

function z(x,y) {
    return 0-x-y
}

function dist(x,y) {
    return (Math.abs(x) + Math.abs(y) + Math.abs(z(x,y)))/2
}

let x = 0;
let y = 0;
let furthest = 0;

data.forEach(dir => {
    const move = moves[dir];
    x += move[0];
    y += move[1];
    if (dist(x,y) > furthest) {
        furthest = dist(x,y);
    }
})
console.log('x',x,'y',y,'dist',dist(x,y))
console.log('Part 1:',dist(x,y))
console.log('Part 2:',furthest)
