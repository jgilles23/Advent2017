//Read the input files to data
//const { fail } = require('assert');
const fs = require('fs');
//const { setMaxListeners } = require('process');
let data = fs.readFileSync('day24_input.txt', 'utf-8');
data = data.slice(0, -1).split('\n').map(x => x.split("/").map(Number))
console.log('Input:', data.slice(0, 10));

let edges = {};
data.forEach(pair => {
    let [a, b] = pair;
    if (edges[a] === undefined) { edges[a] = new Set() };
    if (edges[b] === undefined) { edges[b] = new Set() };
    edges[a].add(b);
    edges[b].add(a);
})

//console.log(edges);

function copy(edges) {
    let newEdges = {}
    for (let key in edges) {
        newEdges[key] = new Set(edges[key]);
    };
    return newEdges
}

function step(edges, node, depth, part) {
    let len = 0;
    let strength = 0;
    edges[node].forEach(newNode => {
        let newEdges = copy(edges);
        newEdges[node].delete(newNode);
        newEdges[newNode].delete(node);
        let [l, s] = step(newEdges, newNode, depth + 1, part);
        s += node;
        l += 1;
        if (part == 1) {
            if (s > strength) {
                strength = s;
                len = l;
            }
        } else {
            if (l > len) {
                len = l;
                strength = s;
            } else if (l == len && s > strength) {
                strength = s;
            }
        }
    })
    //console.log(depth,node,strength+node)
    return [len, strength + node]
}

//console.log(copy(edges));
let len,strength
[len,strength] = step(edges, 0, 0, 1);
console.log(len,strength)
console.log("Part 1:",strength)

let [len2,strength2] = step(edges, 0, 0, 2);
console.log(len2,strength2)
console.log("Part 2:",strength2)