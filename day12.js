//Read the input files to data
const { fail } = require('assert');
const fs = require('fs');
const { setMaxListeners } = require('process');
let data = fs.readFileSync('day12_input.txt','utf-8');
data = data.slice(0,-1).split('\n');
//console.log('Input:',data.slice(0,10));

let pipes = {};
data.forEach(d => {
    d = d.split(' <-> ')
    let connections = d[1].split(', ').map(Number)
    let orgin = Number(d[0])
    //console.log(orgin,connections)
    pipes[orgin] = connections
})

//console.log(pipes)
//console.log(pipes[3])
let visited = new Set()

function countPrograms(node) {
    if (visited.has(node)) {
        return 0;
    }
    visited.add(node);
    let count = 1;
    pipes[node].forEach(n => {
        count += countPrograms(n);
    });
    return count;
}

let c = countPrograms(0);
console.log('Part 1:',c)

let groups = 1;

//console.log(visited)
for (const node in pipes) {
    n = Number(node)
    if (!visited.has(n)) {
        groups += 1;
        let c = countPrograms(n);
    }
}

console.log('Part 2:',groups)